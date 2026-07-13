import * as cheerio from "cheerio";

export type RemoteWidgetPayload =
  | { ok: true; html: string }
  | { ok: false; error: string };

interface FetchRemoteWidgetOptions {
  /** URL of the remote's isolated widget route, e.g. http://localhost:5174/widget/ */
  widgetUrl: string;
  /**
   * Absolute origin the browser should resolve the remote's lazy-loaded
   * chunks from, e.g. http://localhost:5174/build/. This becomes the
   * cross-origin `q:base` on the injected container.
   */
  assetBase: string;
  /**
   * The host's own session identifier (read from its `session` cookie),
   * forwarded so the remote can render session-aware content. Omitted
   * entirely if the host has no session yet.
   */
  sessionId?: string;
}

const CONTAINER_ID = "remote-analytics-container";

/**
 * Header the remote uses to verify a widget request actually came from a
 * trusted host, rather than an arbitrary caller presenting a forged
 * `session` cookie. This is a placeholder for local development only —
 * override via the `INTERNAL_TRUST_SECRET` env var on both apps in any real
 * deployment, and never reuse this literal value in production.
 */
export const INTERNAL_TRUST_HEADER = "x-internal-trust";
const INTERNAL_TRUST_SECRET =
  process.env.INTERNAL_TRUST_SECRET ?? "dev-only-shared-secret";

/**
 * Server-side fetches the remote MFE's isolated widget route and rebuilds
 * it as a nested Qwik container: a `<div q:container q:base ...>` wrapping
 * the widget's root element plus its serialized `qwik/json` state
 * (including any inlined sync-QRL functions).
 *
 * The Qwik docs note that `q:container`/`q:base` are runtime-rendered
 * attributes that can't be authored through JSX, so the container's
 * opening tag is assembled as a raw string here and later injected wholesale
 * via `dangerouslySetInnerHTML`. The remote's own `q:base` is replaced with
 * an absolute cross-origin URL so the host's qwikloader fetches interaction
 * chunks from the remote's origin, never its own.
 */
export async function fetchRemoteWidget({
  widgetUrl,
  assetBase,
  sessionId,
}: FetchRemoteWidgetOptions): Promise<RemoteWidgetPayload> {
  try {
    // Only the specific cookie the remote needs is forwarded — not the raw
    // incoming `Cookie` header — so the remote never sees any of the host's
    // other cookies. The trust header alongside it proves this request
    // came from the host itself: forwarding `session` alone would let
    // anyone with direct network access to the remote impersonate a
    // logged-in user just by inventing their own cookie value.
    const response = await fetch(widgetUrl, {
      cache: "no-store",
      headers: {
        ...(sessionId && { cookie: `session=${sessionId}` }),
        [INTERNAL_TRUST_HEADER]: INTERNAL_TRUST_SECRET,
      },
    });

    if (!response.ok) {
      return { ok: false, error: `HTTP ${response.status} from ${widgetUrl}` };
    }

    const pageHtml = await response.text();
    const $ = cheerio.load(pageHtml);
    const remoteHtmlEl = $("html");

    const widgetRoot = $("#widget-root").prop("outerHTML");
    if (!widgetRoot) {
      return { ok: false, error: `No #widget-root found at ${widgetUrl}` };
    }

    // Serialized store state, required to resume without re-executing
    // component code on the client.
    const stateScript = $('script[type="qwik/json"]').prop("outerHTML") ?? "";
    // Inlined "sync QRL" closures (e.g. simple derived reads) referenced
    // from the serialized state above.
    const syncFuncsScript =
      $('script[q\\:func="qwik/json"]').prop("outerHTML") ?? "";
    // Qwik City only registers global document listeners (e.g. "click") for
    // event types it sees used somewhere in *its own* render tree. Since the
    // host's tree never sees this markup (it arrives as a raw HTML string,
    // bypassing JSX), the host's qwikloader would otherwise never listen for
    // "click" at all. The remote's own page already declares exactly which
    // events its tree needs via a `window.qwikevents.push(...)` script —
    // relaying it verbatim keeps the host in sync without guessing.
    const eventsScript =
      $("script")
        .filter((_, el) => ($(el).html() ?? "").includes("window.qwikevents"))
        .first()
        .prop("outerHTML") ?? "";

    const containerAttrs: Record<string, string> = {
      id: CONTAINER_ID,
      "q:container": remoteHtmlEl.attr("q:container") ?? "paused",
      "q:version": remoteHtmlEl.attr("q:version") ?? "",
      "q:render": remoteHtmlEl.attr("q:render") ?? "",
      "q:base": assetBase,
      "q:manifest-hash": remoteHtmlEl.attr("q:manifest-hash") ?? "",
      "q:instance": remoteHtmlEl.attr("q:instance") ?? "",
    };
    const openTag = `<div ${Object.entries(containerAttrs)
      .map(([name, value]) => `${name}="${escapeAttr(value)}"`)
      .join(" ")}>`;

    return {
      ok: true,
      html: `${openTag}${widgetRoot}${stateScript}${syncFuncsScript}${eventsScript}</div>`,
    };
  } catch {
    return { ok: false, error: `Could not reach ${widgetUrl}` };
  }
}

function escapeAttr(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

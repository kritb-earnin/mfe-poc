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
}

const CONTAINER_ID = "remote-analytics-container";

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
}: FetchRemoteWidgetOptions): Promise<RemoteWidgetPayload> {
  try {
    const response = await fetch(widgetUrl, { cache: "no-store" });

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
      html: `${openTag}${widgetRoot}${stateScript}${syncFuncsScript}</div>`,
    };
  } catch {
    return { ok: false, error: `Could not reach ${widgetUrl}` };
  }
}

function escapeAttr(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

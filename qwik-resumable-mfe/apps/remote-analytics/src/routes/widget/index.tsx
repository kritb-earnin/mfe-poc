import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { DocumentHead, RequestHandler } from "@builder.io/qwik-city";
import { CounterWidget } from "~/components/counter-widget";

const SESSION_COOKIE = "session";
const INTERNAL_TRUST_HEADER = "x-internal-trust";
/**
 * Placeholder for local development only — override via the
 * `INTERNAL_TRUST_SECRET` env var on both apps in any real deployment, and
 * never reuse this literal value in production. Must match the value
 * host-shell sends from `lib/fetchRemoteWidget.ts`.
 */
const INTERNAL_TRUST_SECRET =
  process.env.INTERNAL_TRUST_SECRET ?? "dev-only-shared-secret";

/**
 * This endpoint is meant to be embedded by a trusted host, not browsed
 * directly: a forwarded `session` cookie alone proves nothing, since anyone
 * with network access to this app could invent one. The trust header is
 * what actually proves the request came from host-shell — visit `/`
 * instead to exercise this widget standalone, without the check.
 */
export const onRequest: RequestHandler = ({ request, error }) => {
  if (request.headers.get(INTERNAL_TRUST_HEADER) !== INTERNAL_TRUST_SECRET) {
    throw error(403, "This widget endpoint may only be embedded by a trusted host.");
  }
};

export const useForwardedSession = routeLoader$(({ cookie }) => {
  return cookie.get(SESSION_COOKIE)?.value ?? null;
});

/**
 * The embeddable surface of this MFE. It renders only the widget itself —
 * no navigation, no page chrome — so the host-shell can lift the
 * `#widget-root` markup and its serialized Qwik state into its own page
 * without dragging along an unrelated layout.
 */
export default component$(() => {
  const forwardedSession = useForwardedSession();

  return (
    <div id="widget-root" data-mfe="remote-analytics">
      <CounterWidget sessionId={forwardedSession.value} />
    </div>
  );
});

export const head: DocumentHead = {
  title: "Analytics Widget",
  meta: [
    {
      name: "description",
      content: "Isolated, resumable widget exposed by the remote-analytics MFE",
    },
  ],
};

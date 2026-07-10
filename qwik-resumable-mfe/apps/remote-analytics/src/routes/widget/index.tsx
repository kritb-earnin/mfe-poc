import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { CounterWidget } from "~/components/counter-widget";

/**
 * The embeddable surface of this MFE. It renders only the widget itself —
 * no navigation, no page chrome — so the host-shell can lift the
 * `#widget-root` markup and its serialized Qwik state into its own page
 * without dragging along an unrelated layout.
 */
export default component$(() => {
  return (
    <div id="widget-root" data-mfe="remote-analytics">
      <CounterWidget />
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

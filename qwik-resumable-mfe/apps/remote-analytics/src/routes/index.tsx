import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { CounterWidget } from "~/components/counter-widget";

export default component$(() => {
  return (
    <>
      <h1>remote-analytics</h1>
      <p>
        Independent Qwik City micro-frontend running on port 5174. Visiting
        this page directly renders the full app; the{" "}
        <a href="/widget/">/widget/</a> route below exposes an isolated
        surface for the host-shell to embed.
      </p>
      <CounterWidget />
    </>
  );
});

export const head: DocumentHead = {
  title: "remote-analytics",
  meta: [
    {
      name: "description",
      content: "Standalone Qwik City micro-frontend",
    },
  ],
};

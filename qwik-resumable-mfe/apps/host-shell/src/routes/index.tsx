import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";
import { EnterpriseShell } from "~/components/enterprise-shell";
import { RemoteWidgetSlot } from "~/components/remote-widget-slot";
import { fetchRemoteWidget } from "~/lib/fetchRemoteWidget";

const widgetUrl = process.env.REMOTE_WIDGET_URL ?? "http://localhost:5174/widget/";
const assetBase = process.env.REMOTE_ASSET_BASE ?? "http://localhost:5174/build/";

export const useRemoteWidget = routeLoader$(() => {
  return fetchRemoteWidget({ widgetUrl, assetBase });
});

export default component$(() => {
  const remoteWidget = useRemoteWidget();

  return (
    <EnterpriseShell>
      <h1>Analytics Dashboard</h1>
      <p>
        This dashboard chrome is static, server-rendered markup — it ships no
        application JavaScript of its own. The panel below is a live{" "}
        <code>remote-analytics</code> container fetched from{" "}
        <code>{widgetUrl}</code> at request time and resumed in place.
      </p>
      <section class="panel">
        <h2>Remote widget</h2>
        <RemoteWidgetSlot payload={remoteWidget.value} />
      </section>
    </EnterpriseShell>
  );
});

export const head: DocumentHead = {
  title: "Core Platform — Dashboard",
  meta: [
    {
      name: "description",
      content: "Enterprise host shell composing a resumable remote Qwik micro-frontend",
    },
  ],
};

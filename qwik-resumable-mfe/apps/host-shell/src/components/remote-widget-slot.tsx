import { component$ } from "@builder.io/qwik";
import type { RemoteWidgetPayload } from "~/lib/fetchRemoteWidget";

interface RemoteWidgetSlotProps {
  payload: RemoteWidgetPayload;
}

/**
 * Mounts the nested `q:container` produced by `fetchRemoteWidget`. This
 * wrapper `div` itself carries no Qwik attributes — the container boundary
 * lives inside the injected markup — so the host's own qwikloader (already
 * present from Qwik City SSR) is the only script that runs, and it walks
 * the DOM to resolve the remote container's cross-origin `q:base` the first
 * time the widget is interacted with.
 */
export const RemoteWidgetSlot = component$(({ payload }: RemoteWidgetSlotProps) => {
  if (!payload.ok) {
    return (
      <div class="remote-slot remote-slot--error" role="alert">
        <strong>remote-analytics unavailable</strong>
        <p>{payload.error}</p>
        <p>Start it with `pnpm run dev:remote` from the demo root.</p>
      </div>
    );
  }

  return <div class="remote-slot" dangerouslySetInnerHTML={payload.html} />;
});

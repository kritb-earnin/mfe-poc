import { $, component$, useStore } from "@builder.io/qwik";

interface CounterState {
  count: number;
}

interface CounterWidgetProps {
  /**
   * Session identifier forwarded in from whichever origin embedded this
   * widget (see `routes/widget/index.tsx`). `undefined`/`null` when this
   * component is rendered standalone, with no forwarded session at all.
   */
  sessionId?: string | null;
}

/**
 * Standalone interactive widget for the remote-analytics MFE. The click
 * handler is extracted with `$()` so the Qwik optimizer splits it into its
 * own lazy-loaded chunk, served from this app's origin only when clicked.
 */
export const CounterWidget = component$(({ sessionId }: CounterWidgetProps) => {
  const state = useStore<CounterState>({ count: 0 });

  const onIncrement$ = $(async () => {
    state.count++;
  });

  return (
    <div class="counter-widget">
      <p class="counter-widget__session">
        {sessionId
          ? `Session forwarded from host: ${sessionId.slice(0, 8)}…`
          : "No session forwarded (standalone view)"}
      </p>
      <div class="counter-widget__row">
        <p class="counter-widget__count">
          Interactions: <strong>{state.count}</strong>
        </p>
        <button type="button" class="counter-widget__button" onClick$={onIncrement$}>
          Increment
        </button>
      </div>
    </div>
  );
});

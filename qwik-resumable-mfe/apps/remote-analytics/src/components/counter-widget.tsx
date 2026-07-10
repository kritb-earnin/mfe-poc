import { $, component$, useStore } from "@builder.io/qwik";

interface CounterState {
  count: number;
}

/**
 * Standalone interactive widget for the remote-analytics MFE. The click
 * handler is extracted with `$()` so the Qwik optimizer splits it into its
 * own lazy-loaded chunk, served from this app's origin only when clicked.
 */
export const CounterWidget = component$(() => {
  const state = useStore<CounterState>({ count: 0 });

  const onIncrement$ = $(async () => {
    state.count++;
  });

  return (
    <div class="counter-widget">
      <p class="counter-widget__count">
        Interactions: <strong>{state.count}</strong>
      </p>
      <button type="button" class="counter-widget__button" onClick$={onIncrement$}>
        Increment
      </button>
    </div>
  );
});

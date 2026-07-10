import { component$, Slot } from "@builder.io/qwik";

/**
 * Static enterprise dashboard chrome. Deliberately has no event handlers or
 * client state — the host-shell itself should ship zero application-level
 * JavaScript. Only the qwikloader (required to resume the embedded remote
 * container) runs on the client.
 */
export const EnterpriseShell = component$(() => {
  return (
    <div class="shell">
      <header class="shell__header">
        <span class="shell__brand">Core Platform</span>
        <span class="shell__badge">host-shell · :5173</span>
      </header>
      <div class="shell__body">
        <nav class="shell__sidebar">
          <ul>
            <li class="shell__nav-item shell__nav-item--active">Dashboard</li>
            <li class="shell__nav-item">Reports</li>
            <li class="shell__nav-item">Settings</li>
          </ul>
        </nav>
        <main class="shell__main">
          <Slot />
        </main>
      </div>
    </div>
  );
});

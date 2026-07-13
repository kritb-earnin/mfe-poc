import { randomUUID } from "node:crypto";
import type { RequestHandler } from "@builder.io/qwik-city";

export const SESSION_COOKIE = "session";

/**
 * Stands in for a real login flow. In a real deployment this cookie would
 * already exist, set by whatever authenticates users into the host
 * platform — this just issues a demo one on first visit so there's a
 * concrete session to forward to the remote MFE in `routes/index.tsx`.
 *
 * `plugin.ts` at the root of `src/routes` runs before every request in this
 * app, regardless of which route ultimately matches.
 */
export const onRequest: RequestHandler = ({ cookie }) => {
  if (!cookie.get(SESSION_COOKIE)) {
    cookie.set(SESSION_COOKIE, randomUUID(), {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
    });
  }
};

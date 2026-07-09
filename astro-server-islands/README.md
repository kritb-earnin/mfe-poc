# Astro Server Islands POC

A minimal demo of [Astro Server Islands](https://docs.astro.build/en/guides/server-islands/) — a pattern where a mostly static page loads immediately while dynamic UI fragments render independently on the server.

## What are Server Islands?

Server islands are Astro components marked with `server:defer`. At build time, Astro replaces them with a small script and optional fallback content. After the page loads in the browser, each island is fetched from a dedicated `/_server-islands/` endpoint and swapped in when ready.

Each island loads **independently**, so a slow island does not block faster ones.

## How this relates to micro-frontends

This demo illustrates a lightweight micro-frontend pattern:

- **Static shell** — the page layout and copy are prerendered and cacheable
- **Composable fragments** — each island is a self-contained UI unit loaded on demand
- **Independent delivery** — islands fetch and render at their own pace

Unlike full micro-frontend frameworks (Module Federation, single-spa), server islands keep everything in one Astro project but defer server rendering per component.

This demo also embeds a **separate Next.js app** (`next-widget/`) as a server island — the Astro island fetches an HTML fragment from Next.js at runtime, demonstrating cross-framework server-side composition.

## What to observe

1. Open the page — the shell (title, intro text, build timestamp) appears instantly
2. Fallback placeholders show while islands load
3. **User Greeting** appears after ~800ms (simulated server work)
4. **Live Stats** appears after ~2s — note it does not wait for the greeting
5. **Next.js widget** (purple card) appears after ~1.2s — server-rendered React from a separate Next.js app

Refresh the page and compare the shell timestamp (static, from build) with the island timestamps (fresh on each request).

## Run locally

Both Astro and Next.js must be running. The default `dev` script starts both:

```bash
pnpm install
pnpm run dev
```

Open [http://localhost:4321](http://localhost:4321).

To run them separately:

```bash
pnpm run dev:next   # Next.js on http://localhost:3000
pnpm run dev:astro  # Astro on http://localhost:4321
```

## Production build

Server islands require an adapter. This demo uses `@astrojs/node` in standalone mode with Astro's default `static` output (pages with `export const prerender = true` are prerendered; islands render on demand):

```bash
pnpm run build:next   # build Next.js widget
pnpm run build        # build Astro
pnpm run preview      # Astro on :4321

# in another terminal:
npm run start --prefix next-widget   # Next.js on :3000
```

Set `NEXT_WIDGET_URL` in `.env` if the Next.js server runs on a different host/port.

Open [http://localhost:4321](http://localhost:4321) to verify islands work in production mode.

## Project structure

```
src/
├── pages/index.astro          # Prerendered shell with server:defer islands
├── components/
│   ├── UserGreeting.astro     # Fast island (~800ms delay)
│   ├── LiveStats.astro        # Slow island (~2000ms delay)
│   ├── NextJsWidget.astro     # Fetches HTML from Next.js server page
│   └── FallbackCard.astro     # Loading placeholder
└── lib/delay.ts               # Simulates async server work

next-widget/                   # Separate Next.js app (React SSR)
├── src/app/widget/page.tsx        # Server Component page
└── src/components/ProductWidget.tsx
```

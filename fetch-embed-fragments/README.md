# Fetch & Embed SSR Fragments

A minimal demo of **same-page micro-frontend composition** — one host page server-fetches HTML fragments from independent apps and embeds them together.

Unlike [Next.js Multi-Zones](../nextjs-multizone/) (route-level splitting), this pattern composes **multiple micro-frontends on a single URL**.

## Architecture

```
Browser GET /
      │
      ▼
┌─────────────────┐
│  host (:3010)   │  Server Component page
│                 │
│  Promise.all ───┼──► GET :3011/fragment  (banner-widget)
│                 │
│                 ├──► GET :3012/fragment  (reviews-widget)
│                 │
│  cheerio extract #fragment-root from each response
│  embed via dangerouslySetInnerHTML
└─────────────────┘
      │
      ▼
Single HTML page with banner + reviews on same page
```

| App | Port | Role |
|-----|------|------|
| `host/` | 3010 | Fetches and embeds fragments |
| `banner-widget/` | 3011 | Promotional banner SSR fragment |
| `reviews-widget/` | 3012 | Customer reviews SSR fragment |

## How it works

1. Each widget exposes a **dynamic SSR page** at `/fragment` with content wrapped in `<div id="fragment-root">`.
2. The host page calls both fragment URLs **in parallel** during server render (`fetch` + `cache: 'no-store'`).
3. [cheerio](https://cheer.io/) extracts `#fragment-root` from each full HTML document.
4. The host injects fragments into the page with `dangerouslySetInnerHTML`.

No Module Federation, no iframes, no shared JavaScript bundle — just HTTP + HTML.

## Trade-offs

| Pros | Cons |
|------|------|
| Works with App Router and any SSR framework | Full page HTML fetched, then parsed — overhead |
| Independent deploys per widget | No shared client-side state between fragments |
| Simple mental model | Fragment CSS/JS must be self-contained in the HTML |
| No platform lock-in | Cross-fragment `Link` / client navigation doesn't apply |

## Run locally

All three apps must be running:

```bash
pnpm install
pnpm run dev
```

Open [http://localhost:3010](http://localhost:3010).

Run individually:

```bash
pnpm run dev:banner   # :3011/fragment
pnpm run dev:reviews  # :3012/fragment
pnpm run dev:host     # :3010 (requires widgets running)
```

## Production

Deploy each app independently. Point the host at production fragment URLs:

```bash
# host/.env.production
BANNER_FRAGMENT_URL=https://banner.example.com/fragment
REVIEWS_FRAGMENT_URL=https://reviews.example.com/fragment
```

```bash
pnpm run build
pnpm run start:banner   # :3011
pnpm run start:reviews  # :3012
pnpm run start:host     # :3010
```

## Project structure

```
fetch-embed-fragments/
├── host/
│   ├── src/lib/fetchFragment.ts      # fetch + cheerio extract
│   ├── src/components/FragmentSlot.tsx
│   └── src/app/page.tsx              # composes fragments on one page
├── banner-widget/
│   └── src/app/fragment/page.tsx     # SSR fragment endpoint
└── reviews-widget/
    └── src/app/fragment/page.tsx
```

## Related demos

- [Astro Server Islands](../astro-server-islands/) — similar fetch-and-embed pattern via Astro `server:defer` islands
- [Next.js Multi-Zones](../nextjs-multizone/) — route-level composition instead of same-page

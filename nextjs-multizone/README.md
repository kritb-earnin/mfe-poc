# Next.js Multi-Zones POC

A minimal demo of [Next.js Multi-Zones](https://nextjs.org/docs/app/guides/multi-zones) — multiple independent Next.js apps served under one domain, each owning a distinct set of paths.

## Architecture

```
Browser (localhost:3000)
        │
        ▼
┌───────────────────┐
│   Home zone       │  paths: /, /about
│   (port 3000)     │
│   rewrites ───────┼──► /shop/*  ──►  Shop zone (port 3001, basePath: /shop)
└───────────────────┘
```

| Zone | App folder | Port | Paths | Role |
|------|------------|------|-------|------|
| Home | `home/` | 3000 | `/`, `/about` | Main app + rewrite proxy |
| Shop | `shop/` | 3001 | `/shop`, `/shop/*` | Separate micro-frontend |

The home zone uses `rewrites` in `next.config.ts` to forward `/shop` requests to the shop zone. The shop zone sets `basePath: '/shop'` so its pages, assets, and links stay namespaced and don't collide with the home app.

## How this helps micro-frontends

- **Independent codebases** — each zone is a full Next.js app with its own dependencies and build
- **Independent deployment** — teams can ship home and shop separately
- **Single domain UX** — users see one site at `localhost:3000`; routing is transparent
- **Path ownership** — each zone owns unique URL prefixes

## Cross-zone navigation

Use plain `<a href="/shop">` tags when linking **between zones**. Next.js `Link` is for navigation **within** a zone only — soft client navigation does not cross zone boundaries correctly.

## Run locally

Both zones must be running. The default `dev` script starts both:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the entry point is always the **home** zone.

To run separately:

```bash
npm run dev:shop   # http://localhost:3001/shop (direct access)
npm run dev:home   # http://localhost:3000 (proxies /shop to shop zone)
```

## What to observe

1. Home page (blue badge) — served by `home/` on port 3000
2. Click **Visit shop zone** — URL stays on `:3000/shop` but content comes from the shop app (green theme)
3. Product links use `Link` within the shop zone (`/shop/products/1`)
4. **Back to home zone** uses `<a href="/">` for a cross-zone jump
5. Visit [http://localhost:3001/shop](http://localhost:3001/shop) directly — same shop UI, but nav to `/` goes to shop's idea of root unless accessed via home proxy

## Production

Deploy each zone independently. Set `SHOP_ZONE_URL` in the home zone to the shop zone's production URL:

```bash
# home/.env.production
SHOP_ZONE_URL=https://shop.example.com
```

Build both apps:

```bash
npm run build
npm run start:home   # port 3000
npm run start:shop   # port 3001
```

## Project structure

```
nextjs-multizone/
├── home/                    # Main zone (rewrite proxy)
│   ├── next.config.ts       # rewrites → shop zone
│   └── src/app/             # /, /about
├── shop/                    # Shop zone
│   ├── next.config.ts       # basePath: '/shop'
│   └── src/app/             # /shop, /shop/products/[id]
└── package.json             # concurrently dev script
```

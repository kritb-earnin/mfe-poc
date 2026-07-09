# AGENTS.md

Instructions for AI assistants working in this repository.

## Purpose

This is a **micro-frontend proof-of-concept monorepo**. Each top-level folder demonstrates one technique. Demos are intentionally small, runnable, and documented — not production apps.

## Package manager

**Use pnpm.** Do not use `npm install`, `npm run`, or `yarn` unless a nested sub-app has no `pnpm-lock.yaml` and pnpm cannot be used there yet.

```bash
pnpm install          # in a demo folder
pnpm add <pkg>        # add dependency
pnpm add -D <pkg>     # add dev dependency
pnpm run dev          # run scripts
pnpm --dir home dev   # run script in nested app (nextjs-multizone)
```

When editing scripts in `package.json`, prefer `pnpm`/`pnpm --dir` over `npm run --prefix`.

## Repository structure

| Path | Description |
|------|-------------|
| `astro-server-islands/` | Astro server islands demo; includes `next-widget/` Next.js sub-app |
| `nextjs-multizone/` | Next.js multi-zones demo; includes `home/` and `shop/` zones |
| `fetch-embed-fragments/` | Same-page SSR fragment composition; `host/` + two widget apps |
| `modernjs-mf-ssr/` | Modern.js v3 Module Federation SSR; `host/` + two remote providers |

Each demo has its own `README.md`. Read it before making changes. Nested folders may also have `AGENTS.md` — follow those when working inside them.

## Conventions

- **One technique per top-level folder** — do not merge demos or add shared packages unless explicitly requested.
- **Minimal scope** — change only what the task requires; match existing style in each subproject.
- **No commits unless asked** — the user will request commits explicitly.
- **Do not edit plan files** in `.cursor/plans/` unless asked.
- **Document new demos** — add a README in the demo folder and link it from the root `README.md`.

## Running demos

Most demos start multiple dev servers (e.g. host + micro-frontend). Use the demo's `pnpm run dev` script rather than starting servers individually, unless debugging one service.

| Demo | Command | URLs |
|------|---------|------|
| astro-server-islands | `pnpm run dev` | Astro `:4321`, Next widget `:3000` |
| nextjs-multizone | `pnpm run dev` | Home `:3000`, Shop `:3001` |
| fetch-embed-fragments | `pnpm run dev` | Host `:3010`, Banner `:3011`, Reviews `:3012` |
| modernjs-mf-ssr | `pnpm run dev` | Host `:3020`, Promo `:3021`, Product `:3022` |

Always run commands from the demo's root folder unless working on a nested app directly.

## Adding a new demo

1. Create a top-level folder (kebab-case, e.g. `module-federation/`).
2. Scaffold a minimal runnable example of the technique.
3. Add `README.md` with architecture notes, run instructions, and what to observe.
4. Use `pnpm` and commit a `pnpm-lock.yaml` at the demo root.
5. Update root `README.md` with a link and quick-start commands.

## Framework-specific notes

- **Astro server islands** require an adapter (`@astrojs/node`). Pages can be prerendered; islands use `server:defer`.
- **Next.js multi-zones** — home zone owns rewrites; sub-zones use `basePath`. Cross-zone links must use `<a>`, not `Link`.
- **Fetch & embed SSR fragments** — widget apps expose `/fragment` with `#fragment-root`; host fetches in parallel and injects HTML via cheerio + `dangerouslySetInnerHTML`.
- **Modern.js MF SSR** — use `@module-federation/modern-js-v3`, stream SSR mode, `createLazyComponent` for consumers; build remotes before host.
- **Nested Next.js apps** may include framework-generated `AGENTS.md` — read and respect those when editing Next.js code.

## What to avoid

- Adding monorepo tooling (Turborepo, pnpm workspaces at repo root) without being asked.
- Over-engineering demos with auth, databases, or design systems.
- Committing `.env` files, `node_modules/`, or build output (`dist/`, `.next/`).
- Removing or rewriting existing demos when adding new ones.

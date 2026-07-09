# Micro-Frontend POC

A collection of small, self-contained demos — each in its own top-level folder — showcasing a different micro-frontend technique.

This repo uses **pnpm** as the package manager. Install it if needed:

```bash
corepack enable
corepack prepare pnpm@latest --activate
```

**Requirements:** Node.js ≥ 22.12

## Demos

| Demo | Technique | Entry point |
|------|-----------|-------------|
| [astro-server-islands](./astro-server-islands/) | Astro Server Islands + Next.js SSR widget | `http://localhost:4321` |
| [nextjs-multizone](./nextjs-multizone/) | Next.js Multi-Zones (home + shop) | `http://localhost:3000` |

### [Astro Server Islands](./astro-server-islands/)

A static Astro page shell loads immediately while dynamic UI fragments render independently on the server. Includes a separate Next.js app embedded via a server island.

```bash
cd astro-server-islands
pnpm install
pnpm run dev
```

Starts Astro (`:4321`) and the Next.js widget (`:3000`). See [astro-server-islands/README.md](./astro-server-islands/README.md) for details.

### [Next.js Multi-Zones](./nextjs-multizone/)

Two independent Next.js apps on one domain — the home zone proxies `/shop/*` to a separate shop zone via rewrites.

```bash
cd nextjs-multizone
pnpm install
pnpm run dev
```

Starts the home zone (`:3000`) and shop zone (`:3001`). See [nextjs-multizone/README.md](./nextjs-multizone/README.md) for details.

## Repo layout

```
mfe-poc/
├── AGENTS.md                 # Instructions for AI assistants
├── README.md                 # This file
├── astro-server-islands/     # Demo 1
└── nextjs-multizone/         # Demo 2
    ├── home/                 # Main zone (nested app)
    └── shop/                 # Shop zone (nested app)
```

Each demo is independent — install dependencies and run scripts from within its folder. Nested apps (e.g. `next-widget/`, `home/`, `shop/`) are managed by their parent demo's scripts.

## Adding a new demo

Create a new top-level folder (e.g. `module-federation/`), add a README with run instructions, and link it from this file. See [AGENTS.md](./AGENTS.md) for conventions.

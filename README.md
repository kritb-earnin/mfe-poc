# Micro-Frontend POC

A collection of small demos, each showcasing a different micro-frontend technique.

## Demos

### [Astro Server Islands](./astro-server-islands/)

Demonstrates Astro's `server:defer` pattern — a static page shell loads immediately while dynamic UI fragments render independently on the server.

```bash
cd astro-server-islands
npm install
npm run dev
```

### [Next.js Multi-Zones](./nextjs-multizone/)

Demonstrates Next.js multi-zones — multiple independent Next.js apps on one domain, with the home zone proxying `/shop/*` to a separate shop zone via rewrites.

```bash
cd nextjs-multizone
npm install
npm run dev
```

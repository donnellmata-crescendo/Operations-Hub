# Operations Intelligence Hub

The front door for Operations — a single, polished internal surface that answers,
in ~30 seconds: *what's happening, what changed, what needs attention, how are we
performing, what systems/tools to use, and where the docs and dashboards live.*

The UX benchmark is the Product Management homepage. This app reuses its design
principles and information architecture for an Operations-specific experience.

> **Status:** Phase 1 (architecture) + Phase 2 (homepage shell on mock data)
> complete. Live integrations (Confluence, Jira, warehouse, Grafana) are
> scaffolded and land in later phases. See
> [`docs/operations-hub-architecture.md`](docs/operations-hub-architecture.md).

> **Deploy it (≈15 min):** this is the polished, sidebar version of the hub.
> Hosting it once turns it into a real internal site you link to from the
> Confluence OPSHUB space. See **[`docs/DEPLOY.md`](docs/DEPLOY.md)**.

## Stack

- **Next.js 14** (App Router, React server components) + **TypeScript**
- **Tailwind CSS** with design tokens derived from the benchmark
- Dependency-free inline SVG icons + charts (CSP-safe for Confluence embedding)
- Server-side aggregation; no client-side API fan-out; credentials server-only

## Getting started

```bash
npm install
cp .env.example .env.local   # HUB_USE_MOCK_DATA=true works with no credentials
npm run dev                  # http://localhost:3000
```

```bash
npm run typecheck            # tsc --noEmit
npm run build                # production build
```

## How it's organized

```
src/
  app/          layout + homepage (server component)
  components/   layout · sections · cards · charts · ui primitives
  config/       navigation · tools · systems · dashboards  ← registries drive the UI
  services/     contentService · metricsService · updateService (cache + degrade)
  integrations/ confluence · jira · dashboards · slack (Phase 3–6 adapters)
  lib/mock/     Phase 2 mock data
  types/        the normalized content model
docs/           architecture · integrations · content-model
```

## Design contract

- **Dynamic, not hand-maintained.** Content is driven by Confluence labels and
  structured registries — a new SOP, AI tool, or dashboard appears without
  editing the homepage.
- **Graceful degradation.** Every card degrades to its last-known value with a
  "temporarily unavailable" note; nothing renders empty or broken.
- **Fast + secure.** Aggregation is server-side and cached; secrets stay in env.

## Deploying into Confluence

The Hub is a standalone app (matching the benchmark's own pattern). Discovery
lives in the Confluence **OPSHUB** space, which links to / embeds the Hub. See
architecture §1 and §9 (Forge alternative) for the rationale and the
per-user-permission upgrade path.

# Deploy the Operations Hub (≈15 minutes)

This is the polished, sidebar version of the hub (the standalone app). Hosting
it once turns the preview into a real internal site your team can reach and that
you link to from the Confluence **OPSHUB** space.

> **Audience:** whoever will host it (an engineer, or a technically comfortable
> teammate). Non-technical owners: hand this page to that person — it's a short,
> standard Next.js deploy.

## What this is
- **Next.js 14** (App Router) + TypeScript + Tailwind. Standard, zero-exotic.
- Builds clean today: `npm install && npm run build` (verified).
- Runs on mock data out of the box — **no credentials needed** to ship the look
  (`HUB_USE_MOCK_DATA=true` is the default). Live data is a later, additive step.

## Fastest path — Vercel (recommended for a quick, real URL)
1. Go to **vercel.com/new** and sign in with GitHub.
2. **Import** the repo `donnellmata-crescendo/Operations-Hub`.
3. Framework preset auto-detects **Next.js**. Leave build settings default
   (build: `next build`, install: `npm install`). No env vars needed for the
   mock preview.
4. **Deploy.** You get a live URL in ~1 minute (e.g. `operations-hub.vercel.app`).
5. (Optional) add a custom domain like `ops.crescendo.ai` under Project →
   Settings → Domains, to mirror the PM app's `crescendopm.stage.crescendo.ai`.

## Alternative — internal hosting (behind company SSO)
For an internal tool this is often preferable:
```bash
npm ci
npm run build
npm start          # serves on PORT (default 3000); Node 18.18+
```
Put it behind your reverse proxy / SSO (the same auth staff already use). This
also satisfies the security requirement in `operations-hub-architecture.md` (§7,
B8): the hub should sit behind company auth so only staff can view it.

## Access control (important — it's an internal tool)
- Do **not** leave a public Vercel URL exposed long-term with real data. For the
  mock preview it's harmless; before wiring live data, front it with SSO
  (Vercel Authentication / your IdP / an internal deploy).

## Link or embed it in Confluence
- **Link (simplest, matches the PM pattern):** on the OPSHUB space overview, add
  a prominent button/link → the hosted URL. The hub is its own site; Confluence
  is the front door.
- **Embed (optional):** `next.config.mjs` already sets
  `frame-ancestors … https://crescendoai.atlassian.net`, so it *can* be iframed
  inside a Confluence page — this needs a Confluence **admin** to add an
  iframe/HTML macro (a Marketplace app). Not required; linking works today.

## Turning on live data later (optional, phased)
The app is built so live sources drop in behind the existing service layer with
no UI changes. When ready, set env vars (see `.env.example`) and implement the
adapters in `src/integrations/*`:
- Atlassian API token → Confluence labels + Jira milestones (Phases 3–4)
- Warehouse + Grafana tokens → live metric widgets + dashboard timestamps (Phase 5)

Full plan: `docs/operations-hub-architecture.md`. Integration mechanics:
`docs/integrations.md`.

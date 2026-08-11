# Operations Hub — Integrations

How each source system connects, how fresh it is, and how it fails safely.
All integrations run **server-side only**. Credentials come from environment
variables (`.env.example`) and are never shipped to the browser.

## Contract

Every integration adapter normalizes its source into the content model
(`src/types`) and every service returns a `ServiceResult<T>`:

```ts
ServiceResult<T> = {
  data: T,
  meta: {
    ok: boolean,              // did the live call succeed this cycle?
    fetchedAt: string,        // ISO
    lastSuccessfulAt?: string,// ISO — used to render "Last refreshed HH:MM"
    source: SourceSystem,
    stale?: boolean,          // true => show degraded note, keep last data
    error?: string,
  }
}
```

The UI reads `meta` to decide between a fresh card, a stale card, or an
`ErrorState` — it never sees an empty or broken component.

## Source register

| Source | Method | Auth | Refresh | Failure handling | Fallback |
|---|---|---|---|---|---|
| **Confluence** (OPSHUB) | REST v2 + CQL by label | Basic auth, service-account `email:api_token` | Near-real-time (15–60 min cache) | Catch → `ok:false`, keep last list | Last cached list |
| **Jira** | REST + JQL | Same Atlassian token | Near-real-time / daily | Catch → `ok:false` | Curated milestone fallback |
| **Warehouse** | HTTPS GET summary tables | Bearer token | Near-real-time (15 min) | Catch → `ok:false`, keep last value | Last value + timestamp |
| **Grafana** | HTTP API | API token | Near-real-time (5 min) | Catch → `ok:false` | Last value + "temporarily unavailable" |
| **Slack** (optional) | `conversations.history` | Bot token | Near-real-time | Silent degrade | Confluence announcements only |
| **Google Calendar** (optional) | Calendar API | OAuth | Daily | Catch → `ok:false` | Curated milestones |

## Authentication per integration

- **Atlassian (Confluence + Jira):** one service-account API token, Basic auth
  header `base64(email:token)`. Scope the account to the OPSHUB space + relevant
  Jira projects. Rotate via secret manager. **Never** put the token in any
  `NEXT_PUBLIC_*` variable.
- **Warehouse / Grafana:** bearer tokens in server env; requests only from
  server components / route handlers.
- **Slack:** bot token with `channels:history`, `channels:read`.
- **Hub itself:** put SSO in front of the deployed app so only staff can view it
  (see architecture §7, B8).

## Permissions & security

- Aggregate only content intended to be broadly visible to Operations (OPSHUB
  space, labelled pages, published dashboards). Do not index restricted pages.
- If restricted content must appear, switch Atlassian calls to **per-user 3LO
  OAuth** so results are permission-trimmed to the viewer, or move to Forge
  (architecture §9).
- Log source, status, and latency per sync for observability; never log tokens.

## Caching & performance

- Server-side aggregation + `HUB_CACHE_TTL_SECONDS` (default 300). Prefer
  Next.js route-segment `revalidate` and a small in-process/edge cache.
- Read **precomputed** warehouse summaries, not raw rows.
- No client-side API fan-out: the browser receives already-aggregated HTML/JSON.

## Real-time upgrade path (optional, later)

- Atlassian **Automation** or Grafana alerts can POST a webhook to a Hub route
  that invalidates the relevant cache key, pushing a card from near-real-time
  toward real-time without polling.

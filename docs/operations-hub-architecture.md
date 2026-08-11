# Operations Intelligence Hub — Architecture

**Owner:** Operations Intelligence
**Status:** Draft (Phase 1 — architecture) + Phase 2 (homepage shell) implemented
**Last updated:** 2026-08-11
**UX benchmark:** Product Management homepage (`crescendopm.stage.crescendo.ai`)

---

## 0. TL;DR

The Operations Hub is built as a **standalone Next.js web application** — the same
pattern the Product Management benchmark itself uses (a custom app on a
`*.crescendo.ai` domain, not a native Confluence page). Confluence remains the
**system of record and discovery entry point**: the OPSHUB space links to /
embeds the Hub, and Confluence page **labels + metadata are a primary content
source** that the Hub aggregates. All aggregation happens **server-side** so the
page is fast, credentials never reach the browser, and every card **degrades
gracefully** to its last-known value instead of breaking.

This document answers the eight Phase‑1 questions and records the assumptions we
could not verify from the (empty, greenfield) repository.

> **Assumption A0 — Repository state.** The repo was empty at kickoff (no
> commits, no code, no existing Atlassian integration). Everything here is
> greenfield. Wherever a decision depended on existing infrastructure we could
> not see, it is called out as an assumption.

---

## 1. Recommended architecture

### 1.1 Why a standalone app (and not a native Confluence page or Forge)

| Option | Fit for the benchmark polish | Live aggregation | Per‑user permissions | Verdict |
|---|---|---|---|---|
| **Native Confluence page** (macros + Automation) | Low — can't match the benchmark | Weak | Native | ✗ Can't hit the UX bar |
| **Atlassian Forge (Custom UI)** | Medium‑high | Good (Forge storage + scheduled triggers) | **Native (runs as the user)** | ◐ Strong alternative — see §9 |
| **Standalone Next.js app** (chosen) | **High — matches the benchmark exactly** | **Strong (server-side)** | Enforced at the aggregation layer | ✓ Recommended |

The benchmark is itself a standalone app, so "match the benchmark" and "native
Confluence page" are in direct tension. We resolve it the way PM did: build the
polished app, and make Confluence the **content source + front door** that links
to it. Forge is documented as the fallback if "must render *inside* the
Confluence chrome with per‑user permission enforcement" becomes a hard
requirement.

### 1.2 Layered architecture

```
SOURCE SYSTEMS
  Confluence (labels/metadata)   Jira (initiatives/milestones)
  Data warehouse (metrics)       Grafana (live volume)
  Slack (announcements, opt)     Google Calendar (milestones, opt)
        │
        ▼
INTEGRATION LAYER  (src/integrations/*)  — server-side only, credentials in env
  REST adapters · CQL/JQL queries · webhooks (future) · scheduled sync jobs
        │
        ▼
NORMALIZED OPERATIONS DATA  (src/types)  — one content model for every card
  content · tools · systems · metrics · updates · dashboards
  wrapped in ServiceResult<T> { data, meta:{ok,fetchedAt,lastSuccessfulAt,...} }
        │
        ▼
SERVICE LAYER  (src/services/*)  — cache + degrade + aggregate
  contentService · metricsService · updateService
        │
        ▼
PRESENTATION LAYER  (src/app + src/components)  — Next.js server components
  Homepage · directories · cards · live feeds · embedded dashboards
```

**Key property:** the presentation layer only ever talks to **services**, and
services only ever return a `ServiceResult<T>`. Swapping mock data for a live
integration is a change *inside a service*, invisible to every component. This
is what lets Phase 2 ship today on mock data and Phases 3–7 light up
integrations without redesigning the page.

### 1.3 Data flow & caching

- The homepage is a **server component**; it fetches through services at request
  time. No client-side fan-out of API calls (performance requirement).
- Services cache aggregated payloads server-side (`HUB_CACHE_TTL_SECONDS`,
  default 300s → near-real-time). Next.js `revalidate` / route-segment caching
  is the mechanism.
- Heavy metric computation is **precomputed** upstream (warehouse summary
  tables); the Hub reads a small summary + a refresh timestamp, never raw rows.

---

## 2. Homepage component tree

```
app/page.tsx  (server component — fetches metrics, renders sections)
├─ layout/Sidebar                     grouped left nav (benchmark IA)
├─ layout/HubHeader                   title · description · search · quick links
├─ sections/HeroFocus                 "AI Managed Volume" block
│    ├─ feature card (dark, "115k")
│    ├─ projected / attainment / progress
│    ├─ KPI strip (containment, SL, …)
│    └─ charts/BarChart               live Grafana daily-volume widget
├─ sections/OperationsPulse           SECTION 1  (async)
│    ├─ cards/UpdateCard × Company Updates
│    ├─ cards/UpdateCard × Operations Updates
│    ├─ cards/UpdateCard × What's New (NEW badge)
│    └─ Upcoming milestones list
├─ sections/SystemsAndOperations      SECTION 2  (async)
│    ├─ cards/NavigationCard × Workforce & Coverage
│    ├─ cards/NavigationCard × Account Operations
│    ├─ cards/NavigationCard × Operating Cadence
│    ├─ cards/SystemCard × Systems
│    └─ SOP & Process Library entry
├─ sections/OpsAiInsights             SECTION 3  (async)
│    ├─ cards/ToolCard × AI Tools           (from config/tools registry)
│    ├─ cards/DashboardCard × Dashboards    (from config/dashboards registry)
│    └─ cards/NavigationCard × Documentation (from Confluence labels)
└─ sections/HelpOwnership             help actions · page owner · last updated

Shared UI primitives (src/components/ui):
  SectionHeader/SubHeader · Card · StatusBadge · Owner · LastUpdated ·
  EmptyState · ErrorState · SkeletonLoader · Icon (inline SVG set)
```

---

## 3. Recommended Confluence / Atlassian integration pattern

**Pattern: label-driven aggregation over the OPSHUB space, read server-side.**

The Hub never maintains manual lists. Content becomes eligible for a directory
by carrying a **label** on its Confluence page:

| Label | Surfaces in |
|---|---|
| `ops-process` | Operations Updates + What's New |
| `ops-sop` | SOP & Process Library |
| `ops-system` | Systems documentation |
| `ops-ai` / `ops-ai-doc` | AI documentation |
| `ops-dashboard` | Dashboard registry augmentation |
| `ops-metric` | Metric definitions |
| `ops-architecture` | Architecture docs |

Queries use **CQL** (Confluence) and **JQL** (Jira). Examples:

```text
# Recently updated Operations content (What's New)
CQL: space = OPSHUB AND label in (ops-process, ops-sop, ops-ai)
     ORDER BY lastmodified DESC

# Upcoming operational milestones
JQL: project in (OPS, LAUNCH) AND issuetype in (Epic, Milestone)
     AND duedate >= now() AND duedate <= 30d ORDER BY duedate ASC
```

**Auth:** a single **service account** API token (Basic auth,
`email:api_token`), stored in env, used server-side. See §5 and
`docs/integrations.md`. Page-body content is normalized into the `UpdateItem` /
`DocEntry` model; only title, summary, owner, dates, labels, and URL are read —
never rendered raw into the page.

**Metadata for owner / last-updated:** taken from Confluence page properties
(`version.when`, `history.createdBy`) or a page-property macro, so ownership and
freshness are always live, never typed into the homepage.

---

## 4. Real-time vs near-real-time classification

| Data | Source | Method | Class | Fallback |
|---|---|---|---|---|
| Daily / weekly volume | Grafana | API pull, cached | **Near-real-time** (5 min) | Last successful value + "temporarily unavailable" |
| Containment / SL / KPIs | Warehouse summary | Scheduled precompute + read | **Near-real-time** (15 min) | Last value + timestamp |
| Dashboard refresh times | Warehouse / Grafana | API pull | **Near-real-time** | Declared cadence only |
| What's New / SOPs / docs | Confluence labels (CQL) | API pull, cached | **Near-real-time** (15–60 min) | Last cached list |
| Operations updates | Confluence + Jira | CQL/JQL, cached | **Near-real-time** | Last cached list |
| Upcoming milestones | Jira due dates / Calendar | JQL / Calendar API | **Daily** (or 60 min) | Curated fallback list |
| Company updates | Confluence + Slack | CQL + Slack history | **Near-real-time / Daily** | Confluence-only if Slack down |
| Tool / system registry | Config (or structured page) | Static import | **Manual** (deploy or edit) | Always available |

> **True real-time (webhooks)** is deferred. Nothing on this page needs
> sub-minute freshness; near-real-time caching gives us resilience and low load.
> Grafana webhooks / Atlassian Automation webhooks can push cache invalidation
> later if desired.

---

## 5. Data / content model

A single normalized model (see `src/types/index.ts` and
`docs/content-model.md`). Every card renders one of these shapes.

```
BaseContent { id, title, type, category?, description?, owner?, status?,
              url?, documentationUrl?, sourceSystem, createdDate?,
              updatedDate?, refreshFrequency?, tags? }

types:    announcement · system · process · sop · ai-tool · dashboard · metric · documentation
statuses: production · beta · pilot · development · deprecated
          (+ operational · issue · maintenance for systems)
sources:  confluence · jira · warehouse · grafana · slack · google · manual
refresh:  real-time · near-real-time · daily · manual

Specializations: UpdateItem · Milestone · SystemEntry · AiTool · Dashboard ·
                 MetricSnapshot · DocEntry

Envelope: ServiceResult<T> = { data:T, meta:{ ok, fetchedAt, lastSuccessfulAt?,
          source, stale?, error? } }   ← carries freshness + degradation
```

The **AI-tool** and **dashboard** registries live in `src/config/*` so adding
one is a metadata change, not a redesign (success metrics #3, #4).

---

## 6. Proposed repository changes

Implemented in this branch (greenfield scaffold):

```
/                      package.json · tsconfig · next.config · tailwind.config · .env.example
/docs                  operations-hub-architecture.md · integrations.md · content-model.md
/src
  /app                 layout.tsx · page.tsx · globals.css
  /components
    /layout            Sidebar · HubHeader
    /sections          HeroFocus · OperationsPulse · SystemsAndOperations · OpsAiInsights · HelpOwnership
    /cards             NavigationCard · UpdateCard · SystemCard · ToolCard · DashboardCard
    /charts            BarChart
    /ui                SectionHeader · Card · StatusBadge · Owner · LastUpdated · States · Icon
  /config              navigation · tools · systems · dashboards      ← registries (dynamic UI)
  /services            contentService · metricsService · updateService ← cache/degrade/aggregate
  /integrations        confluence · jira · dashboards · slack          ← Phase 3–6 adapters (stubs)
  /lib/mock            updates · metrics                               ← Phase 2 mock data
  /types               index.ts                                        ← content model
  /utils               format.ts
/scripts               (Phase 3+) sync-content · sync-metrics          ← scheduled jobs
```

---

## 7. Blockers, APIs & credentials we will need

| # | Need | Why | Status |
|---|---|---|---|
| B1 | **Atlassian service-account API token** + confirmed OPSHUB space/label scheme | Confluence + Jira aggregation (Phases 3–4) | **Not available in this session** — no Atlassian connector present |
| B2 | **Warehouse metrics endpoint** (or BI summary tables) + token | KPI strip + dashboard timestamps (Phase 5) | Endpoint + auth TBD |
| B3 | **Grafana API token** (+ base URL) | Live volume widgets (Phase 5) | TBD |
| B4 | **Jira project keys + issue types** for Ops initiatives/milestones | JQL queries (Phase 4) | Assumed `OPS`, `LAUNCH` — **verify** |
| B5 | **Slack bot token + announcements channel id** (optional) | Company Updates enrichment (Phase 6) | Optional; degrades cleanly |
| B6 | **Hosting + auth decision** (Vercel/internal; SSO in front) | Deploy + respect who can view the Hub | TBD |
| B7 | **Dashboard embeddability** (Grafana/BI iframe or link-only) | Embed vs link cards (Phase 5) | TBD per platform |
| B8 | **Permission model decision** (service-account vs per-user OAuth) | Security requirement §Security | **Decision needed** — see below |

**Security decision (B8).** The requirement "a Confluence user should not gain
access to information they would otherwise not have permission to view" has two
implementations:

1. **Service-account + curated scope (simpler).** The Hub only aggregates
   content that is *intended to be broadly visible to Operations* (the OPSHUB
   space, labelled pages, published dashboards). Nothing restricted is indexed.
   Put SSO in front of the Hub so only staff reach it.
2. **Per-user OAuth (stricter, more work).** The Hub calls Atlassian **as the
   viewing user** (3LO OAuth), so results are automatically permission-trimmed.
   This is effectively what Forge gives natively (§9).

Recommendation: ship with **(1)** for Phases 2–5 (Ops content is meant to be
discoverable), and revisit **(2)/Forge** if the Hub ever needs to surface
restricted content.

> **Assumption A1.** OPSHUB content is intended to be visible to all of
> Operations. If some pages are restricted, they must be excluded from the label
> queries or we move to per-user OAuth.

---

## 8. Phased build plan

| Phase | Scope | State |
|---|---|---|
| **1 — Architecture** | This doc + integrations.md + content-model.md | ✅ Done |
| **2 — Homepage shell** | Next.js app, reusable components, three sections, **mock data**, benchmark-matched UI | ✅ Done (builds + typechecks + screenshot verified) |
| **3 — Confluence dynamic content** | Implement `integrations/confluence` (CQL, labels, owner/last-updated); wire updateService/contentService | ⏳ Needs B1 |
| **4 — Jira** | Implement `integrations/jira` (JQL initiatives/milestones), aggregate not dump | ⏳ Needs B1, B4 |
| **5 — Dashboards & metrics** | `integrations/dashboards` — warehouse summaries + Grafana live; refresh timestamps; embeds | ⏳ Needs B2, B3, B7 |
| **6 — Operations Pulse logic** | Rank recent/important, suppress low-value edits; optional Slack | ⏳ Needs B5 |
| **7 — AI tool registry** | Move registry to a structured source; self-service add | ⏳ Optional structured source |

Each phase changes **service/integration internals only** — the component tree
and content model in §2/§5 stay fixed.

---

## 9. Alternative: Atlassian Forge (Custom UI)

If "render inside Confluence with native per-user permissions" becomes
mandatory, port the presentation layer to a **Forge Custom UI** app:

- **Pros:** runs as the viewing user (permissions native, solves B8), Forge
  Storage for the normalized cache, scheduled triggers for sync, hosted by
  Atlassian, appears inside the Confluence chrome.
- **Cons:** egress allowlist for external APIs (warehouse/Grafana), storage &
  compute limits, React components must be adapted to the Custom UI bridge, and
  the polish ceiling is slightly lower than a bespoke app.
- **Reuse:** the `types`, `config` registries, and `services` contracts port
  directly; only the transport (integration adapters) and the render host
  change.

---

## 10. Degraded / failure states (design contract)

- No card is ever empty or broken. On integration failure a card shows its
  **last successful value** + `Last refreshed HH:MM · data temporarily
  unavailable` (`ServiceResult.meta.stale`).
- Loading regions use `SkeletonLoader`; truly empty (but healthy) regions use
  `EmptyState`; hard failures use `ErrorState` with last-known context.
- Optional sources (Slack) degrade to their required-source fallback
  (Confluence) silently.

---

## 11. Success-metric traceability

| # | Metric | How the design meets it |
|---|---|---|
| 1 | ≥80% content dynamic | Registries + label queries; only page owner + section copy are static |
| 2 | New SOP with no homepage edit | `ops-sop` label → SOP library query |
| 3 | New AI tool with no redesign | `config/tools` registry drives ToolCards |
| 4 | New dashboard auto-displays | `config/dashboards` registry drives DashboardCards |
| 5 | Recently updated content appears | What's New = CQL `ORDER BY lastmodified` |
| 6 | Refresh timestamps visible | `LastUpdated`/`DashboardCard` render `lastRefreshed` |
| 7 | Broken integrations degrade | `ServiceResult` + ErrorState/stale badges (§10) |
| 8 | Info within 2–3 clicks | Sidebar + quick links + section anchors |
| 9 | Stays visually simple | Restrained tokens; links to child pages, not walls of text |
| 10 | No daily manual upkeep | Aggregation-first; static surface is minimal |
```

# Build the Operations Hub natively in Confluence — step‑by‑step

A no‑code guide for building the Operations Hub homepage directly in Confluence
Cloud, in the **OPSHUB** space. No engineer, no API token, no hosting. You can
do this yourself and edit it whenever you like.

It won't be pixel‑identical to the interactive preview, but it delivers the same
structure **and** most of the "updates itself" behaviour, using three built‑in
macros:

| Macro | Does the job of | Why it matters |
|---|---|---|
| **Recently updated** | *What's New* feed | Auto‑lists recently changed pages — no manual updates |
| **Content by label** | SOP & documentation directories | Label a page → it appears in the right list automatically |
| **Page Properties Report** | Systems / AI Tools / Dashboards registries | Add one page per item → the homepage table updates itself |

> **How to insert any macro:** in the Confluence editor, type **`/`** then the
> macro name (e.g. `/recently updated`) and pick it from the menu. Menu wording
> can vary slightly by Confluence version — if a name below isn't exact, search
> the closest match.

---

## Before you start (5 minutes): agree the label scheme

Labels are the engine of the whole page. Decide these now and use them
consistently. (To label a page: open it → **`•••` / "Edit labels"**, or press
**`L`**.)

| Label | Put it on… | Shows up in |
|---|---|---|
| `ops-company` | Company / leadership announcements | Company Updates |
| `ops-update` | Operations changes (launches, staffing, process) | Operations Updates |
| `ops-sop` | Any SOP / standard operating procedure | SOP & Process Library |
| `ops-system` | One page per platform (Jira, Zendesk…) | Systems directory |
| `ops-ai-tool` | One page per AI tool | AI Tools directory |
| `ops-dashboard` | One page per dashboard | Dashboards directory |
| `ops-ai-doc` | AI / automation documentation | Documentation |
| `ops-metric` | Metric definitions | Documentation |
| `ops-architecture` | Architecture / data docs | Documentation |

That's the only "setup" decision. Everything below just points macros at these
labels.

---

## Part 1 — Set up the homepage

1. In the **OPSHUB** space, open (or create) the page you want as the hub home.
2. **Add an icon** (top of page → "Add icon") — pick a simple one, e.g. 📊.
   Optionally **Add cover** for a clean banner.
3. Type the **title**: `Crescendo Operations`.
4. On the first line, paste the intro (plain text — see *Paste‑ready content*):
   > The front door for Operations — what's happening, the systems and processes
   > that run the org, and the AI tools, dashboards, and docs built to help teams
   > make better decisions.
5. Insert a **Table of Contents** for the quick‑nav: type `/table of contents`.
   As you add the section headings below, it becomes your left‑hand nav.

---

## Part 2 — The "cards" toolkit (how to get the preview look, natively)

You'll reuse these four building blocks everywhere:

- **Columns (the grid):** type `/layout` and choose a two‑ or three‑column
  section. Put one card per column. This is how you get rows of cards.
- **Panels (the card):** type `/panel` (or `/info`, `/note`, `/success`).
  A panel with a **bold heading + one line + a link** *is* a card.
- **Status lozenge (the badge):** type `/status` → pick a colour and text
  (e.g. green **OPERATIONAL**, blue **BETA**, yellow **MAINTENANCE**).
- **Smart links (system links):** paste a URL and choose **"Card"** or
  **"Inline"** — Confluence turns it into a tidy link chip.

Headings: use **Heading 2** for the three section titles and **Heading 3** for
sub‑groups — that keeps the Table of Contents nav clean.

---

## Part 3 — Build the three sections

### Section 1 — Operations Pulse

Add a **Heading 2**: `Operations Pulse`, then a line of small grey text:
*What's happening across Operations, the company, and our teams.*

Make a **two‑column layout** (`/layout`) and fill it:

- **Left column — Company Updates**
  Type `/recently updated`. In its settings: **Label = `ops-company`**,
  **Space = OPSHUB**, **Max = 5**. Done — it now lists your latest company posts
  automatically.
- **Right column — Operations Updates**
  Another `/recently updated`, **Label = `ops-update`**, Max = 5.

Below that, another **two‑column layout**:

- **Left — What's New**
  `/recently updated`, **Space = OPSHUB**, **Max = 5**, no label filter (or
  filter to your ops labels). This is your automatic "what changed" feed.
- **Right — Upcoming**
  For now, a simple **table** with columns *Milestone · Owner · Date* (paste the
  starter rows from *Paste‑ready content*). Later, if Jira gets connected, this
  becomes a Jira macro — but the table works fine today.

> ✅ Result: Company/Ops updates and What's New now **maintain themselves** — you
> just label pages as you create them.

### Section 2 — Systems & Operations

**Heading 2**: `Systems & Operations` · subtitle *The systems, workflows, and
operating processes that power the organization.*

**Heading 3 — Workforce & Coverage** (then Account Operations, Operating
Cadence): use a **three‑column `/layout`** and drop a **`/panel`** in each column
as a nav card — bold title, one line, and a link to the relevant Confluence
page. Repeat for each sub‑group. (Starter card text is in *Paste‑ready
content*.)

**Heading 3 — Systems:** this is a **registry** — use the Page Properties
Report pattern in **Part 4** with label **`ops-system`**. You'll get an
auto‑updating table of every platform with its status, owner, and links.

**Heading 3 — SOP & Process Library:** type `/content by label`, set
**Label = `ops-sop`**, display as a table. Every page you tag `ops-sop` now
appears here — no editing this page again.

### Section 3 — Ops AI, Insights & Tooling

**Heading 2**: `Ops AI, Insights & Tooling` · subtitle *AI tools, analytics,
automation, and operational intelligence built to help teams make better
decisions.*

- **Heading 3 — AI Tools:** Page Properties Report (Part 4), label
  **`ops-ai-tool`**.
- **Heading 3 — Dashboards & Metrics:** Page Properties Report (Part 4), label
  **`ops-dashboard`**.
- **Heading 3 — Documentation:** `/content by label`, **Label =
  `ops-ai-doc, ops-metric, ops-architecture`** (comma‑separated), as a table.

### Help / Ownership

**Heading 2**: `Can't find something?` Then a **four‑column `/layout`** with a
**`/panel`** in each: *Request documentation · Report an issue · Submit an AI use
case · Suggest an improvement* — each linking to a form or an email. Finish with
one line: **Page Owner: Operations Intelligence**.

---

## Part 4 — The registry pattern (do this once, reuse for Systems / Tools / Dashboards)

This is what makes "add a new tool/dashboard and it appears automatically" work.

**A. Make a template for the item pages (once):**
1. Create a child page, e.g. *"[Template] System"*.
2. On it, type `/page properties`. Inside the Page Properties macro, add a
   simple two‑column table — **field name** on the left, **value** on the right:

   | Status | (a green `/status` lozenge: OPERATIONAL) |
   |---|---|
   | Purpose | One‑line description |
   | Owner | Team or person |
   | Open | (smart link to the system) |
   | Docs | (link) |
   | SOPs | (link) |

3. Label the page **`ops-system`**. Save.

**B. Add each real item:**
- Copy the template page, fill in the values, keep the **`ops-system`** label.
  One page per system. (Same idea for tools → label `ops-ai-tool`; dashboards →
  `ops-dashboard`, with fields *Description, Source, Refresh, Last refreshed,
  Owner, Open*.)

**C. Show them on the homepage:**
- On the hub page, under the **Systems** heading, type
  `/page properties report`. Set **Label = `ops-system`**. It renders a sorted,
  filterable table pulling the fields from every matching page — and updates
  itself whenever you add another system page.

Repeat C under **AI Tools** (`ops-ai-tool`) and **Dashboards** (`ops-dashboard`).

> ✅ Result: adding a system/tool/dashboard = copy a page, fill the fields, keep
> the label. The homepage table updates on its own. No homepage edit.

---

## Part 5 — Paste‑ready content (plain text — safe to copy)

**Intro line**
```
The front door for Operations — what's happening, the systems and processes that run the org, and the AI tools, dashboards, and docs built to help teams make better decisions.
```

**Section subtitles**
```
Operations Pulse — What's happening across Operations, the company, and our teams.
Systems & Operations — The systems, workflows, and operating processes that power the organization.
Ops AI, Insights & Tooling — AI tools, analytics, automation, and operational intelligence built to help teams make better decisions.
```

**Workforce & Coverage nav cards** (one panel each)
```
Staffing & Workforce Planning — Plans, models, and headcount.
Coverage Models — How coverage maps to demand.
Bench / Floater Visibility — Available capacity in real time.
Capacity & Scheduling — Capacity planning and schedules.
Forecasting — Volume and staffing forecasts.
```

**Account Operations nav cards**
```
Account Health — Risk, performance, opportunity.
Escalations — Routing and escalation SOPs.
Launch / Onboarding — New account launch runbooks.
Performance Management — Account performance reviews.
```

**Operating Cadence nav cards**
```
WBR — Weekly business review.
MBR — Monthly business review.
QBR — Quarterly business review.
Planning Cycles — Planning and operating reviews.
Decision Logs — Decisions and rationale.
```

**AI Tools** (one page each, label `ops-ai-tool`; Status shown as a lozenge)
```
Workforce Intelligence — Beta — Staffing, coverage, bench and capacity visibility across Operations.
Account Health — Production — Unified account-level view of operational risk, performance and opportunity.
Failure Intelligence — Beta — Clusters and categorizes AI + human failures to surface top drivers.
Root Cause Analysis — Pilot — Automates first-pass RCA on escalations and incidents.
Forecasting — Beta — Volume and staffing forecasts by account.
AI Opportunity Detection — Development — Finds high-volume, low-containment intents to automate.
Knowledge Gap Detection — Pilot — Detects missing/stale knowledge that hurts containment.
Automated MBR / WBR Insights — Development — Drafts the narrative for weekly/monthly reviews.
```

**Dashboards** (one page each, label `ops-dashboard`)
```
Executive Operations Health — Warehouse + Support — Hourly — Margin, SLA, account health, volume, staffing.
Workforce Coverage — Warehouse + WFM — Every 15 min — Staffing vs demand, capacity, coverage, bench.
Account Health — Warehouse + Support — Hourly — Account-level performance, risk, and opportunity.
Account Performance — Warehouse + Support — Hourly — Volumes, containment, escalation, AHT, SL, margin.
AI Performance — Warehouse + Grafana — Near real-time — Automation, containment, failures, gaps.
AI Opportunity Sizing — Warehouse — Daily — Low-containment intents sized by automation upside.
```

**Upcoming (starter table rows)**
```
Northwind account launch — Launch Team — Aug 14
August WBR — Operations Intelligence — Aug 15
Zendesk → unified queue migration — Support Operations — Aug 21
Q4 capacity planning deadline — Workforce Planning — Aug 29
```

**Help panels**
```
Request documentation — Can't find a doc? Ask us to add it.
Report an issue — Flag a broken link, system, or dashboard.
Submit an AI use case — Propose a new Ops AI tool or automation.
Suggest an improvement — Ideas to make the Hub better.
```

---

## What you get natively vs. the interactive preview

| Preview feature | Native Confluence result |
|---|---|
| Grouped left nav | **Table of Contents** macro (auto from headings) |
| Card grids | **Layout columns + Panels** |
| Status badges | **Status lozenges** |
| What's New feed | **Recently updated** (automatic) ✅ |
| SOP / docs directories | **Content by label** (automatic) ✅ |
| Systems / Tools / Dashboards tables | **Page Properties Report** (automatic) ✅ |
| Live metric numbers (115k, 11.1K) | *Not native* — needs the hosted app or an API token later |
| Exact fonts/spacing of the preview | Close, not identical (Confimuence styling) |

The only thing you can't do natively is the **live metric widgets** — those need
either the hosted app (embed/link) or an API token so the numbers pull
themselves. Everything else on the page can be built today with the steps above.

---

## When you're ready to level up (optional, later)

- **Live metrics on the page:** get a free Atlassian API token
  (id.atlassian.com → Security → API tokens) and/or host the preview app, then
  **embed** it in a Confluence page or **link** to it from the hub. See
  `docs/operations-hub-architecture.md` (§7, §9) and `docs/integrations.md`.
- **Prettier embeds** need a Confluence **admin** to add an iframe/HTML macro
  (a Marketplace app). Not required for anything above.
```

# Operations Hub — Content Model

A single lightweight model backs every card. Source adapters normalize into it;
components render from it. Defined in `src/types/index.ts`.

## Base

```
BaseContent
  id: string
  title: string
  type: ContentType
  category?: string
  description?: string
  owner?: { name, team?, avatarUrl? }
  status?: Status
  url?: string
  documentationUrl?: string
  sourceSystem: SourceSystem
  createdDate?: ISO
  updatedDate?: ISO
  refreshFrequency?: RefreshFrequency
  tags?: string[]
```

## Enumerations

- **ContentType:** `announcement · system · process · sop · ai-tool · dashboard · metric · documentation`
- **Status:** `production · beta · pilot · development · deprecated` and, for systems, `operational · issue · maintenance`
- **SourceSystem:** `confluence · jira · warehouse · grafana · slack · google · manual`
- **RefreshFrequency:** `real-time · near-real-time · daily · manual`

## Specializations

| Type | Adds | Rendered by |
|---|---|---|
| `UpdateItem` | `summary`, `isNew?`, `source` | `UpdateCard` (Pulse feeds) |
| `Milestone` | `date`, `category` | Upcoming list |
| `SystemEntry` | `purpose`, `links{open,documentation,sops,knownIssues}` | `SystemCard` |
| `AiTool` | `whatItDoes`, `useItWhen`, `applicationUrl?`, `feedbackUrl?` | `ToolCard` |
| `Dashboard` | `dataSource`, `refreshCadence`, `lastRefreshed?`, `live?` | `DashboardCard` |
| `MetricSnapshot` | `value`, `delta?`, `caption?`, `series?`, `lastRefreshed?` | Hero / KPI strip |
| `DocEntry` | `section` | Documentation grid |

## Label → directory mapping (dynamic content)

A Confluence page joins a directory by carrying a label — no homepage edit:

| Label | Directory |
|---|---|
| `ops-process` | Operations Updates / What's New |
| `ops-sop` | SOP & Process Library |
| `ops-system` | Systems documentation |
| `ops-ai` / `ops-ai-doc` | AI documentation |
| `ops-dashboard` | Dashboard registry (augment) |
| `ops-metric` | Metric definitions |
| `ops-architecture` | Architecture docs |

## Registries (structured config)

`src/config/tools.ts` and `src/config/dashboards.ts` hold the AI-tool and
dashboard entries. Example tool entry:

```json
{
  "name": "Workforce Intelligence",
  "description": "Provides staffing, coverage, bench and capacity visibility.",
  "status": "beta",
  "owner": "Operations Intelligence",
  "documentationUrl": "...",
  "applicationUrl": "...",
  "category": "Workforce"
}
```

Adding an entry surfaces a card automatically. In Phase 7 these registries can be
hydrated from a structured Confluence page / database so additions are
self-service rather than a code change.

/**
 * Operations Hub — normalized content model.
 *
 * Every card on the homepage is rendered from one of these shapes. Integration
 * adapters (Confluence, Jira, warehouse, Slack) normalize their source data
 * into these types so the presentation layer never talks to a source directly.
 * See docs/content-model.md.
 */

export type ContentType =
  | 'announcement'
  | 'system'
  | 'process'
  | 'sop'
  | 'ai-tool'
  | 'dashboard'
  | 'metric'
  | 'documentation';

export type Status =
  | 'production'
  | 'beta'
  | 'pilot'
  | 'development'
  | 'deprecated'
  // operational statuses for systems
  | 'operational'
  | 'issue'
  | 'maintenance';

export type SourceSystem =
  | 'confluence'
  | 'jira'
  | 'warehouse'
  | 'grafana'
  | 'slack'
  | 'google'
  | 'manual';

/** How fresh a given data source is. Drives the freshness badge. */
export type RefreshFrequency =
  | 'real-time'
  | 'near-real-time'
  | 'daily'
  | 'manual';

/** Base fields shared by every piece of hub content. */
export interface BaseContent {
  id: string;
  title: string;
  type: ContentType;
  category?: string;
  description?: string;
  owner?: Owner;
  status?: Status;
  url?: string;
  documentationUrl?: string;
  sourceSystem: SourceSystem;
  createdDate?: string; // ISO 8601
  updatedDate?: string; // ISO 8601
  refreshFrequency?: RefreshFrequency;
  tags?: string[];
}

export interface Owner {
  name: string;
  team?: string;
  avatarUrl?: string;
}

/** Operations Pulse: company / ops updates and the "What's New" feed. */
export interface UpdateItem extends BaseContent {
  type: 'announcement' | 'process' | 'sop' | 'ai-tool' | 'dashboard';
  summary: string;
  isNew?: boolean;
  source: SourceSystem;
}

/** Upcoming milestones (Jira due dates, calendars, curated). */
export interface Milestone {
  id: string;
  title: string;
  date: string; // ISO 8601
  category:
    | 'launch'
    | 'migration'
    | 'rollout'
    | 'review'
    | 'planning'
    | 'training';
  owner?: Owner;
  url?: string;
  sourceSystem: SourceSystem;
}

/** A system / platform card in Systems & Operations. */
export interface SystemEntry extends BaseContent {
  type: 'system';
  purpose: string;
  status?: 'operational' | 'issue' | 'maintenance';
  links: {
    open?: string;
    documentation?: string;
    sops?: string;
    knownIssues?: string;
  };
}

/** An internal AI / automation tool card. Driven by the tool registry. */
export interface AiTool extends BaseContent {
  type: 'ai-tool';
  whatItDoes: string;
  useItWhen: string;
  status: 'production' | 'beta' | 'pilot' | 'development' | 'deprecated';
  applicationUrl?: string;
  feedbackUrl?: string;
}

/** A dashboard directory entry. Driven by the dashboard registry. */
export interface Dashboard extends BaseContent {
  type: 'dashboard';
  dataSource: string;
  refreshCadence: string; // human-readable, e.g. "Hourly"
  lastRefreshed?: string; // ISO 8601, populated live where possible
  // Populated when the integration is healthy; when null the card shows the
  // last successful value + a "temporarily unavailable" note (never empty).
  live?: {
    ok: boolean;
    lastSuccessfulAt?: string;
  };
}

/** A single hero / focus KPI (matches the "115k" and "11.1K" widgets). */
export interface MetricSnapshot {
  id: string;
  label: string;
  value: string; // preformatted for display, e.g. "115k"
  delta?: {
    value: string; // e.g. "-8% WoW"
    direction: 'up' | 'down' | 'flat';
  };
  caption?: string;
  sourceSystem: SourceSystem;
  refreshFrequency: RefreshFrequency;
  lastRefreshed?: string; // ISO 8601
  // Small series for the sparkline/bar widget (optional).
  series?: number[];
}

/** Documentation directory entry (Confluence-label driven). */
export interface DocEntry extends BaseContent {
  type: 'documentation';
  section:
    | 'architecture'
    | 'tool-doc'
    | 'ai-standards'
    | 'automation'
    | 'data-definitions'
    | 'metric-definitions'
    | 'governance'
    | 'troubleshooting'
    | 'faq';
}

/** Left-nav item. */
export interface NavItem {
  label: string;
  href: string;
  icon: string; // lucide-style key resolved in the Icon component
  active?: boolean;
  children?: NavItem[];
}

/** Quick-link chip under the hero. */
export interface QuickLink {
  label: string;
  href: string;
  icon: string;
}

/**
 * Result envelope every service returns. Carries freshness + degradation state
 * so the UI can render "last refreshed / temporarily unavailable" instead of
 * an empty or broken card.
 */
export interface ServiceResult<T> {
  data: T;
  meta: {
    ok: boolean;
    fetchedAt: string; // ISO 8601
    lastSuccessfulAt?: string; // ISO 8601 — for degraded state
    source: SourceSystem;
    stale?: boolean;
    error?: string;
  };
}

import type { Dashboard } from '@/types';

/**
 * DASHBOARD REGISTRY
 * ------------------
 * Registering a dashboard = adding an entry here (or a row in the structured
 * source that hydrates it). `lastRefreshed` and `live` are populated by
 * metricsService at request time where an integration exists; otherwise the
 * card shows its declared cadence and links out. Grouped by `category`.
 */
export const dashboards: Dashboard[] = [
  // --- Executive Operations --------------------------------------------------
  {
    id: 'exec-ops-health',
    type: 'dashboard',
    title: 'Executive Operations Health',
    description:
      'Overall Operations health: margin, SLA, account health, volume, staffing.',
    category: 'Executive Operations',
    dataSource: 'Warehouse + Support Platforms',
    refreshCadence: 'Hourly',
    owner: { name: 'Operations Intelligence', team: 'Ops Intelligence' },
    url: '#',
    sourceSystem: 'warehouse',
    refreshFrequency: 'near-real-time',
  },
  // --- Workforce -------------------------------------------------------------
  {
    id: 'workforce-coverage',
    type: 'dashboard',
    title: 'Workforce Coverage',
    description:
      'Staffing vs demand, capacity, utilization, coverage, bench and forecast accuracy.',
    category: 'Workforce',
    dataSource: 'Warehouse + WFM',
    refreshCadence: 'Every 15 min',
    owner: { name: 'Workforce Planning', team: 'Operations' },
    url: '#',
    sourceSystem: 'warehouse',
    refreshFrequency: 'near-real-time',
  },
  // --- Account Performance ---------------------------------------------------
  {
    id: 'account-health',
    type: 'dashboard',
    title: 'Account Health',
    description:
      'Unified account-level view of operational performance, risk, and opportunity.',
    category: 'Account Performance',
    dataSource: 'Warehouse + Support Platforms',
    refreshCadence: 'Hourly',
    owner: { name: 'Operations Intelligence', team: 'Ops Intelligence' },
    url: '#',
    sourceSystem: 'warehouse',
    refreshFrequency: 'near-real-time',
  },
  {
    id: 'account-performance',
    type: 'dashboard',
    title: 'Account Performance',
    description:
      'Ticket volumes, human-touch volume, AI containment, escalation rate, AHT, SL, margin.',
    category: 'Account Performance',
    dataSource: 'Warehouse + Support Platforms',
    refreshCadence: 'Hourly',
    owner: { name: 'Support Operations', team: 'Operations' },
    url: '#',
    sourceSystem: 'warehouse',
    refreshFrequency: 'near-real-time',
  },
  // --- AI Performance --------------------------------------------------------
  {
    id: 'ai-performance',
    type: 'dashboard',
    title: 'AI Performance',
    description:
      'Automation rate, containment, escalation trends, failure categories, knowledge gaps.',
    category: 'AI Performance',
    dataSource: 'Warehouse + Grafana',
    refreshCadence: 'Near real-time',
    owner: { name: 'AI Quality', team: 'Ops Intelligence' },
    url: '#',
    sourceSystem: 'grafana',
    refreshFrequency: 'near-real-time',
  },
  {
    id: 'ai-opportunity',
    type: 'dashboard',
    title: 'AI Opportunity Sizing',
    description:
      'High-volume, low-containment intents sized by automation upside.',
    category: 'AI Performance',
    dataSource: 'Warehouse',
    refreshCadence: 'Daily',
    owner: { name: 'Operations Intelligence', team: 'Ops Intelligence' },
    url: '#',
    sourceSystem: 'warehouse',
    refreshFrequency: 'daily',
  },
];

/** Category display order for the dashboard directory. */
export const dashboardCategories = [
  'Executive Operations',
  'Workforce',
  'Account Performance',
  'AI Performance',
] as const;

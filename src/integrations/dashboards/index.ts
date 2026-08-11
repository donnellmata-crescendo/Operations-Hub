import type { Dashboard, MetricSnapshot } from '@/types';

/**
 * Dashboards / metrics integration adapter (Phase 5).
 * ---------------------------------------------------
 * Two responsibilities:
 *   1) Enrich registry dashboards with a live `lastRefreshed` + health flag.
 *   2) Fetch precomputed metric summaries for the hero + KPI strip.
 *
 * Prefer PRECOMPUTED summaries from the warehouse (server-side aggregation)
 * over dozens of client calls — the performance requirement. Grafana is used
 * for the live volume widgets, mirroring the PM benchmark.
 *
 * Every function must be resilient: on failure return the last successful
 * value with `ok: false` so the card degrades gracefully.
 */

/** Placeholder. Phase 5 implements the warehouse summary fetch. */
export async function fetchMetricSummaries(
  _ids: string[]
): Promise<MetricSnapshot[]> {
  throw new Error('dashboards.fetchMetricSummaries not implemented (Phase 5)');
}

/** Placeholder. Phase 5 implements per-dashboard refresh + health probe. */
export async function enrichRefreshTimestamps(
  _dashboards: Dashboard[]
): Promise<Dashboard[]> {
  throw new Error('dashboards.enrichRefreshTimestamps not implemented (Phase 5)');
}

import type { ServiceResult, MetricSnapshot } from '@/types';
import { focusMetric, dailyVolume, pulseKpis } from '@/lib/mock/metrics';

/**
 * metricsService — hero + KPI metrics.
 *
 * Phase 2: mock. Phase 5: reads precomputed summaries from the warehouse and
 * live values from Grafana. Because this returns a ServiceResult with
 * `lastSuccessfulAt`, the UI renders "Last refreshed 11:42 AM · temporarily
 * unavailable" on failure rather than an empty card — the graceful-degradation
 * requirement.
 */

const REFERENCE_NOW = '2026-08-11T12:00:00Z';

function ok<T>(data: T, source: ServiceResult<T>['meta']['source']): ServiceResult<T> {
  return {
    data,
    meta: { ok: true, fetchedAt: REFERENCE_NOW, lastSuccessfulAt: REFERENCE_NOW, source },
  };
}

export async function getFocusMetric(): Promise<ServiceResult<MetricSnapshot>> {
  return ok(focusMetric, 'grafana');
}

export async function getDailyVolume(): Promise<ServiceResult<MetricSnapshot>> {
  return ok(dailyVolume, 'grafana');
}

export async function getPulseKpis(): Promise<ServiceResult<MetricSnapshot[]>> {
  return ok(pulseKpis, 'warehouse');
}

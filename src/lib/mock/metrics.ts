import type { MetricSnapshot } from '@/types';

/**
 * Hero focus metric — the Operations analogue of the benchmark's "AI Managed
 * Volume / 115k". Sourced later from the warehouse + Grafana.
 */
export const focusMetric: MetricSnapshot = {
  id: 'managed-volume',
  label: 'Current Week Volume',
  value: '115k',
  delta: { value: '-8% WoW', direction: 'down' },
  caption: '92.9k toward 835k — Quarter maturity 7%',
  sourceSystem: 'grafana',
  refreshFrequency: 'near-real-time',
  lastRefreshed: '2026-08-11T11:42:00Z',
  series: [18, 21, 19, 22, 20, 17, 12, 19, 21, 20, 22, 18, 16, 11],
};

/** Secondary hero widget — the live daily-volume bar widget on the right. */
export const dailyVolume: MetricSnapshot = {
  id: 'daily-volume',
  label: 'Grafana daily volume',
  value: '11.1K',
  sourceSystem: 'grafana',
  refreshFrequency: 'near-real-time',
  lastRefreshed: '2026-08-11T11:42:00Z',
  series: [
    9.8, 12.1, 10.4, 11.9, 13.2, 8.6, 7.2, 10.1, 12.8, 11.4, 13.0, 9.7, 8.1,
    11.2, 12.5, 10.9, 13.4, 12.0, 9.3, 7.8, 10.6, 12.2, 11.7, 13.1, 12.4, 10.2,
    8.4, 11.0, 12.9, 11.1,
  ],
};

/** Small KPI strip shown under the hero — near-real-time operational health. */
export const pulseKpis: MetricSnapshot[] = [
  {
    id: 'projected',
    label: 'Projected (Q3)',
    value: '1.51M',
    caption: 'Grafana base case',
    sourceSystem: 'grafana',
    refreshFrequency: 'near-real-time',
    lastRefreshed: '2026-08-11T11:42:00Z',
  },
  {
    id: 'attainment',
    label: 'QTD Attainment',
    value: '11%',
    caption: '92.9k toward 835k',
    sourceSystem: 'warehouse',
    refreshFrequency: 'near-real-time',
    lastRefreshed: '2026-08-11T11:15:00Z',
  },
  {
    id: 'containment',
    label: 'AI Containment',
    value: '68%',
    delta: { value: '+1.4pt WoW', direction: 'up' },
    sourceSystem: 'warehouse',
    refreshFrequency: 'near-real-time',
    lastRefreshed: '2026-08-11T11:15:00Z',
  },
  {
    id: 'service-level',
    label: 'Service Level',
    value: '94%',
    delta: { value: '-0.6pt WoW', direction: 'down' },
    sourceSystem: 'warehouse',
    refreshFrequency: 'near-real-time',
    lastRefreshed: '2026-08-11T11:15:00Z',
  },
];

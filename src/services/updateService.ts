import type { ServiceResult, UpdateItem, Milestone } from '@/types';
import {
  companyUpdates,
  operationsUpdates,
  whatsNew,
  upcomingMilestones,
} from '@/lib/mock/updates';

/**
 * updateService — Operations Pulse feeds.
 *
 * Phase 2: returns curated mock data through the ServiceResult envelope so the
 * UI already handles freshness + degradation. Phases 3/4/6 swap the bodies to
 * aggregate Confluence (labels/CQL), Jira (JQL), and Slack — the return shape
 * does not change, so the components never need to.
 */

const REFERENCE_NOW = '2026-08-11T12:00:00Z';

function ok<T>(data: T, source: ServiceResult<T>['meta']['source']): ServiceResult<T> {
  return {
    data,
    meta: { ok: true, fetchedAt: REFERENCE_NOW, lastSuccessfulAt: REFERENCE_NOW, source },
  };
}

/** Sort newest-first and cap to a small, scannable count. */
function recent<T extends { updatedDate?: string }>(items: T[], limit = 4): T[] {
  return [...items]
    .sort((a, b) => (b.updatedDate ?? '').localeCompare(a.updatedDate ?? ''))
    .slice(0, limit);
}

export async function getCompanyUpdates(): Promise<ServiceResult<UpdateItem[]>> {
  return ok(recent(companyUpdates, 3), 'confluence');
}

export async function getOperationsUpdates(): Promise<ServiceResult<UpdateItem[]>> {
  return ok(recent(operationsUpdates, 3), 'confluence');
}

export async function getWhatsNew(): Promise<ServiceResult<UpdateItem[]>> {
  return ok(recent(whatsNew, 4), 'confluence');
}

export async function getUpcomingMilestones(): Promise<ServiceResult<Milestone[]>> {
  const sorted = [...upcomingMilestones].sort((a, b) => a.date.localeCompare(b.date));
  return ok(sorted.slice(0, 4), 'jira');
}

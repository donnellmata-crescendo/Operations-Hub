import type {
  ServiceResult,
  SystemEntry,
  AiTool,
  Dashboard,
  DocEntry,
} from '@/types';
import { systems } from '@/config/systems';
import { aiTools } from '@/config/tools';
import { dashboards } from '@/config/dashboards';
import { documentation } from '@/lib/mock/updates';

/**
 * contentService — the directories (systems, AI tools, dashboards, docs).
 *
 * Phase 2: reads the local registries + labelled mock content. Phase 3 hydrates
 * `documentation` from Confluence labels (ops-sop, ops-ai, ops-metric, ...) and
 * lets the registries be augmented by a structured source, all behind the same
 * ServiceResult envelope.
 */

const REFERENCE_NOW = '2026-08-11T12:00:00Z';

function ok<T>(data: T, source: ServiceResult<T>['meta']['source']): ServiceResult<T> {
  return {
    data,
    meta: { ok: true, fetchedAt: REFERENCE_NOW, lastSuccessfulAt: REFERENCE_NOW, source },
  };
}

export async function getSystems(): Promise<ServiceResult<SystemEntry[]>> {
  return ok(systems, 'manual');
}

export async function getAiTools(): Promise<ServiceResult<AiTool[]>> {
  return ok(aiTools, 'manual');
}

export async function getDashboards(): Promise<ServiceResult<Dashboard[]>> {
  return ok(dashboards, 'warehouse');
}

export async function getDocumentation(): Promise<ServiceResult<DocEntry[]>> {
  const sorted = [...documentation].sort((a, b) =>
    (b.updatedDate ?? '').localeCompare(a.updatedDate ?? '')
  );
  return ok(sorted, 'confluence');
}

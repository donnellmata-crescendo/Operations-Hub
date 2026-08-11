import type { UpdateItem, DocEntry } from '@/types';

/**
 * Confluence integration adapter (Phase 3).
 * -----------------------------------------
 * Reads content from the OPSHUB space using the Confluence Cloud REST API v2
 * and CQL. NOTHING is called from the browser — this module runs server-side
 * only and reads credentials from env (ATLASSIAN_* in .env.example).
 *
 * The hub's dynamic content is driven by LABELS, so a new page appears in the
 * right directory with no homepage edit:
 *   - label `ops-sop`        -> SOP & Process Library
 *   - label `ops-system`     -> Systems documentation
 *   - label `ops-process`    -> Operations Updates
 *   - label `ops-ai`         -> AI documentation
 *   - label `ops-dashboard`  -> Dashboard registry augmentation
 *   - label `ops-metric`     -> Metric definitions
 *   - label `ops-architecture` -> Architecture docs
 *
 * Example CQL for "recently updated Operations content":
 *   space = OPSHUB AND label in (ops-process, ops-sop, ops-ai)
 *   ORDER BY lastmodified DESC
 *
 * Auth: Basic auth with `${ATLASSIAN_EMAIL}:${ATLASSIAN_API_TOKEN}` (service
 * account). Respect source permissions — see docs/integrations.md → Security.
 */

export interface ConfluenceQuery {
  labels: string[];
  spaceKey?: string;
  limit?: number;
  orderBy?: 'lastmodified' | 'created';
}

/** Placeholder. Phase 3 implements the fetch + normalization to UpdateItem. */
export async function queryByLabels(
  _query: ConfluenceQuery
): Promise<UpdateItem[]> {
  throw new Error('confluence.queryByLabels not implemented (Phase 3)');
}

/** Placeholder. Phase 3 implements the documentation directory query. */
export async function queryDocumentation(
  _labels: string[]
): Promise<DocEntry[]> {
  throw new Error('confluence.queryDocumentation not implemented (Phase 3)');
}

import type { Milestone, UpdateItem } from '@/types';

/**
 * Jira integration adapter (Phase 4).
 * -----------------------------------
 * Surfaces AGGREGATED, meaningful signal — active initiatives, recent launches,
 * major milestones, upcoming due dates — never a dump of every ticket.
 * Server-side only; credentials from env.
 *
 * Example JQL for "upcoming operational milestones":
 *   project in (OPS, LAUNCH) AND issuetype in (Epic, Milestone)
 *   AND duedate >= now() AND duedate <= 30d ORDER BY duedate ASC
 *
 * Example JQL for "recent launches":
 *   project = LAUNCH AND status changed to Done after -14d ORDER BY updated DESC
 */

export interface JiraQuery {
  jql: string;
  limit?: number;
}

/** Placeholder. Phase 4 implements fetch + normalization to Milestone. */
export async function queryMilestones(_jql: string): Promise<Milestone[]> {
  throw new Error('jira.queryMilestones not implemented (Phase 4)');
}

/** Placeholder. Phase 4 implements recent-initiative aggregation. */
export async function queryInitiatives(_jql: string): Promise<UpdateItem[]> {
  throw new Error('jira.queryInitiatives not implemented (Phase 4)');
}

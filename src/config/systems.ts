import type { SystemEntry } from '@/types';

/**
 * SYSTEMS REGISTRY
 * ----------------
 * The platforms used to run Operations. Status is a placeholder here; in a
 * later phase it is hydrated from each platform's status endpoint (see
 * docs/integrations.md → "System status"). Cards degrade to "operational"
 * with a stale flag if a status check fails, never to an empty card.
 */
export const systems: SystemEntry[] = [
  {
    id: 'jira',
    type: 'system',
    title: 'Jira',
    purpose: 'Operational initiatives, launches, and milestone tracking.',
    status: 'operational',
    owner: { name: 'Operations PMO', team: 'Operations' },
    links: {
      open: 'https://crescendoai.atlassian.net/jira',
      documentation: '#',
      sops: '#',
      knownIssues: '#',
    },
    sourceSystem: 'jira',
  },
  {
    id: 'confluence',
    type: 'system',
    title: 'Confluence',
    purpose: 'Operations knowledge base, SOPs, and documentation.',
    status: 'operational',
    owner: { name: 'Operations PMO', team: 'Operations' },
    links: {
      open: 'https://crescendoai.atlassian.net/wiki/spaces/OPSHUB',
      documentation: '#',
      sops: '#',
    },
    sourceSystem: 'confluence',
  },
  {
    id: 'zendesk',
    type: 'system',
    title: 'Zendesk',
    purpose: 'Support ticketing and human-touch case management.',
    status: 'operational',
    owner: { name: 'Support Operations', team: 'Operations' },
    links: { open: '#', documentation: '#', sops: '#', knownIssues: '#' },
    sourceSystem: 'manual',
  },
  {
    id: 'gorgias',
    type: 'system',
    title: 'Gorgias',
    purpose: 'E-commerce support helpdesk for select accounts.',
    status: 'maintenance',
    owner: { name: 'Support Operations', team: 'Operations' },
    links: { open: '#', documentation: '#' },
    sourceSystem: 'manual',
  },
  {
    id: 'wfm',
    type: 'system',
    title: 'Workforce Management',
    purpose: 'Scheduling, forecasting, and coverage planning.',
    status: 'operational',
    owner: { name: 'Workforce Planning', team: 'Operations' },
    links: { open: '#', documentation: '#', sops: '#' },
    sourceSystem: 'manual',
  },
  {
    id: 'grafana',
    type: 'system',
    title: 'Grafana',
    purpose: 'Live operational volume and platform metrics.',
    status: 'operational',
    owner: { name: 'Platform', team: 'Engineering' },
    links: { open: '#', documentation: '#' },
    sourceSystem: 'grafana',
  },
];

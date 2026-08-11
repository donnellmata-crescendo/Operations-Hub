import type { AiTool } from '@/types';

/**
 * AI TOOL REGISTRY
 * ----------------
 * Adding a tool = adding an entry here (or, in a later phase, a row in a
 * Confluence-page / structured source that hydrates this array). The homepage
 * renders every entry automatically — no layout changes required. This is the
 * "a new AI tool can be added without redesigning the homepage" success metric.
 */
export const aiTools: AiTool[] = [
  {
    id: 'workforce-intelligence',
    type: 'ai-tool',
    title: 'Workforce Intelligence',
    whatItDoes:
      'Staffing, coverage, bench and capacity visibility across Operations.',
    useItWhen:
      'You need to see whether coverage matches demand for a team or account.',
    description:
      'Provides staffing, coverage, bench and capacity visibility.',
    status: 'beta',
    category: 'Workforce',
    owner: { name: 'Operations Intelligence', team: 'Ops Intelligence' },
    applicationUrl: '#',
    documentationUrl: '#',
    feedbackUrl: '#',
    sourceSystem: 'manual',
    updatedDate: '2026-08-06',
  },
  {
    id: 'account-health',
    type: 'ai-tool',
    title: 'Account Health',
    whatItDoes:
      'Unified account-level view of operational risk, performance and opportunity.',
    useItWhen: 'Before an account review or when triaging an at-risk account.',
    status: 'production',
    category: 'Account Health',
    owner: { name: 'Operations Intelligence', team: 'Ops Intelligence' },
    applicationUrl: '#',
    documentationUrl: '#',
    feedbackUrl: '#',
    sourceSystem: 'manual',
    updatedDate: '2026-08-09',
  },
  {
    id: 'failure-intelligence',
    type: 'ai-tool',
    title: 'Failure Intelligence',
    whatItDoes:
      'Clusters and categorizes AI + human failures to surface top drivers.',
    useItWhen: 'Investigating why containment dropped or escalations rose.',
    status: 'beta',
    category: 'Failure Intelligence',
    owner: { name: 'AI Quality', team: 'Ops Intelligence' },
    applicationUrl: '#',
    documentationUrl: '#',
    feedbackUrl: '#',
    sourceSystem: 'manual',
    updatedDate: '2026-08-04',
  },
  {
    id: 'root-cause-analysis',
    type: 'ai-tool',
    title: 'Root Cause Analysis',
    whatItDoes:
      'Automates first-pass RCA on escalations and incidents from support data.',
    useItWhen: 'You need a starting hypothesis for an incident or spike.',
    status: 'pilot',
    category: 'Root Cause Analysis',
    owner: { name: 'AI Quality', team: 'Ops Intelligence' },
    applicationUrl: '#',
    documentationUrl: '#',
    feedbackUrl: '#',
    sourceSystem: 'manual',
    updatedDate: '2026-07-29',
  },
  {
    id: 'forecasting',
    type: 'ai-tool',
    title: 'Forecasting',
    whatItDoes:
      'Volume and staffing forecasts by account, blending actuals + seasonality.',
    useItWhen: 'Planning coverage or validating a capacity plan.',
    status: 'beta',
    category: 'Forecasting',
    owner: { name: 'Workforce Planning', team: 'Operations' },
    applicationUrl: '#',
    documentationUrl: '#',
    feedbackUrl: '#',
    sourceSystem: 'manual',
    updatedDate: '2026-08-02',
  },
  {
    id: 'ai-opportunity-detection',
    type: 'ai-tool',
    title: 'AI Opportunity Detection',
    whatItDoes:
      'Finds high-volume, low-containment intents ripe for automation and sizes them.',
    useItWhen: 'Prioritizing the automation backlog for an account.',
    status: 'development',
    category: 'AI Opportunity Detection',
    owner: { name: 'Operations Intelligence', team: 'Ops Intelligence' },
    applicationUrl: '#',
    documentationUrl: '#',
    feedbackUrl: '#',
    sourceSystem: 'manual',
    updatedDate: '2026-07-24',
  },
  {
    id: 'knowledge-gap-detection',
    type: 'ai-tool',
    title: 'Knowledge Gap Detection',
    whatItDoes:
      'Detects missing or stale knowledge that drives AI deflection failures.',
    useItWhen: 'Improving containment on a specific topic or account.',
    status: 'pilot',
    category: 'Knowledge Gap Detection',
    owner: { name: 'AI Quality', team: 'Ops Intelligence' },
    applicationUrl: '#',
    documentationUrl: '#',
    feedbackUrl: '#',
    sourceSystem: 'manual',
    updatedDate: '2026-07-31',
  },
  {
    id: 'mbr-wbr-insights',
    type: 'ai-tool',
    title: 'Automated MBR / WBR Insights',
    whatItDoes:
      'Drafts the narrative and callouts for weekly / monthly business reviews.',
    useItWhen: 'Preparing a WBR or MBR and want a first-draft story.',
    status: 'development',
    category: 'Operating Cadence',
    owner: { name: 'Operations Intelligence', team: 'Ops Intelligence' },
    applicationUrl: '#',
    documentationUrl: '#',
    feedbackUrl: '#',
    sourceSystem: 'manual',
    updatedDate: '2026-07-20',
  },
];

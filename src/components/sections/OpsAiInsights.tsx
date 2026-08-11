import { SectionHeader, SubHeader } from '@/components/ui/SectionHeader';
import { ToolCard } from '@/components/cards/ToolCard';
import { DashboardCard } from '@/components/cards/DashboardCard';
import { NavigationCard } from '@/components/cards/NavigationCard';
import { getAiTools, getDashboards, getDocumentation } from '@/services/contentService';
import { dashboardCategories } from '@/config/dashboards';
import { groupBy } from '@/utils/format';

const DOC_ICON: Record<string, string> = {
  architecture: 'grid',
  'tool-doc': 'bot',
  'ai-standards': 'sparkles',
  automation: 'activity',
  'data-definitions': 'server',
  'metric-definitions': 'bar-chart',
  governance: 'life-buoy',
  troubleshooting: 'help-circle',
  faq: 'help-circle',
};

/** SECTION 3 — Ops AI, Insights & Tooling. */
export async function OpsAiInsights() {
  const [tools, dashboards, docs] = await Promise.all([
    getAiTools(),
    getDashboards(),
    getDocumentation(),
  ]);

  const byCategory = groupBy(dashboards.data, (d) => d.category ?? 'Other');

  return (
    <section className="space-y-6">
      <SectionHeader
        id="ai"
        eyebrow="Section 3"
        title="Ops AI, Insights & Tooling"
        subtitle="AI tools, analytics, automation, and operational intelligence built to help teams make better decisions."
      />

      {/* AI Tools */}
      <div id="ai-tools" className="scroll-mt-8 space-y-3">
        <SubHeader title="AI Tools" count={tools.data.length} />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.data.map((t) => (
            <ToolCard key={t.id} tool={t} />
          ))}
        </div>
      </div>

      {/* Dashboards & Metrics */}
      <div id="dashboards" className="scroll-mt-8 space-y-4">
        <SubHeader title="Dashboards & Metrics" count={dashboards.data.length} />
        {dashboardCategories
          .filter((cat) => byCategory[cat]?.length)
          .map((cat) => (
            <div key={cat} className="space-y-2.5">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint">{cat}</p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {byCategory[cat].map((d) => (
                  <DashboardCard key={d.id} dashboard={d} />
                ))}
              </div>
            </div>
          ))}
      </div>

      {/* Documentation */}
      <div id="docs" className="scroll-mt-8 space-y-3">
        <SubHeader title="Documentation" count={docs.data.length} />
        <p className="text-xs text-ink-muted">
          Auto-surfaced from Confluence labels (ops-ai-doc, ops-data, ops-metric, ops-architecture).
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {docs.data.map((d) => (
            <NavigationCard
              key={d.id}
              title={d.title}
              description={d.description}
              href={d.url ?? '#'}
              icon={DOC_ICON[d.section] ?? 'file-text'}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

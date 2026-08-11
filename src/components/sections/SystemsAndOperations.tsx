import { SectionHeader, SubHeader } from '@/components/ui/SectionHeader';
import { NavigationCard } from '@/components/cards/NavigationCard';
import { SystemCard } from '@/components/cards/SystemCard';
import { getSystems } from '@/services/contentService';

/** Category navigation tiles for the operating areas. */
const WORKFORCE = [
  { title: 'Staffing & Workforce Planning', href: '#', icon: 'users', description: 'Plans, models, and headcount.' },
  { title: 'Coverage Models', href: '#', icon: 'grid', description: 'How coverage maps to demand.' },
  { title: 'Bench / Floater Visibility', href: '#', icon: 'users', description: 'Available capacity in real time.' },
  { title: 'Capacity & Scheduling', href: '#', icon: 'calendar', description: 'Capacity planning and schedules.' },
  { title: 'Forecasting', href: '#ai-tools', icon: 'trending-up', description: 'Volume and staffing forecasts.' },
];

const ACCOUNTS = [
  { title: 'Account Health', href: '#dashboards', icon: 'activity', description: 'Risk, performance, opportunity.' },
  { title: 'Escalations', href: '#', icon: 'life-buoy', description: 'Routing and escalation SOPs.' },
  { title: 'Launch / Onboarding', href: '#', icon: 'sparkles', description: 'New account launch runbooks.' },
  { title: 'Performance Management', href: '#', icon: 'bar-chart', description: 'Account performance reviews.' },
];

const CADENCE = [
  { title: 'WBR', href: '#', icon: 'calendar', description: 'Weekly business review.' },
  { title: 'MBR', href: '#', icon: 'calendar', description: 'Monthly business review.' },
  { title: 'QBR', href: '#', icon: 'calendar', description: 'Quarterly business review.' },
  { title: 'Planning Cycles', href: '#', icon: 'grid', description: 'Planning and operating reviews.' },
  { title: 'Decision Logs', href: '#', icon: 'file-text', description: 'Decisions and rationale.' },
];

/** SECTION 2 — Systems & Operations. */
export async function SystemsAndOperations() {
  const systems = await getSystems();

  return (
    <section className="space-y-6">
      <SectionHeader
        id="systems"
        eyebrow="Section 2"
        title="Systems & Operations"
        subtitle="The systems, workflows, and operating processes that power the organization."
      />

      <div id="workforce" className="scroll-mt-8 space-y-3">
        <SubHeader title="Workforce & Coverage" />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {WORKFORCE.map((c) => (
            <NavigationCard key={c.title} {...c} />
          ))}
        </div>
      </div>

      <div id="accounts" className="scroll-mt-8 space-y-3">
        <SubHeader title="Account Operations" />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ACCOUNTS.map((c) => (
            <NavigationCard key={c.title} {...c} />
          ))}
        </div>
      </div>

      <div id="cadence" className="scroll-mt-8 space-y-3">
        <SubHeader title="Operating Cadence" />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CADENCE.map((c) => (
            <NavigationCard key={c.title} {...c} />
          ))}
        </div>
      </div>

      <div id="platforms" className="scroll-mt-8 space-y-3">
        <SubHeader title="Systems" count={systems.data.length} />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {systems.data.map((s) => (
            <SystemCard key={s.id} system={s} />
          ))}
        </div>
      </div>

      <div id="sops" className="scroll-mt-8 space-y-3">
        <SubHeader title="SOP & Process Library" />
        <NavigationCard
          title="Browse the SOP & Process Library"
          description="Auto-generated from Confluence pages labelled ops-sop / ops-process. Filter by function, system, owner, or last updated."
          href="#"
          icon="book"
        />
      </div>
    </section>
  );
}

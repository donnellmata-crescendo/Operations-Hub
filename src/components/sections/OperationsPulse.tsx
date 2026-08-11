import { SectionHeader, SubHeader } from '@/components/ui/SectionHeader';
import { UpdateCard } from '@/components/cards/UpdateCard';
import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import { EmptyState } from '@/components/ui/States';
import { Owner } from '@/components/ui/Owner';
import { formatDate } from '@/utils/format';
import {
  getCompanyUpdates,
  getOperationsUpdates,
  getWhatsNew,
  getUpcomingMilestones,
} from '@/services/updateService';
import type { Milestone } from '@/types';

const MILESTONE_ICON: Record<Milestone['category'], string> = {
  launch: 'sparkles',
  migration: 'server',
  rollout: 'activity',
  review: 'bar-chart',
  planning: 'calendar',
  training: 'book',
};

function UpcomingRow({ m }: { m: Milestone }) {
  return (
    <a
      href={m.url ?? '#'}
      className="flex items-center gap-3 rounded-lg px-2 py-2 transition hover:bg-slate-50"
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-ink-muted">
        <Icon name={MILESTONE_ICON[m.category]} size={15} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-ink">{m.title}</p>
        {m.owner && <Owner owner={m.owner} className="mt-0.5" />}
      </div>
      <span className="shrink-0 text-xs font-semibold text-ink-muted">{formatDate(m.date)}</span>
    </a>
  );
}

/** SECTION 1 — Operations Pulse. */
export async function OperationsPulse() {
  const [company, ops, whatsNew, upcoming] = await Promise.all([
    getCompanyUpdates(),
    getOperationsUpdates(),
    getWhatsNew(),
    getUpcomingMilestones(),
  ]);

  return (
    <section className="space-y-5">
      <SectionHeader
        id="pulse"
        eyebrow="Section 1"
        title="Operations Pulse"
        subtitle="What's happening across Operations, the company, and our teams."
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Company Updates */}
        <div className="space-y-2.5">
          <SubHeader title="Company Updates" count={company.data.length} />
          {company.data.length ? (
            company.data.map((u) => <UpdateCard key={u.id} item={u} />)
          ) : (
            <EmptyState message="No company updates right now." />
          )}
        </div>

        {/* Operations Updates */}
        <div className="space-y-2.5">
          <SubHeader title="Operations Updates" count={ops.data.length} />
          {ops.data.length ? (
            ops.data.map((u) => <UpdateCard key={u.id} item={u} />)
          ) : (
            <EmptyState message="No operations updates right now." />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* What's New feed */}
        <div className="space-y-2.5">
          <SubHeader title="What's New" count={whatsNew.data.length} />
          {whatsNew.data.map((u) => (
            <UpdateCard key={u.id} item={u} showNew />
          ))}
        </div>

        {/* Upcoming */}
        <div className="space-y-2.5">
          <SubHeader title="Upcoming" count={upcoming.data.length} />
          <Card className="p-2">
            {upcoming.data.length ? (
              upcoming.data.map((m) => <UpcomingRow key={m.id} m={m} />)
            ) : (
              <EmptyState message="No upcoming milestones." />
            )}
          </Card>
        </div>
      </div>
    </section>
  );
}

import type { Dashboard } from '@/types';
import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import { Owner } from '@/components/ui/Owner';
import { formatTime } from '@/utils/format';

/** Dashboard directory card: name, description, source, cadence, last refresh. */
export function DashboardCard({ dashboard }: { dashboard: Dashboard }) {
  const degraded = dashboard.live && dashboard.live.ok === false;
  const refreshedIso = dashboard.lastRefreshed ?? dashboard.live?.lastSuccessfulAt;
  return (
    <Card className="flex h-full flex-col p-4">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-ink-muted">
            <Icon name="bar-chart" size={16} />
          </span>
          <p className="text-sm font-semibold text-ink">{dashboard.title}</p>
        </div>
      </div>
      <p className="mt-2 text-xs text-ink-muted">{dashboard.description}</p>

      <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
        <div>
          <dt className="text-ink-faint">Source</dt>
          <dd className="text-ink-muted">{dashboard.dataSource}</dd>
        </div>
        <div>
          <dt className="text-ink-faint">Refresh</dt>
          <dd className="text-ink-muted">{dashboard.refreshCadence}</dd>
        </div>
      </dl>

      <div className="mt-auto pt-3">
        <div className="flex items-center justify-between">
          <a
            href={dashboard.url ?? '#'}
            className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-ink hover:bg-slate-200"
          >
            <Icon name="external-link" size={13} /> Open Dashboard
          </a>
          <span className="text-[11px] text-ink-faint">
            {degraded ? (
              <span className="text-amber-600">Last refreshed {formatTime(refreshedIso)} · stale</span>
            ) : refreshedIso ? (
              <>Last refreshed {formatTime(refreshedIso)}</>
            ) : (
              <>Live refresh pending</>
            )}
          </span>
        </div>
        <div className="mt-2 border-t border-line pt-2">
          <Owner owner={dashboard.owner} />
        </div>
      </div>
    </Card>
  );
}

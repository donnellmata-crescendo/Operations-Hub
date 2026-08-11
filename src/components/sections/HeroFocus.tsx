import type { MetricSnapshot } from '@/types';
import { BarChart } from '@/components/charts/BarChart';
import { LastUpdated } from '@/components/ui/LastUpdated';
import { Icon } from '@/components/ui/Icon';

interface Props {
  focus: MetricSnapshot;
  kpis: MetricSnapshot[];
  daily: MetricSnapshot;
  focusStale?: boolean;
  dailyStale?: boolean;
}

/**
 * The hero. Left: the dark "current week volume" feature card + KPI strip +
 * projected/attainment. Right: the live Grafana daily-volume widget. This is
 * the 30-second "how are we performing?" answer, directly modeled on the
 * benchmark's AI-Managed-Volume block.
 */
export function HeroFocus({ focus, kpis, daily, focusStale, dailyStale }: Props) {
  const projected = kpis.find((k) => k.id === 'projected');
  const attainment = kpis.find((k) => k.id === 'attainment');
  const strip = kpis.filter((k) => k.id !== 'projected' && k.id !== 'attainment');

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-ink-faint">
          Quarter Focus
        </p>
        <h2 className="mt-1 text-3xl font-bold tracking-tight text-ink">AI Managed Volume</h2>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-[minmax(0,240px)_1fr]">
          {/* Dark feature card */}
          <div className="rounded-xl2 bg-feature p-5 text-white shadow-card">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              {focus.label}
            </p>
            <p className="mt-2 text-5xl font-bold leading-none">{focus.value}</p>
            {focus.delta && (
              <p
                className={`mt-2 text-sm font-semibold ${
                  focus.delta.direction === 'down' ? 'text-rose-300' : 'text-emerald-300'
                }`}
              >
                {focus.delta.value}
              </p>
            )}
          </div>

          {/* Projected / attainment + progress */}
          <div className="flex flex-col justify-center">
            <div className="flex flex-wrap gap-x-10 gap-y-3">
              {projected && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-ink-faint">
                    Projected
                  </p>
                  <p className="text-2xl font-bold text-ink">{projected.value}</p>
                  <p className="text-xs text-accent">{projected.caption}</p>
                </div>
              )}
              {attainment && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-ink-faint">
                    QTD Attainment
                  </p>
                  <p className="text-2xl font-bold text-ink">{attainment.value}</p>
                </div>
              )}
            </div>
            <div className="mt-3">
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                <div className="h-full w-[11%] rounded-full bg-data-gradient" />
              </div>
              <p className="mt-1.5 text-xs text-ink-muted">{focus.caption}</p>
            </div>
          </div>
        </div>

        {/* KPI strip */}
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {strip.map((k) => (
            <div key={k.id} className="rounded-xl border border-line bg-surface p-3">
              <p className="text-[11px] font-medium uppercase tracking-wide text-ink-faint">
                {k.label}
              </p>
              <p className="mt-0.5 text-xl font-bold text-ink">{k.value}</p>
              {k.delta && (
                <p
                  className={`text-[11px] font-medium ${
                    k.delta.direction === 'down' ? 'text-rose-600' : 'text-emerald-600'
                  }`}
                >
                  {k.delta.value}
                </p>
              )}
            </div>
          ))}
        </div>
        <p className="mt-3">
          <LastUpdated iso={focus.lastRefreshed} label="Last refreshed" withTime stale={focusStale} />
        </p>
      </div>

      {/* Right: live daily volume widget */}
      <div className="rounded-xl2 border border-line bg-surface p-5 shadow-card">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-faint">
              Daily Volume
            </p>
            <p className="mt-0.5 text-base font-bold leading-tight text-ink">{daily.label}</p>
          </div>
          <Icon name="settings" size={16} className="text-ink-faint" />
        </div>
        <p className="mt-3 text-5xl font-bold leading-none text-ink">{daily.value}</p>
        <div className="mt-4">
          <BarChart series={daily.series ?? []} />
          <div className="mt-1 flex justify-between text-[11px] text-ink-faint">
            <span>7/13</span>
            <span>8/11</span>
          </div>
        </div>
        <p className="mt-2">
          <LastUpdated iso={daily.lastRefreshed} label="Last refreshed" withTime stale={dailyStale} />
        </p>
      </div>
    </div>
  );
}

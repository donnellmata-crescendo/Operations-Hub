import { formatDate, formatTime, relativeDays } from '@/utils/format';

interface Props {
  /** ISO date/time of the update or refresh. */
  iso?: string;
  /** "Updated" (default) or "Last refreshed" for live data. */
  label?: 'Updated' | 'Last refreshed' | 'New';
  /** Use a time-of-day format (for live refresh timestamps). */
  withTime?: boolean;
  /** Degraded state: show a subtle "temporarily unavailable" note. */
  stale?: boolean;
  className?: string;
}

/** Ownership/freshness metadata line shared by cards. */
export function LastUpdated({ iso, label = 'Updated', withTime = false, stale = false, className = '' }: Props) {
  const value = withTime ? formatTime(iso) : formatDate(iso);
  return (
    <span className={`text-xs text-ink-faint ${className}`}>
      {label} {withTime ? value : value || relativeDays(iso)}
      {stale && <span className="ml-1 text-amber-600">· data temporarily unavailable</span>}
    </span>
  );
}

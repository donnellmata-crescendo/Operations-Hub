import { Icon } from './Icon';

/**
 * EmptyState / ErrorState / SkeletonLoader.
 * The page must never show a broken or empty card — a failed integration
 * renders ErrorState (with last-known context) and a loading region renders
 * SkeletonLoader.
 */

export function EmptyState({ message = 'Nothing here yet.' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-line bg-surface px-6 py-8 text-center">
      <Icon name="file-text" size={20} className="text-ink-faint" />
      <p className="mt-2 text-sm text-ink-muted">{message}</p>
    </div>
  );
}

export function ErrorState({
  message = 'Data temporarily unavailable.',
  lastRefreshed,
}: {
  message?: string;
  lastRefreshed?: string;
}) {
  return (
    <div className="rounded-xl border border-line bg-surface px-4 py-3">
      <p className="text-sm text-ink-muted">{message}</p>
      {lastRefreshed && (
        <p className="mt-1 text-xs text-ink-faint">Last refreshed {lastRefreshed}</p>
      )}
    </div>
  );
}

export function SkeletonLoader({ rows = 3 }: { rows?: number }) {
  return (
    <div className="space-y-2" aria-hidden>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-16 animate-pulse rounded-xl bg-slate-100" />
      ))}
    </div>
  );
}

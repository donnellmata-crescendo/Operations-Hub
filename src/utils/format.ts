/** Small formatting helpers shared across cards. Pure + dependency-free. */

/** "Aug 10" / "Aug 10, 2026" from an ISO date. */
export function formatDate(iso?: string, withYear = false): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    ...(withYear ? { year: 'numeric' } : {}),
  });
}

/** "11:42 AM" from an ISO timestamp — for "Last refreshed". */
export function formatTime(iso?: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });
}

/** "3 days ago" style relative label, computed against a fixed reference so
 *  server and client render identically (avoids hydration mismatch). */
export function relativeDays(iso?: string, now = '2026-08-11'): string {
  if (!iso) return '';
  const then = new Date(iso).getTime();
  const ref = new Date(now).getTime();
  if (Number.isNaN(then) || Number.isNaN(ref)) return '';
  const days = Math.round((ref - then) / 86_400_000);
  if (days <= 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 7) return `${days}d ago`;
  const weeks = Math.round(days / 7);
  return `${weeks}w ago`;
}

/** Group an array by a key selector, preserving insertion order. */
export function groupBy<T>(
  items: T[],
  key: (item: T) => string
): Record<string, T[]> {
  return items.reduce<Record<string, T[]>>((acc, item) => {
    const k = key(item);
    (acc[k] ??= []).push(item);
    return acc;
  }, {});
}

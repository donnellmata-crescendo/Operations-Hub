import type { Owner as OwnerType } from '@/types';

/** Compact ownership chip. Initials avatar keeps it dependency-free. */
export function Owner({ owner, className = '' }: { owner?: OwnerType; className?: string }) {
  if (!owner) return null;
  const initials = owner.name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs text-ink-muted ${className}`}>
      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-slate-200 text-[9px] font-semibold text-slate-600">
        {initials}
      </span>
      {owner.name}
    </span>
  );
}

import type { Status } from '@/types';

const STYLES: Record<string, { label: string; className: string; dot: string }> = {
  production: { label: 'Production', className: 'bg-accent-soft text-emerald-800', dot: 'bg-accent' },
  operational: { label: 'Operational', className: 'bg-accent-soft text-emerald-800', dot: 'bg-accent' },
  beta: { label: 'Beta', className: 'bg-blue-50 text-blue-700', dot: 'bg-blue-500' },
  pilot: { label: 'Pilot', className: 'bg-indigo-50 text-indigo-700', dot: 'bg-indigo-500' },
  development: { label: 'Development', className: 'bg-slate-100 text-slate-600', dot: 'bg-slate-400' },
  maintenance: { label: 'Maintenance', className: 'bg-amber-50 text-amber-700', dot: 'bg-amber-500' },
  issue: { label: 'Issue', className: 'bg-red-50 text-red-700', dot: 'bg-red-500' },
  deprecated: { label: 'Deprecated', className: 'bg-slate-100 text-slate-500 line-through', dot: 'bg-slate-400' },
};

export function StatusBadge({ status }: { status?: Status }) {
  if (!status) return null;
  const s = STYLES[status] ?? STYLES.development;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${s.className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}

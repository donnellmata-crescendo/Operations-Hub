import type { ReactNode } from 'react';

interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  id?: string;
  action?: ReactNode;
}

/** Bold section title + supporting description. The primary rhythm of the page. */
export function SectionHeader({ eyebrow, title, subtitle, id, action }: Props) {
  return (
    <div id={id} className="scroll-mt-8">
      <div className="flex items-end justify-between gap-4 border-b border-line pb-3">
        <div>
          {eyebrow && (
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-ink-faint">
              {eyebrow}
            </p>
          )}
          <h2 className="text-2xl font-bold tracking-tight text-ink">{title}</h2>
          {subtitle && <p className="mt-1 text-sm text-ink-muted">{subtitle}</p>}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    </div>
  );
}

/** Sub-group heading within a section (e.g. "Workforce & Coverage"). */
export function SubHeader({ title, id, count }: { title: string; id?: string; count?: number }) {
  return (
    <h3 id={id} className="scroll-mt-8 flex items-center gap-2 text-sm font-semibold text-ink">
      {title}
      {typeof count === 'number' && (
        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-ink-muted">
          {count}
        </span>
      )}
    </h3>
  );
}

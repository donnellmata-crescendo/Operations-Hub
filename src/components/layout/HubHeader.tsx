import { quickLinks } from '@/config/navigation';
import { Icon } from '@/components/ui/Icon';

/**
 * The masthead: title, one-line description, search, and quick-link chips.
 * Answers "where am I / how do I get somewhere fast" in the first viewport.
 */
export function HubHeader({ owner, updated }: { owner: string; updated: string }) {
  return (
    <header id="top" className="scroll-mt-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Crescendo Operations
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-ink-muted">
            The front door for Operations — what&apos;s happening, the systems and processes
            that run the org, and the AI tools, dashboards, and docs built to help teams
            make better decisions.
          </p>
        </div>
        <div className="hidden shrink-0 text-right sm:block">
          <p className="text-xs text-ink-faint">Owner: {owner}</p>
          <p className="text-xs font-semibold text-ink-muted">Updated {updated}</p>
        </div>
      </div>

      {/* Search */}
      <div className="mt-5">
        <div className="flex items-center gap-2 rounded-xl border border-line bg-surface px-3.5 py-2.5 shadow-card">
          <Icon name="search" size={18} className="text-ink-faint" />
          <input
            type="search"
            placeholder="Search Operations — systems, SOPs, tools, dashboards, docs"
            className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-faint"
            aria-label="Search Operations"
          />
        </div>
      </div>

      {/* Quick links */}
      <div className="mt-3 flex flex-wrap gap-2">
        {quickLinks.map((q) => (
          <a
            key={q.label}
            href={q.href}
            className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-medium text-ink-muted shadow-card transition hover:border-slate-300 hover:text-ink"
          >
            <Icon name={q.icon} size={14} />
            {q.label}
          </a>
        ))}
      </div>
    </header>
  );
}

import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';

const ACTIONS = [
  { title: 'Request documentation', description: "Can't find a doc? Ask us to add it.", icon: 'file-text', href: '#' },
  { title: 'Report an issue', description: 'Flag a broken link, system, or dashboard.', icon: 'life-buoy', href: '#' },
  { title: 'Submit an AI use case', description: 'Propose a new Ops AI tool or automation.', icon: 'sparkles', href: '#' },
  { title: 'Suggest an improvement', description: 'Ideas to make the Hub better.', icon: 'plus', href: '#' },
];

/** HELP / OWNERSHIP footer block. */
export function HelpOwnership({ owner, updated }: { owner: string; updated: string }) {
  return (
    <section className="space-y-4">
      <SectionHeader id="help" eyebrow="Help" title="Can't find something?" />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {ACTIONS.map((a) => (
          <Card key={a.title} href={a.href} className="group p-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-ink-muted group-hover:bg-accent-soft group-hover:text-accent">
              <Icon name={a.icon} size={18} />
            </span>
            <p className="mt-2.5 text-sm font-semibold text-ink">{a.title}</p>
            <p className="mt-0.5 text-xs text-ink-muted">{a.description}</p>
          </Card>
        ))}
      </div>
      <div className="flex items-center justify-between rounded-xl border border-line bg-surface px-4 py-3">
        <p className="text-xs text-ink-muted">
          Page Owner: <span className="font-semibold text-ink">{owner}</span>
        </p>
        <p className="text-xs text-ink-faint">Updated {updated}</p>
      </div>
    </section>
  );
}

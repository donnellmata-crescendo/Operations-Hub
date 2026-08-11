import type { SystemEntry } from '@/types';
import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import { Owner } from '@/components/ui/Owner';
import { StatusBadge } from '@/components/ui/StatusBadge';

const LINKS: { key: keyof SystemEntry['links']; label: string; icon: string }[] = [
  { key: 'open', label: 'Open', icon: 'external-link' },
  { key: 'documentation', label: 'Docs', icon: 'file-text' },
  { key: 'sops', label: 'SOPs', icon: 'book' },
  { key: 'knownIssues', label: 'Known issues', icon: 'help-circle' },
];

export function SystemCard({ system }: { system: SystemEntry }) {
  return (
    <Card className="flex flex-col p-4">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-ink-muted">
            <Icon name="server" size={16} />
          </span>
          <p className="text-sm font-semibold text-ink">{system.title}</p>
        </div>
        <StatusBadge status={system.status} />
      </div>
      <p className="mt-2 text-xs text-ink-muted">{system.purpose}</p>
      <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5">
        {LINKS.filter((l) => system.links[l.key]).map((l) => (
          <a
            key={l.key}
            href={system.links[l.key]}
            className="inline-flex items-center gap-1 text-xs font-medium text-brand-link hover:underline"
          >
            <Icon name={l.icon} size={13} />
            {l.label}
          </a>
        ))}
      </div>
      <div className="mt-3 border-t border-line pt-2">
        <Owner owner={system.owner} />
      </div>
    </Card>
  );
}

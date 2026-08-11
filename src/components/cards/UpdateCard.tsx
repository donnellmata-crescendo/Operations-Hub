import type { UpdateItem } from '@/types';
import { Card } from '@/components/ui/Card';
import { Owner } from '@/components/ui/Owner';
import { LastUpdated } from '@/components/ui/LastUpdated';
import { formatDate } from '@/utils/format';

const SOURCE_LABEL: Record<string, string> = {
  confluence: 'Confluence',
  jira: 'Jira',
  slack: 'Slack',
  warehouse: 'Warehouse',
  grafana: 'Grafana',
  google: 'Google',
  manual: 'Curated',
};

/** A single feed row: title, one-line summary, date, source. Compact + scannable. */
export function UpdateCard({ item, showNew = false }: { item: UpdateItem; showNew?: boolean }) {
  return (
    <Card href={item.url ?? '#'} className="group p-4">
      <div className="flex items-center gap-2">
        {showNew && item.isNew && (
          <span className="rounded bg-accent px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
            New
          </span>
        )}
        <span className="text-xs text-ink-faint">{formatDate(item.updatedDate)}</span>
        <span className="ml-auto rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-ink-muted">
          {SOURCE_LABEL[item.source] ?? item.source}
        </span>
      </div>
      <p className="mt-1.5 text-sm font-semibold text-ink group-hover:text-brand-link">
        {item.title}
      </p>
      <p className="mt-0.5 line-clamp-2 text-xs text-ink-muted">{item.summary}</p>
      {item.owner && (
        <div className="mt-2 flex items-center justify-between">
          <Owner owner={item.owner} />
        </div>
      )}
    </Card>
  );
}

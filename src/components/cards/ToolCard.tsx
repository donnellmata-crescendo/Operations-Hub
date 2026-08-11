import type { AiTool } from '@/types';
import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import { Owner } from '@/components/ui/Owner';
import { StatusBadge } from '@/components/ui/StatusBadge';

/** AI tool card. Structure is fixed so adding a tool is metadata-only. */
export function ToolCard({ tool }: { tool: AiTool }) {
  return (
    <Card className="flex h-full flex-col p-4">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-soft text-accent">
            <Icon name="bot" size={16} />
          </span>
          <p className="text-sm font-semibold text-ink">{tool.title}</p>
        </div>
        <StatusBadge status={tool.status} />
      </div>

      <dl className="mt-3 space-y-2 text-xs">
        <div>
          <dt className="font-semibold text-ink-muted">What it does</dt>
          <dd className="text-ink-muted">{tool.whatItDoes}</dd>
        </div>
        <div>
          <dt className="font-semibold text-ink-muted">Use it when</dt>
          <dd className="text-ink-muted">{tool.useItWhen}</dd>
        </div>
      </dl>

      <div className="mt-auto pt-3">
        <div className="flex flex-wrap gap-x-3 gap-y-1.5">
          <a
            href={tool.applicationUrl ?? '#'}
            className="inline-flex items-center gap-1 rounded-lg bg-feature px-2.5 py-1 text-xs font-semibold text-white hover:bg-feature-soft"
          >
            <Icon name="external-link" size={13} /> Launch
          </a>
          <a
            href={tool.documentationUrl ?? '#'}
            className="inline-flex items-center gap-1 text-xs font-medium text-brand-link hover:underline"
          >
            <Icon name="file-text" size={13} /> Docs
          </a>
          <a
            href={tool.feedbackUrl ?? '#'}
            className="inline-flex items-center gap-1 text-xs font-medium text-ink-muted hover:underline"
          >
            Feedback
          </a>
        </div>
        <div className="mt-2 border-t border-line pt-2">
          <Owner owner={tool.owner} />
        </div>
      </div>
    </Card>
  );
}

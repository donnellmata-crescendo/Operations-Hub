import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';

interface Props {
  title: string;
  description?: string;
  href: string;
  icon: string;
  count?: number;
}

/** A "go somewhere" tile used for category navigation within sections. */
export function NavigationCard({ title, description, href, icon, count }: Props) {
  return (
    <Card href={href} className="group p-4">
      <div className="flex items-start gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-ink-muted group-hover:bg-accent-soft group-hover:text-accent">
          <Icon name={icon} size={18} />
        </span>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className="truncate text-sm font-semibold text-ink">{title}</p>
            {typeof count === 'number' && (
              <span className="rounded-full bg-slate-100 px-1.5 text-xs text-ink-muted">
                {count}
              </span>
            )}
          </div>
          {description && (
            <p className="mt-0.5 line-clamp-2 text-xs text-ink-muted">{description}</p>
          )}
        </div>
        <Icon
          name="arrow-right"
          size={16}
          className="ml-auto mt-1 shrink-0 text-ink-faint opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100"
        />
      </div>
    </Card>
  );
}

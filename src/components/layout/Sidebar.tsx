import { navigation } from '@/config/navigation';
import { Icon } from '@/components/ui/Icon';

/** Left navigation, mirroring the benchmark: logo, grouped section links. */
export function Sidebar() {
  return (
    <aside className="hidden w-60 shrink-0 border-r border-line bg-surface lg:block">
      <div className="sticky top-0 flex h-screen flex-col">
        <div className="flex items-center gap-2 px-5 py-5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-data-gradient text-white">
            <Icon name="activity" size={18} />
          </span>
          <span className="text-sm font-bold tracking-tight text-ink">Operations Hub</span>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 pb-6">
          {navigation.map((item) => (
            <div key={item.label} className="mb-0.5">
              <a
                href={item.href}
                className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition ${
                  item.active
                    ? 'bg-accent-soft font-semibold text-accent'
                    : 'text-ink-muted hover:bg-slate-50 hover:text-ink'
                }`}
              >
                <Icon name={item.icon} size={17} />
                {item.label}
              </a>
              {item.children && (
                <div className="ml-4 mt-0.5 border-l border-line pl-2">
                  {item.children.map((child) => (
                    <a
                      key={child.label}
                      href={child.href}
                      className="block rounded-md px-2.5 py-1.5 text-[13px] text-ink-muted hover:bg-slate-50 hover:text-ink"
                    >
                      {child.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="border-t border-line px-5 py-3 text-[11px] text-ink-faint">
          Crescendo · Operations
        </div>
      </div>
    </aside>
  );
}

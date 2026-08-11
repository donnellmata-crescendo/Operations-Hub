import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  href?: string;
  className?: string;
  as?: 'div' | 'a';
}

/**
 * Base surface: subtle border, soft shadow, hover lift when interactive.
 * The visual unit the whole page is built from (per the benchmark).
 */
export function Card({ children, href, className = '', as }: CardProps) {
  const base =
    'block rounded-xl2 border border-line bg-surface shadow-card transition';
  const interactive = href
    ? 'hover:-translate-y-0.5 hover:shadow-cardHover hover:border-slate-300'
    : '';
  const cls = `${base} ${interactive} ${className}`;
  if (href || as === 'a') {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }
  return <div className={cls}>{children}</div>;
}

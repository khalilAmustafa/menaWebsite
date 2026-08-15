import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

export interface Crumb {
  label: ReactNode;
  /** Omit `to` on the current (last) crumb. */
  to?: string;
}

/**
 * Semantic breadcrumb navigation used by the routed research pages. The last item is the
 * current page (no link, `aria-current="page"`), and is truncated so a long paper title
 * never blows up the layout (the full title still appears in the page <h1>).
 */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] tracking-wider uppercase text-neutral-500">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-x-2 min-w-0">
              {item.to && !isLast ? (
                <Link
                  to={item.to}
                  className="text-brand-teal hover:text-brand-teal-bright transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/50"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? 'page' : undefined}
                  className="text-neutral-300 truncate max-w-[70vw] sm:max-w-[42ch]"
                >
                  {item.label}
                </span>
              )}
              {!isLast && (
                <span aria-hidden="true" className="text-neutral-600">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

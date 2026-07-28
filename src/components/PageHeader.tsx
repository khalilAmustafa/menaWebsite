import type { ReactNode } from 'react';

interface PageHeaderProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
}

/**
 * Routed-page header. Reuses the site's existing section-header visual language
 * (mono uppercase brand eyebrow, display heading, short teal divider, muted
 * description) — but renders an <h1> because these are top-level routed pages.
 */
export default function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  // Intentionally a <div>, not a <header>, so the only banner landmark on the page
  // remains the site navigation <header>.
  return (
    <div className="text-center max-w-3xl mx-auto mb-12">
      {eyebrow && (
        <span className="font-mono text-xs text-brand-teal font-bold tracking-widest uppercase block mb-3">
          {eyebrow}
        </span>
      )}
      <h1 className="font-display font-medium text-3xl sm:text-5xl text-white tracking-tight uppercase">
        {title}
      </h1>
      <div className="h-0.5 w-16 bg-brand-teal mx-auto mt-6" />
      {description && (
        <p className="font-sans text-sm text-neutral-400 mt-6 leading-relaxed">{description}</p>
      )}
    </div>
  );
}

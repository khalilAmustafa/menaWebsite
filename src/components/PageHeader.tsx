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
    <div className="page-intro">
      <div className="page-intro__grid">
        <div>
          {eyebrow && <span className="section-index mb-5">{eyebrow}</span>}
          <h1>{title}</h1>
        </div>
        {description && <p>{description}</p>}
      </div>
    </div>
  );
}

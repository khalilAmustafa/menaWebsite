import { Link } from 'react-router-dom';
import type { ResearchPaper } from '../../content/types';

interface ResearchCardProps {
  paper: ResearchPaper;
  isArabic?: boolean;
  // Declared to match this project's existing convention (see ScrollReveal) where `key`
  // must be allowed explicitly on custom components under its React/TS setup.
  key?: string | number;
}

/**
 * Research paper card. The whole card links to `/research/{slug}`. Matches the existing
 * MENA card language (cream/dark panel, rounded-2xl, subtle border + hover). Long academic
 * titles are clamped to keep cards uniform but stay fully available via the title attribute
 * and the detail page. Light/dark come from the shared theme tokens.
 */
export default function ResearchCard({ paper, isArabic = false }: ResearchCardProps) {
  const title = isArabic && paper.title.ar ? paper.title.ar : paper.title.en;
  const authors = paper.authors
    .map((author) => isArabic && author.nameAr ? author.nameAr : author.name)
    .join(isArabic ? '، ' : ', ');
  const conferenceName = paper.conference
    ? isArabic && paper.conference.nameAr
      ? paper.conference.nameAr
      : paper.conference.name
    : '';

  return (
    <Link
      to={`/research/${paper.slug}`}
      className="research-entry group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/50"
    >
      <div>
        <span className="mb-3 block font-mono text-[9px] font-bold uppercase tracking-widest text-brand-teal">
          {isArabic ? 'ورقة بحثية مقبولة' : 'Accepted Paper'}
        </span>
        <h3
          title={title}
          className="font-display text-xl font-semibold uppercase leading-tight tracking-tight text-[var(--page-ink)] transition-colors group-hover:text-brand-teal sm:text-2xl"
        >
          {title}
        </h3>
      </div>

      <div className="space-y-1.5">
        <p className="font-sans text-xs leading-relaxed text-[var(--page-muted)]">{authors}</p>
        {paper.conference && (
          <p className="font-mono text-[10px] tracking-wide text-[var(--page-subtle)]">
            {conferenceName}
            {paper.conference.year ? ` · ${paper.conference.year}` : ''}
          </p>
        )}
      </div>
    </Link>
  );
}

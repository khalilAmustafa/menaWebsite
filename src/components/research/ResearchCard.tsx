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
  const authors = paper.authors.map((author) => author.name).join(', ');

  return (
    <Link
      to={`/research/${paper.slug}`}
      className="group relative flex h-full flex-col justify-between rounded-2xl border border-neutral-900/80 bg-neutral-900/25 p-6 shadow-xl transition-all duration-300 hover:border-brand-teal/30 hover:bg-neutral-900/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/50"
    >
      <div>
        <span className="mb-3 block font-mono text-[9px] font-bold uppercase tracking-widest text-brand-teal">
          {isArabic ? 'ورقة بحثية مقبولة' : 'Accepted Paper'}
        </span>
        <h3
          title={paper.title.en}
          className="mb-4 line-clamp-4 font-display text-base font-bold leading-snug tracking-tight text-white transition-colors group-hover:text-brand-teal sm:text-lg"
        >
          {paper.title.en}
        </h3>
      </div>

      <div className="mt-auto space-y-1.5">
        <p className="font-sans text-xs leading-relaxed text-neutral-400">{authors}</p>
        {paper.conference && (
          <p className="font-mono text-[10px] tracking-wide text-neutral-500">
            {paper.conference.name}
            {paper.conference.year ? ` · ${paper.conference.year}` : ''}
          </p>
        )}
      </div>
    </Link>
  );
}

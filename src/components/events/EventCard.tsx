import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import type { Event } from '../../content/types';

interface EventCardProps {
  event: Event;
  isArabic?: boolean;
  /**
   * Heading level for the card title. Defaults to 'h2' so a grid of cards sitting directly
   * under a page 'h1' forms a valid hierarchy (h1 → h2). Pass 'h3' when the cards are nested
   * under their own 'h2' section heading.
   */
  headingLevel?: 'h2' | 'h3';
  // Declared to match this project's convention (see ScrollReveal/ResearchCard).
  key?: string | number;
}

/**
 * Reusable event card for the /events landing page. Shows only confirmed fields — image,
 * title, year and location when present, and a short summary. Unknown metadata is simply
 * omitted (no "TBD"/"Coming Soon"). Matches the shared MENA card language + theme tokens.
 */
export default function EventCard({ event, isArabic = false, headingLevel = 'h2' }: EventCardProps) {
  const Heading = headingLevel;
  const title = isArabic && event.title.ar ? event.title.ar : event.title.en;
  const summary = event.summary ? (isArabic && event.summary.ar ? event.summary.ar : event.summary.en) : '';
  const location = event.location ? (isArabic && event.location.ar ? event.location.ar : event.location.en) : '';
  const heroAlt = event.hero ? (isArabic && event.hero.alt.ar ? event.hero.alt.ar : event.hero.alt.en) : title;

  return (
    <Link
      to={`/events/${event.slug}`}
      className="event-entry group flex h-full flex-col overflow-hidden border transition-[background-color,border-color,color,transform] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/50"
    >
      <div className="aspect-[4/3] w-full overflow-hidden bg-[var(--page-surface-raised)]">
        {event.hero ? (
          <img
            src={event.hero.src}
            alt={heroAlt}
            width={event.hero.width}
            height={event.hero.height}
            loading="lazy"
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-display text-2xl font-bold text-neutral-700">
            MENA
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        {(event.year || location) && (
          <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-widest text-brand-teal">
            {event.year && <span>{event.year}</span>}
            {location && (
              <span className="inline-flex items-center gap-1 text-[var(--page-subtle)]">
                <MapPin className="h-3 w-3" />
                {location}
              </span>
            )}
          </div>
        )}
        {/*
          Phase 6.2: was an <h3> directly under the page <h1>, skipping h2. The tag is now
          driven by `headingLevel` (default h2). Styling is unchanged — this is a semantics-only
          fix, so the card looks identical.
        */}
        <Heading className="font-display text-2xl font-semibold uppercase leading-none tracking-tight text-[var(--page-ink)] transition-colors group-hover:text-brand-teal sm:text-3xl">
          {title}
        </Heading>
        {summary && (
          <p className="mt-3 line-clamp-3 font-sans text-sm leading-7 text-[var(--page-muted)]">{summary}</p>
        )}
        <span className="mt-auto pt-4 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-brand-teal">
          {isArabic ? 'عرض الفعالية' : 'View Event'}
          <ArrowRight className="h-3 w-3 rtl:rotate-180" />
        </span>
      </div>
    </Link>
  );
}

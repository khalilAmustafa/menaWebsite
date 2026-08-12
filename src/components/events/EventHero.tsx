import type { ReactNode } from 'react';
import { MapPin } from 'lucide-react';
import ScrollReveal from '../ScrollReveal';
import type { Event } from '../../content/types';

interface EventHeroProps {
  event: Event;
  isArabic?: boolean;
  /** Optional eyebrow override; defaults to "EVENT · {year}" when a year exists. */
  eyebrow?: string;
  children?: ReactNode;
}

/**
 * Shared event-detail hero: a split layout (title block + framed hero image) that adapts to
 * both portrait and landscape source images via object-cover. Shows only confirmed metadata
 * (year, location) — nothing fabricated. Reused across the event detail pages so they share a
 * consistent look without copy-pasting the Space Game page.
 */
export default function EventHero({ event, isArabic = false, eyebrow, children }: EventHeroProps) {
  const title = isArabic && event.title.ar ? event.title.ar : event.title.en;
  const summary = event.summary ? (isArabic && event.summary.ar ? event.summary.ar : event.summary.en) : '';
  const location = event.location ? (isArabic && event.location.ar ? event.location.ar : event.location.en) : '';
  const heroAlt = event.hero ? (isArabic && event.hero.alt.ar ? event.hero.alt.ar : event.hero.alt.en) : title;
  const defaultEyebrow = event.year ? `${isArabic ? 'فعالية' : 'EVENT'} · ${event.year}` : isArabic ? 'فعالية' : 'EVENT';

  return (
    <ScrollReveal variant="clip">
      <section className="mb-16 grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <div>
          <span className="mb-3 block font-mono text-xs font-bold uppercase tracking-widest text-brand-teal">
            {eyebrow ?? defaultEyebrow}
          </span>
          <h1 className="font-display text-3xl font-medium leading-tight tracking-tight text-white sm:text-5xl">
            {title}
          </h1>
          {location && (
            <p className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-neutral-400">
              <MapPin className="h-3.5 w-3.5 text-brand-teal" />
              {location}
            </p>
          )}
          {summary && (
            <p className="mt-5 max-w-md font-sans text-sm leading-relaxed text-neutral-300 sm:text-base">
              {summary}
            </p>
          )}
          {children}
        </div>

        {event.hero && (
          <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-neutral-900/80 bg-neutral-900 shadow-2xl">
            <img src={event.hero.src} alt={heroAlt} className="aspect-[4/3] w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
        )}
      </section>
    </ScrollReveal>
  );
}

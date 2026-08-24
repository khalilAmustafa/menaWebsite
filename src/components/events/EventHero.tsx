import type { ReactNode } from 'react';
import { MapPin } from 'lucide-react';
import ScrollReveal from '../ScrollReveal';
import type { Event } from '../../content/types';

interface EventHeroProps {
  event: Event;
  isArabic?: boolean;
  eyebrow?: string;
  children?: ReactNode;
}

export default function EventHero({ event, isArabic = false, eyebrow, children }: EventHeroProps) {
  const title = isArabic && event.title.ar ? event.title.ar : event.title.en;
  const summary = event.summary ? (isArabic && event.summary.ar ? event.summary.ar : event.summary.en) : '';
  const location = event.location ? (isArabic && event.location.ar ? event.location.ar : event.location.en) : '';
  const heroAlt = event.hero ? (isArabic && event.hero.alt.ar ? event.hero.alt.ar : event.hero.alt.en) : title;
  const defaultEyebrow = event.year ? `${isArabic ? 'سجل فعالية' : 'Event record'} · ${event.year}` : isArabic ? 'سجل فعالية' : 'Event record';

  return (
    <ScrollReveal variant="clip">
      <section className="mb-16 grid items-stretch overflow-hidden border-y border-[var(--page-border)] lg:grid-cols-12">
        <div className="flex flex-col justify-end py-10 lg:col-span-5 lg:pe-12 lg:py-16">
          <span className="section-index">{eyebrow ?? defaultEyebrow}</span>
          <h1 className="event-detail-title mt-6 font-display font-medium uppercase tracking-[-0.03em] text-[var(--page-ink)]">{title}</h1>
          {location && <p className="mt-5 inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-[var(--page-muted)]"><MapPin className="h-3.5 w-3.5 text-brand-teal" aria-hidden="true" />{location}</p>}
          {summary && <p className="mt-6 max-w-xl text-sm leading-7 text-[var(--page-muted)] sm:text-base">{summary}</p>}
          {children}
        </div>
        {event.hero && (
          <figure className="event-detail-media bg-[var(--page-surface-raised)] lg:col-span-7">
            <img src={event.hero.src} alt={heroAlt} width={event.hero.width} height={event.hero.height} fetchPriority="high" className="h-full w-full object-cover object-center" />
          </figure>
        )}
      </section>
    </ScrollReveal>
  );
}

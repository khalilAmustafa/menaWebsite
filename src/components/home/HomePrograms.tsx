import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '../ScrollReveal';
import { ACTIVITIES } from '../../content/activities';

interface HomeProgramsProps {
  isArabic: boolean;
}

/**
 * OUR PROGRAMS — the homepage's only card-based section, which is where cards genuinely
 * belong: each card is a real content unit linking to its own page.
 *
 * Renders every verified activity in the repository (currently two: SYSTEM and the
 * ملتقى الصناع forum, whose 2024 and 2025 editions are one record). Any activity without a
 * confirmed summary simply shows name + period + image; no descriptive filler is invented.
 */
export default function HomePrograms({ isArabic }: HomeProgramsProps) {
  return (
    <section id="programs" className="section-block section-rule">
      <div className="site-container">
        <ScrollReveal variant="clip" className="mission-gallery-header mb-10">
          <div>
            <span className="section-index">{isArabic ? 'برامجنا' : 'Our programs'}</span>
            <h2 className="section-title mt-5">{isArabic ? 'تعلّم. ابنِ. انمُ.' : 'Learn. Build. Grow.'}</h2>
          </div>
          <div>
            <p className="section-copy">
              {isArabic
                ? 'برامج وأنشطة موثّقة تمنح المشاركين مساحة للتجربة والتصميم والعمل ضمن فرق.'
                : 'Confirmed programs and activities that give participants space to experiment, design, and work in teams.'}
            </p>
            <Link
              to="/activities"
              className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-brand-teal transition-colors hover:text-brand-teal-bright"
            >
              {isArabic ? 'كل البرامج' : 'View all programs'}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
            </Link>
          </div>
        </ScrollReveal>

        {/* Two programs fill the row as halves; three or more use the compact thirds. */}
        <div className={`program-archive program-archive--compact${ACTIVITIES.length === 2 ? ' program-archive--pair' : ''}`}>
          {ACTIVITIES.map((activity, index) => {
            const title = isArabic && activity.title.ar ? activity.title.ar : activity.title.en;
            const summary = activity.summary
              ? isArabic && activity.summary.ar
                ? activity.summary.ar
                : activity.summary.en
              : '';
            const period = activity.period ?? (activity.year ? String(activity.year) : '');
            const imageAlt = activity.image
              ? isArabic && activity.image.alt.ar
                ? activity.image.alt.ar
                : activity.image.alt.en
              : title;

            return (
              <ScrollReveal key={activity.id} variant="fade-up" delay={index * 0.05}>
                <Link
                  to={`/activities/${activity.slug}`}
                  className="program-entry group flex h-full flex-col overflow-hidden border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal"
                >
                  {activity.image && (
                    <div className={`aspect-[16/8] overflow-hidden ${activity.imageFit === 'contain' ? 'bg-white' : 'bg-[var(--page-surface-raised)]'}`}>
                      <img
                        src={activity.image.src}
                        alt={imageAlt}
                        width={activity.image.width}
                        height={activity.image.height}
                        loading="lazy"
                        className={`h-full w-full transition-transform duration-700 group-hover:scale-[1.025] ${activity.imageFit === 'contain' ? 'object-contain p-5' : 'object-cover'}`}
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-5">
                    <span className="font-mono text-[0.64rem] uppercase tracking-[0.14em] text-brand-teal">
                      {period || (isArabic ? 'برنامج' : 'Program')}
                    </span>
                    <h3 className="mt-3 font-display text-xl font-semibold uppercase leading-none text-[var(--page-ink)] sm:text-2xl">
                      {title}
                    </h3>
                    {summary && <p className="mt-3 line-clamp-2 text-sm leading-6 text-[var(--page-muted)]">{summary}</p>}
                    <span className="mt-auto flex items-center gap-2 pt-5 text-xs font-bold uppercase tracking-[0.08em] text-[var(--page-ink)]">
                      {isArabic ? 'استكشف' : 'Explore'}
                      <ArrowRight className="h-3.5 w-3.5 text-brand-teal rtl:rotate-180" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

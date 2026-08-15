import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { ACTIVITIES } from '../content/activities';

interface ProgramsProps {
  isArabic: boolean;
}

/**
 * Homepage "Programs & Activities" section (id="programs").
 *
 * Phase 7 (fact-first): the previous version rendered four fabricated programs — "NASA Space
 * Apps Jordan Liaison", "S.Y.S.T.E.M. Training Academy", "The Maker Collective", and "Jordan
 * Mars Rover Challenge" — each with invented descriptions, features, statistics, and syllabus
 * modals. None were supported by repository evidence, so all were removed (see contentGaps).
 *
 * This section now previews only the CONFIRMED activities/programs from the content layer
 * (SYSTEM — Space for Youth Through STEM, and the ملتقى الصناع / Makers Forum gatherings) and
 * links to the dedicated /activities page. Real hackathons/missions live under Events, not here.
 */
export default function Programs({ isArabic }: ProgramsProps) {
  return (
    <section id="programs" className="relative bg-transparent py-12 sm:py-16">
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-brand-red/5 blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-brand-teal/5 blur-3xl pointer-events-none" />

      <div className="w-[90%] mx-auto relative z-10">
        <ScrollReveal variant="clip" className="text-center max-w-3xl mx-auto mb-14">
          <span className="font-mono text-xs text-brand-teal font-bold tracking-widest uppercase block mb-3">
            {isArabic ? 'برامج وأنشطة تمكين الشباب' : 'PROGRAMS & ACTIVITIES'}
          </span>
          <h2 className="font-display font-medium text-3xl sm:text-5xl text-white tracking-tight uppercase">
            {isArabic ? (
              <>
                برامجنا <span className="text-brand-teal font-black">وأنشطتنا</span>
              </>
            ) : (
              <>
                Programs & <span className="text-brand-teal font-black">Activities</span>
              </>
            )}
          </h2>
          <div className="h-0.5 w-16 bg-brand-teal mx-auto mt-6" />
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ACTIVITIES.map((activity) => {
            const title = isArabic && activity.title.ar ? activity.title.ar : activity.title.en;
            const summary = activity.summary
              ? isArabic && activity.summary.ar
                ? activity.summary.ar
                : activity.summary.en
              : '';
            const period = activity.period ?? (activity.year ? String(activity.year) : '');
            const imgAlt = activity.image
              ? isArabic && activity.image.alt.ar
                ? activity.image.alt.ar
                : activity.image.alt.en
              : title;

            return (
              <Link
                key={activity.id}
                /* Each card now links to its own detail page instead of all landing on the
                   listing. Mirrors ActivitiesPage so the two surfaces behave identically. */
                to={`/activities/${activity.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-900/80 bg-neutral-900/25 shadow-xl transition-all duration-300 hover:border-brand-teal/40 hover:bg-neutral-900/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/50"
              >
                {activity.image && (
                  /* Honours `imageFit` like the listing page — without it the square SYSTEM
                     logo was being crop-filled instead of shown whole. */
                  <div
                    className={`aspect-[16/9] w-full overflow-hidden ${
                      activity.imageFit === 'contain' ? 'bg-white' : 'bg-neutral-900'
                    }`}
                  >
                    <img
                      src={activity.image.src}
                      alt={imgAlt}
                      loading="lazy"
                      className={`h-full w-full object-center transition-transform duration-500 ${
                        activity.imageFit === 'contain'
                          ? 'object-contain p-3'
                          : 'object-cover group-hover:scale-[1.04]'
                      }`}
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-5">
                  {period && (
                    <span className="mb-2 font-mono text-[10px] uppercase tracking-widest text-brand-teal">
                      {period}
                    </span>
                  )}
                  <h3 className="font-display text-base font-bold leading-tight tracking-tight text-white transition-colors group-hover:text-brand-teal sm:text-lg">
                    {title}
                  </h3>
                  {summary && (
                    <p className="mt-2 font-sans text-xs leading-relaxed text-neutral-400">{summary}</p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/activities"
            className="inline-flex items-center gap-2 rounded-lg border border-brand-teal/40 bg-brand-teal/5 px-6 py-3 font-mono text-[11px] font-bold uppercase tracking-widest text-brand-teal transition-all hover:bg-brand-teal/10 hover:border-brand-teal/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/50"
          >
            {isArabic ? 'عرض كل الأنشطة' : 'View All Activities'}
            <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </section>
  );
}

import { Link } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import PageHeader from '../components/PageHeader';
import ScrollReveal from '../components/ScrollReveal';
import { useSiteContext } from '../components/SiteLayout';
import { useDocumentTitle } from '../lib/useDocumentTitle';
import { ACTIVITIES } from '../content/activities';

/**
 * Real /activities page — driven by confirmed Activity records only (the SYSTEM youth-STEM
 * program and the ملتقى الصناع / Makers Forum gatherings). Content is intentionally modest:
 * only confirmed identity, period/year, and a branded/representative image are shown.
 * SYSTEM's activity photos of minors are deliberately not published (privacy).
 */
export default function ActivitiesPage() {
  const { isArabic } = useSiteContext();
  useDocumentTitle(
    'Activities | MENA',
    "MENA's ongoing programs and community activities in STEM and youth engagement.",
  );

  return (
    <PageContainer className="pt-32 pb-20">
      <ScrollReveal variant="clip">
        <PageHeader
          eyebrow={isArabic ? 'الأنشطة' : 'ACTIVITIES'}
          title={isArabic ? 'الأنشطة والبرامج' : 'Activities & Programs'}
          description={
            isArabic
              ? 'برامج وأنشطة مِنا المستمرة في مجالات العلوم والتقنية والمجتمع.'
              : "MENA's ongoing programs and community activities in STEM and youth engagement."
          }
        />
      </ScrollReveal>

      <div className="mt-2 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
            /* Now a real <Link> — semantic, keyboard-focusable, with a visible focus ring. */
            <Link
              key={activity.id}
              to={`/activities/${activity.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-900/80 bg-neutral-900/25 shadow-xl transition-all duration-300 hover:border-brand-teal/40 hover:bg-neutral-900/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/50"
            >
              {activity.image && (
                /*
                  Same 16/9 frame for every card. Brand marks opt into `contain` so they are
                  shown whole rather than cropped, on a neutral white plate that reads the
                  same in light and dark mode (the mark itself has a white background).
                */
                <div
                  className={`aspect-[16/9] w-full overflow-hidden ${
                    activity.imageFit === 'contain' ? 'bg-white' : 'bg-neutral-900'
                  }`}
                >
                  <img
                    src={activity.image.src}
                    alt={imgAlt}
                    loading="lazy"
                    className={`h-full w-full object-center ${
                      activity.imageFit === 'contain' ? 'object-contain p-3' : 'object-cover'
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
                <h2 className="font-display text-base font-bold leading-tight tracking-tight text-white transition-colors group-hover:text-brand-teal sm:text-lg">
                  {title}
                </h2>
                {summary && (
                  <p className="mt-2 font-sans text-xs leading-relaxed text-neutral-400">{summary}</p>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </PageContainer>
  );
}

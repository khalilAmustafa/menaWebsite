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
    isArabic ? 'الأنشطة والبرامج | مِنا' : 'Activities | MENA',
    isArabic
      ? 'برامج وأنشطة مِنا المستمرة في مجالات العلوم والتقنية والمجتمع.'
      : "MENA's ongoing programs and community activities in STEM and youth engagement.",
  );

  return (
    <PageContainer className="pb-24 pt-32">
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

      <div className="activity-index">
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
              className="program-entry group flex h-full flex-col overflow-hidden border transition-[background-color,border-color,color,transform] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/50"
            >
              {activity.image && (
                /*
                  Same 16/9 frame for every card. Brand marks opt into `contain` so they are
                  shown whole rather than cropped, on a neutral white plate that reads the
                  same in light and dark mode (the mark itself has a white background).
                */
                <div
                  className={`aspect-[16/9] w-full overflow-hidden ${
                    activity.imageFit === 'contain' ? 'bg-white' : 'bg-[var(--page-surface-raised)]'
                  }`}
                >
                  <img
                    src={activity.image.src}
                    alt={imgAlt}
                    width={activity.image.width}
                    height={activity.image.height}
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
                <h2 className="font-display text-2xl font-semibold uppercase leading-none tracking-tight text-[var(--page-ink)] transition-colors group-hover:text-brand-teal sm:text-3xl">
                  {title}
                </h2>
                {summary && (
                  <p className="mt-3 font-sans text-sm leading-7 text-[var(--page-muted)]">{summary}</p>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </PageContainer>
  );
}

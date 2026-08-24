import { Link, useParams } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import Breadcrumbs from '../components/Breadcrumbs';
import ScrollReveal from '../components/ScrollReveal';
import EventGallery from '../components/events/EventGallery';
import { useSiteContext } from '../components/SiteLayout';
import { useDocumentTitle } from '../lib/useDocumentTitle';
import { getActivityBySlug } from '../lib/activities';

/**
 * One reusable detail page for every Activity (`/activities/:slug`), driven entirely by the
 * structured record — no per-activity page components and no image arrays in JSX.
 *
 * The page is deliberately media-led. Only sections backed by real data render: the gallery
 * appears only when the record actually has one, so ملتقى الصناع (a single photo per year)
 * renders a clean short page instead of an empty gallery heading. Nothing is padded to make
 * the pages look longer, and no description, date, location, or outcome is invented.
 */
export default function ActivityDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { isArabic } = useSiteContext();
  const activity = getActivityBySlug(slug);

  const title = activity ? (isArabic && activity.title.ar ? activity.title.ar : activity.title.en) : '';
  useDocumentTitle(
    activity ? `${title} | MENA` : (isArabic ? 'النشاط غير موجود | مِنا' : 'Activity not found | MENA'),
    activity?.summary ? (isArabic && activity.summary.ar ? activity.summary.ar : activity.summary.en) : undefined,
  );

  if (!activity) {
    return (
      <PageContainer className="min-h-[60vh] pt-32 pb-20 text-center">
        <h1 className="font-display text-4xl font-medium uppercase tracking-tight text-[var(--page-ink)] sm:text-5xl">
          {isArabic ? 'النشاط غير موجود' : 'Activity not found'}
        </h1>
        <p className="mx-auto mt-4 max-w-md font-sans text-sm leading-relaxed text-neutral-400">
          {isArabic
            ? 'المسار المطلوب لا يطابق أي نشاط.'
            : "The requested path doesn't match any activity."}
        </p>
        <Link
          to="/activities"
          className="mt-8 inline-block rounded font-mono text-[11px] uppercase tracking-widest text-brand-teal transition-colors hover:text-brand-teal-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/50"
        >
          {isArabic ? 'كل الأنشطة' : 'All activities'}
        </Link>
      </PageContainer>
    );
  }

  const summary = activity.summary
    ? isArabic && activity.summary.ar
      ? activity.summary.ar
      : activity.summary.en
    : '';
  const period = activity.period ?? (activity.year ? String(activity.year) : '');
  // Falls back to the card image so single-photo activities still show a hero.
  const hero = activity.hero ?? activity.image;
  const heroAlt = hero ? (isArabic && hero.alt.ar ? hero.alt.ar : hero.alt.en) : title;
  const gallery = activity.gallery ?? [];

  return (
    <PageContainer className="pt-32 pb-20">
      <Breadcrumbs
        items={[
          { label: isArabic ? 'الرئيسية' : 'Home', to: '/' },
          { label: isArabic ? 'الأنشطة' : 'Activities', to: '/activities' },
          { label: title },
        ]}
      />

      <ScrollReveal variant="clip">
        <section className="mb-16 grid items-stretch overflow-hidden border-y border-[var(--page-border)] lg:grid-cols-12">
          <div className="flex flex-col justify-end py-10 lg:col-span-5 lg:pe-12 lg:py-16">
            <span className="section-index">
              {isArabic ? 'نشاط' : 'ACTIVITY'}
              {period && ` · ${period}`}
            </span>
            <h1 className="event-detail-title mt-6 font-display font-medium uppercase tracking-[-0.03em] text-[var(--page-ink)]">
              {title}
            </h1>
            {summary && (
              <p className="mt-6 max-w-xl font-sans text-sm leading-7 text-[var(--page-muted)] sm:text-base">
                {summary}
              </p>
            )}
            {activity.logo && (
              <img
                src={activity.logo.src}
                alt={isArabic && activity.logo.alt.ar ? activity.logo.alt.ar : activity.logo.alt.en}
                width={activity.logo.width}
                height={activity.logo.height}
                className="mt-8 h-24 w-24 rounded-xl bg-white object-contain p-2"
              />
            )}
          </div>

          {hero && (
            <figure className="event-detail-media bg-[var(--page-surface-raised)] lg:col-span-7">
              <img src={hero.src} alt={heroAlt} width={hero.width} height={hero.height} fetchPriority="high" className="h-full w-full object-cover" />
            </figure>
          )}
        </section>
      </ScrollReveal>

      {/* Gallery — rendered only when the record genuinely has one. */}
      {gallery.length > 0 && (
        <section>
          <h2 className="mb-6 font-display text-xl font-medium uppercase tracking-tight text-white sm:text-2xl">
            {isArabic ? 'معرض الصور' : 'Media Gallery'}
          </h2>
          <EventGallery images={gallery} isArabic={isArabic} />
        </section>
      )}
    </PageContainer>
  );
}

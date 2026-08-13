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
    activity ? `${title} | MENA` : 'Activity not found | MENA',
    activity?.summary?.en,
  );

  if (!activity) {
    return (
      <PageContainer className="min-h-[60vh] pt-32 pb-20 text-center">
        <h1 className="font-display text-2xl font-medium uppercase tracking-tight text-white sm:text-3xl">
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
        <section className="mb-16 grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <span className="mb-3 block font-mono text-xs font-bold uppercase tracking-widest text-brand-teal">
              {isArabic ? 'نشاط' : 'ACTIVITY'}
              {period && ` · ${period}`}
            </span>
            <h1 className="font-display text-3xl font-medium leading-tight tracking-tight text-white sm:text-5xl">
              {title}
            </h1>
            {summary && (
              <p className="mt-5 max-w-md font-sans text-sm leading-relaxed text-neutral-300 sm:text-base">
                {summary}
              </p>
            )}
            {activity.logo && (
              <img
                src={activity.logo.src}
                alt={isArabic && activity.logo.alt.ar ? activity.logo.alt.ar : activity.logo.alt.en}
                className="mt-8 h-24 w-24 rounded-xl bg-white object-contain p-2"
              />
            )}
          </div>

          {hero && (
            <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-neutral-900/80 bg-neutral-900 shadow-2xl">
              <img src={hero.src} alt={heroAlt} className="aspect-[4/5] w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
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

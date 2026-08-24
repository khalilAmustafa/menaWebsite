import PageContainer from '../components/PageContainer';
import Breadcrumbs from '../components/Breadcrumbs';
import EventHero from '../components/events/EventHero';
import EventGallery from '../components/events/EventGallery';
import { useSiteContext } from '../components/SiteLayout';
import { useDocumentTitle } from '../lib/useDocumentTitle';
import { getEventBySlug } from '../lib/events';

/**
 * NASA Space Apps Challenge — Amman edition. Built only from confirmed facts (identity,
 * Amman location, and the hackathon/award activity visible in the official recap imagery).
 * Winner identities and partner/sponsor classification are not confirmed → restrained states.
 */
export default function NasaSpaceAppsPage() {
  const { isArabic } = useSiteContext();
  const event = getEventBySlug('nasa-space-apps');
  // Description is the event record's own confirmed summary — single source of truth.
  useDocumentTitle(
    isArabic ? 'تحدي ناسا لتطبيقات الفضاء — عمّان | مِنا' : 'NASA Space Apps Challenge — Amman | MENA',
    event?.summary ? (isArabic && event.summary.ar ? event.summary.ar : event.summary.en) : undefined,
  );

  if (!event) return null;

  const gallery = event.gallery ?? [];
  const sectionLabel = (en: string, ar: string) => (isArabic ? ar : en);

  return (
    <PageContainer className="pt-32 pb-20">
      <Breadcrumbs
        items={[
          { label: isArabic ? 'الرئيسية' : 'Home', to: '/' },
          { label: isArabic ? 'الفعاليات' : 'Events', to: '/events' },
          { label: isArabic && event.title.ar ? event.title.ar : event.title.en },
        ]}
      />

      <EventHero event={event} isArabic={isArabic} eyebrow={isArabic ? 'فعالية' : 'EVENT'} />

      {/* About */}
      <section className="mb-16 max-w-3xl">
        <h2 className="mb-4 font-display text-xl font-medium uppercase tracking-tight text-white sm:text-2xl">
          {sectionLabel('About the Event', 'عن الفعالية')}
        </h2>
        {/*
          Phase 6.2: the previous copy claimed MENA "hosted the Amman edition" and that teams
          worked "over an intensive weekend". Neither MENA's organizational role nor the event
          duration is established by the audited assets, so both were removed rather than
          softened into another unverified form. What remains is only what the recap imagery
          shows: MENA's involvement, the Amman location, teams building, and an award ceremony.
        */}
        <p className="font-sans text-sm leading-relaxed text-neutral-300 sm:text-base">
          {isArabic
            ? 'شاركت مِنا في تحدي ناسا للتطبيقات الفضائية في عمّان، حيث عملت الفرق على بناء حلول واختُتمت الفعالية بحفل جوائز.'
            : 'MENA took part in the NASA Space Apps Challenge in Amman, where teams built solutions and the event concluded with an award ceremony.'}
        </p>
      </section>

      {/* Gallery */}
      {gallery.length > 0 && (
        <section className="mb-16">
          <h2 className="mb-6 font-display text-xl font-medium uppercase tracking-tight text-white sm:text-2xl">
            {sectionLabel('Media Gallery', 'معرض الصور')}
          </h2>
          <EventGallery images={gallery} isArabic={isArabic} />
        </section>
      )}

      <section className="pending-record">
        <h2 className="font-display text-3xl font-semibold uppercase text-[var(--page-ink)] sm:text-4xl">
          {sectionLabel('Records pending confirmation', 'سجلات قيد التأكيد')}
        </h2>
        <p>
          {isArabic
            ? 'ستُنشر أسماء الفرق والمشاريع والمراكز الفائزة، وقائمة الشركاء والرعاة بعد تأكيد السجلات الرسمية.'
            : 'Winning teams, projects and placements, and the partner and sponsor list will be published after the official records are confirmed.'}
        </p>
      </section>
    </PageContainer>
  );
}

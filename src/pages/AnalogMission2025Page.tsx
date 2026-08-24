import { Rocket, Home, Mountain } from 'lucide-react';
import PageContainer from '../components/PageContainer';
import Breadcrumbs from '../components/Breadcrumbs';
import EventHero from '../components/events/EventHero';
import EventGallery from '../components/events/EventGallery';
import { useSiteContext } from '../components/SiteLayout';
import { useDocumentTitle } from '../lib/useDocumentTitle';
import { getEventBySlug } from '../lib/events';

/**
 * MENA Mars Analog Mission (Wadi Rum, 2025). Media-led event page built only from confirmed
 * facts (mission identity, Wadi Rum location, 2025, and the activities visible in the official
 * recap imagery). No fabricated ARAV names, habitat/rover names, dates, crew, or specs.
 */
export default function AnalogMission2025Page() {
  const { isArabic } = useSiteContext();
  const event = getEventBySlug('analog-mission-2025');
  // Description is the event record's own confirmed summary — single source of truth.
  useDocumentTitle(
    isArabic ? 'بعثة مِنا لمحاكاة المريخ — وادي رم | مِنا' : 'MENA Mars Analog Mission — Wadi Rum | MENA',
    event?.summary ? (isArabic && event.summary.ar ? event.summary.ar : event.summary.en) : undefined,
  );

  if (!event) return null;

  const gallery = event.gallery ?? [];
  const highlights = [
    { icon: Rocket, en: 'Spacesuit EVAs', ar: 'مهام خروج ببدلات الفضاء' },
    { icon: Home, en: 'Habitat Operations', ar: 'عمليات الموئل' },
    { icon: Mountain, en: 'Wadi Rum, Jordan', ar: 'وادي رم، الأردن' },
  ];
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

      <EventHero event={event} isArabic={isArabic} />

      {/* About */}
      <section className="mb-16 max-w-3xl">
        <h2 className="mb-4 font-display text-xl font-medium uppercase tracking-tight text-white sm:text-2xl">
          {sectionLabel('About the Mission', 'عن البعثة')}
        </h2>
        <p className="font-sans text-sm leading-relaxed text-neutral-300 sm:text-base">
          {isArabic
            ? 'بعثة محاكاة للمريخ نُفّذت في صحراء وادي رم بالأردن، حيث نفّذ الطاقم مهام خروج ميدانية ببدلات الفضاء وعمليات داخل الموئل وأنشطة ميدانية في تضاريس شبيهة بالمريخ.'
            : 'A Mars analog mission carried out in Jordan’s Wadi Rum desert. Participants conducted spacesuit EVAs, habitat operations, and field activities in Mars-like terrain.'}
        </p>
      </section>

      {/* Highlights — confirmed non-numeric only */}
      <section className="mb-16">
        <h2 className="mb-6 font-display text-xl font-medium uppercase tracking-tight text-white sm:text-2xl">
          {sectionLabel('Mission Highlights', 'أبرز ملامح البعثة')}
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {highlights.map((h) => {
            const Icon = h.icon;
            return (
              <div
                key={h.en}
                className="flex items-center gap-3 rounded-2xl border border-neutral-900/80 bg-neutral-900/20 px-5 py-5"
              >
                <Icon className="h-6 w-6 flex-shrink-0 text-brand-teal" />
                <span className="font-display text-sm font-bold leading-tight tracking-wide text-neutral-200">
                  {isArabic ? h.ar : h.en}
                </span>
              </div>
            );
          })}
        </div>
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

      {/* Partners & Sponsors — restrained pending (logos on materials, classification unconfirmed) */}
      <section className="pending-record">
        <h2 className="font-display text-3xl font-semibold uppercase text-[var(--page-ink)] sm:text-4xl">{sectionLabel('Partner record pending', 'سجل الشركاء قيد التأكيد')}</h2>
        <p>{isArabic ? 'ستُنشر قائمة الشركاء والرعاة بعد تأكيد السجلات الرسمية.' : 'The partner and sponsor list will be published after the official record is confirmed.'}</p>
      </section>
    </PageContainer>
  );
}

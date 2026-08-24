import { Gamepad2, Hammer, Trophy, Users, GraduationCap, Presentation, Award } from 'lucide-react';
import PageContainer from '../components/PageContainer';
import Breadcrumbs from '../components/Breadcrumbs';
import EventGallery from '../components/events/EventGallery';
import EventHero from '../components/events/EventHero';
import { useSiteContext } from '../components/SiteLayout';
import { useDocumentTitle } from '../lib/useDocumentTitle';
import { getEventBySlug } from '../lib/events';

/**
 * MENA Space Game Challenge event page (Phase 5).
 *
 * Content comes ONLY from the confirmed event record (src/content/events.ts) and the
 * official recap imagery. Sections whose facts are unconfirmed (statistics, winners,
 * partners/sponsors, impact) render an honest restrained state — nothing is invented.
 * The eight required structural areas are all present. Matches the shared MENA theme.
 */
export default function SpaceGameChallengePage() {
  const { isArabic } = useSiteContext();
  useDocumentTitle(
    isArabic ? 'تحدي مِنا لألعاب الفضاء | مِنا' : 'MENA Space Game Challenge | MENA',
    isArabic
      ? 'هاكاثون لألعاب الفضاء يمتد 48 ساعة، يطوّر خلاله المشاركون أفكارهم ويبنونها ويتنافسون بها.'
      : 'A 48-hour space gaming hackathon where participants create, build, and compete.',
  );

  const event = getEventBySlug('space-game-challenge-2026');
  if (!event) return null; // record is guaranteed to exist; guard for type-safety only

  const title = isArabic && event.title.ar ? event.title.ar : event.title.en;
  const gallery = event.gallery ?? [];
  const journey = [...(event.journey ?? [])].sort((a, b) => a.order - b.order);

  // Confirmed, NON-numeric highlights only (format + tagline + confirmed journey shape).
  // No statistics are shown because none are confirmed.
  const highlights = [
    { icon: Gamepad2, en: '48-Hour Hackathon', ar: 'هاكاثون ٤٨ ساعة' },
    { icon: Hammer, en: 'Create · Build · Compete', ar: 'ابتكر · اصنع · نافس' },
    { icon: GraduationCap, en: 'Training Sessions', ar: 'جلسات تدريبية' },
    { icon: Trophy, en: 'Award Ceremony', ar: 'حفل الجوائز' },
  ];

  const journeyIcons = [Users, GraduationCap, Gamepad2, Presentation, Award];

  const sectionLabel = (en: string, ar: string) => (isArabic ? ar : en);

  return (
    <PageContainer className="pt-32 pb-20">
      <Breadcrumbs
        items={[
          { label: isArabic ? 'الرئيسية' : 'Home', to: '/' },
          { label: isArabic ? 'الفعاليات' : 'Events', to: '/events' },
          { label: title },
        ]}
      />

      <EventHero event={event} isArabic={isArabic} />

      {/* 2. ABOUT THE EVENT */}
      <section className="mb-16 max-w-3xl">
        <h2 className="mb-4 font-display text-xl font-medium uppercase tracking-tight text-white sm:text-2xl">
          {sectionLabel('About the Event', 'عن الفعالية')}
        </h2>
        <p className="font-sans text-sm leading-relaxed text-neutral-300 sm:text-base">
          {isArabic
            ? 'تحدي مِنا لألعاب الفضاء هو هاكاثون لتطوير ألعاب الفضاء مدته ٤٨ ساعة يجمع المشاركين لابتكار وبناء ألعابهم والتنافس عليها — عبر جلسات تدريبية وصولاً إلى العروض النهائية وحفل الجوائز.'
            : 'The MENA Space Game Challenge is a 48-hour space gaming hackathon that brings participants together to create, build, and compete with their own games — from training sessions through final presentations and an award ceremony.'}
        </p>
      </section>

      {/* 3. EVENT HIGHLIGHTS — confirmed non-numeric highlights only (no invented statistics) */}
      <section className="mb-16">
        <h2 className="mb-6 font-display text-xl font-medium uppercase tracking-tight text-white sm:text-2xl">
          {sectionLabel('Event Highlights', 'أبرز ملامح الفعالية')}
        </h2>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {highlights.map((h) => {
            const Icon = h.icon;
            return (
              <div
                key={h.en}
                className="flex flex-col items-center gap-3 rounded-2xl border border-neutral-900/80 bg-neutral-900/20 px-4 py-6 text-center"
              >
                <Icon className="h-6 w-6 text-brand-teal" />
                <span className="font-display text-sm font-bold leading-tight tracking-wide text-neutral-200">
                  {isArabic ? h.ar : h.en}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. EVENT JOURNEY — confirmed stage names only (no dates/descriptions) */}
      <section className="mb-16">
        <h2 className="mb-8 font-display text-xl font-medium uppercase tracking-tight text-white sm:text-2xl">
          {sectionLabel('Event Journey', 'مسار الفعالية')}
        </h2>
        <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {journey.map((stage, i) => {
            const Icon = journeyIcons[i] ?? Users;
            return (
              <li
                key={stage.id}
                className="relative flex flex-col gap-3 rounded-2xl border border-neutral-900/80 bg-neutral-900/20 p-5"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-brand-teal/30 bg-brand-teal/5 font-mono text-xs font-bold text-brand-teal">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <Icon className="h-5 w-5 text-neutral-500" />
                </div>
                <span className="font-display text-sm font-bold uppercase leading-tight tracking-wide text-neutral-200">
                  {isArabic && stage.title.ar ? stage.title.ar : stage.title.en}
                </span>
              </li>
            );
          })}
        </ol>
      </section>

      {/* MEDIA GALLERY — real curated event photography */}
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
            ? 'ستُنشر أسماء الفرق والمشاريع والمراكز الفائزة، وقائمة الشركاء والرعاة، وملخص أثر الفعالية بعد تأكيد السجلات الرسمية.'
            : 'Winning teams, projects and placements, the partner and sponsor list, and an impact summary will be published after the official records are confirmed.'}
        </p>
      </section>
    </PageContainer>
  );
}

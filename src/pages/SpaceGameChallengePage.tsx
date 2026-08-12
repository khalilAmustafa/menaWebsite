import { Link } from 'react-router-dom';
import { Gamepad2, Hammer, Trophy, Users, GraduationCap, Presentation, Award } from 'lucide-react';
import PageContainer from '../components/PageContainer';
import Breadcrumbs from '../components/Breadcrumbs';
import ScrollReveal from '../components/ScrollReveal';
import EventGallery from '../components/events/EventGallery';
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
  useDocumentTitle('MENA Space Game Challenge | MENA');

  const event = getEventBySlug('space-game-challenge-2026');
  if (!event) return null; // record is guaranteed to exist; guard for type-safety only

  const title = event.title.en;
  const summary = event.summary ? (isArabic && event.summary.ar ? event.summary.ar : event.summary.en) : '';
  const gallery = event.gallery ?? [];
  const journey = [...(event.journey ?? [])].sort((a, b) => a.order - b.order);
  const heroAlt = event.hero
    ? isArabic && event.hero.alt.ar
      ? event.hero.alt.ar
      : event.hero.alt.en
    : title;

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

      {/* 1. HERO — split layout (portrait event image + title). No fake date/location. */}
      <ScrollReveal variant="clip">
        <section className="mb-16 grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <span className="mb-3 block font-mono text-xs font-bold uppercase tracking-widest text-brand-teal">
              {isArabic ? 'فعالية · 2026' : 'EVENT · 2026'}
            </span>
            <h1 className="font-display text-3xl font-medium leading-tight tracking-tight text-white sm:text-5xl">
              {title}
            </h1>
            {summary && (
              <p className="mt-5 max-w-md font-sans text-sm leading-relaxed text-neutral-300 sm:text-base">
                {summary}
              </p>
            )}
            <div className="mt-6 flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-widest text-brand-teal">
              <span className="rounded-lg border border-brand-teal/30 bg-brand-teal/5 px-3 py-1.5">
                {isArabic ? 'ابتكر' : 'Create'}
              </span>
              <span className="rounded-lg border border-brand-teal/30 bg-brand-teal/5 px-3 py-1.5">
                {isArabic ? 'اصنع' : 'Build'}
              </span>
              <span className="rounded-lg border border-brand-teal/30 bg-brand-teal/5 px-3 py-1.5">
                {isArabic ? 'نافس' : 'Compete'}
              </span>
            </div>
          </div>

          {event.hero && (
            <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-2xl border border-neutral-900/80 bg-neutral-900 shadow-2xl lg:max-w-md">
              <img
                src={event.hero.src}
                alt={heroAlt}
                className="aspect-[4/5] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
          )}
        </section>
      </ScrollReveal>

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

      {/* 5. WINNERS — restrained pending state (identities not confirmed; never inferred) */}
      <section className="mb-16">
        <h2 className="mb-6 font-display text-xl font-medium uppercase tracking-tight text-white sm:text-2xl">
          {sectionLabel('Winners', 'الفائزون')}
        </h2>
        <div className="rounded-2xl border border-neutral-900/80 bg-neutral-900/20 px-6 py-10 text-center">
          <Trophy className="mx-auto mb-4 h-8 w-8 text-brand-teal/70" />
          <p className="mx-auto max-w-xl font-sans text-sm leading-relaxed text-neutral-400">
            {isArabic
              ? 'اختُتمت الفعالية بحفل جوائز. سيتم نشر السجلات الرسمية للفائزين (أسماء الفرق والمشاريع والمراكز) بمجرد تأكيدها.'
              : 'The event concluded with an award ceremony. Official winner records — team names, projects, and placements — will be published once confirmed.'}
          </p>
        </div>
      </section>

      {/* 6. MEDIA GALLERY — real curated event photography */}
      {gallery.length > 0 && (
        <section className="mb-16">
          <h2 className="mb-6 font-display text-xl font-medium uppercase tracking-tight text-white sm:text-2xl">
            {sectionLabel('Media Gallery', 'معرض الصور')}
          </h2>
          <EventGallery images={gallery} isArabic={isArabic} />
        </section>
      )}

      {/* 7. PARTNERS & SPONSORS — restrained pending (association seen, classification unconfirmed) */}
      <section className="mb-16">
        <h2 className="mb-6 font-display text-xl font-medium uppercase tracking-tight text-white sm:text-2xl">
          {sectionLabel('Partners & Sponsors', 'الشركاء والرعاة')}
        </h2>
        <div className="rounded-2xl border border-neutral-900/80 bg-neutral-900/20 px-6 py-10 text-center">
          <Users className="mx-auto mb-4 h-8 w-8 text-brand-teal/70" />
          <p className="mx-auto max-w-xl font-sans text-sm leading-relaxed text-neutral-400">
            {isArabic
              ? 'تفاصيل الشركاء والرعاة الرسميين لهذه الفعالية قيد التأكيد وسيتم نشرها قريبًا.'
              : 'The official partners and sponsors for this event are being confirmed and will be published soon.'}
          </p>
        </div>
      </section>

      {/* 8. EVENT IMPACT — restrained pending (no invented metrics) */}
      <section>
        <h2 className="mb-6 font-display text-xl font-medium uppercase tracking-tight text-white sm:text-2xl">
          {sectionLabel('Event Impact', 'أثر الفعالية')}
        </h2>
        <div className="rounded-2xl border border-neutral-900/80 bg-neutral-900/20 px-6 py-10 text-center">
          <p className="mx-auto max-w-xl font-sans text-sm leading-relaxed text-neutral-400">
            {isArabic
              ? 'سيتم نشر تفاصيل أثر الفعالية ونتائجها بمجرد تأكيد الأرقام الرسمية.'
              : 'A summary of the event’s impact and outcomes will be published once official figures are confirmed.'}
          </p>
          <Link
            to="/achievements"
            className="mt-6 inline-block rounded font-mono text-[11px] uppercase tracking-widest text-brand-teal transition-colors hover:text-brand-teal-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/50"
          >
            {isArabic ? 'استكشف إنجازات مِنا ←' : "Explore MENA's achievements →"}
          </Link>
        </div>
      </section>
    </PageContainer>
  );
}

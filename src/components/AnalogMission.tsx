import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { ANALOG_MISSION_2025 } from '../content/events';

interface AnalogMissionProps {
  isArabic: boolean;
}

/**
 * Homepage Analog Mission section.
 *
 * De-mock / Phase 6: the previous version rendered fabricated content — "ARAV-I/II/III" with
 * invented dates, a "Rum Dome Alpha" habitat, a "Petra-1" rover, and made-up technical specs
 * (pressure/kW/km-h/payload). NONE of that appears in the official mission assets, so it was
 * removed. This section now shows the confirmed MENA Mars Analog Mission in Wadi Rum (2025)
 * using real imagery, and links to the dedicated event page as the single source of truth.
 */
export default function AnalogMission({ isArabic }: AnalogMissionProps) {
  const event = ANALOG_MISSION_2025;
  const preview = (event.gallery ?? []).slice(0, 3);
  const collage = event.hero ? [event.hero, ...preview].slice(0, 4) : preview.slice(0, 4);
  const location = event.location ? (isArabic && event.location.ar ? event.location.ar : event.location.en) : '';

  return (
    <section id="mission" className="relative bg-transparent py-12 sm:py-16">
      <div className="absolute top-1/3 right-10 w-96 h-96 rounded-full bg-brand-red/[0.04] blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-brand-teal/[0.03] blur-3xl pointer-events-none" />

      <div className="w-[90%] mx-auto relative z-10">
        <ScrollReveal variant="clip" className="text-center max-w-3xl mx-auto mb-14">
          <span className="font-mono text-xs text-brand-red font-bold tracking-widest uppercase block mb-3">
            {isArabic ? 'محاكاة الكوكب الأحمر في وادي رم' : 'THE FRONTIER LABS'}
          </span>
          <h2 className="font-display font-medium text-3xl sm:text-5xl text-white tracking-tight uppercase">
            {isArabic ? (
              <>
                محاكاة المريخ <span className="text-brand-teal font-black">في وادي رم</span>
              </>
            ) : (
              <>
                Analog <span className="text-brand-teal font-black">Mars Mission</span>
              </>
            )}
          </h2>
          <p className="mt-4 font-sans text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto leading-relaxed">
            {isArabic
              ? 'نفّذت مِنا بعثة محاكاة للمريخ في صحراء وادي رم بالأردن، شملت مهام خروج ببدلات الفضاء وعمليات داخل الموئل وأنشطة ميدانية في تضاريس شبيهة بالمريخ.'
              : 'MENA carried out a Mars analog mission in Jordan’s Wadi Rum desert — spacesuit EVAs, habitat operations, and field activities in Mars-like terrain.'}
          </p>
          {location && (
            <p className="mt-4 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-neutral-500">
              <MapPin className="h-3.5 w-3.5 text-brand-teal" />
              {location}
              {event.year ? ` · ${event.year}` : ''}
            </p>
          )}
          <div className="h-0.5 w-16 bg-brand-teal mx-auto mt-6" />
        </ScrollReveal>

        {/* Real mission imagery collage */}
        {collage.length > 0 && (
          <ScrollReveal variant="fade-up" duration={0.7}>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {collage.map((media) => (
                <div
                  key={media.id}
                  className="aspect-[4/5] overflow-hidden rounded-2xl border border-neutral-900/80 bg-neutral-900"
                >
                  <img
                    src={media.src}
                    alt={isArabic && media.alt.ar ? media.alt.ar : media.alt.en}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </ScrollReveal>
        )}

        <div className="mt-10 text-center">
          <Link
            to={`/events/${event.slug}`}
            className="inline-flex items-center gap-2 rounded-lg border border-brand-teal/40 bg-brand-teal/5 px-6 py-3 font-mono text-[11px] font-bold uppercase tracking-widest text-brand-teal transition-all hover:bg-brand-teal/10 hover:border-brand-teal/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/50"
          >
            {isArabic ? 'استكشف البعثة كاملة' : 'Explore the Full Mission'}
            <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </section>
  );
}

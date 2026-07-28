import { useEffect } from 'react';
import { useSiteContext } from '../components/SiteLayout';

import Hero from '../components/Hero';
import About from '../components/About';
import DashboardInteractive from '../components/DashboardInteractive';
import AnalogMission from '../components/AnalogMission';
import MissionGallery from '../components/MissionGallery';
import Programs from '../components/Programs';
import Teams from '../components/Teams';
import Advisory from '../components/Advisory';
import Partners from '../components/Partners';
import Donation from '../components/Donation';
import Contact from '../components/Contact';

/**
 * The `/` route. Renders the original homepage sections in the exact same order and
 * markup as the previous App.tsx (Hero → About → Telemetry Dashboard → Analog Mission →
 * Mission Gallery → Programs → Teams → Advisory → Partners → Support Tiers → Contact).
 *
 * These sections are rendered inside SiteLayout's single <main> landmark, so this
 * component intentionally does NOT render its own <main>.
 */
export default function HomePage() {
  const { isArabic, setActiveSection } = useSiteContext();

  // Monitor active scrolled section using an IntersectionObserver (moved verbatim from
  // App.tsx). Lives here so it (re)attaches whenever the homepage is actually mounted.
  useEffect(() => {
    const sections = ['about', 'mission', 'gallery', 'programs', 'teams', 'advisors', 'support', 'contact'];

    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px', // Trigger activation near vertical center height
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, [setActiveSection]);

  return (
    <>
      {/* 2. Hero cinematic block */}
      <Hero isArabic={isArabic} />

      {/* 3. About MENA section with impact stats */}
      <About isArabic={isArabic} />

      {/* 4. Telemetry Dashboard (Interactive Central Showcase) */}
      <section className="bg-transparent py-12 w-[90%] mx-auto relative z-10 overflow-hidden">
        <div className="mb-12 text-center md:text-left md:flex justify-between items-end gap-6">
          <div className="max-w-2xl">
            <span className="font-mono text-xs text-brand-teal font-bold tracking-widest uppercase block mb-2">
              {isArabic ? "بروتوكول رصد الاتصالات الحية للأطقم" : "INTERACTIVE TELEMETRY DECONSTRUCTION"}
            </span>
            <h3 className="font-display font-medium text-2xl sm:text-3xl text-white uppercase tracking-tight">
              {isArabic ? "محاكاة مركز التحكم في عمان" : "Mission Control Real-time Feed"}
            </h3>
            <p className="font-sans text-xs text-neutral-400 mt-2 leading-relaxed">
              {isArabic ? (
                "تفاعل مباشرة مع الإشارات ومخططات الرصد الرقمي لرواد مريخ الأردن. يمكنك رصد صحة الرواد وتجربة محاكاة الخروج للميدان (EVA)."
              ) : (
                "Interact with Live telemetry models transmitted directly from the Jordan testing desert base to Amman HQ. Check biometric sensors, adjust coordinates, or toggle EVA siren simulations below."
              )}
            </p>
          </div>

          {/* Simulated server link badge */}
          <div className="mt-4 md:mt-0 inline-flex items-center space-x-2 bg-brand-teal/5 border border-brand-teal/20 px-3.5 py-1.5 rounded-lg font-mono text-[10px] text-brand-teal">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-teal opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-teal"></span>
            </span>
            <span>UPLINK SPEED: 4.2S DELAY MODE</span>
          </div>
        </div>

        <DashboardInteractive isArabic={isArabic} />
      </section>

      {/* 5. Analog Mars Missions Timeline */}
      <AnalogMission isArabic={isArabic} />

      {/* 5.5. Dynamic Mission Photos Gallery */}
      <MissionGallery isArabic={isArabic} />

      {/* 6. Programs, bootcamps and hackathons */}
      <Programs isArabic={isArabic} />

      {/* 7. Teams and organizational structural groups */}
      <Teams isArabic={isArabic} />

      {/* 8. Advisory board experts roster */}
      <Advisory isArabic={isArabic} />

      {/* Partners & Strategic Liaisons infinite slider */}
      <Partners isArabic={isArabic} />

      {/* 9. Support Tiers representation badges */}
      <Donation isArabic={isArabic} />

      {/* 10. Contact application and partnerships register */}
      <Contact isArabic={isArabic} />
    </>
  );
}

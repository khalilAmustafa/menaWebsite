import { useEffect } from 'react';
import { useSiteContext } from '../components/SiteLayout';

import Hero from '../components/Hero';
import AnalogMission from '../components/AnalogMission';
import MissionGallery from '../components/MissionGallery';
import Programs from '../components/Programs';
import Teams from '../components/Teams';
import Advisory from '../components/Advisory';
import Contact from '../components/Contact';

/**
 * The `/` route. Renders the original homepage sections in the exact same order and
 * markup as the previous App.tsx (Hero → About → Analog Mission →
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
    // 'about' dropped — the section it tracked was deleted.
    const sections = ['mission', 'gallery', 'programs', 'teams', 'advisors', 'contact'];

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

      {/*
        3. REMOVED — the About section (About.tsx, deleted).

        The whole block was institutional copy built on unsupported claims: an "independent,
        high-standard space research powerhouse" that is "globally recognized", a proving-ground
        quote about preparing humanity for "interstellar travel", and three pillar cards
        (Analog Simulations / Women-Led STEM Leadership / Youth Tech Incubator). The heading
        itself asserted "A Women-Led Space Organization in MENA" — a claim that remains
        UNVERIFIED and is now absent from all public rendering.

        Deleted outright rather than rewritten: there is no confirmed source material to build
        an honest About section from, and inventing replacement mission/vision language is
        exactly what must not happen. The unresolved women-led question stays recorded in
        contentGaps.ts so removal is not mistaken for resolution.
      */}

      {/*
        4. REMOVED — "Mission Control Real-time Feed" telemetry dashboard.

        The whole section presented invented operational data as if it were live: SOL clock,
        O₂ pressure, solar/battery %, "AMMAN UP-LINK", base pressure, internal temperature,
        crew BPM and suit PSI, a scrolling mission-control log, EVA siren / re-calibrate /
        command controls, an "SHA-256 ENCRYPTED" security badge and "Jordan Mission Control //
        Active" status. The surrounding copy went further than the widget itself, telling
        visitors they were interacting with "Live telemetry models transmitted directly from
        the Jordan testing desert base to Amman HQ" beside a pulsing "UPLINK SPEED: 4.2S DELAY
        MODE" badge.

        None of it was real. Anonymising the crew rows in Phase 4.5 addressed only the invented
        people, not the invented operations, and recording it as a content gap in Phase 8 left
        the fabrication publicly visible. It is deleted rather than replaced — no substitute
        dashboard, because no real telemetry exists to show.
      */}

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

      {/* 9. Contact application and partnerships register */}
      <Contact isArabic={isArabic} />

      {/*
        De-mock pass: the Partners marquee (unverified partner names + generic Lucide icons)
        and the Support Tiers section ($25/$100/$500 with unverified perks) were removed from
        public homepage rendering. Phase 8 went further and DELETED Partners.tsx, Donation.tsx
        and their fabricated constants outright — keeping them dormant in the repo only made it
        likely they'd be re-rendered by mistake. Both are recoverable from git history if real
        partner logos or real support tiers are ever supplied.
      */}
    </>
  );
}

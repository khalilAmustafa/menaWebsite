import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSiteContext } from '../components/SiteLayout';
import { scrollToSection } from '../lib/scrollToSection';
import { useDocumentTitle } from '../lib/useDocumentTitle';

import Hero from '../components/Hero';
import WhoWeAre from '../components/home/WhoWeAre';
import Disciplines from '../components/home/Disciplines';
import HomePrograms from '../components/home/HomePrograms';
import Community from '../components/home/Community';
import ImpactPreview from '../components/home/ImpactPreview';
import FinalCta from '../components/home/FinalCta';

/**
 * The `/` route — one continuous narrative rather than a stack of landing-page blocks:
 *
 *   WHO WE ARE → WHAT WE DO → WHAT WE BUILD → OUR IMPACT / COMMUNITY → HOW TO JOIN
 *
 * The homepage introduces MENA; the detail lives on the dedicated pages it links to
 * (/about, /activities, /team, /achievements, /events, /contact). The previous
 * mission-report sections (Analog Mission, Mission Gallery, Events Spotlight, Advisory,
 * Partners, Donation) moved to those pages — see the plan notes in the components that
 * absorbed them.
 *
 * Rendered inside SiteLayout's single <main> landmark, so no <main> here.
 */
export default function HomePage() {
  const { isArabic, isLightMode } = useSiteContext();
  const location = useLocation();
  useDocumentTitle(
    isArabic ? 'مِنا | لنبنِ المستقبل معاً' : 'MENA | Build the future. Together.',
    isArabic
      ? 'مِنا منظمة مجتمعية تعمل على تمكين الناس في الشرق الأوسط وشمال إفريقيا عبر الهندسة والعلوم والتكنولوجيا والبحث والتعليم والابتكار.'
      : 'MENA is a community-driven organization empowering people across the Middle East and North Africa through engineering, science, technology, research, education, and innovation.',
  );

  useEffect(() => {
    const sectionId = location.hash.replace(/^#/, '');
    if (!sectionId) return;

    const frame = requestAnimationFrame(() => scrollToSection(sectionId));
    return () => cancelAnimationFrame(frame);
  }, [location.hash]);

  return (
    <>
      <Hero isArabic={isArabic} isLightMode={isLightMode} />
      <WhoWeAre isArabic={isArabic} />
      <Disciplines isArabic={isArabic} />
      <HomePrograms isArabic={isArabic} />
      <Community isArabic={isArabic} />
      <ImpactPreview isArabic={isArabic} />
      <FinalCta isArabic={isArabic} />
    </>
  );
}

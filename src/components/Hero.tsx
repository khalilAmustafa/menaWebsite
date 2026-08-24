import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { IMAGES } from '../data';
import { scrollToSection } from '../lib/scrollToSection';
import Starfield from './Starfield';

interface HeroProps {
  isArabic: boolean;
  isLightMode: boolean;
}

/**
 * Organization-level hero. The visual apparatus (theme-swapped photograph, embedded
 * Starfield, grain, scrim, scroll cue) is unchanged; only the copy layer was re-pitched
 * from a single mission ("Simulating Mars from Jordan") to MENA as an organization.
 *
 * The mission-specific <dl className="hero-mission__meta"> (Wadi Rum / MENA-00-WR /
 * spacesuit EVAs) was removed with it — that record now lives only on
 * /events/analog-mission-2025, where it belongs.
 */
export default function Hero({ isArabic, isLightMode }: HeroProps) {
  const reduceMotion = useReducedMotion();
  const hero = {
    src: isLightMode ? IMAGES.heroLight : IMAGES.heroDark,
    alt: {
      en: 'Astronaut overlooking a Mars-like landscape beneath the Milky Way',
      ar: 'رائد فضاء يتأمل مشهداً شبيهاً بالمريخ تحت درب التبانة',
    },
    width: 1672,
    height: 941,
  };

  return (
    <section className="hero-mission relative" aria-labelledby="home-hero-title">
      <AnimatePresence initial={false}>
        <motion.img
          key={isLightMode ? 'hero-light' : 'hero-dark'}
          src={hero.src}
          alt={isArabic && hero.alt.ar ? hero.alt.ar : hero.alt.en}
          width={hero.width}
          height={hero.height}
          fetchPriority="high"
          className="hero-mission__image"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.16, 1, 0.3, 1] }}
        />
      </AnimatePresence>
      <Starfield embedded className="hero-mission__stars" />
      <div className="hero-mission__grain" aria-hidden="true" />

      <div className="site-container hero-mission__layout">
        <motion.div
          className="hero-mission__copy"
          dir={isArabic ? 'rtl' : 'ltr'}
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-index">
            {isArabic ? 'منظمة مجتمعية · الشرق الأوسط وشمال إفريقيا' : 'Community-driven · Middle East & North Africa'}
          </span>
          <h1 id="home-hero-title" className="hero-mission__title">
            {isArabic ? (
              <>
                لنبنِ المستقبل
                <strong>معاً</strong>
              </>
            ) : (
              <>
                Build the future.
                <strong>Together.</strong>
              </>
            )}
          </h1>
          <p className="hero-mission__summary">
            {isArabic
              ? 'مِنا منظمة مجتمعية تعمل على تمكين الناس في الشرق الأوسط وشمال إفريقيا عبر الهندسة والعلوم والتكنولوجيا والبحث والتعليم والابتكار والتجارب التطبيقية.'
              : 'MENA is a community-driven organization dedicated to empowering people across the Middle East and North Africa through engineering, science, technology, research, education, innovation, and real-world experiences.'}
          </p>
          <div className="hero-mission__actions mt-7 flex flex-col gap-3 sm:flex-row">
            <Link to="/about" className="mission-button">
              {isArabic ? 'اكتشف مِنا' : 'Explore MENA'}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
            </Link>
            <Link to="/contact" className="mission-button-secondary">
              {isArabic ? 'انضم إلى مِنا' : 'Join MENA'}
            </Link>
          </div>
        </motion.div>
      </div>

      <motion.button
        type="button"
        onClick={() => scrollToSection('who-we-are')}
        className="absolute bottom-5 left-1/2 z-10 flex min-h-11 min-w-11 -translate-x-1/2 items-center justify-center text-[#d8cdc4] transition-colors hover:text-brand-teal"
        animate={reduceMotion ? undefined : { y: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 2.1, ease: 'easeInOut' }}
        aria-label={isArabic ? 'انتقل إلى قسم من نحن' : 'Continue to who we are'}
      >
        <ArrowDown className="h-5 w-5" aria-hidden="true" />
      </motion.button>
    </section>
  );
}

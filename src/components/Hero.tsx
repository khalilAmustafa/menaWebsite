import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import { IMAGES } from '../data';

interface HeroProps {
  isArabic: boolean;
}

export default function Hero({ isArabic }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center bg-transparent overflow-hidden pt-32 pb-12"
    >
      
      {/* Cinematic Ambient Background Image */}
      <div className="absolute inset-0 z-0">
        <motion.img
          src={IMAGES.hero}
          alt="MENA Wadi Rum Mars Analog Simulation"
          style={{ 
            scaleX: isArabic ? -1 : 1,
            scaleY: 1,
          }}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover filter brightness-[0.85] contrast-[1.02] opacity-95 transition-opacity duration-300 object-center"
        />
        {/*
          Vignette scrim. `hero-scrim` is a stable hook so light mode can re-tint this overlay
          instead of the old blanket rule that painted it solid cream and made the hero image
          vanish entirely in light mode. See index.css.
        */}
        <div className="hero-scrim absolute inset-0 bg-neutral-950/30" />
        <div className={`absolute inset-0 bg-gradient-to-r ${
          isArabic 
            ? 'from-transparent via-neutral-950/20 to-neutral-950/75' 
            : 'from-neutral-950/75 via-neutral-950/20 to-transparent'
        }`} />
        
        {/* Bottom fade — goes to transparent so the shared starfield page background bleeds through seamlessly */}
        <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-space-dark via-space-dark/60 to-transparent z-10" />
      </div>

      {/* Main Container - Left-aligned content structure */}
      <div className="relative z-20 w-[90%] mx-auto text-left rtl:text-right space-y-8">
        <div className="max-w-lg md:max-w-xl lg:max-w-2xl space-y-8">
          
          {/* High-End Cinematic Headline */}
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-display font-medium text-white tracking-tight leading-tight uppercase"
            >
              {isArabic ? (
                <>
                  محاكاة المريخ <br />
                  <span className="text-brand-teal italic font-black">على أرض الأردن</span>
                </>
              ) : (
                <>
                  Simulating Mars <br />
                  <span className="text-brand-teal font-black">On Jordan Soil</span>
                </>
              )}
            </motion.h1>

            {/* Subtitles */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-neutral-300 font-sans text-sm sm:text-base tracking-wide leading-relaxed"
            >
              {/* Arabic copy review: AR ended "وتدريب الطالبات" — training female students only —
                  while EN says "youth STEM missions". The confirmed programmes (SYSTEM, Makers
                  Forum) serve youth generally, so the AR narrowed the audience inaccurately. */}
              {isArabic ? (
                "من صحراء وادي رم الأردنية الشبيهة بسطح المريخ، نشيد طموحات المعرفة الفضائية وجيل المبتكرين العرب من خلال أبحاث المحاكاة الأنالوج وهندسة بدلات الفضاء وتدريب الطلبة."
              ) : (
                // "custom analog simulation suites" asserted a product/capability nothing
                // supports. The Arabic counterpart was already better grounded (analog research,
                // spacesuit engineering, student training) — the English now matches it.
                "From Jordan’s Martian-like Wadi Rum desert, we inspire the Arab future through analog mission research, spacesuit engineering, and youth STEM programs."
              )}
            </motion.p>
          </div>

          {/* Left-aligned locations label row */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-wrap items-center gap-4 text-neutral-400 font-mono text-[10px] sm:text-xs tracking-wider justify-start rtl:justify-end"
          >
            <div className="flex items-center gap-2 px-3 py-1.5 bg-neutral-900/40 border border-neutral-900/60 rounded-lg">
              <span className="text-neutral-500">{isArabic ? "ميدان المحاكاة:" : "ANALOG SITE:"}</span>
              <span className="text-brand-teal font-bold">{isArabic ? "وادي رم" : "WADI RUM"}</span>
            </div>
            {/*
              Arabic copy review: an "INNOVATION HUB: AMMAN, JORDAN" / "مقر الابتكار: عمّان، الأردن"
              badge sat in the hero, asserting a MENA innovation facility in Amman. That is the
              same unverified Amman-facility claim removed from the Contact form, and no source
              material establishes any premises. Removed in both languages. The Wadi Rum analog
              site badge beside it stays — that location IS confirmed by the mission material.
            */}
          </motion.div>

          {/* CTA Buttons - Left Aligned */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center gap-4 justify-start rtl:justify-end"
          >
            <button
              onClick={() => handleScrollTo('mission')}
              className="w-full sm:w-auto px-8 py-3.5 bg-brand-teal hover:bg-brand-teal-hover text-white font-display font-bold text-xs tracking-widest uppercase rounded-lg shadow-lg shadow-brand-teal/20 border-t border-white/10 transition-all cursor-pointer text-center"
            >
              {/* Was "Launch Mission Map" — this button scrolls to the Analog Mars Mission
                  section and there is no map anywhere on the site, so the label promised a
                  feature that doesn't exist. Now it names its actual destination. */}
              {isArabic ? 'استكشف البعثة' : 'Explore the Mission'}
            </button>
            
            <button
              onClick={() => handleScrollTo('contact')}
              className="w-full sm:w-auto px-8 py-3.5 bg-transparent hover:bg-white/5 text-white font-display font-semibold text-xs tracking-widest uppercase rounded-lg border border-neutral-800 hover:border-brand-teal/50 transition-all cursor-pointer text-center"
            >
              {/* Was "Airlock Registration" — it scrolls to the contact form, which is a
                  volunteer/partnership inquiry. The Arabic already said exactly that
                  ("سجل اهتمامك" = register your interest); the English now matches it. */}
              {isArabic ? 'سجل اهتمامك' : 'Register Your Interest'}
            </button>
          </motion.div>

        </div>
      </div>

      {/* Down arrow indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center">
        <motion.button
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          // 'about' section deleted — the scroll cue now targets the first real section.
          onClick={() => handleScrollTo('mission')}
          className="text-neutral-500 hover:text-brand-teal transition-colors cursor-pointer"
        >
          <ArrowDown className="w-5 h-5 animate-pulse" />
        </motion.button>
      </div>

    </section>
  );
}

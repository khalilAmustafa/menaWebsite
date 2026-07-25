import { useState, useEffect } from 'react';
import { Compass, Linkedin, Instagram, Twitter } from 'lucide-react';

// Components
import Header from './components/Header';
import MenaLogo from './components/MenaLogo';
import Hero from './components/Hero';
import Starfield from './components/Starfield';
import About from './components/About';
import DashboardInteractive from './components/DashboardInteractive';
import AnalogMission from './components/AnalogMission';
import MissionGallery from './components/MissionGallery';
import Programs from './components/Programs';
import Teams from './components/Teams';
import Advisory from './components/Advisory';
import Partners from './components/Partners';
import Donation from './components/Donation';
import Contact from './components/Contact';
import Chatbot from './components/Chatbot';

export default function App() {
  const [isArabic, setIsArabic] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('about');
  const [isLightMode, setIsLightMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme-mode') === 'light';
    }
    return false;
  });

  // Keep light-mode body classes synchronized reactively
  useEffect(() => {
    if (isLightMode) {
      document.body.classList.add('light-mode');
      localStorage.setItem('theme-mode', 'light');
    } else {
      document.body.classList.remove('light-mode');
      localStorage.setItem('theme-mode', 'dark');
    }
  }, [isLightMode]);

  // Monitor active scrolled section using an IntersectionObserver
  useEffect(() => {
    const sections = ['about', 'mission', 'gallery', 'programs', 'teams', 'advisors', 'support', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px', // Trigger activation near vertical center height
      threshold: 0
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
  }, []);

  return (
    <div className="min-h-screen bg-space-dark text-neutral-100 selection:bg-brand-teal selection:text-black font-sans relative overflow-x-hidden" dir={isArabic ? 'rtl' : 'ltr'}>
      
      {/* Absolute Ambient Background Starfield with brand accents */}
      <div className={`absolute inset-0 ${isLightMode ? 'bg-[radial-gradient(ellipse_at_top,rgba(203,173,142,0.05),#f9fafb)]' : 'bg-[radial-gradient(ellipse_at_top,rgba(203,173,142,0.06),rgba(58,44,38,1))]'} pointer-events-none z-0`} />

      {/* Scroll-aware background star field matching astronomy simulation ambient */}
      <Starfield />

      {/* 1. Header Navigation block */}
      <Header 
        isArabic={isArabic} 
        setIsArabic={setIsArabic} 
        activeSection={activeSection} 
        isLightMode={isLightMode} 
        setIsLightMode={setIsLightMode} 
      />

      {/* 2. Hero cinematic block */}
      <Hero isArabic={isArabic} />

      {/* Primary content list wrapper */}
      <main className="relative z-10">

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
            <div className="mt-4 md:mt-0 inline-flex items-center space-x-2 bg-brand-teal/5 border border-brand-teal/20 px-3.5 py-1.5 rounded font-mono text-[10px] text-brand-teal">
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

      </main>

      {/* Cinematic Aero Startup Footer */}
      <footer className="relative bg-black py-16 scroll-mt-10 overflow-hidden text-center z-10 backdrop-blur-xs">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(203,173,142,0.025),transparent_35%)] pointer-events-none" />

        <div className="w-[90%] mx-auto relative z-10">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-8 mb-12 border-b border-neutral-900/60 pb-12">
            
            {/* Logo */}
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-3">
              <div className="w-28 h-32 flex-shrink-0">
                <MenaLogo color="var(--color-brand-teal)" />
              </div>
              <p className="max-w-xs font-sans text-[11px] text-neutral-500 leading-normal">
                {isArabic ? "أول منظمة فضاء وأبحاث أنالوج بتمكين وأولويات قيادية نسائية عربية وتدريب للطلبة في الأردن." : "The leading independent Arab Aerospace & Analog Training incubator. Inspiring the youth of tomorrow with real sand sandbox missions in Wadi Rum."}
              </p>
            </div>

            {/* Quick telemetry indicators replaced with "Fast Links" */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6 text-left rtl:text-right font-mono text-[10px] text-neutral-500">
              <div className="space-y-2">
                <span className="block text-neutral-600 font-bold tracking-wider uppercase">
                  {isArabic ? "منصة الاستكشاف" : "EXPLORATION"}
                </span>
                <ul className="space-y-1.5">
                  <li>
                    <a href="#about" className="hover:text-brand-teal transition-colors duration-200">
                      // {isArabic ? "عن المنظمة" : "ABOUT ANALOG"}
                    </a>
                  </li>
                  <li>
                    <a href="#mission" className="hover:text-brand-teal transition-colors duration-200">
                      // {isArabic ? "محاكاة وادي رم" : "WADI RUM TRACK"}
                    </a>
                  </li>
                </ul>
              </div>

              <div className="space-y-2">
                <span className="block text-neutral-600 font-bold tracking-wider uppercase">
                  {isArabic ? "العمليات والطاقم" : "OPERATIONS"}
                </span>
                <ul className="space-y-1.5">
                  <li>
                    <a href="#gallery" className="hover:text-brand-teal transition-colors duration-200">
                      // {isArabic ? "أرشيف الصور" : "FIELD GALLERY"}
                    </a>
                  </li>
                  <li>
                    <a href="#teams" className="hover:text-brand-teal transition-colors duration-200">
                      // {isArabic ? "أقسام البعثة" : "OFFICIAL CREW"}
                    </a>
                  </li>
                </ul>
              </div>

              <div className="space-y-2">
                <span className="block text-neutral-600 font-bold tracking-wider uppercase">
                  {isArabic ? "برامج الكفاءات" : "ACADEMICS"}
                </span>
                <ul className="space-y-1.5">
                  <li>
                    <a href="#programs" className="hover:text-brand-teal transition-colors duration-200">
                      // {isArabic ? "مسارات التدريب" : "TRAINING TRACKS"}
                    </a>
                  </li>
                  <li>
                    <a href="#advisors" className="hover:text-brand-teal transition-colors duration-200">
                      // {isArabic ? "مجلس المستشارين" : "BOARD EXPERTS"}
                    </a>
                  </li>
                </ul>
              </div>

              <div className="space-y-2">
                <span className="block text-neutral-600 font-bold tracking-wider uppercase">
                  {isArabic ? "عقد الاتصال" : "REACHABILITY"}
                </span>
                <ul className="space-y-1.5">
                  <li>
                    <a href="#support" className="hover:text-brand-teal transition-colors duration-200">
                      // {isArabic ? "رعاة المسيرة" : "SUPPORT PORTAL"}
                    </a>
                  </li>
                  <li>
                    <a href="#contact" className="hover:text-brand-teal transition-colors duration-200">
                      // {isArabic ? "بوابة التسجيل" : "AIRLOCK CONTACT"}
                    </a>
                  </li>
                </ul>
              </div>
            </div>

          </div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 font-mono text-[10px] text-neutral-600">
            <div className="text-center lg:text-left">
              &copy; {new Date().getFullYear()} MENA SPACE & ANALOG ADVISORY. ALL TRANSMISSION CHANNELS PROTECTED.
            </div>

            {/* Branded Social Media Connections */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <span className="text-[9px] text-brand-teal uppercase tracking-wider font-semibold">
                {isArabic ? "قنوات الاتصال المفتوحة //" : "SECURED COMM LINKS //"}
              </span>
              <a
                href="https://linkedin.com/company/mena-space-analog"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-neutral-900/80 border border-neutral-800/80 text-neutral-400 hover:text-[#0A66C2] hover:bg-[#0A66C2]/10 hover:border-[#0A66C2]/30 transition-all duration-300 cursor-pointer"
                aria-label="MENA LinkedIn"
              >
                <Linkedin className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://instagram.com/mena_space_analog"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-neutral-900/80 border border-neutral-800/80 text-neutral-400 hover:text-[#E1306C] hover:bg-[#E1306C]/10 hover:border-[#E1306C]/30 transition-all duration-300 cursor-pointer"
                aria-label="MENA Instagram"
              >
                <Instagram className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://twitter.com/mena_space"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-neutral-900/80 border border-neutral-800/80 text-neutral-400 hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/10 hover:border-[#1DA1F2]/30 transition-all duration-300 cursor-pointer"
                aria-label="MENA Twitter / X"
              >
                <Twitter className="h-3.5 w-3.5" />
              </a>
            </div>

            <div className="flex items-center justify-center space-x-4">
              <a href="#about" className="hover:text-white transition-colors">VISION</a>
              <span>/</span>
              <a href="#mission" className="hover:text-white transition-colors">TELEMETRY</a>
              <span>/</span>
              <a href="#support" className="hover:text-white transition-colors">SPONSOR</a>
            </div>
          </div>

        </div>

      </footer>
      <Chatbot isArabic={isArabic} />
    </div>
  );
}

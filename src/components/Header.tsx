import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Globe, Radio, Sun, Moon, ChevronDown } from 'lucide-react';
import MenaLogo from './MenaLogo';
import { scrollToSection } from '../lib/scrollToSection';

interface HeaderProps {
  isArabic: boolean;
  setIsArabic: (val: boolean) => void;
  activeSection: string;
  isLightMode: boolean;
  setIsLightMode: (val: boolean) => void;
}

export default function Header({ isArabic, setIsArabic, activeSection, isLightMode, setIsLightMode }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [utcTime, setUtcTime] = useState('');
  const [programsDropdownOpen, setProgramsDropdownOpen] = useState(false);
  const [teamDropdownOpen, setTeamDropdownOpen] = useState(false);
  const [mobileProgramsOpen, setMobileProgramsOpen] = useState(false);
  const [mobileTeamOpen, setMobileTeamOpen] = useState(false);

  const navigate = useNavigate();
  const routerLocation = useLocation();

  // Update UTC time indicator at top right
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(now.toUTCString().replace('GMT', 'UTC'));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Monitor scroll height to trigger glass background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // `to` marks a routed page (React Router link) rather than an in-page anchor scroll.
  const navLinks: { id: string; label: string; arabic: string; to?: string }[] = [
    { id: 'about', label: 'About', arabic: 'عن المؤسسة' },
    { id: 'mission', label: 'Analog Mars', arabic: 'مهمة مارز' },
    { id: 'gallery', label: 'Gallery', arabic: 'أرشيف الصور' },
    { id: 'programs', label: 'Programs', arabic: 'برامجنا التدريبية' },
    { id: 'achievements', label: 'Achievements', arabic: 'الإنجازات', to: '/achievements' },
    { id: 'team', label: 'Team', arabic: 'فريق العمل' },
    { id: 'support', label: 'Support Tiers', arabic: 'ادعمنا' },
    { id: 'contact', label: 'Contact', arabic: 'تواصل معنا' }
  ];

  const handleScrollTo = (id: string) => {
    setIsOpen(false);
    if (routerLocation.pathname === '/') {
      // Already on the homepage — scroll to the section (fixed-header clearance comes
      // from the shared helper, which reads `scroll-padding-top`).
      scrollToSection(id);
    } else {
      // On another route — navigate to the homepage with the target hash; HomePage
      // scrolls to the section once it has rendered.
      navigate(`/#${id}`);
    }
  };

  const handleProgramClick = (action: string) => {
    setIsOpen(false);
    setProgramsDropdownOpen(false);

    if (action === 'overview') {
      handleScrollTo('programs');
    } else if (action === 'analog-2025') {
      handleScrollTo('mission');
    } else {
      handleScrollTo('programs');
      // Delay dispatching custom event slightly to let smooth scrolling complete
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('open-program', { detail: { programId: action } }));
      }, 550);
    }
  };

  const handleTeamClick = (action: string) => {
    setIsOpen(false);
    setTeamDropdownOpen(false);

    if (action === 'overview') {
      handleScrollTo('teams');
    } else if (action === 'advisors') {
      handleScrollTo('advisors');
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('open-team', { detail: { departmentId: 'dept-advisors' } }));
      }, 550);
    } else {
      handleScrollTo('teams');
      // Delay dispatching custom event slightly to let smooth scrolling complete
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('open-team', { detail: { departmentId: action } }));
      }, 550);
    }
  };

  // On routed sub-pages the header stays in its compact state (like the scrolled state on
  // the homepage) so the tall unscrolled logo doesn't overlap top-aligned page content.
  const compact = scrolled || routerLocation.pathname !== '/';

  const headerBg = isLightMode
    ? (compact ? 'bg-[#fbf4ea] border-[#e0d2bd] shadow-lg shadow-[#3a2c26]/10' : 'bg-transparent border-slate-200/0')
    : (compact ? 'bg-neutral-950 border-white/[0.08] shadow-2xl shadow-black/50' : 'bg-transparent border-white/0');

  const headerLayout = compact
    ? 'top-4 w-[90%] max-w-none rounded-2xl py-2.5 border'
    : 'top-0 w-full max-w-none rounded-none py-5 border-b border-t-transparent border-x-transparent';

  return (
    <header className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${headerLayout} ${headerBg} overflow-visible`}>
      <div className="w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Logo and Brand */}
        <div
          onClick={() => {
            if (routerLocation.pathname === '/') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
              navigate('/');
            }
          }}
          className="flex items-center cursor-pointer group select-none"
        >
          <div className={`flex-shrink-0 transition-all duration-300 group-hover:scale-105 ${
            compact ? 'w-14 h-16' : 'w-28 h-32'
          }`}>
            <MenaLogo color="var(--color-brand-teal)" />
          </div>
        </div>

        {/* Center Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;

            if (link.to) {
              return (
                <Link
                  key={link.id}
                  to={link.to}
                  className="px-3 py-1.5 rounded-lg font-display text-xs tracking-wider uppercase transition-all duration-200 relative cursor-pointer text-neutral-400 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/50"
                >
                  <span>{isArabic ? link.arabic : link.label}</span>
                </Link>
              );
            }

            if (link.id === 'programs') {
              return (
                <div
                  key={link.id}
                  className="relative"
                  onMouseEnter={() => setProgramsDropdownOpen(true)}
                  onMouseLeave={() => setProgramsDropdownOpen(false)}
                >
                  <button
                    onClick={() => handleScrollTo('programs')}
                    className={`px-3 py-1.5 rounded-lg font-display text-xs tracking-wider uppercase transition-all duration-200 relative cursor-pointer flex items-center gap-1 ${
                      isActive 
                      ? 'text-white font-bold' 
                      : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <span>{isArabic ? link.arabic : link.label}</span>
                    <ChevronDown className={`w-3 h-3 transition-transform duration-250 ${programsDropdownOpen ? 'rotate-180' : 'rotate-0'}`} />
                    {isActive && (
                      <motion.span 
                        layoutId="header-active-line"
                        className="absolute bottom-0 left-2.5 right-2.5 h-[2px] bg-brand-teal"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>

                  {/* Dropdown Card panel */}
                  <AnimatePresence>
                    {programsDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-1/2 -translate-x-1/2 mt-1 w-64 rounded-2xl bg-space-deep border border-neutral-900 shadow-2xl p-2 z-[60] overflow-hidden"
                      >
                        <div className="py-1 flex flex-col gap-0.5">
                          {/* Main Header acting as clickable link to center Programs */}
                          <button
                            onClick={() => handleProgramClick('overview')}
                            className="w-full text-left rtl:text-right px-3 py-2 text-[10px] font-mono tracking-widest text-brand-teal bg-neutral-900/45 hover:bg-neutral-900 uppercase font-bold transition-all rounded-lg block border-b border-neutral-900/80 mb-1"
                          >
                            {isArabic ? "البرامج والأنشطة" : "PROGRAMS & ACTIVITIES"}
                          </button>

                          {[
                            { id: 'analog-2025', label: 'Analog Mission 2025', arabic: 'مهمة المحاكاة لعام 2025' },
                            { id: 'maker-collective', label: 'The Maker Collective', arabic: 'تجمع الصنّاع والابتكار' },
                            { id: 'nasa-apps', label: 'NASA SPACE APP CHALLENGE', arabic: 'تحدي تطبيقات الفضاء ناسا' },
                            { id: 'system-prog', label: 'SYSTEM Program', arabic: 'برنامج SYSTEM للأبحاث' }
                          ].map((item) => (
                            <button
                              key={item.id}
                              onClick={() => handleProgramClick(item.id)}
                              className="w-full text-left rtl:text-right px-3 py-2 text-xs text-neutral-400 hover:text-white hover:bg-space-dark hover:border-l-2 rtl:hover:border-l-0 rtl:hover:border-r-2 hover:border-brand-teal/80 transition-all rounded-lg block font-sans"
                            >
                              {isArabic ? item.arabic : item.label}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            if (link.id === 'team') {
              return (
                <div
                  key={link.id}
                  className="relative"
                  onMouseEnter={() => setTeamDropdownOpen(true)}
                  onMouseLeave={() => setTeamDropdownOpen(false)}
                >
                  <button
                    onClick={() => handleScrollTo('teams')}
                    className={`px-3 py-1.5 rounded-lg font-display text-xs tracking-wider uppercase transition-all duration-200 relative cursor-pointer flex items-center gap-1 ${
                      isActive 
                      ? 'text-white font-bold' 
                      : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <span>{isArabic ? link.arabic : link.label}</span>
                    <ChevronDown className={`w-3 h-3 transition-transform duration-250 ${teamDropdownOpen ? 'rotate-180' : 'rotate-0'}`} />
                    {isActive && (
                      <motion.span 
                        layoutId="header-active-line"
                        className="absolute bottom-0 left-2.5 right-2.5 h-[2px] bg-brand-teal"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>

                  {/* Dropdown Card panel */}
                  <AnimatePresence>
                    {teamDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-1/2 -translate-x-1/2 mt-1 w-72 rounded-2xl bg-space-deep border border-neutral-900 shadow-2xl p-2 z-[60] overflow-hidden"
                      >
                        <div className="py-1 flex flex-col gap-0.5">
                          {/* Route link to the dedicated Team page */}
                          <Link
                            to="/team"
                            onClick={() => setTeamDropdownOpen(false)}
                            className="w-full text-left rtl:text-right px-3 py-2 text-[10px] font-mono tracking-widest text-brand-teal bg-neutral-900/45 hover:bg-neutral-900 uppercase font-bold transition-all rounded-lg block mb-1"
                          >
                            {isArabic ? 'صفحة الفريق' : 'OUR TEAM'}
                          </Link>
                          {/* Main Header acting as clickable link to center Teams list */}
                          <button
                            onClick={() => handleTeamClick('overview')}
                            className="w-full text-left rtl:text-right px-3 py-2 text-[10px] font-mono tracking-widest text-brand-teal bg-neutral-900/45 hover:bg-neutral-900 uppercase font-bold transition-all rounded-lg block border-b border-neutral-900/80 mb-1"
                          >
                            {isArabic ? "الهيكل الإداري والأقسام" : "EXPLORE DEPARTMENTS"}
                          </button>

                          {[
                            { id: 'dept-board', label: 'BOARD MEMBERS', arabic: 'مجلس الأمناء والمؤسسين' },
                            { id: 'advisors', label: 'Advisors', arabic: 'مجلس المستشارين الأكاديمي' },
                            { id: 'dept-mission', label: 'Management & Operations', arabic: 'الإدارة والعمليات البعثية' },
                            { id: 'dept-marketing', label: 'Marketing & Social Media', arabic: 'عمليات الإعلام والتسويق' },
                            { id: 'dept-eng', label: 'Design & Engineering Team', arabic: 'التصميم وتجهيز بدلات رواد الفضاء' },
                            { id: 'dept-spacefood', label: 'Space Food Team', arabic: 'أبحاث ومطابخ أغذية الفضاء' },
                            { id: 'dept-rd', label: 'R&D - Sc. & Exp. Team', arabic: 'البحوث والبيئات والمقومات الجيولوجية' },
                            { id: 'dept-med', label: 'Medical & Safety Team', arabic: 'الفريق الطبي والرصد الصحي' },
                            { id: 'dept-tech', label: 'Tech & Innovation Team', arabic: 'التكنولوجيا والحلول البرمجية' },
                            { id: 'dept-training', label: 'Astronaut Training Team', arabic: 'مدربو وتأهيل رواد الفضاء الأنالوج' }
                          ].map((item) => (
                            <button
                              key={item.id}
                              onClick={() => handleTeamClick(item.id)}
                              className="w-full text-left rtl:text-right px-3 py-1.5 text-xs text-neutral-400 hover:text-white hover:bg-space-dark hover:border-l-2 rtl:hover:border-l-0 rtl:hover:border-r-2 hover:border-brand-teal/80 transition-all rounded-lg block font-sans"
                            >
                              {isArabic ? item.arabic : item.label}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <button
                key={link.id}
                onClick={() => handleScrollTo(link.id)}
                className={`px-3 py-1.5 rounded-lg font-display text-xs tracking-wider uppercase transition-all duration-200 relative cursor-pointer ${
                  isActive 
                  ? 'text-white font-bold' 
                  : 'text-neutral-400 hover:text-white'
                }`}
              >
                <span>{isArabic ? link.arabic : link.label}</span>
                {isActive && (
                  <motion.span 
                    layoutId="header-active-line"
                    className="absolute bottom-0 left-2.5 right-2.5 h-[2px] bg-brand-teal"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Interactions */}
        <div className="hidden lg:flex items-center space-x-4">
          
          {/* Language Selector Switch */}
          <button
            onClick={() => setIsArabic(!isArabic)}
            className="flex items-center space-x-1.5 px-3 py-1.5 text-xs text-neutral-300 hover:text-white font-mono bg-neutral-950 border border-neutral-800 rounded-lg transition-all cursor-pointer hover:border-brand-teal/50"
          >
            <Globe className="w-3.5 h-3.5 text-brand-teal" />
            <span>{isArabic ? "ENG" : "عربي"}</span>
          </button>

          {/* Light/Dark Mode Switch */}
          <button
            onClick={() => setIsLightMode(!isLightMode)}
            id="theme-mode-toggle"
            className="flex items-center space-x-1.5 px-3 py-1.5 text-xs text-neutral-300 hover:text-white font-mono bg-neutral-950 border border-neutral-800 rounded-lg transition-all cursor-pointer hover:border-brand-teal/50"
            title={isArabic ? "تبديل المظهر" : "Toggle Theme"}
          >
            {isLightMode ? (
              <>
                <Moon className="w-3.5 h-3.5 text-brand-teal" />
                <span>{isArabic ? "داكن" : "DARK"}</span>
              </>
            ) : (
              <>
                <Sun className="w-3.5 h-3.5 text-brand-teal" />
                <span>{isArabic ? "فاتح" : "LIGHT"}</span>
              </>
            )}
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center space-x-3 lg:hidden">
          {/* Lang switcher on mobile */}
          <button
            onClick={() => setIsArabic(!isArabic)}
            className="flex items-center space-x-1.5 px-2.5 py-1 text-[11px] text-neutral-300 font-mono bg-neutral-905 border border-neutral-800 rounded-lg transition-all cursor-pointer hover:border-brand-teal"
          >
            <Globe className="w-3.5 h-3.5 text-brand-teal" />
            <span>{isArabic ? "ENG" : "عربي"}</span>
          </button>

          {/* Theme switcher on mobile */}
          <button
            onClick={() => setIsLightMode(!isLightMode)}
            id="theme-mode-toggle-mobile"
            className="flex items-center space-x-1.5 px-2.5 py-1 text-[11px] text-neutral-300 font-mono bg-neutral-905 border border-neutral-800 rounded-lg transition-all cursor-pointer hover:border-brand-teal"
            title={isArabic ? "تبديل المظهر" : "Toggle Theme"}
          >
            {isLightMode ? (
              <>
                <Moon className="w-3 h-3 text-brand-teal" />
                <span>{isArabic ? "داكن" : "DARK"}</span>
              </>
            ) : (
              <>
                <Sun className="w-3 h-3 text-brand-teal" />
                <span>{isArabic ? "فاتح" : "LIGHT"}</span>
              </>
            )}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-neutral-950 border-t border-neutral-900 overflow-hidden"
          >
            <div className="px-5 pt-3 pb-6 space-y-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;

                if (link.to) {
                  return (
                    <Link
                      key={link.id}
                      to={link.to}
                      onClick={() => setIsOpen(false)}
                      className="block w-full text-left rtl:text-right py-2 px-3 rounded-lg text-sm font-display tracking-widest uppercase transition-colors text-neutral-400 hover:bg-neutral-900/60 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/50"
                    >
                      {isArabic ? link.arabic : link.label}
                    </Link>
                  );
                }

                if (link.id === 'programs') {
                  return (
                    <div key={link.id} className="space-y-1 py-1">
                      <button
                        onClick={() => setMobileProgramsOpen(!mobileProgramsOpen)}
                        className={`w-full text-left rtl:text-right py-2 px-3 rounded-lg text-sm font-display tracking-widest uppercase transition-all font-bold text-brand-teal flex items-center justify-between cursor-pointer`}
                      >
                        <span>{isArabic ? "البرامج والأنشطة" : "PROGRAMS & ACTIVITIES"}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 text-neutral-400 ${mobileProgramsOpen ? 'rotate-180 text-brand-teal' : 'rotate-0'}`} />
                      </button>

                      <AnimatePresence initial={false}>
                        {mobileProgramsOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                            className="overflow-hidden pl-4 rtl:pr-4 border-l rtl:border-l-0 rtl:border-r border-neutral-800/80 space-y-1 my-1"
                          >
                            <button
                              onClick={() => {
                                handleScrollTo('programs');
                                setMobileProgramsOpen(false);
                              }}
                              className="block w-full text-left rtl:text-right py-2 px-3 rounded-lg text-[11px] font-mono uppercase tracking-wider text-brand-teal hover:text-white hover:bg-neutral-900/40 transition-all font-bold"
                            >
                              • {isArabic ? "عرض الكل" : "VIEW OVERVIEW"}
                            </button>
                            {[
                              { id: 'analog-2025', label: 'Analog Mission 2025', arabic: 'مهمة المحاكاة لعام 2025' },
                              { id: 'maker-collective', label: 'The Maker Collective', arabic: 'تجمع الصنّاع والابتكار' },
                              { id: 'nasa-apps', label: 'NASA SPACE APP CHALLENGE', arabic: 'تحدي تطبيقات الفضاء ناسا' },
                              { id: 'system-prog', label: 'SYSTEM Program', arabic: 'برنامج SYSTEM للأبحاث' }
                            ].map((item) => (
                              <button
                                key={item.id}
                                onClick={() => {
                                  handleProgramClick(item.id);
                                  setMobileProgramsOpen(false);
                                }}
                                className="block w-full text-left rtl:text-right py-2 px-3 rounded-lg text-[11px] font-mono uppercase tracking-wider text-neutral-400 hover:text-white hover:bg-neutral-900/40 transition-all text-sm animate-fade-in"
                              >
                                • {isArabic ? item.arabic : item.label}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                if (link.id === 'team') {
                  return (
                    <div key={link.id} className="space-y-1 py-1">
                      <button
                        onClick={() => setMobileTeamOpen(!mobileTeamOpen)}
                        className={`w-full text-left rtl:text-right py-2 px-3 rounded-lg text-sm font-display tracking-widest uppercase transition-all font-bold text-brand-teal flex items-center justify-between cursor-pointer`}
                      >
                        <span>{isArabic ? "أقسام وفريق العمل" : "TEAM & DEPARTMENTS"}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 text-neutral-400 ${mobileTeamOpen ? 'rotate-180 text-brand-teal' : 'rotate-0'}`} />
                      </button>

                      <AnimatePresence initial={false}>
                        {mobileTeamOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                            className="overflow-hidden pl-4 rtl:pr-4 border-l rtl:border-l-0 rtl:border-r border-neutral-800/80 space-y-1 my-1 grid grid-cols-1 gap-0.5"
                          >
                            <Link
                              to="/team"
                              onClick={() => {
                                setMobileTeamOpen(false);
                                setIsOpen(false);
                              }}
                              className="block w-full text-left rtl:text-right py-2 px-3 rounded-lg text-[11px] font-mono uppercase tracking-wider text-brand-teal hover:text-white hover:bg-neutral-900/40 transition-all font-bold"
                            >
                              • {isArabic ? "صفحة الفريق" : "OUR TEAM"}
                            </Link>
                            <button
                              onClick={() => {
                                handleScrollTo('teams');
                                setMobileTeamOpen(false);
                              }}
                              className="block w-full text-left rtl:text-right py-2 px-3 rounded-lg text-[11px] font-mono uppercase tracking-wider text-brand-teal hover:text-white hover:bg-neutral-900/40 transition-all font-bold"
                            >
                              • {isArabic ? "عرض الكل" : "EXPLORE DEPARTMENTS"}
                            </button>
                            {[
                              { id: 'dept-board', label: 'BOARD MEMBERS', arabic: 'مجلس الأمناء والمؤسسين' },
                              { id: 'advisors', label: 'Advisors', arabic: 'مجلس المستشارين الأكاديمي' },
                              { id: 'dept-mission', label: 'Management & Operations', arabic: 'الإدارة والعمليات البعثية' },
                              { id: 'dept-marketing', label: 'Marketing & Social Media', arabic: 'عمليات الإعلام والتسويق' },
                              { id: 'dept-eng', label: 'Design & Engineering Team', arabic: 'التصميم وتجهيز بدلات رواد الفضاء' },
                              { id: 'dept-spacefood', label: 'Space Food Team', arabic: 'أبحاث ومطابخ أغذية الفضاء' },
                              { id: 'dept-rd', label: 'R&D - Sc. & Exp. Team', arabic: 'البحوث والبيئات والمقومات الجيولوجية' },
                              { id: 'dept-med', label: 'Medical & Safety Team', arabic: 'الفريق الطبي والرصد الصحي' },
                              { id: 'dept-tech', label: 'Tech & Innovation Team', arabic: 'التكنولوجيا والحلول البرمجية' },
                              { id: 'dept-training', label: 'Astronaut Training Team', arabic: 'مدربو وتأهيل رواد الفضاء الأنالوج' }
                            ].map((item) => (
                              <button
                                key={item.id}
                                onClick={() => {
                                  handleTeamClick(item.id);
                                  setMobileTeamOpen(false);
                                }}
                                className="block w-full text-left rtl:text-right py-1.5 px-3 rounded-lg text-[11px] font-mono uppercase tracking-wider text-neutral-400 hover:text-white hover:bg-neutral-900/40 transition-all"
                              >
                                • {isArabic ? item.arabic : item.label}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <button
                    key={link.id}
                    onClick={() => handleScrollTo(link.id)}
                    className={`block w-full text-left rtl:text-right py-2 px-3 rounded-lg text-sm font-display tracking-widest uppercase transition-colors ${
                      isActive 
                      ? 'bg-neutral-900 text-white font-bold border-l-2 rtl:border-l-0 rtl:border-r-2 border-brand-teal' 
                      : 'text-neutral-400 hover:bg-neutral-900/60 hover:text-white'
                    }`}
                  >
                    {isArabic ? link.arabic : link.label}
                  </button>
                );
              })}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ChevronDown, Globe, Heart, Menu, Moon, Sun, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import MenaLogo from './MenaLogo';
import { ACTIVITIES } from '../content/activities';
import { EVENTS } from '../content/events';

interface HeaderProps {
  isArabic: boolean;
  setIsArabic: (value: boolean) => void;
  isLightMode: boolean;
  setIsLightMode: (value: boolean) => void;
}

/**
 * Primary navigation:
 *
 *   HOME | ABOUT | PROGRAMS & ACTIVITIES | EVENTS | TEAM | ACHIEVEMENTS | CONTACT | DONATE
 *
 * Route-based and organization-level, but it deliberately keeps the old site's navigational
 * DEPTH: Programs & Activities and Events are both first-class destinations that also open a
 * dropdown listing their verified records, so the analog mission, NASA Space Apps and the
 * Space Game Challenge stay two clicks away from any page rather than living in the footer.
 *
 * Removing a section from the homepage is not a reason to hide its route here — the homepage
 * keeps its seven-section structure while the header carries the full site.
 *
 * Both dropdowns are built from the content layer (ACTIVITIES / EVENTS), so they cannot drift
 * out of sync with what actually exists, and nothing is hard-coded or invented.
 *
 * The two mission-specific items the interim header carried (Analog Mars, Field archive) stay
 * out: they described one mission rather than the organization. The analog mission is reached
 * through Events.
 */

type MenuName = 'programs' | 'events' | null;

interface NavLink {
  to: string;
  en: string;
  ar: string;
  /** Match nested routes too, so /team/:slug still lights up TEAM. */
  nested?: boolean;
}

const PRIMARY_LEFT: NavLink[] = [
  { to: '/', en: 'Home', ar: 'الرئيسية' },
  { to: '/about', en: 'About', ar: 'من نحن' },
];

const PRIMARY_RIGHT: NavLink[] = [
  { to: '/team', en: 'Team', ar: 'الفريق', nested: true },
  { to: '/achievements', en: 'Achievements', ar: 'الإنجازات', nested: true },
  { to: '/contact', en: 'Contact', ar: 'تواصل' },
];

/** The two sections that carry depth, each with a landing route and its verified children. */
const MENUS = {
  programs: {
    to: '/activities',
    en: 'Programs & Activities',
    ar: 'البرامج والأنشطة',
    overviewEn: 'All programs & activities',
    overviewAr: 'كل البرامج والأنشطة',
    items: () =>
      ACTIVITIES.map((activity) => ({
        to: `/activities/${activity.slug}`,
        en: activity.title.en,
        ar: activity.title.ar ?? activity.title.en,
      })),
  },
  events: {
    to: '/events',
    en: 'Events',
    ar: 'الفعاليات',
    overviewEn: 'All events',
    overviewAr: 'كل الفعاليات',
    items: () =>
      EVENTS.map((event) => ({
        to: `/events/${event.slug}`,
        en: event.title.en,
        ar: event.title.ar ?? event.title.en,
      })),
  },
} as const;

export default function Header({ isArabic, setIsArabic, isLightMode, setIsLightMode }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopMenu, setDesktopMenu] = useState<MenuName>(null);
  const [mobileMenu, setMobileMenu] = useState<MenuName>(null);
  const location = useLocation();
  const reduceMotion = useReducedMotion();
  const navRef = useRef<HTMLElement>(null);

  const foreground = isLightMode ? 'text-[#4e4039] hover:text-[#261b16]' : 'text-neutral-300 hover:text-white';
  const chrome = isLightMode
    ? 'border-[#49352a]/15 bg-[#f3f3f1]/92 shadow-[0_14px_45px_rgba(58,44,38,.12)]'
    : 'border-white/10 bg-[#100c0a]/88 shadow-[0_18px_55px_rgba(0,0,0,.34)]';

  const itemClass = 'relative flex min-h-11 items-center px-2.5 font-sans text-[0.7rem] font-bold uppercase tracking-[0.08em] transition-colors';
  const isActive = (link: NavLink) =>
    link.nested ? location.pathname.startsWith(link.to) : location.pathname === link.to;

  useEffect(() => {
    setMobileOpen(false);
    setDesktopMenu(null);
    setMobileMenu(null);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
        setDesktopMenu(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  // Close an open dropdown when focus or a click lands outside the nav.
  useEffect(() => {
    if (!desktopMenu) return;
    const onPointerDown = (event: MouseEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setDesktopMenu(null);
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [desktopMenu]);

  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const closeAtDesktop = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener('resize', closeAtDesktop);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('resize', closeAtDesktop);
    };
  }, [mobileOpen]);

  const navLink = (link: NavLink) => {
    const active = isActive(link);
    return (
      <Link
        key={link.to}
        to={link.to}
        aria-current={active ? 'page' : undefined}
        className={`${itemClass} ${active ? 'text-brand-teal' : foreground}`}
      >
        {isArabic ? link.ar : link.en}
        {active && <span className="absolute inset-x-2.5 bottom-1 h-px bg-brand-teal" aria-hidden="true" />}
      </Link>
    );
  };

  const dropdown = (name: Exclude<MenuName, null>) => {
    const menu = MENUS[name];
    const open = desktopMenu === name;
    const active = location.pathname.startsWith(menu.to);

    return (
      <div key={name} className="relative">
        <button
          type="button"
          aria-expanded={open}
          aria-haspopup="menu"
          onClick={() => setDesktopMenu(open ? null : name)}
          className={`${itemClass} gap-1 ${active ? 'text-brand-teal' : foreground}`}
        >
          {name === 'programs' ? (
            // Shortens to "Programs" on laptop widths so eight items still fit on one row.
            <span>
              {isArabic ? 'البرامج' : 'Programs'}
              <span className="hidden xl:inline">{isArabic ? ' والأنشطة' : ' & Activities'}</span>
            </span>
          ) : (
            <span>{isArabic ? menu.ar : menu.en}</span>
          )}
          <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
          {active && <span className="absolute inset-x-2.5 bottom-1 h-px bg-brand-teal" aria-hidden="true" />}
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              role="menu"
              aria-label={isArabic ? menu.ar : menu.en}
              initial={reduceMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.16 }}
              className={`absolute left-1/2 top-full z-10 mt-2 w-[19rem] -translate-x-1/2 rounded-lg border p-2 backdrop-blur-xl ${chrome}`}
            >
              <Link
                role="menuitem"
                to={menu.to}
                className={`flex min-h-11 items-center rounded-md px-3 text-start text-[0.7rem] font-bold uppercase tracking-[0.08em] transition-colors hover:bg-brand-teal/10 ${foreground}`}
              >
                {isArabic ? menu.overviewAr : menu.overviewEn}
              </Link>
              <span className="my-1 block h-px bg-current/10" aria-hidden="true" />
              {menu.items().map((item) => (
                <Link
                  key={item.to}
                  role="menuitem"
                  to={item.to}
                  className={`flex min-h-11 items-center rounded-md px-3 py-2 text-start text-[0.82rem] leading-snug transition-colors hover:bg-brand-teal/10 ${foreground}`}
                >
                  {isArabic ? item.ar : item.en}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <header className={`site-header fixed left-1/2 top-3 z-50 w-[94%] max-w-[1320px] -translate-x-1/2 rounded-xl border backdrop-blur-xl transition-colors ${chrome}`}>
      <div className="site-header__bar flex min-h-[68px] items-center justify-between gap-3 px-3 sm:px-5">
        <Link to="/" aria-label={isArabic ? 'مِنا — الصفحة الرئيسية' : 'MENA — home'} className="flex min-h-11 min-w-11 items-center">
          <span className="block h-14 w-12"><MenaLogo color="var(--color-brand-teal)" /></span>
        </Link>

        <nav ref={navRef} className="site-header__nav hidden items-center lg:flex" aria-label={isArabic ? 'التنقل الرئيسي' : 'Primary navigation'}>
          {PRIMARY_LEFT.map(navLink)}
          {dropdown('programs')}
          {dropdown('events')}
          {PRIMARY_RIGHT.map(navLink)}
          <Link to="/donate" className="micro-button ml-1 flex min-h-11 items-center gap-1.5 rounded-md bg-brand-teal px-3 text-[0.7rem] font-bold uppercase tracking-[0.08em] text-[#21150f] transition-colors hover:bg-brand-teal-bright">
            <Heart className="h-3.5 w-3.5" aria-hidden="true" />
            {isArabic ? 'تبرّع' : 'Donate'}
          </Link>
        </nav>

        <div className="site-header__controls flex items-center gap-1.5">
          <button type="button" onClick={() => setIsArabic(!isArabic)} className={`micro-button flex h-11 min-w-11 items-center justify-center gap-1.5 rounded-md border border-current/15 px-2.5 text-xs font-bold ${foreground}`} aria-label={isArabic ? 'التبديل إلى الإنجليزية' : 'Switch to Arabic'}>
            <Globe className="h-4 w-4 text-brand-teal" aria-hidden="true" />
            <span className="hidden sm:inline">{isArabic ? 'EN' : 'عربي'}</span>
          </button>
          <button id="theme-mode-toggle" type="button" onClick={() => setIsLightMode(!isLightMode)} className={`micro-button flex h-11 min-w-11 items-center justify-center rounded-md border border-current/15 ${foreground}`} aria-label={isLightMode ? (isArabic ? 'استخدم النمط الداكن' : 'Use dark theme') : (isArabic ? 'استخدم النمط الفاتح' : 'Use light theme')}>
            {isLightMode ? <Moon className="h-4 w-4 text-brand-teal" aria-hidden="true" /> : <Sun className="h-4 w-4 text-brand-teal" aria-hidden="true" />}
          </button>
          <button type="button" onClick={() => setMobileOpen(!mobileOpen)} className={`micro-button flex h-11 min-w-11 items-center justify-center rounded-md border border-current/15 lg:hidden ${foreground}`} aria-expanded={mobileOpen} aria-controls="mobile-navigation" aria-label={mobileOpen ? (isArabic ? 'إغلاق القائمة' : 'Close menu') : (isArabic ? 'فتح القائمة' : 'Open menu')}>
            {mobileOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            id="mobile-navigation"
            aria-label={isArabic ? 'التنقل على الهاتف' : 'Mobile navigation'}
            initial={reduceMotion ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="site-header__mobile-nav overflow-x-hidden border-t border-current/10 px-3 pb-4 lg:hidden"
          >
            {PRIMARY_LEFT.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                aria-current={isActive(link) ? 'page' : undefined}
                className={`flex min-h-12 items-center border-b border-current/10 text-sm font-bold ${isActive(link) ? 'text-brand-teal' : foreground}`}
              >
                {isArabic ? link.ar : link.en}
              </Link>
            ))}

            {(['programs', 'events'] as const).map((name) => {
              const menu = MENUS[name];
              const expanded = mobileMenu === name;
              const active = location.pathname.startsWith(menu.to);
              return (
                <div key={name} className="border-b border-current/10">
                  <button
                    type="button"
                    aria-expanded={expanded}
                    onClick={() => setMobileMenu(expanded ? null : name)}
                    className={`flex min-h-12 w-full items-center justify-between text-start text-sm font-bold ${active ? 'text-brand-teal' : foreground}`}
                  >
                    {isArabic ? menu.ar : menu.en}
                    <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? 'rotate-180' : ''}`} aria-hidden="true" />
                  </button>
                  {expanded && (
                    <div className="mb-2 ms-3 border-s border-brand-teal/40 ps-3">
                      <Link to={menu.to} className={`flex min-h-11 items-center text-sm font-bold ${foreground}`}>
                        {isArabic ? menu.overviewAr : menu.overviewEn}
                      </Link>
                      {menu.items().map((item) => (
                        <Link key={item.to} to={item.to} className={`flex min-h-11 items-center py-1 text-sm leading-snug ${foreground}`}>
                          {isArabic ? item.ar : item.en}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {PRIMARY_RIGHT.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                aria-current={isActive(link) ? 'page' : undefined}
                className={`flex min-h-12 items-center border-b border-current/10 text-sm font-bold ${isActive(link) ? 'text-brand-teal' : foreground}`}
              >
                {isArabic ? link.ar : link.en}
              </Link>
            ))}

            <Link to="/donate" className="mission-button mt-3 w-full">
              <Heart className="h-4 w-4" aria-hidden="true" />
              {isArabic ? 'ادعم مِنا' : 'Support MENA'}
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

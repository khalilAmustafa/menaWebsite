import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Globe, Heart, Menu, Moon, Sun, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import MenaLogo from './MenaLogo';

interface HeaderProps {
  isArabic: boolean;
  setIsArabic: (value: boolean) => void;
  isLightMode: boolean;
  setIsLightMode: (value: boolean) => void;
}

/**
 * Primary navigation, now organization-level and fully route-based:
 *
 *   HOME | ABOUT | TEAM | PROGRAMS | ACHIEVEMENTS | CONTACT   (+ the Donate pill)
 *
 * The previous homepage-anchor items (Analog Mars, Field archive) and the two dropdowns
 * are gone; they described one mission rather than the organization. Nothing became
 * unreachable — Events and the analog mission live in the footer, "Programs" points at the
 * existing /activities page, and Contact is now a real /contact route.
 *
 * Active state comes from the pathname rather than a scroll observer. The mobile drawer's
 * behaviour (height animation, scroll lock, Escape, resize-to-desktop) is unchanged.
 */

interface NavItem {
  to: string;
  en: string;
  ar: string;
  /** Match nested routes too (e.g. /team/:slug should still light up TEAM). */
  nested?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { to: '/', en: 'Home', ar: 'الرئيسية' },
  { to: '/about', en: 'About', ar: 'من نحن' },
  { to: '/team', en: 'Team', ar: 'الفريق', nested: true },
  { to: '/activities', en: 'Programs', ar: 'البرامج', nested: true },
  { to: '/achievements', en: 'Achievements', ar: 'الإنجازات', nested: true },
  { to: '/contact', en: 'Contact', ar: 'تواصل' },
];

export default function Header({ isArabic, setIsArabic, isLightMode, setIsLightMode }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const reduceMotion = useReducedMotion();

  const foreground = isLightMode ? 'text-[#4e4039] hover:text-[#261b16]' : 'text-neutral-300 hover:text-white';
  const chrome = isLightMode
    ? 'border-[#49352a]/15 bg-[#f3f3f1]/92 shadow-[0_14px_45px_rgba(58,44,38,.12)]'
    : 'border-white/10 bg-[#100c0a]/88 shadow-[0_18px_55px_rgba(0,0,0,.34)]';

  const isActive = (item: NavItem) =>
    item.nested ? location.pathname.startsWith(item.to) : location.pathname === item.to;

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const closeMenus = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', closeMenus);
    return () => window.removeEventListener('keydown', closeMenus);
  }, []);

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

  return (
    <header className={`site-header fixed left-1/2 top-3 z-50 w-[94%] max-w-[1320px] -translate-x-1/2 rounded-xl border backdrop-blur-xl transition-colors ${chrome}`}>
      <div className="site-header__bar flex min-h-[68px] items-center justify-between gap-3 px-3 sm:px-5">
        <Link to="/" aria-label={isArabic ? 'مِنا — الصفحة الرئيسية' : 'MENA — home'} className="flex min-h-11 min-w-11 items-center">
          <span className="block h-14 w-12"><MenaLogo color="var(--color-brand-teal)" /></span>
        </Link>

        <nav className="site-header__nav hidden items-center lg:flex" aria-label={isArabic ? 'التنقل الرئيسي' : 'Primary navigation'}>
          {NAV_ITEMS.map((item) => {
            const active = isActive(item);
            return (
              <Link
                key={item.to}
                to={item.to}
                aria-current={active ? 'page' : undefined}
                className={`relative flex min-h-11 items-center px-2.5 font-sans text-[0.7rem] font-bold uppercase tracking-[0.08em] transition-colors ${active ? 'text-brand-teal' : foreground}`}
              >
                {isArabic ? item.ar : item.en}
                {active && <span className="absolute inset-x-2.5 bottom-1 h-px bg-brand-teal" aria-hidden="true" />}
              </Link>
            );
          })}
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
            {NAV_ITEMS.map((item) => {
              const active = isActive(item);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  aria-current={active ? 'page' : undefined}
                  className={`flex min-h-12 items-center border-b border-current/10 text-sm font-bold ${active ? 'text-brand-teal' : foreground}`}
                >
                  {isArabic ? item.ar : item.en}
                </Link>
              );
            })}
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

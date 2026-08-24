import { Outlet, useOutletContext } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Chatbot from './Chatbot';
import Starfield from './Starfield';
import SiteIntro from './SiteIntro';

/**
 * Shared state threaded from <App/> to every routed page via the router Outlet.
 * This intentionally reuses the existing theme/language state instead of adding a
 * new context/provider system.
 */
export interface SiteContext {
  isArabic: boolean;
  setIsArabic: (value: boolean) => void;
  isLightMode: boolean;
  setIsLightMode: (value: boolean) => void;
}

/** Typed accessor for page components rendered inside <SiteLayout/>'s <Outlet/>. */
export function useSiteContext(): SiteContext {
  return useOutletContext<SiteContext>();
}

interface SiteLayoutProps extends SiteContext {}

/**
 * The one shared shell for the whole site: root theme container, ambient background,
 * Starfield, Header, a single <main> landmark (renders the active route via <Outlet/>),
 * Footer, and the floating Chatbot. Rendering this once guarantees a single Header,
 * Footer, Chatbot, and main landmark across all routes.
 *
 * The root wrapper markup mirrors the previous <App/> root exactly so the homepage is
 * visually unchanged.
 */
export default function SiteLayout({
  isArabic,
  setIsArabic,
  isLightMode,
  setIsLightMode,
}: SiteLayoutProps) {
  const context: SiteContext = {
    isArabic,
    setIsArabic,
    isLightMode,
    setIsLightMode,
  };

  return (
    <div
      className="site-shell relative min-h-screen overflow-x-hidden font-sans selection:bg-brand-teal selection:text-[#21150f]"
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      <SiteIntro />
      <a href="#main-content" className="skip-link">
        {isArabic ? 'انتقل إلى المحتوى' : 'Skip to content'}
      </a>
      {/* Scroll-aware background star field matching astronomy simulation ambient */}
      <Starfield />

      {/* Header Navigation block */}
      <Header
        isArabic={isArabic}
        setIsArabic={setIsArabic}
        isLightMode={isLightMode}
        setIsLightMode={setIsLightMode}
      />

      {/* Single primary content landmark — routed page renders here */}
      <main id="main-content" className="relative z-10" tabIndex={-1}>
        <Outlet context={context} />
      </main>

      <Footer isArabic={isArabic} />
      <Chatbot isArabic={isArabic} />
    </div>
  );
}

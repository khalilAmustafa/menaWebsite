import { Outlet, useOutletContext } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Chatbot from './Chatbot';
import Starfield from './Starfield';

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
  activeSection: string;
  setActiveSection: (value: string) => void;
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
  activeSection,
  setActiveSection,
}: SiteLayoutProps) {
  const context: SiteContext = {
    isArabic,
    setIsArabic,
    isLightMode,
    setIsLightMode,
    activeSection,
    setActiveSection,
  };

  return (
    <div
      className="min-h-screen bg-black text-neutral-100 selection:bg-brand-teal selection:text-black font-sans relative overflow-x-hidden"
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      {/* Absolute Ambient Background Starfield with brand accents */}
      <div
        className={`absolute inset-0 ${
          isLightMode
            ? 'bg-[radial-gradient(ellipse_at_top,rgba(203,173,142,0.10),#f9fafb)]'
            : 'bg-[radial-gradient(ellipse_at_top,rgba(203,173,142,0.06),transparent)]'
        } pointer-events-none z-0`}
      />

      {/* Scroll-aware background star field matching astronomy simulation ambient */}
      <Starfield />

      {/* Header Navigation block */}
      <Header
        isArabic={isArabic}
        setIsArabic={setIsArabic}
        activeSection={activeSection}
        isLightMode={isLightMode}
        setIsLightMode={setIsLightMode}
      />

      {/* Single primary content landmark — routed page renders here */}
      <main className="relative z-10">
        <Outlet context={context} />
      </main>

      <Footer isArabic={isArabic} />
      <Chatbot isArabic={isArabic} />
    </div>
  );
}

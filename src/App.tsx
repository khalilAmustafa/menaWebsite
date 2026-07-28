import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import SiteLayout from './components/SiteLayout';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import PlaceholderPage from './pages/PlaceholderPage';
import NotFoundPage from './pages/NotFoundPage';

/**
 * App owns the shared theme + language state (unchanged from the previous single-page
 * implementation) and defines the route table. All routes render inside a single
 * <SiteLayout/> so there is exactly one Header, Footer, Chatbot, and <main> landmark.
 *
 * Phase 1 note: every non-`/` route is a temporary <PlaceholderPage/>. No final content.
 */
export default function App() {
  const [isArabic, setIsArabic] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('about');
  const [isLightMode, setIsLightMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme-mode') === 'light';
    }
    return false;
  });

  // Keep light-mode body classes synchronized reactively (source of light-mode styling).
  useEffect(() => {
    if (isLightMode) {
      document.body.classList.add('light-mode');
      localStorage.setItem('theme-mode', 'light');
    } else {
      document.body.classList.remove('light-mode');
      localStorage.setItem('theme-mode', 'dark');
    }
  }, [isLightMode]);

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route
          element={
            <SiteLayout
              isArabic={isArabic}
              setIsArabic={setIsArabic}
              isLightMode={isLightMode}
              setIsLightMode={setIsLightMode}
              activeSection={activeSection}
              setActiveSection={setActiveSection}
            />
          }
        >
          {/* Existing complete homepage */}
          <Route path="/" element={<HomePage />} />

          {/* Temporary Phase-1 placeholders (no final content) */}
          <Route
            path="/achievements"
            element={<PlaceholderPage titleEN="Achievements" titleAR="الإنجازات" />}
          />
          <Route
            path="/achievements/research"
            element={<PlaceholderPage titleEN="Research Papers" titleAR="الأوراق البحثية" />}
          />
          <Route
            path="/research/:slug"
            element={<PlaceholderPage titleEN="Research Paper" titleAR="ورقة بحثية" showSlug />}
          />
          <Route
            path="/events"
            element={<PlaceholderPage titleEN="Events" titleAR="الفعاليات" />}
          />
          {/* Static route declared before the dynamic one for clarity (route ranking also
              guarantees this specific path wins over /events/:slug). */}
          <Route
            path="/events/space-game-challenge-2026"
            element={
              <PlaceholderPage
                titleEN="MENA Space Game Challenge 2026"
                titleAR="تحدي مِنا لألعاب الفضاء 2026"
              />
            }
          />
          <Route
            path="/events/:slug"
            element={<PlaceholderPage titleEN="Event" titleAR="فعالية" showSlug />}
          />
          <Route
            path="/activities"
            element={<PlaceholderPage titleEN="Activities" titleAR="الأنشطة" />}
          />
          <Route
            path="/team"
            element={<PlaceholderPage titleEN="Team" titleAR="الفريق" />}
          />
          <Route
            path="/team/:slug"
            element={<PlaceholderPage titleEN="Team Member" titleAR="عضو الفريق" showSlug />}
          />

          {/* Not Found */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

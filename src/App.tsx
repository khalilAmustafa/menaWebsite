import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import SiteLayout from './components/SiteLayout';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import PlaceholderPage from './pages/PlaceholderPage';
import NotFoundPage from './pages/NotFoundPage';
import AchievementsPage from './pages/AchievementsPage';
import ResearchPapersPage from './pages/ResearchPapersPage';
import ResearchPaperPage from './pages/ResearchPaperPage';
import TeamPage from './pages/TeamPage';
import TeamMemberPage from './pages/TeamMemberPage';

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

          {/* Phase 3 — real Achievements + Research pages */}
          <Route path="/achievements" element={<AchievementsPage />} />
          <Route path="/achievements/research" element={<ResearchPapersPage />} />
          <Route path="/research/:slug" element={<ResearchPaperPage />} />

          {/* Temporary placeholders (later phases) */}
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
          {/* Phase 4 — real Team pages */}
          <Route path="/team" element={<TeamPage />} />
          <Route path="/team/:slug" element={<TeamMemberPage />} />

          {/* Not Found */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

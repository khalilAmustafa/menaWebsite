import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import SiteLayout from './components/SiteLayout';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import AchievementsPage from './pages/AchievementsPage';
import ResearchPapersPage from './pages/ResearchPapersPage';
import ResearchPaperPage from './pages/ResearchPaperPage';
import TeamPage from './pages/TeamPage';
import TeamMemberPage from './pages/TeamMemberPage';
import SpaceGameChallengePage from './pages/SpaceGameChallengePage';
import EventsPage from './pages/EventsPage';
import AnalogMission2025Page from './pages/AnalogMission2025Page';
import NasaSpaceAppsPage from './pages/NasaSpaceAppsPage';
import ActivitiesPage from './pages/ActivitiesPage';

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

          {/* Phase 6 — real Events landing + Phase 5/6 event detail pages */}
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/space-game-challenge-2026" element={<SpaceGameChallengePage />} />
          <Route path="/events/analog-mission-2025" element={<AnalogMission2025Page />} />
          <Route path="/events/nasa-space-apps" element={<NasaSpaceAppsPage />} />

          {/* Phase 6 — real Activities page */}
          <Route path="/activities" element={<ActivitiesPage />} />
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

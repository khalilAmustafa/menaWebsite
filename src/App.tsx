import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

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
import ActivityDetailPage from './pages/ActivityDetailPage';
import DonatePage from './pages/DonatePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

/**
 * App owns the shared theme + language state (unchanged from the previous single-page
 * implementation) and defines the route table. All routes render inside a single
 * <SiteLayout/> so there is exactly one Header, Footer, Chatbot, and <main> landmark.
 *
 * Every route below now renders real content; the Phase 1 <PlaceholderPage/> scaffold has been
 * deleted, so any future unbuilt route should get a real page rather than a placeholder.
 */
export default function App() {
  const [isArabic, setIsArabic] = useState<boolean>(() => {
    if (typeof window !== 'undefined') return localStorage.getItem('site-language') === 'ar';
    return false;
  });
  const [isLightMode, setIsLightMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme-mode') === 'light';
    }
    return false;
  });

  // Keep light-mode body classes synchronized reactively (source of light-mode styling).
  useEffect(() => {
    document.documentElement.lang = isArabic ? 'ar' : 'en';
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
    localStorage.setItem('site-language', isArabic ? 'ar' : 'en');
  }, [isArabic]);

  useEffect(() => {
    if (isLightMode) {
      document.body.classList.add('light-mode');
      localStorage.setItem('theme-mode', 'light');
    } else {
      document.body.classList.remove('light-mode');
      localStorage.setItem('theme-mode', 'dark');
    }
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', isLightMode ? '#f3f3f1' : '#100c0a');
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
            />
          }
        >
          {/* Existing complete homepage */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/donate" element={<DonatePage />} />

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
          {/* The two ملتقى الصناع editions were merged into one record; keep the old
              per-year URLs working rather than letting shared links 404. */}
          <Route path="/activities/makers-forum-2025" element={<Navigate to="/activities/makers-forum" replace />} />
          <Route path="/activities/makers-forum-2024" element={<Navigate to="/activities/makers-forum" replace />} />
          <Route path="/activities/:slug" element={<ActivityDetailPage />} />
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

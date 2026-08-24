import { TeamDepartment } from './types';

/**
 * Legacy homepage data. Phase 8 reduced this file to ONLY what the live site actually renders.
 *
 * Deleted in the Phase 8 final-QA pass (all fabricated, none rendered since Phase 4.5 — every
 * one recoverable from git history if a real version is ever supplied):
 *   - IMPACT_STATS   — invented figures ("1st" women-led, "250+" alumni, "2" missions, "15+" advisors)
 *   - ADVISORS       — 4 invented advisors with invented orgs/biographies and Unsplash stock portraits
 *   - SUPPORT_TIERS  — invented $25/$100/$500 donation tiers (and its only consumer, Donation.tsx)
 *   - IMAGES.engineering / .missionControl / .eva — AI-render placeholders, files deleted from public/
 *   - DEPARTMENTS narrative fields — leadName, leadRole, teamSize, description and coreFocus were
 *     all invented (fake people such as "Dr. Raed Kawar", fake head counts, fake capabilities).
 *
 * They were kept "dead but present" by earlier phases, which is exactly how fabricated data gets
 * accidentally re-rendered later. Removing them makes that regression impossible.
 */

export const IMAGES = {
  heroLight: 'images/hero/mena-hero-light.webp',
  heroDark: 'images/hero/mena-hero-dark.webp',
};

/**
 * Department display names only. These are used solely by `getDepartmentName()` (src/lib/team.ts)
 * to label the three real 2026 heads whose department mapping is confirmed. No leads, head counts,
 * or capability claims are inferred.
 */
export const DEPARTMENTS: TeamDepartment[] = [
  { id: 'dept-board', name: 'Board of Trustees & Founders', arabicName: 'مجلس الأمناء والمؤسسين' },
  { id: 'dept-advisors', name: 'Scientific Advisory Board', arabicName: 'الهيئة الاستشارية العلمية' },
  // Arabic copy review: was 'غرفة التحكم بالبعثات والعمليات' — "Mission & Operations CONTROL
  // ROOM", naming a facility that is not established to exist. The EN name never claimed one.
  { id: 'dept-mission', name: 'Management & Mission Operations', arabicName: 'إدارة البعثات والعمليات' },
  { id: 'dept-marketing', name: 'Marketing & Public Outreach', arabicName: 'أبحاث التسويق والإعلام والاتصال' },
  { id: 'dept-eng', name: 'Design & Engineering Team', arabicName: 'الهندسة وتصميم بدلات الفضاء' },
  { id: 'dept-spacefood', name: 'Space Food Systems', arabicName: 'أغذية الفضاء والتقنيات الزراعية' },
  { id: 'dept-rd', name: 'R&D - Sci. & Experiments Team', arabicName: 'البحوث العلمية والتجارب الأكاديمية' },
  { id: 'dept-med', name: 'Medical & Safety Team', arabicName: 'الرعاية الطبية والسلامة التشغيلية' },
  { id: 'dept-tech', name: 'Tech & Software Innovation', arabicName: 'التكنولوجيا والأنظمة الرقمية' },
  { id: 'dept-training', name: 'Astronaut Preparation Team', arabicName: 'تدريب وتأهيل رواد الفضاء الأنالوج' },
];

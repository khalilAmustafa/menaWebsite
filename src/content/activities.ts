import type { Activity } from './types';

/**
 * Confirmed recurring activities / programs (distinct from one-off Events).
 *
 * SYSTEM — CONFIRMED from the official banner ("SYSTEM · SPACE FOR YOUTH THROUGH STEM ·
 * 2025-2026"). It is a youth STEM program, not an event. The program's activity photos show
 * identifiable minors and are deliberately NOT published; only the branded (cartoon) banner
 * graphic is used. Detailed curriculum/outcomes are unconfirmed → absent (see contentGaps).
 *
 * ملتقى الصناع (Makers Forum) — filenames establish two separate occurrences (2024, 2025).
 * The Arabic proper name is preserved (not translated authoritatively). Exact dates, location,
 * and descriptions were not supplied → absent.
 */
export const ACTIVITIES: Activity[] = [
  {
    id: 'act-system',
    slug: 'system',
    title: { en: 'SYSTEM', ar: 'SYSTEM' },
    summary: { en: 'Space for Youth Through STEM — a youth STEM program.' },
    period: '2025–2026',
    image: {
      id: 'system-banner',
      type: 'image',
      src: '/images/activities/system-banner.jpg',
      alt: { en: 'SYSTEM — Space for Youth Through STEM program banner' },
    },
    order: 1,
  },
  {
    id: 'act-makers-forum-2025',
    slug: 'makers-forum-2025',
    title: { en: 'ملتقى الصناع 2025', ar: 'ملتقى الصناع 2025' },
    year: 2025,
    image: {
      id: 'makers-forum-2025',
      type: 'image',
      src: '/images/activities/maker-forum-2025.jpg',
      alt: { en: 'Participants at ملتقى الصناع (Makers Forum) 2025' },
    },
    order: 2,
  },
  {
    id: 'act-makers-forum-2024',
    slug: 'makers-forum-2024',
    title: { en: 'ملتقى الصناع 2024', ar: 'ملتقى الصناع 2024' },
    year: 2024,
    image: {
      id: 'makers-forum-2024',
      type: 'image',
      src: '/images/activities/maker-forum-2024.jpg',
      alt: { en: 'Participants at ملتقى الصناع (Makers Forum) 2024' },
    },
    order: 3,
  },
];

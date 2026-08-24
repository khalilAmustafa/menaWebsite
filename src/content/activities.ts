import type { Activity } from './types';

/**
 * Confirmed recurring activities / programs (distinct from one-off Events).
 *
 * SYSTEM — CONFIRMED from the official branding ("S.Y.S.T.E.M · SPACE FOR YOUTH THROUGH
 * STEM · BY MENA" on the official program logo, and the 2025-2026 period on the banner).
 * It is a youth STEM program, not an event.
 *
 * PHOTO PUBLICATION: the real activity photography is now published on the SYSTEM detail page
 * with the owner's explicit approval (previous phases withheld it pending that decision). The
 * participants appear to be school-age, so the alt text describes ONLY the visible activity —
 * no names, no ages, no school, no team, no outcome. Readable text in the photos (a school
 * uniform crest, an instructor's name patch) is deliberately NOT transcribed into published
 * copy: identifying minors or naming their school is personal information, not site content.
 *
 * Alt text also avoids inferring anything the photos merely suggest — e.g. NASA educational
 * worksheets are visible on a table, which is NOT evidence of a NASA partnership, so no such
 * relationship is stated. Curriculum, outcomes, dates beyond 2025–2026, attendance numbers and
 * partners all remain unconfirmed and are therefore absent.
 *
 * ملتقى الصناع (Makers Forum) — filenames establish two separate occurrences (2024, 2025).
 * The Arabic proper name is preserved (not translated authoritatively). Exact dates, location,
 * and descriptions were not supplied → absent.
 */
export const ACTIVITIES: Activity[] = [
  {
    id: 'act-system',
    slug: 'system',
    title: { en: 'SYSTEM', ar: 'سيستم' },
    summary: { en: 'Space for Youth Through STEM — a youth STEM program.', ar: 'الفضاء للشباب من خلال العلوم والتكنولوجيا والهندسة والرياضيات — برنامج تطبيقي للشباب.' },
    period: '2025–2026',
    image: {
      id: 'system-logo',
      type: 'image',
      src: 'images/activities/system-logo.png',
      alt: { en: 'SYSTEM — Space for Youth Through STEM official program logo', ar: 'الشعار الرسمي لبرنامج سيستم — الفضاء للشباب من خلال العلوم والتكنولوجيا والهندسة والرياضيات' },
      width: 512,
      height: 512,
    },
    imageFit: 'contain',
    // The logo stays the card thumbnail (it reads well at small sizes); the detail page leads
    // with photography and shows the logo as branding.
    logo: {
      id: 'system-logo-mark',
      type: 'image',
      src: 'images/activities/system-logo.png',
      alt: { en: 'SYSTEM — Space for Youth Through STEM official program logo', ar: 'الشعار الرسمي لبرنامج سيستم — الفضاء للشباب من خلال العلوم والتكنولوجيا والهندسة والرياضيات' },
      width: 512,
      height: 512,
    },
    hero: {
      id: 'system-hero',
      type: 'image',
      src: 'images/activities/system/hero.jpg',
      alt: { en: 'Students assembling a geodesic dome frame outdoors during a SYSTEM activity', ar: 'طلبة يركّبون هيكل قبة جيوديسية في الهواء الطلق خلال نشاط لبرنامج سيستم' },
      width: 1200,
      height: 1500,
    },
    gallery: [
      {
        id: 'system-g1',
        type: 'image',
        src: 'images/activities/system/gallery-01.jpg',
        alt: { en: 'Students working together on a dome-building activity on a school sports field', ar: 'طلبة يعملون معاً على بناء قبة في ملعب مدرسي' },
        width: 1200,
        height: 1500,
      },
      {
        id: 'system-g2',
        type: 'image',
        src: 'images/activities/system/gallery-02.jpg',
        alt: { en: 'Students building a model habitat from foam shapes on a printed Mars surface map', ar: 'طلبة يبنون نموذج موئل من قطع إسفنجية فوق خريطة مطبوعة لسطح المريخ' },
        width: 1200,
        height: 1500,
      },
      {
        id: 'system-g3',
        type: 'image',
        src: 'images/activities/system/gallery-03.jpg',
        alt: { en: 'An instructor working with students at a table, mission patches shown on a screen behind them', ar: 'مدرّب يعمل مع الطلبة إلى طاولة وتظهر شارات بعثات على شاشة خلفهم' },
        width: 1200,
        height: 1500,
      },
      {
        id: 'system-g4',
        type: 'image',
        src: 'images/activities/system/gallery-04.jpg',
        alt: { en: 'An instructor guiding students through a worksheet activity with sample jars on the table', ar: 'مدرّب يوجّه الطلبة خلال نشاط بأوراق عمل ومرطبانات عينات على الطاولة' },
        width: 1200,
        height: 1500,
      },
      {
        id: 'system-g5',
        type: 'image',
        src: 'images/activities/system/gallery-05.jpg',
        alt: { en: 'Students working on a hands-on task together at a library table', ar: 'طلبة يعملون معاً على مهمة تطبيقية إلى طاولة في مكتبة' },
        width: 1200,
        height: 1500,
      },
      {
        id: 'system-g6',
        type: 'image',
        src: 'images/activities/system/gallery-06.jpg',
        alt: { en: 'Mission-patch design worksheets on a table during a SYSTEM session', ar: 'أوراق عمل لتصميم شارات البعثات على طاولة خلال جلسة لبرنامج سيستم' },
        width: 1200,
        height: 1500,
      },
    ],
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
      src: 'images/activities/maker-forum-2025.jpg',
      alt: { en: 'Participants at ملتقى الصناع (Makers Forum) 2025', ar: 'مشاركون في ملتقى الصناع 2025' },
      width: 1600,
      height: 900,
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
      src: 'images/activities/maker-forum-2024.jpg',
      alt: { en: 'Participants at ملتقى الصناع (Makers Forum) 2024', ar: 'مشاركون في ملتقى الصناع 2024' },
      width: 600,
      height: 451,
    },
    order: 3,
  },
];

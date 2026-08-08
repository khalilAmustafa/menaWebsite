import type { TeamMember } from './types';

/**
 * Authoritative TeamMember collection for the new content layer.
 *
 * Phase 4 populates this with the confirmed 2026 Team Heads whose identity AND role are
 * unambiguous from the official "HEADS 2026" asset folders. Identity was taken ONLY from
 * folder/file names — never from the photographs. Roles are the exact folder-supplied roles.
 *
 * Intentionally EXCLUDED (recorded in `contentGaps.ts`, not invented here):
 *  - Heads whose folder role is duplicated and therefore ambiguous as a single-head title
 *    (8× "Space Medicine Head", 3× satellite-team, 3× spacesuit-team, 2× R&D).
 *  - People whose folder exists but contained no photo (Ahmad Alrbaidi, Hani Alajlouni).
 *
 * `departmentId` is set ONLY where the mapping to an existing `DEPARTMENTS` entry (src/data.ts)
 * is clear; otherwise it is left undefined (see gaps). Biographies / external links / research
 * / achievement links are absent because no such data was supplied — none are fabricated.
 *
 * The existing homepage `DEPARTMENTS` data and `Teams.tsx` are deliberately left untouched.
 */
export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'team-salam-abualhayjaa',
    slug: 'salam-abualhayjaa',
    fullName: 'Eng. Salam Abualhayjaa',
    role: { en: 'Founder & CEO' },
    photo: {
      id: 'photo-salam-abualhayjaa',
      type: 'image',
      src: '/images/team/2026/salam-abualhayjaa.jpg',
      alt: { en: 'Portrait of Eng. Salam Abualhayjaa, Founder & CEO' },
    },
    isHead: true,
    order: 1,
  },
  {
    id: 'team-raed-zeinalabdeen',
    slug: 'raed-zeinalabdeen',
    fullName: "Ra'ed ZeinAlabdeen",
    role: { en: 'Outreach & Partnerships Lead' },
    photo: {
      id: 'photo-raed-zeinalabdeen',
      type: 'image',
      src: '/images/team/2026/raed-zeinalabdeen.jpg',
      alt: { en: "Portrait of Ra'ed ZeinAlabdeen, Outreach & Partnerships Lead" },
    },
    isHead: true,
    order: 2,
  },
  {
    id: 'team-kamal-dia',
    slug: 'kamal-dia',
    fullName: 'Kamal Dia',
    role: { en: 'Event Manager' },
    photo: {
      id: 'photo-kamal-dia',
      type: 'image',
      src: '/images/team/2026/kamal-dia.jpg',
      alt: { en: 'Portrait of Kamal Dia, Event Manager' },
    },
    isHead: true,
    order: 3,
  },
  {
    id: 'team-majd-alsadi',
    slug: 'majd-alsadi',
    fullName: 'Eng. Majd Alsadi',
    role: { en: 'Head of Grants Team' },
    photo: {
      id: 'photo-majd-alsadi',
      type: 'image',
      src: '/images/team/2026/majd-alsadi.jpg',
      alt: { en: 'Portrait of Eng. Majd Alsadi, Head of Grants Team' },
    },
    isHead: true,
    order: 4,
  },
  {
    id: 'team-jana-baniyaseen',
    slug: 'jana-baniyaseen',
    fullName: 'Jana BaniYaseen',
    role: { en: 'Head of Quality Control' },
    photo: {
      id: 'photo-jana-baniyaseen',
      type: 'image',
      src: '/images/team/2026/jana-baniyaseen.jpg',
      alt: { en: 'Portrait of Jana BaniYaseen, Head of Quality Control' },
    },
    isHead: true,
    order: 5,
  },
  {
    id: 'team-leen-albzour',
    slug: 'leen-albzour',
    fullName: 'Leen Albzour',
    role: { en: 'Head of Social Media & Digital Marketing' },
    departmentId: 'dept-marketing',
    photo: {
      id: 'photo-leen-albzour',
      type: 'image',
      src: '/images/team/2026/leen-albzour.jpg',
      alt: { en: 'Portrait of Leen Albzour, Head of Social Media & Digital Marketing' },
    },
    isHead: true,
    order: 6,
  },
  {
    id: 'team-osaid-haimour',
    slug: 'osaid-haimour',
    fullName: 'Osaid Haimour',
    role: { en: 'R&D Head' },
    departmentId: 'dept-rd',
    photo: {
      id: 'photo-osaid-haimour',
      type: 'image',
      src: '/images/team/2026/osaid-haimour.jpg',
      alt: { en: 'Portrait of Osaid Haimour, R&D Head' },
    },
    isHead: true,
    order: 7,
  },
  {
    id: 'team-yazeed-edrees',
    slug: 'yazeed-edrees',
    fullName: 'Yazeed Edrees',
    role: { en: 'IT&AI Head' },
    departmentId: 'dept-tech',
    photo: {
      id: 'photo-yazeed-edrees',
      type: 'image',
      src: '/images/team/2026/yazeed-edrees.jpg',
      alt: { en: 'Portrait of Yazeed Edrees, IT&AI Head' },
    },
    isHead: true,
    order: 8,
  },
  {
    id: 'team-mohammad-alsayed-ahmad',
    slug: 'mohammad-alsayed-ahmad',
    fullName: 'Mohammad ALsayed Ahmad',
    role: { en: 'Head of Rover' },
    photo: {
      id: 'photo-mohammad-alsayed-ahmad',
      type: 'image',
      src: '/images/team/2026/mohammad-alsayed-ahmad.jpg',
      alt: { en: 'Portrait of Mohammad ALsayed Ahmad, Head of Rover' },
    },
    isHead: true,
    order: 9,
  },
  {
    id: 'team-yazan-odeh',
    slug: 'yazan-odeh',
    fullName: 'Yazan Odeh',
    role: { en: 'Habitat Head' },
    photo: {
      id: 'photo-yazan-odeh',
      type: 'image',
      src: '/images/team/2026/yazan-odeh.webp',
      alt: { en: 'Portrait of Yazan Odeh, Habitat Head' },
    },
    isHead: true,
    order: 10,
  },
  {
    id: 'team-shahed-alshab',
    slug: 'shahed-alshab',
    fullName: 'Shahed Alshab',
    role: { en: 'Energy Team Head' },
    photo: {
      id: 'photo-shahed-alshab',
      type: 'image',
      src: '/images/team/2026/shahed-alshab.jpg',
      alt: { en: 'Portrait of Shahed Alshab, Energy Team Head' },
    },
    isHead: true,
    order: 11,
  },
];

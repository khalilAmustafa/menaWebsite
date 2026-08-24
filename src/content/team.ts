import type { TeamMember } from './types';

/**
 * Authoritative TeamMember collection for the new content layer.
 *
 * Phase 4 populates this with the confirmed 2026 Team Heads whose identity AND role are
 * unambiguous from the official "HEADS 2026" asset folders. Identity was taken ONLY from
 * folder/file names — never from the photographs. Roles are the exact folder-supplied roles.
 *
 * Intentionally excluded rather than inferred:
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
    fullNameAr: 'م. سلام أبو الهيجاء',
    role: { en: 'Founder & CEO', ar: 'المؤسِّسة والرئيسة التنفيذية' },
    photo: {
      id: 'photo-salam-abualhayjaa',
      type: 'image',
      src: 'images/team/2026/salam-abualhayjaa.jpg',
      alt: { en: 'Portrait of Eng. Salam Abualhayjaa, Founder & CEO', ar: 'صورة م. سلام أبو الهيجاء، المؤسِّسة والرئيسة التنفيذية' },
      width: 880,
      height: 1100,
    },
    isHead: true,
    order: 1,
  },
  {
    id: 'team-raed-zeinalabdeen',
    slug: 'raed-zeinalabdeen',
    fullName: "Ra'ed ZeinAlabdeen",
    fullNameAr: 'رائد زين العابدين',
    role: { en: 'Outreach & Partnerships Lead', ar: 'مسؤول التواصل والشراكات' },
    photo: {
      id: 'photo-raed-zeinalabdeen',
      type: 'image',
      src: 'images/team/2026/raed-zeinalabdeen.jpg',
      alt: { en: "Portrait of Ra'ed ZeinAlabdeen, Outreach & Partnerships Lead", ar: 'صورة رائد زين العابدين، مسؤول التواصل والشراكات' },
      width: 733,
      height: 1100,
    },
    isHead: true,
    order: 2,
  },
  {
    id: 'team-kamal-dia',
    slug: 'kamal-dia',
    fullName: 'Kamal Dia',
    fullNameAr: 'كمال ضياء',
    role: { en: 'Event Manager', ar: 'مدير الفعاليات' },
    photo: {
      id: 'photo-kamal-dia',
      type: 'image',
      src: 'images/team/2026/kamal-dia.jpg',
      alt: { en: 'Portrait of Kamal Dia, Event Manager', ar: 'صورة كمال ضياء، مدير الفعاليات' },
      width: 880,
      height: 1100,
    },
    isHead: true,
    order: 3,
  },
  {
    id: 'team-majd-alsadi',
    slug: 'majd-alsadi',
    fullName: 'Eng. Majd Alsadi',
    fullNameAr: 'م. مجد السعدي',
    role: { en: 'Head of Grants Team', ar: 'رئيس فريق المنح' },
    photo: {
      id: 'photo-majd-alsadi',
      type: 'image',
      src: 'images/team/2026/majd-alsadi.jpg',
      alt: { en: 'Portrait of Eng. Majd Alsadi, Head of Grants Team', ar: 'صورة م. مجد السعدي، رئيس فريق المنح' },
      width: 786,
      height: 1100,
    },
    isHead: true,
    order: 4,
  },
  {
    id: 'team-jana-baniyaseen',
    slug: 'jana-baniyaseen',
    fullName: 'Jana BaniYaseen',
    fullNameAr: 'جنى بني ياسين',
    role: { en: 'Head of Quality Control', ar: 'رئيسة ضبط الجودة' },
    photo: {
      id: 'photo-jana-baniyaseen',
      type: 'image',
      src: 'images/team/2026/jana-baniyaseen.jpg',
      alt: { en: 'Portrait of Jana BaniYaseen, Head of Quality Control', ar: 'صورة جنى بني ياسين، رئيسة ضبط الجودة' },
      width: 825,
      height: 1100,
    },
    isHead: true,
    order: 5,
  },
  {
    id: 'team-leen-albzour',
    slug: 'leen-albzour',
    fullName: 'Leen Albzour',
    fullNameAr: 'لين البزور',
    role: { en: 'Head of Social Media & Digital Marketing', ar: 'رئيسة الإعلام الاجتماعي والتسويق الرقمي' },
    departmentId: 'dept-marketing',
    photo: {
      id: 'photo-leen-albzour',
      type: 'image',
      src: 'images/team/2026/leen-albzour.jpg',
      alt: { en: 'Portrait of Leen Albzour, Head of Social Media & Digital Marketing', ar: 'صورة لين البزور، رئيسة الإعلام الاجتماعي والتسويق الرقمي' },
      width: 734,
      height: 1100,
    },
    isHead: true,
    order: 6,
  },
  {
    id: 'team-osaid-haimour',
    slug: 'osaid-haimour',
    fullName: 'Osaid Haimour',
    fullNameAr: 'أسيد الحيمور',
    role: { en: 'R&D Head', ar: 'رئيس البحث والتطوير' },
    departmentId: 'dept-rd',
    photo: {
      id: 'photo-osaid-haimour',
      type: 'image',
      src: 'images/team/2026/osaid-haimour.jpg',
      alt: { en: 'Portrait of Osaid Haimour, R&D Head', ar: 'صورة أسيد الحيمور، رئيس البحث والتطوير' },
      width: 688,
      height: 1032,
    },
    isHead: true,
    order: 7,
  },
  {
    id: 'team-raed-khalil',
    slug: 'raed-khalil',
    fullName: 'Raed Khalil',
    fullNameAr: 'رائد خليل',
    role: { en: 'IT & AI Head', ar: 'رئيس تقنية المعلومات والذكاء الاصطناعي' },
    departmentId: 'dept-tech',
    photo: {
      id: 'photo-raed-khalil',
      type: 'image',
      src: 'images/team/2026/raed-khalil.webp',
      alt: { en: 'Portrait of Raed Khalil, IT & AI Head', ar: 'صورة رائد خليل، رئيس تقنية المعلومات والذكاء الاصطناعي' },
      width: 1254,
      height: 1254,
    },
    isHead: true,
    order: 8,
  },
  {
    id: 'team-mohammad-alsayed-ahmad',
    slug: 'mohammad-alsayed-ahmad',
    fullName: 'Mohammad ALsayed Ahmad',
    fullNameAr: 'محمد السيد أحمد',
    role: { en: 'Head of Rover', ar: 'رئيس فريق العربة الجوالة' },
    photo: {
      id: 'photo-mohammad-alsayed-ahmad',
      type: 'image',
      src: 'images/team/2026/mohammad-alsayed-ahmad.jpg',
      alt: { en: 'Portrait of Mohammad ALsayed Ahmad, Head of Rover', ar: 'صورة محمد السيد أحمد، رئيس فريق العربة الجوالة' },
      width: 786,
      height: 1100,
    },
    isHead: true,
    order: 9,
  },
  {
    id: 'team-yazan-odeh',
    slug: 'yazan-odeh',
    fullName: 'Yazan Odeh',
    fullNameAr: 'يزن عودة',
    role: { en: 'Habitat Head', ar: 'رئيس فريق الموئل' },
    photo: {
      id: 'photo-yazan-odeh',
      type: 'image',
      src: 'images/team/2026/yazan-odeh.webp',
      alt: { en: 'Portrait of Yazan Odeh, Habitat Head', ar: 'صورة يزن عودة، رئيس فريق الموئل' },
      width: 2252,
      height: 2252,
    },
    isHead: true,
    order: 10,
  },
  {
    id: 'team-shahed-alshab',
    slug: 'shahed-alshab',
    fullName: 'Shahed Alshab',
    fullNameAr: 'شهد الشاب',
    role: { en: 'Energy Team Head', ar: 'رئيسة فريق الطاقة' },
    photo: {
      id: 'photo-shahed-alshab',
      type: 'image',
      src: 'images/team/2026/shahed-alshab.jpg',
      alt: { en: 'Portrait of Shahed Alshab, Energy Team Head', ar: 'صورة شهد الشاب، رئيسة فريق الطاقة' },
      width: 825,
      height: 1100,
    },
    isHead: true,
    order: 11,
  },
];

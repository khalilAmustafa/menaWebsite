/**
 * Developer-facing registry of unresolved / unsupplied content. This is NOT rendered publicly —
 * it centralizes "what is still missing" so future phases and content owners have one place to
 * look instead of scattered TODO comments.
 */

export type ContentArea =
  | 'RESEARCH'
  | 'TEAM'
  | 'SPACE_GAME'
  | 'ACHIEVEMENTS'
  | 'EVENTS'
  | 'PARTNERS';

export interface ContentGap {
  area: ContentArea;
  item: string;
  note?: string;
}

export const CONTENT_GAPS: ContentGap[] = [
  // ── RESEARCH ────────────────────────────────────────────────────────────────
  { area: 'RESEARCH', item: 'Paper abstracts not supplied (do not generate).' },
  { area: 'RESEARCH', item: 'Categories not supplied.' },
  { area: 'RESEARCH', item: 'Publication statuses not supplied.' },
  { area: 'RESEARCH', item: 'External links (DOI / publication / video) not supplied.' },
  { area: 'RESEARCH', item: 'Related TeamMember mappings not supplied (authors store name only).' },
  {
    area: 'RESEARCH',
    item: '"GLOBAL TECHNICAL SYMPOSIUM" meaning unclear.',
    note: 'Associated in the source with Majd Alsadi & Lamia Shaheen. Could be a paper title, a symposium, a conference track, a category, or other metadata. Deliberately NOT created as a ResearchPaper pending clarification.',
  },
  {
    area: 'RESEARCH',
    item: "Salam Abualhayjaa's paper relationship unclear.",
    note: 'Listed as an additional contributor; not attached to any paper.',
  },
  {
    area: 'RESEARCH',
    item: "Dr. Firas Tawalbeh's paper relationship unclear.",
    note: 'Listed as an additional contributor; not attached to any paper.',
  },
  {
    area: 'RESEARCH',
    item: '"Students of School" identities and contribution unclear.',
    note: 'Details to be added later; not attached to any paper.',
  },
  {
    area: 'RESEARCH',
    item: 'Per-paper IAC 2026 acceptance details not supplied.',
    note: 'IAC 2026 – Antalya is attached as the confirmed conference edition, but paper IDs, session/track, and exact dates are unknown.',
  },

  // ── TEAM ────────────────────────────────────────────────────────────────────
  {
    area: 'TEAM',
    item: '8 people share the folder role "Space Medicine Head" — ambiguous, held from publication.',
    note: 'From HEADS 2026 folders: Ahmad Mustafa, Dina Radaideh, Faris Tawalbeh, Musab Al-Hamzat, Mu’taz Yousef Mahmoud, Thurayya Hayajneh, Yazan Shalan, Yussuf Abuelhaija. A department cannot have 8 heads; the role label looks like a template. Identities/photos exist, but the real role of each is unconfirmed. Not published on /team pending confirmation of each person’s actual role.',
  },
  {
    area: 'TEAM',
    item: 'Satellite team roles duplicated — held from publication.',
    note: 'Asmaa Hossam ("Satellite Head"), Rama Najjar ("Satellite Design Team Head"), Tala Momin ("Satellite Team"). Could be distinct sub-team leads or duplicated labels — needs confirmation of the single satellite head vs. members.',
  },
  {
    area: 'TEAM',
    item: 'Spacesuit team roles duplicated — held from publication.',
    note: 'Noor Mohammed ("Head of Spacesuit Design Team"), Rama BaniFawaz ("spacesuit head"), Mohamed Nour Yaseen ("spacesuit head"). Two identical "spacesuit head" labels — needs confirmation of the actual head vs. members.',
  },
  {
    area: 'TEAM',
    item: 'Second R&D head label + missing photos for two heads.',
    note: 'Ahmad Alrbaidi ("R&D head") duplicates Osaid Haimour’s R&D role AND has no photo in the folder. Hani Alajlouni ("Finance Team Head") folder also has no photo. Both unpublished until a role/photo is confirmed.',
  },
  {
    area: 'TEAM',
    item: 'Department mapping unconfirmed for 8 of the 11 published heads.',
    note: 'Mapped to existing DEPARTMENTS only where clear: Leen Albzour→dept-marketing, Osaid Haimour→dept-rd, Yazeed Edrees→dept-tech. Founder/CEO, Grants, Event Manager, Quality Control, Outreach & Partnerships, Rover, Habitat, and Energy have no clearly-matching department and are left unmapped.',
  },
  {
    area: 'TEAM',
    item: 'Homepage DEPARTMENTS leads are placeholder names, not reconciled with 2026 Heads.',
    note: 'src/data.ts still lists demo leads (e.g. "Dr. Raed Kawar", "Aya Al-Sakit"). Reconciling each department’s real 2026 head requires confirmed role→department mapping, so the homepage Team section was deliberately left unchanged in Phase 4.',
  },
  { area: 'TEAM', item: 'Team Head biographies not supplied (do not generate).' },
  { area: 'TEAM', item: 'Team Head external links / LinkedIn not supplied.' },
  { area: 'TEAM', item: 'Advisor official photos not yet mapped (HEADS 2026 contains no advisor assets).' },
  { area: 'TEAM', item: 'Full (non-head) department membership not supplied.' },
  { area: 'TEAM', item: 'Final department structure requires verification.' },

  // ── SPACE GAME ──────────────────────────────────────────────────────────────
  { area: 'SPACE_GAME', item: 'Date not supplied.' },
  { area: 'SPACE_GAME', item: 'Location not supplied.' },
  { area: 'SPACE_GAME', item: 'Final overview copy not supplied.' },
  { area: 'SPACE_GAME', item: 'Approved statistics not supplied.' },
  { area: 'SPACE_GAME', item: 'Winners not supplied.' },
  { area: 'SPACE_GAME', item: 'Winning categories not supplied.' },
  { area: 'SPACE_GAME', item: 'Gallery selections not supplied.' },
  { area: 'SPACE_GAME', item: 'Video / aftermovie not supplied.' },
  { area: 'SPACE_GAME', item: 'Partners not supplied.' },
  { area: 'SPACE_GAME', item: 'Sponsors not supplied.' },
  { area: 'SPACE_GAME', item: 'Impact statement not supplied.' },
  { area: 'SPACE_GAME', item: 'Impact statistics not supplied.' },

  // ── ACHIEVEMENTS ────────────────────────────────────────────────────────────
  { area: 'ACHIEVEMENTS', item: 'Actual achievement records still needed.' },
  { area: 'ACHIEVEMENTS', item: 'Dates not supplied.' },
  { area: 'ACHIEVEMENTS', item: 'Descriptions not supplied.' },
  { area: 'ACHIEVEMENTS', item: 'Categories not supplied.' },
  { area: 'ACHIEVEMENTS', item: 'Supporting media not supplied.' },

  // ── EVENTS ──────────────────────────────────────────────────────────────────
  { area: 'EVENTS', item: 'Final event list not supplied.' },
  { area: 'EVENTS', item: 'Event dates not supplied.' },
  { area: 'EVENTS', item: 'Event descriptions not supplied.' },
  { area: 'EVENTS', item: 'Event media not supplied.' },
  { area: 'EVENTS', item: 'Event impact not supplied.' },
  { area: 'EVENTS', item: 'Event relationships not supplied.' },

  // ── PARTNERS ────────────────────────────────────────────────────────────────
  { area: 'PARTNERS', item: 'Official partner list not supplied.' },
  { area: 'PARTNERS', item: 'Official sponsor list not supplied.' },
  { area: 'PARTNERS', item: 'Correct classification (partner vs sponsor) not supplied.' },
  { area: 'PARTNERS', item: 'Logo mappings not supplied.' },
  { area: 'PARTNERS', item: 'External URLs not supplied.' },
];

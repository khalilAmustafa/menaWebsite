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
  | 'PARTNERS'
  | 'ADVISORS'
  | 'ABOUT'
  | 'CONTACT'
  | 'PROGRAMS'
  | 'GALLERY'
  | 'SUPPORT'
  | 'ANALOG_MISSION'
  | 'ORG';

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
  {
    area: 'SPACE_GAME',
    item: 'Exact event date not supplied (year 2026 confirmed by folder name only).',
    note: 'The asset folder is "MENA Space Game Challenge 2026"; no day/month is legible in any asset. Hero shows a "2026" label from the folder/slug; no fabricated month/day.',
  },
  { area: 'SPACE_GAME', item: 'Location / venue not supplied.', note: 'Interior venue visible but no readable location text; not published.' },
  {
    area: 'SPACE_GAME',
    item: 'Full official overview / objectives copy not supplied.',
    note: 'PARTIALLY RESOLVED: the official welcome banner confirms the format — "48-Hour Space Gaming Hackathon · CREATE · BUILD · COMPETE" — now used in the About/summary. A fuller official overview and explicit objectives are still needed.',
  },
  { area: 'SPACE_GAME', item: 'Approved statistics/highlights not supplied.', note: 'No participant/team/country/project counts confirmed. Highlights grid omitted (no fabricated numbers).' },
  {
    area: 'SPACE_GAME',
    item: 'Winner identities not confirmed (team/person/project names, placements).',
    note: 'Award-ceremony recap images show checks with legible AWARD CATEGORIES/amounts ("1st Place Winner 500 JOD", "2nd Place Winner", "Best Storytelling Award 200 JOD", "In-Kind Training Award"), but NO team/person/project names are legible and none were inferred from faces. Winners section shows a restrained pending state. DECISION FOR USER: whether to publish the award categories (without names) and/or supply the actual winners.',
  },
  { area: 'SPACE_GAME', item: 'Winning team/project names not supplied.' },
  { area: 'SPACE_GAME', item: 'Gallery selections — RESOLVED.', note: 'Curated 11-image gallery + 1 hero imported from the official recap graphics into public/images/events/space-game-2026/. Alt text describes scenes only; no winner/identity claims.' },
  { area: 'SPACE_GAME', item: 'Video / aftermovie not supplied.', note: 'No video files in the asset folder; no external video link supplied. Field left ready (unused).' },
  {
    area: 'SPACE_GAME',
    item: 'Partner / sponsor list + classification not confirmed.',
    note: 'Organizations VISIBLE on the official event frame: MANZEL (Technologies) top-branding; bottom strip "ZINC — powered by Zain", "Supported by Unity, Autodesk", plus one Jordanian org (Arabic text, not legibly readable). Their ASSOCIATION with the event is documented, but exact partner-vs-sponsor CLASSIFICATION is not stated, so none are published as structured Partner records. Partners & Sponsors section shows a restrained pending state. DECISION FOR USER: confirm the list + each org’s classification (and whether to pull logos from the LOGOS/ folder).',
  },
  { area: 'SPACE_GAME', item: 'Impact statement / narrative not supplied.', note: 'Impact section shows a restrained pending state; no promotional outcome copy invented.' },
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
  {
    area: 'PARTNERS',
    item: 'Homepage Partners marquee HIDDEN (not deleted) pending verification.',
    note: 'The 8 partner entries in Partners.tsx (some plausibly real e.g. Hashemite University, Crown Prince Foundation; some invented e.g. Jordan Space Research Initiative, Eurasian Space Syndicate) used generic Lucide icons instead of real logos. Removed from public homepage rendering during the de-mock pass; component + data retained. Awaiting audit of the external LOGOS/ folder and confirmation of real relationships.',
  },

  // ── ADVISORS ────────────────────────────────────────────────────────────────
  {
    area: 'ADVISORS',
    item: 'Scientific Advisory Board cards REMOVED from public UI (still unverified).',
    note: 'The 4 previous advisors (Dr. Shelli R. Brunswick, Dr. Marc G. Hairapetian, Prof. Hanan Al-Huneidi, Dr. Benji Lawson) had unverified/invented names, organizations, bios, and Unsplash stock portraits. Section now shows only a restrained heading + placeholder. ADVISORS constant in src/data.ts retained but no longer rendered. Real advisor names/roles/orgs/bios/photos all still needed.',
  },

  // ── ABOUT ───────────────────────────────────────────────────────────────────
  {
    area: 'ABOUT',
    item: 'Impact statistics REMOVED from public UI (still unverified).',
    note: 'The 4 stat cards ("1st" Women-Led, "250+" STEM Alumni, "2" Analog Missions, "15+" International Advisors) were unverified. Removed from the About section; IMPACT_STATS constant retained in src/data.ts but no longer rendered. Real, authoritative figures still needed.',
  },
  {
    area: 'ABOUT',
    item: '"First Women-Led Space Organization in MENA" claim not verified.',
    note: 'Still displayed in the About heading as the org\'s stated identity (not a numeric stat card). Flagged for verification; not removed pending user confirmation of the claim.',
  },

  // ── CONTACT ─────────────────────────────────────────────────────────────────
  {
    area: 'CONTACT',
    item: 'Placeholder WhatsApp number and response-time claim REMOVED.',
    note: 'Removed wa.me/962770000000, "RESPONSE RATIO: UNDER 4 HOURS", and the "Amman headquarters" claim. Real WhatsApp/phone and any response-time commitment still needed before re-adding.',
  },
  {
    area: 'CONTACT',
    item: 'Contact email INFO@MENASPACE.ORG retained but UNVERIFIED.',
    note: 'Could not establish validity from repository/source material. Left visible per instructions (report rather than change). Confirm the real address.',
  },
  {
    area: 'CONTACT',
    item: 'Generic social links (linkedin.com / instagram.com) REMOVED from Contact panel.',
    note: 'These pointed at bare domains, not real MENA handles. Real handles still needed.',
  },

  // ── SUPPORT ─────────────────────────────────────────────────────────────────
  {
    area: 'SUPPORT',
    item: 'Support Tiers section HIDDEN from homepage + navigation (unverified).',
    note: 'The $25 / $100 / $500 tiers and their perks (Petra-1 casing inscription, ARAV-III mission patch, etc.) were unverified and donation-adjacent. Removed from public rendering and the Header nav; Donation.tsx + SUPPORT_TIERS retained for later restoration. Real amounts/perks/payment flow still needed.',
  },

  // ── PROGRAMS ────────────────────────────────────────────────────────────────
  {
    area: 'PROGRAMS',
    item: 'Program content unverified (text left unchanged this pass).',
    note: 'Program names/descriptions and stats (e.g. "1,200+ participants since 2022") are unverified. Kept as-is per instructions. Note: the picsum.photos bannerImage fields in ACTION_PROGRAMS (src/data.ts) are NOT rendered anywhere — dead placeholder data, safe to replace when real event imagery exists.',
  },

  // ── GALLERY ─────────────────────────────────────────────────────────────────
  {
    area: 'GALLERY',
    item: '3 Unsplash stock gallery items REMOVED; 5 local items remain.',
    note: 'Removed gal-6/7/8 (Unsplash). Remaining gal-1..gal-5 use local /images/mena_*.png renders (verify these are documentary, not illustrative). The now-empty "Basalt Landscapes" (scenery) filter was also removed. Real event/mission photos to be integrated in a later assets phase.',
  },

  // ── ANALOG MISSION ──────────────────────────────────────────────────────────
  {
    area: 'ANALOG_MISSION',
    item: 'Analog mission timeline left UNCHANGED but unverified.',
    note: 'ARAV-I/II/III names, dates (Nov 2024 / Mar 2025 / Oct 2026), detail bullets, and the "Rum Dome Alpha" / "Petra-1" specs (pressures, kW, km/h, payload) are unverified. Deliberately not rewritten — pending the external "MENA Analog Mission 2025" folder audit in the events phase.',
  },
  {
    area: 'ANALOG_MISSION',
    item: 'Telemetry Dashboard is an illustrative simulation (not real data).',
    note: 'DashboardInteractive shows demo values (SOL time, O₂/PV/uplink %, logs). During the de-mock pass its 3 crew rows were anonymized from fabricated person names to generic "Analog Crew 01/02/03" positions. If any of it should reflect real mission data, that data is still needed.',
  },

  // ── ORG ─────────────────────────────────────────────────────────────────────
  {
    area: 'ORG',
    item: 'Canonical organization name ambiguous.',
    note: 'Footer copyright reads "MENA SPACE & ANALOG ADVISORY" while the site title is "MENA Space Organization". Left unchanged pending confirmation of the official legal/brand name.',
  },
];

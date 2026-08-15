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
  | 'NASA'
  | 'SYSTEM'
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
  {
    area: 'PARTNERS',
    item: 'BLOCKER — the LOGOS folder contains NO third-party organization logos.',
    note: 'Phase 7 audited all 10 files in the external LOGOS folder. Every one is MENA-owned branding: 6 MENA master-logo variants (1–5, 7), 3 MENA Space Game Challenge event logos (logo.png, LogoMENA.GAME 3.png, IMG_20260420_191839_054), and the SYSTEM program patch ("S.Y.S.T.E.M — SPACE FOR YOUTH THROUGH STEM — BY MENA"). There is NO logo for MANZEL, Zain/ZINC, Unity, Autodesk, Orange Jordan, or the Jordanian ministry seen on event material. Therefore NO partner/sponsor records could be created, the homepage Partners section stays hidden, and the Space Game + NASA "Partners & Sponsors" pending states are unchanged. UNBLOCK BY SUPPLYING: each organization\'s logo file, its exact legal name, and its relationship type (partner / sponsor / supporter / technology / organizer / venue / government).',
  },
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
    note: 'The 4 previous advisors (Dr. Shelli R. Brunswick, Dr. Marc G. Hairapetian, Prof. Hanan Al-Huneidi, Dr. Benji Lawson) had unverified/invented names, organizations, bios, and Unsplash stock portraits. Section now shows only a restrained heading + placeholder. Phase 8: the ADVISORS constant and the AdvisorItem type were DELETED from src/data.ts / src/types.ts (they were dead but kept re-inviting reintroduction). Real advisor names/roles/orgs/bios/photos all still needed; recoverable from git history if ever wanted.',
  },

  // ── ABOUT ───────────────────────────────────────────────────────────────────
  {
    area: 'ABOUT',
    item: 'Impact statistics REMOVED from public UI (still unverified).',
    note: 'The 4 stat cards ("1st" Women-Led, "250+" STEM Alumni, "2" Analog Missions, "15+" International Advisors) were unverified. Removed from the About section; IMPACT_STATS constant retained in src/data.ts but no longer rendered. Real, authoritative figures still needed.',
  },
  {
    area: 'ABOUT',
    item: 'ENTIRE homepage About section DELETED — "women-led" claim still UNVERIFIED.',
    note: 'The About block (About.tsx) was removed wholesale, not rewritten: it asserted MENA is an "independent, high-standard space research powerhouse", "globally recognized" Wadi Rum geology, a quote about preparing humanity for "interstellar travel", and three pillar cards (Analog Simulations / Women-Led STEM Leadership / Youth Tech Incubator). NOTE CAREFULLY: removing it does NOT resolve anything — it only stops the site asserting unverified things. The "women-led" self-identification in particular is STILL UNCONFIRMED and has now been stripped from every public surface (About heading, footer strapline EN+AR, and the index.html description/og:description metadata). Do not reintroduce it anywhere — page copy, metadata, or social previews — until the organization confirms it. Also still needed: any officially approved About / mission / vision copy, since none exists and none may be invented.',
  },
  {
    area: 'ABOUT',
    item: 'Unverifiable "First" superlative SOFTENED in the About heading (section since deleted).',
    note: 'Phase 7: "The First Women-Led Space Organization in MENA" → "A Women-Led Space Organization in MENA" (EN + AR), removing the unverifiable "first"/"الأولى من نوعها" claim while keeping the org\'s women-led self-identification. Verify if any "first"/ranking claim can be officially substantiated before re-adding.',
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
    note: 'The $25 / $100 / $500 tiers were unverified and donation-adjacent — removed from public rendering and the Header nav in Phase 4.5. Donation.tsx + SUPPORT_TIERS architecture retained for later restoration. Phase 6.1: the 3 fabricated Analog perks (Petra-1 casing inscription, ARAV-III mission patch, ARAV-III commander badge) and the "Rum Dome Alpha" image caption were DELETED; the surrounding tiers remain valid (no replacement perks invented). Real amounts/perks/payment flow still needed before any restoration.',
  },

  // ── PROGRAMS ────────────────────────────────────────────────────────────────
  {
    area: 'PROGRAMS',
    item: 'Homepage "Programs" section rebuilt on confirmed data (Phase 7).',
    note: 'The four fabricated ACTION_PROGRAMS cards + their picsum banners and syllabus modals were DELETED (data.ts ACTION_PROGRAMS + the ProgramItem type). The homepage "Programs & Activities" section now previews only the confirmed ACTIVITIES (SYSTEM + ملتقى الصناع) and links to /activities. NASA Space Apps is represented under Events (not duplicated as a Program).',
  },
  {
    area: 'PROGRAMS',
    item: 'The Maker Collective — no evidence it is a real MENA program.',
    note: 'Verify: is "The Maker Collective" an actual MENA initiative, its official name, purpose, dates, and whether it relates to ملتقى الصناع (Makers Forum)? No repository evidence exists, so the fabricated card was removed. Do NOT assume it equals Makers Forum. Impact: no Programs card until confirmed.',
  },
  {
    area: 'PROGRAMS',
    item: 'Jordan Mars Rover Challenge — initiative unverified.',
    note: 'Verify: does MENA run a "Jordan Mars Rover Challenge"? Need official name, organizer, year, location, structure, and any rover/competition assets. No supporting assets exist, so the fabricated card was removed. Impact: no Programs card until confirmed.',
  },
  {
    area: 'PROGRAMS',
    item: 'SYSTEM program details still needed for a richer card.',
    note: 'Verify: official SYSTEM program description, curriculum scope, delivery locations/venue, participant profile, partners, outcomes, and photo-consent status. Confirmed so far: name "SYSTEM", tagline "Space for Youth Through STEM", the "BY MENA" attribution on the official logo, and period 2025–2026. Currently shown restrained on /activities (official program logo only — no added claims).',
  },

  // ── GALLERY ─────────────────────────────────────────────────────────────────
  {
    area: 'GALLERY',
    item: 'Homepage gallery now uses real Wadi Rum mission photos (RESOLVED).',
    note: 'Phase 6 replaced the Unsplash stock + the AI-render /images/mena_*.png items with 6 real photos from the Wadi Rum analog mission (metadata MENA-00-WR · 2025). The unused mena_*.png render files still sit in /public/images but are no longer referenced by any rendered component (IMAGES.engineering/eva unused; IMAGES.missionControl only in the unrendered Donation.tsx). They can be deleted in a later asset-cleanup pass.',
  },

  // ── ANALOG MISSION ──────────────────────────────────────────────────────────
  {
    area: 'ANALOG_MISSION',
    item: 'Fabricated ARAV / Rum Dome Alpha / Petra-1 content REMOVED.',
    note: 'The homepage Analog section previously rendered fabricated "ARAV-I/II/III" (with Nov 2024 / Mar 2025 / Oct 2026 dates), a "Rum Dome Alpha" habitat, a "Petra-1" rover, and invented specs (pressure/kW/km-h/payload). NONE appear in the official assets → removed from public rendering. The homepage now shows the CONFIRMED MENA Mars Analog Mission in Wadi Rum (2025) and links to /events/analog-mission-2025. Phase 6.1: the fabricated MISSION_PHASES / MISSION_KNOWLEDGE constants (and the MissionPhase type) were DELETED from src/data.ts and src/types.ts, and the residual ARAV/Petra-1/"Rum Dome Alpha" strings inside the retained SUPPORT_TIERS data + Donation.tsx were also purged. No reusable/data-layer fabricated Analog claims remain; only removal-history comments and these content-gap notes still mention the old terms.',
  },
  {
    area: 'ANALOG_MISSION',
    item: 'Analog mission — CONFIRMED vs still-missing.',
    note: 'CONFIRMED: name "MENA Mars Analog Mission in Wadi Rum" (patch code MENA-00-WR), Wadi Rum location, 2025 edition, and visible activities (spacesuit EVAs, dome habitat, field ops). MISSING: exact dates, crew names, official mission overview/objectives, any technical specs, partner/sponsor classification, impact metrics. A 27 MB MP4 exists in the folder (NOT imported — external hosting preferred); a HEIC and two 96×96 WhatsApp thumbnails were unusable and skipped.',
  },
  {
    area: 'ANALOG_MISSION',
    item: 'Telemetry Dashboard is an illustrative simulation (not real data).',
    note: 'DashboardInteractive shows demo values (SOL time, O₂/PV/uplink %, logs). Its 3 crew rows are generic "Analog Crew 01/02/03" positions (anonymized in Phase 4.5). If any should reflect real mission data, that data is still needed.',
  },

  // ── NASA SPACE APPS ─────────────────────────────────────────────────────────
  {
    area: 'NASA',
    item: 'NASA Space Apps — CONFIRMED vs still-missing.',
    note: 'CONFIRMED: identity (NASA Space Apps Challenge, "SPACE APPS" branding + MENA), Amman location (readable on official winner checks), and hackathon/award activity. MISSING: exact year/date (folder has no year), winner identities (team/person/project names — checks show 1st/2nd/3rd "Amman" but names not legible; never inferred from faces), and partner/sponsor classification (Zain and Orange Jordan appear — Orange as "Event Planning Partner" — but not published as structured records). Modeled as an Event (/events/nasa-space-apps), not duplicated as a Program.',
  },
  {
    area: 'NASA',
    item: "MENA's organizational ROLE at the Amman edition is unconfirmed.",
    note: 'Phase 6.2: the page previously stated "MENA hosted the Amman edition". The assets establish MENA branding and MENA presence at the event, but NOT whether MENA was the host / official Local Lead / co-organizer / partner / participating team. The claim was REMOVED (not softened into another guess); copy now says only that MENA "took part in" the event. Verify the exact role and restore precise wording.',
  },
  {
    area: 'NASA',
    item: 'Event DURATION unconfirmed.',
    note: 'Phase 6.2: "teams built solutions over an intensive weekend" was REMOVED. No asset establishes the length of the Amman edition. The global NASA Space Apps programme is generally a weekend hackathon, but that was outside-knowledge, not repository evidence, so it is not asserted. Supply the actual dates/duration.',
  },

  // ── SYSTEM (Program / Activity) ─────────────────────────────────────────────
  {
    area: 'SYSTEM',
    item: 'SYSTEM classified as a youth-STEM Program/Activity (not an event).',
    note: 'CONFIRMED from the official banner: "SYSTEM — Space for Youth Through STEM, 2025-2026". Published as an Activity on /activities using ONLY the branded (cartoon) banner. MISSING: official program description, curriculum, outcomes, partners.',
  },
  {
    area: 'SYSTEM',
    item: 'SYSTEM activity photos — NOW PUBLISHED with owner approval (was withheld for privacy).',
    note: 'The 7 SYSTEM photos show school-age participants doing STEM activities. Earlier phases withheld them pending a consent decision; the owner has now explicitly approved their use, so a curated 7 (1 hero + 6 gallery) are published on /activities/system. SAFEGUARDS APPLIED: alt text describes only the visible activity — no names, ages, school, team or outcome. Readable text visible in the photos was deliberately NOT transcribed into published copy (a school uniform crest identifying the school, and an instructor name patch), since naming minors or their school is personal information. NASA educational worksheets are visible on a table in two frames; this is NOT published as a NASA relationship. REMAINING OWNER RESPONSIBILITY: confirm that photo-release/consent is on file for the individuals shown — approval to publish was given, but the underlying consent status was not evidenced to me.',
  },

  // ── MAKERS FORUM (ملتقى الصناع) ──────────────────────────────────────────────
  {
    area: 'EVENTS',
    item: 'ملتقى الصناع (Makers Forum) — modeled as two Activities (2024 & 2025).',
    note: 'Filenames (2024.png, 2025.jpg) establish two separate occurrences; the 2025 backdrop reads "ملتقى الصناع 2025". Both now have detail pages (/activities/makers-forum-2024, /activities/makers-forum-2025) with the Arabic proper name preserved — "Makers Forum" is used only as an internal slug, never as a published English name, because no source provides one. RE-AUDITED: the folder contains exactly TWO files total, one per year, so each detail page is a single-image page with NO gallery (nothing was padded). The 2024 source is only 600×451 — low resolution, and no higher-resolution original exists. STILL MISSING: exact dates, location, descriptions, any second photograph for either year, and an official English name if one exists.',
  },

  // ── BRANDING / LOGOS ────────────────────────────────────────────────────────
  {
    area: 'ORG',
    item: 'Light-mode logo contrast — RESOLVED with the official light-background variant.',
    note: 'Phase 7: the header/footer mark is near-white (#f6f6f7) and was effectively invisible on the light-mode cream page. The official brand sheet (LOGOS/7.png) shows the white-on-dark and tan-on-light lock-ups side by side, confirming BOTH are sanctioned. The tan-on-light stacked variant (LOGOS/4.png, flat brand tan #DBB58F on a white plate) was imported as Mena-logo-light.png: the white plate was keyed to alpha and the mark colour left untouched — a variant swap, NOT a recolor. Framing matches Mena-logo-web.png exactly so the themes render identically.',
  },
  {
    area: 'ORG',
    item: 'Official logo source files (vector / transparent masters) not supplied.',
    note: 'Every MENA logo in LOGOS is a flat raster export (PNG, 2500×1875 or larger) with a baked-in solid background — no SVG, EPS, AI, or transparent master. The web assets are therefore derived from rasters. Request the vector masters for crisp scaling and clean per-theme variants.',
  },
  {
    area: 'ORG',
    item: 'Official assets available in LOGOS but deliberately NOT imported.',
    note: 'Left in the external folder rather than added to the repo, since placing them would require redesigning existing cards/heroes (out of scope this phase) and unused assets should not be imported: the MENA Space Game Challenge event logo (LOGOS/LogoMENA.GAME 3.png — 1024×1024, genuinely transparent) and the SYSTEM program patch (LOGOS/System Logo.png — 1563×1563, white plate). DECISION FOR USER: whether to add an event-logo slot to the Space Game page and/or swap the /activities SYSTEM card image from the cartoon banner to the official patch.',
  },

  // ── PHASE 8 — FINAL RELEASE QA ──────────────────────────────────────────────
  {
    area: 'ORG',
    item: 'Legacy fabricated datasets DELETED (anti-regression).',
    note: 'Phase 8 removed dead-but-present fabricated data so it can never be re-rendered by accident: IMPACT_STATS, ADVISORS + AdvisorItem, SUPPORT_TIERS + SupportTier and its only consumer Donation.tsx, the whole Partners.tsx component (which held invented orgs such as "Jordan Space Research Initiative", "Eurasian Space Syndicate", "International Analog Network"), and every narrative field on DEPARTMENTS (leadName/leadRole/teamSize/description/coreFocus — fake people such as "Dr. Raed Kawar", fake head counts). DEPARTMENTS now carries id + name + arabicName only, which is all getDepartmentName() renders. All recoverable from git history.',
  },
  {
    area: 'CONTACT',
    item: 'Contact form now hands off to the visitor\'s mail client — it has no backend.',
    note: 'Phase 8 BLOCKER FIX: the form previously sent nothing at all (handleSubmit only set a boolean) while displaying "TELEMETRY LINK SECURED!", claiming the message was synced to an Amman operations centre, promising a response time, and — in Arabic — naming a coordinator "م. العبادي" who appears in no source material. Every submission was silently discarded. It now opens a pre-filled mailto: to INFO@MENASPACE.ORG and says plainly that the message is not sent until the visitor sends it. STILL NEEDED: a real form backend (out of scope — no backend work permitted) and verification of the INFO@MENASPACE.ORG address itself.',
  },
  {
    area: 'ORG',
    item: 'Chatbot requires VITE_GEMINI_API_KEY; key is exposed client-side.',
    note: 'Phase 8: with no key configured every message failed with "please verify your internet connection", blaming the visitor for a missing-configuration problem. The assistant now states honestly that it is unavailable and points to email. SEPARATE PRE-EXISTING CONCERN FOR USER: the Gemini key is read via import.meta.env and called directly from the browser, so any key shipped this way is publicly readable in the bundle and can be extracted and billed to you. Fixing that properly needs a server-side proxy — deliberately NOT built here (no backend work permitted).',
  },
  {
    area: 'ORG',
    item: 'Per-route Open Graph previews not possible in this client-only SPA.',
    note: 'Phase 8 added baseline description/OG/Twitter tags to index.html plus runtime per-route title/description updates. Crawlers and social unfurlers that do not run JavaScript will only see the static index.html tags, so every shared link previews as the site-level card. Per-route previews would require pre-rendering or SSR — a build-architecture change, not a QA fix. og:image uses the official MENA logo; no share imagery was invented.',
  },

  // ── ORG ─────────────────────────────────────────────────────────────────────
  {
    area: 'ORG',
    item: 'Official long-form / legal organization name unconfirmed.',
    note: 'Phase 7: the footer legacy variant "MENA SPACE & ANALOG ADVISORY" was reconciled to the consistent public brand "MENA Space Organization" (matches the logo alt + routed pages). Remaining variants still in the repo: shorthand "MENA ORG" (About copy) and the Chatbot prompt\'s expansion "Middle East and North Africa Engineering Education and Training Organization" (backend/AI prompt — NOT touched this phase). Verify the official long-form/legal name and the intended acronym expansion, then standardize. Phase 7: the LOGOS audit did NOT resolve this — every official logo carries only the mark plus "مينا / MENA", with no long-form or legal name anywhere, so the current "MENA Space Organization" representation was left unchanged rather than guessed at.',
  },
];

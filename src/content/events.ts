import type { Event, EventJourneyStep, MediaItem } from './types';

/**
 * MENA Space Game Challenge journey — CONFIRMED stage names only (from the requirements).
 * Dates and descriptions were not supplied, so they are intentionally omitted.
 */
const SPACE_GAME_JOURNEY: EventJourneyStep[] = [
  { id: 'sgc-registration', title: { en: 'Registration' }, order: 1 },
  { id: 'sgc-training', title: { en: 'Training Sessions' }, order: 2 },
  { id: 'sgc-hackathon', title: { en: 'Hackathon' }, order: 3 },
  { id: 'sgc-final-presentations', title: { en: 'Final Presentations' }, order: 4 },
  { id: 'sgc-award-ceremony', title: { en: 'Award Ceremony' }, order: 5 },
];

/**
 * Curated event photography (Phase 5). Imported from the official "MENA Space Game Challenge
 * 2026" recap graphics. Alt text is deliberately generic: it describes the SCENE only and
 * never names a team, person, placement, or project (identities are not confirmed and were
 * never inferred from faces). Award-ceremony images document that an award ceremony took
 * place — they do NOT assert who won. Source: public/images/events/space-game-2026/.
 */
const SPACE_GAME_HERO: MediaItem = {
  id: 'sgc-hero',
  type: 'image',
  src: '/images/events/space-game-2026/space-game-hero.jpg',
  alt: { en: 'Participants at the MENA Space Game Challenge gaming hackathon' },
  width: 1080,
  height: 1350,
  category: 'hackathon',
};

const SPACE_GAME_GALLERY: MediaItem[] = [
  {
    id: 'sgc-group',
    type: 'image',
    src: '/images/events/space-game-2026/space-game-group.jpg',
    alt: { en: 'Group photo of participants and organizers at the MENA Space Game Challenge' },
    width: 1080,
    height: 1350,
    category: 'group',
  },
  {
    id: 'sgc-venue',
    type: 'image',
    src: '/images/events/space-game-2026/space-game-venue.jpg',
    alt: { en: 'MENA Space Game Challenge welcome banner at the event venue' },
    width: 1080,
    height: 1350,
    category: 'venue',
  },
  {
    id: 'sgc-speakers',
    type: 'image',
    src: '/images/events/space-game-2026/space-game-speakers.jpg',
    alt: { en: 'Speakers and organizers on stage at the MENA Space Game Challenge' },
    width: 1080,
    height: 1350,
    category: 'speakers',
  },
  {
    id: 'sgc-presentations',
    type: 'image',
    src: '/images/events/space-game-2026/space-game-presentations.jpg',
    alt: { en: 'Final presentations to a panel at the MENA Space Game Challenge' },
    width: 1080,
    height: 1350,
    category: 'presentations',
  },
  {
    id: 'sgc-hackathon-01',
    type: 'image',
    src: '/images/events/space-game-2026/space-game-hackathon-01.jpg',
    alt: { en: 'Participants collaborating with a mentor during the hackathon' },
    width: 1080,
    height: 1350,
    category: 'hackathon',
  },
  {
    id: 'sgc-hackathon-02',
    type: 'image',
    src: '/images/events/space-game-2026/space-game-hackathon-02.jpg',
    alt: { en: 'Participants working at laptops during the hackathon' },
    width: 1080,
    height: 1350,
    category: 'hackathon',
  },
  {
    id: 'sgc-hackathon-03',
    type: 'image',
    src: '/images/events/space-game-2026/space-game-hackathon-03.jpg',
    alt: { en: 'A participant developing a game during the hackathon' },
    width: 1080,
    height: 1350,
    category: 'hackathon',
  },
  {
    id: 'sgc-hackathon-04',
    type: 'image',
    src: '/images/events/space-game-2026/space-game-hackathon-04.jpg',
    alt: { en: 'Participants at their workstations during the hackathon' },
    width: 1080,
    height: 1350,
    category: 'hackathon',
  },
  {
    id: 'sgc-training-vr',
    type: 'image',
    src: '/images/events/space-game-2026/space-game-training-vr.jpg',
    alt: { en: 'A participant using a VR headset during a training session' },
    width: 1080,
    height: 1350,
    category: 'training',
  },
  {
    id: 'sgc-awards-01',
    type: 'image',
    src: '/images/events/space-game-2026/space-game-awards-01.jpg',
    alt: { en: 'Award ceremony at the MENA Space Game Challenge' },
    width: 1080,
    height: 1350,
    category: 'award-ceremony',
  },
  {
    id: 'sgc-awards-02',
    type: 'image',
    src: '/images/events/space-game-2026/space-game-awards-02.jpg',
    alt: { en: 'Award ceremony at the MENA Space Game Challenge' },
    width: 1080,
    height: 1350,
    category: 'award-ceremony',
  },
];

/**
 * MENA Space Game Challenge — confirmed content only.
 *
 * CONFIRMED (from the official recap graphics / asset folder):
 *  - Identity: "MENA Space Game Challenge" (folder confirms the 2026 edition).
 *  - Format: a 48-hour space gaming hackathon (from the official welcome banner:
 *    "48-HOUR SPACE GAMING HACKATHON · CREATE · BUILD · COMPETE").
 *  - Journey stage names (from the requirements).
 *  - Curated event photography (hero + gallery).
 *
 * STILL UNCONFIRMED → intentionally absent (see contentGaps.ts): exact date, location,
 * full official overview, statistics/highlights, winners (team/person/project names and
 * placements were NOT legible and are never inferred from faces), partner/sponsor list and
 * their classification, video/aftermovie, and event-impact metrics.
 */
export const SPACE_GAME_CHALLENGE: Event = {
  id: 'evt-space-game-challenge-2026',
  slug: 'space-game-challenge-2026',
  title: { en: 'MENA Space Game Challenge' },
  year: 2026,
  summary: { en: 'A 48-hour space gaming hackathon where participants create, build, and compete.' },
  hero: SPACE_GAME_HERO,
  highlights: [],
  journey: SPACE_GAME_JOURNEY,
  winners: [],
  gallery: SPACE_GAME_GALLERY,
  partnerIds: [],
  sponsorIds: [],
};

/* ────────────────────────────────────────────────────────────────────────────
 * MENA Mars Analog Mission — Wadi Rum (2025)
 *
 * CONFIRMED (from the official mission patch "MENA MARS ANALOG MISSIONS IN WADI RUM ·
 * MENA-00-WR" and the recap imagery): identity, mission code, Wadi Rum location, 2025
 * edition (folder name + WhatsApp asset dates 2025-10-09), and real activities visible in
 * the photos (spacesuit EVAs, a desert dome habitat, crew, field operations).
 *
 * This REPLACES the previously fabricated homepage "ARAV-I/II/III", "Rum Dome Alpha", and
 * "Petra-1" content — none of which appear anywhere in the official assets. Exact dates,
 * crew names, and any technical specifications remain unconfirmed → absent (see contentGaps).
 * ──────────────────────────────────────────────────────────────────────────── */
const ANALOG_HERO: MediaItem = {
  id: 'analog-hero',
  type: 'image',
  src: '/images/events/analog-mission-2025/analog-hero.jpg',
  alt: { en: 'An analog astronaut with a Jordanian flag in the Wadi Rum desert' },
  width: 1080,
  height: 1350,
  category: 'eva',
};

const ANALOG_GALLERY: MediaItem[] = [
  { id: 'analog-crew', type: 'image', src: '/images/events/analog-mission-2025/analog-crew.jpg', alt: { en: 'Analog mission crew in the Wadi Rum desert' }, width: 1080, height: 1350, category: 'crew' },
  { id: 'analog-group', type: 'image', src: '/images/events/analog-mission-2025/analog-group.jpg', alt: { en: 'Mission participants gathered in the Wadi Rum desert' }, width: 1080, height: 1350, category: 'group' },
  { id: 'analog-eva-flag', type: 'image', src: '/images/events/analog-mission-2025/analog-eva-flag.jpg', alt: { en: 'An analog astronaut walking with a Jordanian flag in the desert' }, width: 1080, height: 1350, category: 'eva' },
  { id: 'analog-habitat-certificates', type: 'image', src: '/images/events/analog-mission-2025/analog-habitat-certificates.jpg', alt: { en: 'Participants with certificates in front of the desert dome habitat' }, width: 1080, height: 1350, category: 'habitat' },
  { id: 'analog-presentation', type: 'image', src: '/images/events/analog-mission-2025/analog-presentation.jpg', alt: { en: 'A presentation during the analog mission' }, width: 1080, height: 1350, category: 'presentation' },
  { id: 'analog-habitat-group', type: 'image', src: '/images/events/analog-mission-2025/analog-habitat-group.jpg', alt: { en: 'Participants in front of the analog dome habitat in Wadi Rum' }, width: 1080, height: 1350, category: 'habitat' },
  { id: 'analog-eva-dusk', type: 'image', src: '/images/events/analog-mission-2025/analog-eva-dusk.jpg', alt: { en: 'Analog astronauts in spacesuits at dusk in the desert' }, width: 1080, height: 1350, category: 'eva' },
  { id: 'analog-habitat-interior', type: 'image', src: '/images/events/analog-mission-2025/analog-habitat-interior.jpg', alt: { en: 'Interior of the analog mission habitat' }, width: 1080, height: 1350, category: 'habitat' },
  { id: 'analog-mockup', type: 'image', src: '/images/events/analog-mission-2025/analog-mockup.jpg', alt: { en: 'A participant presenting near mission equipment' }, width: 1080, height: 1350, category: 'presentation' },
  { id: 'analog-mission-control', type: 'image', src: '/images/events/analog-mission-2025/analog-mission-control.jpg', alt: { en: 'Participants working during the analog mission' }, width: 1080, height: 1350, category: 'operations' },
];

export const ANALOG_MISSION_2025: Event = {
  id: 'evt-analog-mission-2025',
  slug: 'analog-mission-2025',
  title: { en: 'MENA Mars Analog Mission — Wadi Rum' },
  year: 2025,
  location: { en: 'Wadi Rum, Jordan' },
  summary: {
    en: 'An analog Mars mission in the Wadi Rum desert, where a crew carried out spacesuit EVAs, habitat operations, and field activities in Mars-like terrain.',
  },
  hero: ANALOG_HERO,
  highlights: [],
  winners: [],
  gallery: ANALOG_GALLERY,
  partnerIds: [],
  sponsorIds: [],
};

/* ────────────────────────────────────────────────────────────────────────────
 * NASA Space Apps Challenge — MENA (Amman edition)
 *
 * CONFIRMED (from the official recap graphics: "SPACE APPS" branding + MENA, winner checks
 * reading "…Place Winner · Amman", and an on-stage "Event Planning Partner" backdrop):
 * identity as the NASA Space Apps Challenge hosted in Amman, and real hackathon activity
 * (teams working, a VR demo, a speaker, an award ceremony). Exact date/year, winner
 * identities, and partner/sponsor classification are NOT confirmed → absent (see contentGaps).
 * ──────────────────────────────────────────────────────────────────────────── */
const NASA_HERO: MediaItem = {
  id: 'nasa-hero',
  type: 'image',
  src: '/images/events/nasa-space-apps/nasa-hero.jpg',
  alt: { en: 'Group photo on stage at the NASA Space Apps Challenge in Amman' },
  width: 1600,
  height: 1067,
  category: 'group',
};

const NASA_GALLERY: MediaItem[] = [
  { id: 'nasa-group', type: 'image', src: '/images/events/nasa-space-apps/nasa-group.jpg', alt: { en: 'Participants and organizers at the NASA Space Apps Challenge' }, width: 1080, height: 1350, category: 'group' },
  { id: 'nasa-awards-01', type: 'image', src: '/images/events/nasa-space-apps/nasa-awards-01.jpg', alt: { en: 'Award ceremony at the NASA Space Apps Challenge' }, width: 1080, height: 1350, category: 'award-ceremony' },
  { id: 'nasa-awards-02', type: 'image', src: '/images/events/nasa-space-apps/nasa-awards-02.jpg', alt: { en: 'Award ceremony at the NASA Space Apps Challenge' }, width: 1080, height: 1350, category: 'award-ceremony' },
  { id: 'nasa-vr', type: 'image', src: '/images/events/nasa-space-apps/nasa-vr.jpg', alt: { en: 'A participant using a VR headset at the hackathon' }, width: 1080, height: 1350, category: 'hackathon' },
  { id: 'nasa-hackathon-01', type: 'image', src: '/images/events/nasa-space-apps/nasa-hackathon-01.jpg', alt: { en: 'Teams working during the NASA Space Apps hackathon' }, width: 1080, height: 1350, category: 'hackathon' },
  { id: 'nasa-speaker', type: 'image', src: '/images/events/nasa-space-apps/nasa-speaker.jpg', alt: { en: 'A speaker presenting at the NASA Space Apps Challenge' }, width: 1080, height: 1350, category: 'speakers' },
  { id: 'nasa-hackathon-02', type: 'image', src: '/images/events/nasa-space-apps/nasa-hackathon-02.jpg', alt: { en: 'Participants collaborating during the hackathon' }, width: 1080, height: 1350, category: 'hackathon' },
  { id: 'nasa-hackathon-03', type: 'image', src: '/images/events/nasa-space-apps/nasa-hackathon-03.jpg', alt: { en: 'Participants working at laptops during the hackathon' }, width: 1080, height: 1350, category: 'hackathon' },
];

export const NASA_SPACE_APPS: Event = {
  id: 'evt-nasa-space-apps',
  slug: 'nasa-space-apps',
  title: { en: 'NASA Space Apps Challenge — Amman' },
  location: { en: 'Amman, Jordan' },
  summary: {
    en: "The global NASA Space Apps Challenge hackathon, hosted in Amman — teams build solutions over an intensive weekend, ending in an award ceremony.",
  },
  hero: NASA_HERO,
  highlights: [],
  winners: [],
  gallery: NASA_GALLERY,
  partnerIds: [],
  sponsorIds: [],
};

/** All confirmed events (ordered newest-intent first for the /events grid). */
export const EVENTS: Event[] = [SPACE_GAME_CHALLENGE, ANALOG_MISSION_2025, NASA_SPACE_APPS];

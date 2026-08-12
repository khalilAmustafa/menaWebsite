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
  summary: { en: 'A 48-hour space gaming hackathon where participants create, build, and compete.' },
  hero: SPACE_GAME_HERO,
  highlights: [],
  journey: SPACE_GAME_JOURNEY,
  winners: [],
  gallery: SPACE_GAME_GALLERY,
  partnerIds: [],
  sponsorIds: [],
};

/** All events. Only the confirmed-identity Space Game record for now (no unverified events). */
export const EVENTS: Event[] = [SPACE_GAME_CHALLENGE];

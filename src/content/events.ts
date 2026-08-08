import type { Event, EventJourneyStep } from './types';

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
 * MENA Space Game Challenge — confirmed identity + journey stage names only.
 * Everything else (date, location, overview, statistics, winners, gallery, partners,
 * sponsors, impact) is unconfirmed and left empty/absent — see `contentGaps.ts`.
 * The slug matches the Phase 1 route `/events/space-game-challenge-2026`.
 */
export const SPACE_GAME_CHALLENGE: Event = {
  id: 'evt-space-game-challenge-2026',
  slug: 'space-game-challenge-2026',
  title: { en: 'MENA Space Game Challenge' },
  highlights: [],
  journey: SPACE_GAME_JOURNEY,
  winners: [],
  gallery: [],
  partnerIds: [],
  sponsorIds: [],
};

/** All events. Only the confirmed-identity Space Game record for now (no unverified events). */
export const EVENTS: Event[] = [SPACE_GAME_CHALLENGE];

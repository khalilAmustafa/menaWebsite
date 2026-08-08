/**
 * Barrel export for the content layer. Future pages import content + types from `@/src/content`
 * (or a relative path) rather than reaching into individual files.
 */

// Types
export * from './types';
export type { ContentArea, ContentGap } from './contentGaps';

// Collections + values
export { RESEARCH_PAPERS, IAC_2026 } from './researchPapers';
export { ACHIEVEMENTS } from './achievements';
export { EVENTS, SPACE_GAME_CHALLENGE } from './events';
export { TEAM_MEMBERS } from './team';
export { PARTNERS } from './partners';
export { CONTENT_GAPS } from './contentGaps';

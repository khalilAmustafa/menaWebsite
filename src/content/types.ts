/**
 * Shared content types for the scalable content layer (Phase 2 — data architecture only).
 *
 * These are intentionally kept separate from `src/types.ts` (which holds the existing
 * homepage types) so the working homepage stays untouched. Anything that is not yet
 * confirmed/supplied is modeled as an OPTIONAL field and left absent — never faked.
 */

/** Bilingual text. `ar` is optional and left absent when Arabic copy has not been supplied. */
export interface LocalizedText {
  en: string;
  ar?: string;
}

export type ExternalLinkType =
  | 'publication'
  | 'doi'
  | 'website'
  | 'linkedin'
  | 'video'
  | 'registration'
  | 'other';

export interface ExternalLink {
  label: string;
  url: string;
  type?: ExternalLinkType;
}

/** A single image/video asset. This is the model only — no records are created in Phase 2. */
export interface MediaItem {
  id: string;
  type: 'image' | 'video';
  src: string;
  alt: LocalizedText;
  caption?: LocalizedText;
  thumbnail?: string;
  width?: number;
  height?: number;
  credit?: string;
  category?: string;
}

/**
 * A research-paper author. `teamMemberId` links to a TeamMember once a confirmed mapping
 * exists — none are confirmed yet, so authors currently store the name only.
 */
export interface ResearchAuthor {
  name: string;
  teamMemberId?: string;
}

export interface ConferenceInfo {
  name: string;
  edition?: string;
  location?: string;
  year?: number;
}

export interface ResearchPaper {
  id: string;
  slug: string;
  title: LocalizedText;
  authors: ResearchAuthor[];
  conference?: ConferenceInfo;
  year?: number;
  abstract?: LocalizedText;
  category?: string;
  publicationStatus?: string;
  gallery?: MediaItem[];
  relatedTeamMemberIds?: string[];
  externalLinks?: ExternalLink[];
}

export interface Achievement {
  id: string;
  slug: string;
  title: LocalizedText;
  description?: LocalizedText;
  date?: string;
  year?: number;
  category?: string;
  media?: MediaItem[];
  relatedResearchPaperIds?: string[];
  relatedEventIds?: string[];
  relatedTeamMemberIds?: string[];
  externalLinks?: ExternalLink[];
  featured?: boolean;
}

export interface EventHighlight {
  id: string;
  label: LocalizedText;
  value: string;
  description?: LocalizedText;
}

export interface EventJourneyStep {
  id: string;
  title: LocalizedText;
  description?: LocalizedText;
  date?: string;
  order: number;
}

export interface EventWinner {
  id: string;
  teamName: string;
  award?: LocalizedText;
  placement?: string;
  projectName?: LocalizedText;
  description?: LocalizedText;
  teamMembers?: string[];
  image?: MediaItem;
  externalLinks?: ExternalLink[];
}

export interface Event {
  id: string;
  slug: string;
  title: LocalizedText;
  summary?: LocalizedText;
  description?: LocalizedText;
  /** Confirmed calendar year, when known (e.g. from an official folder/banner). */
  year?: number;
  startDate?: string;
  endDate?: string;
  location?: LocalizedText;
  hero?: MediaItem;
  highlights?: EventHighlight[];
  journey?: EventJourneyStep[];
  winners?: EventWinner[];
  gallery?: MediaItem[];
  partnerIds?: string[];
  sponsorIds?: string[];
  impact?: LocalizedText;
  externalLinks?: ExternalLink[];
  status?: string;
}

export interface Partner {
  id: string;
  name: string;
  type: 'partner' | 'sponsor';
  logo?: MediaItem;
  website?: string;
  description?: LocalizedText;
  eventIds?: string[];
  featured?: boolean;
  order?: number;
}

/**
 * A recurring educational activity or program (distinct from a one-off Event). Used for
 * things like the SYSTEM youth-STEM program and the ملتقى الصناع (Makers Forum) gatherings.
 * Only confirmed fields are populated; unknowns stay absent.
 */
export interface Activity {
  id: string;
  slug: string;
  title: LocalizedText;
  summary?: LocalizedText;
  /** A confirmed period label (e.g. "2025–2026") or a single year, when known. */
  period?: string;
  year?: number;
  image?: MediaItem;
  externalLinks?: ExternalLink[];
  order?: number;
}

export interface TeamMember {
  id: string;
  slug: string;
  fullName: string;
  role?: LocalizedText;
  departmentId?: string;
  photo?: MediaItem;
  biography?: LocalizedText;
  externalLinks?: ExternalLink[];
  researchPaperIds?: string[];
  achievementIds?: string[];
  isHead?: boolean;
  order?: number;
}

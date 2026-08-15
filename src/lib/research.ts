import { RESEARCH_PAPERS } from '../content/researchPapers';
import type { ResearchPaper } from '../content/types';

/**
 * Resolve a research paper by its stable slug from the centralized Phase 2 collection.
 * Returns undefined when no paper matches (callers render a not-found state).
 */
export function getResearchPaperBySlug(slug: string): ResearchPaper | undefined {
  return RESEARCH_PAPERS.find((paper) => paper.slug === slug);
}

import { ACTIVITIES } from '../content/activities';
import type { Activity } from '../content/types';

/** Look up a single activity by its URL slug. Returns undefined for unknown slugs. */
export function getActivityBySlug(slug?: string): Activity | undefined {
  if (!slug) return undefined;
  return ACTIVITIES.find((a) => a.slug === slug);
}

/** Activities in display order, used by the listing page and the homepage preview. */
export function getActivities(): Activity[] {
  return [...ACTIVITIES].sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

import { EVENTS } from '../content/events';
import type { Event } from '../content/types';

/** Resolve an Event by its explicit, stable slug. Keeps the content data pristine. */
export function getEventBySlug(slug: string): Event | undefined {
  return EVENTS.find((event) => event.slug === slug);
}

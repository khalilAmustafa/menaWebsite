import { TEAM_MEMBERS } from '../content/team';
import type { TeamMember } from '../content/types';
import { DEPARTMENTS } from '../data';

/** Resolve a TeamMember by its explicit, stable slug. Keeps the content data pristine. */
export function getTeamMemberBySlug(slug: string): TeamMember | undefined {
  return TEAM_MEMBERS.find((member) => member.slug === slug);
}

/**
 * Look up an existing department's display name (EN + AR) from the homepage `DEPARTMENTS`
 * source of truth. Returns undefined when the member has no confirmed department mapping,
 * so the UI can simply omit the department line rather than showing a guessed one.
 */
export function getDepartmentName(
  departmentId?: string,
): { en: string; ar: string } | undefined {
  if (!departmentId) return undefined;
  const dept = DEPARTMENTS.find((d) => d.id === departmentId);
  if (!dept) return undefined;
  return { en: dept.name, ar: dept.arabicName };
}

/** Team Heads in their explicit display order. */
export function getTeamHeads(): TeamMember[] {
  return [...TEAM_MEMBERS]
    .filter((member) => member.isHead)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

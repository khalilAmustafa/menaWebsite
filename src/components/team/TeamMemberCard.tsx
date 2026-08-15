import { Link } from 'react-router-dom';
import type { TeamMember } from '../../content/types';
import { getDepartmentName } from '../../lib/team';

interface TeamMemberCardProps {
  member: TeamMember;
  isArabic?: boolean;
  // Declared to match this project's existing convention (see ScrollReveal) where `key`
  // must be allowed explicitly on custom components under its React/TS setup.
  key?: string | number;
}

/**
 * Profile card for a Team Head. The whole card links to `/team/{slug}`. Uses a consistent
 * 4:5 portrait frame (object-cover) so mixed source photos crop uniformly, and matches the
 * existing MENA card language (rounded-2xl panel, subtle border + hover). Name and role are
 * real HTML text — the photo is never required to identify the person. Light/dark come from
 * the shared theme tokens.
 */
export default function TeamMemberCard({ member, isArabic = false }: TeamMemberCardProps) {
  const role = member.role ? (isArabic && member.role.ar ? member.role.ar : member.role.en) : '';
  const dept = getDepartmentName(member.departmentId);
  const alt = member.photo
    ? isArabic && member.photo.alt.ar
      ? member.photo.alt.ar
      : member.photo.alt.en
    : member.fullName;

  return (
    <Link
      to={`/team/${member.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-900/80 bg-neutral-900/25 shadow-xl transition-all duration-300 hover:border-brand-teal/40 hover:bg-neutral-900/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/50"
    >
      <div className="aspect-[4/5] w-full overflow-hidden bg-neutral-900">
        {member.photo ? (
          <img
            src={member.photo.src}
            alt={alt}
            loading="lazy"
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-display text-3xl font-bold text-neutral-700">
            {member.fullName.charAt(0)}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 p-5">
        <h3 className="font-display text-base font-bold leading-tight tracking-tight text-white transition-colors group-hover:text-brand-teal">
          {member.fullName}
        </h3>
        {role && <p className="font-sans text-xs leading-relaxed text-neutral-400">{role}</p>}
        {dept && (
          <p className="mt-auto pt-2 font-mono text-[10px] uppercase tracking-wider text-neutral-500">
            {isArabic ? dept.ar : dept.en}
          </p>
        )}
      </div>
    </Link>
  );
}

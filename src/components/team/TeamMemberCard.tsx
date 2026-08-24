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
  const name = isArabic && member.fullNameAr ? member.fullNameAr : member.fullName;
  const role = member.role ? (isArabic && member.role.ar ? member.role.ar : member.role.en) : '';
  const dept = getDepartmentName(member.departmentId);
  const alt = member.photo
    ? isArabic && member.photo.alt.ar
      ? member.photo.alt.ar
      : member.photo.alt.en
    : name;
  const isRaedKhalil = member.slug === 'raed-khalil';

  return (
    <Link
      to={`/team/${member.slug}`}
      className="team-card group flex h-full flex-col overflow-hidden border transition-[background-color,border-color,color,transform] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/50"
    >
      <div className="aspect-[4/5] w-full overflow-hidden bg-[var(--page-surface-raised)]">
        {member.photo ? (
          <img
            src={member.photo.src}
            alt={alt}
            width={member.photo.width}
            height={member.photo.height}
            loading="lazy"
            className={`h-full w-full object-cover transition-transform duration-500 ${
              isRaedKhalil
                ? 'origin-[50%_18%] scale-[1.06] object-[50%_18%] group-hover:scale-[1.09]'
                : 'object-top group-hover:scale-[1.04]'
            }`}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-display text-3xl font-bold text-neutral-700">
            {name.charAt(0)}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 p-5">
        <h3 className="font-display text-xl font-semibold uppercase leading-none tracking-tight text-[var(--page-ink)] transition-colors group-hover:text-brand-teal">
          {name}
        </h3>
        {role && <p className="font-sans text-xs leading-relaxed text-[var(--page-muted)]">{role}</p>}
        {dept && (
          <p className="mt-auto pt-2 font-mono text-[10px] uppercase tracking-wider text-[var(--page-subtle)]">
            {isArabic ? dept.ar : dept.en}
          </p>
        )}
      </div>
    </Link>
  );
}

import { Link, useParams } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import Breadcrumbs from '../components/Breadcrumbs';
import ScrollReveal from '../components/ScrollReveal';
import TeamMemberCard from '../components/team/TeamMemberCard';
import { useSiteContext } from '../components/SiteLayout';
import { useDocumentTitle } from '../lib/useDocumentTitle';
import { TEAM_MEMBERS } from '../content/team';
import { getTeamMemberBySlug, getDepartmentName } from '../lib/team';

export default function TeamMemberPage() {
  const { slug } = useParams();
  const { isArabic } = useSiteContext();
  const member = slug ? getTeamMemberBySlug(slug) : undefined;

  useDocumentTitle(member ? `${member.fullName} | MENA` : 'Team member not found | MENA');

  // ── Team-specific not-found state (stays inside SiteLayout, never redirects) ──────────
  if (!member) {
    return (
      <PageContainer className="flex min-h-[60vh] flex-col items-center justify-center pt-32 pb-20 text-center">
        <span className="mb-3 block font-mono text-xs font-bold uppercase tracking-widest text-brand-teal">
          404
        </span>
        <h1 className="font-display text-3xl font-medium uppercase tracking-tight text-white sm:text-4xl">
          {isArabic ? 'عضو الفريق غير موجود' : 'Team member not found'}
        </h1>
        <p className="mb-8 mt-4 max-w-md font-sans text-sm text-neutral-400">
          {isArabic
            ? 'المسار المطلوب لا يطابق أي عضو في الفريق.'
            : "We couldn't find a team member at this address."}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 font-mono text-[11px] uppercase tracking-widest">
          <Link
            to="/team"
            className="rounded text-brand-teal transition-colors hover:text-brand-teal-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/50"
          >
            {isArabic ? 'العودة إلى الفريق' : 'Back to Team'}
          </Link>
          <span aria-hidden="true" className="text-neutral-600">
            /
          </span>
          <Link
            to="/"
            className="rounded text-brand-teal transition-colors hover:text-brand-teal-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/50"
          >
            {isArabic ? 'الرئيسية' : 'Home'}
          </Link>
        </div>
      </PageContainer>
    );
  }

  const role = member.role ? (isArabic && member.role.ar ? member.role.ar : member.role.en) : '';
  const dept = getDepartmentName(member.departmentId);
  const alt = member.photo
    ? isArabic && member.photo.alt.ar
      ? member.photo.alt.ar
      : member.photo.alt.en
    : member.fullName;
  const more = TEAM_MEMBERS.filter((m) => m.id !== member.id)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .slice(0, 4);

  return (
    <PageContainer className="pt-32 pb-20">
      <Breadcrumbs
        items={[
          { label: isArabic ? 'الفريق' : 'Team', to: '/team' },
          { label: member.fullName },
        ]}
      />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* Portrait */}
        <ScrollReveal variant="clip" className="md:col-span-1">
          <div className="aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl border border-neutral-900/80 bg-neutral-900">
            {member.photo ? (
              <img src={member.photo.src} alt={alt} className="h-full w-full object-cover object-top" />
            ) : (
              <div className="flex h-full w-full items-center justify-center font-display text-5xl font-bold text-neutral-700">
                {member.fullName.charAt(0)}
              </div>
            )}
          </div>
        </ScrollReveal>

        {/* Identity (a <div>, not <header>, so the nav remains the only banner landmark) */}
        <div className="md:col-span-2">
          <span className="mb-3 block font-mono text-xs font-bold uppercase tracking-widest text-brand-teal">
            {isArabic ? 'الفريق' : 'TEAM'}
          </span>
          <h1 className="font-display text-3xl font-medium leading-tight tracking-tight text-white sm:text-4xl">
            {member.fullName}
          </h1>
          {role && <p className="mt-4 font-sans text-base text-neutral-300">{role}</p>}
          {dept && (
            <p className="mt-2 font-mono text-[11px] uppercase tracking-wider text-neutral-500">
              {isArabic ? dept.ar : dept.en}
            </p>
          )}
        </div>
      </div>

      {/* More of the team (real members only; current excluded) */}
      {more.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 font-display text-xl font-medium uppercase tracking-tight text-white">
            {isArabic ? 'المزيد من الفريق' : 'More of the Team'}
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {more.map((m) => (
              <TeamMemberCard key={m.id} member={m} isArabic={isArabic} />
            ))}
          </div>
        </section>
      )}
    </PageContainer>
  );
}

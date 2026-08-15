import { Link } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import PageHeader from '../components/PageHeader';
import ScrollReveal from '../components/ScrollReveal';
import TeamMemberCard from '../components/team/TeamMemberCard';
import { useSiteContext } from '../components/SiteLayout';
import { useDocumentTitle } from '../lib/useDocumentTitle';
import { getTeamHeads } from '../lib/team';

/**
 * Real /team page. Shows the confirmed 2026 Team Heads (from the content layer), then links
 * out to the existing homepage Departments section and the Scientific Advisory Board. No full
 * membership lists are invented — only confirmed heads are shown.
 */
export default function TeamPage() {
  const { isArabic } = useSiteContext();
  useDocumentTitle('Team | MENA');

  const heads = getTeamHeads();

  return (
    <PageContainer className="pt-32 pb-20">
      <ScrollReveal variant="clip">
        <PageHeader
          eyebrow={isArabic ? 'الفريق' : 'TEAM'}
          title={isArabic ? 'فريقنا' : 'Our Team'}
          description={
            isArabic
              ? 'تعرّف على قادة فرق مؤسسة مِنا للفضاء. يقود رؤساء الأقسام عمل المنظمة في البحث والهندسة والعمليات والتوعية.'
              : "Meet the people leading MENA Space Organization's teams. Our department heads guide the organization's research, engineering, operations, and outreach."
          }
        />
      </ScrollReveal>

      {/* Team Heads / Leadership */}
      <section className="mt-2">
        <h2 className="mb-8 font-display text-xl font-medium uppercase tracking-tight text-white sm:text-2xl">
          {isArabic ? 'رؤساء الفرق' : 'Team Heads'}
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {heads.map((member) => (
            <TeamMemberCard key={member.id} member={member} isArabic={isArabic} />
          ))}
        </div>
      </section>

      {/* Departments + Advisory Board pointers (existing homepage sections) */}
      <section className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-neutral-900/80 bg-neutral-900/20 p-6">
          <h2 className="mb-2 font-display text-lg font-bold uppercase tracking-tight text-white">
            {isArabic ? 'الأقسام' : 'Departments'}
          </h2>
          <p className="mb-4 font-sans text-sm leading-relaxed text-neutral-400">
            {isArabic
              ? 'استكشف أقسام المنظمة ومجالات عملها على الصفحة الرئيسية.'
              : "Explore the organization's departments and their focus areas on the homepage."}
          </p>
          <Link
            to="/#teams"
            className="inline-block rounded font-mono text-[11px] uppercase tracking-widest text-brand-teal transition-colors hover:text-brand-teal-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/50"
          >
            {isArabic ? 'عرض الأقسام ←' : 'View departments →'}
          </Link>
        </div>
        <div className="rounded-2xl border border-neutral-900/80 bg-neutral-900/20 p-6">
          <h2 className="mb-2 font-display text-lg font-bold uppercase tracking-tight text-white">
            {isArabic ? 'الهيئة الاستشارية العلمية' : 'Scientific Advisory Board'}
          </h2>
          {/*
            Phase 8: this invited visitors to "meet the advisors on the homepage" and linked to
            /#advisors — but that section has held no advisor content since the Phase 4.5 de-mock
            removed the four fabricated advisors. The promise and the link were both empty, so
            the card now states the honest position instead of sending people to a blank anchor.
          */}
          <p className="font-sans text-sm leading-relaxed text-neutral-400">
            {isArabic
              ? 'لم تُنشر بعد أسماء أعضاء الهيئة الاستشارية العلمية. سيتم إضافتها فور تأكيدها.'
              : 'The scientific advisory board members have not been published yet. They will be added once confirmed.'}
          </p>
        </div>
      </section>
    </PageContainer>
  );
}

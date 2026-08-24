import PageContainer from '../components/PageContainer';
import PageHeader from '../components/PageHeader';
import ScrollReveal from '../components/ScrollReveal';
import TeamMemberCard from '../components/team/TeamMemberCard';
import { useSiteContext } from '../components/SiteLayout';
import { useDocumentTitle } from '../lib/useDocumentTitle';
import { getTeamHeads } from '../lib/team';

/**
 * Real /team page. Shows confirmed 2026 Team Heads only. No full membership lists are
 * invented and the scientific advisory record remains explicitly pending confirmation.
 */
export default function TeamPage() {
  const { isArabic } = useSiteContext();
  useDocumentTitle(isArabic ? 'فريقنا | مِنا' : 'Team | MENA');

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
        <h2 className="mb-8 font-display text-3xl font-semibold uppercase tracking-tight text-[var(--page-ink)] sm:text-4xl">
          {isArabic ? 'رؤساء الفرق' : 'Team Heads'}
        </h2>
        <div className="team-roster">
          {heads.map((member) => (
            <TeamMemberCard key={member.id} member={member} isArabic={isArabic} />
          ))}
        </div>
      </section>

      <section className="pending-record mt-20">
        <h2 className="font-display text-3xl font-semibold uppercase text-[var(--page-ink)] sm:text-4xl">{isArabic ? 'الهيئة الاستشارية العلمية' : 'Scientific Advisory Board'}</h2>
        <p>{isArabic ? 'لم تُنشر أسماء أعضاء الهيئة الاستشارية العلمية بعد. ستُضاف بعد تأكيد المعلومات الرسمية.' : 'Scientific Advisory Board members have not been published yet. They will be added after their official information is confirmed.'}</p>
      </section>
    </PageContainer>
  );
}

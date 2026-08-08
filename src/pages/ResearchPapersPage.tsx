import PageContainer from '../components/PageContainer';
import PageHeader from '../components/PageHeader';
import Breadcrumbs from '../components/Breadcrumbs';
import ScrollReveal from '../components/ScrollReveal';
import ResearchCard from '../components/research/ResearchCard';
import { useSiteContext } from '../components/SiteLayout';
import { useDocumentTitle } from '../lib/useDocumentTitle';
import { RESEARCH_PAPERS } from '../content/researchPapers';

export default function ResearchPapersPage() {
  const { isArabic } = useSiteContext();
  useDocumentTitle('Research Papers | MENA');

  const count = RESEARCH_PAPERS.length; // derived from real data, never hardcoded

  return (
    <PageContainer className="pt-32 pb-20">
      <Breadcrumbs
        items={[
          { label: isArabic ? 'الإنجازات' : 'Achievements', to: '/achievements' },
          { label: isArabic ? 'الأوراق البحثية' : 'Research Papers' },
        ]}
      />

      <ScrollReveal variant="clip">
        <PageHeader
          eyebrow={isArabic ? 'الأبحاث' : 'RESEARCH'}
          title={isArabic ? 'الأوراق البحثية' : 'Research Papers'}
          description={
            isArabic
              ? `${count} أوراق بحثية مقبولة ضمن مساهمات مِنا في المؤتمر الدولي للملاحة الفضائية (IAC 2026) — أنطاليا، تركيا.`
              : `${count} accepted papers — MENA's research contributions to the International Astronautical Congress (IAC 2026), Antalya, Türkiye.`
          }
        />
      </ScrollReveal>

      <div className="mt-2 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {RESEARCH_PAPERS.map((paper) => (
          <ResearchCard key={paper.id} paper={paper} isArabic={isArabic} />
        ))}
      </div>
    </PageContainer>
  );
}

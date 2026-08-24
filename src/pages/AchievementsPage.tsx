import { Link } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import PageHeader from '../components/PageHeader';
import ScrollReveal from '../components/ScrollReveal';
import ResearchCard from '../components/research/ResearchCard';
import { useSiteContext } from '../components/SiteLayout';
import { useDocumentTitle } from '../lib/useDocumentTitle';
import { RESEARCH_PAPERS } from '../content/researchPapers';

/** Officially requested future achievement areas — labels only, no fabricated counts/records. */
const ACHIEVEMENT_AREAS: { en: string; ar: string }[] = [
  { en: 'Research Papers', ar: 'الأوراق البحثية' },
  { en: 'Scientific Publications', ar: 'المنشورات العلمية' },
  { en: 'International Participation', ar: 'المشاركات الدولية' },
  { en: 'Awards & Recognition', ar: 'الجوائز والتكريم' },
  { en: 'STEM Initiatives', ar: 'مبادرات العلوم والتقنية' },
  { en: 'Major Projects', ar: 'المشاريع الكبرى' },
  { en: 'Community Impact', ar: 'الأثر المجتمعي' },
];

export default function AchievementsPage() {
  const { isArabic } = useSiteContext();
  useDocumentTitle(isArabic ? 'الإنجازات | مِنا' : 'Achievements | MENA');

  // Real content only: the confirmed research papers are the page's initial visible value.
  const featured = RESEARCH_PAPERS.slice(0, 3);

  return (
    <PageContainer className="pt-32 pb-20">
      <ScrollReveal variant="clip">
        <PageHeader
          eyebrow={isArabic ? 'الإنجازات' : 'ACHIEVEMENTS'}
          title={isArabic ? 'الإنجازات والمساهمات العلمية' : 'Achievements & Scientific Contributions'}
          description={
            isArabic
              ? 'استكشف مساهمات مِنا العلمية ونشاطها البحثي وسجلّها المتنامي من المشاركة في مبادرات الفضاء والعلوم.'
              : "Explore MENA's scientific contributions, research activity, and growing record of participation in space and STEM initiatives."
          }
        />
      </ScrollReveal>

      {/* Featured Research (real ResearchPaper records) */}
      <section className="mt-2">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <h2 className="font-display text-3xl font-semibold uppercase tracking-tight text-[var(--page-ink)] sm:text-4xl">
            {isArabic ? 'أبحاث مختارة' : 'Featured Research'}
          </h2>
          <Link
            to="/achievements/research"
            className="whitespace-nowrap rounded font-mono text-[11px] uppercase tracking-widest text-brand-teal transition-colors hover:text-brand-teal-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/50"
          >
            {isArabic ? 'عرض كل الأبحاث ←' : 'View all research papers →'}
          </Link>
        </div>
        <div className="research-list">
          {featured.map((paper) => (
            <ResearchCard key={paper.id} paper={paper} isArabic={isArabic} />
          ))}
        </div>
      </section>

      {/* Future achievement areas — labels only, no fabricated entries or counts */}
      <section className="mt-20">
        <h2 className="mb-3 font-display text-3xl font-semibold uppercase tracking-tight text-[var(--page-ink)] sm:text-4xl">
          {isArabic ? 'مجالات الإنجاز' : 'Achievement Areas'}
        </h2>
        <p className="mb-8 max-w-2xl font-sans text-sm leading-relaxed text-[var(--page-muted)]">
          {isArabic
            ? 'ستُضاف المزيد من الإنجازات في هذه المجالات مع تأكيد السجلّات الرسمية.'
            : 'More achievements will be added across these areas as official records are confirmed.'}
        </p>
        <div className="grid grid-cols-1 border-t border-[var(--page-border)] sm:grid-cols-2">
          {ACHIEVEMENT_AREAS.map((area) => (
            <div
              key={area.en}
              className="border-b border-[var(--page-border)] px-2 py-5 text-start sm:odd:border-e sm:px-5"
            >
              <span className="font-display text-lg font-semibold uppercase leading-tight tracking-wide text-[var(--page-ink)]">
                {isArabic ? area.ar : area.en}
              </span>
            </div>
          ))}
        </div>
      </section>
    </PageContainer>
  );
}

import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '../ScrollReveal';
import ResearchCard from '../research/ResearchCard';
import { RESEARCH_PAPERS } from '../../content/researchPapers';

interface ImpactPreviewProps {
  isArabic: boolean;
}

/**
 * ACHIEVEMENTS / IMPACT — a reason to open /achievements, not a copy of it.
 *
 * Deliberately statistics-free: the repository holds no Achievement records and no impact
 * figures (the fabricated IMPACT_STATS were removed in an earlier audit). The accepted IAC
 * 2026 research papers are the one verified, concrete body of work, so three of them stand
 * in as the preview.
 */
export default function ImpactPreview({ isArabic }: ImpactPreviewProps) {
  const featured = RESEARCH_PAPERS.slice(0, 3);

  return (
    <section id="impact" className="section-block section-rule">
      <div className="site-container">
        <ScrollReveal variant="clip" className="mission-gallery-header mb-10">
          <div>
            <span className="section-index">{isArabic ? 'الإنجازات' : 'Achievements'}</span>
            <h2 className="section-title mt-5">{isArabic ? 'عمل يترك أثراً' : 'Work that leaves a record'}</h2>
          </div>
          <div>
            <p className="section-copy">
              {isArabic
                ? 'من الأوراق البحثية المقبولة إلى المشاركات الدولية والمبادرات المجتمعية — سجلّ مِنا يتوسع مع كل مشروع.'
                : "From accepted research papers to international participation and community initiatives — MENA's record grows with every project."}
            </p>
            <Link
              to="/achievements"
              className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-brand-teal transition-colors hover:text-brand-teal-bright"
            >
              {isArabic ? 'استكشف الإنجازات' : 'Explore achievements'}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
            </Link>
          </div>
        </ScrollReveal>

        <div className="research-list">
          {featured.map((paper, index) => (
            <ScrollReveal key={paper.id} variant="fade-up" delay={index * 0.05}>
              <ResearchCard paper={paper} isArabic={isArabic} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

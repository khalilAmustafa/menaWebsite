import ScrollReveal from '../ScrollReveal';

interface DisciplinesProps {
  isArabic: boolean;
}

/**
 * WHAT WE DO — the six high-level fields MENA operates across.
 *
 * Presented as a numbered editorial index (hairline-separated rows), not cards, and with
 * no supporting descriptions: none are verified in the repository, and inventing one line
 * each would be exactly the kind of filler the content audit removed.
 */
const DISCIPLINES: { en: string; ar: string }[] = [
  { en: 'Engineering', ar: 'الهندسة' },
  { en: 'Science & Research', ar: 'العلوم والبحث' },
  { en: 'Space Exploration', ar: 'استكشاف الفضاء' },
  { en: 'Education', ar: 'التعليم' },
  { en: 'Technology & AI', ar: 'التكنولوجيا والذكاء الاصطناعي' },
  { en: 'Sustainability', ar: 'الاستدامة' },
];

export default function Disciplines({ isArabic }: DisciplinesProps) {
  return (
    <section id="what-we-do" className="section-block section-rule">
      <div className="site-container">
        <ScrollReveal variant="clip" className="mission-gallery-header mb-12">
          <div>
            <span className="section-index">{isArabic ? 'ما الذي نقوم به' : 'What we do'}</span>
            <h2 className="section-title mt-5">{isArabic ? 'نبني عبر التخصصات' : 'Building across disciplines'}</h2>
          </div>
        </ScrollReveal>

        {/* A div/role=list rather than <ol>: ScrollReveal renders a <div>, which is not a
            valid child of <ol>. The numbering is presentational. */}
        <div className="discipline-index" role="list">
          {DISCIPLINES.map((discipline, index) => (
            <ScrollReveal
              key={discipline.en}
              variant="fade-up"
              delay={index * 0.05}
              className="discipline-index__item"
            >
              <div role="listitem" className="discipline-index__row">
                <span className="discipline-index__number" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="discipline-index__name">{isArabic ? discipline.ar : discipline.en}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

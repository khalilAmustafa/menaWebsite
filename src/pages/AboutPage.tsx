import PageContainer from '../components/PageContainer';
import PageHeader from '../components/PageHeader';
import ScrollReveal from '../components/ScrollReveal';
import Partners from '../components/Partners';
import { useSiteContext } from '../components/SiteLayout';
import { useDocumentTitle } from '../lib/useDocumentTitle';

/**
 * `/about` — the organization-level destination the homepage's "Explore MENA" and
 * "Learn more" actions point to.
 *
 * CONTENT PROVENANCE: the qualitative organizational content (Who We Are, Vision,
 * Mission, Values, founded 2024) is adapted from MENA's official About page. Three claims
 * carried there are deliberately NOT reproduced, because this repository's content audit
 * (see the header of src/data.ts) recorded them as fabricated or unverified:
 *   - "first women-led organization in the MENA region"  (audited out as an invented superlative)
 *   - "over 250 students and young professionals"        (audited out as an invented figure)
 *   - the "30% theory / 70% practical" training ratio    (no supporting record in this repository)
 * Where the old marketing copy conflicts with the audited repository, the repository wins.
 * The page is therefore built to be strong through qualitative content, not metrics.
 */

const VALUES: { en: string; ar: string }[] = [
  { en: 'Innovation', ar: 'الابتكار' },
  { en: 'Collaboration', ar: 'التعاون' },
  { en: 'Sustainability', ar: 'الاستدامة' },
  { en: 'Education', ar: 'التعليم' },
];

export default function AboutPage() {
  const { isArabic } = useSiteContext();
  useDocumentTitle(
    isArabic ? 'من نحن | مِنا' : 'About | MENA',
    isArabic
      ? 'مِنا منظمة مجتمعية تعمل على تمكين الناس في الشرق الأوسط وشمال إفريقيا عبر العلوم والهندسة والتكنولوجيا والتعليم.'
      : 'MENA is a community-driven organization empowering people across the Middle East and North Africa through science, engineering, technology, and education.',
  );

  return (
    <>
      <PageContainer className="pt-32">
        <ScrollReveal variant="clip">
          <PageHeader
            eyebrow={isArabic ? 'من نحن' : 'About MENA'}
            title={isArabic ? 'منظمة يبنيها مجتمعها' : 'An organization built by its community'}
            description={
              isArabic
                ? 'تأسست مِنا عام 2024، وتعمل على تمكين الناس في الشرق الأوسط وشمال إفريقيا عبر الهندسة والعلوم والتكنولوجيا والبحث والتعليم والابتكار والتجارب التطبيقية.'
                : 'Founded in 2024, MENA works to empower people across the Middle East and North Africa through engineering, science, technology, research, education, innovation, and real-world experiences.'
            }
          />
        </ScrollReveal>

        {/* Who we are */}
        <ScrollReveal variant="fade-up" className="about-block">
          <span className="section-index">{isArabic ? 'من نحن' : 'Who we are'}</span>
          <h2 className="about-block__title">
            {isArabic ? 'العلوم والتقنية في خدمة الناس' : 'STEM in the service of people'}
          </h2>
          <p className="section-copy mt-5">
            {isArabic
              ? 'مِنا منظمة مجتمعية في الشرق الأوسط وشمال إفريقيا، تعمل على تطبيق العلوم والتكنولوجيا والهندسة والرياضيات في استكشاف الفضاء وفي القضايا التي تمسّ حياة الناس، مع التزام واضح بإتاحة هذه المجالات للجميع وتوسيع المشاركة فيها.'
              : 'MENA is a community-driven organization in the Middle East and North Africa. It applies science, technology, engineering, and mathematics to space exploration and to the questions that shape everyday life — with a clear commitment to widening who gets to take part in these fields.'}
          </p>
          <p className="section-copy mt-4">
            {isArabic
              ? 'يمتد عمل مِنا عبر تغيّر المناخ والطاقة النظيفة والاستدامة البيئية وإدارة المياه والزراعة والصحة والتغذية والنمو الاقتصادي — وهي مجالات يلتقي فيها البحث العلمي بالأثر المجتمعي المباشر.'
              : "MENA's work spans climate change, clean energy, environmental sustainability, water management, agriculture, health, sanitation, nutrition, and economic growth — fields where scientific research meets direct community impact."}
          </p>
        </ScrollReveal>

        {/* Vision */}
        <ScrollReveal variant="fade-up" className="about-block about-block--rule">
          <span className="section-index">{isArabic ? 'رؤيتنا' : 'Our vision'}</span>
          <h2 className="about-block__title">
            {isArabic ? 'مركز عالمي للابتكار والتدريب' : 'A global hub for innovation and training'}
          </h2>
          <p className="section-copy mt-5">
            {isArabic
              ? 'أن تصبح مِنا مركزاً عالمياً رائداً للابتكار والتدريب والتعليم في الهندسة والتكنولوجيا والرعاية الصحية والاستدامة والمناخ والزراعة واستكشاف الفضاء — وأن تسهم في تأسيس وكالة الفضاء الأردنية.'
              : "To become a leading global hub for innovation, training, and education across engineering, technology, healthcare, sustainability, climate, agriculture, and space exploration — and to contribute to the establishment of a Jordanian Space Agency."}
          </p>
        </ScrollReveal>

        {/* Mission */}
        <ScrollReveal variant="fade-up" className="about-block about-block--rule">
          <span className="section-index">{isArabic ? 'رسالتنا' : 'Our mission'}</span>
          <h2 className="about-block__title">
            {isArabic ? 'التعلّم بالممارسة، لا بالنظرية وحدها' : 'Learning by doing, not by theory alone'}
          </h2>
          <p className="section-copy mt-5">
            {isArabic
              ? 'تدريب الطلبة والمهنيين عبر مسار يوازن بين الأساس النظري والتطبيق العملي: ورش عمل، وبعثات محاكاة ميدانية، وشراكات دولية تضع المشاركين أمام مسائل حقيقية لا تمارين افتراضية.'
              : 'To train students and professionals through a path that balances theoretical grounding with practical application: workshops, field analog missions, and global partnerships that put participants in front of real problems rather than exercises.'}
          </p>
        </ScrollReveal>

        {/* Values */}
        <ScrollReveal variant="fade-up" className="about-block about-block--rule">
          <span className="section-index">{isArabic ? 'قيمنا' : 'Our values'}</span>
          <h2 className="about-block__title">{isArabic ? 'ما الذي يوجّه عملنا' : 'What guides the work'}</h2>
          <div className="discipline-index discipline-index--four mt-9" role="list">
            {VALUES.map((value, index) => (
              <div key={value.en} role="listitem" className="discipline-index__item">
                <div className="discipline-index__row">
                  <span className="discipline-index__number" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="discipline-index__name">{isArabic ? value.ar : value.en}</span>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </PageContainer>

      {/* Partners — the existing verified logo wall, relocated here from the homepage. */}
      <Partners isArabic={isArabic} />
    </>
  );
}

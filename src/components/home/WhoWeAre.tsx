import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '../ScrollReveal';

interface WhoWeAreProps {
  isArabic: boolean;
}

/**
 * WHO WE ARE — the homepage's first statement after the hero.
 *
 * Emphasis on "WE BUILD PEOPLE." is carried by typography, colour and a gold hairline
 * rather than a container: the phrase is a separate display line in brand gold, sitting
 * on its own rule. Deliberately not a card.
 */
export default function WhoWeAre({ isArabic }: WhoWeAreProps) {
  return (
    <section id="who-we-are" className="section-block section-rule">
      <div className="site-container">
        <ScrollReveal variant="clip">
          <span className="section-index">{isArabic ? 'من نحن' : 'Who we are'}</span>
        </ScrollReveal>

        <div className="who-we-are__layout">
          <ScrollReveal variant="fade-up" delay={0.05}>
            <h2 className="who-we-are__statement">
              <span className="who-we-are__lead">
                {isArabic ? 'نحن لا نبني المشاريع فحسب.' : "We don't just build projects."}
              </span>
              <strong className="who-we-are__accent">{isArabic ? 'نحن نبني الناس.' : 'We build people.'}</strong>
            </h2>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={0.12} className="who-we-are__aside">
            <p className="section-copy">
              {isArabic
                ? 'تصنع مِنا فرصاً حقيقية للتعلّم والتعاون والتجريب والنمو، ولتحويل الأفكار إلى أثر ملموس.'
                : 'MENA creates opportunities for people to learn, collaborate, experiment, grow, and turn ideas into meaningful impact.'}
            </p>
            <Link
              to="/about"
              className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-brand-teal transition-colors hover:text-brand-teal-bright"
            >
              {isArabic ? 'اعرف المزيد' : 'Learn more'}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

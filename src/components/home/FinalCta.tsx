import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '../ScrollReveal';

interface FinalCtaProps {
  isArabic: boolean;
}

/** The existing volunteer application form — the site's real "join" mechanism. */
const VOLUNTEER_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSe6XrNbP3hm6Q_To_Ex1ryC4Rv21AQ-PJ3Acb9sgfAuGzE0GA/viewform';

/**
 * FINAL CTA — the page's closing statement.
 *
 * Uses a real photograph behind a heavy brand scrim for contrast, rather than a new
 * gradient or colour, so the ending reads as the strongest moment on the page while
 * staying inside the existing identity.
 */
export default function FinalCta({ isArabic }: FinalCtaProps) {
  return (
    <section id="join" className="final-cta section-rule" aria-labelledby="final-cta-title">
      <img
        src="images/events/analog-mission-2025/analog-eva-dusk.jpg"
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="final-cta__image"
      />
      <div className="final-cta__scrim" aria-hidden="true" />

      <div className="site-container final-cta__inner">
        <ScrollReveal variant="fade-up">
          <h2 id="final-cta-title" className="final-cta__title">
            <span>{isArabic ? 'المستقبل ليس شيئاً ننتظره.' : 'The future is not something we wait for.'}</span>
            <strong>{isArabic ? 'بل شيء نصنعه.' : 'It is something we build.'}</strong>
          </h2>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={0.08}>
          <div className="final-cta__actions mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href={VOLUNTEER_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mission-button"
            >
              {isArabic ? 'انضم إلى مِنا' : 'Join MENA'}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
            </a>
            <Link to="/contact" className="mission-button-secondary">
              {isArabic ? 'كن شريكاً لنا' : 'Partner with us'}
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

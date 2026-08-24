import { PARTNERS } from '../content/partners';
import ScrollReveal from './ScrollReveal';

interface PartnersProps {
  isArabic: boolean;
}

export default function Partners({ isArabic }: PartnersProps) {
  return (
    <section id="partners" className="section-block section-rule partners-section">
      <div className="site-container">
        <ScrollReveal variant="clip" className="mission-gallery-header mb-10">
          <div>
            <span className="section-index">{isArabic ? 'شركاؤنا' : 'Our partners'}</span>
            <h2 className="section-title mt-5">{isArabic ? 'نعمل معاً نحو أبعد' : 'Progress is a shared mission'}</h2>
          </div>
          <p className="section-copy">
            {isArabic
              ? 'مؤسسات وشركات شاركت مِنا رحلتها ودعمت حضورها في المجتمع.'
              : 'Organizations and companies that have joined MENA’s journey and supported its work in the community.'}
          </p>
        </ScrollReveal>

        <div className="partner-grid" role="list" aria-label={isArabic ? 'شعارات شركاء مِنا' : 'MENA partner logos'}>
          {PARTNERS.map((partner, index) => {
            if (!partner.logo) return null;
            const alt = isArabic && partner.logo.alt.ar ? partner.logo.alt.ar : partner.logo.alt.en;
            return (
              <ScrollReveal key={partner.id} variant="fade-up" delay={(index % 5) * 0.04} className="partner-mark">
                <div role="listitem" className="grid h-full w-full place-items-center">
                  <img
                    src={`${import.meta.env.BASE_URL}${partner.logo.src.replace(/^\/+/, '')}`}
                    alt={alt}
                    width={partner.logo.width}
                    height={partner.logo.height}
                    loading="lazy"
                  />
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

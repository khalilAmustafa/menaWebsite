import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '../ScrollReveal';
import { getTeamHeads } from '../../lib/team';

interface CommunityProps {
  isArabic: boolean;
}

/**
 * THE MENA COMMUNITY — the most human section on the page.
 *
 * Built entirely from real photography and the real 2026 team roster: three documented
 * group photographs plus the actual faces of the published team heads. No counts, quotes,
 * or testimonials — none are verified, and the content audit removed every prior attempt
 * at them.
 */
const GROUP_PHOTOS: { src: string; alt: { en: string; ar: string } }[] = [
  {
    src: 'images/events/analog-mission-2025/analog-crew.jpg',
    alt: {
      en: 'Analog mission crew in the Wadi Rum desert',
      ar: 'طاقم بعثة المحاكاة في صحراء وادي رم',
    },
  },
  {
    src: 'images/events/space-game-2026/space-game-hackathon-01.jpg',
    alt: {
      en: 'Participants collaborating with a mentor during the hackathon',
      ar: 'مشاركون يتعاونون مع موجّه خلال الهاكاثون',
    },
  },
  {
    src: 'images/events/nasa-space-apps/nasa-hackathon-01.jpg',
    alt: {
      en: 'Teams working during the NASA Space Apps hackathon',
      ar: 'فرق تعمل خلال هاكاثون ناسا لتطبيقات الفضاء',
    },
  },
];

export default function Community({ isArabic }: CommunityProps) {
  const heads = getTeamHeads();

  return (
    <section id="community" className="section-block section-rule">
      <div className="site-container">
        <ScrollReveal variant="clip" className="mission-gallery-header mb-12">
          <div>
            <span className="section-index">{isArabic ? 'مجتمع مِنا' : 'The MENA community'}</span>
            <h2 className="section-title mt-5">
              {isArabic ? 'مجتمع من الصنّاع والمستكشفين والمبتكرين' : 'A community of builders, explorers & innovators'}
            </h2>
          </div>
          <div>
            <p className="section-copy">
              {isArabic
                ? 'تجمع مِنا أشخاصاً من خلفيات وتخصصات مختلفة، يتعلمون ويساهمون وينمون معاً.'
                : 'MENA brings together people from different backgrounds and disciplines who learn, contribute, and grow together.'}
            </p>
            <Link
              to="/team"
              className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-brand-teal transition-colors hover:text-brand-teal-bright"
            >
              {isArabic ? 'تعرّف على الفريق' : 'Meet the team'}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
            </Link>
          </div>
        </ScrollReveal>

        <div className="community-mosaic">
          {GROUP_PHOTOS.map((photo, index) => (
            <ScrollReveal
              key={photo.src}
              variant="fade-up"
              delay={index * 0.06}
              className="community-mosaic__photo"
            >
              <img
                src={photo.src}
                alt={isArabic ? photo.alt.ar : photo.alt.en}
                loading="lazy"
                width={1080}
                height={1350}
              />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal variant="fade-up" delay={0.1} className="community-faces">
          <p className="community-faces__label">
            {isArabic ? 'رؤساء الفرق لعام 2026' : 'The 2026 team heads'}
          </p>
          <ul className="community-faces__row">
            {heads.map((member) => (
              <li key={member.id}>
                <Link
                  to={`/team/${member.slug}`}
                  className="community-faces__link"
                  title={isArabic && member.fullNameAr ? member.fullNameAr : member.fullName}
                >
                  <img
                    src={member.photo.src}
                    alt={isArabic && member.photo.alt.ar ? member.photo.alt.ar : member.photo.alt.en}
                    width={member.photo.width}
                    height={member.photo.height}
                    loading="lazy"
                  />
                  <span className="sr-only">{isArabic && member.fullNameAr ? member.fullNameAr : member.fullName}</span>
                </Link>
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </div>
    </section>
  );
}

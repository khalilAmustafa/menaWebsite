import PageContainer from '../components/PageContainer';
import PageHeader from '../components/PageHeader';
import ScrollReveal from '../components/ScrollReveal';
import EventCard from '../components/events/EventCard';
import { useSiteContext } from '../components/SiteLayout';
import { useDocumentTitle } from '../lib/useDocumentTitle';
import { EVENTS } from '../content/events';

/**
 * Real /events landing page — data-driven from the confirmed Event records only. No fake
 * "Upcoming"/"Past" labels (dates aren't confirmed). Only real events appear; SYSTEM and the
 * Makers Forum are Activities, not events, so they live on /activities instead.
 */
export default function EventsPage() {
  const { isArabic } = useSiteContext();
  // Description reuses the page's own published intro copy — no new claims.
  useDocumentTitle(
    isArabic ? 'الفعاليات | مِنا' : 'Events | MENA',
    isArabic ? 'بعثات وهاكاثونات وفعاليات موثّقة في أرشيف مِنا.' : 'Missions, hackathons, and events documented in MENA’s archive.',
  );

  return (
    <PageContainer className="pb-24 pt-32">
      <ScrollReveal variant="clip">
        <PageHeader
          eyebrow={isArabic ? 'الفعاليات' : 'EVENTS'}
          title={isArabic ? 'الفعاليات' : 'Events'}
          description={
            isArabic
              ? 'بعثات وهاكاثونات وفعاليات موثّقة في أرشيف مِنا.'
              : 'Missions, hackathons, and events documented in MENA’s archive.'
          }
        />
      </ScrollReveal>

      <div className="event-index">
        {EVENTS.map((event) => (
          <EventCard key={event.id} event={event} isArabic={isArabic} />
        ))}
      </div>
    </PageContainer>
  );
}

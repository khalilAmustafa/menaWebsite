import PageContainer from '../components/PageContainer';
import PageHeader from '../components/PageHeader';
import ScrollReveal from '../components/ScrollReveal';
import Contact from '../components/Contact';
import { useSiteContext } from '../components/SiteLayout';
import { useDocumentTitle } from '../lib/useDocumentTitle';

/**
 * `/contact` — Contact is now a real destination rather than a homepage anchor, so the
 * primary navigation can carry it and the homepage's "Join MENA" / "Partner with us"
 * actions have somewhere to land.
 *
 * The contact mechanisms themselves are unchanged: this renders the existing, verified
 * <Contact/> component (WhatsApp, email, the official volunteer form, and the mailto /
 * WhatsApp message composer) with its in-page heading suppressed in favour of the routed
 * page's <h1>.
 */
export default function ContactPage() {
  const { isArabic } = useSiteContext();
  useDocumentTitle(
    isArabic ? 'تواصل معنا | مِنا' : 'Contact | MENA',
    isArabic
      ? 'تواصل مع فريق مِنا عبر واتساب أو البريد الإلكتروني، أو قدّم طلب تطوّع أو شراكة.'
      : 'Reach the MENA team on WhatsApp or by email, or apply to volunteer or partner with us.',
  );

  return (
    <>
      <PageContainer className="pt-32">
        <ScrollReveal variant="clip">
          <PageHeader
            eyebrow={isArabic ? 'تواصل' : 'Contact'}
            title={isArabic ? 'لنتحدّث' : "Let's talk"}
            description={
              isArabic
                ? 'سواء أردت الانضمام إلى مِنا، أو التعاون بحثياً، أو بناء شراكة — اختر الطريقة التي تناسبك وسيصلك الرد من الفريق مباشرة.'
                : 'Whether you want to join MENA, collaborate on research, or build a partnership — choose the route that fits and the team will reply directly.'
            }
          />
        </ScrollReveal>
      </PageContainer>

      {/* Rendered outside PageContainer: <Contact/> supplies its own .site-container, and
          nesting the two width wrappers would compound the 90vw inset. */}
      <Contact isArabic={isArabic} showHeader={false} />
    </>
  );
}

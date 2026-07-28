import { Link, useParams } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import PageHeader from '../components/PageHeader';
import { useSiteContext } from '../components/SiteLayout';

interface PlaceholderPageProps {
  titleEN: string;
  titleAR: string;
  eyebrowEN?: string;
  eyebrowAR?: string;
  /** For dynamic routes: show the matched `:slug` param for development verification. */
  showSlug?: boolean;
}

/**
 * Single, reusable temporary page used by every not-yet-built route in Phase 1.
 * It only verifies that routing + the shared layout work — it contains NO real MENA
 * content and is clearly labelled as a development placeholder. Real content for
 * Achievements / Research / Events / Space Game / Activities / Team arrives in later
 * phases.
 */
export default function PlaceholderPage({
  titleEN,
  titleAR,
  eyebrowEN,
  eyebrowAR,
  showSlug,
}: PlaceholderPageProps) {
  const { isArabic } = useSiteContext();
  const { slug } = useParams();

  return (
    <PageContainer className="min-h-[70vh] pt-32 pb-20 flex flex-col items-center justify-center text-center">
      <PageHeader
        eyebrow={isArabic ? (eyebrowAR ?? 'قيد الإعداد') : (eyebrowEN ?? 'IN PREPARATION')}
        title={isArabic ? titleAR : titleEN}
        description={
          isArabic
            ? 'هذه الصفحة قيد الإعداد وسيُضاف محتواها في مرحلة لاحقة.'
            : 'This page is being prepared. Its content will be added in a later phase.'
        }
      />

      {showSlug && slug && (
        <p className="font-mono text-xs text-neutral-500 mb-6">
          {isArabic ? 'معرّف المسار (للتطوير): ' : 'dev route slug: '}
          <code className="text-brand-teal">{slug}</code>
        </p>
      )}

      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-brand-teal hover:bg-brand-teal-hover text-white font-display font-bold text-xs tracking-widest uppercase transition-colors cursor-pointer border-t border-white/10"
      >
        {isArabic ? 'العودة إلى الصفحة الرئيسية' : 'Return to homepage'}
      </Link>

      <p className="mt-8 font-mono text-[10px] text-neutral-600 uppercase tracking-widest">
        {isArabic ? 'صفحة مؤقتة قيد التطوير' : 'Temporary development placeholder'}
      </p>
    </PageContainer>
  );
}

import { Link } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import PageHeader from '../components/PageHeader';
import { useSiteContext } from '../components/SiteLayout';

/**
 * `*` route — proper Not Found page. Uses an <h1>, matches the site identity, and
 * provides a keyboard-accessible link back to the homepage.
 */
export default function NotFoundPage() {
  const { isArabic } = useSiteContext();

  return (
    <PageContainer className="min-h-[70vh] pt-32 pb-20 flex flex-col items-center justify-center text-center">
      <PageHeader
        eyebrow="404"
        title={isArabic ? 'الصفحة غير موجودة' : 'Page Not Found'}
        description={
          isArabic
            ? 'المسار الذي طلبته غير موجود أو تم نقله.'
            : 'The page you requested does not exist or has been moved.'
        }
      />

      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-brand-teal hover:bg-brand-teal-hover text-white font-display font-bold text-xs tracking-widest uppercase transition-colors cursor-pointer border-t border-white/10"
      >
        {isArabic ? 'العودة إلى الصفحة الرئيسية' : 'Return to homepage'}
      </Link>
    </PageContainer>
  );
}

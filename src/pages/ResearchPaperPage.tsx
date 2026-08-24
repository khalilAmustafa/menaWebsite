import { Link, useParams } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import Breadcrumbs from '../components/Breadcrumbs';
import ScrollReveal from '../components/ScrollReveal';
import ResearchCard from '../components/research/ResearchCard';
import { useSiteContext } from '../components/SiteLayout';
import { useDocumentTitle } from '../lib/useDocumentTitle';
import { RESEARCH_PAPERS } from '../content/researchPapers';
import { getResearchPaperBySlug } from '../lib/research';

export default function ResearchPaperPage() {
  const { slug } = useParams();
  const { isArabic } = useSiteContext();
  const paper = slug ? getResearchPaperBySlug(slug) : undefined;
  const paperTitle = paper ? (isArabic && paper.title.ar ? paper.title.ar : paper.title.en) : '';

  useDocumentTitle(paper ? `${paperTitle} | MENA` : (isArabic ? 'الورقة البحثية غير موجودة | مِنا' : 'Research paper not found | MENA'));

  // ── Research-specific not-found state (stays inside SiteLayout) ───────────────
  if (!paper) {
    return (
      <PageContainer className="flex min-h-[60vh] flex-col items-center justify-center pt-32 pb-20 text-center">
        <span className="mb-3 block font-mono text-xs font-bold uppercase tracking-widest text-brand-teal">
          404
        </span>
        <h1 className="font-display text-4xl font-medium uppercase tracking-tight text-[var(--page-ink)] sm:text-5xl">
          {isArabic ? 'الورقة البحثية غير موجودة' : 'Research paper not found'}
        </h1>
        <p className="mb-8 mt-4 max-w-md font-sans text-sm text-neutral-400">
          {isArabic
            ? 'المسار المطلوب لا يطابق أي ورقة بحثية.'
            : "We couldn't find a research paper at this address."}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 font-mono text-[11px] uppercase tracking-widest">
          <Link to="/achievements/research" className="rounded text-brand-teal transition-colors hover:text-brand-teal-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/50">
            {isArabic ? 'كل الأبحاث' : 'All research'}
          </Link>
          <span aria-hidden="true" className="text-neutral-600">/</span>
          <Link to="/achievements" className="rounded text-brand-teal transition-colors hover:text-brand-teal-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/50">
            {isArabic ? 'الإنجازات' : 'Achievements'}
          </Link>
          <span aria-hidden="true" className="text-neutral-600">/</span>
          <Link to="/" className="rounded text-brand-teal transition-colors hover:text-brand-teal-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/50">
            {isArabic ? 'الرئيسية' : 'Home'}
          </Link>
        </div>
      </PageContainer>
    );
  }

  const conf = paper.conference;
  const conferenceName = conf ? (isArabic && conf.nameAr ? conf.nameAr : conf.name) : '';
  const conferenceLocation = conf?.location ? (isArabic && conf.locationAr ? conf.locationAr : conf.location) : '';
  const authorNames = paper.authors.map((author) => isArabic && author.nameAr ? author.nameAr : author.name);
  const year = paper.year ?? conf?.year;
  const more = RESEARCH_PAPERS.filter((item) => item.id !== paper.id).slice(0, 3);

  // Research-information rows: only fields that actually exist are shown (missing → omitted).
  const metaRows: { label: string; value: string }[] = [];
  if (conferenceName) metaRows.push({ label: isArabic ? 'المؤتمر' : 'Conference', value: conferenceName });
  if (conf?.edition) metaRows.push({ label: isArabic ? 'النسخة' : 'Edition', value: conf.edition });
  if (conferenceLocation) metaRows.push({ label: isArabic ? 'الموقع' : 'Location', value: conferenceLocation });
  if (year) metaRows.push({ label: isArabic ? 'السنة' : 'Year', value: String(year) });
  if (paper.category) metaRows.push({ label: isArabic ? 'التصنيف' : 'Category', value: paper.category });
  if (paper.publicationStatus)
    metaRows.push({ label: isArabic ? 'حالة النشر' : 'Publication Status', value: paper.publicationStatus });

  return (
    <PageContainer className="pt-32 pb-20">
      <Breadcrumbs
        items={[
          { label: isArabic ? 'الإنجازات' : 'Achievements', to: '/achievements' },
          { label: isArabic ? 'الأوراق البحثية' : 'Research Papers', to: '/achievements/research' },
          { label: paperTitle },
        ]}
      />

      {/* B. Research header (a <div>, not <header>, so the nav remains the only banner) */}
      <ScrollReveal variant="clip">
        <div className="page-intro">
          <span className="section-index mb-5">
            {isArabic ? 'ورقة بحثية' : 'RESEARCH PAPER'}
          </span>
          <h1 className="research-paper-title">
            {paperTitle}
          </h1>
          <p className="mt-6 font-sans text-sm leading-relaxed text-[var(--page-muted)]">
            {authorNames.join(isArabic ? '، ' : ', ')}
          </p>
          {conf && (
            <p className="mt-2 font-mono text-[11px] tracking-wide text-[var(--page-subtle)]">
              {conferenceName}
              {conferenceLocation ? ` — ${conferenceLocation}` : ''}
              {year ? ` · ${year}` : ''}
            </p>
          )}
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main column */}
        <div className="space-y-10 lg:col-span-2">
          {/* C. Abstract (UI fallback copy only — never stored as data) */}
          <section>
            <h2 className="mb-3 font-display text-sm font-bold uppercase tracking-widest text-neutral-200">
              {isArabic ? 'الملخص' : 'Abstract'}
            </h2>
            {paper.abstract ? (
              <p className="font-sans text-sm leading-relaxed text-neutral-300">
                {isArabic && paper.abstract.ar ? paper.abstract.ar : paper.abstract.en}
              </p>
            ) : (
              <p className="font-sans text-sm italic leading-relaxed text-neutral-500">
                {isArabic
                  ? 'سيُضاف الملخص بمجرد توفّر معلومات النشر النهائية.'
                  : 'Abstract will be added once the final publication information is provided.'}
              </p>
            )}
          </section>

          {/* E. Authors (text only — no biography links until a TeamMember mapping exists) */}
          <section>
            <h2 className="mb-3 font-display text-sm font-bold uppercase tracking-widest text-neutral-200">
              {isArabic ? 'المؤلفون' : 'Authors'}
            </h2>
            <ul className="flex flex-wrap gap-2">
              {paper.authors.map((author) => (
                <li
                  key={author.name}
                  className="rounded-lg border border-neutral-900/80 bg-neutral-900/40 px-3 py-1.5 font-sans text-xs text-neutral-300"
                >
                  {isArabic && author.nameAr ? author.nameAr : author.name}
                </li>
              ))}
            </ul>
          </section>

          {/* F. Gallery — only if real media exists */}
          {paper.gallery && paper.gallery.length > 0 && (
            <section>
              <h2 className="mb-3 font-display text-sm font-bold uppercase tracking-widest text-neutral-200">
                {isArabic ? 'المعرض' : 'Gallery'}
              </h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {paper.gallery.map((media) => (
                  <img
                    key={media.id}
                    src={media.src}
                    alt={isArabic && media.alt.ar ? media.alt.ar : media.alt.en}
                    width={media.width}
                    height={media.height}
                    className="w-full rounded-lg border border-neutral-900/80 object-cover"
                  />
                ))}
              </div>
            </section>
          )}

          {/* G. Related team members — only if valid mappings exist */}
          {paper.relatedTeamMemberIds && paper.relatedTeamMemberIds.length > 0 && (
            <section>
              <h2 className="mb-3 font-display text-sm font-bold uppercase tracking-widest text-neutral-200">
                {isArabic ? 'أعضاء الفريق المرتبطون' : 'Related Team Members'}
              </h2>
              <ul className="flex flex-wrap gap-2">
                {paper.relatedTeamMemberIds.map((id) => (
                  <li key={id} className="rounded-lg border border-neutral-900/80 bg-neutral-900/40 px-3 py-1.5 font-mono text-[11px] text-neutral-400">
                    {id}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* H. External links — only if real links exist */}
          {paper.externalLinks && paper.externalLinks.length > 0 && (
            <section>
              <h2 className="mb-3 font-display text-sm font-bold uppercase tracking-widest text-neutral-200">
                {isArabic ? 'روابط خارجية' : 'External Links'}
              </h2>
              <ul className="flex flex-wrap gap-3">
                {paper.externalLinks.map((link) => (
                  <li key={link.url}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-800 px-3 py-2 font-mono text-[11px] uppercase tracking-wider text-brand-teal transition-colors hover:border-brand-teal/40 hover:text-brand-teal-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/50"
                    >
                      {link.label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* D. Research information side panel (only present fields) */}
        <aside className="lg:col-span-1">
          <div className="rounded-xl border border-[var(--page-border)] bg-[var(--page-surface)] p-6">
            <h2 className="mb-4 font-display text-sm font-bold uppercase tracking-widest text-neutral-200">
              {isArabic ? 'معلومات البحث' : 'Research Information'}
            </h2>
            <dl className="space-y-3">
              {metaRows.map((row) => (
                <div key={row.label} className="flex flex-col gap-0.5">
                  <dt className="font-mono text-[10px] uppercase tracking-wider text-neutral-500">{row.label}</dt>
                  <dd className="font-sans text-xs text-neutral-300">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>
      </div>

      {/* I. More Research (real papers, current excluded; no implied relevance) */}
      {more.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 font-display text-xl font-medium uppercase tracking-tight text-white">
            {isArabic ? 'المزيد من الأبحاث' : 'More Research'}
          </h2>
          <div className="research-list">
            {more.map((item) => (
              <ResearchCard key={item.id} paper={item} isArabic={isArabic} />
            ))}
          </div>
        </section>
      )}
    </PageContainer>
  );
}

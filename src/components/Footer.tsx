import { Link } from 'react-router-dom';
import MenaLogo from './MenaLogo';

interface FooterProps {
  isArabic: boolean;
}

/**
 * Footer extracted verbatim from the previous App.tsx. Visual appearance and content
 * are unchanged. The only functional change: in-page section anchors now use React
 * Router <Link to="/#..."> so they navigate to the homepage section from any route
 * (they behaved as plain hash links before, which only worked on the homepage).
 */
export default function Footer({ isArabic }: FooterProps) {
  return (
    <footer className="relative bg-black py-16 scroll-mt-10 overflow-hidden text-center z-10 backdrop-blur-xs">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(203,173,142,0.025),transparent_35%)] pointer-events-none" />

      <div className="w-[90%] mx-auto relative z-10">

        <div className="flex flex-col sm:flex-row items-center justify-between gap-8 mb-12 border-b border-neutral-900/60 pb-12">

          {/* Logo */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-3">
            <div className="w-28 h-32 flex-shrink-0">
              <MenaLogo color="var(--color-brand-teal)" />
            </div>
            {/*
              The footer strapline is REMOVED entirely rather than rewritten again.

              Its history is the reason: it began as "THE FIRST space organization…" (AR) /
              "The leading independent… incubator" (EN) — unverifiable rankings; was softened to
              a "women-led" description — an unverified claim; then to "An independent Arab
              aerospace and analog training organization" — which I wrote during cleanup and
              which still asserts independence and an organizational classification nothing
              authoritative supports. Each rewrite substituted a new unsupported claim for the
              last. A footer does not need a strapline, so there is now none: the logo alone
              identifies the organization, and nothing is asserted about what it is.
            */}
          </div>

          {/* Quick telemetry indicators replaced with "Fast Links" */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6 text-left rtl:text-right font-mono text-[10px] text-neutral-500">
            <div className="space-y-2">
              <span className="block text-neutral-600 font-bold tracking-wider uppercase">
                {isArabic ? "منصة الاستكشاف" : "EXPLORATION"}
              </span>
              <ul className="space-y-1.5">
                {/* "ABOUT ANALOG" removed — pointed at /#about, a section that no longer exists. */}
                <li>
                  <Link to="/#mission" className="hover:text-brand-teal transition-colors duration-200">
                    // {isArabic ? "محاكاة وادي رم" : "WADI RUM TRACK"}
                  </Link>
                </li>
                {/* Phase 7: the completed /events area had no footer entry at all. */}
                <li>
                  <Link to="/events" className="hover:text-brand-teal transition-colors duration-200">
                    // {isArabic ? "الفعاليات" : "EVENTS"}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <span className="block text-neutral-600 font-bold tracking-wider uppercase">
                {isArabic ? "العمليات والطاقم" : "OPERATIONS"}
              </span>
              <ul className="space-y-1.5">
                <li>
                  <Link to="/#gallery" className="hover:text-brand-teal transition-colors duration-200">
                    // {isArabic ? "أرشيف الصور" : "FIELD GALLERY"}
                  </Link>
                </li>
                <li>
                  <Link to="/#teams" className="hover:text-brand-teal transition-colors duration-200">
                    // {isArabic ? "أقسام البعثة" : "OFFICIAL CREW"}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <span className="block text-neutral-600 font-bold tracking-wider uppercase">
                {isArabic ? "برامج الكفاءات" : "ACADEMICS"}
              </span>
              <ul className="space-y-1.5">
                <li>
                  <Link to="/#programs" className="hover:text-brand-teal transition-colors duration-200">
                    // {isArabic ? "مسارات التدريب" : "TRAINING TRACKS"}
                  </Link>
                </li>
                <li>
                  <Link to="/activities" className="hover:text-brand-teal transition-colors duration-200">
                    // {isArabic ? "الأنشطة والبرامج" : "ACTIVITIES"}
                  </Link>
                </li>
                {/*
                  Phase 7: "BOARD EXPERTS" pointed at /#advisors, which has been an empty
                  placeholder since the Phase 4.5 de-mock — a link to nothing. Replaced with
                  the two completed, real routes this column had no entry for. Restore an
                  advisors link once real advisor content exists.
                */}
                <li>
                  <Link to="/achievements" className="hover:text-brand-teal transition-colors duration-200">
                    // {isArabic ? "الإنجازات" : "ACHIEVEMENTS"}
                  </Link>
                </li>
                <li>
                  <Link to="/achievements/research" className="hover:text-brand-teal transition-colors duration-200">
                    // {isArabic ? "الأوراق البحثية" : "RESEARCH PAPERS"}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <span className="block text-neutral-600 font-bold tracking-wider uppercase">
                {isArabic ? "عقد الاتصال" : "REACHABILITY"}
              </span>
              <ul className="space-y-1.5">
                <li>
                  <Link to="/team" className="hover:text-brand-teal transition-colors duration-200">
                    // {isArabic ? "فريق العمل" : "OUR TEAM"}
                  </Link>
                </li>
                <li>
                  <Link to="/#contact" className="hover:text-brand-teal transition-colors duration-200">
                    // {isArabic ? "بوابة التسجيل" : "AIRLOCK CONTACT"}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 font-mono text-[10px] text-neutral-600">
          <div className="text-center lg:text-left">
            &copy; {new Date().getFullYear()} MENA Space Organization. ALL TRANSMISSION CHANNELS PROTECTED.
          </div>

          <div className="flex items-center justify-center space-x-4">
            {/* "VISION" removed — it linked to /#about, now deleted. */}
            {/* Phase 8.1: was labelled "TELEMETRY", a leftover from the deleted fabricated
                dashboard. It points at the Analog Mission section, so it now says so. */}
            <Link to="/#mission" className="hover:text-white transition-colors">ANALOG</Link>
            <span>/</span>
            <Link to="/team" className="hover:text-white transition-colors">TEAM</Link>
          </div>
        </div>

      </div>

    </footer>
  );
}

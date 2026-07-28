import { Link } from 'react-router-dom';
import { Linkedin, Instagram, Twitter } from 'lucide-react';
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
            <p className="max-w-xs font-sans text-[11px] text-neutral-500 leading-normal">
              {isArabic ? "أول منظمة فضاء وأبحاث أنالوج بتمكين وأولويات قيادية نسائية عربية وتدريب للطلبة في الأردن." : "The leading independent Arab Aerospace & Analog Training incubator. Inspiring the youth of tomorrow with real sand sandbox missions in Wadi Rum."}
            </p>
          </div>

          {/* Quick telemetry indicators replaced with "Fast Links" */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6 text-left rtl:text-right font-mono text-[10px] text-neutral-500">
            <div className="space-y-2">
              <span className="block text-neutral-600 font-bold tracking-wider uppercase">
                {isArabic ? "منصة الاستكشاف" : "EXPLORATION"}
              </span>
              <ul className="space-y-1.5">
                <li>
                  <Link to="/#about" className="hover:text-brand-teal transition-colors duration-200">
                    // {isArabic ? "عن المنظمة" : "ABOUT ANALOG"}
                  </Link>
                </li>
                <li>
                  <Link to="/#mission" className="hover:text-brand-teal transition-colors duration-200">
                    // {isArabic ? "محاكاة وادي رم" : "WADI RUM TRACK"}
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
                  <Link to="/#advisors" className="hover:text-brand-teal transition-colors duration-200">
                    // {isArabic ? "مجلس المستشارين" : "BOARD EXPERTS"}
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
                  <Link to="/#support" className="hover:text-brand-teal transition-colors duration-200">
                    // {isArabic ? "رعاة المسيرة" : "SUPPORT PORTAL"}
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
            &copy; {new Date().getFullYear()} MENA SPACE & ANALOG ADVISORY. ALL TRANSMISSION CHANNELS PROTECTED.
          </div>

          {/* Branded Social Media Connections */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="text-[9px] text-brand-teal uppercase tracking-wider font-semibold">
              {isArabic ? "قنوات الاتصال المفتوحة //" : "SECURED COMM LINKS //"}
            </span>
            <a
              href="https://linkedin.com/company/mena-space-analog"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-neutral-900/80 border border-neutral-800/80 text-neutral-400 hover:text-[#0A66C2] hover:bg-[#0A66C2]/10 hover:border-[#0A66C2]/30 transition-all duration-300 cursor-pointer"
              aria-label="MENA LinkedIn"
            >
              <Linkedin className="h-3.5 w-3.5" />
            </a>
            <a
              href="https://instagram.com/mena_space_analog"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-neutral-900/80 border border-neutral-800/80 text-neutral-400 hover:text-[#E1306C] hover:bg-[#E1306C]/10 hover:border-[#E1306C]/30 transition-all duration-300 cursor-pointer"
              aria-label="MENA Instagram"
            >
              <Instagram className="h-3.5 w-3.5" />
            </a>
            <a
              href="https://twitter.com/mena_space"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-neutral-900/80 border border-neutral-800/80 text-neutral-400 hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/10 hover:border-[#1DA1F2]/30 transition-all duration-300 cursor-pointer"
              aria-label="MENA Twitter / X"
            >
              <Twitter className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="flex items-center justify-center space-x-4">
            <Link to="/#about" className="hover:text-white transition-colors">VISION</Link>
            <span>/</span>
            <Link to="/#mission" className="hover:text-white transition-colors">TELEMETRY</Link>
            <span>/</span>
            <Link to="/#support" className="hover:text-white transition-colors">SPONSOR</Link>
          </div>
        </div>

      </div>

    </footer>
  );
}

import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import TeamMemberCard from './team/TeamMemberCard';
import { getTeamHeads } from '../lib/team';

interface TeamsProps {
  isArabic: boolean;
}

/**
 * Homepage Team section. Previews the REAL confirmed 2026 Team Heads from the content layer
 * (src/content/team.ts) — same section id (#teams) and same website. The previous fabricated
 * department org-chart and the fictional CORE_TEAM_MEMBERS roster were removed during the
 * de-mock pass: they showed invented names, roles, team sizes, and stock/AI portraits.
 *
 * Only confirmed fields are shown (photo, full name, confirmed role) via the shared
 * TeamMemberCard, and a "View Full Team" link leads to the dedicated /team page.
 */
export default function Teams({ isArabic }: TeamsProps) {
  const heads = getTeamHeads();
  const preview = heads.slice(0, 8);

  return (
    <section id="teams" className="relative bg-transparent py-12 sm:py-16">
      {/* Structural layout decoration */}
      <div className="absolute top-1/2 left-10 w-80 h-80 rounded-full bg-brand-teal/[0.02] blur-3xl pointer-events-none" />

      <div className="w-[90%] mx-auto relative z-10">
        {/* Section title (unchanged language/design) */}
        <ScrollReveal variant="clip" className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs text-brand-teal font-bold tracking-widest uppercase block mb-3">
            {isArabic ? 'الفريق القيادي لعام 2026' : 'MEET THE 2026 TEAM HEADS'}
          </span>
          <h2 className="font-display font-medium text-3xl sm:text-5xl text-white tracking-tight uppercase">
            {isArabic ? (
              <>
                رؤساء الفرق <span className="text-brand-teal italic font-black">والأقسام</span>
              </>
            ) : (
              <>
                Our <span className="text-brand-teal font-black">Team Heads</span>
              </>
            )}
          </h2>
          <div className="h-0.5 w-16 bg-brand-teal mx-auto mt-6" />
          <p className="font-sans text-xs sm:text-sm text-neutral-400 leading-relaxed mt-6">
            {isArabic
              ? 'قادة الفرق المؤكدون لعام 2026 الذين يقودون عمل المنظمة في البحث والهندسة والعمليات والتوعية.'
              : "The confirmed 2026 department heads leading MENA's research, engineering, operations, and outreach."}
          </p>
        </ScrollReveal>

        {/* Real Team Heads preview grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {preview.map((member) => (
            <TeamMemberCard key={member.id} member={member} isArabic={isArabic} />
          ))}
        </div>

        {/* View Full Team link */}
        <div className="mt-12 text-center">
          <Link
            to="/team"
            className="inline-flex items-center gap-2 rounded-lg border border-brand-teal/40 bg-brand-teal/5 px-6 py-3 font-mono text-[11px] font-bold uppercase tracking-widest text-brand-teal transition-all hover:bg-brand-teal/10 hover:border-brand-teal/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/50"
          >
            {isArabic ? 'عرض الفريق كامل' : 'View Full Team'}
            <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </section>
  );
}

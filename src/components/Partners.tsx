import React from 'react';
import { 
  Globe2, 
  GraduationCap, 
  Crown, 
  Compass, 
  Atom, 
  Users, 
  Terminal, 
  Cpu, 
  Layers 
} from 'lucide-react';

interface PartnerItem {
  id: string;
  name: string;
  arabicName: string;
  subtitle: string;
  arabicSubtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  colorClass: string;
}

const PARTNERS: PartnerItem[] = [
  {
    id: "part-jsri",
    name: "Jordan Space Research Initiative",
    arabicName: "المبادرة الأردنية لأبحاث الفضاء",
    subtitle: "JSRI Analog Projects",
    arabicSubtitle: "مشروعات محاكاة الفضاء",
    icon: Globe2,
    colorClass: "text-brand-teal group-hover:text-brand-red"
  },
  {
    id: "part-hu",
    name: "Hashemite University",
    arabicName: "الجامعة الهاشمية أردنيًا",
    subtitle: "HU Astrophysics Department",
    arabicSubtitle: "قسم الفيزياء الفلكية",
    icon: GraduationCap,
    colorClass: "text-sand group-hover:text-brand-teal"
  },
  {
    id: "part-cpf",
    name: "Crown Prince Foundation",
    arabicName: "مؤسسة ولي العهد الأردنية",
    subtitle: "CPF Tech Initiative Liaison",
    arabicSubtitle: "مبادرة التقنية والتطوير",
    icon: Crown,
    colorClass: "text-brand-beige group-hover:text-brand-red"
  },
  {
    id: "part-rum",
    name: "Wadi Rum Reserve Authority",
    arabicName: "سلطة محمية وادي رم",
    subtitle: "ASEZA Natural Fields",
    arabicSubtitle: "ميدان المحاكاة الطبيعي",
    icon: Compass,
    colorClass: "text-brand-red group-hover:text-brand-beige"
  },
  {
    id: "part-ess",
    name: "Eurasian Space Syndicate",
    arabicName: "نقابة الفضاء الأوراسية للعلوم",
    subtitle: "Composite Carbon Materials R&D",
    arabicSubtitle: "أبحاث المواد وألياف الكربون",
    icon: Atom,
    colorClass: "text-brand-teal group-hover:text-brand-red"
  },
  {
    id: "part-iaas",
    name: "International Analog Network",
    arabicName: "الشبكة العالمية لرواد الأنالوج",
    subtitle: "IAAN Habitat Architect Hub",
    arabicSubtitle: "تنسيق مجمعات البيئة المغلقة",
    icon: Users,
    colorClass: "text-brand-teal group-hover:text-sand"
  },
  {
    id: "part-psut",
    name: "Princess Sumaya University",
    arabicName: "جامعة الأميرة سمية للتكنولوجيا",
    subtitle: "PSUT Applied Space Robotics",
    arabicSubtitle: "هندسة الروبوتات والبرمجيات",
    icon: Cpu,
    colorClass: "text-brand-red group-hover:text-brand-teal"
  },
  {
    id: "part-nasa",
    name: "NASA Space Apps Jordan",
    arabicName: "تطبيقات الفضاء ناسا - الأردن",
    subtitle: "National Innovation Challenge",
    arabicSubtitle: "مسابقة الابتكار الفضائي الوطني",
    icon: Layers,
    colorClass: "text-sand group-hover:text-brand-teal"
  }
];

interface PartnersProps {
  isArabic: boolean;
}

export default function Partners({ isArabic }: PartnersProps) {
  return (
    <section 
      id="partners"
      className="relative bg-transparent py-12 sm:py-16"
    >
      
      {/* Decorative ambient background accent */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-24 rounded-full bg-brand-teal/[0.015] blur-3xl pointer-events-none" />

      <div className="w-[90%] mx-auto mb-10 relative z-10 text-center">
        <span className="font-mono text-[10px] text-brand-teal font-bold tracking-widest uppercase block mb-3 animate-pulse">
          {isArabic ? "شبكة التحالفات العلمية والداعمة" : "ACADEMIC & STRATEGIC COALITION"}
        </span>
        <h2 className="font-display font-medium text-2xl sm:text-3xl text-white tracking-tight uppercase">
          {isArabic ? (
            <>
              شركاء <span className="text-brand-teal italic font-black">أبحاث الأنالوج والابتكار</span>
            </>
          ) : (
            <>
              Research <span className="text-brand-teal font-black">Partners & Liaisons</span>
            </>
          )}
        </h2>
        <div className="h-0.5 w-12 bg-brand-red mx-auto mt-4" />
      </div>

      {/* Infinite slider marquee window */}
      <div className="relative w-full overflow-hidden select-none py-4 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1/6 before:bg-gradient-to-r before:from-space-dark/90 before:to-transparent before:z-10 after:absolute after:right-0 after:top-0 after:bottom-0 after:w-1/6 after:bg-gradient-to-l after:from-space-dark/90 after:to-transparent after:z-10">
        
        {/* Dynamic sliding track containing two perfectly identical blocks */}
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          
          {/* Primary Track set */}
          <div className="flex gap-6 pr-6 shrink-0">
            {PARTNERS.map((partner) => {
              const PartnerIcon = partner.icon;
              return (
                <div
                  key={`${partner.id}-a`}
                  id={`partner-card-${partner.id}-a`}
                  className="group flex items-center gap-4 bg-neutral-900/15 hover:bg-neutral-900/40 border border-neutral-900/80 hover:border-brand-teal/30 rounded-2xl px-6 py-4 transition-all duration-300 w-[240px] sm:w-[280px] shrink-0"
                >
                  <div className="p-2.5 bg-neutral-950/60 rounded-lg border border-neutral-900 group-hover:border-brand-teal/20 transition-colors flex-shrink-0">
                    <PartnerIcon className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${partner.colorClass}`} />
                  </div>
                  <div className="text-left overflow-hidden">
                    <h4 className="font-display font-bold text-xs text-neutral-100 uppercase tracking-wide truncate group-hover:text-white transition-colors">
                      {isArabic ? partner.arabicName : partner.name}
                    </h4>
                    <span className="font-mono text-[9px] text-neutral-500 block uppercase tracking-wider mt-0.5 truncate group-hover:text-brand-teal/80 transition-colors">
                      {isArabic ? partner.arabicSubtitle : partner.subtitle}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Duplicated Track set for seamless wrapping loop */}
          <div className="flex gap-6 pr-6 shrink-0" aria-hidden="true">
            {PARTNERS.map((partner) => {
              const PartnerIcon = partner.icon;
              return (
                <div
                  key={`${partner.id}-b`}
                  id={`partner-card-${partner.id}-b`}
                  className="group flex items-center gap-4 bg-neutral-900/15 hover:bg-neutral-900/40 border border-neutral-900/80 hover:border-brand-teal/30 rounded-2xl px-6 py-4 transition-all duration-300 w-[240px] sm:w-[280px] shrink-0"
                >
                  <div className="p-2.5 bg-neutral-950/60 rounded-lg border border-neutral-900 group-hover:border-brand-teal/20 transition-colors flex-shrink-0">
                    <PartnerIcon className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${partner.colorClass}`} />
                  </div>
                  <div className="text-left overflow-hidden">
                    <h4 className="font-display font-bold text-xs text-neutral-100 uppercase tracking-wide truncate group-hover:text-white transition-colors">
                      {isArabic ? partner.arabicName : partner.name}
                    </h4>
                    <span className="font-mono text-[9px] text-neutral-500 block uppercase tracking-wider mt-0.5 truncate group-hover:text-brand-teal/80 transition-colors">
                      {isArabic ? partner.arabicSubtitle : partner.subtitle}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>

      {/* Decorative slider control status notation line */}
      <div className="w-[90%] mx-auto mt-6 relative z-10 flex justify-end font-mono text-[8px] text-neutral-600 tracking-widest uppercase">
        <span>{isArabic ? "مرر الماوس للتوقف الموقت للمعاينة" : "HOVER TRACK TO INITIATE MANUAL FREEZE // [ACTIVE]"}</span>
      </div>
    </section>
  );
}

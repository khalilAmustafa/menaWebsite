import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Compass, CheckCircle2, FlaskConical, Calendar, Navigation, Shield, Thermometer, UserCheck } from 'lucide-react';
import { MISSION_PHASES, MISSION_KNOWLEDGE, IMAGES } from '../data';
import ScrollReveal from './ScrollReveal';

interface AnalogMissionProps {
  isArabic: boolean;
}

export default function AnalogMission({ isArabic }: AnalogMissionProps) {
  const [activeTab, setActiveTab] = useState<'habitat' | 'rover' | 'spacesuits'>('habitat');
  const [expandedPhaseId, setExpandedPhaseId] = useState<string | null>('phase-1');

  const sectionRef = useRef<HTMLElement>(null);
  
  // High-fidelity progress tracking for the scroll viewport intersecting our section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Balanced parallax offsets
  const imageY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  const togglePhaseExpand = (id: string) => {
    setExpandedPhaseId(expandedPhaseId === id ? null : id);
  };

  return (
    <section ref={sectionRef} id="mission" className="relative bg-transparent py-12 sm:py-16 scroll-mt-10">
      


      {/* Visual accents in Brand Colors */}
      <div className="absolute top-1/3 right-10 w-96 h-96 rounded-full bg-brand-red/[0.04] blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-brand-teal/[0.03] blur-3xl pointer-events-none" />

      <div className="w-[90%] mx-auto relative z-10">
        
        {/* Section title */}
        <ScrollReveal variant="clip" className="text-center max-w-3xl mx-auto mb-20">
          <span className="font-mono text-xs text-brand-red font-bold tracking-widest uppercase block mb-3">
            {isArabic ? "تدريبات ومحاكاة الكوكب الأحمر مجهريًا" : "THE FRONTIER LABS"}
          </span>
          <h2 className="font-display font-medium text-3xl sm:text-5xl text-white tracking-tight uppercase">
            {isArabic ? (
              <>
                المحاكاة الأنالوج <span className="text-brand-teal italic font-black">لكوكب المريخ</span>
              </>
            ) : (
              <>
                Analog <span className="text-brand-teal font-black">Mars Missions</span>
              </>
            )}
          </h2>
          <p className="mt-4 font-sans text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto">
            {isArabic ? (
              "استكشاف الحلول التقنية المستدامة وتأهيل الرواد وتجربة المعدات العلمية تحت ضوابط محكمة وممتدة."
            ) : (
              "Testing extreme survival dynamics, materials longevity, and human stress ratios inside deep sandbox landscapes."
            )}
          </p>
          <div className="h-0.5 w-16 bg-brand-teal mx-auto mt-6" />
        </ScrollReveal>

        {/* 1. Technical Showcase Tabs (Habitat, Rover, Spacesuits) */}
        <ScrollReveal variant="fade-up" duration={0.8} className="mb-24 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-neutral-900/10 p-6 sm:p-8 rounded-2xl border border-neutral-900 absolute relative">
          
          {/* Tabs header controller */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <h3 className="font-display font-bold text-base text-neutral-200 uppercase tracking-widest mb-2 border-b border-neutral-800/80 pb-2">
              {isArabic ? "تكنولوجيا الأنالوج" : "ANALOG INFRASTRUCTURE"}
            </h3>

            <button
              onClick={() => setActiveTab('habitat')}
              className={`text-left p-4 rounded-xl border font-display transition-all cursor-pointer ${
                activeTab === 'habitat' 
                ? 'bg-neutral-900/40 border-brand-teal/50 text-white shadow-xl shadow-brand-teal/10' 
                : 'bg-transparent border-transparent text-neutral-500 hover:text-neutral-300'
              }`}
            >
              <div className="font-bold text-sm tracking-widest uppercase">
                {isArabic ? "قبة وادي رم ألفا" : "01 // ANAlOG HABITAT"}
              </div>
              <span className="text-[10px] font-mono text-neutral-500 mt-1 block uppercase">Rum Dome Alpha base setup</span>
            </button>

            <button
              onClick={() => setActiveTab('rover')}
              className={`text-left p-4 rounded-xl border font-display transition-all cursor-pointer ${
                activeTab === 'rover' 
                ? 'bg-neutral-900/40 border-brand-red/50 text-white shadow-xl shadow-brand-red/10' 
                : 'bg-transparent border-transparent text-neutral-500 hover:text-neutral-300'
              }`}
            >
              <div className="font-bold text-sm tracking-widest uppercase">
                {isArabic ? "مركبة بترا الاستكشافية" : "02 // PETRA EXPLORATION ROVER"}
              </div>
              <span className="text-[10px] font-mono text-neutral-500 mt-1 block uppercase">Semi-autonomous heavy explorer</span>
            </button>

            <button
              onClick={() => setActiveTab('spacesuits')}
              className={`text-left p-4 rounded-xl border font-display transition-all cursor-pointer ${
                activeTab === 'spacesuits' 
                ? 'bg-neutral-900/40 border-brand-teal/50 text-white shadow-xl shadow-brand-teal/10' 
                : 'bg-transparent border-transparent text-neutral-500 hover:text-neutral-300'
              }`}
            >
              <div className="font-bold text-sm tracking-widest uppercase">
                {isArabic ? "هندسة بدلات الفضاء" : "03 // EVA SPACESUIT SYSTEMS"}
              </div>
              <span className="text-[10px] font-mono text-neutral-500 mt-1 block uppercase">Thermal insulation & telemetry panels</span>
            </button>
          </div>

          {/* Tab content viewer */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
              >
                {/* Visual rendering photo */}
                <div className="relative aspect-video sm:aspect-square md:aspect-video lg:aspect-square rounded-xl overflow-hidden border border-neutral-850 shadow-2xl">
                  <motion.img
                    src={
                      activeTab === 'habitat' ? IMAGES.hero :
                      activeTab === 'rover' ? IMAGES.eva : IMAGES.engineering
                    }
                    alt="Space Telemetry"
                    style={{ y: imageY }}
                    referrerPolicy="no-referrer"
                    className="w-full h-[120%] -mt-[10%] object-cover object-center scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 pointer-events-none" />
                </div>

                {/* Technical textual info */}
                <div className="space-y-4">
                  <span className="font-mono text-[9.5px] text-brand-teal tracking-widest uppercase bg-brand-teal/5 px-2.5 py-0.5 rounded border border-brand-teal/20">
                    {activeTab === 'habitat' ? "Rum Station Alpha" : activeTab === 'rover' ? "P-1 Exploration Gear" : "EVA Mark-III Jordan"}
                  </span>

                  <h4 className="font-display font-bold text-lg text-white">
                    {activeTab === 'habitat' ? (isArabic ? MISSION_KNOWLEDGE.habitat.title : "Rum Dome Alpha Analog Habitat") :
                     activeTab === 'rover' ? (isArabic ? MISSION_KNOWLEDGE.rover.title : "Petra-1 Multi-Terrain Rover") :
                     (isArabic ? "بدلة رواد الفضاء الأنالوج Mark-III" : "Jordan EVA Suit System")}
                  </h4>

                  <p className="font-sans text-xs text-neutral-400 leading-relaxed">
                    {activeTab === 'habitat' ? (
                      isArabic ? MISSION_KNOWLEDGE.habitat.description : "Rum Dome Alpha provides a physical localized simulation habitat. Made with geodesic structures fitted with multi-chamber dynamic airlock seals and oxygen recycled reservoirs."
                    ) : activeTab === 'rover' ? (
                      isArabic ? MISSION_KNOWLEDGE.rover.description : "Petra-1 Exploration Rover is designed with resilient chassis structures, high-torque sand tires, remote sample collections claw, and continuous telemetry radio units."
                    ) : (
                      isArabic ? "تدريب رواد الفضاء يتطلب ارتداء بدلة عازلة للحرارة والرماد البركاني، مجهزة بحساسات قياس ضربات القلب والضغط، متصلة مباشرة بمركز التحكم في عمان." : "Engineered and modified by Jordan youths, this EVA suit prototype provides heat management filters, heart-rate monitors, carbon-filtering masks, and integrated GPS mesh relays."
                    )}
                  </p>

                  <div className="border-t border-neutral-900/60 pt-3 space-y-1.5 font-mono text-[10px] text-neutral-400">
                    {activeTab === 'habitat' ? (
                      MISSION_KNOWLEDGE.habitat.specs.map((spec, s) => <div key={s} className="flex items-center gap-1.5"><Shield className="w-3 h-3 text-brand-red" /> {spec}</div>)
                    ) : activeTab === 'rover' ? (
                      MISSION_KNOWLEDGE.rover.specs.map((spec, s) => <div key={s} className="flex items-center gap-1.5"><Navigation className="w-3 h-3 text-brand-teal" /> {spec}</div>)
                    ) : (
                      <>
                        <div className="flex items-center gap-1.5"><Compass className="w-3 h-3 text-brand-teal" /> Insulating Layer: 4-ply Kevlar/Silica mesh</div>
                        <div className="flex items-center gap-1.5"><Thermometer className="w-3 h-3 text-brand-teal" /> Range: -10°C to 45°C thermal defense</div>
                        <div className="flex items-center gap-1.5"><UserCheck className="w-3 h-3 text-brand-teal" /> Integrated biometric transmitter: v3.4</div>
                      </>
                    )}
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>
        </ScrollReveal>

        {/* 2. Beautiful Vertical Mechanical Timeline */}
        <div className="mt-20">
          <ScrollReveal variant="fade-up" duration={0.6} className="text-center">
            <h3 className="font-display font-medium text-xl sm:text-2xl text-white tracking-wider uppercase mb-16 flex items-center justify-center gap-2">
              <FlaskConical className="w-5 h-5 text-brand-red" />
              {isArabic ? "سجل وجدول مهام المحاكاة (ARAV)" : "ARAV MISSION CHRONOLOGY"}
            </h3>
          </ScrollReveal>

          <div className="relative max-w-4xl mx-auto border-l-2 border-neutral-900 pl-6 sm:pl-10 space-y-12">
            
            {MISSION_PHASES.map((phase, i) => {
              const isOpen = expandedPhaseId === phase.id;
              
              return (
                <ScrollReveal 
                  key={phase.id} 
                  variant="fade-up" 
                  delay={i * 0.12} 
                  threshold={0.05} 
                  className="relative group text-left"
                >
                  
                  {/* Vertical line indicator node dot */}
                  <div className={`absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full border-2 transition-transform duration-300 group-hover:scale-120 ${
                    phase.status === 'completed' 
                    ? 'bg-neutral-900 border-emerald-500' 
                    : 'bg-neutral-900 border-brand-teal animate-pulse'
                  }`} />

                  {/* Date badge */}
                  <div className="flex flex-wrap items-center gap-3.5 mb-2">
                    <span className="font-mono text-[10px] text-neutral-500 tracking-widest uppercase flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {phase.date}
                    </span>
                    <span className={`font-mono text-[9px] px-2 py-0.5 rounded font-bold uppercase ${
                      phase.status === 'completed' ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/20' : 'bg-brand-beige/10 text-brand-beige border border-brand-beige/20'
                    }`}>
                      {phase.status}
                    </span>
                  </div>

                  {/* Timeline Card */}
                  <div className="glass-panel border border-neutral-900/80 hover:border-neutral-800 transition-all duration-300 p-6 sm:p-8 rounded-xl shadow-xl">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h4 className="font-display font-bold text-base sm:text-lg text-white uppercase tracking-wider">
                          {phase.title}
                        </h4>
                        <span className="font-mono text-xs text-neutral-500 block mt-0.5">
                          {phase.location}
                        </span>
                      </div>
                      <span className="font-display text-right font-medium text-xs sm:text-sm text-brand-teal block tracking-wide">
                        {isArabic ? phase.arabicTitle : null}
                      </span>
                    </div>

                    <p className="font-sans text-xs text-neutral-400 mt-4 leading-relaxed">
                      {isArabic ? (
                        phase.id === 'phase-1' ? "المهمة الأولى لاختبار مرونة الطاقم في السكون التام، وقياس قدرات الاتصال المحاكية لزمن التأخير الفعلي للمريخ البالغ عشرين دقيقة." :
                        phase.id === 'phase-2' ? "مشروع النظم الحيوية المغلقة والاكتفاء الذاتي من خلال تقنية الزراعة المائية، وفحص عقلية استهلاك حصص الحفاظ المائي المقررة للأطقم الفضائية." :
                        "التجربة الأكثر اتساعًا وعالمية المجهرة لركائز البصريات الفضائية والدمج الكامل لمعدات تماثل مركبات الوهاد الشبيهة."
                      ) : phase.description}
                    </p>

                    {/* Interactive Expand list details */}
                    <div className="mt-4 pt-4 border-t border-neutral-900/60">
                      <button
                        onClick={() => togglePhaseExpand(phase.id)}
                        className="text-[10px] font-mono tracking-widest text-brand-teal hover:text-brand-teal-bright flex items-center cursor-pointer"
                      >
                        {isOpen ? "[-] COLLAPSE MISSION SCOPE" : "[+] EXPAND MISSION SCOPE"}
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.ul
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-3.5 space-y-2 list-disc pl-4 text-xs font-sans text-neutral-400 leading-relaxed overflow-hidden"
                          >
                            {phase.details.map((detail, d) => (
                              <li key={d} className="hover:text-neutral-200 transition-colors">
                                {isArabic ? (
                                  detail.includes('120 hours') ? "عزل كامل للطاقم دام لـ ١٢٠ ساعة متواصلة" :
                                  detail.includes('Field test') ? "فحص بدلة الفضاء الأردنية مارك-١ في الميدان" :
                                  detail.includes('Basalt rock') ? "تحليل وحفر البازلت البركاني" :
                                  detail.includes('completed psychological') ? "رصد الحالة النفسية للطاقم مع تأخير زمني ٢٠ دقيقة" :
                                  detail.includes('In-situ') ? "تصنيع ثلاثي الأبعاد باستخدام رمال رم الحمراء" :
                                  detail.includes('Closed-loop') ? "تجربة الزراعة المائية المغلقة في حاويات مخصصة" :
                                  detail.includes('Semi-autonomous') ? "تتبع الروفر محاكي الحركة والتحكم عن بعد" :
                                  detail.includes('successful test') ? "نجح اللاسلكي الفضائي ومكرر الاتصال بالأقمار" :
                                  detail.includes('Interdisciplinary youth') ? "مسابقة شبابية لتوفير دفق بيانات حي لملامح التدريب" :
                                  detail.includes('Active volcanic') ? "محاكاة الدخول الكهفي للأنفاق البازلتية الشبيهة" :
                                  detail.includes('Deployment of Jordan') ? "تشغيل روبر الابتكار الأردني الأحدث «بترا-١»" :
                                  "تأسيس الأرشيف العربي لمهام محاكاة الفضاء التاريخية"
                                ) : detail}
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>

                  </div>
                </ScrollReveal>
              );
            })}

          </div>
        </div>

      </div>
    </section>
  );
}

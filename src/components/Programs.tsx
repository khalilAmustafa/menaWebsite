import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, ChevronRight, X, Clock, MapPin, Sparkles } from 'lucide-react';
import { ACTION_PROGRAMS } from '../data';
import ScrollReveal from './ScrollReveal';

interface ProgramsProps {
  isArabic: boolean;
}

export default function Programs({ isArabic }: ProgramsProps) {
  const [selectedProgId, setSelectedProgId] = useState<string | null>(null);

  useEffect(() => {
    const handleOpenProgram = (e: Event) => {
      const customEvent = e as CustomEvent<{ programId: string }>;
      if (customEvent.detail?.programId) {
        setSelectedProgId(customEvent.detail.programId);
      }
    };
    window.addEventListener('open-program', handleOpenProgram);
    return () => window.removeEventListener('open-program', handleOpenProgram);
  }, []);

  const programsMap = {
    'nasa-apps': {
      syllabus: [
        "Challenge Exploration & NASA API ingestion lessons",
        "Team forming, rapid engineering prototyping",
        "Refining pitch structures with global space-science judges"
      ],
      timing: "ANNUAL CHALLENGE (OCTOBER)",
      venue: "AMMAN TECH SECTOR + VIRTUAL WORKSPACES"
    },
    'system-prog': {
      syllabus: [
        "Aerospace Engineering & Astrodynamics Math Basics",
        "Life Support closed loop design (CO2, thermal scrubbing)",
        "Biogardening on basalt Mars regolith simulated materials",
        "Habitability Psychology & communications constraints"
      ],
      timing: "12-WEEK CERTIFIED FIELD BOOTCAMP",
      venue: "MENA JORDAN OFFICE + WADI RUM DOME ALPHA"
    },
    'maker-collective': {
      syllabus: [
        "FDM and SLA 3D printing of functional structural parts",
        "Microcontroller integration & PCB routing with Altium/KiCad",
        "Environmental telemetry & sensor communication protocols",
        "CNC routing for carbon fiber chassis and payload mounts"
      ],
      timing: "CONTINUOUS COLLABORATIVE ACCESS",
      venue: "AMMAN MAKER STATION & R&D LABS"
    },
    'stem-labs': {
      syllabus: [
        "Pneumatic drilling & chassis shock absorption math",
        "RF communication arrays in severe sandstorm frequencies",
        "Autonomous computer vision path finding scripts (OpenCV)"
      ],
      timing: "6-MONTH SQUAD CHALLENGE DESIGN LOOP",
      venue: "JORDAN UNIVERSITIES ENGINE BASE LABS"
    }
  };

  const selectedProg = ACTION_PROGRAMS.find(p => p.id === selectedProgId);
  const extraInfo = selectedProgId ? programsMap[selectedProgId as keyof typeof programsMap] : null;

  return (
    <section id="programs" className="relative bg-transparent py-12 sm:py-16">
      
      {/* Decorative starry layout highlights */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-brand-red/5 blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-brand-teal/5 blur-3xl" />

      <div className="w-[90%] mx-auto relative z-10">
        
        {/* Section title */}
        <ScrollReveal variant="clip" className="text-center max-w-3xl mx-auto mb-20">
          <span className="font-mono text-xs text-brand-teal font-bold tracking-widest uppercase block mb-3">
            {isArabic ? "برامج إلهام وتمكين الجيل القادم" : "HUMAN TALENT LAUNCHPAD"}
          </span>
          <h2 className="font-display font-medium text-3xl sm:text-5xl text-white tracking-tight uppercase">
            {isArabic ? (
              <>
                البرامج والتعليم <span className="text-brand-teal italic font-black">الابتكاري للشباب</span>
              </>
            ) : (
              <>
                Programs & <span className="text-brand-teal font-black">Education Labs</span>
              </>
            )}
          </h2>
          <div className="h-0.5 w-16 bg-brand-teal mx-auto mt-6" />
        </ScrollReveal>

        {/* Dynamic Interactive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {ACTION_PROGRAMS.map((prog, i) => (
            <motion.div
              key={prog.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ y: -6 }}
              className="group relative flex flex-col justify-between bg-neutral-900/35 hover:bg-neutral-900/60 border border-neutral-900 hover:border-brand-teal/20 rounded-2xl p-5 sm:p-6 transition-all duration-300 shadow-xl"
            >
              <div>
                <span className="font-mono text-[9px] text-brand-teal tracking-widest uppercase block mb-2 font-bold">
                  {prog.id === 'nasa-apps' ? "GLOBAL EVENT" : prog.id === 'system-prog' ? "ACADEMIC INTENSIVE" : prog.id === 'maker-collective' ? "HARDWARE HUB" : "ANNUAL ROBOTICS"}
                </span>

                <h3 className="font-display font-bold text-base text-white mb-2 leading-tight uppercase group-hover:text-brand-teal transition-colors min-h-[40px] flex items-center">
                  {isArabic ? (
                    prog.id === 'nasa-apps' ? "هاكاثون ناسا لتطبيقات الفضاء" :
                    prog.id === 'system-prog' ? "أكاديمية تدريب S.Y.S.T.E.M" :
                    prog.id === 'maker-collective' ? "تجمع الصنّاع والمبتكرين" :
                    "تحدي روفيرات المريخ الجامعي"
                  ) : prog.title}
                </h3>

                <p className="font-sans text-xs text-neutral-400 mb-6 leading-relaxed line-clamp-4">
                  {isArabic ? (
                    prog.id === 'nasa-apps' ? "شريك وطني ومستضيف سنوي لأكبر تحدي تكنولوجي عالمي، لتحفيز المبرمجين والمصممين لحل مشاكل الكوكب المفتوحة." :
                    prog.id === 'system-prog' ? "برنامج تدريبي فريد يغطي فيزياء الصواريخ والمدارات وأنظمة التهوية والمحاكاة الحية داخل قبة وادي رم." :
                    prog.id === 'maker-collective' ? "مختبر تعاوني وتجمع حي لتصنيع النماذج الأولية للمستشعرات والدارات الكهربائية وأجهزة الرصد الجوي المصغرة." :
                    "تحدٍ وطني سنوي لتصميم وصنع الروبوتات الاستكشافية القادرة على اجتياز طرق رملية وعرة وسحب العينات بمرونة."
                  ) : prog.description}
                </p>

                {/* Micro Features list highlight */}
                <ul className="mb-6 space-y-2">
                  {prog.features.slice(0, 2).map((item, idx) => (
                    <li key={idx} className="flex items-center text-[11px] font-sans text-neutral-300">
                      <ChevronRight className="w-3.5 h-3.5 text-brand-teal mr-1 flex-shrink-0" />
                      <span className="truncate">
                        {isArabic ? (
                          prog.id === 'maker-collective' ? (
                            idx === 0 ? "تصميم وطباعة ثلاثية الأبعاد متقدمة" : "ورشات تخطيط الدارات ومتحكمات أردوينو"
                          ) : (
                            idx === 0 ? "توجيه علمي مباشر من الخبراء الدوليين" : "الوصول والمشاركة للمئات من شباب الأردن"
                          )
                        ) : item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-neutral-900 pt-4 mt-4">
                <button
                  onClick={() => setSelectedProgId(prog.id)}
                  className="w-full py-2.5 rounded bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 text-[10px] sm:text-xs font-mono tracking-wider font-bold text-brand-teal flex items-center justify-center gap-1.5 transition-colors cursor-pointer hover:border-brand-teal/30"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  {isArabic ? "عرض المنهج الدراسي الكامل" : "VIEW SYLLABUS DETAILS"}
                </button>
              </div>

            </motion.div>
          ))}
        </div>

      </div>

      {/* Futuristic Dialog modal for Syllabus view */}
      <AnimatePresence>
        {selectedProgId && selectedProg && extraInfo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Overlay mask */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.85 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProgId(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-xs"
            />

            {/* Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="glass-panel-glow border border-brand-teal/20 max-w-lg w-full rounded-2xl overflow-hidden relative z-10 p-6 sm:p-8 shadow-2xl bg-space-deep"
            >
              
              <button
                onClick={() => setSelectedProgId(null)}
                className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <span className="font-mono text-[9px] text-brand-teal tracking-widest uppercase block mb-1">
                  {selectedProg.role}
                </span>
                <h3 className="font-display font-bold text-lg text-white uppercase tracking-wider">
                  {isArabic ? (
                    selectedProg.id === 'nasa-apps' ? "مستضيف هاكاثون تطبيقات الفضاء ناسا" :
                    selectedProg.id === 'system-prog' ? "سلسلة أكاديمية S.Y.S.T.E.M" :
                    selectedProg.id === 'maker-collective' ? "تجمع الصنّاع المبتكرين" :
                    "تحت إشراف: تحدي الابتكار الأردني"
                  ) : selectedProg.title}
                </h3>
              </div>

              {/* Timing Metadata stats */}
              <div className="grid grid-cols-2 gap-3.5 mb-6 py-3 px-4 bg-neutral-900/40 rounded border border-neutral-900/80 font-mono text-[10px]">
                <div>
                  <span className="text-neutral-500 block">PROGRAM PERIOD</span>
                  <span className="text-neutral-200 mt-1 block flex items-center"><Clock className="w-3.5 h-3.5 text-brand-teal mr-1" /> {extraInfo.timing}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">LOCATION PLATFORM</span>
                  <span className="text-neutral-200 mt-1 block flex items-center"><MapPin className="w-3.5 h-3.5 text-brand-teal mr-1" /> {isArabic ? "خيار هجين (عمان + رم)" : extraInfo.venue}</span>
                </div>
              </div>

              {/* Syllabi syllabus bullet points */}
              <div>
                <h4 className="font-display font-bold text-xs text-neutral-400 tracking-wider mb-3 uppercase flex items-center">
                  <Sparkles className="w-3.5 h-3.5 text-brand-teal mr-1.5" />
                  {isArabic ? "مفردات المنهج والبرامج العملية" : "CORE SYLLABUS MODULES"}
                </h4>
                <ul className="space-y-2.5">
                  {extraInfo.syllabus.map((item, idx) => (
                    <li key={idx} className="p-3 bg-neutral-950/80 rounded border border-neutral-900/80 font-mono text-xs text-neutral-200 flex items-start gap-2">
                      <span className="text-brand-teal font-bold block">[{idx + 1}]</span>
                      <span>
                        {isArabic ? (
                          selectedProg.id === 'nasa-apps' ? (
                            idx === 0 ? "تحليل التحديات والتأقلم مع بيانات ناسا وعقد جلسات تفقية سريعة" :
                            idx === 1 ? "بناء وإطلاق النماذج الأولية المباشرة وحل المشاكل التقنية مع الموجهين فنيًا" :
                            "تقييم وعرض الأفكار ومراجعتها مع محكمين دوليين ومحليين بمنافسة عالية"
                          ) : selectedProg.id === 'system-prog' ? (
                            idx === 0 ? "مبادئ هندسة الطيران الفلكي وحساب مدارات الأقمار وقنوات الاتصال" :
                            idx === 1 ? "تصميم أنظمة العزل وقنوات التهوية والمحاكاة الحية" :
                            idx === 2 ? "تجارب الزراعة الحية وتحديات توفير سبل الدعم المائي المعزول" :
                            "سيكولوجية العزل ورصد الاتصالات تحت تأخير زمني مبرمج"
                          ) : selectedProg.id === 'maker-collective' ? (
                            idx === 0 ? "التصنيع باستخدام طابعات القذف الصهري والأشعة فوق البنفسجية" :
                            idx === 1 ? "ربط النظم الميكروية وتصميم الدوائر الكهربائية ببرامج KiCad/Altium" :
                            idx === 2 ? "تصميم برامج ومستشعرات الرصد الحي للبيئة وتبادل البيانات لاسلكيًا" :
                            "استعمال مخارط الـ CNC لتصنيع هياكل ألياف الكربون وأذرع الحمولات"
                          ) : (
                            idx === 0 ? "محاكاة الضخ الهوائي وآليات الحفاظ على اتزان المركبات الاستكشافية" :
                            idx === 1 ? "اختبار قنوات الاتصال براديوهات الموجهات والتحرك في بيئات رملية شديدة المقاومة" :
                            "برمجة خوارزميات الذكاء الاصطناعي لتفادي العقبات الصخرية في وادي رم"
                          )
                        ) : item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action buttons */}
              <div className="mt-8 pt-4 border-t border-neutral-900/60">
                <button
                  onClick={() => setSelectedProgId(null)}
                  className="w-full py-3 rounded bg-brand-teal hover:bg-brand-teal-hover text-white font-display font-medium text-xs tracking-widest uppercase cursor-pointer text-center block font-bold transition-colors"
                >
                  {isArabic ? "إغلاق التفاصيل" : "CLOSE INFORMATION DETAIL"}
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Check, Linkedin, Mail, Shield } from 'lucide-react';
import { DEPARTMENTS } from '../data';
import ScrollReveal from './ScrollReveal';

interface TeamMember {
  id: string;
  nameEN: string;
  nameAR: string;
  roleEN: string;
  roleAR: string;
  specialtyEN: string;
  specialtyAR: string;
  idCode: string;
  statusEN: string;
  statusAR: string;
  avatar: string;
  bioEN: string;
  bioAR: string;
}

const CORE_TEAM_MEMBERS: TeamMember[] = [
  {
    id: "team-1",
    nameEN: "Eng. Farah Shalabi",
    nameAR: "المهندسة فرح الشلبي",
    roleEN: "Founder & Director of Operations",
    roleAR: "المؤسسة ومديرة عمليات البعثة",
    specialtyEN: "Aerospace Systems & Ground Control",
    specialtyAR: "أنظمة الفضاء والاتصال الرقمي",
    idCode: "ARAV-CDR-01",
    statusEN: "ACTIVE IN MISSION",
    statusAR: "نشط في المهمة",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
    bioEN: "An aerospace systems expert who set up Jordan's first simulated ground control center. Spearheading analog mission execution and real-time telemetry pipelines.",
    bioAR: "خبيرة في أنظمة الفضاء والتحكم الأرضي، ومؤسسة أول مركز لإدارة المهام والتحكم التفاعلي بالوقائع في الأردن."
  },
  {
    id: "team-2",
    nameEN: "Eng. Noor Al-Jaafari",
    nameAR: "المهندسة نور الجعفري",
    roleEN: "Co-Founder & Lead Spacesuit Architect",
    roleAR: "المؤسسة الشريكة ومصممة بدلات الفضاء",
    specialtyEN: "Aerospace Structural & Fabrications",
    specialtyAR: "هياكل الفضاء والمواد المتقدمة",
    idCode: "ARAV-ENG-02",
    statusEN: "LAB COMMITTED",
    statusAR: "ملتزم بالمختبر",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
    bioEN: "Lead materials designer focusing on carbon-reinforced composites and active airlock engineering. Spearheaded the local manufacture of the Jordan Analog Spacesuit Mark-I.",
    bioAR: "مصممة وباحثة فضاء تركز على الألياف الكربونية والمعايرة الهيدروليكية ومحاكاة بدلات الرواد للبيئات الرملية القاسية."
  },
  {
    id: "team-3",
    nameEN: "Dr. Maya Toukan",
    nameAR: "الدكتورة مايا طوقان",
    roleEN: "Chief Research Biochemist",
    roleAR: "رئيسة أبحاث الكيمياء الحيوية",
    specialtyEN: "Ecosystem Design & Astrobiology",
    specialtyAR: "تصميم النظم البيئية والفيزياء الحيوية",
    idCode: "ARAV-BIO-03",
    statusEN: "RESEARCH LEAD",
    statusAR: "رئيسة الأبحاث",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    bioEN: "Specializes in closed-loop aquaponics and sustainable crop systems for high-stress locations. Oversees botanical and soil experiments inside Rum Dome Alpha.",
    bioAR: "متخصصة في الأنظمة الغذائية المغلقة والحلول المائية المقاومة للمناخ، تدرس التربة البركانية والمغذيات الطبيعية بوادي رم."
  },
  {
    id: "team-4",
    nameEN: "Capt. Zein Obiedat",
    nameAR: "الكابتن زين عبيدات",
    roleEN: "Lead Analog Instructor & Survival Advisor",
    roleAR: "مدرب رواد الفضاء وأنظمة النجاة",
    specialtyEN: "Command EVA Tactics & Exploration",
    specialtyAR: "قيادة مهام الخروج وعقد النجاة الميدانية",
    idCode: "ARAV-OPS-04",
    statusEN: "FIELD DEPLOYED",
    statusAR: "ميداني نشط",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    bioEN: "Former pilot and defense expert trained in wilderness survival. Leads rugged outdoor extravehicular activity (EVA) training sessions across the dunes of Wadi Rum.",
    bioAR: "طيار عسكري سابق ومدرب نجاة، يقود تدريبات الخروج الميداني (EVA) الشاملة للأطقم في كثبان وادي رم."
  },
  {
    id: "team-5",
    nameEN: "Eng. Laith Kawar",
    nameAR: "المهندس ليث قوار",
    roleEN: "Telemetry & Comm Systems Lead",
    roleAR: "مسؤول الاتصال عن بعد والأنظمة الرقمية",
    specialtyEN: "High-Frequency Antenna & SDR Arrays",
    specialtyAR: "الاتصالات الهوائية والموجات الرقمية",
    idCode: "ARAV-TEL-05",
    statusEN: "UPLINK SECURE",
    statusAR: "قناة الاتصال آمنة",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    bioEN: "Controls the UHF communication array and high-frequency antenna dishes from Jordan static offices to our simulated habitat, keeping deep sand links stable.",
    bioAR: "يدير قنوات معالجة البيانات والترددات العالية لضمان استقرار الاتصالات اللاسلكية مع الطاقم المنعزل بوادي رم."
  },
  {
    id: "team-6",
    nameEN: "Aya Al-Sakit",
    nameAR: "آية الساكت",
    roleEN: "STEM Academy Lead & Crew Trainee",
    roleAR: "مسؤولة أكاديمية STEM ومتدربة فضاء",
    specialtyEN: "Youth Education & Science Advocacy",
    specialtyAR: "إدارة برامج التعليم والعلوم المتقدمة للشباب",
    idCode: "ARAV-EDU-06",
    statusEN: "ACADEMY DIRECTING",
    statusAR: "إدارة الأكاديمية",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop",
    bioEN: "Coordinates the youth aerospace training programs and rover bootcamps, and prepares educational curricula that inspire future engineers throughout Jordan.",
    bioAR: "تنسق برامج التدريب وورش العمل التقنية للأكاديمية لتمكين المبتكرين لابتكار حلول للفضاء والعلوم المتقدمة."
  }
];


interface TeamsProps {
  isArabic: boolean;
}

export default function Teams({ isArabic }: TeamsProps) {
  const [activeDeptId, setActiveDeptId] = React.useState<string>('dept-board');

  React.useEffect(() => {
    const handleOpenTeam = (e: Event) => {
      const customEvent = e as CustomEvent<{ departmentId: string }>;
      if (customEvent.detail?.departmentId) {
        setActiveDeptId(customEvent.detail.departmentId);
      }
    };
    window.addEventListener('open-team', handleOpenTeam);
    return () => window.removeEventListener('open-team', handleOpenTeam);
  }, []);

  const selectedDept = DEPARTMENTS.find(d => d.id === activeDeptId) || DEPARTMENTS[0];

  return (
    <section id="teams" className="relative bg-transparent py-12 sm:py-16">
      
      {/* Structural layout decorations */}
      <div className="absolute top-1/2 left-10 w-80 h-80 rounded-full bg-brand-teal/[0.02] blur-3xl pointer-events-none" />

      <div className="w-[90%] mx-auto relative z-10">
        
        {/* Section title */}
        <ScrollReveal variant="clip" className="text-center max-w-3xl mx-auto mb-20">
          <span className="font-mono text-xs text-brand-teal font-bold tracking-widest uppercase block mb-3">
            {isArabic ? "الهيكل التنظيمي والتشغيلي للأبحاث" : "OPERATIONAL ORGANIGRAM"}
          </span>
          <h2 className="font-display font-medium text-3xl sm:text-5xl text-white tracking-tight uppercase">
            {isArabic ? (
              <>
                الأقسام والفرق <span className="text-brand-teal italic font-black">العلمية والتشغيلية</span>
              </>
            ) : (
              <>
                Departments & <span className="text-brand-teal font-black">STEM Squads</span>
              </>
            )}
          </h2>
          <div className="h-0.5 w-16 bg-brand-teal mx-auto mt-6" />
        </ScrollReveal>

        {/* Dynamic Organization Chart Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2">
          
          {/* Left panel: List of squads */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-3">
            <span className="text-neutral-500 font-mono text-[9px] uppercase tracking-widest block mb-1">
              {isArabic ? "تحديد القسم لاستكشاف المهام" : "DEPARTMENTS GRID // SELECT QUADRANT"}
            </span>

            {DEPARTMENTS.map((dept) => {
              const isActive = dept.id === activeDeptId;
              return (
                <button
                  key={dept.id}
                  onClick={() => setActiveDeptId(dept.id)}
                  className={`w-full text-left p-4 sm:p-5 rounded-xl border transition-all duration-300 cursor-pointer ${
                    isActive 
                    ? 'bg-[#1a1a1a] border-brand-teal/50 shadow-xl' 
                    : 'bg-neutral-950/40 border-neutral-900/60 text-neutral-400 hover:text-neutral-200 hover:border-neutral-800'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-display font-bold text-sm text-neutral-200 tracking-wider uppercase">
                        {isArabic ? dept.arabicName : dept.name}
                      </h4>
                      <span className="font-mono text-[9px] text-neutral-500 block mt-0.5">
                        CAPACITY: {dept.teamSize} OFFICERS
                      </span>
                    </div>
                    {isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-teal shadow-lg shadow-brand-teal" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right panel: Active Squad detailed inspection card */}
          <div className="lg:col-span-7 bg-neutral-900/10 border border-neutral-900/80 p-6 sm:p-10 rounded-2xl flex flex-col justify-between relative overflow-hidden">
            
            {/* Visual scanline container overlay */}

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedDept.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Header */}
                <div>
                  <span className="font-mono text-[9.5px] text-brand-teal tracking-widest uppercase bg-brand-teal/5 px-2.5 py-0.5 rounded border border-brand-teal/20 inline-block mb-3">
                    {selectedDept.id === 'dept-board' ? "GOVERNANCE BOARD" : 
                     selectedDept.id === 'dept-advisors' ? "SCIENTIFIC COUNCIL" :
                     selectedDept.id === 'dept-mission' ? "MISSION COMMAND" :
                     selectedDept.id === 'dept-marketing' ? "OUTREACH DIVISION" :
                     selectedDept.id === 'dept-eng' ? "FABRICATION DIVISION" :
                     selectedDept.id === 'dept-spacefood' ? "LIFE CLONE BOTANY" :
                     selectedDept.id === 'dept-rd' ? "SCIENCE BRANCH INDEX" :
                     selectedDept.id === 'dept-med' ? "LIFE SUPPORT MEDICAL" :
                     selectedDept.id === 'dept-tech' ? "SOFTWARE CYBER LAB" :
                     "ASTRONAUT SECTOR"}
                  </span>
                  
                  <div className="flex justify-between items-center">
                    <h3 className="font-display font-medium text-2xl sm:text-3xl text-white uppercase tracking-tight">
                      {isArabic ? selectedDept.arabicName : selectedDept.name}
                    </h3>
                  </div>
                </div>

                <p className="font-sans text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  {isArabic ? (
                    selectedDept.id === 'dept-board' ? "يتولى مجلس الأمناء ومسؤولو التأسيس التنسيق الاستراتيجي وتأمين الشراكات الدولية والمسار البعيد للأبحاث والتمويل والعمل السيادي لقطاع الفضاء." :
                    selectedDept.id === 'dept-advisors' ? "يضم المجلس كوكبة من خبراء الفضاء الدوليين وأساتذة الفيزياء والجيولوجيا الملتزمين بمراجعة جودة ومناهج الأبحاث والتحقق من دقة النتائج الهندسية والبعثات." :
                    selectedDept.id === 'dept-mission' ? "يسهم طاقم غرفة عمليات عمان في رصد البيانات الحيوية للمشاركين على مدار الساعة، ومطابقة النظم الملاحية وتدارك تحدي انقطاع الإشارات." :
                    selectedDept.id === 'dept-marketing' ? "إدارة الإعلام الرقمي وحملات التوعية وصياغة الوثائقيات من أجل نقل تجارب رواد الفضاء ووقائع الأكاديمية للمجتمع الدولي والشبابي." :
                    selectedDept.id === 'dept-eng' ? "يتولى الطاقم الهندسي تصنيع المعدات الميكانيكية وتجهيز عتاد المركبات وصهر هياكل التيتانيوم وصياغة بدلات الفضاء الأنالوج الشاملة." :
                    selectedDept.id === 'dept-spacefood' ? "أبحاث رائدة لإنتاج الأغذية الفضائية عالية القيمة والإنبات المائي والحلول البيولوجية الذاتية لتوليد الغذاء والهواء تحت العزل ومحاكاة النظم المغلقة." :
                    selectedDept.id === 'dept-rd' ? "يركّز الباحثون على كيمياء التربة البركانية وتحليل خصوبة الرمال ومقومات ري الغطاء النباتي المائي المغلق داخل المجمعات المخصصة." :
                    selectedDept.id === 'dept-med' ? "يتولى الطاقم الطبي مراقبة العلامات البيومترية وتقييم الحالة النفسية الناجمة عن الإجهاد وعزلة الفرق التدريبية والحرارة الصحراوية." :
                    selectedDept.id === 'dept-tech' ? "إعداد برمجيات مخصصة للتحكم بالاتصالات عن بعد وتلقي وإرسال الموجات اللاسلكية واستضافة أدوات الواقع الافتراضي EVA ولوحات التحكم المتقدمة." :
                    "تأسيس مفاهيم النجاة الأرضية والصحراوية وتحريك بدلات الفضاء تحت الضغط وحفظ اتزان الأطقم التدريبية وعقد المنافسات والمهمات وورش العمل الشاملة."
                  ) : selectedDept.description}
                </p>

                {/* Team Lead Profile Display */}
                {selectedDept.leadName && (
                  <div className="p-4 bg-neutral-950/80 border border-neutral-900/60 rounded-xl flex items-center gap-4">
                    <div className="p-3 bg-neutral-900/50 border border-neutral-800 rounded-lg text-brand-teal animate-pulse">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-mono text-[9px] text-neutral-500 block">SQUAD COMMANDER</span>
                      <h5 className="font-display font-bold text-xs text-white">
                        {isArabic ? (
                          selectedDept.id === 'dept-board' ? "الدكتور رائد كوار" :
                          selectedDept.id === 'dept-advisors' ? "الدكتورة شيلي برونزويك" :
                          selectedDept.id === 'dept-mission' ? "المهندسة فرح الشلبي" :
                          selectedDept.id === 'dept-marketing' ? "آية الساكت" :
                          selectedDept.id === 'dept-eng' ? "المهندسة نور الجعفري" :
                          selectedDept.id === 'dept-spacefood' ? "المهندسة سلمى النجار" :
                          selectedDept.id === 'dept-rd' ? "الدكتورة مايا طوقان" :
                          selectedDept.id === 'dept-med' ? "الدكتورة ليلى حداد" :
                          selectedDept.id === 'dept-tech' ? "المهندس ليث قوار" :
                          "الكابتن زين عبيدات"
                        ) : selectedDept.leadName}
                      </h5>
                      <span className="font-mono text-[10px] text-neutral-400">
                        {isArabic ? (
                          selectedDept.id === 'dept-board' ? "رئيس مجلس الأمناء والمؤسسين" :
                          selectedDept.id === 'dept-advisors' ? "مستشارة المجلس وخبير الفضاء الدولي" :
                          selectedDept.id === 'dept-mission' ? "مديرة العمليات والبحث الميداني" :
                          selectedDept.id === 'dept-marketing' ? "منسقة الإعلام والاتصال المجتمعي" :
                          selectedDept.id === 'dept-eng' ? "مهندسة ومصممة بدلات رواد الفضاء لعام 2025" :
                          selectedDept.id === 'dept-spacefood' ? "رئيسة أبحاث أنظمة تغذية الفضاء" :
                          selectedDept.id === 'dept-rd' ? "رئيسة أبحاث الكيمياء الحيوية والنمو" :
                          selectedDept.id === 'dept-med' ? "رئيسة اللجنة الطبية وصحة الطواقم" :
                          selectedDept.id === 'dept-tech' ? "مسؤول التكنولوجيا والأنظمة الرقمية" :
                          "كبير مدربي طواقم رواد الفضاء الأنالوج"
                        ) : selectedDept.leadRole}
                      </span>
                    </div>
                  </div>
                )}

                {/* Core focuses checkboxes */}
                <div className="space-y-3">
                  <h4 className="font-display font-bold text-xs text-neutral-400 tracking-wider uppercase">
                    {isArabic ? "المحاور الهندسية والبحثية الرئيسية" : "CORE SPECIALTIES"}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {selectedDept.coreFocus.map((focus, fIdx) => (
                      <div key={fIdx} className="p-3 rounded bg-neutral-950/50 border border-neutral-900/60 flex items-center space-x-2 text-[10px] sm:text-xs text-neutral-200 font-mono">
                        <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        <span>
                          {isArabic ? (
                            focus.includes('Strategic partner') || focus.includes('partner') ? "اتفاقيات الشراكات الاستراتيجية" :
                            focus.includes('growth') || focus.includes('growth') ? "النمو المؤسسي وبناء الموارد" :
                            focus.includes('diplomacy') ? "قنوات الدبلوماسية الفضائية الدولية" :
                            focus.includes('Multidisciplinary') || focus.includes('peer') ? "مراجعة علمية متعددة التخصّصات" :
                            focus.includes('syllabus') ? "معايرة ومواءمة المناهج التدريبية" :
                            focus.includes('pressure') || focus.includes('pressure safe') ? "التحقق من ضغوط الموائل الآمنة" :
                            focus.includes('signal') || focus.includes('latency') ? "تأخير زمني ٢٠ دقيقة" :
                            focus.includes('streams') || focus.includes('physiological telemetry') ? "معالجة البيانات الحيوية للمشاركين" :
                            focus.includes('vitals') || focus.includes('biometrics') ? "رصد العلامات الحيوية المنبهة" :
                            focus.includes('emergency') || focus.includes('protocols') ? "بروتوكولات الطوارئ الميدانية" :
                            focus.includes('documentary') || focus.includes('documentary production') ? "إنتاج الأفلام والوثائقيات الفضائية" :
                            focus.includes('flight log') ? "تقارير يوميات الرحلة الحيّة" :
                            focus.includes('local community') || focus.includes('aerospace events') ? "تنشيط الفعاليات المجتمعية الفضائية" :
                            focus.includes('Basalt-resistant') ? "عجلات مقاومة للرماد ومناخ وادي رم" :
                            focus.includes('Carbon-insulated') ? "عوازل حرارية لحماية الرواد" :
                            focus.includes('Modular') || focus.includes('habitat assembly') ? "تركيب غرف الموائل المعزولة" :
                            focus.includes('Closed food') || focus.includes('iteration') ? "حلقات إنتاج الغذاء التكرارية" :
                            focus.includes('bioregenerative') || focus.includes('hydroponics') ? "أبحاث الاستزراع المائي البيولوجي" :
                            focus.includes('dehydration') ? "تقنيات تجفيف الأغذية بالتفريغ" :
                            focus.includes('soil mineral') || focus.includes('mineral chemical') || focus.includes('Soil mineral') ? "فرز التكوينات والرمال البركانية" :
                            focus.includes('water retrieval') ? "استخلاص مياه التربة الجوفية" :
                            focus.includes('drill structural') || focus.includes('structural loads') ? "أحمال الحفر تحت ضغط الدّروع" :
                            focus.includes('EEG mapping') || focus.includes('vitals reading') ? "تخطيط الدماغ لقياس مستوى الإجهاد" :
                            focus.includes('vitamins') || focus.includes('hydration') || focus.includes('electrolyte') || focus.includes('sodium') ? "رصد ترطيب الأجسام ومستويات الصوديوم" :
                            focus.includes('evacuation') || focus.includes('evacuation tactics') ? "تكتيكات الإخلاء الطبي الفوري" :
                            focus.includes('communications') || focus.includes('Lora-mesh') ? "شبكات الاتصال الرملية اللاسلكية" :
                            focus.includes('anomalies') || focus.includes('alerts') ? "التحذير المبكر للمؤشرات الطارئة" :
                            focus.includes('simulators') ? "محاكيات الواقع الافتراضي EVA" :
                            focus.includes('pressurized suit') || focus.includes('locomotive') ? "حركة البدلات الضاغطة في وادي رم" :
                            focus.includes('survival') || focus.includes('extreme') ? "تكتيكات العيش في البيئات القاحلة" :
                            focus.includes('sample documentation') || focus.includes('geological sample') ? "بروتوكولات فرز وتصنيف عينات التربة" :
                            focus
                          ) : focus}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>

          </div>

        </div>

        {/* Divider segment */}
        <div className="relative py-16">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-neutral-900/40" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-[#111111] px-4 font-mono text-[9px] text-neutral-600 tracking-widest uppercase">
              {isArabic ? "الهيئة القيادية والتنفيذية للبعثة // SECURED ARCHIVE DATA" : "CORE EXPEDITION STAFF // SECURED ARCHIVE DATA"}
            </span>
          </div>
        </div>

        {/* Meet the Team Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="font-mono text-xs text-brand-teal font-bold tracking-widest uppercase block">
            {isArabic ? "الهيئة التأسيسية للمنظمة" : "THE MENA PIONEERS"}
          </span>
          <h3 className="font-display font-medium text-2xl sm:text-4xl text-white tracking-tight uppercase">
            {isArabic ? "قادة المهام والابتكار الفضائي" : "Our Core Team & Commanders"}
          </h3>
          <p className="font-sans text-xs sm:text-sm text-neutral-400 leading-relaxed">
            {isArabic 
              ? "مجموعة من المهندسات والمستشارين والخبراء العرب المكرسين لتمكين وتدريب المواهب الواعدة وبناء تكنولوجيا المحاكاة الرملية والتحكم من الأردن."
              : "An elite cohort of aerospace engineers, survival instructors, and researchers pioneering Jordan's path in deep-space analogues and STEM engagement."
            }
          </p>
        </div>

        {/* Premium Grid layout for Core Team */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {CORE_TEAM_MEMBERS.map((member) => (
            <div
              key={member.id}
              id={member.id}
              className="group relative bg-[#151515]/80 border border-neutral-900 hover:border-brand-teal/40 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-brand-teal/[0.02]"
            >
              <div className="space-y-5">
                
                {/* Visual Header card portion with portrait */}
                <div className="flex items-center gap-4">
                  
                  {/* Avatar wrapper with custom animated glowing ring */}
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border border-neutral-800 group-hover:border-brand-teal/60 transition-colors duration-300 flex-shrink-0">
                    <img
                      src={member.avatar}
                      alt={isArabic ? member.nameAR : member.nameEN}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-neutral-950/15 pointer-events-none" />
                  </div>

                  {/* Metadata and names block */}
                  <div className="space-y-1 flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-mono text-[8px] text-neutral-500 uppercase tracking-widest bg-neutral-900/60 border border-neutral-800/80 px-2 py-0.5 rounded truncate">
                        {member.idCode}
                      </span>
                      <span className="inline-flex items-center space-x-1 text-[8px] font-mono text-emerald-400 flex-shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="hidden xs:inline-block">{isArabic ? member.statusAR : member.statusEN}</span>
                      </span>
                    </div>

                    <h4 className="font-display font-medium text-sm sm:text-base text-white group-hover:text-brand-teal transition-colors duration-200 truncate">
                      {isArabic ? member.nameAR : member.nameEN}
                    </h4>
                    
                    <span className="block font-mono text-[9px] text-[#00A9A5] uppercase tracking-wider truncate">
                      {isArabic ? member.roleAR : member.roleEN}
                    </span>
                  </div>

                </div>

                {/* Micro specialty bar */}
                <div className="flex items-center gap-1.5 font-mono text-[9.5px] text-neutral-500 px-3 py-1 bg-[#1a1a1a]/40 border border-neutral-900 rounded-lg">
                  <Shield className="h-3 w-3 text-brand-teal" />
                  <span className="truncate uppercase">
                    {isArabic ? member.specialtyAR : member.specialtyEN}
                  </span>
                </div>

                {/* Biography detail statement */}
                <p className="font-sans text-xs text-neutral-400 leading-relaxed min-h-[50px]">
                  {isArabic ? member.bioAR : member.bioEN}
                </p>

              </div>

              {/* Bottom interactive card footers with simulated action socials */}
              <div className="flex items-center justify-between pt-4 mt-5 border-t border-neutral-900/60 text-neutral-500 text-xs font-mono">
                <span className="text-[9px] text-neutral-600">MENA_SPACE_AUTH // PIN_OK</span>
                
                <div className="flex items-center space-x-2.5 rtl:space-x-reverse">
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="p-1.5 rounded hover:bg-[#1a1a1a] text-neutral-500 hover:text-brand-teal border border-transparent hover:border-neutral-900 transition-all cursor-pointer"
                    aria-label="LinkedIn profile"
                  >
                    <Linkedin className="h-3.5 w-3.5" />
                  </a>
                  <a
                    href={`mailto:team@mena-space-analogue.org?subject=Inquiry to ${member.nameEN}`}
                    className="p-1.5 rounded hover:bg-[#1a1a1a] text-neutral-500 hover:text-brand-teal border border-transparent hover:border-neutral-900 transition-all cursor-pointer"
                    aria-label="Email contact"
                  >
                    <Mail className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

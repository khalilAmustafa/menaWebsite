import React from 'react';
import { motion } from 'motion/react';
import { Target, Lightbulb, Users, Sparkles } from 'lucide-react';
import { IMPACT_STATS } from '../data';
import ScrollReveal from './ScrollReveal';

interface AboutProps {
  isArabic: boolean;
}

export default function About({ isArabic }: AboutProps) {
  
  const missionPilars = [
    {
      icon: Target,
      title: "Analog Simulations",
      arabicTitle: "محاكاة الفضاء الصحراوية",
      desc: "Running high-fidelity mock Mars habitats in Jordan, testing youth-engineered survival suit telemetry.",
      arabicDesc: "إجراء تجارب ميدانية في بيئات معزولة تشبه المريخ، وتحدي الشباب الأردني في ابتكار بدلات وأنظمة معزولة."
    },
    {
      icon: Users,
      title: "Women-Led STEM Leadership",
      arabicTitle: "قيادة نسائية واعدة",
      desc: "Providing strong mentorship and professional frameworks for female and youth engineering pioneers.",
      arabicDesc: "تمكين ودعم الكوادر النسائية الهندسية في مجالات الميكانيكا والبرمجة وتحليل عينات التربة الاستكشافية."
    },
    {
      icon: Lightbulb,
      title: "Youth Tech Incubator",
      arabicTitle: "حاضنة للابتكار الشبابي",
      desc: "Fostering Jordan's high-potential engineering cadres through specialized aerospace design-build loops.",
      arabicDesc: "بناء وتصميم روفيرات استكشاف المريخ وتحديات الروبوتات وتأهيلها للعمل تحت الضغط البيئي القاسي."
    }
  ];

  return (
    <section id="about" className="relative bg-transparent py-12 sm:py-16">
      
      {/* Dark overlay at top to bridge seamlessly with the Hero section */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-space-dark/90 to-transparent pointer-events-none z-[1]" />

      {/* Absolute Ambient Background Lights in Brand Accent Tones */}
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-brand-teal/5 blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-brand-red/3 blur-3xl pointer-events-none" />

      <div className="w-[90%] mx-auto relative z-10">
        
        {/* Header Title with Custom Brand Accents */}
        <ScrollReveal variant="clip" className="text-center max-w-3xl mx-auto mb-20">
          <span className="font-mono text-xs text-brand-teal font-bold tracking-widest uppercase block mb-3">
            {isArabic ? "من نحن وماذا نمثل" : "COSMIC VISION HEROES"}
          </span>
          <h2 className="font-display font-medium text-3xl sm:text-5xl text-white tracking-tight uppercase">
            {isArabic ? (
              <>
                المؤسسة الأولى من نوعها <span className="text-brand-teal italic font-extrabold">بتمكين أردني ريادي</span>
              </>
            ) : (
              <>
                The First Women-Led <span className="text-brand-teal font-extrabold">Space Organization</span> in MENA
              </>
            )}
          </h2>
          <div className="h-0.5 w-16 bg-brand-teal mx-auto mt-6" />
        </ScrollReveal>
 
        {/* Narrative & Description Section Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-center mb-24">
          
          <ScrollReveal variant="fade-right" duration={0.8} className="space-y-6 text-left">
            <h3 className="font-display font-bold text-xl sm:text-2xl text-neutral-100 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-teal animate-pulse" />
              {isArabic ? "نبني جسور المستقبل في قلب الصحراء" : "A Space Venture Born in the Cradle of Wadi Rum"}
            </h3>
            
            <p className="font-sans text-neutral-300 text-sm sm:text-base leading-relaxed">
              {isArabic ? (
                "تأسست مؤسستنا كمنصة مستقلة للأبحاث والأنشطة العلمية والهندسية الفضائية في الأردن. نركز اهتمامنا على الاستفادة من التضاريس الجغرافية النادرة في صحراء وادي رم الأردنية - والتي تصنف عالميًا كأقرب منطقة من الناحية الجيولوجية لبيئة كوكب المريخ الأحمر."
              ) : (
                "MENA ORG was established to serve as an independent, high-standard space research powerhouse. By utilizing Jordan’s rare geological wonders in Wadi Rum—globally recognized as one of the most accurate Earth-analogs to the Martian topography—we give youth a realistic arena for aerospace training."
              )}
            </p>

            <p className="font-sans text-neutral-400 text-sm leading-relaxed">
              {isArabic ? (
                "لا يقتصر دورنا على محاكاة السفر للفضاء، بل نشرف على مختبرات الابتكار وهندسة بدلات الأنالوغ، وإقامة تحديات تصميم الروبوتات بالتعاون مع الجامعات والخبراء ومجالس المستشارين الدوليين لإنتاج جيل منافس ومبتكر."
              ) : (
                "We don't just simulate space travel; we build real systems. We coordinate complete telemetry streams under delay conditions, build physical hardware, design suit insulation panels, and prepare Arab students to compete on a global space-tech standard."
              )}
            </p>

            {/* Quote Box in official brand scheme */}
            <div className="p-5 rounded bg-neutral-900/45 border-l-4 border-brand-teal/80 font-mono text-xs tracking-wide text-neutral-300 leading-relaxed bg-[radial-gradient(ellipse_at_top_right,rgba(203,173,142,0.02),transparent)]">
              {isArabic ? (
                "\"الصحراء الأردنية مهد خصب للتحديات والصمود. نعمل على تحويل الرمال إلى مركب فسيح للاكتشاف والأبحاث الريادية الموجهة لخدمة البشرية واستدامتها.\""
              ) : (
                "\"The desert is our proving ground. We are converting the barren dunes of Jordan into an incredible laboratory to prepare humanity for interstellar travel and sustainable Earth agriculture.\""
              )}
            </div>
          </ScrollReveal>

          {/* Visual Pillars list */}
          <ScrollReveal variant="fade-left" duration={0.8} delay={0.15} className="space-y-4">
            {missionPilars.map((pilar, i) => {
              const Icon = pilar.icon;
              return (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.015, x: 4 }}
                  className="p-5 rounded-xl bg-neutral-900/60 border border-neutral-800/85 hover:border-brand-teal/30 transition-all duration-300 flex items-start gap-4"
                >
                  <div className="p-3 bg-neutral-950 rounded border border-neutral-800 text-brand-teal">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-neutral-100 uppercase tracking-wider">
                      {isArabic ? pilar.arabicTitle : pilar.title}
                    </h4>
                    <p className="font-sans text-xs text-neutral-400 mt-1.5 leading-relaxed">
                      {isArabic ? pilar.arabicDesc : pilar.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </ScrollReveal>

        </div>

        {/* Dynamic Impact Stats Grid */}
        <div className="pt-20 border-t border-neutral-900/40">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {IMPACT_STATS.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="group relative p-6 bg-neutral-900/30 hover:bg-neutral-900/60 border border-neutral-900/60 rounded-xl transition-all duration-300 text-center flex flex-col justify-between"
              >
                {/* Visual hover corner brackets mirroring our brand gradient */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-brand-teal/20 group-hover:border-brand-teal/80 transition-colors" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-brand-red/10 group-hover:border-brand-red/80 transition-colors" />
                
                <div className="mb-4">
                  <div className="font-display text-4xl sm:text-5xl font-black text-white hover:scale-105 transition-transform duration-300">
                    {stat.value}
                  </div>
                  <div className="font-display font-bold text-xs text-brand-teal tracking-wider uppercase mt-4 mb-2">
                    {isArabic ? (
                      i === 0 ? "الأولى في المنطقة" : i === 1 ? "خريج ريادي" : i === 2 ? "مهام محاكاة منسقة" : "مستشار دولي"
                    ) : stat.label}
                  </div>
                </div>

                <p className="font-sans text-xs text-neutral-400 leading-relaxed max-w-xs mx-auto">
                  {isArabic ? (
                    i === 0 ? "منظمة رائدة للأبحاث وتقنيات الفضاء تقودها كفاءات نسائية عربية رفيعة." :
                    i === 1 ? "طلاب وباحثين شباب شاركوا وأبهجونا ببدلات وفك ترميز روفيرات متميزة." :
                    i === 2 ? "تجربتان علميتان متكاملتان داخل صحراء وادي رم في الأردن ومراقبة بيومترية دقيقة." :
                    "خبراء وباحثون من كبرى كفاءات الفضاء ووكالات الفضاء العالمية."
                  ) : stat.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

    </section>
  );
}

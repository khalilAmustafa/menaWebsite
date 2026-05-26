import React from 'react';
import { GraduationCap } from 'lucide-react';
import { motion } from 'motion/react';
import { ADVISORS } from '../data';

interface AdvisoryProps {
  isArabic: boolean;
}

export default function Advisory({ isArabic }: AdvisoryProps) {
  return (
    <section id="advisors" className="relative bg-transparent py-12 sm:py-16">
      
      {/* Background ambient red glow */}
      <div className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full bg-[#C1442E]/[0.03] blur-3xl pointer-events-none" />

      <div className="w-[90%] mx-auto relative z-10">
        
        {/* Section title */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="font-mono text-xs text-brand-red font-bold tracking-widest uppercase block mb-3">
            {isArabic ? "العقل الأكاديمي والتحالفات الاستراتيجية" : "GLOBAL EXPERT SYNDICATE"}
          </span>
          <h2 className="font-display font-medium text-3xl sm:text-5xl text-white tracking-tight uppercase">
            {isArabic ? (
              <>
                مجلس المستشارين <span className="text-brand-teal italic font-black">العالمي للأبحاث</span>
              </>
            ) : (
              <>
                Scientific <span className="text-brand-teal font-black">Advisory Board</span>
              </>
            )}
          </h2>
          <div className="h-0.5 w-16 bg-brand-teal mx-auto mt-6" />
        </div>

        {/* Advisors Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ADVISORS.map((advisor, i) => (
            <motion.div
              key={advisor.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-neutral-900/25 hover:bg-neutral-900/50 border border-neutral-900/80 rounded-2xl p-6 flex flex-col justify-between hover:scale-101 hover:border-brand-teal/20 transition-all duration-300 shadow-xl"
            >
              <div>
                {/* Advisor Avatar Portrait */}
                <div className="relative w-14 h-14 rounded-full overflow-hidden border border-neutral-850 mb-5 shadow-lg">
                  <img
                    src={advisor.avatarUrl}
                    alt={advisor.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>

                {/* Name & Title */}
                <h4 className="font-display font-bold text-sm text-neutral-100 uppercase tracking-wider leading-tight">
                  {advisor.name}
                </h4>
                
                <span className="font-mono text-[9.5px] text-brand-teal tracking-wider block mt-1.5 uppercase font-medium">
                  {advisor.organization}
                </span>

                <span className="font-sans text-[10px] text-neutral-400 block mt-1">
                  {advisor.role}
                </span>

                <p className="font-sans text-xs text-neutral-500 mt-4 leading-relaxed">
                  {isArabic ? (
                    advisor.id === 'adv-1' ? "تعتبر رائدة في مجال سياسات الفضاء وتطوير المهارات القيادية للشباب العربي وبناء القدرات البحثية دوليًا." :
                    advisor.id === 'adv-2' ? "خبير ومستشار علمي لأبحاث الفضاء وهندسة الدروع الواقية ومقاومة الضغط والتآكل الرملي." :
                    advisor.id === 'adv-3' ? "رئيسة الدراسات والأبحاث الجيوفيزيائية في الجامعة الهاشمية وتصنيف تربة رم البركانية." :
                    "مستشار دولي في بيئة الأنالوج وتنسيق التوافق الحيوي للرحلات الممتدة."
                  ) : advisor.biography}
                </p>
              </div>

              {/* Specialization Pill footer */}
              <div className="mt-5 pt-3.5 border-t border-neutral-900/60 flex items-center gap-1.5 font-mono text-[9px] text-[#D8C3A5] tracking-wider uppercase">
                <GraduationCap className="w-3.5 h-3.5 text-neutral-500 flex-shrink-0" />
                <span>{isArabic ? "البحث العلمي والأنالوج" : advisor.specialty}</span>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

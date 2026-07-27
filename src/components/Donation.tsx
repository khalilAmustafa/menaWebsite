import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Radio, CheckCircle, Flame, Gift, Star } from 'lucide-react';
import { SUPPORT_TIERS, IMAGES } from '../data';

interface DonationProps {
  isArabic: boolean;
}

export default function Donation({ isArabic }: DonationProps) {
  const [selectedTierId, setSelectedTierId] = useState<string | null>(null);
  const [backedSuccess, setBackedSuccess] = useState<boolean>(false);

  const handleBackMission = (tierName: string) => {
    setSelectedTierId(tierName);
    setBackedSuccess(true);
    setTimeout(() => {
      setBackedSuccess(false);
      setSelectedTierId(null);
    }, 4000);
  };

  return (
    <section id="support" className="relative bg-transparent py-12 sm:py-16">
      
      {/* Absolute Ambient Background Stars */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(203,173,142,0.03),transparent_40%)]" />

      <div className="w-[90%] mx-auto relative z-10">
        
        {/* Core Emotional Storytelling Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          <div className="lg:col-span-7 space-y-5 text-left">
            <span className="font-mono text-xs text-brand-teal font-bold tracking-widest uppercase block">
              {isArabic ? "قائمة رعاية الطموح الفضائي" : "THE CITIZEN SCIENCE ALLIANCE"}
            </span>
            
            <h2 className="font-display font-medium text-3xl sm:text-5xl text-white tracking-tight uppercase">
              {isArabic ? (
                <>
                  نبني فرص المعرفة <span className="text-brand-teal italic font-black">في قلب الصحراء الأردنية</span>
                </>
              ) : (
                <>
                  We Are Building <span className="text-brand-teal font-black">Opportunity In The Desert</span>
                </>
              )}
            </h2>

            <p className="font-sans text-xs sm:text-sm text-neutral-400 leading-relaxed">
              {isArabic ? (
                "إن أبحاث الفضاء وتدريبات الأنالوغ وهندسة الأقمار الصناعية صناعة مكلفة. بتبرعك أو رعايتك لإحدى شارات مهامنا، تساهم في تمويل حساسات أجهزة بدتلات الفضاء وتغطية لوجستية طلاب المدارس القادمين من المحافظات للمشاركة في معامل الابتكار."
              ) : (
                "Space explorations and high-altitude analog sims require technical resources. By sponsoring a specific mission badge, you directly purchase sensor components for training suits, solar backup arrays for Wadi Rum geodesic labs, and cover travel subsidies for bright youth coming from rural Jordan governorates."
              )}
            </p>

            <div className="pt-4 flex flex-wrap gap-4 items-center">
              <div className="flex items-center space-x-2 bg-neutral-900/60 border border-neutral-900/80 px-4 py-2 rounded-lg font-mono text-[11px] text-neutral-300">
                <Star className="w-4 h-4 text-brand-teal" />
                <span>100% DIRECT HARDWARE FUNDING</span>
              </div>
              <div className="flex items-center space-x-2 bg-neutral-900/60 border border-neutral-900/80 px-4 py-2 rounded-lg font-mono text-[11px] text-neutral-300">
                <Radio className="w-4 h-4 text-brand-red animate-pulse" />
                <span>ACTIVE AUDITABLE REPORTS</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative group">
            {/* Visual background image of a space dome */}
            <div className="relative aspect-video lg:aspect-square rounded-2xl overflow-hidden border border-neutral-900/80 shadow-2xl">
              <img
                src={IMAGES.missionControl || IMAGES.hero}
                alt="Support Opportunity in Jordan Mars Analog"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 filter brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="absolute bottom-4 left-4 font-mono text-[10px] text-white/80 bg-black/75 px-3 py-1.5 rounded-lg border border-neutral-850 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-brand-teal" />
                <span>Rum Dome Alpha Solar Grid</span>
              </div>
            </div>
          </div>

        </div>

        {/* 2. Interactive Badges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SUPPORT_TIERS.map((tier) => (
            <div
              key={tier.id}
              className="p-6 sm:p-8 rounded-2xl border border-neutral-900 bg-neutral-900/15 hover:border-brand-teal/40 transition-all duration-300 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="font-mono text-[9px] text-neutral-500 block">BADGE INDEX</span>
                    <span className="font-mono text-xs font-bold text-white tracking-widest bg-neutral-950 px-2.5 py-0.5 rounded-lg border border-neutral-850">
                      [{tier.badgeName}]
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-xs text-brand-teal block uppercase tracking-wider">SPONSOR VOTE</span>
                    <span className="font-display text-2xl sm:text-3xl font-black text-white">{tier.price}</span>
                  </div>
                </div>

                <h3 className="font-display font-bold text-sm sm:text-base text-neutral-100 uppercase tracking-wider mb-2">
                  {isArabic ? (
                    tier.id === 'tier-scout' ? "شارح كشاف الصحراء" :
                    tier.id === 'tier-engineer' ? "مهندس درع القبة" :
                    "قائد بعثات الأنالوج"
                  ) : tier.name}
                </h3>

                <p className="font-sans text-xs text-neutral-400 mb-6 leading-relaxed">
                  {isArabic ? (
                    tier.id === 'tier-scout' ? "دعم معدات الملاحة وتثبيت حساس الرطوبة والاتصالات على الروفر بترا." :
                    tier.id === 'tier-engineer' ? "دعم صيانة قنوات التبخر وتوليد الأكسجين وإضاءة القبة الكسورية في وادي رم." :
                    "رعاية علمية متكاملة لبدلات الفضاء وحافز رواد المحاكاة وربطهم بغرفة تحكم عمان."
                  ) : tier.tagline}
                </p>

                {/* Perks checkboxes */}
                <div className="space-y-2 border-t border-neutral-900/40 pt-4 mb-8">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase block tracking-wider mb-1.5 animate-pulse">
                    {isArabic ? "المميزات المكتسبة للمستضيف" : "MEMBERSHIP PERKS"}
                  </span>
                  {tier.perks.map((perk, pIdx) => (
                    <div key={pIdx} className="flex items-start text-[11px] font-sans text-neutral-300">
                      <CheckCircle className="w-3.5 h-3.5 text-brand-teal mr-1.5 mt-0.5 flex-shrink-0" />
                      <span>
                        {isArabic ? (
                          perk.includes('Arabic Calligraphy') ? "شهادة مشاركة رقمية ممهورة بختم خط عربي تذكاري" :
                          perk.includes('Petra-1 Rover') ? "تسجيل اسمك على هيكل روفر بترا-١ الخارجي" :
                          perk.includes('flight log') ? "تقارير ويوميات الطاقم العلمية من وادي رم" :
                          perk.includes('Mission Patch') ? "رقعة قماشية رسمية موقعة من رواد مريخ الأردن" :
                          perk.includes('Finals') ? "دعوة كبار الشخصيات لحضور نهائيات مسابقة الروفر" :
                          perk.includes('machined metal') ? "درع وبادج تذكاري معدني فاخر ١:١" :
                          perk.includes('sit in Mission') ? "دعوة للجلوس في غرفة عمليات عمان لتتبع الرصد المباشر للبعثة" :
                          "عرض اسمك وشعارك كجهة راعية رئيسية في الصفحة الرسمية للمنظمة"
                        ) : perk}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <button
                  onClick={() => handleBackMission(tier.name)}
                  className="w-full py-3 rounded-lg bg-space-dark/80 hover:bg-space-dark/95 border border-neutral-800 hover:border-brand-teal/50 text-[10px] sm:text-xs font-mono tracking-widest text-brand-beige font-bold transition-all cursor-pointer"
                >
                  {isArabic ? "رعاية شارة المهمة" : "SPONSOR THIS BADGE"}
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Dynamic Backing Success Toast prompt popup */}
      <AnimatePresence>
        {backedSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            className="fixed bottom-6 right-6 z-50 p-5 rounded-2xl border border-emerald-500/30 bg-neutral-950 max-w-sm shadow-2xl flex items-start gap-3.5"
          >
            <div className="p-2 bg-emerald-950/80 border border-emerald-500/20 text-emerald-400 rounded-lg">
              <Gift className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <h5 className="font-display font-black text-xs text-white uppercase tracking-wider">
                {isArabic ? "تم استلام طلب الرعاية!" : "MISSION BADGE RESERVED!"}
              </h5>
              <p className="font-sans text-[11px] text-neutral-400 mt-1">
                {isArabic 
                  ? `شكراً لدعمك مهمة ${selectedTierId}! تم ربط اسمك بنظام تتبع روفير بترا-١.`
                  : `Thank you for backing ${selectedTierId}! A telemetry badge assignment certificate has been designated to your parameters.`
                }
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}

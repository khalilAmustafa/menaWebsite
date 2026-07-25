import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Calendar, MapPin, X, ChevronLeft, ChevronRight, Maximize2, Sparkles, SlidersHorizontal } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

interface GalleryItem {
  id: string;
  image: string;
  titleEN: string;
  titleAR: string;
  descEN: string;
  descAR: string;
  category: 'crew' | 'habitat' | 'equipment' | 'scenery';
  locationEN: string;
  locationAR: string;
  mission: string;
  date: string;
}

const GALLERY_DATA: GalleryItem[] = [
  {
    id: "gal-1",
    image: "/images/mena_wadi_rum_eva_1779552903767.png",
    titleEN: "Astronaut EVA Field Exploration",
    titleAR: "مهمة الخروج الميداني لرواد الفضاء",
    descEN: "Physiological strain evaluation under simulated sandstorm and high communication latency.",
    descAR: "تقييم الإجهاد الفسيولوجي والمرونة النفسية للرواد تحت ظروف عاصفة غبارية افتراضية وتأخير اتصال.",
    category: "crew",
    locationEN: "Wadi Rum Desert Basin",
    locationAR: "حوض صحراء وادي رم",
    mission: "ARAV-I",
    date: "NOV 2024"
  },
  {
    id: "gal-2",
    image: "/images/mena_suit_engineering_1779552864607.png",
    titleEN: "Suit Pressurization Check",
    titleAR: "فحص ضغط واستقرار البدلات",
    descEN: "Telemetry verification and helmet seal pressure testing at Amman fabrication warehouse.",
    descAR: "معايرة أنظمة القياس عن بعد والضغط المغلق لخوذ البدلات في الحيز الصناعي بعمان.",
    category: "equipment",
    locationEN: "Amman Innovation Hub",
    locationAR: "مقر الابتكار، عمان",
    mission: "ARAV-I",
    date: "OCT 2024"
  },
  {
    id: "gal-3",
    image: "/images/mena_mission_control_1779552881676.png",
    titleEN: "Amman Mission Control Uplink",
    titleAR: "غرفة التحكم المركزي في عمان",
    descEN: "Live parsing of crew bio-telemetry, habitability metrics, and active life support status.",
    descAR: "التحليل الفوري للمؤشرات الحيوية لطاقم المهمة، وحسابات الدعم وعزل قمرة الصعود.",
    category: "habitat",
    locationEN: "Command Center HQ",
    locationAR: "مركز العمليات الفضائية",
    mission: "ARAV-II",
    date: "MAR 2025"
  },
  {
    id: "gal-4",
    image: "/images/mena_mars_hero_1779552846305.png",
    titleEN: "Dome Alpha Sanctuary at Dusk",
    titleAR: "مستوطنة القبة ألفا عند الغروب",
    descEN: "Isolated geodesic structures designed to mitigate heavy dust accumulation and thermal swings.",
    descAR: "الهيكل الجيوديسي المتقدم لعزل الحرارة الشديدة ومنع تغلغل دقائق الغبار الدقيقة بالصحراء.",
    category: "habitat",
    locationEN: "Al-Disah Martian Plain",
    locationAR: "سهل رمال الديسة",
    mission: "ARAV-I",
    date: "NOV 2024"
  },
  {
    id: "gal-5",
    image: "/images/mars_astronaut_hero_1779558754887.png",
    titleEN: "Sunset Landscape Survey",
    titleAR: "مسح طبيعة المريخ عند الأفق",
    descEN: "Analog commander scouting a geological trench during deep sunset EVA operations.",
    descAR: "قائد المهمة في جولة رصد جيولوجي واستكشاف للطبقات الصخرية بوادي رم قبيل غسق المريخ.",
    category: "crew",
    locationEN: "Southern Valley Foothills",
    locationAR: "سلسلة جبال الوادي الجنوبي",
    mission: "ARAV-III",
    date: "OCT 2026"
  },
  {
    id: "gal-6",
    image: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=1200&fit=crop",
    titleEN: "Petra-1 System Calibration",
    titleAR: "معايرة ريزرفور المسبار بترا-1",
    descEN: "Micro-rover communications and sample acquisition system analysis on high angle slopes.",
    descAR: "تحليل كفاءة القيادة وعقد الاتصال لمسبار بترا-1 على المنحدرات الصخرية الشديدة.",
    category: "equipment",
    locationEN: "Amman Robotics Base",
    locationAR: "مقر الروبوتات والأنظمة",
    mission: "ARAV-II",
    date: "FEB 2025"
  },
  {
    id: "gal-7",
    image: "https://images.unsplash.com/photo-1547234935-80c7145ec969?q=80&w=1200&fit=crop",
    titleEN: "Basalt Geological Indexing",
    titleAR: "فهرسة وتصنيف صخور البازلت",
    descEN: "Cataloging mineral compositions from iron-rich canyons and dusty ancient dry basins.",
    descAR: "تصنيف المكونات المعدنية والخصائص الكيميائية للصخور الغنية بالحديد لربطها بالتربة المريخية.",
    category: "scenery",
    locationEN: "Wadi Rum Basalt Canyons",
    locationAR: "أخاديد البازلت بوادي رم",
    mission: "ARAV-I",
    date: "NOV 2024"
  },
  {
    id: "gal-8",
    image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200&fit=crop",
    titleEN: "Closed-Loop Hydro-Systems",
    titleAR: "أنظمة الزراعة المائية المعزولة",
    descEN: "Testing automated water loops and bio-reclamation yield efficiency under strict rationing rules.",
    descAR: "دراسة الدورة المائية الذاتية والمحاصيل الغذائية المعزولة داخل المختبر الحيوي التابع لـ ARAV-II.",
    category: "habitat",
    locationEN: "Dome Alpha Bio-lab",
    locationAR: "مختبر غطاء الحياة، القبة م1",
    mission: "ARAV-II",
    date: "APR 2025"
  }
];

interface MissionGalleryProps {
  isArabic: boolean;
}

export default function MissionGallery({ isArabic }: MissionGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeItemIndex === null) return;
      if (e.key === 'Escape') {
        setActiveItemIndex(null);
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeItemIndex]);

  const categories = [
    { id: 'all', nameEN: 'All Missions Archive', nameAR: 'كامل أرشيف المهام' },
    { id: 'crew', nameEN: 'Crew & EVA', nameAR: 'الرواد والطلعات الميدانية' },
    { id: 'habitat', nameEN: 'Habitat & Operations', nameAR: 'المستوطنة والمقرات' },
    { id: 'equipment', nameEN: 'Systems & Equipment', nameAR: 'الأنظمة والبدلات المبتكرة' },
    { id: 'scenery', nameEN: 'Basalt Landscapes', nameAR: 'الجيولوجيا والمناظر الطبيعية' }
  ];

  // Filtering list based on user selections
  const filteredItems = selectedCategory === 'all'
    ? GALLERY_DATA
    : GALLERY_DATA.filter(item => item.category === selectedCategory);

  const handlePrev = () => {
    if (activeItemIndex === null) return;
    const prevIndex = activeItemIndex === 0 ? filteredItems.length - 1 : activeItemIndex - 1;
    setActiveItemIndex(prevIndex);
  };

  const handleNext = () => {
    if (activeItemIndex === null) return;
    const nextIndex = activeItemIndex === filteredItems.length - 1 ? 0 : activeItemIndex + 1;
    setActiveItemIndex(nextIndex);
  };

  return (
    <section id="gallery" className="relative bg-transparent py-12 sm:py-16 scroll-mt-10 z-10">
      
      {/* Planetary Atmosphere Glow Backdrops */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-brand-teal/[0.02] blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-96 h-96 rounded-full bg-brand-red/[0.015] blur-3xl pointer-events-none" />

      <div className="w-[90%] mx-auto relative z-10">
        
         {/* Header telemetry blocks */}
        <ScrollReveal variant="clip" className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 text-[10px] font-mono text-brand-teal tracking-wider uppercase">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-brand-teal opacity-50 animate-pulse"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-teal"></span>
              </span>
              <span>{isArabic ? "قاعدة بيانات الصور المسجلة للبعثة" : "ACTIVE VISUAL LOG ARCHIVE"}</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-display font-medium text-white tracking-tight uppercase">
              {isArabic ? "معرض صور محاكاة المريخ الميدانية" : "Analog Field Operations Gallery"}
            </h2>
            
            <p className="max-w-2xl text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed">
              {isArabic 
                ? "سجل مرئي لمهام رواد الفضاء العرب ومحاكاة الاستكشاف الجيولوجي وأنظمة دعم الحياة في صحاري وادي رم ومختبر التكنولوجيا بتقديم أسلوب سينمائي."
                : "A visual deep-dive and archived log capturing real analog astronaut EVAs, basalt excavation protocols, spaceship interior mocks, and youth aerospace training programs in Jordan."
              }
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="hidden lg:grid grid-cols-2 gap-4 font-mono text-[9px] text-neutral-500 bg-neutral-900/30 border border-neutral-900/60 p-4 rounded">
            <div>
              <span className="block text-neutral-600 uppercase">{isArabic ? "إجمالي اللقطات النشطة:" : "ACTIVE CAPTURES:"}</span>
              <span className="text-brand-teal font-bold text-xs">08 INTERDISCIPLINARY</span>
            </div>
            <div>
              <span className="block text-neutral-600 uppercase">{isArabic ? "ترميز الأرشيف:" : "ARCHIVE CLASSIF:"}</span>
              <span className="text-brand-beige font-bold text-xs">UNCLASS_PUBLIC_AAMA</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Category Filters */}
        <ScrollReveal variant="fade-up" delay={0.1} className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-neutral-900/40">
          <div className="flex items-center space-x-2 text-neutral-500 mr-2 rtl:ml-2">
            <SlidersHorizontal className="h-3 w-3" />
            <span className="text-[10px] font-mono uppercase tracking-wider">{isArabic ? "تصفية:" : "Filter:"}</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                id={`cat-btn-${cat.id}`}
                className={`px-3 sm:px-4 py-1.5 rounded font-mono text-[10px] sm:text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer border ${
                  selectedCategory === cat.id
                    ? 'bg-brand-teal/10 border-brand-teal/50 text-brand-teal shadow-sm shadow-brand-teal/5'
                    : 'bg-neutral-900/40 border-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-900 hover:border-neutral-800'
                }`}
              >
                {isArabic ? cat.nameAR : cat.nameEN}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Interactive Responsive Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => {
              // Find the true index in original array for the lightbox pointer
              const globalIndex = GALLERY_DATA.findIndex(g => g.id === item.id);
              
              return (
                <ScrollReveal
                  key={item.id}
                  variant="scale"
                  delay={(index % 4) * 0.08}
                  threshold={0.05}
                >
                  <motion.div
                    id={`gallery-item-${item.id}`}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => setActiveItemIndex(globalIndex)}
                    className="group relative bg-space-raised border border-neutral-900 hover:border-neutral-800/80 rounded-xl overflow-hidden cursor-pointer shadow-md transition-all duration-300 transform hover:-translate-y-1 h-full"
                  >
                    {/* Aspect Ratio Box Wrapper */}
                    <div className="relative aspect-md overflow-hidden">
                      <img
                        src={item.image}
                        alt={isArabic ? item.titleAR : item.titleEN}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-107 filter brightness-95 group-hover:brightness-100"
                      />
                      
                      {/* Dark Shadow Mask Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent opacity-75 group-hover:opacity-60 transition-opacity pointer-events-none" />
                      
                      {/* Top right quick-tags */}
                      <div className="absolute top-3 right-3 flex items-center space-x-1.5 bg-neutral-950/75 border border-neutral-800 backdrop-blur-md px-2 py-1 rounded">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-teal animate-pulse" />
                        <span className="font-mono text-[8px] tracking-widest text-brand-teal">{item.mission}</span>
                      </div>

                      {/* Left Center Hover Scale Icon Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none duration-300">
                        <div className="p-2.5 rounded-full bg-brand-teal/80 text-black backdrop-blur-xs scale-90 group-hover:scale-100 transition-transform duration-300">
                          <Maximize2 className="h-4 w-4" />
                        </div>
                      </div>
                    </div>

                    {/* Operational Telemetry Details */}
                    <div className="p-4 space-y-2 bg-neutral-900/20">
                      <div className="flex items-center justify-between font-mono text-[9px] text-neutral-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-2.5 w-2.5 text-brand-teal" />
                          {item.date}
                        </span>
                        <span className="px-1.5 py-0.5 bg-neutral-900 border border-neutral-800 text-[8px] text-brand-beige rounded uppercase">
                          {item.category}
                        </span>
                      </div>

                      <h3 className="font-display font-medium text-sm text-neutral-100 line-clamp-1 group-hover:text-brand-teal transition-colors duration-200">
                        {isArabic ? item.titleAR : item.titleEN}
                      </h3>
                      
                      <p className="font-sans text-[11px] text-neutral-400 leading-relaxed line-clamp-2">
                        {isArabic ? item.descAR : item.descEN}
                      </p>

                      <div className="flex items-center gap-1 font-mono text-[9px] text-neutral-500 pt-1.5 border-t border-neutral-900">
                        <MapPin className="h-2.5 w-2.5 text-brand-red" />
                        <span className="truncate">{isArabic ? item.locationAR : item.locationEN}</span>
                      </div>
                    </div>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty state protection */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16 border border-dashed border-neutral-900 rounded-xl bg-neutral-900/10">
            <span className="font-mono text-xs text-neutral-500 block mb-2">TELEMETRY SECURE // NO MATCHES FOUND</span>
            <p className="text-xs text-neutral-400">{isArabic ? "يرجى اختيار فئة تصفية أخرى لاستعراض الأرشيف." : "Please select another catalog folder above."}</p>
          </div>
        )}

      </div>

      {/* Lightbox Overlay Component */}
      <AnimatePresence>
        {activeItemIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            id="lightbox-backdrop"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-6 md:p-10 select-none overflow-y-auto"
          >
            {/* Dark Starry background subtle details inside overlay */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,rgba(203,173,142,0.08),transparent_80%)] pointer-events-none" />

            {/* Header Telemetry Line across the top */}
            <div className="absolute top-4 inset-x-0 px-6 sm:px-10 flex items-center justify-between text-neutral-500 font-mono text-[10px] border-b border-neutral-900/30 pb-4">
              <span className="flex items-center gap-2">
                <Sparkles className="h-3 w-3 text-brand-teal animate-pulse" />
                <span>{isArabic ? "نظام استعراض الأرشيف المرئي (AAMA)" : "ARABIC ANALOG ARCHIVE VIEWPORT"}</span>
              </span>
              <span className="hidden sm:inline-block">FILE: IMG_0{activeItemIndex + 1}_V2.RAW</span>
            </div>

            {/* Right-aligned close button */}
            <button
              onClick={() => setActiveItemIndex(null)}
              id="close-lightbox-btn"
              className="absolute top-4 right-4 sm:right-6 p-2 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-800 transition-all cursor-pointer z-50"
              aria-label="Close lightbox"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Main Interactive Stage Container */}
            <div className="relative w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-center justify-center pt-10 sm:pt-6">
              
              {/* Image Column */}
              <div className="relative lg:col-span-8 flex items-center justify-center group/stage">
                
                {/* Previous Button Left */}
                <button
                  onClick={handlePrev}
                  id="lightbox-prev-btn"
                  className="absolute left-2 sm:left-4 z-40 p-2 text-white bg-neutral-950/60 hover:bg-brand-teal/80 border border-neutral-800 hover:border-brand-teal rounded-full filter backdrop-blur-xs transition-all active:scale-95 cursor-pointer opacity-80 hover:opacity-100"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                {/* Main Image View */}
                <motion.div
                  key={activeItemIndex}
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="relative max-h-[60vh] sm:max-h-[70vh] rounded-xl overflow-hidden border border-neutral-800 shadow-2xl"
                >
                  <img
                    src={GALLERY_DATA[activeItemIndex].image}
                    alt={isArabic ? GALLERY_DATA[activeItemIndex].titleAR : GALLERY_DATA[activeItemIndex].titleEN}
                    referrerPolicy="no-referrer"
                    className="max-h-[60vh] sm:max-h-[70vh] w-auto object-contain bg-neutral-950 pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />
                </motion.div>

                {/* Next Button Right */}
                <button
                  onClick={handleNext}
                  id="lightbox-next-btn"
                  className="absolute right-2 sm:right-4 z-40 p-2 text-white bg-neutral-950/60 hover:bg-brand-teal/80 border border-neutral-800 hover:border-brand-teal rounded-full filter backdrop-blur-xs transition-all active:scale-95 cursor-pointer opacity-80 hover:opacity-100"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              {/* Informational Column */}
              <div className="lg:col-span-4 p-5 sm:p-6 bg-neutral-900/60 border border-neutral-850 rounded-xl backdrop-blur-md space-y-4 self-center">
                
                {/* Meta Header */}
                <div className="pb-3 border-b border-neutral-800 space-y-1">
                  <span className="px-2 py-0.5 bg-brand-teal/10 border border-brand-teal/20 text-[9px] font-mono text-brand-teal tracking-wider uppercase rounded inline-block">
                    {GALLERY_DATA[activeItemIndex].mission} // MISSION LOG
                  </span>
                  <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500 pt-1">
                    <span>INDEX: 0{activeItemIndex + 1} OF 0{GALLERY_DATA.length}</span>
                    <span className="capitalize">{GALLERY_DATA[activeItemIndex].category}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-display font-medium text-lg text-white leading-snug tracking-tight">
                  {isArabic ? GALLERY_DATA[activeItemIndex].titleAR : GALLERY_DATA[activeItemIndex].titleEN}
                </h3>

                {/* Description */}
                <p className="font-sans text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  {isArabic ? GALLERY_DATA[activeItemIndex].descAR : GALLERY_DATA[activeItemIndex].descEN}
                </p>

                {/* Telemetry metadata rows */}
                <div className="pt-4 border-t border-neutral-800 space-y-2.5 font-mono text-[10px] text-neutral-400">
                  <div className="flex justify-between items-center py-1 border-b border-neutral-900">
                    <span className="text-neutral-500 flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-brand-teal" />
                      {isArabic ? "الموقع الجغرافي" : "GEOGRAPHIC LOC"}
                    </span>
                    <span className="text-neutral-200">
                      {isArabic ? GALLERY_DATA[activeItemIndex].locationAR : GALLERY_DATA[activeItemIndex].locationEN}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-1 border-b border-neutral-900">
                    <span className="text-neutral-500 flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-brand-teal" />
                      {isArabic ? "تاريخ الالتقاط" : "STATED TIME"}
                    </span>
                    <span className="text-neutral-200">{GALLERY_DATA[activeItemIndex].date}</span>
                  </div>

                  <div className="flex justify-between items-center py-1">
                    <span className="text-neutral-500 flex items-center gap-1">
                      <Camera className="h-3 w-3 text-brand-teal" />
                      {isArabic ? "المستشعر ونظام الكاميرا" : "IMAGING SENSOR"}
                    </span>
                    <span className="text-neutral-200">DOME_EYE_REPROx4</span>
                  </div>
                </div>

                {/* Action button inside lightbox to exit */}
                <button
                  onClick={() => setActiveItemIndex(null)}
                  id="lightbox-primary-exit-btn"
                  className="w-full py-2 bg-neutral-950 hover:bg-neutral-900 text-neutral-300 hover:text-white font-mono text-[10px] tracking-wider uppercase border border-neutral-800 hover:border-neutral-700 rounded transition-all cursor-pointer"
                >
                  {isArabic ? "إغلاق لوحة العرض" : "Close Viewport Window"}
                </button>

              </div>

            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

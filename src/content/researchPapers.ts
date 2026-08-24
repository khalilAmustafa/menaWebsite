import type { ConferenceInfo, ResearchPaper } from './types';

/**
 * Confirmed accepted conference edition for this body of MENA research.
 * (Approved: IAC 2026 – Antalya, Türkiye.)
 */
export const IAC_2026: ConferenceInfo = {
  name: 'International Astronautical Congress (IAC)',
  nameAr: 'المؤتمر الدولي للملاحة الفضائية (IAC)',
  edition: 'IAC 2026',
  location: 'Antalya, Türkiye',
  locationAr: 'أنطاليا، تركيا',
  year: 2026,
};

/**
 * Confirmed research papers — exactly ONE record per unique title (the source listed papers
 * repeated under each author). `authors` contains only source-confirmed authors; no
 * co-authors are inferred. `abstract`, `category`, `publicationStatus`, `gallery`,
 * `relatedTeamMemberIds`, and `externalLinks` are intentionally left undefined because they
 * were not supplied. `GLOBAL TECHNICAL SYMPOSIUM` is deliberately not included because its
 * source material is ambiguous.
 */
export const RESEARCH_PAPERS: ResearchPaper[] = [
  {
    id: 'rp-small-satellite-drought',
    slug: 'small-satellite-drought-prediction',
    title: {
      en: 'A Small Satellite Constellation for Early Drought Prediction and Sustainable Water Management: An Innovative CubeSat-Based Approach',
      ar: 'كوكبة أقمار صناعية صغيرة للتنبؤ المبكر بالجفاف والإدارة المستدامة للمياه: نهج مبتكر قائم على أقمار كيوب سات',
    },
    authors: [{ name: 'Majd Alsadi', nameAr: 'مجد السعدي' }, { name: 'Lamia Shaheen', nameAr: 'لمياء شاهين' }],
    conference: IAC_2026,
    year: 2026,
  },
  {
    id: 'rp-successful-space-program',
    slug: 'successful-space-program-quality-safety',
    title: { en: 'A Successful Space Program (Quality and Safety)', ar: 'برنامج فضائي ناجح: الجودة والسلامة' },
    authors: [{ name: 'Majd Alsadi', nameAr: 'مجد السعدي' }, { name: 'Lamia Shaheen', nameAr: 'لمياء شاهين' }],
    conference: IAC_2026,
    year: 2026,
  },
  {
    id: 'rp-cyber-security-threats',
    slug: 'cyber-security-threats-space-missions',
    title: {
      en: 'Cyber-Based Security Threats to Space Missions: Establishing the Legal, Institutional and Collaborative Framework to Counteract Them',
      ar: 'تهديدات الأمن السيبراني للبعثات الفضائية: تأسيس إطار قانوني ومؤسسي وتعاوني لمواجهتها',
    },
    authors: [{ name: 'Majd Alsadi', nameAr: 'مجد السعدي' }, { name: 'Sarah Alshaqaqi', nameAr: 'سارة الشقاقي' }],
    conference: IAC_2026,
    year: 2026,
  },
  {
    id: 'rp-solar-regolith-isru',
    slug: 'solar-regolith-hybrid-isru-mars',
    title: {
      en: 'A Robust Solar-Regolith Hybrid ISRU Architecture for Methane Production via Raw Atmospheric Intake and Subsurface Water Mining on Mars',
      ar: 'بنية هجينة متينة تجمع الطاقة الشمسية والثرى لاستخدام الموارد في الموقع وإنتاج الميثان عبر سحب الغلاف الجوي الخام واستخراج المياه الجوفية على المريخ',
    },
    authors: [{ name: 'Osaid Alhaimour', nameAr: 'أسيد الحيمور' }, { name: 'Shahed Alshab', nameAr: 'شهد الشاب' }, { name: 'Ahmad Alrbaidi', nameAr: 'أحمد الربايدي' }],
    conference: IAC_2026,
    year: 2026,
  },
  {
    id: 'rp-distributed-ion-thrusters',
    slug: 'distributed-ion-thruster-arrays',
    title: {
      en: 'Distributed Ion Thruster Arrays for Scalable and Fault-Tolerant Electric Propulsion Systems',
      ar: 'مصفوفات موزّعة من الدافعات الأيونية لأنظمة دفع كهربائي قابلة للتوسع ومتحمّلة للأعطال',
    },
    authors: [{ name: 'Osaid Alhaimour', nameAr: 'أسيد الحيمور' }, { name: 'Shahed Alshab', nameAr: 'شهد الشاب' }, { name: 'Ahmad Alrbaidi', nameAr: 'أحمد الربايدي' }],
    conference: IAC_2026,
    year: 2026,
  },
  {
    id: 'rp-martian-habitat-energy',
    slug: 'martian-habitat-energy-architecture',
    title: {
      en: 'Resilience-Oriented Energy Architecture for a 4–5 Crew Sustained Martian Habitat: Hybrid Storage and Autonomous Power Management',
      ar: 'بنية طاقة مرنة لموئل مريخي مستدام لطاقم من 4–5 أفراد: تخزين هجين وإدارة ذاتية للطاقة',
    },
    authors: [{ name: 'Osaid Alhaimour', nameAr: 'أسيد الحيمور' }, { name: 'Shahed Alshab', nameAr: 'شهد الشاب' }, { name: 'Ahmad Alrbaidi', nameAr: 'أحمد الربايدي' }],
    conference: IAC_2026,
    year: 2026,
  },
  {
    id: 'rp-hydroponic-tower',
    slug: 'hydroponic-tower-mars-analog',
    title: {
      en: 'Hands-On Hydroponic Tower Feeds 5 Mars Analog Astronauts: Desert-Tested for MENA Farms',
      ar: 'برج زراعة مائية عملي يزوّد خمسة رواد محاكاة للمريخ بالغذاء: مُختبر في الصحراء لمزارع منطقة الشرق الأوسط وشمال أفريقيا',
    },
    authors: [{ name: 'Murad Alkharabsheh', nameAr: 'مراد الخرابشة' }],
    conference: IAC_2026,
    year: 2026,
  },
  {
    id: 'rp-who-owns-space',
    slug: 'who-owns-space-commercial-activities',
    title: { en: 'Who Owns Space? A Practical Legal Solution for Commercial Space Activities', ar: 'من يملك الفضاء؟ حل قانوني عملي للأنشطة الفضائية التجارية' },
    authors: [{ name: 'Jana Alqaisi', nameAr: 'جنى القيسي' }],
    conference: IAC_2026,
    year: 2026,
  },
];

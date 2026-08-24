import type { Event, EventJourneyStep, MediaItem } from './types';

/**
 * MENA Space Game Challenge journey — CONFIRMED stage names only (from the requirements).
 * Dates and descriptions were not supplied, so they are intentionally omitted.
 */
const SPACE_GAME_JOURNEY: EventJourneyStep[] = [
  { id: 'sgc-registration', title: { en: 'Registration', ar: 'التسجيل' }, order: 1 },
  { id: 'sgc-training', title: { en: 'Training Sessions', ar: 'الجلسات التدريبية' }, order: 2 },
  { id: 'sgc-hackathon', title: { en: 'Hackathon', ar: 'الهاكاثون' }, order: 3 },
  { id: 'sgc-final-presentations', title: { en: 'Final Presentations', ar: 'العروض النهائية' }, order: 4 },
  { id: 'sgc-award-ceremony', title: { en: 'Award Ceremony', ar: 'حفل الجوائز' }, order: 5 },
];

/**
 * Curated event photography (Phase 5). Imported from the official "MENA Space Game Challenge
 * 2026" recap graphics. Alt text is deliberately generic: it describes the SCENE only and
 * never names a team, person, placement, or project (identities are not confirmed and were
 * never inferred from faces). Award-ceremony images document that an award ceremony took
 * place — they do NOT assert who won. Source: public/images/events/space-game-2026/.
 */
/**
 * Featured image for BOTH `/events` (card) and `/events/space-game-challenge-2026` (hero) —
 * they read this one record, so there is no duplicated path to keep in sync.
 *
 * Alt text note: the scene is described by what is visibly happening (a team presenting their
 * game project to a seated judge, with the project on screen behind them). No ages, names,
 * schools, team names or placements are asserted — the participants' ages are not established
 * by any source, and estimating them from appearance is exactly the face-based inference this
 * project avoids everywhere else.
 */
const SPACE_GAME_HERO: MediaItem = {
  id: 'sgc-hero',
  type: 'image',
  src: 'images/events/space-game-2026/space-game-presenting.jpg',
  alt: { en: 'Young participants presenting their game project to a judge at the MENA Space Game Challenge', ar: 'مشاركون يعرضون مشروع لعبتهم أمام أحد الحكّام في تحدي مِنا لألعاب الفضاء' },
  width: 1080,
  height: 1350,
  category: 'presentations',
};

const SPACE_GAME_GALLERY: MediaItem[] = [
  {
    // Previously the featured/hero image; demoted to a normal gallery item rather than deleted,
    // since it is legitimate event photography and still belongs in the recap.
    id: 'sgc-gaming-stations',
    type: 'image',
    src: 'images/events/space-game-2026/space-game-hero.jpg',
    alt: { en: 'Participants at gaming stations during the MENA Space Game Challenge', ar: 'مشاركون إلى محطات الألعاب خلال تحدي مِنا لألعاب الفضاء' },
    width: 1080,
    height: 1350,
    category: 'hackathon',
  },
  {
    id: 'sgc-group',
    type: 'image',
    src: 'images/events/space-game-2026/space-game-group.jpg',
    alt: { en: 'Group photo of participants and organizers at the MENA Space Game Challenge', ar: 'صورة جماعية للمشاركين والمنظمين في تحدي مِنا لألعاب الفضاء' },
    width: 1080,
    height: 1350,
    category: 'group',
  },
  {
    id: 'sgc-venue',
    type: 'image',
    src: 'images/events/space-game-2026/space-game-venue.jpg',
    alt: { en: 'MENA Space Game Challenge welcome banner at the event venue', ar: 'لافتة ترحيبية لتحدي مِنا لألعاب الفضاء في موقع الفعالية' },
    width: 1080,
    height: 1350,
    category: 'venue',
  },
  {
    id: 'sgc-speakers',
    type: 'image',
    src: 'images/events/space-game-2026/space-game-speakers.jpg',
    alt: { en: 'Speakers and organizers on stage at the MENA Space Game Challenge', ar: 'متحدثون ومنظمون على المسرح في تحدي مِنا لألعاب الفضاء' },
    width: 1080,
    height: 1350,
    category: 'speakers',
  },
  {
    id: 'sgc-presentations',
    type: 'image',
    src: 'images/events/space-game-2026/space-game-presentations.jpg',
    alt: { en: 'Final presentations to a panel at the MENA Space Game Challenge', ar: 'العروض النهائية أمام لجنة في تحدي مِنا لألعاب الفضاء' },
    width: 1080,
    height: 1350,
    category: 'presentations',
  },
  {
    id: 'sgc-hackathon-01',
    type: 'image',
    src: 'images/events/space-game-2026/space-game-hackathon-01.jpg',
    alt: { en: 'Participants collaborating with a mentor during the hackathon', ar: 'مشاركون يتعاونون مع موجّه خلال الهاكاثون' },
    width: 1080,
    height: 1350,
    category: 'hackathon',
  },
  {
    id: 'sgc-hackathon-02',
    type: 'image',
    src: 'images/events/space-game-2026/space-game-hackathon-02.jpg',
    alt: { en: 'Participants working at laptops during the hackathon', ar: 'مشاركون يعملون على حواسيب محمولة خلال الهاكاثون' },
    width: 1080,
    height: 1350,
    category: 'hackathon',
  },
  {
    id: 'sgc-hackathon-03',
    type: 'image',
    src: 'images/events/space-game-2026/space-game-hackathon-03.jpg',
    alt: { en: 'A participant developing a game during the hackathon', ar: 'مشارك يطوّر لعبة خلال الهاكاثون' },
    width: 1080,
    height: 1350,
    category: 'hackathon',
  },
  {
    id: 'sgc-hackathon-04',
    type: 'image',
    src: 'images/events/space-game-2026/space-game-hackathon-04.jpg',
    alt: { en: 'Participants at their workstations during the hackathon', ar: 'مشاركون إلى محطات عملهم خلال الهاكاثون' },
    width: 1080,
    height: 1350,
    category: 'hackathon',
  },
  {
    id: 'sgc-training-vr',
    type: 'image',
    src: 'images/events/space-game-2026/space-game-training-vr.jpg',
    alt: { en: 'A participant using a VR headset during a training session', ar: 'مشارك يستخدم نظارة واقع افتراضي خلال جلسة تدريبية' },
    width: 1080,
    height: 1350,
    category: 'training',
  },
  {
    id: 'sgc-awards-01',
    type: 'image',
    src: 'images/events/space-game-2026/space-game-awards-01.jpg',
    alt: { en: 'Award ceremony at the MENA Space Game Challenge', ar: 'حفل الجوائز في تحدي مِنا لألعاب الفضاء' },
    width: 1080,
    height: 1350,
    category: 'award-ceremony',
  },
  {
    id: 'sgc-awards-02',
    type: 'image',
    src: 'images/events/space-game-2026/space-game-awards-02.jpg',
    alt: { en: 'Award ceremony at the MENA Space Game Challenge', ar: 'حفل الجوائز في تحدي مِنا لألعاب الفضاء' },
    width: 1080,
    height: 1350,
    category: 'award-ceremony',
  },
];

/**
 * MENA Space Game Challenge — confirmed content only.
 *
 * CONFIRMED (from the official recap graphics / asset folder):
 *  - Identity: "MENA Space Game Challenge" (folder confirms the 2026 edition).
 *  - Format: a 48-hour space gaming hackathon (from the official welcome banner:
 *    "48-HOUR SPACE GAMING HACKATHON · CREATE · BUILD · COMPETE").
 *  - Journey stage names (from the requirements).
 *  - Curated event photography (hero + gallery).
 *
 * Still unconfirmed and intentionally absent: exact date, location,
 * full official overview, statistics/highlights, winners (team/person/project names and
 * placements were NOT legible and are never inferred from faces), partner/sponsor list and
 * their classification, video/aftermovie, and event-impact metrics.
 */
export const SPACE_GAME_CHALLENGE: Event = {
  id: 'evt-space-game-challenge-2026',
  slug: 'space-game-challenge-2026',
  title: { en: 'MENA Space Game Challenge', ar: 'تحدي مِنا لألعاب الفضاء' },
  year: 2026,
  summary: { en: 'A 48-hour space gaming hackathon where participants create, build, and compete.', ar: 'هاكاثون لألعاب الفضاء يمتد 48 ساعة، يطوّر خلاله المشاركون أفكارهم ويبنونها ويتنافسون بها.' },
  hero: SPACE_GAME_HERO,
  highlights: [],
  journey: SPACE_GAME_JOURNEY,
  winners: [],
  gallery: SPACE_GAME_GALLERY,
  partnerIds: [],
  sponsorIds: [],
};

/* ────────────────────────────────────────────────────────────────────────────
 * MENA Mars Analog Mission — Wadi Rum (2025)
 *
 * CONFIRMED (from the official mission patch "MENA MARS ANALOG MISSIONS IN WADI RUM ·
 * MENA-00-WR" and the recap imagery): identity, mission code, Wadi Rum location, 2025
 * edition (folder name + WhatsApp asset dates 2025-10-09), and real activities visible in
 * the photos (spacesuit EVAs, a desert dome habitat, crew, field operations).
 *
 * This REPLACES the previously fabricated homepage "ARAV-I/II/III", "Rum Dome Alpha", and
 * "Petra-1" content — none of which appear anywhere in the official assets. Exact dates,
 * crew names, and any technical specifications remain unconfirmed and are therefore absent.
 * ──────────────────────────────────────────────────────────────────────────── */
const ANALOG_HERO: MediaItem = {
  id: 'analog-hero',
  type: 'image',
  src: 'images/events/analog-mission-2025/analog-hero.jpg',
  alt: { en: 'An analog astronaut with a Jordanian flag in the Wadi Rum desert', ar: 'رائد محاكاة مع العلم الأردني في صحراء وادي رم' },
  width: 1080,
  height: 1350,
  category: 'eva',
};

const ANALOG_GALLERY: MediaItem[] = [
  { id: 'analog-crew', type: 'image', src: 'images/events/analog-mission-2025/analog-crew.jpg', alt: { en: 'Analog mission crew in the Wadi Rum desert', ar: 'طاقم بعثة المحاكاة في صحراء وادي رم' }, caption: { en: 'Mission crew — the analog mission crew in the Wadi Rum desert.', ar: 'طاقم البعثة — طاقم البعثة الأنالوج في صحراء وادي رم.' }, width: 1080, height: 1350, category: 'crew' },
  { id: 'analog-group', type: 'image', src: 'images/events/analog-mission-2025/analog-group.jpg', alt: { en: 'Mission participants gathered in the Wadi Rum desert', ar: 'مشاركو البعثة مجتمعون في صحراء وادي رم' }, width: 1080, height: 1350, category: 'group' },
  { id: 'analog-eva-flag', type: 'image', src: 'images/events/analog-mission-2025/analog-eva-flag.jpg', alt: { en: 'An analog astronaut walking with a Jordanian flag in the desert', ar: 'رائد محاكاة يسير مع العلم الأردني في الصحراء' }, caption: { en: 'Analog astronaut EVA — an analog astronaut with a Jordanian flag during a field EVA in the Wadi Rum desert.', ar: 'مهمة خروج ببدلة الفضاء — رائد فضاء أنالوج يحمل العلم الأردني خلال مهمة خروج ميدانية في صحراء وادي رم.' }, width: 1080, height: 1350, category: 'eva' },
  { id: 'analog-habitat-certificates', type: 'image', src: 'images/events/analog-mission-2025/analog-habitat-certificates.jpg', alt: { en: 'Participants with certificates in front of the desert dome habitat', ar: 'مشاركون يحملون شهادات أمام موئل القبة الصحراوي' }, width: 1080, height: 1350, category: 'habitat' },
  { id: 'analog-presentation', type: 'image', src: 'images/events/analog-mission-2025/analog-presentation.jpg', alt: { en: 'A presentation during the analog mission', ar: 'عرض تقديمي خلال بعثة المحاكاة' }, width: 1080, height: 1350, category: 'presentation' },
  { id: 'analog-habitat-group', type: 'image', src: 'images/events/analog-mission-2025/analog-habitat-group.jpg', alt: { en: 'Participants in front of the analog dome habitat in Wadi Rum', ar: 'مشاركون أمام موئل القبة التناظرية في وادي رم' }, caption: { en: 'Desert habitat — participants in front of the analog dome habitat in Wadi Rum.', ar: 'الموئل الصحراوي — المشاركون أمام موئل القبة الأنالوج في وادي رم.' }, width: 1080, height: 1350, category: 'habitat' },
  { id: 'analog-eva-dusk', type: 'image', src: 'images/events/analog-mission-2025/analog-eva-dusk.jpg', alt: { en: 'Analog astronauts in spacesuits at dusk in the desert', ar: 'رواد محاكاة ببدلات فضاء عند الغسق في الصحراء' }, caption: { en: 'EVA at dusk — analog astronauts in spacesuits at dusk in the Wadi Rum desert.', ar: 'مهمة خروج عند الغروب — رواد فضاء أنالوج ببدلات الفضاء عند الغروب في صحراء وادي رم.' }, width: 1080, height: 1350, category: 'eva' },
  { id: 'analog-habitat-interior', type: 'image', src: 'images/events/analog-mission-2025/analog-habitat-interior.jpg', alt: { en: 'Interior of the analog mission habitat', ar: 'داخل موئل بعثة المحاكاة' }, caption: { en: 'Habitat interior — interior of the analog mission habitat.', ar: 'داخل الموئل — المساحة الداخلية لموئل البعثة الأنالوج.' }, width: 1080, height: 1350, category: 'habitat' },
  { id: 'analog-mockup', type: 'image', src: 'images/events/analog-mission-2025/analog-mockup.jpg', alt: { en: 'A participant presenting near mission equipment', ar: 'مشارك يقدّم عرضاً قرب معدات البعثة' }, width: 1080, height: 1350, category: 'presentation' },
  { id: 'analog-mission-control', type: 'image', src: 'images/events/analog-mission-2025/analog-mission-control.jpg', alt: { en: 'Participants working during the analog mission', ar: 'مشاركون يعملون خلال بعثة المحاكاة' }, caption: { en: 'Mission operations — participants working during the analog mission.', ar: 'عمليات البعثة — المشاركون أثناء العمل خلال البعثة الأنالوج.' }, width: 1080, height: 1350, category: 'operations' },
];

export const ANALOG_MISSION_2025: Event = {
  id: 'evt-analog-mission-2025',
  slug: 'analog-mission-2025',
  title: { en: 'MENA Mars Analog Mission — Wadi Rum', ar: 'بعثة مِنا لمحاكاة المريخ — وادي رم' },
  year: 2025,
  location: { en: 'Wadi Rum, Jordan', ar: 'وادي رم، الأردن' },
  summary: {
    en: 'An analog Mars mission in the Wadi Rum desert, where a crew carried out spacesuit EVAs, habitat operations, and field activities in Mars-like terrain.',
    ar: 'بعثة لمحاكاة المريخ في صحراء وادي رم، نفّذ خلالها الطاقم طلعات ببدلات الفضاء وعمليات داخل الموئل وأنشطة ميدانية في تضاريس شبيهة بالمريخ.',
  },
  hero: ANALOG_HERO,
  highlights: [],
  winners: [],
  gallery: ANALOG_GALLERY,
  partnerIds: [],
  sponsorIds: [],
};

/* ────────────────────────────────────────────────────────────────────────────
 * NASA Space Apps Challenge — MENA (Amman edition)
 *
 * CONFIRMED (from the official recap graphics: "SPACE APPS" branding + MENA, winner checks
 * reading "…Place Winner · Amman", and an on-stage "Event Planning Partner" backdrop):
 * identity as the NASA Space Apps Challenge in Amman, and real hackathon activity
 * (teams working, a VR demo, a speaker, an award ceremony). Exact date/year, event DURATION,
 * MENA's organizational ROLE (host / local organizer / participant / partner), winner
 * identities, and partner/sponsor classification are not confirmed and are therefore absent.
 * ──────────────────────────────────────────────────────────────────────────── */
const NASA_HERO: MediaItem = {
  id: 'nasa-hero',
  type: 'image',
  src: 'images/events/nasa-space-apps/nasa-hero.jpg',
  alt: { en: 'Group photo on stage at the NASA Space Apps Challenge in Amman', ar: 'صورة جماعية على المسرح في تحدي ناسا لتطبيقات الفضاء في عمّان' },
  width: 1600,
  height: 1067,
  category: 'group',
};

const NASA_GALLERY: MediaItem[] = [
  { id: 'nasa-group', type: 'image', src: 'images/events/nasa-space-apps/nasa-group.jpg', alt: { en: 'Participants and organizers at the NASA Space Apps Challenge', ar: 'مشاركون ومنظمون في تحدي ناسا لتطبيقات الفضاء' }, width: 1080, height: 1350, category: 'group' },
  { id: 'nasa-awards-01', type: 'image', src: 'images/events/nasa-space-apps/nasa-awards-01.jpg', alt: { en: 'Award ceremony at the NASA Space Apps Challenge', ar: 'حفل الجوائز في تحدي ناسا لتطبيقات الفضاء' }, width: 1080, height: 1350, category: 'award-ceremony' },
  { id: 'nasa-awards-02', type: 'image', src: 'images/events/nasa-space-apps/nasa-awards-02.jpg', alt: { en: 'Award ceremony at the NASA Space Apps Challenge', ar: 'حفل الجوائز في تحدي ناسا لتطبيقات الفضاء' }, width: 1080, height: 1350, category: 'award-ceremony' },
  { id: 'nasa-vr', type: 'image', src: 'images/events/nasa-space-apps/nasa-vr.jpg', alt: { en: 'A participant using a VR headset at the hackathon', ar: 'مشارك يستخدم نظارة واقع افتراضي في الهاكاثون' }, width: 1080, height: 1350, category: 'hackathon' },
  { id: 'nasa-hackathon-01', type: 'image', src: 'images/events/nasa-space-apps/nasa-hackathon-01.jpg', alt: { en: 'Teams working during the NASA Space Apps hackathon', ar: 'فرق تعمل خلال هاكاثون ناسا لتطبيقات الفضاء' }, width: 1080, height: 1350, category: 'hackathon' },
  { id: 'nasa-speaker', type: 'image', src: 'images/events/nasa-space-apps/nasa-speaker.jpg', alt: { en: 'A speaker presenting at the NASA Space Apps Challenge', ar: 'متحدث يقدّم عرضاً في تحدي ناسا لتطبيقات الفضاء' }, width: 1080, height: 1350, category: 'speakers' },
  { id: 'nasa-hackathon-02', type: 'image', src: 'images/events/nasa-space-apps/nasa-hackathon-02.jpg', alt: { en: 'Participants collaborating during the hackathon', ar: 'مشاركون يتعاونون خلال الهاكاثون' }, width: 1080, height: 1350, category: 'hackathon' },
  { id: 'nasa-hackathon-03', type: 'image', src: 'images/events/nasa-space-apps/nasa-hackathon-03.jpg', alt: { en: 'Participants working at laptops during the hackathon', ar: 'مشاركون يعملون على حواسيب محمولة خلال الهاكاثون' }, width: 1080, height: 1350, category: 'hackathon' },
];

export const NASA_SPACE_APPS: Event = {
  id: 'evt-nasa-space-apps',
  slug: 'nasa-space-apps',
  title: { en: 'NASA Space Apps Challenge — Amman', ar: 'تحدي ناسا لتطبيقات الفضاء — عمّان' },
  location: { en: 'Amman, Jordan', ar: 'عمّان، الأردن' },
  // Phase 6.2: dropped "over an intensive weekend" (event duration is not established by the
  // assets) and the host-role framing. Only MENA's participation, the Amman location, and the
  // award ceremony — all visible in the recap imagery — are asserted.
  summary: {
    en: 'The NASA Space Apps Challenge in Amman — teams building solutions, concluding with an award ceremony.',
    ar: 'تحدي ناسا لتطبيقات الفضاء في عمّان، حيث عملت الفرق على تطوير حلول واختُتمت الفعالية بحفل جوائز.',
  },
  hero: NASA_HERO,
  highlights: [],
  winners: [],
  gallery: NASA_GALLERY,
  partnerIds: [],
  sponsorIds: [],
};

/** All confirmed events (ordered newest-intent first for the /events grid). */
export const EVENTS: Event[] = [SPACE_GAME_CHALLENGE, ANALOG_MISSION_2025, NASA_SPACE_APPS];

import { ProgramItem, TeamDepartment, AdvisorItem, SupportTier } from './types';

// Let's use the exact paths returned by standard tool calls
export const IMAGES = {
  hero: '/images/Hero.png',
  engineering: '/images/mena_suit_engineering_1779552864607.png',
  missionControl: '/images/mena_mission_control_1779552881676.png',
  eva: '/images/mena_wadi_rum_eva_1779552903767.png',
};

export const IMPACT_STATS = [
  { value: "1st", label: "Women-Led Space Org in Arab World", description: "Empowering next-gen female and male scientists in space technologies." },
  { value: "250+", label: "STEM Alumni & Youth Innovators", description: "Directly trained through our intensive bootcamps, Rover challenges, and labs." },
  { value: "2", label: "Analog Martian Missions Coordinated", description: "Direct engineering, life-support, and psychology simulations in Wadi Rum." },
  { value: "15+", label: "International Aerospace Advisors", description: "Advisors from NASA, ESA, JAXA, and global analog astronaut circles." }
];

export const ACTION_PROGRAMS: ProgramItem[] = [
  {
    id: "nasa-apps",
    title: "NASA Space Apps Jordan Liaison",
    subtitle: "Solving Global Challenges in Amman",
    description: "MENA ORG proud host and liaison facilitating Jordan's biggest youth hackathon. Inspiring designers, engineers, and coders to solve NASA's open-source planetary challenges.",
    features: ["Mentorship by active aerospace engineers", "Winning prototypes incubated toward real startups"],
    role: "National coordinator and academic youth mentor.",
    bannerImage: "https://picsum.photos/seed/nasaapps/800/600"
  },
  {
    id: "system-prog",
    title: "S.Y.S.T.E.M. Training Academy",
    subtitle: "Space for Youth Through STEM",
    description: "An intensive certificate program for Arab women and young innovators. Curriculum covers space exploration history, rocket propulsion principles, orbital dynamics, and analog habitats.",
    features: ["Hands-on engineering laboratories", "Interactive orbital math workshops", "Direct mentorship with professional analog astronauts"],
    role: "Proprietary design bootcamp designed for next-gen Arab aerospace engineers.",
    bannerImage: "https://picsum.photos/seed/system/800/600"
  },
  {
    id: "maker-collective",
    title: "The Maker Collective",
    subtitle: "Open-Source Orbital Hardware Labs",
    description: "A highly collaborative prototyping program built around hardware engineering. Promotes building environmental telemetry kits, open-source cubesat modules, and model atmospheric rockets.",
    features: ["Advanced 3D habitability design lab", "KiCad PCB schema workshops & microcontrollers", "Open hardware aerospace repository access"],
    role: "Proprietary design bootcamp for orbital maker integration.",
    bannerImage: "https://picsum.photos/seed/maker/800/600"
  },
  {
    id: "stem-labs",
    title: "Jordan Mars Rover Challenge",
    subtitle: "Youth Applied Robotics in Severe Climates",
    description: "An annual inter-university design-build-test competition. Student squads create Martian payload rovers matching severe sand and heat metrics in simulated terrain.",
    features: ["Obstacle navigation tests in Wadi Rum-like sandy pits", "Payload release and soil collection hardware review", "Academic and industry judges panel"],
    role: "Engineering challenge and design evaluation board.",
    bannerImage: "https://picsum.photos/seed/rover/800/600"
  }
];

export const DEPARTMENTS: TeamDepartment[] = [
  {
    id: "dept-board",
    name: "Board of Trustees & Founders",
    arabicName: "مجلس الأمناء والمؤسسين",
    description: "Provides strategic oversight, aerospace governance, international bilateral alliances, and sets the long-term vision for regional space research and education.",
    coreFocus: ["Strategic partner agreements", "Institutional growth & endowment", "Global space diplomacy channels"],
    leadName: "Dr. Raed Kawar",
    leadRole: "Chairman of the Board of Trustees",
    teamSize: 5
  },
  {
    id: "dept-advisors",
    name: "Scientific Advisory Board",
    arabicName: "الهيئة الاستشارية العلمية",
    description: "International syndicate of planetary experts, biosensor researchers, and analog instructors vetting published experiments and training curricula.",
    coreFocus: ["Multidisciplinary peer review", "Academic syllabus calibration", "Habitat pressure safe limits validation"],
    leadName: "Dr. Shelli R. Brunswick",
    leadRole: "Board Advisor & Aerospace Advocate",
    teamSize: 8
  },
  {
    id: "dept-mission",
    name: "Management & Mission Operations",
    arabicName: "غرفة التحكم بالبعثات والعمليات",
    description: "Coordinates communications, orbital telemetry pipelines, crew isolation shifts, and active emergency flight instructions during live simulations.",
    coreFocus: ["20-minute signal latency settings", "Physiological telemetry streams", "Habitat emergency protocols"],
    leadName: "Eng. Farah Shalabi",
    leadRole: "Director of Mission Operations",
    teamSize: 12
  },
  {
    id: "dept-marketing",
    name: "Marketing & Public Outreach",
    arabicName: "أبحاث التسويق والإعلام والاتصال",
    description: "Amplifies the mission's educational outcomes through content production, live telemetry broadcasts, documentary coordination, and global STEM events.",
    coreFocus: ["Multi-media documentary production", "Live flight log web diaries", "Local community aerospace events"],
    leadName: "Aya Al-Sakit",
    leadRole: "Media Outreach Coordinator",
    teamSize: 6
  },
  {
    id: "dept-eng",
    name: "Design & Engineering Team",
    arabicName: "الهندسة وتصميم بدلات الفضاء",
    description: "Engineers specialized hardware, spacesuit composite fiber structures, active pressure locks, and rugged rover navigation plates.",
    coreFocus: ["Basalt-resistant wheel arrays", "Carbon-insulated thermal layers", "Modular habitat assembly"],
    leadName: "Eng. Noor Al-Jaafari",
    leadRole: "Lead Spacesuit Architect",
    teamSize: 18
  },
  {
    id: "dept-spacefood",
    name: "Space Food Systems",
    arabicName: "أغذية الفضاء والتقنيات الزراعية",
    description: "Develops high-yield crops under sealed analog domes, closed biological water loops, algae filters, and micro-nutrient food dehydration.",
    coreFocus: ["Closed food iteration cycles", "Bio-regenerative hydroponics", "Vacuum food dehydration systems"],
    leadName: "Eng. Salma Al-Najjar",
    leadRole: "Lead Hydroponics Researcher",
    teamSize: 4
  },
  {
    id: "dept-rd",
    name: "R&D - Sci. & Experiments Team",
    arabicName: "البحوث العلمية والتجارب الأكاديمية",
    description: "Directs physical science research analyzing simulated lunar and Mars soils, geological mineral extractions, and closed habitat environmental checks.",
    coreFocus: ["Soil mineral chemical assays", "In-situ water retrieval from clays", "Sub-surface drill structural loads"],
    leadName: "Dr. Maya Toukan",
    leadRole: "Chief Research Biochemist",
    teamSize: 8
  },
  {
    id: "dept-med",
    name: "Medical & Safety Team",
    arabicName: "الرعاية الطبية والسلامة التشغيلية",
    description: "Monitors the biometrics, cardiovascular responses, and psychological stress indexes of field scientists operating under isolated extreme desert heats.",
    coreFocus: ["Crew biometrics reading", "Active sodium tracker indices", "Desert medical evacuation tactics"],
    leadName: "Dr. Laila Haddad",
    leadRole: "Head Medical Officer",
    teamSize: 6
  },
  {
    id: "dept-tech",
    name: "Tech & Software Innovation",
    arabicName: "التكنولوجيا والأنظمة الرقمية",
    description: "Engineers custom hardware sensor uplinks, artificial intelligence biosignal indicators, and real-time mission command dashboards for analog crews.",
    coreFocus: ["Lora-mesh sand communications", "Anomalous vitals alerts", "Virtual reality extravehicular simulators"],
    leadName: "Eng. Laith Kawar",
    leadRole: "Telemetry & Software Lead",
    teamSize: 11
  },
  {
    id: "dept-training",
    name: "Astronaut Preparation Team",
    arabicName: "تدريب وتأهيل رواد الفضاء الأنالوج",
    description: "Guides field survival instruction, lunar gravity simulator rigs, space suit mobility, and mission communication disciplines.",
    coreFocus: ["Heavily pressurized suit locomotion", "Field survival in extreme sand", "Geological sample documentation protocols"],
    leadName: "Capt. Zein Obiedat",
    leadRole: "Lead Analog Instructor",
    teamSize: 9
  }
];

export const ADVISORS: AdvisorItem[] = [
  {
    id: "adv-1",
    name: "Dr. Shelli R. Brunswick",
    role: "Former Space Foundation Chief & Board Director",
    organization: "Global Aerospace Executive Advisory",
    biography: "A leading champion for global space inclusion, advising MENA Space Org since 2023 on building bilateral space policy and international student pipelines.",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop",
    specialty: "Space Diplomacy / Youth Pipeline Development"
  },
  {
    id: "adv-2",
    name: "Dr. Marc G. Hairapetian",
    role: "Director of Exploration Materials",
    organization: "Eurasian Space Syndicate",
    biography: "Advises our Engineering Department on composite carbon shells, dust mitigation seals, and materials designed to withstand Jordanian sandstorms and Martian basalt wear.",
    avatarUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop",
    specialty: "In-Situ Materials Science"
  },
  {
    id: "adv-3",
    name: "Professor Hanan Al-Huneidi",
    role: "Head of Astrophysics / Remote Field Research",
    organization: "Hashemite University",
    biography: "Guides the scientific payload teams on Mars soil analog research carried out in specific dry mudflat zones in southern Jordanian desert sectors.",
    avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop",
    specialty: "Mars Analog Soil Characterization"
  },
  {
    id: "adv-4",
    name: "Dr. Benji Lawson",
    role: "Astrobiology Lead Researcher",
    organization: "International Analog Astronaut Network",
    biography: "Assists the astrobiology department in closed-loop system design, sharing data on analog crew survival metrics and agricultural production under isolation.",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
    specialty: "Analog Lifecycle Simulation"
  }
];

export const SUPPORT_TIERS: SupportTier[] = [
  {
    id: "tier-scout",
    name: "Desert Rover Scout",
    badgeName: "SANDS-01",
    price: "$25",
    tagline: "Fuel the initial dunes navigation rover systems.",
    perks: [
      "Digital Mission Certificate with Arabic Calligraphy stamp",
      "Monthly exclusive flight log email diaries from Wadi Rum"
    ],
    color: "from-amber-600/30 to-orange-500/10 border-orange-500/30 hover:border-orange-500"
  },
  {
    id: "tier-engineer",
    name: "Habitat Shield Engineer",
    badgeName: "HABITAT-02",
    price: "$100",
    tagline: "Sponsor core thermal seals & hydroponics water loops.",
    perks: [
      "VIP Invitation to the annual Jordan Mars Rover Finals in Wadi Rum",
      "All benefits from the previous tier"
    ],
    color: "from-red-600/30 to-rose-500/10 border-red-500/30 hover:border-red-500"
  },
  {
    id: "tier-commander",
    name: "Lead Analog Commander",
    badgeName: "COMMAND-03",
    price: "$500",
    tagline: "Fund spacesuit oxygen sensor packs and active training telemetry.",
    perks: [
      "Invited to sit in Mission Control Jordan for a live EVA communication loop",
      "Sponsor logo/name prominently showcased on the official Jordan Mars Website",
      "Lifetime membership to the MENA Space Academy community"
    ],
    color: "from-cyan-900/40 to-blue-950/20 border-cyan-400/30 hover:border-cyan-400"
  }
];

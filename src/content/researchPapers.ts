import type { ConferenceInfo, ResearchPaper } from './types';

/**
 * Confirmed accepted conference edition for this body of MENA research.
 * (Approved: IAC 2026 – Antalya, Türkiye.)
 */
export const IAC_2026: ConferenceInfo = {
  name: 'International Astronautical Congress (IAC)',
  edition: 'IAC 2026',
  location: 'Antalya, Türkiye',
  year: 2026,
};

/**
 * Confirmed research papers — exactly ONE record per unique title (the source listed papers
 * repeated under each author). `authors` contains only source-confirmed authors; no
 * co-authors are inferred. `abstract`, `category`, `publicationStatus`, `gallery`,
 * `relatedTeamMemberIds`, and `externalLinks` are intentionally left undefined because they
 * were not supplied — see `contentGaps.ts`. `GLOBAL TECHNICAL SYMPOSIUM` is deliberately NOT
 * included here (ambiguous; recorded as a content gap).
 */
export const RESEARCH_PAPERS: ResearchPaper[] = [
  {
    id: 'rp-small-satellite-drought',
    slug: 'small-satellite-drought-prediction',
    title: {
      en: 'A Small Satellite Constellation for Early Drought Prediction and Sustainable Water Management: An Innovative CubeSat-Based Approach',
    },
    authors: [{ name: 'Majd Alsadi' }, { name: 'Lamia Shaheen' }],
    conference: IAC_2026,
    year: 2026,
  },
  {
    id: 'rp-successful-space-program',
    slug: 'successful-space-program-quality-safety',
    title: { en: 'A Successful Space Program (Quality and Safety)' },
    authors: [{ name: 'Majd Alsadi' }, { name: 'Lamia Shaheen' }],
    conference: IAC_2026,
    year: 2026,
  },
  {
    id: 'rp-cyber-security-threats',
    slug: 'cyber-security-threats-space-missions',
    title: {
      en: 'Cyber-Based Security Threats to Space Missions: Establishing the Legal, Institutional and Collaborative Framework to Counteract Them',
    },
    authors: [{ name: 'Majd Alsadi' }, { name: 'Sarah Alshaqaqi' }],
    conference: IAC_2026,
    year: 2026,
  },
  {
    id: 'rp-solar-regolith-isru',
    slug: 'solar-regolith-hybrid-isru-mars',
    title: {
      en: 'A Robust Solar-Regolith Hybrid ISRU Architecture for Methane Production via Raw Atmospheric Intake and Subsurface Water Mining on Mars',
    },
    authors: [{ name: 'Osaid Alhaimour' }, { name: 'Shahed Alshab' }, { name: 'Ahmad Alrbaidi' }],
    conference: IAC_2026,
    year: 2026,
  },
  {
    id: 'rp-distributed-ion-thrusters',
    slug: 'distributed-ion-thruster-arrays',
    title: {
      en: 'Distributed Ion Thruster Arrays for Scalable and Fault-Tolerant Electric Propulsion Systems',
    },
    authors: [{ name: 'Osaid Alhaimour' }, { name: 'Shahed Alshab' }, { name: 'Ahmad Alrbaidi' }],
    conference: IAC_2026,
    year: 2026,
  },
  {
    id: 'rp-martian-habitat-energy',
    slug: 'martian-habitat-energy-architecture',
    title: {
      en: 'Resilience-Oriented Energy Architecture for a 4–5 Crew Sustained Martian Habitat: Hybrid Storage and Autonomous Power Management',
    },
    authors: [{ name: 'Osaid Alhaimour' }, { name: 'Shahed Alshab' }, { name: 'Ahmad Alrbaidi' }],
    conference: IAC_2026,
    year: 2026,
  },
  {
    id: 'rp-hydroponic-tower',
    slug: 'hydroponic-tower-mars-analog',
    title: {
      en: 'Hands-On Hydroponic Tower Feeds 5 Mars Analog Astronauts: Desert-Tested for MENA Farms',
    },
    authors: [{ name: 'Murad Alkharabsheh' }],
    conference: IAC_2026,
    year: 2026,
  },
  {
    id: 'rp-who-owns-space',
    slug: 'who-owns-space-commercial-activities',
    title: { en: 'Who Owns Space? A Practical Legal Solution for Commercial Space Activities' },
    authors: [{ name: 'Jana Alqaisi' }],
    conference: IAC_2026,
    year: 2026,
  },
];

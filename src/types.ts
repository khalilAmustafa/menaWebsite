export interface ProgramItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  role: string;
  bannerImage: string;
}

export interface TeamDepartment {
  id: string;
  name: string;
  arabicName: string;
  description: string;
  coreFocus: string[];
  leadName?: string;
  leadRole?: string;
  teamSize: number;
}

export interface AdvisorItem {
  id: string;
  name: string;
  role: string;
  organization: string;
  biography: string;
  avatarUrl: string;
  specialty: string;
}

export interface SupportTier {
  id: string;
  name: string;
  badgeName: string;
  price: string;
  tagline: string;
  perks: string[];
  color: string;
}

export interface MissionControlState {
  missionClock: string; // Elapsed time
  oxygenLevel: number; // %
  batteryPower: number; // %
  pressureLevel: number; // kPa
  interiorTemp: number; // °C
  signalStrength: number; // %
  isEvaActive: boolean;
  telemetryLogs: string[];
  crewVitals: {
    id: string;
    name: string;
    role: string;
    heartRate: number;
    suitPressure: number;
    status: 'Stable' | 'Elevated' | 'Caution';
  }[];
}

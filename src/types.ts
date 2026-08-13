/**
 * Phase 8: narrowed to the three fields the site renders. The removed fields (description,
 * coreFocus, leadName, leadRole, teamSize) only ever held fabricated data, and keeping them on
 * the type invited it back. `AdvisorItem` and `SupportTier` were deleted outright along with
 * their fabricated constants — see the note in src/data.ts.
 */
export interface TeamDepartment {
  id: string;
  name: string;
  arabicName: string;
}

/*
 * `MissionControlState` was DELETED here. It was the shape of the fabricated homepage telemetry
 * dashboard (mission clock, O₂/battery/pressure/temperature/signal, EVA state, mission-control
 * logs, and per-crew heart rate / suit pressure / status). The component that rendered it is
 * gone, and leaving the type behind would only make it easy to rebuild the same invented feed.
 */

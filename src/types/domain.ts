export type RoutePath =
  | "/"
  | "/go-home"
  | "/places"
  | "/call"
  | "/medicine"
  | "/custom/a"
  | "/custom/b"
  | "/caregiver";

export type MedicineState = "upcoming" | "done" | "missed";
export type SafeZoneState = "inside" | "outside" | "unknown";
export type CustomActionType = "callPerson" | "openDestination" | "showNote";

export interface ElderProfile {
  id: string;
  displayName: string;
  caregiverName: string;
  homeLabel: string;
  homeAddress: string;
}

export interface Contact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  priority: number;
  photoDataUrl?: string;
}

export interface Destination {
  id: string;
  label: string;
  address: string;
  note: string;
  isHome?: boolean;
}

export interface MedicineReminder {
  id: string;
  medicineName: string;
  time: string;
  dosageNote: string;
  active: boolean;
  alertEnabled: boolean;
  state: MedicineState;
  lastAlertDate?: string;
}

export interface CustomSlotConfig {
  slot: "A" | "B";
  label: string;
  actionType: CustomActionType;
  showOnHome: boolean;
  targetId?: string;
  note?: string;
}

export interface LocationStatus {
  currentLocationLabel: string;
  safeZoneState: SafeZoneState;
  lastUpdated: string;
}

export interface DeviceStatus {
  batteryLevel: number;
  connectionLabel: string;
  lastUpdated: string;
}

export interface CaregiverSummary {
  activeReminderCount: number;
  savedDestinationCount: number;
  customActionCount: number;
}

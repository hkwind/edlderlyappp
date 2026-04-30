import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from "lz-string";
import type {
  Contact,
  CustomSlotConfig,
  Destination,
  DeviceStatus,
  ElderProfile,
  LocationStatus,
  MedicineReminder
} from "../../types/domain";

const PAIRING_PREFIX = "naoyousoyi-pair:";

export interface PairingBundle {
  version: 1;
  patient: ElderProfile;
  contacts: Contact[];
  destinations: Destination[];
  reminders: MedicineReminder[];
  customSlots: CustomSlotConfig[];
  locationStatus: LocationStatus;
  deviceStatus: DeviceStatus;
}

export function encodePairingBundle(bundle: PairingBundle) {
  const payload = JSON.stringify(bundle);
  return `${PAIRING_PREFIX}${compressToEncodedURIComponent(payload)}`;
}

export function decodePairingBundle(code: string): PairingBundle {
  const trimmed = code.trim();

  if (!trimmed.startsWith(PAIRING_PREFIX)) {
    throw new Error("這個配對碼格式不正確。");
  }

  const compressed = trimmed.slice(PAIRING_PREFIX.length);
  const json = decompressFromEncodedURIComponent(compressed);

  if (!json) {
    throw new Error("無法讀取這個配對碼。");
  }

  const parsed = JSON.parse(json) as Partial<PairingBundle>;

  if (
    parsed.version !== 1 ||
    !parsed.patient ||
    !Array.isArray(parsed.contacts) ||
    !Array.isArray(parsed.destinations) ||
    !Array.isArray(parsed.reminders) ||
    !Array.isArray(parsed.customSlots) ||
    !parsed.locationStatus ||
    !parsed.deviceStatus
  ) {
    throw new Error("配對碼內容不完整。");
  }

  return parsed as PairingBundle;
}

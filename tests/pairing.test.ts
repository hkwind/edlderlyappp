import { describe, expect, it } from "vitest";
import { mockCustomSlots } from "../src/data/mockCustomSlots";
import { mockDestinations } from "../src/data/mockDestinations";
import { mockPatient, mockContacts } from "../src/data/mockPatient";
import { mockReminders } from "../src/data/mockReminders";
import { mockDeviceStatus, mockLocationStatus } from "../src/data/mockStatus";
import { decodePairingBundle, encodePairingBundle, type PairingBundle } from "../src/features/pairing/pairing";

describe("pairing payload", () => {
  it("encodes and decodes a caregiver bundle", () => {
    const bundle: PairingBundle = {
      version: 1,
      patient: mockPatient,
      contacts: mockContacts,
      destinations: mockDestinations,
      reminders: mockReminders,
      customSlots: mockCustomSlots,
      locationStatus: mockLocationStatus,
      deviceStatus: mockDeviceStatus
    };

    const code = encodePairingBundle(bundle);
    const decoded = decodePairingBundle(code);

    expect(decoded.patient.displayName).toBe(mockPatient.displayName);
    expect(decoded.destinations).toHaveLength(mockDestinations.length);
    expect(decoded.reminders).toHaveLength(mockReminders.length);
    expect(decoded.customSlots[0]?.label).toBe(mockCustomSlots[0]?.label);
  });
});

import { create } from "zustand";
import { mockContacts, mockPatient } from "../data/mockPatient";
import { mockCustomSlots } from "../data/mockCustomSlots";
import { mockDestinations } from "../data/mockDestinations";
import { mockReminders } from "../data/mockReminders";
import { mockDeviceStatus, mockLocationStatus } from "../data/mockStatus";
import type { PairingBundle } from "../features/pairing/pairing";
import type {
  Contact,
  CustomSlotConfig,
  Destination,
  DeviceStatus,
  ElderProfile,
  LocationStatus,
  MedicineReminder
} from "../types/domain";

interface ActiveMedicineAlert {
  reminderId: string;
  triggerSource: "schedule" | "test";
  triggeredAt: string;
}

interface AppState {
  patient: ElderProfile;
  contacts: Contact[];
  destinations: Destination[];
  reminders: MedicineReminder[];
  customSlots: CustomSlotConfig[];
  locationStatus: LocationStatus;
  deviceStatus: DeviceStatus;
  activeMedicineAlert: ActiveMedicineAlert | null;
  saveContact: (contact: Contact) => void;
  saveReminder: (reminder: MedicineReminder) => void;
  saveDestination: (destination: Destination) => void;
  saveCustomSlot: (slot: CustomSlotConfig) => void;
  deleteReminder: (reminderId: string) => void;
  deleteDestination: (destinationId: string) => void;
  updateReminderState: (reminderId: string, state: MedicineReminder["state"]) => void;
  syncMedicineAlerts: (now?: Date) => void;
  triggerTestMedicineAlert: (reminderId: string) => void;
  clearActiveMedicineAlert: () => void;
  importPairingBundle: (bundle: PairingBundle) => void;
}

export const useAppStore = create<AppState>((set) => ({
  patient: mockPatient,
  contacts: mockContacts,
  destinations: mockDestinations,
  reminders: mockReminders,
  customSlots: mockCustomSlots,
  locationStatus: mockLocationStatus,
  deviceStatus: mockDeviceStatus,
  activeMedicineAlert: null,
  saveContact: (contact) =>
    set((state) => ({
      contacts: saveById(state.contacts, contact)
    })),
  saveReminder: (reminder) =>
    set((state) => ({
      reminders: saveById(state.reminders, reminder)
    })),
  saveDestination: (destination) =>
    set((state) => ({
      destinations: saveDestinationList(state.destinations, destination)
    })),
  saveCustomSlot: (slot) =>
    set((state) => ({
      customSlots: saveByKey(state.customSlots, slot, "slot")
    })),
  deleteReminder: (reminderId) =>
    set((state) => ({
      reminders: state.reminders.filter((reminder) => reminder.id !== reminderId)
    })),
  deleteDestination: (destinationId) =>
    set((state) => ({
      destinations: state.destinations.filter((destination) => destination.id !== destinationId),
      customSlots: state.customSlots.map((slot) =>
        slot.targetId === destinationId ? { ...slot, targetId: undefined } : slot
      )
    })),
  updateReminderState: (reminderId, nextState) =>
    set((state) => ({
      activeMedicineAlert:
        nextState === "done" && state.activeMedicineAlert?.reminderId === reminderId
          ? null
          : state.activeMedicineAlert,
      reminders: state.reminders.map((reminder) =>
        reminder.id === reminderId ? { ...reminder, state: nextState } : reminder
      )
    })),
  syncMedicineAlerts: (now = new Date()) =>
    set((state) => {
      if (state.activeMedicineAlert) {
        return {};
      }

      // TODO: Replace this in-app due-time check with real OS alarm / notification scheduling.
      const dueReminder = state.reminders.find((reminder) => isReminderDue(reminder, now));

      if (!dueReminder) {
        return {};
      }

      const todayKey = getDateKey(now);

      return {
        activeMedicineAlert: {
          reminderId: dueReminder.id,
          triggerSource: "schedule",
          triggeredAt: now.toISOString()
        },
        reminders: state.reminders.map((reminder) =>
          reminder.id === dueReminder.id ? { ...reminder, lastAlertDate: todayKey } : reminder
        )
      };
    }),
  triggerTestMedicineAlert: (reminderId) =>
    set((state) => ({
      activeMedicineAlert: {
        reminderId,
        triggerSource: "test",
        triggeredAt: new Date().toISOString()
      }
    })),
  clearActiveMedicineAlert: () =>
    set({
      activeMedicineAlert: null
    }),
  importPairingBundle: (bundle) =>
    set({
      patient: bundle.patient,
      contacts: bundle.contacts,
      destinations: bundle.destinations,
      reminders: bundle.reminders,
      customSlots: bundle.customSlots,
      locationStatus: bundle.locationStatus,
      deviceStatus: bundle.deviceStatus,
      activeMedicineAlert: null
    })
}));

function saveById<T extends { id: string }>(items: T[], nextItem: T) {
  const index = items.findIndex((item) => item.id === nextItem.id);

  if (index === -1) {
    return [...items, nextItem];
  }

  return items.map((item) => (item.id === nextItem.id ? nextItem : item));
}

function saveByKey<T, K extends keyof T>(items: T[], nextItem: T, key: K) {
  const nextKey = nextItem[key];

  return items.map((item) => (item[key] === nextKey ? nextItem : item));
}

function saveDestinationList(destinations: Destination[], nextDestination: Destination) {
  const cleanedDestinations = nextDestination.isHome
    ? destinations.map((destination) => ({
        ...destination,
        isHome: destination.id === nextDestination.id
      }))
    : destinations;

  return saveById(cleanedDestinations, nextDestination);
}

function isReminderDue(reminder: MedicineReminder, now: Date) {
  if (!reminder.active || !reminder.alertEnabled || reminder.state === "done") {
    return false;
  }

  const [hours, minutes] = reminder.time.split(":").map((value) => Number(value));

  if (Number.isNaN(hours) || Number.isNaN(minutes)) {
    return false;
  }

  const todayKey = getDateKey(now);
  const currentTotalMinutes = now.getHours() * 60 + now.getMinutes();
  const reminderTotalMinutes = hours * 60 + minutes;

  return currentTotalMinutes >= reminderTotalMinutes && reminder.lastAlertDate !== todayKey;
}

function getDateKey(now: Date) {
  return now.toISOString().slice(0, 10);
}

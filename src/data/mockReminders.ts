import type { MedicineReminder } from "../types/domain";

export const mockReminders: MedicineReminder[] = [
  {
    id: "med-1",
    medicineName: "血壓藥",
    time: "08:00",
    dosageNote: "早餐後 1 粒",
    active: true,
    state: "done"
  },
  {
    id: "med-2",
    medicineName: "維他命",
    time: "13:00",
    dosageNote: "午餐後 1 粒",
    active: true,
    state: "upcoming"
  },
  {
    id: "med-3",
    medicineName: "止痛藥",
    time: "20:00",
    dosageNote: "如痛楚明顯先服用",
    active: false,
    state: "missed"
  }
];

import type { CustomSlotConfig } from "../types/domain";

export const mockCustomSlots: CustomSlotConfig[] = [
  {
    slot: "A",
    label: "去診所",
    actionType: "openDestination",
    targetId: "destination-clinic"
  },
  {
    slot: "B",
    label: "睇提示",
    actionType: "showNote",
    note: "如果覺得唔舒服，坐低，飲水，然後打電話俾美玲。"
  }
];

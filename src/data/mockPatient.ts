import type { Contact, ElderProfile } from "../types/domain";

export const mockPatient: ElderProfile = {
  id: "elder-1",
  displayName: "陳伯伯",
  caregiverName: "美玲",
  homeLabel: "屋企",
  homeAddress: "九龍旺角花園街 18 號 8 樓"
};

export const mockContacts: Contact[] = [
  {
    id: "contact-1",
    name: "美玲",
    relationship: "女兒",
    phone: "9123 4567",
    priority: 1
  },
  {
    id: "contact-2",
    name: "志強",
    relationship: "兒子",
    phone: "9345 6789",
    priority: 2
  }
];

import type { Destination } from "../types/domain";

export const mockDestinations: Destination[] = [
  {
    id: "destination-home",
    label: "屋企",
    address: "九龍旺角花園街 18 號 8 樓",
    note: "如果迷路，請向店員展示這個地址。",
    isHome: true
  },
  {
    id: "destination-clinic",
    label: "診所",
    address: "尖沙咀彌敦道 200 號 3 樓",
    note: "到櫃檯後講自己的名字。"
  },
  {
    id: "destination-park",
    label: "公園",
    address: "九龍公園正門",
    note: "到大門後等家人。"
  },
  {
    id: "destination-market",
    label: "街市",
    address: "旺角街市地下入口",
    note: "買完之後打電話俾美玲。"
  }
];

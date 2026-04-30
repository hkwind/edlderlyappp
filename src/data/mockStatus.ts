import type { DeviceStatus, LocationStatus } from "../types/domain";

export const mockLocationStatus: LocationStatus = {
  currentLocationLabel: "旺角街市附近",
  safeZoneState: "inside",
  lastUpdated: "今日 14:25"
};

export const mockDeviceStatus: DeviceStatus = {
  batteryLevel: 76,
  connectionLabel: "訊號正常",
  lastUpdated: "今日 14:25"
};

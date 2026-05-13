import { createBrowserRouter } from "react-router-dom";
import { CallPage } from "../features/calling/CallPage";
import { CaregiverContactsPage } from "../features/caregiver/CaregiverContactsPage";
import { CaregiverDashboardPage } from "../features/caregiver/CaregiverDashboardPage";
import { CaregiverDestinationsPage } from "../features/caregiver/CaregiverDestinationsPage";
import { CaregiverSettingsPage } from "../features/caregiver/CaregiverSettingsPage";
import { CaregiverUpdatesPage } from "../features/caregiver/CaregiverUpdatesPage";
import { CustomActionPage } from "../features/custom-grid/CustomActionPage";
import { CaregiverCustomSlotsPage } from "../features/custom-grid/CaregiverCustomSlotsPage";
import { ElderHomePage } from "../features/elder-home/ElderHomePage";
import { CaregiverMedicinePage } from "../features/medicine/CaregiverMedicinePage";
import { ElderMedicinePage } from "../features/medicine/ElderMedicinePage";
import { DestinationDetailPage } from "../features/navigation/DestinationDetailPage";
import { DestinationsPage } from "../features/navigation/DestinationsPage";
import { HomeDestinationPage } from "../features/navigation/HomeDestinationPage";
import { CaregiverPairingPage } from "../features/pairing/CaregiverPairingPage";
import { ElderPairingImportPage } from "../features/pairing/ElderPairingImportPage";
import { SettingsPage } from "../features/settings/SettingsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ElderHomePage />
  },
  {
    path: "/go-home",
    element: <HomeDestinationPage />
  },
  {
    path: "/places",
    element: <DestinationsPage />
  },
  {
    path: "/places/:destinationId",
    element: <DestinationDetailPage />
  },
  {
    path: "/call",
    element: <CallPage />
  },
  {
    path: "/medicine",
    element: <ElderMedicinePage />
  },
  {
    path: "/custom/:slotId",
    element: <CustomActionPage />
  },
  {
    path: "/caregiver",
    element: <CaregiverDashboardPage />
  },
  {
    path: "/caregiver/updates",
    element: <CaregiverUpdatesPage />
  },
  {
    path: "/caregiver/settings",
    element: <CaregiverSettingsPage />
  },
  {
    path: "/caregiver/destinations",
    element: <CaregiverDestinationsPage />
  },
  {
    path: "/caregiver/contacts",
    element: <CaregiverContactsPage />
  },
  {
    path: "/caregiver/medicine",
    element: <CaregiverMedicinePage />
  },
  {
    path: "/caregiver/custom-slots",
    element: <CaregiverCustomSlotsPage />
  },
  {
    path: "/caregiver/pairing",
    element: <CaregiverPairingPage />
  },
  {
    path: "/pair/import",
    element: <ElderPairingImportPage />
  },
  {
    path: "/settings",
    element: <SettingsPage />
  },
  {
    path: "/settings/pair-caregiver",
    element: <CaregiverPairingPage />
  },
  {
    path: "/settings/pair-elder",
    element: <ElderPairingImportPage />
  }
]);

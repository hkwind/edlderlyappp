import type { ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import { useAppStore } from "../src/app/store";
import { mockCustomSlots } from "../src/data/mockCustomSlots";
import { mockDestinations } from "../src/data/mockDestinations";
import { mockPatient, mockContacts } from "../src/data/mockPatient";
import { mockReminders } from "../src/data/mockReminders";
import { mockDeviceStatus, mockLocationStatus } from "../src/data/mockStatus";
import { CallPage } from "../src/features/calling/CallPage";
import { CaregiverDashboardPage } from "../src/features/caregiver/CaregiverDashboardPage";
import { ElderMedicinePage } from "../src/features/medicine/ElderMedicinePage";

function Wrapper({ children }: { children: ReactNode }) {
  return (
    <MemoryRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      {children}
    </MemoryRouter>
  );
}

beforeEach(() => {
  useAppStore.setState({
    patient: mockPatient,
    contacts: mockContacts,
    destinations: mockDestinations,
    reminders: mockReminders,
    customSlots: mockCustomSlots,
    locationStatus: mockLocationStatus,
    deviceStatus: mockDeviceStatus
  });
});

describe("Phase 3 interactions", () => {
  it("lets the elder mark a medicine item as done", async () => {
    const user = userEvent.setup();

    render(<ElderMedicinePage />, { wrapper: Wrapper });

    await user.click(screen.getByRole("button", { name: "我已經食咗" }));

    expect(screen.getAllByText("已完成").length).toBeGreaterThan(0);
    expect(screen.getAllByRole("button", { name: "改回未完成" }).length).toBeGreaterThan(0);
  });

  it("shows a call confirmation summary after choosing a family contact", async () => {
    const user = userEvent.setup();

    render(<CallPage />, { wrapper: Wrapper });

    await user.click(screen.getByRole("button", { name: /美玲/ }));

    expect(screen.getByText("正在準備打電話")).toBeInTheDocument();
    expect(screen.getAllByText("9123 4567").length).toBeGreaterThan(0);
  });

  it("shows the caregiver quick preview section", () => {
    render(<CaregiverDashboardPage />, { wrapper: Wrapper });

    expect(screen.getByText("快速預覽")).toBeInTheDocument();
    expect(screen.getByText("屋企地點")).toBeInTheDocument();
    expect(screen.getByText("下一個食藥項目")).toBeInTheDocument();
  });
});

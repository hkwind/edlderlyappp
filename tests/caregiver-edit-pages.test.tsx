import type { ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { CaregiverContactsPage } from "../src/features/caregiver/CaregiverContactsPage";
import { CaregiverDestinationsPage } from "../src/features/caregiver/CaregiverDestinationsPage";
import { CaregiverCustomSlotsPage } from "../src/features/custom-grid/CaregiverCustomSlotsPage";
import { CaregiverMedicinePage } from "../src/features/medicine/CaregiverMedicinePage";

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

describe("Caregiver edit pages", () => {
  it("renders the destinations editor", () => {
    render(<CaregiverDestinationsPage />, { wrapper: Wrapper });

    expect(screen.getByText("管理地點")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "儲存地點" })).toBeInTheDocument();
  });

  it("renders the contacts editor", () => {
    render(<CaregiverContactsPage />, { wrapper: Wrapper });

    expect(screen.getByText("管理聯絡人")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "儲存聯絡人" })).toBeInTheDocument();
    expect(screen.getByText("上載照片")).toBeInTheDocument();
  });

  it("renders the medicine editor with alert controls", () => {
    render(<CaregiverMedicinePage />, { wrapper: Wrapper });

    expect(screen.getByText("管理食藥提醒")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "儲存提醒" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "測試提醒" })).toBeInTheDocument();
    expect(screen.getByLabelText("啟用鬧鐘／通知")).toBeInTheDocument();
  });

  it("renders the custom slot editor with home visibility controls", () => {
    render(<CaregiverCustomSlotsPage />, { wrapper: Wrapper });

    expect(screen.getByText("管理自訂格")).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: "儲存自訂格" })).toHaveLength(2);
    expect(screen.getAllByLabelText("在長者主頁顯示")).toHaveLength(2);
  });
});

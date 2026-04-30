import type { ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { CaregiverDestinationsPage } from "../src/features/caregiver/CaregiverDestinationsPage";
import { CaregiverMedicinePage } from "../src/features/medicine/CaregiverMedicinePage";
import { CaregiverCustomSlotsPage } from "../src/features/custom-grid/CaregiverCustomSlotsPage";

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

  it("renders the medicine editor", () => {
    render(<CaregiverMedicinePage />, { wrapper: Wrapper });

    expect(screen.getByText("管理食藥提醒")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "儲存提醒" })).toBeInTheDocument();
  });

  it("renders the custom slot editor", () => {
    render(<CaregiverCustomSlotsPage />, { wrapper: Wrapper });

    expect(screen.getByText("管理自訂格")).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: "儲存自訂格" })).toHaveLength(2);
  });
});

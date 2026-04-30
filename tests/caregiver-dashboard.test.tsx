import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { CaregiverDashboardPage } from "../src/features/caregiver/CaregiverDashboardPage";

describe("CaregiverDashboardPage", () => {
  it("shows the mock status summary cards", () => {
    render(
      <MemoryRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true
        }}
      >
        <CaregiverDashboardPage />
      </MemoryRouter>
    );

    expect(screen.getByText("照顧者總覽")).toBeInTheDocument();
    expect(screen.getByText("食藥提醒")).toBeInTheDocument();
    expect(screen.getByText("安全區")).toBeInTheDocument();
    expect(screen.getByText("目前位置")).toBeInTheDocument();
    expect(screen.getByText("電量")).toBeInTheDocument();
  });
});

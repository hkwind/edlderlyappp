import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { CaregiverDashboardPage } from "../src/features/caregiver/CaregiverDashboardPage";

describe("CaregiverDashboardPage", () => {
  it("shows the real-app dashboard summary and bottom nav", () => {
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
    expect(screen.getByText("目前位置")).toBeInTheDocument();
    expect(screen.getByText("安全區")).toBeInTheDocument();
    expect(screen.getByText("食藥完成")).toBeInTheDocument();
    expect(screen.getByText("手機電量")).toBeInTheDocument();
    expect(screen.getByText("總覽")).toBeInTheDocument();
    expect(screen.getByText("更新")).toBeInTheDocument();
    expect(screen.getByText("設定")).toBeInTheDocument();
  });
});

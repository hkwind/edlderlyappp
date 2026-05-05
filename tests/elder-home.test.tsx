import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { ElderHomePage } from "../src/features/elder-home/ElderHomePage";

describe("ElderHomePage", () => {
  it("shows the four primary actions by default", () => {
    render(
      <MemoryRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true
        }}
      >
        <ElderHomePage />
      </MemoryRouter>
    );

    expect(screen.getByRole("link", { name: /回家/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /打電話/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /食藥/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /去其他地方/i })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /去診所/i })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /設定/i })).toBeInTheDocument();
  });
});

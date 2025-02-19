import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { Tabs } from "./Tabs";
import "@testing-library/jest-dom";

describe("Tabs", () => {
  test("renders a Tabs component with 2 Tabs", () => {
    const tabs = [
      { name: "Details", href: "/" },
      { name: "Cortex", href: "/cortex" },
    ];

    render(
      <MemoryRouter>
        <Tabs tabs={tabs} />
      </MemoryRouter>
    );

    const firstTab = screen.getByText("Details");
    const secondTab = screen.getByText("Cortex");

    expect(firstTab).toBeInTheDocument();
    expect(secondTab).toBeInTheDocument();
  });
});

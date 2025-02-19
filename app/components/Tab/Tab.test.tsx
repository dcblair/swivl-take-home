import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { Tab } from "./Tab";
import "@testing-library/jest-dom";

describe("Tab", () => {
  test("renders a Tab component with the content Details", () => {
    render(
      <MemoryRouter>
        <Tab to="/">Details</Tab>
      </MemoryRouter>
    );

    const tab = screen.getByText("Details");

    expect(tab).toBeInTheDocument();
  });
});

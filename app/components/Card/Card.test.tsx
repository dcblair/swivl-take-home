import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { Card } from "./Card";
import "@testing-library/jest-dom";

describe("Card", () => {
  test("renders a Card component with the content Click me", () => {
    render(<Card>This is a card.</Card>);

    const card = screen.queryByText("This is a card.");

    expect(card).toBeInTheDocument();
  });

  test("renders a Card with a loading spinner inside", () => {
    render(<Card loading />);

    const spinner = screen.getByRole("status");
    expect(spinner).toBeVisible();
  });
});

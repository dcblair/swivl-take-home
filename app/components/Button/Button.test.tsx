import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./Button";
import "@testing-library/jest-dom";

describe("Button", () => {
  test("renders a Button component with the content Click me", () => {
    render(<Button onClick={() => {}}>Click me</Button>);

    const button = screen.getByText("Click me");

    expect(button).toBeInTheDocument();
  });

  test("fires onClick once on clicking Button", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click me</Button>);

    const button = screen.getByText("Click me");
    await userEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test("doesn't fire onClick if Button is disabled", async () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Click me
      </Button>
    );

    const button = screen.getByText("Click me");
    await userEvent.click(button);

    expect(button).toBeDisabled();
    expect(onClick).not.toHaveBeenCalled();
  });
});

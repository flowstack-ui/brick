import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Toggle } from "../../../src/toggle.js";

describe("Toggle", () => {
  it("owns standalone pressed state and defaults", async () => {
    const user = userEvent.setup();
    render(<Toggle>Bold</Toggle>);
    const toggle = screen.getByRole("button", { name: "Bold" });
    expect(toggle).toHaveAttribute("aria-pressed", "false");
    expect(toggle).toHaveAttribute("data-variant", "soft");
    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-pressed", "true");
  });
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Checkbox } from "../../../src/checkbox.js";

describe("Checkbox", () => {
  it("owns standalone checked state and visual anatomy", async () => {
    const user = userEvent.setup();
    render(<Checkbox>Updates</Checkbox>);
    const checkbox = screen.getByRole("checkbox", { name: "Updates" });
    expect(checkbox).toHaveClass("brick-checkbox");
    expect(checkbox).toHaveAttribute("data-state", "unchecked");
    await user.click(checkbox);
    expect(checkbox).toHaveAttribute("data-state", "checked");
  });
});

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Form } from "../../../src/form.js";

describe("Form", () => {
  it("owns the styled native form boundary", () => {
    render(<Form aria-label="Profile"><button type="submit">Save</button></Form>);
    const form = screen.getByRole("form", { name: "Profile" });
    expect(form).toHaveClass("brick-form");
    expect(form).toHaveAttribute("data-slot", "form");
  });
});

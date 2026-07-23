import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Input } from "@flowstack-ui/atom/input";
import { Field } from "../../../src/field.js";

describe("Field", () => {
  it("owns label, description, and control relationships", () => {
    render(
      <Field.Root id="email" required>
        <Field.Label>Email</Field.Label>
        <Input.Root name="email" />
        <Field.Description>Use a work address.</Field.Description>
      </Field.Root>,
    );
    const input = screen.getByRole("textbox", { name: "Email" });
    expect(input).toHaveAttribute("id", "email-control");
    expect(input).toHaveAttribute("aria-describedby", "email-description");
    expect(screen.getByText("Use a work address.")).toHaveClass("brick-field-description");
  });
});

import { createRef } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Input } from "@flowstack-ui/atom/input";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldRequiredIndicator,
  FieldRoot,
} from "../../../src/field.js";

describe("Field", () => {
  it("owns the exact frozen namespace", () => {
    expect(Object.keys(Field)).toEqual([
      "Root",
      "Label",
      "Description",
      "Error",
      "RequiredIndicator",
    ]);
    expect(Object.isFrozen(Field)).toBe(true);
    expect(Field.Root).toBe(FieldRoot);
    expect(Field.Label).toBe(FieldLabel);
    expect(Field.Description).toBe(FieldDescription);
    expect(Field.Error).toBe(FieldError);
    expect(Field.RequiredIndicator).toBe(FieldRequiredIndicator);
  });

  it("owns complete defaults, relationships, state, and visual hooks", () => {
    render(
      <Field.Root id="email" disabled invalid readOnly required>
        <Field.Label>Email</Field.Label>
        <Input.Root name="email" />
        <Field.Description>Use a work address.</Field.Description>
        <Field.Error>Enter a valid address.</Field.Error>
      </Field.Root>,
    );
    const field = screen.getByText("Email").closest(".brick-field");
    const input = screen.getByRole("textbox", { name: "Email" });
    expect(field).toHaveAttribute("data-orientation", "vertical");
    expect(field).toHaveAttribute("data-disabled");
    expect(field).toHaveAttribute("data-required");
    expect(field).toHaveAttribute("data-readonly");
    expect(field).toHaveAttribute("data-invalid");
    expect(input).toHaveAttribute("id", "email-control");
    expect(input).toHaveAttribute(
      "aria-describedby",
      "email-description email-error",
    );
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toBeDisabled();
    expect(field?.querySelector('[data-slot="field-required-indicator"]')).toHaveTextContent("*");
  });

  it("owns optional, required, conditional, and forced messages", () => {
    const { rerender } = render(
      <Field.Root id="name">
        <Field.Label optionalIndicator=" (optional)">Name</Field.Label>
        <Input.Root name="name" />
        <Field.RequiredIndicator fallback="Optional" />
        <Field.Error forceMatch role="status">Server message</Field.Error>
      </Field.Root>,
    );
    expect(screen.getAllByText(/optional/i)).toHaveLength(2);
    expect(screen.getByRole("status")).toHaveClass("brick-field-error");
    rerender(
      <Field.Root id="name" invalid required>
        <Field.Label requiredIndicator={null}>Name</Field.Label>
        <Input.Root name="name" />
        <Field.RequiredIndicator>Required</Field.RequiredIndicator>
        <Field.Error match={false}>Hidden match</Field.Error>
        <Field.Error match>Visible match</Field.Error>
      </Field.Root>,
    );
    expect(screen.getByText("Required")).toHaveAttribute("aria-hidden", "true");
    expect(screen.queryByText("Hidden match")).toBeNull();
    expect(screen.getByText("Visible match")).toBeVisible();
  });

  it("forwards consumer hooks and every part composition path", () => {
    const rootRef = createRef<HTMLDivElement>();
    const onClick = vi.fn();
    render(
      <Field.Root className="consumer-field" data-slot="profile-field" id="profile" invalid onClick={onClick} orientation="horizontal" ref={rootRef} render={<section data-adapter="field" />}>
        <Field.Label asChild><label data-adapter="label">Profile email</label></Field.Label>
        <Input.Root name="profile" />
        <Field.Description render={<div data-adapter="description" />}>Help</Field.Description>
        <Field.Error asChild><div data-adapter="error">Error</div></Field.Error>
        <Field.RequiredIndicator asChild><strong>Required</strong></Field.RequiredIndicator>
      </Field.Root>,
    );
    expect(rootRef.current).toHaveClass("brick-field", "consumer-field");
    expect(rootRef.current).toHaveAttribute("data-slot", "profile-field");
    expect(rootRef.current).toHaveAttribute("data-orientation", "horizontal");
    expect(screen.getByText("Profile email")).toHaveClass("brick-field-label");
    expect(screen.getByText("Help")).toHaveClass("brick-field-description");
    expect(screen.getByText("Error")).toHaveClass("brick-field-error");
    fireEvent.click(rootRef.current!);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("preserves relationships in default and asChild server markup", () => {
    const defaultHtml = renderToStaticMarkup(
      <Field.Root id="server-email" invalid>
        <Field.Label>Email</Field.Label><Input.Root name="email" />
        <Field.Description>Help</Field.Description><Field.Error>Error</Field.Error>
      </Field.Root>,
    );
    const composedHtml = renderToStaticMarkup(
      <Field.Root asChild id="composed-email" invalid>
        <section><Field.Label>Email</Field.Label><Input.Root name="email" /><Field.Description>Help</Field.Description><Field.Error>Error</Field.Error></section>
      </Field.Root>,
    );
    expect(defaultHtml).toContain(
      'aria-describedby="server-email-description server-email-error"',
    );
    expect(composedHtml).toContain("<section");
    expect(composedHtml).toContain(
      'aria-describedby="composed-email-description composed-email-error"',
    );
  });
});

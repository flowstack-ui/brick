import { createRef } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CheckboxGroup } from "@flowstack-ui/atom/checkbox-group";
import { Input } from "@flowstack-ui/atom/input";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldRequiredIndicator,
  FieldRoot,
} from "../../src/field.js";
import {
  Fieldset,
  FieldsetDescription,
  FieldsetError,
  FieldsetLegend,
  FieldsetRoot,
} from "../../src/fieldset.js";
import { Form } from "../../src/form.js";

describe("Form foundation", () => {
  it("exposes direct Form and the exact frozen Field namespaces", () => {
    expect("Root" in Form).toBe(false);
    expect(Object.keys(Field)).toEqual([
      "Root",
      "Label",
      "Description",
      "Error",
      "RequiredIndicator",
    ]);
    expect(Object.keys(Fieldset)).toEqual([
      "Root",
      "Legend",
      "Description",
      "Error",
    ]);
    expect(Object.isFrozen(Field)).toBe(true);
    expect(Object.isFrozen(Fieldset)).toBe(true);
    expect(Field.Root).toBe(FieldRoot);
    expect(Field.Label).toBe(FieldLabel);
    expect(Field.Description).toBe(FieldDescription);
    expect(Field.Error).toBe(FieldError);
    expect(Field.RequiredIndicator).toBe(FieldRequiredIndicator);
    expect(Fieldset.Root).toBe(FieldsetRoot);
    expect(Fieldset.Legend).toBe(FieldsetLegend);
    expect(Fieldset.Description).toBe(FieldsetDescription);
    expect(Fieldset.Error).toBe(FieldsetError);
  });

  it("renders complete Field defaults, relationships, state, and visual hooks", () => {
    render(
      <Field.Root
        id="email"
        disabled
        invalid
        readOnly
        required
      >
        <Field.Label>Email</Field.Label>
        <Input.Root name="email" />
        <Field.Description>Use a work address.</Field.Description>
        <Field.Error>Enter a valid address.</Field.Error>
      </Field.Root>,
    );

    const field = screen.getByText("Email").closest(".brick-field");
    const input = screen.getByRole("textbox", { name: "Email" });
    expect(field?.tagName).toBe("DIV");
    expect(field).toHaveAttribute("data-slot", "field");
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
    expect(input).toHaveAttribute("readonly");
    expect(screen.getByText("Use a work address.")).toHaveClass(
      "brick-field-description",
    );
    const error = screen.getByText("Enter a valid address.");
    expect(error).toHaveClass("brick-field-error");
    expect(error).not.toHaveAttribute("role");
    expect(field?.querySelector('[data-slot="field-required-indicator"]')).toHaveTextContent("*");
  });

  it("supports optional, separate required, conditional, forced, and native live messages", () => {
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
    expect(screen.getByRole("textbox")).toHaveAttribute(
      "aria-describedby",
      "name-error",
    );

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

  it("forwards native props, refs, events, styles, classes, slots, and orientation", () => {
    const rootRef = createRef<HTMLDivElement>();
    const labelRef = createRef<HTMLLabelElement>();
    const descriptionRef = createRef<HTMLParagraphElement>();
    const errorRef = createRef<HTMLParagraphElement>();
    const onClick = vi.fn();
    render(
      <Field.Root
        aria-label="Profile email"
        className="consumer-field"
        data-purpose="profile"
        data-slot="profile-field"
        id="profile"
        onClick={onClick}
        orientation="horizontal"
        ref={rootRef}
        style={{ marginTop: 3 }}
        invalid
      >
        <Field.Label className="consumer-label" data-slot="profile-label" ref={labelRef}>
          Profile email
        </Field.Label>
        <Input.Root name="profile" />
        <Field.Description ref={descriptionRef}>Description</Field.Description>
        <Field.Error ref={errorRef}>Error</Field.Error>
      </Field.Root>,
    );

    expect(rootRef.current).toHaveClass("brick-field", "consumer-field");
    expect(rootRef.current).toHaveAttribute("data-purpose", "profile");
    expect(rootRef.current).toHaveAttribute("data-slot", "profile-field");
    expect(rootRef.current).toHaveAttribute("data-orientation", "horizontal");
    expect(rootRef.current).toHaveStyle({ marginTop: "3px" });
    expect(labelRef.current).toHaveClass("brick-field-label", "consumer-label");
    expect(labelRef.current).toHaveAttribute("data-slot", "profile-label");
    expect(descriptionRef.current).toHaveClass("brick-field-description");
    expect(errorRef.current).toHaveClass("brick-field-error");
    fireEvent.click(rootRef.current!);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("preserves styled Field relationships in default and Root asChild server markup", () => {
    const defaultHtml = renderToStaticMarkup(
      <Field.Root id="server-email" invalid>
        <Field.Label>Email</Field.Label>
        <Input.Root name="email" />
        <Field.Description>Help</Field.Description>
        <Field.Error>Error</Field.Error>
      </Field.Root>,
    );
    const composedHtml = renderToStaticMarkup(
      <Field.Root asChild id="composed-email" invalid>
        <section>
          <Field.Label>Email</Field.Label>
          <Input.Root name="email" />
          <Field.Description>Help</Field.Description>
          <Field.Error>Error</Field.Error>
        </section>
      </Field.Root>,
    );

    expect(defaultHtml).toContain(
      'aria-describedby="server-email-description server-email-error"',
    );
    expect(defaultHtml).toContain('class="brick-field-description"');
    expect(composedHtml).toContain("<section");
    expect(composedHtml).toContain('class="brick-field"');
    expect(composedHtml).toContain(
      'aria-describedby="composed-email-description composed-email-error"',
    );
  });

  it("supports render and asChild composition on every Field part", () => {
    render(
      <Field.Root render={<section data-adapter="field" />} id="rendered" invalid required>
        <Field.Label asChild><label data-adapter="label">Rendered label</label></Field.Label>
        <Input.Root name="rendered" />
        <Field.Description render={<div data-adapter="description" />}>Help</Field.Description>
        <Field.Error asChild><div data-adapter="error">Error</div></Field.Error>
        <Field.RequiredIndicator asChild>
          <strong data-adapter="indicator">Required</strong>
        </Field.RequiredIndicator>
      </Field.Root>,
    );

    expect(screen.getByText("Rendered label").closest("section")).toHaveAttribute(
      "data-adapter",
      "field",
    );
    expect(screen.getByText(/Rendered label/)).toHaveClass("brick-field-label");
    expect(screen.getByText("Help")).toHaveClass("brick-field-description");
    expect(screen.getByText("Error")).toHaveClass("brick-field-error");
    expect(screen.getByText("Required")).toHaveClass("brick-field-required-indicator");
  });

  it("renders complete Fieldset semantics, relationships, indicators, and group state", () => {
    render(
      <Fieldset.Root id="topics" disabled invalid required>
        <Fieldset.Legend>Topics</Fieldset.Legend>
        <Fieldset.Description>Choose at least one.</Fieldset.Description>
        <CheckboxGroup.Root name="topics">
          <CheckboxGroup.Item value="news">News</CheckboxGroup.Item>
        </CheckboxGroup.Root>
        <Fieldset.Error>Choose a topic.</Fieldset.Error>
      </Fieldset.Root>,
    );

    const groupRoot = document.querySelector("#topics") as HTMLFieldSetElement;
    const checkboxGroup = document.querySelector('[data-slot="checkbox-group"]');
    expect(groupRoot.tagName).toBe("FIELDSET");
    expect(groupRoot).toHaveClass("brick-fieldset");
    expect(groupRoot).toBeDisabled();
    expect(groupRoot).toHaveAttribute("aria-invalid", "true");
    expect(groupRoot).not.toHaveAttribute("aria-required");
    expect(groupRoot).toHaveAttribute(
      "aria-describedby",
      "topics-description topics-error",
    );
    expect(checkboxGroup).toHaveAttribute("aria-labelledby", "topics-legend");
    expect(checkboxGroup).toHaveAttribute(
      "aria-describedby",
      "topics-description topics-error",
    );
    expect(screen.getByText("Topics")).toHaveClass("brick-fieldset-legend");
    expect(screen.getByText("Choose at least one.")).toHaveClass(
      "brick-fieldset-description",
    );
    expect(screen.getByText("Choose a topic.")).toHaveClass("brick-fieldset-error");
  });

  it("preserves styled Fieldset relationships in asChild server markup", () => {
    const html = renderToStaticMarkup(
      <Fieldset.Root asChild id="methods" invalid>
        <fieldset>
          <Fieldset.Legend>Methods</Fieldset.Legend>
          <Fieldset.Description>Choose one.</Fieldset.Description>
          <CheckboxGroup.Root name="methods">
            <CheckboxGroup.Item value="email">Email</CheckboxGroup.Item>
          </CheckboxGroup.Root>
          <Fieldset.Error>Selection required.</Fieldset.Error>
        </fieldset>
      </Fieldset.Root>,
    );

    expect(html).toContain('class="brick-fieldset"');
    expect(html).toContain('id="methods-legend"');
    expect(html).toContain(
      'aria-describedby="methods-description methods-error"',
    );
    expect(html).toContain('class="brick-fieldset-description"');
  });

  it("supports every Fieldset part composition path and native hooks", () => {
    const rootRef = createRef<HTMLFieldSetElement>();
    const onClick = vi.fn();
    render(
      <Fieldset.Root
        className="consumer-fieldset"
        data-slot="preferences"
        id="preferences"
        invalid
        onClick={onClick}
        ref={rootRef}
        render={<fieldset data-adapter="fieldset" />}
      >
        <Fieldset.Legend asChild><legend data-adapter="legend">Preferences</legend></Fieldset.Legend>
        <Fieldset.Description render={<div data-adapter="description" />}>Help</Fieldset.Description>
        <Fieldset.Error asChild><div data-adapter="error">Error</div></Fieldset.Error>
      </Fieldset.Root>,
    );

    expect(rootRef.current).toHaveClass("brick-fieldset", "consumer-fieldset");
    expect(rootRef.current).toHaveAttribute("data-slot", "preferences");
    expect(rootRef.current).toHaveAttribute("data-adapter", "fieldset");
    expect(screen.getByText(/Preferences/)).toHaveClass("brick-fieldset-legend");
    expect(screen.getByText("Help")).toHaveClass("brick-fieldset-description");
    expect(screen.getByText("Error")).toHaveClass("brick-fieldset-error");
    fireEvent.click(rootRef.current!);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("forwards the complete native Form surface and composition", () => {
    const formRef = createRef<HTMLFormElement>();
    const onReset = vi.fn();
    const { rerender } = render(
      <Form
        acceptCharset="utf-8"
        action="/profiles"
        aria-label="Profile"
        autoComplete="off"
        className="consumer-form"
        data-form-id="profile"
        data-slot="profile-form"
        encType="multipart/form-data"
        method="post"
        name="profile"
        noValidate
        onReset={onReset}
        ref={formRef}
        style={{ paddingTop: 2 }}
        target="_self"
      >
        <button type="reset">Reset</button>
      </Form>,
    );

    expect(formRef.current).toHaveClass("brick-form", "consumer-form");
    expect(formRef.current).toHaveAttribute("action", "/profiles");
    expect(formRef.current).toHaveAttribute("method", "post");
    expect(formRef.current).toHaveAttribute("enctype", "multipart/form-data");
    expect(formRef.current).toHaveAttribute("target", "_self");
    expect(formRef.current).toHaveAttribute("name", "profile");
    expect(formRef.current).toHaveAttribute("novalidate");
    expect(formRef.current).toHaveAttribute("autocomplete", "off");
    expect(formRef.current).toHaveAttribute("data-form-id", "profile");
    expect(formRef.current).toHaveAttribute("data-slot", "profile-form");
    expect(formRef.current).toHaveStyle({ paddingTop: "2px" });
    fireEvent.reset(formRef.current!);
    expect(onReset).toHaveBeenCalledOnce();

    rerender(
      <Form asChild><form data-adapter="as-child"><button>Save</button></form></Form>,
    );
    expect(screen.getByRole("button", { name: "Save" }).closest("form")).toHaveClass(
      "brick-form",
    );

    rerender(
      <Form render={<form data-adapter="render" />}><button>Render save</button></Form>,
    );
    expect(screen.getByRole("button", { name: "Render save" }).closest("form")).toHaveAttribute(
      "data-adapter",
      "render",
    );
  });

  it("preserves async validation, submit state, submitted state, and reset", async () => {
    let finishSubmit!: () => void;
    const onSubmit = vi.fn(
      () => new Promise<void>((resolve) => {
        finishSubmit = resolve;
      }),
    );
    const validateOnSubmit = vi.fn(() => true);
    render(
      <Form
        aria-label="Async profile"
        onSubmit={onSubmit}
        preventDefaultOnSubmit
        validateOnSubmit={validateOnSubmit}
      >
        <button type="submit">Save</button>
        <button type="reset">Reset</button>
      </Form>,
    );

    const form = screen.getByRole("form", { name: "Async profile" });
    fireEvent.submit(form);
    await waitFor(() => expect(form).toHaveAttribute("data-submitting"));
    expect(validateOnSubmit).toHaveBeenCalledOnce();
    expect(onSubmit).toHaveBeenCalledOnce();

    finishSubmit();
    await waitFor(() => expect(form).toHaveAttribute("data-submitted"));
    expect(form).not.toHaveAttribute("data-submitting");
    fireEvent.reset(form);
    await waitFor(() => expect(form).not.toHaveAttribute("data-submitted"));
  });

  it("preserves validation failure and does not call submit", async () => {
    const onSubmit = vi.fn();
    render(
      <Form
        aria-label="Invalid form"
        onSubmit={onSubmit}
        preventDefaultOnSubmit
        validateOnSubmit={() => false}
      >
        <button type="submit">Save</button>
      </Form>,
    );

    const form = screen.getByRole("form", { name: "Invalid form" });
    fireEvent.submit(form);
    await waitFor(() => expect(form).toHaveAttribute("data-invalid"));
    expect(onSubmit).not.toHaveBeenCalled();
  });
});

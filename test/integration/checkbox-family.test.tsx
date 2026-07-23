import { createRef, useState } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Checkbox } from "../../src/checkbox.js";
import { CheckboxGroup } from "../../src/checkbox-group.js";
import { Field } from "../../src/field.js";
import { Fieldset } from "../../src/fieldset.js";
import { Form } from "../../src/form.js";

describe("Checkbox family", () => {
  it("renders complete Checkbox defaults, visual anatomy, native hooks, and refs", async () => {
    const user = userEvent.setup();
    const ref = createRef<HTMLButtonElement>();
    const onCheckedChange = vi.fn();
    const onClick = vi.fn();
    render(
      <Checkbox
        aria-label="Updates"
        className="consumer-checkbox"
        data-purpose="updates"
        name="updates"
        onCheckedChange={onCheckedChange}
        onClick={onClick}
        ref={ref}
        style={{ marginTop: 3 }}
        value="yes"
      />,
    );

    const checkbox = screen.getByRole("checkbox", { name: "Updates" });
    expect(ref.current).toBe(checkbox);
    expect(checkbox).toHaveClass("brick-checkbox", "consumer-checkbox");
    expect(checkbox).toHaveAttribute("data-slot", "checkbox");
    expect(checkbox).toHaveAttribute("data-size", "md");
    expect(checkbox).toHaveAttribute("data-state", "unchecked");
    expect(checkbox).toHaveAttribute("data-purpose", "updates");
    expect(checkbox).toHaveStyle({ marginTop: "3px" });
    expect(checkbox.querySelector(".brick-checkbox-control")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
    expect(checkbox.querySelector(".brick-checkbox-indicator")).toBeTruthy();
    expect(checkbox.querySelector(".brick-checkbox-check")).toBeTruthy();
    expect(checkbox.querySelector(".brick-checkbox-mixed")).toBeTruthy();

    await user.click(checkbox);
    expect(checkbox).toHaveAttribute("data-state", "checked");
    expect(onCheckedChange).toHaveBeenCalledWith(true);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("supports controlled checked and indeterminate state without Brick state", () => {
    function Example() {
      const [checked, setChecked] = useState<false | true | "indeterminate">(
        "indeterminate",
      );
      return (
        <Checkbox checked={checked} onCheckedChange={setChecked} size="lg">
          Controlled
        </Checkbox>
      );
    }
    render(<Example />);
    const checkbox = screen.getByRole("checkbox", { name: "Controlled" });
    expect(checkbox).toHaveAttribute("aria-checked", "mixed");
    expect(checkbox).toHaveAttribute("data-state", "indeterminate");
    expect(checkbox).toHaveAttribute("data-size", "lg");
    fireEvent.click(checkbox);
    expect(checkbox).toHaveAttribute("data-state", "checked");
  });

  it("preserves disabled, read-only, invalid, required, and custom slot state", () => {
    render(
      <Checkbox
        data-slot="consent-control"
        disabled
        invalid
        readOnly
        required
      >
        Consent
      </Checkbox>,
    );
    const checkbox = screen.getByRole("checkbox", { name: "Consent" });
    expect(checkbox).toBeDisabled();
    expect(checkbox).toHaveAttribute("aria-invalid", "true");
    expect(checkbox).toHaveAttribute("aria-readonly", "true");
    expect(checkbox).toHaveAttribute("aria-required", "true");
    expect(checkbox).toHaveAttribute("data-disabled");
    expect(checkbox).toHaveAttribute("data-readonly");
    expect(checkbox).toHaveAttribute("data-invalid");
    expect(checkbox).toHaveAttribute("data-required");
    expect(checkbox).toHaveAttribute("data-slot", "consent-control");
  });

  it("supports Checkbox render and asChild while retaining the visual control", () => {
    const composedRef = createRef<HTMLButtonElement>();
    render(
      <>
        <Checkbox render={<button data-adapter="render" />}>Rendered</Checkbox>
        <Checkbox asChild ref={composedRef} size="sm">
          <button data-adapter="child"><strong>Composed</strong></button>
        </Checkbox>
      </>,
    );
    const rendered = screen.getByRole("checkbox", { name: "Rendered" });
    const composed = screen.getByRole("checkbox", { name: "Composed" });
    expect(rendered).toHaveAttribute("data-adapter", "render");
    expect(rendered.querySelector(".brick-checkbox-control")).toBeTruthy();
    expect(composed).toHaveAttribute("data-adapter", "child");
    expect(composed).toHaveAttribute("data-size", "sm");
    expect(composed.querySelector(".brick-checkbox-control")).toBeTruthy();
    expect(composedRef.current).toBe(composed);
  });

  it("exposes the exact frozen CheckboxGroup namespace and defaults", () => {
    expect(Object.keys(CheckboxGroup)).toEqual([
      "Root",
      "Item",
      "ItemLabel",
      "ItemDescription",
      "Parent",
    ]);
    expect(Object.isFrozen(CheckboxGroup)).toBe(true);
    render(
      <CheckboxGroup.Root aria-label="Channels" allValues={["email"]}>
        <CheckboxGroup.Parent>All channels</CheckboxGroup.Parent>
        <CheckboxGroup.Item value="email">Email</CheckboxGroup.Item>
      </CheckboxGroup.Root>,
    );
    const group = screen.getByRole("group", { name: "Channels" });
    expect(group).toHaveClass("brick-checkbox-group");
    expect(group).toHaveAttribute("data-slot", "checkbox-group");
    expect(group).toHaveAttribute("data-size", "md");
    expect(group).toHaveAttribute("data-orientation", "vertical");
    expect(screen.getByRole("checkbox", { name: "Email" })).toHaveClass(
      "brick-checkbox-group-item",
    );
    expect(screen.getByRole("checkbox", { name: "All channels" })).toHaveClass(
      "brick-checkbox-group-parent",
    );
  });

  it("owns uncontrolled selection and deterministic Parent none/some/all", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <CheckboxGroup.Root
        aria-label="Channels"
        allValues={["email", "sms"]}
        defaultValue={["outside"]}
        onValueChange={onValueChange}
      >
        <CheckboxGroup.Parent>All</CheckboxGroup.Parent>
        <CheckboxGroup.Item value="email">Email</CheckboxGroup.Item>
        <CheckboxGroup.Item value="sms">SMS</CheckboxGroup.Item>
      </CheckboxGroup.Root>,
    );
    const parent = screen.getByRole("checkbox", { name: "All" });
    const email = screen.getByRole("checkbox", { name: "Email" });
    const sms = screen.getByRole("checkbox", { name: "SMS" });
    expect(parent).toHaveAttribute("data-state", "unchecked");
    await user.click(email);
    expect(parent).toHaveAttribute("aria-checked", "mixed");
    await user.click(parent);
    expect(email).toHaveAttribute("data-state", "checked");
    expect(sms).toHaveAttribute("data-state", "checked");
    expect(onValueChange).toHaveBeenLastCalledWith(["outside", "email", "sms"]);
    await user.click(parent);
    expect(email).toHaveAttribute("data-state", "unchecked");
    expect(sms).toHaveAttribute("data-state", "unchecked");
    expect(onValueChange).toHaveBeenLastCalledWith(["outside"]);
  });

  it("provides stable ItemLabel and ItemDescription relationships in SSR and DOM", () => {
    const tree = (
      <CheckboxGroup.Root aria-label="Destinations">
        <CheckboxGroup.Item value="email">
          <CheckboxGroup.ItemLabel>Email</CheckboxGroup.ItemLabel>
          <CheckboxGroup.ItemDescription>
            Weekly account summary.
          </CheckboxGroup.ItemDescription>
        </CheckboxGroup.Item>
      </CheckboxGroup.Root>
    );
    const html = renderToStaticMarkup(tree);
    expect(html).toContain("brick-checkbox-group-item-label");
    expect(html).toContain("brick-checkbox-group-item-description");
    expect(html).toMatch(/aria-labelledby="[^"]+"/);
    expect(html).toMatch(/aria-describedby="[^"]+"/);

    render(tree);
    const item = screen.getByRole("checkbox", { name: "Email" });
    const label = screen.getByText("Email");
    const description = screen.getByText("Weekly account summary.");
    expect(item).toHaveAttribute("aria-labelledby", label.id);
    expect(item).toHaveAttribute("aria-describedby", description.id);
    expect(label).toHaveClass("brick-checkbox-group-item-label");
    expect(description).toHaveClass("brick-checkbox-group-item-description");
  });

  it("supports every group composition path, refs, classes, styles, and slots", () => {
    const rootRef = createRef<HTMLDivElement>();
    const itemRef = createRef<HTMLButtonElement>();
    const labelRef = createRef<HTMLSpanElement>();
    const descriptionRef = createRef<HTMLSpanElement>();
    const parentRef = createRef<HTMLButtonElement>();
    render(
      <CheckboxGroup.Root
        aria-label="Composed"
        allValues={["one"]}
        className="consumer-group"
        data-slot="custom-group"
        orientation="horizontal"
        ref={rootRef}
        render={<section data-adapter="root" />}
        size="lg"
        style={{ marginTop: 2 }}
      >
        <CheckboxGroup.Parent asChild ref={parentRef}>
          <button data-adapter="parent">All</button>
        </CheckboxGroup.Parent>
        <CheckboxGroup.Item asChild ref={itemRef} value="one">
          <button data-adapter="item">
            <CheckboxGroup.ItemLabel asChild ref={labelRef}>
              <strong>One</strong>
            </CheckboxGroup.ItemLabel>
            <CheckboxGroup.ItemDescription
              ref={descriptionRef}
              render={<small data-adapter="description" />}
            >
              First choice
            </CheckboxGroup.ItemDescription>
          </button>
        </CheckboxGroup.Item>
      </CheckboxGroup.Root>,
    );
    expect(rootRef.current?.tagName).toBe("SECTION");
    expect(rootRef.current).toHaveClass("brick-checkbox-group", "consumer-group");
    expect(rootRef.current).toHaveAttribute("data-adapter", "root");
    expect(rootRef.current).toHaveAttribute("data-slot", "custom-group");
    expect(rootRef.current).toHaveAttribute("data-orientation", "horizontal");
    expect(rootRef.current).toHaveAttribute("data-size", "lg");
    expect(rootRef.current).toHaveStyle({ marginTop: "2px" });
    expect(parentRef.current).toHaveAttribute("data-adapter", "parent");
    expect(parentRef.current?.querySelector(".brick-checkbox-control")).toBeTruthy();
    expect(itemRef.current).toHaveAttribute("data-adapter", "item");
    expect(itemRef.current?.querySelector(".brick-checkbox-control")).toBeTruthy();
    expect(labelRef.current?.tagName).toBe("STRONG");
    expect(labelRef.current).toHaveClass("brick-checkbox-group-item-label");
    expect(descriptionRef.current?.tagName).toBe("SMALL");
    expect(descriptionRef.current).toHaveAttribute("data-adapter", "description");
  });

  it("submits, validates, resets, and honors external form ownership", async () => {
    const user = userEvent.setup();
    render(
      <>
        <Form aria-label="Preferences" id="preferences">
          <Checkbox name="terms" required value="accepted">Terms</Checkbox>
          <CheckboxGroup.Root name="channels" required>
            <CheckboxGroup.Item value="email">Email</CheckboxGroup.Item>
            <CheckboxGroup.Item value="sms">SMS</CheckboxGroup.Item>
          </CheckboxGroup.Root>
          <button type="reset">Reset</button>
        </Form>
        <Checkbox form="preferences" name="external" value="yes">External</Checkbox>
      </>,
    );
    const form = screen.getByRole("form", { name: "Preferences" }) as HTMLFormElement;
    const terms = screen.getByRole("checkbox", { name: "Terms" });
    const email = screen.getByRole("checkbox", { name: "Email" });
    const external = screen.getByRole("checkbox", { name: "External" });
    await user.click(terms);
    await user.click(email);
    await user.click(external);
    expect(new FormData(form).get("terms")).toBe("accepted");
    expect(new FormData(form).getAll("channels")).toEqual(["email"]);
    expect(new FormData(form).get("external")).toBe("yes");
    await user.click(screen.getByRole("button", { name: "Reset" }));
    expect(terms).toHaveAttribute("data-state", "unchecked");
    expect(email).toHaveAttribute("data-state", "unchecked");
    expect(external).toHaveAttribute("data-state", "unchecked");
  });

  it("presents required validity through Field and Fieldset without Brick validation wiring", async () => {
    const user = userEvent.setup();
    render(
      <Form aria-label="Release validation">
        <Field.Root required>
          <Field.Label>Acknowledgement</Field.Label>
          <Checkbox name="acknowledgement" required>
            Review release
          </Checkbox>
          <Field.Error>Review is required.</Field.Error>
        </Field.Root>
        <Fieldset.Root required>
          <Fieldset.Legend>Delivery</Fieldset.Legend>
          <CheckboxGroup.Root name="delivery" required>
            <CheckboxGroup.Item value="email">Email</CheckboxGroup.Item>
            <CheckboxGroup.Item value="push">Push</CheckboxGroup.Item>
          </CheckboxGroup.Root>
          <Fieldset.Error>Choose a delivery method.</Fieldset.Error>
        </Fieldset.Root>
      </Form>,
    );

    const form = screen.getByRole("form", {
      name: "Release validation",
    }) as HTMLFormElement;
    const acknowledgement = screen.getByRole("checkbox", {
      name: "Acknowledgement",
    });
    const email = screen.getByRole("checkbox", { name: "Email" });
    const field = acknowledgement.closest(".brick-field");
    const fieldset = email.closest(".brick-fieldset");
    const group = email.closest(".brick-checkbox-group");

    expect(screen.queryByText("Review is required.")).not.toBeInTheDocument();
    expect(
      screen.queryByText("Choose a delivery method."),
    ).not.toBeInTheDocument();
    expect(form.checkValidity()).toBe(false);

    await waitFor(() => {
      expect(form).toHaveAttribute("data-invalid");
      expect(field).toHaveAttribute("data-invalid");
      expect(fieldset).toHaveAttribute("data-invalid");
      expect(group).toHaveAttribute("data-invalid");
      expect(acknowledgement).toHaveAttribute("data-invalid");
      expect(email).toHaveAttribute("data-invalid");
      expect(screen.getByText("Review is required.")).toBeVisible();
      expect(screen.getByText("Choose a delivery method.")).toBeVisible();
    });

    await user.click(acknowledgement);
    await waitFor(() => {
      expect(field).not.toHaveAttribute("data-invalid");
      expect(acknowledgement).not.toHaveAttribute("data-invalid");
      expect(screen.queryByText("Review is required.")).not.toBeInTheDocument();
    });
    expect(form).toHaveAttribute("data-invalid");
    expect(fieldset).toHaveAttribute("data-invalid");

    await user.click(email);
    await waitFor(() => {
      expect(form).not.toHaveAttribute("data-invalid");
      expect(fieldset).not.toHaveAttribute("data-invalid");
      expect(group).not.toHaveAttribute("data-invalid");
      expect(email).not.toHaveAttribute("data-invalid");
      expect(
        screen.queryByText("Choose a delivery method."),
      ).not.toBeInTheDocument();
    });
  });

  it("inherits Fieldset naming, description, state, and required validity", () => {
    render(
      <Fieldset.Root id="topics" invalid required>
        <Fieldset.Legend>Topics</Fieldset.Legend>
        <Fieldset.Description>Choose at least one.</Fieldset.Description>
        <CheckboxGroup.Root name="topics">
          <CheckboxGroup.Item value="design">Design</CheckboxGroup.Item>
        </CheckboxGroup.Root>
        <Fieldset.Error>Selection required.</Fieldset.Error>
      </Fieldset.Root>,
    );
    const group = document.querySelector(".brick-checkbox-group");
    const item = screen.getByRole("checkbox", { name: "Design" });
    expect(group).toHaveAttribute("aria-describedby", "topics-description topics-error");
    expect(group).toHaveAttribute("data-invalid");
    expect(group).toHaveAttribute("data-required");
    expect(item).toHaveAttribute("aria-invalid", "true");
    expect(item).toHaveAttribute("aria-required", "true");
  });
});

import { createRef, useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Field } from "../../../src/field.js";
import {
  Switch,
  type SwitchSize,
  type SwitchVariant,
} from "../../../src/switch.js";

describe("Switch", () => {
  it("renders adopted defaults, anatomy, slots, and refs", () => {
    const rootRef = createRef<HTMLButtonElement>();
    const thumbRef = createRef<HTMLSpanElement>();
    render(
      <Switch.Root aria-label="Weekly reports" ref={rootRef}>
        <Switch.Thumb ref={thumbRef} />
      </Switch.Root>,
    );
    const root = screen.getByRole("switch", { name: "Weekly reports" });
    const thumb = root.querySelector("[data-slot='switch-thumb']");
    expect(root).toBe(rootRef.current);
    expect(thumb).toBe(thumbRef.current);
    expect(root).toHaveClass("brick-switch");
    expect(root).toHaveAttribute("data-slot", "switch");
    expect(root).toHaveAttribute("data-size", "md");
    expect(root).toHaveAttribute("data-variant", "solid");
    expect(root).toHaveAttribute("data-state", "unchecked");
    expect(thumb).toHaveClass("brick-switch-thumb");
    expect(thumb).toHaveAttribute("aria-hidden", "true");
  });

  it("supports every closed size without leaking the visual prop", () => {
    const sizes: SwitchSize[] = ["xs", "sm", "md", "lg"];
    const { rerender } = render(
      <Switch.Root aria-label="Reports">
        <Switch.Thumb />
      </Switch.Root>,
    );
    for (const size of sizes) {
      rerender(
        <Switch.Root aria-label="Reports" size={size}>
          <Switch.Thumb />
        </Switch.Root>,
      );
      const root = screen.getByRole("switch");
      expect(root).toHaveAttribute("data-size", size);
      expect(root).not.toHaveAttribute("size");
    }
  });

  it("supports both visual variants without leaking the recipe prop", () => {
    const variants: SwitchVariant[] = ["solid", "raised"];
    const { rerender } = render(
      <Switch.Root aria-label="Reports">
        <Switch.Thumb />
      </Switch.Root>,
    );
    for (const variant of variants) {
      rerender(
        <Switch.Root aria-label="Reports" variant={variant}>
          <Switch.Thumb />
        </Switch.Root>,
      );
      const root = screen.getByRole("switch");
      expect(root).toHaveAttribute("data-variant", variant);
      expect(root).not.toHaveAttribute("variant");
    }
  });

  it("preserves controlled interaction and state on both parts", async () => {
    const user = userEvent.setup();
    const changes = vi.fn();
    function Controlled() {
      const [checked, setChecked] = useState(false);
      return (
        <Switch.Root
          aria-label="Reports"
          checked={checked}
          onCheckedChange={(next) => {
            changes(next);
            setChecked(next);
          }}
        >
          <Switch.Thumb />
        </Switch.Root>
      );
    }
    render(<Controlled />);
    const root = screen.getByRole("switch");
    await user.click(root);
    expect(changes).toHaveBeenLastCalledWith(true);
    expect(root).toHaveAttribute("aria-checked", "true");
    expect(root.querySelector("[data-slot='switch-thumb']")).toHaveAttribute(
      "data-state",
      "checked",
    );
  });

  it("keeps read-only focusable, disabled unavailable, and form state native", async () => {
    const user = userEvent.setup();
    const changes = vi.fn();
    render(
      <>
        <Switch.Root
          aria-label="Read only"
          defaultChecked
          name="reports"
          onCheckedChange={changes}
          readOnly
          required
          value="enabled"
        >
          <Switch.Thumb />
        </Switch.Root>
        <Switch.Root aria-label="Disabled" disabled>
          <Switch.Thumb />
        </Switch.Root>
      </>,
    );
    const readOnly = screen.getByRole("switch", { name: "Read only" });
    const disabled = screen.getByRole("switch", { name: "Disabled" });
    expect(readOnly).toHaveAttribute("aria-readonly", "true");
    expect(readOnly).not.toBeDisabled();
    await user.click(readOnly);
    expect(readOnly).toHaveAttribute("aria-checked", "true");
    expect(changes).not.toHaveBeenCalled();
    expect(document.querySelector("input[name='reports']")).toBeChecked();
    expect(disabled).toBeDisabled();
  });

  it("inherits Field relationships and preserves render/asChild", () => {
    render(
      <>
        <Field.Root id="reports" invalid required>
          <Field.Label>Weekly reports</Field.Label>
          <Field.Description>Immediate delivery.</Field.Description>
          <Switch.Root render={<button data-adapter="root" />}>
            <Switch.Thumb render={<i data-adapter="thumb" />} />
          </Switch.Root>
          <Field.Error>Required.</Field.Error>
        </Field.Root>
        <Switch.Root aria-label="Composed" asChild>
          <button data-adapter="as-child">
            <Switch.Thumb />
          </button>
        </Switch.Root>
      </>,
    );
    const fieldSwitch = screen.getByRole("switch", { name: "Weekly reports" });
    expect(fieldSwitch).toHaveAttribute("data-adapter", "root");
    expect(fieldSwitch).toHaveAttribute("aria-invalid", "true");
    expect(fieldSwitch).toHaveAttribute(
      "aria-describedby",
      "reports-description reports-error",
    );
    expect(fieldSwitch.querySelector("[data-adapter='thumb']")?.tagName).toBe(
      "I",
    );
    expect(screen.getByRole("switch", { name: "Composed" })).toHaveAttribute(
      "data-adapter",
      "as-child",
    );
  });
});

import { createRef, useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Checkbox } from "../../../src/checkbox.js";

describe("Checkbox", () => {
  it("owns complete defaults, visual anatomy, native hooks, and refs", async () => {
    const user = userEvent.setup();
    const ref = createRef<HTMLButtonElement>();
    const onCheckedChange = vi.fn();
    const onClick = vi.fn();
    render(
      <Checkbox aria-label="Updates" className="consumer-checkbox" data-purpose="updates" name="updates" onCheckedChange={onCheckedChange} onClick={onClick} ref={ref} style={{ marginTop: 3 }} value="yes" />,
    );
    const checkbox = screen.getByRole("checkbox", { name: "Updates" });
    expect(ref.current).toBe(checkbox);
    expect(checkbox).toHaveClass("brick-checkbox", "consumer-checkbox");
    expect(checkbox).toHaveAttribute("data-slot", "checkbox");
    expect(checkbox).toHaveAttribute("data-size", "md");
    expect(checkbox).toHaveAttribute("data-state", "unchecked");
    expect(checkbox.querySelector(".brick-checkbox-control")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
    expect(checkbox.querySelector(".brick-checkbox-check")).toBeTruthy();
    expect(checkbox.querySelector(".brick-checkbox-mixed")).toBeTruthy();
    await user.click(checkbox);
    expect(checkbox).toHaveAttribute("data-state", "checked");
    expect(onCheckedChange).toHaveBeenCalledWith(true);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("supports controlled checked and indeterminate state", () => {
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
      <Checkbox data-slot="consent-control" disabled invalid readOnly required>
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

  it("supports render and asChild while retaining the visual control", () => {
    const ref = createRef<HTMLButtonElement>();
    render(
      <>
        <Checkbox render={<button data-adapter="render" />}>Rendered</Checkbox>
        <Checkbox asChild ref={ref} size="sm">
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
    expect(ref.current).toBe(composed);
  });
});

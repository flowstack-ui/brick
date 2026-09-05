import { createRef, useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Fieldset } from "../../../src/fieldset.js";
import { RadioCard, type RadioCardSize, type RadioCardVariant } from "../../../src/radio-card.js";

function Option({ description = "Billed once per year", value = "annual" }: { description?: string; value?: string }) {
  return <RadioCard.Item value={value}><RadioCard.Control><RadioCard.Content><RadioCard.Title>{value === "annual" ? "Annual" : "Monthly"}</RadioCard.Title><RadioCard.Description>{description}</RadioCard.Description></RadioCard.Content><RadioCard.Indicator /></RadioCard.Control><RadioCard.Addon>Cancel anytime</RadioCard.Addon></RadioCard.Item>;
}

describe("RadioCard", () => {
  it("renders the adopted defaults, anatomy, slots, and refs", () => {
    const rootRef = createRef<HTMLDivElement>();
    const itemRef = createRef<HTMLButtonElement>();
    render(<RadioCard.Root aria-label="Billing" ref={rootRef}><RadioCard.Item ref={itemRef} value="annual"><RadioCard.Control><RadioCard.Content><RadioCard.Title>Annual</RadioCard.Title><RadioCard.Description>Save 20%</RadioCard.Description></RadioCard.Content><RadioCard.Indicator /></RadioCard.Control><RadioCard.Addon>Billed yearly</RadioCard.Addon></RadioCard.Item></RadioCard.Root>);
    const root = screen.getByRole("radiogroup", { name: "Billing" });
    const item = screen.getByRole("radio", { name: /Annual Save 20% Billed yearly/ });
    expect(root).toBe(rootRef.current);
    expect(item).toBe(itemRef.current);
    expect(root).toHaveAttribute("data-size", "md");
    expect(root).toHaveAttribute("data-variant", "outline");
    expect(root).toHaveAttribute("data-align", "start");
    expect(root).toHaveAttribute("data-justify", "start");
    expect(root).toHaveAttribute("data-orientation", "horizontal");
    for (const slot of ["radio-card-control", "radio-card-content", "radio-card-title", "radio-card-description", "radio-card-indicator", "radio-card-addon"]) expect(item.querySelector(`[data-slot='${slot}']`)).toBeInTheDocument();
    expect(item.querySelector("[data-slot='radio-card-indicator']")).toHaveAttribute("aria-hidden", "true");
  });

  it("exposes every visual recipe without leaking visual props", () => {
    const sizes: RadioCardSize[] = ["sm", "md", "lg"];
    const variants: RadioCardVariant[] = ["outline", "surface", "subtle", "solid"];
    const { rerender } = render(<RadioCard.Root aria-label="Billing"><Option /></RadioCard.Root>);
    for (const size of sizes) { rerender(<RadioCard.Root aria-label="Billing" size={size}><Option /></RadioCard.Root>); expect(screen.getByRole("radiogroup")).toHaveAttribute("data-size", size); }
    for (const variant of variants) { rerender(<RadioCard.Root aria-label="Billing" variant={variant}><Option /></RadioCard.Root>); expect(screen.getByRole("radiogroup")).toHaveAttribute("data-variant", variant); }
    rerender(<RadioCard.Root align="center" aria-label="Billing" justify="end"><Option /></RadioCard.Root>);
    const root = screen.getByRole("radiogroup");
    expect(root).toHaveAttribute("data-align", "center");
    expect(root).toHaveAttribute("data-justify", "end");
    expect(root).not.toHaveAttribute("align");
  });

  it("preserves controlled Atom selection, keyboard behavior, and form radios", async () => {
    const user = userEvent.setup();
    const changes = vi.fn();
    function Controlled() {
      const [value, setValue] = useState("annual");
      return <RadioCard.Root aria-label="Billing" name="billing" onValueChange={(next) => { changes(next); setValue(next); }} value={value}><Option /><Option value="monthly" /></RadioCard.Root>;
    }
    render(<Controlled />);
    const annual = screen.getByRole("radio", { name: /Annual/ });
    const monthly = screen.getByRole("radio", { name: /Monthly/ });
    await user.click(monthly);
    expect(changes).toHaveBeenLastCalledWith("monthly");
    expect(monthly).toHaveAttribute("aria-checked", "true");
    annual.focus();
    await user.keyboard("{ArrowRight}");
    expect(monthly).toHaveFocus();
    expect(document.querySelector("input[name='billing'][value='monthly']")).toBeChecked();
  });

  it("composes with Fieldset and supports omitted or custom indicators", () => {
    const customRef = createRef<HTMLSpanElement>();
    render(<Fieldset.Root id="billing-field" invalid required><Fieldset.Legend>Billing cadence</Fieldset.Legend><Fieldset.Description>Choose one.</Fieldset.Description><RadioCard.Root defaultValue="annual" name="billing"><RadioCard.Item value="annual"><RadioCard.Control><RadioCard.Content><RadioCard.Title>Annual</RadioCard.Title></RadioCard.Content></RadioCard.Control></RadioCard.Item><RadioCard.Item value="monthly"><RadioCard.Control><RadioCard.Indicator ref={customRef}><span data-testid="custom-mark">✓</span></RadioCard.Indicator><RadioCard.Content><RadioCard.Title>Monthly</RadioCard.Title></RadioCard.Content></RadioCard.Control></RadioCard.Item></RadioCard.Root><Fieldset.Error>Choose billing.</Fieldset.Error></Fieldset.Root>);
    const group = screen.getByRole("radiogroup", { name: "Billing cadence" });
    expect(group).toHaveAttribute("aria-describedby", "billing-field-description billing-field-error");
    expect(screen.getByRole("radio", { name: "Annual" }).querySelector("[data-slot='radio-card-indicator']")).toBeNull();
    expect(customRef.current).toContainElement(screen.getByTestId("custom-mark"));
    expect(customRef.current).toHaveAttribute("data-custom", "");
  });

  it("preserves read-only and disabled behavior", async () => {
    const user = userEvent.setup();
    const changes = vi.fn();
    render(<RadioCard.Root aria-label="Billing" defaultValue="annual" onValueChange={changes} readOnly><Option /><Option value="monthly" /></RadioCard.Root>);
    await user.click(screen.getByRole("radio", { name: /Monthly/ }));
    expect(screen.getByRole("radio", { name: /Annual/ })).toHaveAttribute("aria-checked", "true");
    expect(changes).not.toHaveBeenCalled();
  });
});

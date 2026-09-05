import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { Field } from "../../../src/field.js";
import { Select, type SelectShape, type SelectSize, type SelectVariant } from "../../../src/select.js";

function Example({ defaultOpen = false }: { defaultOpen?: boolean }) {
  return <Select.Root defaultOpen={defaultOpen} defaultValue="team"><Select.Trigger aria-label="Plan"><Select.Value placeholder="Choose" /><Select.Icon /></Select.Trigger><Select.Content><Select.ScrollUpButton /><Select.Viewport><Select.Group><Select.Label>Plans</Select.Label><Select.Item value="starter"><Select.ItemText>Starter</Select.ItemText><Select.ItemIndicator /></Select.Item><Select.Item value="team"><Select.ItemText>Team</Select.ItemText><Select.ItemIndicator /></Select.Item><Select.Item value="enterprise" disabled><Select.ItemText>Enterprise</Select.ItemText><Select.ItemIndicator /></Select.Item></Select.Group><Select.Separator /></Select.Viewport><Select.ScrollDownButton /><Select.Arrow /></Select.Content></Select.Root>;
}

describe("Select", () => {
  beforeAll(() => {
    Element.prototype.scrollIntoView = vi.fn();
  });
  it("renders canonical defaults and default decorative artwork", () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Select.Root defaultValue="team"><Select.Trigger aria-label="Plan" ref={ref}><Select.Value /><Select.Icon /></Select.Trigger><Select.Content><Select.Viewport><Select.Item value="team"><Select.ItemText>Team</Select.ItemText><Select.ItemIndicator /></Select.Item></Select.Viewport><Select.Arrow /></Select.Content></Select.Root>);
    const trigger = screen.getByRole("combobox", { name: "Plan" });
    expect(trigger).toBe(ref.current);
    expect(trigger).toHaveClass("brick-select-trigger");
    expect(trigger).toHaveAttribute("data-variant", "outline");
    expect(trigger).toHaveAttribute("data-size", "lg");
    expect(trigger).toHaveAttribute("data-shape", "rounded");
    expect(trigger).toHaveAttribute("data-full-width", "");
    expect(trigger.querySelector(".brick-select-direction-artwork")).toBeInTheDocument();
  });

  it("exposes variants, sizes, shapes, and intrinsic width without prop leakage", () => {
    const variants: SelectVariant[] = ["outline", "soft", "ghost", "underline"];
    const sizes: SelectSize[] = ["2xs", "xs", "sm", "md", "lg", "xl", "2xl"];
    const shapes: SelectShape[] = ["sharp", "rounded", "pill"];
    const { rerender } = render(<Example />);
    for (const variant of variants) { rerender(<Select.Root variant={variant}><Select.Trigger aria-label="Plan" /><Select.Content><Select.Viewport><Select.Item value="a">A</Select.Item></Select.Viewport></Select.Content></Select.Root>); const trigger = screen.getByRole("combobox", { name: "Plan" }); expect(trigger).toHaveAttribute("data-variant", variant); if (variant === "underline") expect(trigger).not.toHaveAttribute("data-shape"); }
    for (const size of sizes) { rerender(<Select.Root size={size}><Select.Trigger aria-label="Plan" /></Select.Root>); expect(screen.getByRole("combobox")).toHaveAttribute("data-size", size); }
    for (const shape of shapes) { rerender(<Select.Root shape={shape}><Select.Trigger aria-label="Plan" /></Select.Root>); expect(screen.getByRole("combobox")).toHaveAttribute("data-shape", shape); }
    rerender(<Select.Root fullWidth={false}><Select.Trigger aria-label="Plan" /></Select.Root>);
    const trigger = screen.getByRole("combobox");
    expect(trigger).not.toHaveAttribute("data-full-width");
    expect(trigger).not.toHaveAttribute("variant");
    expect(trigger).not.toHaveAttribute("shape");
    expect(trigger).not.toHaveAttribute("size");
  });

  it("styles every authored anatomy part and preserves replaceable artwork", () => {
    render(<Example defaultOpen />);
    expect(screen.getByRole("listbox")).toHaveClass("brick-select-content");
    expect(screen.getByRole("listbox")).toHaveAttribute("data-size", "lg");
    expect(document.querySelector(".brick-select-viewport")).toBeInTheDocument();
    expect(document.querySelector(".brick-select-group")).toBeInTheDocument();
    expect(document.querySelector(".brick-select-label")).toBeInTheDocument();
    expect(screen.getAllByRole("option")[0]).toHaveClass("brick-select-item");
    expect(document.querySelector(".brick-select-item-text")).toBeInTheDocument();
    expect(document.querySelector(".brick-select-item-indicator .brick-select-check-artwork")).toBeInTheDocument();
    expect(document.querySelector(".brick-select-separator")).toBeInTheDocument();
    expect(document.querySelector(".brick-select-arrow-artwork")).toBeInTheDocument();
  });

  it("keeps sparse responsive size metadata on the trigger and portalled content", () => {
    render(<Select.Root defaultOpen size={{ lg: "xl" }}><Select.Trigger aria-label="Plan" /><Select.Content><Select.Item value="team">Team</Select.Item></Select.Content></Select.Root>);
    expect(screen.getByRole("combobox")).toHaveAttribute("data-size", "lg");
    expect(screen.getByRole("combobox")).toHaveAttribute("data-size-lg", "xl");
    expect(screen.getByRole("listbox")).toHaveAttribute("data-size-lg", "xl");
  });

  it("preserves Atom value/open interactions, disabled options, and callbacks", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    const onOpenChange = vi.fn();
    render(<Select.Root onOpenChange={onOpenChange} onValueChange={onValueChange}><Select.Trigger aria-label="Plan"><Select.Value placeholder="Choose" /></Select.Trigger><Select.Content><Select.Viewport><Select.Item value="starter"><Select.ItemText>Starter</Select.ItemText></Select.Item><Select.Item value="enterprise" disabled><Select.ItemText>Enterprise</Select.ItemText></Select.Item></Select.Viewport></Select.Content></Select.Root>);
    await user.click(screen.getByRole("combobox"));
    expect(onOpenChange).toHaveBeenCalledWith(true);
    await user.click(screen.getByRole("option", { name: "Starter" }));
    expect(onValueChange).toHaveBeenCalledWith("starter");
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
  });

  it("preserves Field ownership, native form state, and refs", () => {
    render(<Field.Root id="billing-plan" invalid readOnly required><Field.Label>Billing plan</Field.Label><Select.Root invalid name="plan" readOnly required><Select.Trigger><Select.Value placeholder="Choose" /><Select.Icon /></Select.Trigger><Select.Content><Select.Viewport><Select.Item value="team"><Select.ItemText>Team</Select.ItemText></Select.Item></Select.Viewport></Select.Content></Select.Root><Field.Description>Choose one.</Field.Description><Field.Error>Required.</Field.Error></Field.Root>);
    const trigger = screen.getByRole("combobox", { name: "Billing plan" });
    expect(trigger).toHaveAttribute("id", "billing-plan-control");
    expect(trigger).toHaveAttribute("aria-required", "true");
    expect(trigger).toHaveAttribute("aria-readonly", "true");
    expect(trigger).toHaveAttribute("aria-invalid", "true");
    expect(trigger).toHaveAttribute("data-readonly", "");
    expect(trigger).toHaveAttribute("data-invalid", "");
  });

  it("preserves Trigger asChild and class/style/data pass-through", () => {
    render(<Select.Root><Select.Trigger asChild className="consumer" data-check="yes" style={{ marginInlineStart: 4 }}><button aria-label="Plan" type="button" /></Select.Trigger></Select.Root>);
    const trigger = screen.getByRole("combobox", { name: "Plan" });
    expect(trigger).toHaveClass("brick-select-trigger", "consumer");
    expect(trigger).toHaveAttribute("data-check", "yes");
    expect(trigger).toHaveStyle({ marginInlineStart: "4px" });
    expect(screen.getAllByRole("combobox")).toHaveLength(1);
  });
});

import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { Field } from "../../../src/field.js";
import { For } from "../../../src/for.js";
import {
  MultiSelect,
  type MultiSelectShape,
  type MultiSelectSize,
  type MultiSelectVariant,
} from "../../../src/multi-select.js";

function Example({ defaultOpen = false }: { defaultOpen?: boolean }) {
  return (
    <MultiSelect.Root defaultOpen={defaultOpen} defaultValue={["design", "engineering"]} name="skills">
      <MultiSelect.Trigger aria-label="Skills"><MultiSelect.Value placeholder="Choose skills" /><MultiSelect.Icon /></MultiSelect.Trigger>
      <MultiSelect.Content>
        <MultiSelect.ScrollUpButton />
        <MultiSelect.Viewport>
          <MultiSelect.Group>
            <MultiSelect.Label>Skills</MultiSelect.Label>
            <MultiSelect.Item value="design"><MultiSelect.ItemText>Design</MultiSelect.ItemText><MultiSelect.ItemIndicator /></MultiSelect.Item>
            <MultiSelect.Item value="engineering"><MultiSelect.ItemText>Engineering</MultiSelect.ItemText><MultiSelect.ItemIndicator /></MultiSelect.Item>
            <MultiSelect.Item value="research" disabled><MultiSelect.ItemText>Research</MultiSelect.ItemText><MultiSelect.ItemIndicator /></MultiSelect.Item>
          </MultiSelect.Group>
          <MultiSelect.Separator />
        </MultiSelect.Viewport>
        <MultiSelect.ScrollDownButton />
        <MultiSelect.Arrow />
      </MultiSelect.Content>
    </MultiSelect.Root>
  );
}

describe("MultiSelect", () => {
  beforeAll(() => { Element.prototype.scrollIntoView = vi.fn(); });

  it("renders canonical defaults, array summary, and default decorative artwork", () => {
    const ref = createRef<HTMLButtonElement>();
    render(<MultiSelect.Root defaultValue={["design", "engineering"]}><MultiSelect.Trigger aria-label="Skills" ref={ref}><MultiSelect.Value /><MultiSelect.Icon /></MultiSelect.Trigger><MultiSelect.Content><MultiSelect.Viewport><MultiSelect.Item value="design"><MultiSelect.ItemText>Design</MultiSelect.ItemText><MultiSelect.ItemIndicator /></MultiSelect.Item><MultiSelect.Item value="engineering"><MultiSelect.ItemText>Engineering</MultiSelect.ItemText><MultiSelect.ItemIndicator /></MultiSelect.Item></MultiSelect.Viewport><MultiSelect.Arrow /></MultiSelect.Content></MultiSelect.Root>);
    const trigger = screen.getByRole("button", { name: "Skills" });
    expect(trigger).toBe(ref.current);
    expect(trigger).toHaveClass("brick-multi-select-trigger");
    expect(trigger).toHaveAttribute("data-variant", "outline");
    expect(trigger).toHaveAttribute("data-size", "lg");
    expect(trigger).toHaveAttribute("data-shape", "rounded");
    expect(trigger).toHaveAttribute("data-full-width", "");
    expect(trigger).toHaveTextContent("Design (+1 more)");
    expect(trigger.querySelector(".brick-multi-select-direction-artwork")).toBeInTheDocument();
  });

  it("exposes variants, sizes, shapes, and intrinsic width without prop leakage", () => {
    const variants: MultiSelectVariant[] = ["outline", "soft", "underline"];
    const sizes: MultiSelectSize[] = ["2xs", "xs", "sm", "md", "lg", "xl", "2xl"];
    const shapes: MultiSelectShape[] = ["sharp", "rounded", "pill"];
    const { rerender } = render(<Example />);
    for (const variant of variants) {
      rerender(<MultiSelect.Root variant={variant}><MultiSelect.Trigger aria-label="Skills" /></MultiSelect.Root>);
      const trigger = screen.getByRole("button", { name: "Skills" });
      expect(trigger).toHaveAttribute("data-variant", variant);
      if (variant === "underline") expect(trigger).not.toHaveAttribute("data-shape");
    }
    for (const size of sizes) {
      rerender(<MultiSelect.Root size={size}><MultiSelect.Trigger aria-label="Skills" /></MultiSelect.Root>);
      expect(screen.getByRole("button")).toHaveAttribute("data-size", size);
    }
    for (const shape of shapes) {
      rerender(<MultiSelect.Root shape={shape}><MultiSelect.Trigger aria-label="Skills" /></MultiSelect.Root>);
      expect(screen.getByRole("button")).toHaveAttribute("data-shape", shape);
    }
    rerender(<MultiSelect.Root fullWidth={false}><MultiSelect.Trigger aria-label="Skills" /></MultiSelect.Root>);
    const trigger = screen.getByRole("button");
    expect(trigger).not.toHaveAttribute("data-full-width");
    expect(trigger).not.toHaveAttribute("variant");
    expect(trigger).not.toHaveAttribute("shape");
    expect(trigger).not.toHaveAttribute("size");
  });

  it("styles every authored anatomy part and preserves replaceable artwork", () => {
    render(<Example defaultOpen />);
    expect(screen.getByRole("listbox")).toHaveAttribute("data-size", "lg");
    expect(screen.getByRole("listbox")).toHaveClass("brick-multi-select-content");
    expect(screen.getByRole("listbox")).toHaveAttribute("aria-multiselectable", "true");
    expect(document.querySelector(".brick-multi-select-viewport")).toBeInTheDocument();
    expect(document.querySelector(".brick-multi-select-group")).toBeInTheDocument();
    expect(document.querySelector(".brick-multi-select-label")).toBeInTheDocument();
    expect(screen.getAllByRole("option")[0]).toHaveClass("brick-multi-select-item");
    expect(screen.getAllByRole("option")[0]).toHaveAttribute("data-state", "checked");
    expect(document.querySelector(".brick-multi-select-item-text")).toBeInTheDocument();
    expect(document.querySelector(".brick-multi-select-item-indicator .brick-multi-select-check-artwork")).toBeInTheDocument();
    expect(document.querySelector(".brick-multi-select-separator")).toBeInTheDocument();
    expect(document.querySelector(".brick-multi-select-arrow-artwork")).toBeInTheDocument();
  });

  it("keeps sparse responsive size metadata on the trigger and portalled content", () => {
    render(<MultiSelect.Root defaultOpen size={{ lg: "xl" }}><MultiSelect.Trigger aria-label="Skills" /><MultiSelect.Content><MultiSelect.Item value="design">Design</MultiSelect.Item></MultiSelect.Content></MultiSelect.Root>);
    expect(screen.getByRole("button", { name: "Skills" })).toHaveAttribute("data-size", "lg");
    expect(screen.getByRole("button", { name: "Skills" })).toHaveAttribute("data-size-lg", "xl");
    expect(screen.getByRole("listbox")).toHaveAttribute("data-size-lg", "xl");
  });

  it("toggles array values without closing and preserves disabled options", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    const onOpenChange = vi.fn();
    render(<MultiSelect.Root defaultValue={[]} onOpenChange={onOpenChange} onValueChange={onValueChange}><MultiSelect.Trigger aria-label="Skills"><MultiSelect.Value placeholder="Choose skills" /></MultiSelect.Trigger><MultiSelect.Content><MultiSelect.Viewport><MultiSelect.Item value="design"><MultiSelect.ItemText>Design</MultiSelect.ItemText></MultiSelect.Item><MultiSelect.Item value="research" disabled><MultiSelect.ItemText>Research</MultiSelect.ItemText></MultiSelect.Item></MultiSelect.Viewport></MultiSelect.Content></MultiSelect.Root>);
    await user.click(screen.getByRole("button", { name: "Skills" }));
    expect(onOpenChange).toHaveBeenCalledWith(true);
    await user.click(screen.getByRole("option", { name: "Design" }));
    expect(onValueChange).toHaveBeenCalledWith(["design"]);
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    await user.click(screen.getByRole("option", { name: "Design" }));
    expect(onValueChange).toHaveBeenLastCalledWith([]);
  });

  it("preserves For render callbacks while deriving static item labels", () => {
    render(
      <MultiSelect.Root defaultOpen>
        <MultiSelect.Trigger aria-label="Skills" />
        <MultiSelect.Content disablePortal>
          <MultiSelect.Viewport>
            <For each={["design", "engineering"]}>{(value) => (
              <MultiSelect.Item key={value} value={value}>
                <MultiSelect.ItemText>{value}</MultiSelect.ItemText>
              </MultiSelect.Item>
            )}</For>
          </MultiSelect.Viewport>
        </MultiSelect.Content>
      </MultiSelect.Root>,
    );
    expect(screen.getAllByRole("option")).toHaveLength(2);
  });

  it("preserves Field ownership and native multiple form state", () => {
    render(<Field.Root id="team-skills" invalid readOnly required><Field.Label>Team skills</Field.Label><MultiSelect.Root defaultOpen defaultValue={["design"]} name="skills"><MultiSelect.Trigger><MultiSelect.Value placeholder="Choose skills" /><MultiSelect.Icon /></MultiSelect.Trigger><MultiSelect.Content><MultiSelect.Viewport><MultiSelect.Item value="design"><MultiSelect.ItemText>Design</MultiSelect.ItemText></MultiSelect.Item></MultiSelect.Viewport></MultiSelect.Content></MultiSelect.Root><Field.Description>Choose several.</Field.Description><Field.Error>Required.</Field.Error></Field.Root>);
    const trigger = screen.getByRole("button", { name: "Team skills" });
    expect(trigger).toHaveAttribute("id", "team-skills-control");
    expect(trigger).not.toHaveAttribute("aria-required");
    expect(trigger).not.toHaveAttribute("aria-readonly");
    expect(trigger).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("listbox")).toHaveAttribute("aria-required", "true");
    expect(screen.getByRole("listbox")).toHaveAttribute("aria-readonly", "true");
    const native = document.querySelector<HTMLSelectElement>('select[name="skills"]');
    expect(native).toHaveAttribute("multiple");
    expect(native?.value).toBe("design");
  });

  it("preserves Trigger asChild and native class/style/data pass-through", () => {
    render(<MultiSelect.Root><MultiSelect.Trigger asChild className="consumer" data-check="yes" style={{ marginInlineStart: 4 }}><button aria-label="Skills" type="button" /></MultiSelect.Trigger></MultiSelect.Root>);
    const trigger = screen.getByRole("button", { name: "Skills" });
    expect(trigger).toHaveClass("brick-multi-select-trigger", "consumer");
    expect(trigger).toHaveAttribute("data-check", "yes");
    expect(trigger).toHaveStyle({ marginInlineStart: "4px" });
    expect(screen.getAllByRole("button")).toHaveLength(1);
  });
});

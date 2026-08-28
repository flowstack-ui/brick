import { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ColorPicker } from "../../../src/color-picker.js";

describe("ColorPicker", () => {
  it("adapts every released Atom part with stable Brick hooks", () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <ColorPicker.Root defaultOpen defaultValue="#5B5" name="accent" ref={ref} size="lg" variant="soft">
        <ColorPicker.Label>Accent color</ColorPicker.Label>
        <ColorPicker.Control>
          <ColorPicker.Input />
          <ColorPicker.NativeInput />
          <ColorPicker.Trigger>Presets</ColorPicker.Trigger>
        </ColorPicker.Control>
        <ColorPicker.Content aria-label="Accent presets">
          <ColorPicker.SwatchTrigger aria-label="Lavender" value="#55bb55">Lavender</ColorPicker.SwatchTrigger>
        </ColorPicker.Content>
        <ColorPicker.HiddenInput />
      </ColorPicker.Root>,
    );

    expect(ref.current).toHaveClass("brick-color-picker");
    expect(ref.current).toHaveAttribute("data-size", "lg");
    expect(ref.current).toHaveAttribute("data-variant", "soft");
    expect(screen.getByText("Accent color")).toHaveClass("brick-color-picker__label");
    expect(screen.getByRole("textbox", { name: "Accent color" })).toHaveClass("brick-color-picker__input");
    expect(screen.getByLabelText("Open native color chooser")).toHaveClass("brick-color-picker__native-input");
    expect(screen.getByRole("button", { name: "Presets" })).toHaveClass("brick-color-picker__trigger");
    expect(screen.getByRole("button", { name: "Lavender" })).toHaveClass("brick-color-picker__swatch-trigger");
    expect(document.querySelector("[data-slot='color-picker-content']")).toHaveClass("brick-color-picker__content");
    expect(document.querySelector("input[type='hidden']")).toHaveAttribute("name", "accent");
    expect(document.querySelector("input[type='hidden']")).toHaveValue("#55bb55");
  });

  it("keeps Atom normalization and controlled notification as the only behavior owner", () => {
    const onValueChange = vi.fn();
    render(
      <ColorPicker.Root onValueChange={onValueChange} value="#123456">
        <ColorPicker.Label>Brand color</ColorPicker.Label>
        <ColorPicker.Input />
        <ColorPicker.SwatchTrigger aria-label="Use coral" value="#F66">Coral</ColorPicker.SwatchTrigger>
      </ColorPicker.Root>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Use coral" }));
    expect(onValueChange).toHaveBeenCalledWith("#ff6666");
    expect(screen.getByRole("textbox", { name: "Brand color" })).toHaveValue("#123456");
  });

  it("preserves Atom state attributes while defaulting Brick recipes", () => {
    render(<ColorPicker.Root disabled invalid readOnly required><ColorPicker.Input aria-label="Color" /></ColorPicker.Root>);
    const root = document.querySelector("[data-slot='color-picker']");
    expect(root).toHaveAttribute("data-size", "md");
    expect(root).toHaveAttribute("data-variant", "outline");
    expect(root).toHaveAttribute("data-disabled");
    expect(root).toHaveAttribute("data-readonly");
    expect(root).toHaveAttribute("data-invalid");
    expect(root).toHaveAttribute("data-required");
    expect(screen.getByRole("textbox", { name: "Color" })).toBeDisabled();
  });
});

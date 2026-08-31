import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ColorPicker } from "../../../src/color-picker.js";

describe("ColorPicker", () => {
  it("adapts the complete released Atom anatomy with stable Brick hooks", () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <ColorPicker.Root defaultOpen defaultValue="#5b5bd6" name="accent" ref={ref} size="lg" variant="soft">
        <ColorPicker.Label>Accent color</ColorPicker.Label>
        <ColorPicker.Control>
          <ColorPicker.ValueSwatch />
          <ColorPicker.Input />
          <ColorPicker.NativeInput />
          <ColorPicker.Trigger>Choose</ColorPicker.Trigger>
        </ColorPicker.Control>
        <ColorPicker.Positioner>
          <ColorPicker.Content aria-label="Accent editor">
            <ColorPicker.Area><ColorPicker.AreaBackground /><ColorPicker.AreaThumb /></ColorPicker.Area>
            <ColorPicker.ChannelSlider channel="hue">
              <ColorPicker.ChannelSliderLabel>Hue</ColorPicker.ChannelSliderLabel>
              <ColorPicker.ChannelSliderTrack />
              <ColorPicker.ChannelSliderThumb />
              <ColorPicker.ChannelSliderValueText />
            </ColorPicker.ChannelSlider>
            <ColorPicker.TransparencyGrid />
            <ColorPicker.FormatSelect />
            <ColorPicker.FormatTrigger>Format</ColorPicker.FormatTrigger>
            <ColorPicker.View format="rgba"><ColorPicker.ChannelInput channel="red" /></ColorPicker.View>
            <ColorPicker.SwatchGroup>
              <ColorPicker.SwatchTrigger aria-label="Use coral" value="#ff6666">
                <ColorPicker.Swatch value="#ff6666"><ColorPicker.SwatchIndicator /></ColorPicker.Swatch>
              </ColorPicker.SwatchTrigger>
            </ColorPicker.SwatchGroup>
          </ColorPicker.Content>
        </ColorPicker.Positioner>
        <ColorPicker.HiddenInput />
      </ColorPicker.Root>,
    );

    expect(ref.current).toHaveClass("brick-color-picker");
    expect(ref.current).toHaveAttribute("data-size", "lg");
    expect(ref.current).toHaveAttribute("data-variant", "soft");
    for (const [slot, classSuffix] of [
      ["label", "label"], ["control", "control"], ["value-swatch", "value-swatch"], ["input", "input"],
      ["native-input", "native-input"], ["trigger", "trigger"], ["positioner", "positioner"], ["content", "content"],
      ["area", "area"], ["area-background", "area-background"], ["area-thumb", "area-thumb"],
      ["channel-slider", "channel-slider"], ["channel-slider-label", "channel-slider-label"],
      ["channel-slider-track", "channel-slider-track"], ["channel-slider-thumb", "channel-slider-thumb"],
      ["channel-slider-value-text", "channel-slider-value"], ["transparency-grid", "transparency-grid"],
      ["format-select", "format-select"], ["format-trigger", "format-trigger"], ["view", "view"],
      ["channel-input", "channel-input"], ["swatch-group", "swatch-group"], ["swatch-trigger", "swatch-trigger"],
      ["swatch", "swatch"], ["swatch-indicator", "swatch-indicator"],
    ] as const) {
      expect(document.querySelector(`[data-slot='color-picker-${slot}']`)).toHaveClass(`brick-color-picker__${classSuffix}`);
    }
    expect(document.querySelector("[data-slot='color-picker-hidden-input']")).toHaveAttribute("name", "accent");
    expect(document.querySelector("[data-slot='color-picker-hidden-input']")).toHaveValue("rgba(91, 91, 214, 1)");
  });

  it("keeps Atom normalization and change details as the only behavior owner", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <ColorPicker.Root defaultValue="#123456" onValueChange={onValueChange}>
        <ColorPicker.Label>Brand color</ColorPicker.Label>
        <ColorPicker.Input />
        <ColorPicker.NativeInput />
        <ColorPicker.SwatchTrigger aria-label="Use coral" value="#ff6666">
          <ColorPicker.Swatch value="#ff6666" />
        </ColorPicker.SwatchTrigger>
      </ColorPicker.Root>,
    );
    await user.click(screen.getByRole("button", { name: "Use coral" }));
    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(onValueChange.mock.calls[0]?.[0].value.toString("hex").toLowerCase()).toBe("#ff6666");
    expect(document.querySelector("[data-slot='color-picker-input']")).toHaveValue("#FF6666");
  });

  it("preserves Atom state attributes while defaulting Brick recipes", () => {
    render(
      <ColorPicker.Root disabled invalid readOnly required>
        <ColorPicker.Label>Color</ColorPicker.Label>
        <ColorPicker.Input />
        <ColorPicker.HiddenInput name="color" />
      </ColorPicker.Root>,
    );
    const root = document.querySelector("[data-slot='color-picker']");
    expect(root).toHaveAttribute("data-size", "md");
    expect(root).toHaveAttribute("data-variant", "outline");
    expect(root).toHaveAttribute("data-disabled");
    expect(root).toHaveAttribute("data-readonly");
    expect(root).toHaveAttribute("data-invalid");
    expect(document.querySelector("[data-slot='color-picker-input']")).toBeDisabled();
    expect(document.querySelector("[data-slot='color-picker-hidden-input']")).toBeRequired();
  });

  it("exposes every closed density recipe without changing Atom behavior", () => {
    const { rerender } = render(<ColorPicker.Root size="2xs"><ColorPicker.Input /></ColorPicker.Root>);
    for (const size of ["2xs", "xs", "sm", "md", "lg", "xl", "2xl"] as const) {
      rerender(<ColorPicker.Root size={size}><ColorPicker.Input /></ColorPicker.Root>);
      expect(document.querySelector("[data-slot='color-picker']")).toHaveAttribute("data-size", size);
    }
  });

  it("exposes integrated controls and matching swatch frame recipes", () => {
    render(
      <ColorPicker.Root inline>
        <ColorPicker.Control data-testid="control" layout="integrated">
          <ColorPicker.ValueSwatch shape="rounded" />
          <ColorPicker.Input aria-label="Color" />
        </ColorPicker.Control>
        <ColorPicker.SwatchGroup>
          <ColorPicker.SwatchTrigger aria-label="Square" frame="outline" shape="sharp" value="#e5484d">
            <ColorPicker.Swatch shape="sharp" value="#e5484d" />
          </ColorPicker.SwatchTrigger>
          <ColorPicker.SwatchTrigger aria-label="Frameless" frame="none" shape="circle" value="#30a46c">
            <ColorPicker.Swatch shape="circle" value="#30a46c" />
          </ColorPicker.SwatchTrigger>
        </ColorPicker.SwatchGroup>
      </ColorPicker.Root>,
    );
    expect(screen.getByTestId("control")).toHaveAttribute("data-layout", "integrated");
    expect(document.querySelector("[data-slot='color-picker-value-swatch']")).toHaveAttribute("data-shape", "rounded");
    expect(screen.getByRole("button", { name: "Square" })).toHaveAttribute("data-frame", "outline");
    expect(screen.getByRole("button", { name: "Square" })).toHaveAttribute("data-shape", "sharp");
    expect(screen.getByRole("button", { name: "Frameless" })).toHaveAttribute("data-frame", "none");
    expect(screen.getByRole("button", { name: "Frameless" })).toHaveAttribute("data-shape", "circle");
  });
});

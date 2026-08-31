import { createElement, createRef } from "react";
import {
  ColorPicker,
  type ColorPickerControlLayout,
  type ColorPickerSize,
  type ColorPickerSwatchFrame,
  type ColorPickerSwatchShape,
  type ColorPickerVariant,
} from "../../../src/color-picker.js";
import { ColorPicker as RootColorPicker } from "../../../src/index.js";

const sizes: ColorPickerSize[] = ["2xs", "xs", "sm", "md", "lg", "xl", "2xl"];
const variants: ColorPickerVariant[] = ["outline", "soft"];
const controlLayouts: ColorPickerControlLayout[] = ["separate", "integrated"];
const swatchFrames: ColorPickerSwatchFrame[] = ["none", "outline"];
const swatchShapes: ColorPickerSwatchShape[] = ["sharp", "rounded", "circle"];
createElement(ColorPicker.Root, {
  children: null,
  defaultValue: "#5b5bd6",
  positioning: { placement: "bottom-start" },
  ref: createRef<HTMLDivElement>(),
  size: "sm",
  variant: "soft",
});
createElement(ColorPicker.Label, { ref: createRef<HTMLLabelElement>() }, "Color");
createElement(ColorPicker.Control, { layout: "integrated", ref: createRef<HTMLDivElement>() });
createElement(ColorPicker.Input, { ref: createRef<HTMLInputElement>(), "aria-label": "Hex color" });
createElement(ColorPicker.ChannelInput, { channel: "red", ref: createRef<HTMLInputElement>() });
createElement(ColorPicker.HiddenInput, { form: "settings", name: "accent" });
createElement(ColorPicker.NativeInput, { ref: createRef<HTMLInputElement>() });
createElement(ColorPicker.Trigger, { children: "Choose", ref: createRef<HTMLButtonElement>() });
createElement(ColorPicker.Positioner, { ref: createRef<HTMLDivElement>() });
createElement(ColorPicker.Content, { children: "Editor", ref: createRef<HTMLDivElement>() });
createElement(ColorPicker.ValueText, {});
createElement(ColorPicker.ValueSwatch, { respectAlpha: true, shape: "rounded" });
createElement(ColorPicker.Area, { xChannel: "saturation", yChannel: "lightness" });
createElement(ColorPicker.AreaBackground, {});
createElement(ColorPicker.AreaThumb, {});
createElement(ColorPicker.ChannelSlider, { channel: "hue" });
createElement(ColorPicker.ChannelSliderLabel, {}, "Hue");
createElement(ColorPicker.ChannelSliderTrack, {});
createElement(ColorPicker.ChannelSliderThumb, {});
createElement(ColorPicker.ChannelSliderValueText, {});
createElement(ColorPicker.TransparencyGrid, { size: "12px" });
createElement(ColorPicker.EyeDropperTrigger, { children: "Pick" });
createElement(ColorPicker.SwatchGroup, {});
createElement(ColorPicker.SwatchTrigger, { frame: "none", shape: "circle", value: "#ffffff" }, "White");
createElement(ColorPicker.Swatch, { shape: "circle", value: "#ffffff" });
createElement(ColorPicker.SwatchIndicator, { value: "#ffffff" });
createElement(ColorPicker.FormatSelect, {});
createElement(ColorPicker.FormatTrigger, {}, "Format");
createElement(ColorPicker.View, { format: "rgba" });
createElement(RootColorPicker.Root, { children: createElement(RootColorPicker.HiddenInput), name: "accent" });
// @ts-expect-error closed size
createElement(ColorPicker.Root, { children: null, size: "3xl" });
// @ts-expect-error closed variant
createElement(ColorPicker.Root, { children: null, variant: "ghost" });
// @ts-expect-error Root's size is the Brick recipe, not native input geometry
createElement(ColorPicker.Root, { children: null, size: 12 });
// @ts-expect-error Root uses onValueChange instead of a native div change handler
createElement(ColorPicker.Root, { children: null, onChange: () => undefined });
// @ts-expect-error preset requires a value
createElement(ColorPicker.SwatchTrigger, {});
// @ts-expect-error channel inputs accept only supported color channels
createElement(ColorPicker.ChannelInput, { channel: "temperature" });
// @ts-expect-error controls expose only the closed layout recipes
createElement(ColorPicker.Control, { layout: "attached" });
// @ts-expect-error swatch frames expose only none or outline
createElement(ColorPicker.SwatchTrigger, { frame: "soft", value: "#ffffff" });
// @ts-expect-error swatch shapes use the shared sharp, rounded, and circle vocabulary
createElement(ColorPicker.ValueSwatch, { shape: "square" });
void sizes;
void variants;
void controlLayouts;
void swatchFrames;
void swatchShapes;

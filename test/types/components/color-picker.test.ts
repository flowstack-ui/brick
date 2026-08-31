import { createElement, createRef } from "react";
import { ColorPicker, type ColorPickerSize, type ColorPickerVariant } from "../../../src/color-picker.js";
import { ColorPicker as RootColorPicker } from "../../../src/index.js";

const sizes: ColorPickerSize[] = ["sm", "md", "lg"];
const variants: ColorPickerVariant[] = ["outline", "soft"];
createElement(ColorPicker.Root, {
  children: null,
  defaultValue: "#5b5bd6",
  positioning: { placement: "bottom-start" },
  ref: createRef<HTMLDivElement>(),
  size: "sm",
  variant: "soft",
});
createElement(ColorPicker.Label, { ref: createRef<HTMLLabelElement>() }, "Color");
createElement(ColorPicker.Control, { ref: createRef<HTMLDivElement>() });
createElement(ColorPicker.Input, { ref: createRef<HTMLInputElement>(), "aria-label": "Hex color" });
createElement(ColorPicker.ChannelInput, { channel: "red", ref: createRef<HTMLInputElement>() });
createElement(ColorPicker.HiddenInput, { form: "settings", name: "accent" });
createElement(ColorPicker.NativeInput, { ref: createRef<HTMLInputElement>() });
createElement(ColorPicker.Trigger, { children: "Choose", ref: createRef<HTMLButtonElement>() });
createElement(ColorPicker.Positioner, { ref: createRef<HTMLDivElement>() });
createElement(ColorPicker.Content, { children: "Editor", ref: createRef<HTMLDivElement>() });
createElement(ColorPicker.ValueText, {});
createElement(ColorPicker.ValueSwatch, { respectAlpha: true });
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
createElement(ColorPicker.SwatchTrigger, { value: "#ffffff" }, "White");
createElement(ColorPicker.Swatch, { value: "#ffffff" });
createElement(ColorPicker.SwatchIndicator, { value: "#ffffff" });
createElement(ColorPicker.FormatSelect, {});
createElement(ColorPicker.FormatTrigger, {}, "Format");
createElement(ColorPicker.View, { format: "rgba" });
createElement(RootColorPicker.Root, { children: createElement(RootColorPicker.HiddenInput), name: "accent" });
// @ts-expect-error closed size
createElement(ColorPicker.Root, { children: null, size: "xl" });
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
void sizes;
void variants;

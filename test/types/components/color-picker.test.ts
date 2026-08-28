import { createElement, createRef } from "react";
import { ColorPicker, type ColorPickerSize, type ColorPickerVariant } from "../../../src/color-picker.js";
import { ColorPicker as RootColorPicker } from "../../../src/index.js";

const sizes: ColorPickerSize[] = ["sm", "md", "lg"];
const variants: ColorPickerVariant[] = ["outline", "soft"];
createElement(ColorPicker.Root, { children: null, ref: createRef<HTMLDivElement>(), defaultValue: "#5b5bd6", size: "sm", variant: "soft" });
createElement(ColorPicker.Label, { ref: createRef<HTMLLabelElement>() }, "Color");
createElement(ColorPicker.Input, { ref: createRef<HTMLInputElement>(), "aria-label": "Hex color" });
createElement(ColorPicker.Input, { size: 12 });
createElement(ColorPicker.HiddenInput, { form: "settings", name: "accent" });
createElement(ColorPicker.NativeInput, { ref: createRef<HTMLInputElement>() });
createElement(ColorPicker.Trigger, { children: "Choose", ref: createRef<HTMLElement>() });
createElement(ColorPicker.Content, { align: "start", children: "Presets", side: "bottom" });
createElement(ColorPicker.SwatchTrigger, { value: "#ffffff" }, "White");
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
void sizes;
void variants;

"use client";

import {
  forwardRef,
  type ForwardRefExoticComponent,
  type RefAttributes,
} from "react";
import {
  ColorPicker as AtomColorPicker,
  type ColorPickerContentProps as AtomColorPickerContentProps,
  type ColorPickerControlProps as AtomColorPickerControlProps,
  type ColorPickerHiddenInputProps as AtomColorPickerHiddenInputProps,
  type ColorPickerInputProps as AtomColorPickerInputProps,
  type ColorPickerLabelProps as AtomColorPickerLabelProps,
  type ColorPickerNativeInputProps as AtomColorPickerNativeInputProps,
  type ColorPickerRootProps as AtomColorPickerRootProps,
  type ColorPickerSwatchTriggerProps as AtomColorPickerSwatchTriggerProps,
  type ColorPickerTriggerProps as AtomColorPickerTriggerProps,
} from "@flowstack-ui/atom/color-picker";

export type ColorPickerSize = "sm" | "md" | "lg";
export type ColorPickerVariant = "outline" | "soft";

export type ColorPickerRootProps = Omit<AtomColorPickerRootProps, "className"> & {
  className?: string;
  size?: ColorPickerSize;
  variant?: ColorPickerVariant;
};
export type ColorPickerLabelProps = AtomColorPickerLabelProps;
export type ColorPickerControlProps = AtomColorPickerControlProps;
export type ColorPickerInputProps = AtomColorPickerInputProps;
export type ColorPickerNativeInputProps = AtomColorPickerNativeInputProps;
export type ColorPickerHiddenInputProps = AtomColorPickerHiddenInputProps;
export type ColorPickerTriggerProps = AtomColorPickerTriggerProps;
export type ColorPickerContentProps = AtomColorPickerContentProps;
export type ColorPickerSwatchTriggerProps = AtomColorPickerSwatchTriggerProps;

function classes(base: string, className?: string) {
  return className ? `${base} ${className}` : base;
}

export const ColorPickerRoot = forwardRef<HTMLDivElement, ColorPickerRootProps>(
  function ColorPickerRoot(
    { className, size = "md", variant = "outline", ...props },
    ref,
  ) {
    return (
      <AtomColorPicker.Root
        {...props}
        className={classes("brick-color-picker", className)}
        data-size={size}
        data-variant={variant}
        ref={ref}
      />
    );
  },
);

export const ColorPickerLabel: ForwardRefExoticComponent<
  ColorPickerLabelProps & RefAttributes<HTMLLabelElement>
> = forwardRef<HTMLLabelElement, ColorPickerLabelProps>(
  function ColorPickerLabel({ className, ...props }, ref) {
    return <AtomColorPicker.Label {...props} className={classes("brick-color-picker__label", className)} ref={ref} />;
  },
);

export const ColorPickerControl: ForwardRefExoticComponent<
  ColorPickerControlProps & RefAttributes<HTMLDivElement>
> = forwardRef<HTMLDivElement, ColorPickerControlProps>(
  function ColorPickerControl({ className, ...props }, ref) {
    return <AtomColorPicker.Control {...props} className={classes("brick-color-picker__control", className)} ref={ref} />;
  },
);

export const ColorPickerInput = forwardRef<HTMLInputElement, ColorPickerInputProps>(
  function ColorPickerInput({ className, ...props }, ref) {
    return <AtomColorPicker.Input {...props} className={classes("brick-color-picker__input", className)} ref={ref} />;
  },
);

export const ColorPickerNativeInput = forwardRef<HTMLInputElement, ColorPickerNativeInputProps>(
  function ColorPickerNativeInput({ className, ...props }, ref) {
    return <AtomColorPicker.NativeInput {...props} className={classes("brick-color-picker__native-input", className)} ref={ref} />;
  },
);

export const ColorPickerHiddenInput: ForwardRefExoticComponent<
  ColorPickerHiddenInputProps & RefAttributes<HTMLInputElement>
> = AtomColorPicker.HiddenInput;

export const ColorPickerTrigger = forwardRef<HTMLElement, ColorPickerTriggerProps>(
  function ColorPickerTrigger({ className, ...props }, ref) {
    return <AtomColorPicker.Trigger {...props} className={classes("brick-color-picker__trigger", className)} ref={ref} />;
  },
);

export const ColorPickerContent = forwardRef<HTMLDivElement, ColorPickerContentProps>(
  function ColorPickerContent({ className, sideOffset = 8, ...props }, ref) {
    return <AtomColorPicker.Content {...props} className={classes("brick-color-picker__content", className)} ref={ref} sideOffset={sideOffset} />;
  },
);

export const ColorPickerSwatchTrigger = forwardRef<HTMLButtonElement, ColorPickerSwatchTriggerProps>(
  function ColorPickerSwatchTrigger({ className, ...props }, ref) {
    return <AtomColorPicker.SwatchTrigger {...props} className={classes("brick-color-picker__swatch-trigger", className)} ref={ref} />;
  },
);

ColorPickerRoot.displayName = "ColorPicker.Root";
ColorPickerLabel.displayName = "ColorPicker.Label";
ColorPickerControl.displayName = "ColorPicker.Control";
ColorPickerInput.displayName = "ColorPicker.Input";
ColorPickerNativeInput.displayName = "ColorPicker.NativeInput";
ColorPickerTrigger.displayName = "ColorPicker.Trigger";
ColorPickerContent.displayName = "ColorPicker.Content";
ColorPickerSwatchTrigger.displayName = "ColorPicker.SwatchTrigger";

export const ColorPicker: Readonly<{
  Root: typeof ColorPickerRoot;
  Label: typeof ColorPickerLabel;
  Control: typeof ColorPickerControl;
  Input: typeof ColorPickerInput;
  NativeInput: typeof ColorPickerNativeInput;
  HiddenInput: typeof ColorPickerHiddenInput;
  Trigger: typeof ColorPickerTrigger;
  Content: typeof ColorPickerContent;
  SwatchTrigger: typeof ColorPickerSwatchTrigger;
}> = Object.freeze({
  Root: ColorPickerRoot,
  Label: ColorPickerLabel,
  Control: ColorPickerControl,
  Input: ColorPickerInput,
  NativeInput: ColorPickerNativeInput,
  HiddenInput: ColorPickerHiddenInput,
  Trigger: ColorPickerTrigger,
  Content: ColorPickerContent,
  SwatchTrigger: ColorPickerSwatchTrigger,
});

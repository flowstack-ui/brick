"use client";

import {
  forwardRef,
  type ForwardRefExoticComponent,
  type ReactNode,
  type RefAttributes,
} from "react";
import {
  ColorPicker as AtomColorPicker,
  type ColorPickerAreaBackgroundProps as AtomAreaBackgroundProps,
  type ColorPickerAreaProps as AtomAreaProps,
  type ColorPickerAreaThumbProps as AtomAreaThumbProps,
  type ColorPickerChannelInputProps as AtomChannelInputProps,
  type ColorPickerChannelSliderLabelProps as AtomChannelSliderLabelProps,
  type ColorPickerChannelSliderProps as AtomChannelSliderProps,
  type ColorPickerChannelSliderThumbProps as AtomChannelSliderThumbProps,
  type ColorPickerChannelSliderTrackProps as AtomChannelSliderTrackProps,
  type ColorPickerChannelSliderValueTextProps as AtomChannelSliderValueTextProps,
  type ColorPickerContentProps as AtomContentProps,
  type ColorPickerContextProps,
  type ColorPickerControlProps as AtomControlProps,
  type ColorPickerEyeDropperTriggerProps as AtomEyeDropperTriggerProps,
  type ColorPickerFormatSelectProps as AtomFormatSelectProps,
  type ColorPickerFormatTriggerProps as AtomFormatTriggerProps,
  type ColorPickerHiddenInputProps,
  type ColorPickerInputProps as AtomInputProps,
  type ColorPickerLabelProps as AtomLabelProps,
  type ColorPickerNativeInputProps as AtomNativeInputProps,
  type ColorPickerPositionerProps as AtomPositionerProps,
  type ColorPickerRootProps as AtomRootProps,
  type ColorPickerSwatchGroupProps as AtomSwatchGroupProps,
  type ColorPickerSwatchIndicatorProps as AtomSwatchIndicatorProps,
  type ColorPickerSwatchProps as AtomSwatchProps,
  type ColorPickerSwatchTriggerProps as AtomSwatchTriggerProps,
  type ColorPickerTransparencyGridProps as AtomTransparencyGridProps,
  type ColorPickerTriggerProps as AtomTriggerProps,
  type ColorPickerValueSwatchProps as AtomValueSwatchProps,
  type ColorPickerValueTextProps as AtomValueTextProps,
  type ColorPickerViewProps as AtomViewProps,
} from "@flowstack-ui/atom/color-picker";

export type ColorPickerSize = "sm" | "md" | "lg";
export type ColorPickerVariant = "outline" | "soft";

export type ColorPickerRootProps = Omit<AtomRootProps, "className"> & {
  className?: string;
  size?: ColorPickerSize;
  variant?: ColorPickerVariant;
};
export type ColorPickerLabelProps = AtomLabelProps;
export type ColorPickerControlProps = AtomControlProps;
export type ColorPickerInputProps = AtomInputProps;
export type ColorPickerChannelInputProps = AtomChannelInputProps;
export type ColorPickerNativeInputProps = AtomNativeInputProps;
export type ColorPickerTriggerProps = AtomTriggerProps;
export type ColorPickerPositionerProps = AtomPositionerProps;
export type ColorPickerContentProps = AtomContentProps;
export type ColorPickerValueTextProps = AtomValueTextProps;
export type ColorPickerValueSwatchProps = AtomValueSwatchProps;
export type ColorPickerAreaProps = AtomAreaProps;
export type ColorPickerAreaBackgroundProps = AtomAreaBackgroundProps;
export type ColorPickerAreaThumbProps = AtomAreaThumbProps;
export type ColorPickerChannelSliderProps = AtomChannelSliderProps;
export type ColorPickerChannelSliderLabelProps = AtomChannelSliderLabelProps;
export type ColorPickerChannelSliderTrackProps = AtomChannelSliderTrackProps;
export type ColorPickerChannelSliderThumbProps = AtomChannelSliderThumbProps;
export type ColorPickerChannelSliderValueTextProps = AtomChannelSliderValueTextProps;
export type ColorPickerTransparencyGridProps = AtomTransparencyGridProps;
export type ColorPickerEyeDropperTriggerProps = AtomEyeDropperTriggerProps;
export type ColorPickerSwatchGroupProps = AtomSwatchGroupProps;
export type ColorPickerSwatchTriggerProps = AtomSwatchTriggerProps;
export type ColorPickerSwatchProps = AtomSwatchProps;
export type ColorPickerSwatchIndicatorProps = AtomSwatchIndicatorProps;
export type ColorPickerFormatSelectProps = AtomFormatSelectProps;
export type ColorPickerFormatTriggerProps = AtomFormatTriggerProps;
export type ColorPickerViewProps = AtomViewProps;

function classes(base: string, className?: string) {
  return className ? `${base} ${className}` : base;
}

type Forward<Element, Props> = ForwardRefExoticComponent<Props & RefAttributes<Element>>;

export const ColorPickerRoot: Forward<HTMLDivElement, ColorPickerRootProps> = forwardRef<HTMLDivElement, ColorPickerRootProps>(
  function ColorPickerRoot({ className, size = "md", variant = "outline", ...props }, ref) {
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

export const ColorPickerLabel: Forward<HTMLLabelElement, ColorPickerLabelProps> = forwardRef<HTMLLabelElement, ColorPickerLabelProps>(
  function ColorPickerLabel({ className, ...props }, ref) {
    return <AtomColorPicker.Label {...props} className={classes("brick-color-picker__label", className)} ref={ref} />;
  },
);
export const ColorPickerControl: Forward<HTMLDivElement, ColorPickerControlProps> = forwardRef<HTMLDivElement, ColorPickerControlProps>(
  function ColorPickerControl({ className, ...props }, ref) {
    return <AtomColorPicker.Control {...props} className={classes("brick-color-picker__control", className)} ref={ref} />;
  },
);
export const ColorPickerInput: Forward<HTMLInputElement, ColorPickerInputProps> = forwardRef<HTMLInputElement, ColorPickerInputProps>(
  function ColorPickerInput({ className, ...props }, ref) {
    return <AtomColorPicker.Input {...props} className={classes("brick-color-picker__input", className)} ref={ref} />;
  },
);
export const ColorPickerChannelInput: Forward<HTMLInputElement, ColorPickerChannelInputProps> = forwardRef<HTMLInputElement, ColorPickerChannelInputProps>(
  function ColorPickerChannelInput({ className, ...props }, ref) {
    return <AtomColorPicker.ChannelInput {...props} className={classes("brick-color-picker__channel-input", className)} ref={ref} />;
  },
);
export const ColorPickerNativeInput: Forward<HTMLInputElement, ColorPickerNativeInputProps> = forwardRef<HTMLInputElement, ColorPickerNativeInputProps>(
  function ColorPickerNativeInput({ className, ...props }, ref) {
    return <AtomColorPicker.NativeInput {...props} className={classes("brick-color-picker__native-input", className)} ref={ref} />;
  },
);
export const ColorPickerHiddenInput: Forward<HTMLInputElement, ColorPickerHiddenInputProps> = AtomColorPicker.HiddenInput;
export const ColorPickerTrigger: Forward<HTMLButtonElement, ColorPickerTriggerProps> = forwardRef<HTMLButtonElement, ColorPickerTriggerProps>(
  function ColorPickerTrigger({ className, ...props }, ref) {
    return <AtomColorPicker.Trigger {...props} className={classes("brick-color-picker__trigger", className)} ref={ref} />;
  },
);
export const ColorPickerPositioner: Forward<HTMLDivElement, ColorPickerPositionerProps> = forwardRef<HTMLDivElement, ColorPickerPositionerProps>(
  function ColorPickerPositioner({ className, ...props }, ref) {
    return <AtomColorPicker.Positioner {...props} className={classes("brick-color-picker__positioner", className)} ref={ref} />;
  },
);
export const ColorPickerContent: Forward<HTMLDivElement, ColorPickerContentProps> = forwardRef<HTMLDivElement, ColorPickerContentProps>(
  function ColorPickerContent({ className, ...props }, ref) {
    return <AtomColorPicker.Content {...props} className={classes("brick-color-picker__content", className)} ref={ref} />;
  },
);
export const ColorPickerValueText: Forward<HTMLSpanElement, ColorPickerValueTextProps> = forwardRef<HTMLSpanElement, ColorPickerValueTextProps>(
  function ColorPickerValueText({ className, ...props }, ref) {
    return <AtomColorPicker.ValueText {...props} className={classes("brick-color-picker__value-text", className)} ref={ref} />;
  },
);
export const ColorPickerValueSwatch: Forward<HTMLDivElement, ColorPickerValueSwatchProps> = forwardRef<HTMLDivElement, ColorPickerValueSwatchProps>(
  function ColorPickerValueSwatch({ className, ...props }, ref) {
    return <AtomColorPicker.ValueSwatch {...props} className={classes("brick-color-picker__value-swatch", className)} ref={ref} />;
  },
);
export const ColorPickerArea: Forward<HTMLDivElement, ColorPickerAreaProps> = forwardRef<HTMLDivElement, ColorPickerAreaProps>(
  function ColorPickerArea({ className, ...props }, ref) {
    return <AtomColorPicker.Area {...props} className={classes("brick-color-picker__area", className)} ref={ref} />;
  },
);
export const ColorPickerAreaBackground: Forward<HTMLDivElement, ColorPickerAreaBackgroundProps> = forwardRef<HTMLDivElement, ColorPickerAreaBackgroundProps>(
  function ColorPickerAreaBackground({ className, ...props }, ref) {
    return <AtomColorPicker.AreaBackground {...props} className={classes("brick-color-picker__area-background", className)} ref={ref} />;
  },
);
export const ColorPickerAreaThumb: Forward<HTMLDivElement, ColorPickerAreaThumbProps> = forwardRef<HTMLDivElement, ColorPickerAreaThumbProps>(
  function ColorPickerAreaThumb({ className, ...props }, ref) {
    return <AtomColorPicker.AreaThumb {...props} className={classes("brick-color-picker__area-thumb", className)} ref={ref} />;
  },
);
export const ColorPickerChannelSlider: Forward<HTMLDivElement, ColorPickerChannelSliderProps> = forwardRef<HTMLDivElement, ColorPickerChannelSliderProps>(
  function ColorPickerChannelSlider({ className, ...props }, ref) {
    return <AtomColorPicker.ChannelSlider {...props} className={classes("brick-color-picker__channel-slider", className)} ref={ref} />;
  },
);
export const ColorPickerChannelSliderLabel: Forward<HTMLLabelElement, ColorPickerChannelSliderLabelProps> = forwardRef<HTMLLabelElement, ColorPickerChannelSliderLabelProps>(
  function ColorPickerChannelSliderLabel({ className, ...props }, ref) {
    return <AtomColorPicker.ChannelSliderLabel {...props} className={classes("brick-color-picker__channel-slider-label", className)} ref={ref} />;
  },
);
export const ColorPickerChannelSliderTrack: Forward<HTMLDivElement, ColorPickerChannelSliderTrackProps> = forwardRef<HTMLDivElement, ColorPickerChannelSliderTrackProps>(
  function ColorPickerChannelSliderTrack({ className, ...props }, ref) {
    return <AtomColorPicker.ChannelSliderTrack {...props} className={classes("brick-color-picker__channel-slider-track", className)} ref={ref} />;
  },
);
export const ColorPickerChannelSliderThumb: Forward<HTMLDivElement, ColorPickerChannelSliderThumbProps> = forwardRef<HTMLDivElement, ColorPickerChannelSliderThumbProps>(
  function ColorPickerChannelSliderThumb({ className, ...props }, ref) {
    return <AtomColorPicker.ChannelSliderThumb {...props} className={classes("brick-color-picker__channel-slider-thumb", className)} ref={ref} />;
  },
);
export const ColorPickerChannelSliderValueText: Forward<HTMLSpanElement, ColorPickerChannelSliderValueTextProps> = forwardRef<HTMLSpanElement, ColorPickerChannelSliderValueTextProps>(
  function ColorPickerChannelSliderValueText({ className, ...props }, ref) {
    return <AtomColorPicker.ChannelSliderValueText {...props} className={classes("brick-color-picker__channel-slider-value", className)} ref={ref} />;
  },
);
export const ColorPickerTransparencyGrid: Forward<HTMLDivElement, ColorPickerTransparencyGridProps> = forwardRef<HTMLDivElement, ColorPickerTransparencyGridProps>(
  function ColorPickerTransparencyGrid({ className, ...props }, ref) {
    return <AtomColorPicker.TransparencyGrid {...props} className={classes("brick-color-picker__transparency-grid", className)} ref={ref} />;
  },
);
export const ColorPickerEyeDropperTrigger: Forward<HTMLButtonElement, ColorPickerEyeDropperTriggerProps> = forwardRef<HTMLButtonElement, ColorPickerEyeDropperTriggerProps>(
  function ColorPickerEyeDropperTrigger({ className, children, ...props }, ref) {
    return (
      <AtomColorPicker.EyeDropperTrigger {...props} className={classes("brick-color-picker__eye-dropper-trigger", className)} ref={ref}>
        {children ?? <span aria-hidden="true">⌖</span>}
      </AtomColorPicker.EyeDropperTrigger>
    );
  },
);
export const ColorPickerSwatchGroup: Forward<HTMLDivElement, ColorPickerSwatchGroupProps> = forwardRef<HTMLDivElement, ColorPickerSwatchGroupProps>(
  function ColorPickerSwatchGroup({ className, ...props }, ref) {
    return <AtomColorPicker.SwatchGroup {...props} className={classes("brick-color-picker__swatch-group", className)} ref={ref} />;
  },
);
export const ColorPickerSwatchTrigger: Forward<HTMLButtonElement, ColorPickerSwatchTriggerProps> = forwardRef<HTMLButtonElement, ColorPickerSwatchTriggerProps>(
  function ColorPickerSwatchTrigger({ className, ...props }, ref) {
    return <AtomColorPicker.SwatchTrigger {...props} className={classes("brick-color-picker__swatch-trigger", className)} ref={ref} />;
  },
);
export const ColorPickerSwatch: Forward<HTMLDivElement, ColorPickerSwatchProps> = forwardRef<HTMLDivElement, ColorPickerSwatchProps>(
  function ColorPickerSwatch({ className, ...props }, ref) {
    return <AtomColorPicker.Swatch {...props} className={classes("brick-color-picker__swatch", className)} ref={ref} />;
  },
);
export const ColorPickerSwatchIndicator: Forward<HTMLSpanElement, ColorPickerSwatchIndicatorProps> = forwardRef<HTMLSpanElement, ColorPickerSwatchIndicatorProps>(
  function ColorPickerSwatchIndicator({ className, ...props }, ref) {
    return <AtomColorPicker.SwatchIndicator {...props} className={classes("brick-color-picker__swatch-indicator", className)} ref={ref} />;
  },
);
export const ColorPickerFormatSelect: Forward<HTMLSelectElement, ColorPickerFormatSelectProps> = forwardRef<HTMLSelectElement, ColorPickerFormatSelectProps>(
  function ColorPickerFormatSelect({ className, ...props }, ref) {
    return <AtomColorPicker.FormatSelect {...props} className={classes("brick-color-picker__format-select", className)} ref={ref} />;
  },
);
export const ColorPickerFormatTrigger: Forward<HTMLButtonElement, ColorPickerFormatTriggerProps> = forwardRef<HTMLButtonElement, ColorPickerFormatTriggerProps>(
  function ColorPickerFormatTrigger({ className, ...props }, ref) {
    return <AtomColorPicker.FormatTrigger {...props} className={classes("brick-color-picker__format-trigger", className)} ref={ref} />;
  },
);
export const ColorPickerView: Forward<HTMLDivElement, ColorPickerViewProps> = forwardRef<HTMLDivElement, ColorPickerViewProps>(
  function ColorPickerView({ className, ...props }, ref) {
    return <AtomColorPicker.View {...props} className={classes("brick-color-picker__view", className)} ref={ref} />;
  },
);
export const ColorPickerContext: (props: ColorPickerContextProps) => ReactNode = AtomColorPicker.Context;

const displayNames = [
  [ColorPickerRoot, "ColorPicker.Root"], [ColorPickerLabel, "ColorPicker.Label"],
  [ColorPickerControl, "ColorPicker.Control"], [ColorPickerInput, "ColorPicker.Input"],
  [ColorPickerChannelInput, "ColorPicker.ChannelInput"], [ColorPickerNativeInput, "ColorPicker.NativeInput"],
  [ColorPickerTrigger, "ColorPicker.Trigger"], [ColorPickerPositioner, "ColorPicker.Positioner"],
  [ColorPickerContent, "ColorPicker.Content"], [ColorPickerValueText, "ColorPicker.ValueText"],
  [ColorPickerValueSwatch, "ColorPicker.ValueSwatch"], [ColorPickerArea, "ColorPicker.Area"],
  [ColorPickerAreaBackground, "ColorPicker.AreaBackground"], [ColorPickerAreaThumb, "ColorPicker.AreaThumb"],
  [ColorPickerChannelSlider, "ColorPicker.ChannelSlider"], [ColorPickerChannelSliderLabel, "ColorPicker.ChannelSliderLabel"],
  [ColorPickerChannelSliderTrack, "ColorPicker.ChannelSliderTrack"], [ColorPickerChannelSliderThumb, "ColorPicker.ChannelSliderThumb"],
  [ColorPickerChannelSliderValueText, "ColorPicker.ChannelSliderValueText"], [ColorPickerTransparencyGrid, "ColorPicker.TransparencyGrid"],
  [ColorPickerEyeDropperTrigger, "ColorPicker.EyeDropperTrigger"], [ColorPickerSwatchGroup, "ColorPicker.SwatchGroup"],
  [ColorPickerSwatchTrigger, "ColorPicker.SwatchTrigger"], [ColorPickerSwatch, "ColorPicker.Swatch"],
  [ColorPickerSwatchIndicator, "ColorPicker.SwatchIndicator"], [ColorPickerFormatSelect, "ColorPicker.FormatSelect"],
  [ColorPickerFormatTrigger, "ColorPicker.FormatTrigger"], [ColorPickerView, "ColorPicker.View"],
] as const;
for (const [component, name] of displayNames) component.displayName = name;

export const ColorPicker: Readonly<{
  Root: typeof ColorPickerRoot;
  Context: typeof ColorPickerContext;
  Label: typeof ColorPickerLabel;
  Control: typeof ColorPickerControl;
  Input: typeof ColorPickerInput;
  ChannelInput: typeof ColorPickerChannelInput;
  NativeInput: typeof ColorPickerNativeInput;
  HiddenInput: typeof ColorPickerHiddenInput;
  Trigger: typeof ColorPickerTrigger;
  Positioner: typeof ColorPickerPositioner;
  Content: typeof ColorPickerContent;
  ValueText: typeof ColorPickerValueText;
  ValueSwatch: typeof ColorPickerValueSwatch;
  Area: typeof ColorPickerArea;
  AreaBackground: typeof ColorPickerAreaBackground;
  AreaThumb: typeof ColorPickerAreaThumb;
  ChannelSlider: typeof ColorPickerChannelSlider;
  ChannelSliderLabel: typeof ColorPickerChannelSliderLabel;
  ChannelSliderTrack: typeof ColorPickerChannelSliderTrack;
  ChannelSliderThumb: typeof ColorPickerChannelSliderThumb;
  ChannelSliderValueText: typeof ColorPickerChannelSliderValueText;
  TransparencyGrid: typeof ColorPickerTransparencyGrid;
  EyeDropperTrigger: typeof ColorPickerEyeDropperTrigger;
  SwatchGroup: typeof ColorPickerSwatchGroup;
  SwatchTrigger: typeof ColorPickerSwatchTrigger;
  Swatch: typeof ColorPickerSwatch;
  SwatchIndicator: typeof ColorPickerSwatchIndicator;
  FormatSelect: typeof ColorPickerFormatSelect;
  FormatTrigger: typeof ColorPickerFormatTrigger;
  View: typeof ColorPickerView;
}> = Object.freeze({
  Root: ColorPickerRoot,
  Context: ColorPickerContext,
  Label: ColorPickerLabel,
  Control: ColorPickerControl,
  Input: ColorPickerInput,
  ChannelInput: ColorPickerChannelInput,
  NativeInput: ColorPickerNativeInput,
  HiddenInput: ColorPickerHiddenInput,
  Trigger: ColorPickerTrigger,
  Positioner: ColorPickerPositioner,
  Content: ColorPickerContent,
  ValueText: ColorPickerValueText,
  ValueSwatch: ColorPickerValueSwatch,
  Area: ColorPickerArea,
  AreaBackground: ColorPickerAreaBackground,
  AreaThumb: ColorPickerAreaThumb,
  ChannelSlider: ColorPickerChannelSlider,
  ChannelSliderLabel: ColorPickerChannelSliderLabel,
  ChannelSliderTrack: ColorPickerChannelSliderTrack,
  ChannelSliderThumb: ColorPickerChannelSliderThumb,
  ChannelSliderValueText: ColorPickerChannelSliderValueText,
  TransparencyGrid: ColorPickerTransparencyGrid,
  EyeDropperTrigger: ColorPickerEyeDropperTrigger,
  SwatchGroup: ColorPickerSwatchGroup,
  SwatchTrigger: ColorPickerSwatchTrigger,
  Swatch: ColorPickerSwatch,
  SwatchIndicator: ColorPickerSwatchIndicator,
  FormatSelect: ColorPickerFormatSelect,
  FormatTrigger: ColorPickerFormatTrigger,
  View: ColorPickerView,
});

export type { ColorPickerContextProps, ColorPickerHiddenInputProps };

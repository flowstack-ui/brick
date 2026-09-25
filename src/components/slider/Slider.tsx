"use client";

import {
  createContext,
  forwardRef,
  useContext,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import {
  Slider as AtomSlider,
  useSliderContext,
  type SliderControlProps as AtomSliderControlProps,
  type SliderDraggingIndicatorProps as AtomSliderDraggingIndicatorProps,
  type SliderHiddenInputProps as AtomSliderHiddenInputProps,
  type SliderLabelProps as AtomSliderLabelProps,
  type SliderMarkerGroupProps as AtomSliderMarkerGroupProps,
  type SliderMarkerProps as AtomSliderMarkerProps,
  type SliderRangeProps as AtomSliderRangeProps,
  type SliderRootProps as AtomSliderRootProps,
  type SliderRootProviderProps as AtomSliderRootProviderProps,
  type SliderThumbProps as AtomSliderThumbProps,
  type SliderTrackProps as AtomSliderTrackProps,
  type SliderValueTextProps as AtomSliderValueTextProps,
} from "@flowstack-ui/atom/slider";
import {
  responsiveDataAttributes,
  type ResponsiveValue,
} from "../_responsive-value/ResponsiveValue.js";

export { useSlider, useSliderContext } from "@flowstack-ui/atom/slider";
export type {
  SliderCollisionBehavior,
  SliderController,
  SliderHiddenInputMode,
  SliderOrigin,
  SliderThumbAlignment,
  SliderThumbSize,
  SliderValue,
  UseSliderProps,
} from "@flowstack-ui/atom/slider";

export type SliderSize = "sm" | "md" | "lg";
export type SliderVariant = "outline" | "solid" | "soft";
export type SliderTone = "neutral" | "accent" | "contrast";
export type SliderFrame = "none" | "outline" | "panel" | "inline";

interface SliderPresentationProps {
  size?: ResponsiveValue<SliderSize>;
  variant?: ResponsiveValue<SliderVariant>;
  tone?: SliderTone;
  frame?: SliderFrame;
}

function mergeClassName(base: string, className?: string) {
  return className ? `${base} ${className}` : base;
}

function presentationAttributes(
  { size = "md", variant = "outline", tone = "accent", frame = "none" }: SliderPresentationProps,
  style?: CSSProperties,
) {
  return {
    ...responsiveDataAttributes("data-size", size, { alwaysInitial: true, defaultValue: "md" }),
    ...responsiveDataAttributes("data-variant", variant, { alwaysInitial: true, defaultValue: "outline" }),
    "data-tone": tone,
    "data-frame": frame,
    style,
  };
}

const SliderThumbIndexContext = createContext<number | null>(null);

export interface SliderRootProps extends AtomSliderRootProps, SliderPresentationProps {}
export interface SliderRootProviderProps extends AtomSliderRootProviderProps, SliderPresentationProps {}
export type SliderControlProps = AtomSliderControlProps;
export type SliderTrackProps = AtomSliderTrackProps;
export type SliderRangeProps = AtomSliderRangeProps;
export type SliderThumbProps = AtomSliderThumbProps;
export type SliderLabelProps = AtomSliderLabelProps;
export type SliderValueTextProps = AtomSliderValueTextProps;
export type SliderMarkerGroupProps = AtomSliderMarkerGroupProps;
export type SliderMarkerProps = AtomSliderMarkerProps;
export type SliderDraggingIndicatorProps = AtomSliderDraggingIndicatorProps;
export type SliderHiddenInputProps = AtomSliderHiddenInputProps;

export interface SliderValueLabelDetails { index: number; percent: number; value: number; }
export interface SliderValueLabelProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  children?: ReactNode | ((details: SliderValueLabelDetails) => ReactNode);
  "data-slot"?: string;
}

export interface SliderThumbsProps {
  children?: (details: SliderValueLabelDetails) => ReactNode;
  thumbProps?: Omit<SliderThumbProps, "index" | "children">;
}

export type SliderMark = number | { value: number; label?: ReactNode };
export interface SliderMarksProps { marks: readonly SliderMark[]; }

export const SliderRoot = forwardRef<HTMLElement, SliderRootProps>(function SliderRoot(
  { className, frame, size, variant, tone, style, "data-slot": dataSlot, ...props }, ref,
) {
  return (
    <AtomSlider.Root
      {...props}
      className={mergeClassName("brick-slider", className)}
      {...presentationAttributes({ frame, size, variant, tone }, style)}
      data-slot={dataSlot ?? "slider"}
      ref={ref}
    />
  );
});

export const SliderRootProvider = forwardRef<HTMLElement, SliderRootProviderProps>(function SliderRootProvider(
  { className, frame, size, variant, tone, style, "data-slot": dataSlot, ...props }, ref,
) {
  return (
    <AtomSlider.RootProvider
      {...props}
      className={mergeClassName("brick-slider", className)}
      {...presentationAttributes({ frame, size, variant, tone }, style)}
      data-slot={dataSlot ?? "slider-root-provider"}
      ref={ref}
    />
  );
});

export const SliderControl = forwardRef<HTMLDivElement, SliderControlProps>(function SliderControl(
  { className, "data-slot": dataSlot, ...props }, ref,
) {
  return <AtomSlider.Control {...props} className={mergeClassName("brick-slider__control", className)} data-slot={dataSlot ?? "slider-control"} ref={ref} />;
});

export const SliderTrack = forwardRef<HTMLDivElement, SliderTrackProps>(function SliderTrack(
  { className, "data-slot": dataSlot, ...props }, ref,
) {
  return <AtomSlider.Track {...props} className={mergeClassName("brick-slider__track", className)} data-slot={dataSlot ?? "slider-track"} ref={ref} />;
});

export const SliderRange = forwardRef<HTMLSpanElement, SliderRangeProps>(function SliderRange(
  { className, "data-slot": dataSlot, ...props }, ref,
) {
  return <AtomSlider.Range {...props} className={mergeClassName("brick-slider__range", className)} data-slot={dataSlot ?? "slider-range"} ref={ref} />;
});

export const SliderThumb = forwardRef<HTMLSpanElement, SliderThumbProps>(function SliderThumb(
  { children, className, index = 0, "data-slot": dataSlot, ...props }, ref,
) {
  return (
    <SliderThumbIndexContext.Provider value={index}>
      <AtomSlider.Thumb {...props} className={mergeClassName("brick-slider__thumb", className)} data-slot={dataSlot ?? "slider-thumb"} index={index} ref={ref}>
        {children}
      </AtomSlider.Thumb>
    </SliderThumbIndexContext.Provider>
  );
});

export const SliderLabel = forwardRef<HTMLLabelElement, SliderLabelProps>(function SliderLabel(
  { className, "data-slot": dataSlot, ...props }, ref,
) {
  return <AtomSlider.Label {...props} className={mergeClassName("brick-slider__label", className)} data-slot={dataSlot ?? "slider-label"} ref={ref} />;
});

export const SliderValueText = forwardRef<HTMLOutputElement, SliderValueTextProps>(function SliderValueText(
  { className, "data-slot": dataSlot, ...props }, ref,
) {
  return <AtomSlider.ValueText {...props} className={mergeClassName("brick-slider__value-text", className)} data-slot={dataSlot ?? "slider-value-text"} ref={ref} />;
});

export const SliderMarkerGroup = forwardRef<HTMLDivElement, SliderMarkerGroupProps>(function SliderMarkerGroup(
  { className, "data-slot": dataSlot, ...props }, ref,
) {
  return <AtomSlider.MarkerGroup {...props} className={mergeClassName("brick-slider__marker-group", className)} data-slot={dataSlot ?? "slider-marker-group"} ref={ref} />;
});

export const SliderMarker = forwardRef<HTMLSpanElement, SliderMarkerProps>(function SliderMarker(
  { className, value, "data-slot": dataSlot, ...props }, ref,
) {
  const context = useSliderContext();
  const percent = context.valueToPercent(value);
  const edge = percent <= 0 ? "start" : percent >= 100 ? "end" : undefined;
  return <AtomSlider.Marker {...props} className={mergeClassName("brick-slider__marker", className)} data-edge={edge} data-slot={dataSlot ?? "slider-marker"} ref={ref} value={value} />;
});

export const SliderMarkerIndicator = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(function SliderMarkerIndicator(
  { className, ...props }, ref,
) {
  return <AtomSlider.MarkerIndicator {...props} className={mergeClassName("brick-slider__marker-indicator", className)} ref={ref} />;
});

export const SliderMarkerLabel = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(function SliderMarkerLabel(
  { className, ...props }, ref,
) {
  return <AtomSlider.MarkerLabel {...props} className={mergeClassName("brick-slider__marker-label", className)} ref={ref} />;
});

export const SliderValueLabel = forwardRef<HTMLSpanElement, SliderValueLabelProps>(function SliderValueLabel(
  { children, className, "data-slot": dataSlot, ...props }, ref,
) {
  const index = useContext(SliderThumbIndexContext);
  const context = useSliderContext();
  if (index === null) throw new Error("<Slider.ValueLabel> must be used within <Slider.Thumb>.");
  const state = context.getThumbState(index);
  const content = typeof children === "function" ? children(state) : children ?? state.value;
  return <span {...props} aria-hidden="true" className={mergeClassName("brick-slider__value-label", className)} data-slot={dataSlot ?? "slider-value-label"} ref={ref}>{content}</span>;
});

export const SliderDraggingIndicator = forwardRef<HTMLSpanElement, SliderDraggingIndicatorProps>(function SliderDraggingIndicator(
  { className, index, style, "data-slot": dataSlot, ...props }, ref,
) {
  const context = useSliderContext();
  const resolvedIndex = index ?? context.draggingIndex ?? 0;
  return (
    <AtomSlider.DraggingIndicator
      {...props}
      className={mergeClassName("brick-slider__dragging-indicator", className)}
      data-slot={dataSlot ?? "slider-dragging-indicator"}
      index={index}
      ref={ref}
      style={{ ...context.getThumbOffsetStyle(resolvedIndex), ...style }}
    />
  );
});

export const SliderHiddenInput = forwardRef<HTMLInputElement, SliderHiddenInputProps>(function SliderHiddenInput(
  { className, "data-slot": dataSlot, ...props }, ref,
) {
  return <AtomSlider.HiddenInput {...props} className={mergeClassName("brick-slider__hidden-input", className)} data-slot={dataSlot ?? "slider-hidden-input"} ref={ref} />;
});

export function SliderThumbs({ children, thumbProps }: SliderThumbsProps) {
  const context = useSliderContext();
  return context.values.map((_, index) => {
    const state = context.getThumbState(index);
    return <SliderThumb {...thumbProps} index={index} key={index}>{children?.(state)}</SliderThumb>;
  });
}

export function SliderMarks({ marks }: SliderMarksProps) {
  return (
    <SliderMarkerGroup>
      {marks.map((mark) => {
        const value = typeof mark === "number" ? mark : mark.value;
        const label = typeof mark === "number" ? mark : mark.label;
        return <SliderMarker key={value} value={value}><SliderMarkerIndicator />{label !== undefined && <SliderMarkerLabel>{label}</SliderMarkerLabel>}</SliderMarker>;
      })}
    </SliderMarkerGroup>
  );
}

SliderRoot.displayName = "Slider.Root";
SliderRootProvider.displayName = "Slider.RootProvider";
SliderControl.displayName = "Slider.Control";
SliderTrack.displayName = "Slider.Track";
SliderRange.displayName = "Slider.Range";
SliderThumb.displayName = "Slider.Thumb";
SliderLabel.displayName = "Slider.Label";
SliderValueText.displayName = "Slider.ValueText";
SliderMarkerGroup.displayName = "Slider.MarkerGroup";
SliderMarker.displayName = "Slider.Marker";
SliderMarkerIndicator.displayName = "Slider.MarkerIndicator";
SliderMarkerLabel.displayName = "Slider.MarkerLabel";
SliderValueLabel.displayName = "Slider.ValueLabel";
SliderDraggingIndicator.displayName = "Slider.DraggingIndicator";
SliderHiddenInput.displayName = "Slider.HiddenInput";

export const Slider = Object.freeze({
  Root: SliderRoot,
  RootProvider: SliderRootProvider,
  Context: AtomSlider.Context,
  Control: SliderControl,
  Track: SliderTrack,
  Range: SliderRange,
  Thumb: SliderThumb,
  Thumbs: SliderThumbs,
  Label: SliderLabel,
  ValueText: SliderValueText,
  MarkerGroup: SliderMarkerGroup,
  Marker: SliderMarker,
  MarkerIndicator: SliderMarkerIndicator,
  MarkerLabel: SliderMarkerLabel,
  Marks: SliderMarks,
  ValueLabel: SliderValueLabel,
  DraggingIndicator: SliderDraggingIndicator,
  HiddenInput: SliderHiddenInput,
});

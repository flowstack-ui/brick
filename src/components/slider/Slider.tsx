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
  type SliderRangeProps as AtomSliderRangeProps,
  type SliderRootProps as AtomSliderRootProps,
  type SliderThumbProps as AtomSliderThumbProps,
  type SliderTrackProps as AtomSliderTrackProps,
} from "@flowstack-ui/atom/slider";

export type SliderSize = "sm" | "md" | "lg";
export type SliderVariant = "solid" | "soft";
export type SliderFrame = "none" | "outline";

function mergeClassName(base: string, className?: string) {
  return className ? `${base} ${className}` : base;
}

const SliderThumbIndexContext = createContext<number | null>(null);

export interface SliderRootProps extends AtomSliderRootProps {
  /** Visual geometry for Track, Range, Thumb, Marker, and ValueLabel. @default "md" */
  size?: SliderSize;
  /** Selected-range paint recipe. @default "solid" */
  variant?: SliderVariant;
  /** Optional finished container around the interactive track. @default "none" */
  frame?: SliderFrame;
}

export type SliderTrackProps = AtomSliderTrackProps;
export type SliderRangeProps = AtomSliderRangeProps;
export type SliderThumbProps = AtomSliderThumbProps;

export interface SliderMarkerProps extends HTMLAttributes<HTMLSpanElement> {
  /** Numeric position within the containing Slider range. */
  value: number;
  "data-slot"?: string;
}

export interface SliderValueLabelDetails {
  index: number;
  percent: number;
  value: number;
}

export interface SliderValueLabelProps extends Omit<
  HTMLAttributes<HTMLSpanElement>,
  "children"
> {
  children?: ReactNode | ((details: SliderValueLabelDetails) => ReactNode);
  "data-slot"?: string;
}

export const SliderRoot = forwardRef<HTMLDivElement, SliderRootProps>(
  function SliderRoot(
    {
      className,
      frame = "none",
      size = "md",
      variant = "solid",
      "data-slot": dataSlot,
      ...props
    },
    ref,
  ) {
    return (
      <AtomSlider.Root
        {...props}
        className={mergeClassName("brick-slider", className)}
        data-frame={frame}
        data-size={size}
        data-slot={dataSlot ?? "slider"}
        data-variant={variant}
        ref={ref}
      />
    );
  },
);

export const SliderTrack = forwardRef<HTMLDivElement, SliderTrackProps>(
  function SliderTrack({ className, "data-slot": dataSlot, ...props }, ref) {
    return (
      <AtomSlider.Track
        {...props}
        className={mergeClassName("brick-slider__track", className)}
        data-slot={dataSlot ?? "slider-track"}
        ref={ref}
      />
    );
  },
);

export const SliderRange = forwardRef<HTMLSpanElement, SliderRangeProps>(
  function SliderRange({ className, "data-slot": dataSlot, ...props }, ref) {
    return (
      <AtomSlider.Range
        {...props}
        className={mergeClassName("brick-slider__range", className)}
        data-slot={dataSlot ?? "slider-range"}
        ref={ref}
      />
    );
  },
);

export const SliderThumb = forwardRef<HTMLSpanElement, SliderThumbProps>(
  function SliderThumb(
    { children, className, index = 0, "data-slot": dataSlot, ...props },
    ref,
  ) {
    return (
      <SliderThumbIndexContext.Provider value={index}>
        <AtomSlider.Thumb
          {...props}
          className={mergeClassName("brick-slider__thumb", className)}
          data-slot={dataSlot ?? "slider-thumb"}
          index={index}
          ref={ref}
        >
          {children}
        </AtomSlider.Thumb>
      </SliderThumbIndexContext.Provider>
    );
  },
);

export const SliderMarker = forwardRef<HTMLSpanElement, SliderMarkerProps>(
  function SliderMarker(
    { className, style, value, "data-slot": dataSlot, ...props },
    ref,
  ) {
    const context = useSliderContext();
    const percent = context.valueToPercent(value);
    const range = context.getRangeState();
    const edge = percent <= 0 ? "start" : percent >= 100 ? "end" : undefined;
    const selected = percent >= range.startPercent && percent <= range.endPercent;
    const resolvedStyle = {
      ...style,
      "--brick-slider-marker-percent": percent,
    } as CSSProperties;

    return (
      <span
        {...props}
        aria-hidden="true"
        className={mergeClassName("brick-slider__marker", className)}
        data-edge={edge}
        data-orientation={context.orientation}
        data-selected={selected ? "" : undefined}
        data-slot={dataSlot ?? "slider-marker"}
        data-value={value}
        ref={ref}
        style={resolvedStyle}
      />
    );
  },
);

export const SliderValueLabel = forwardRef<
  HTMLSpanElement,
  SliderValueLabelProps
>(function SliderValueLabel(
  { children, className, "data-slot": dataSlot, ...props },
  ref,
) {
  const index = useContext(SliderThumbIndexContext);
  const context = useSliderContext();
  if (index === null) {
    throw new Error("<Slider.ValueLabel> must be used within <Slider.Thumb>.");
  }
  const state = context.getThumbState(index);
  const details: SliderValueLabelDetails = state;
  const content = typeof children === "function" ? children(details) : children ?? state.value;

  return (
    <span
      {...props}
      aria-hidden="true"
      className={mergeClassName("brick-slider__value-label", className)}
      data-slot={dataSlot ?? "slider-value-label"}
      ref={ref}
    >
      {content}
    </span>
  );
});

SliderRoot.displayName = "Slider.Root";
SliderTrack.displayName = "Slider.Track";
SliderRange.displayName = "Slider.Range";
SliderThumb.displayName = "Slider.Thumb";
SliderMarker.displayName = "Slider.Marker";
SliderValueLabel.displayName = "Slider.ValueLabel";

export const Slider = Object.freeze({
  Root: SliderRoot,
  Track: SliderTrack,
  Range: SliderRange,
  Thumb: SliderThumb,
  Marker: SliderMarker,
  ValueLabel: SliderValueLabel,
});

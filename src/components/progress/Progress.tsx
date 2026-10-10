import {
  createContext,
  forwardRef,
  useContext,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
  type Ref,
} from "react";
import {
  Progress as AtomProgress,
  getProgressState,
  useProgressContext,
  useProgress,
  type ProgressController,
  type UseProgressProps,
  type ProgressIndicatorProps as AtomProgressIndicatorProps,
  type ProgressRootProps as AtomProgressRootProps,
} from "@flowstack-ui/atom/progress";
import { useLocaleContext } from "../locale-provider/LocaleProvider.js";
import { radiusStyle, type RadiusShapeProps } from "../_radius/Radius.js";
import { responsiveDataAttributes, type ResponsiveValue } from "../_responsive-value/ResponsiveValue.js";
import { staticPart, type StaticPartProps } from "../_internal/StaticPart.js";

export { useProgress };
export type { ProgressController, UseProgressProps };
export type ProgressVariant = "outline" | "subtle";
export type ProgressLayout = "stacked" | "inline";
export type ProgressValueFormat = "percent" | "value";

export type ProgressOrientation = "horizontal" | "vertical";
export type ProgressSize = "xs" | "sm" | "md" | "lg" | "xl";
export type ProgressShape = "square" | "rounded" | "pill";
export type ProgressTone =
  | "neutral"
  | "accent"
  | "info"
  | "success"
  | "warning"
  | "danger";

type ProgressFormatOptions = Intl.NumberFormatOptions;

interface ProgressVisualContextValue {
  bufferPercent: number | null;
  formatOptions?: ProgressFormatOptions;
  labelId: string;
  locale?: Intl.LocalesArgument;
  valueFormat: ProgressValueFormat;
}

const ProgressVisualContext = createContext<ProgressVisualContextValue | null>(null);

function useProgressVisualContext() {
  const context = useContext(ProgressVisualContext);
  if (!context) {
    throw new Error("Brick Progress parts must be used within <Progress.Root>.");
  }
  return context;
}

function mergeClassName(base: string, className?: string) {
  return className ? `${base} ${className}` : base;
}

export type ProgressRootProps = Omit<
  AtomProgressRootProps,
  "className" | "style"
> & RadiusShapeProps<ProgressShape> & {
  orientation?: ProgressOrientation;
  size?: ResponsiveValue<ProgressSize>;
  variant?: ResponsiveValue<ProgressVariant>;
  layout?: ProgressLayout;
  striped?: boolean;
  animated?: boolean;
  valueFormat?: ProgressValueFormat;
  tone?: ProgressTone;
  bufferValue?: number | null;
  locale?: Intl.LocalesArgument;
  formatOptions?: ProgressFormatOptions;
  className?: string;
  style?: CSSProperties;
}

export type ProgressRootProviderProps = Omit<ProgressRootProps, keyof UseProgressProps> & { value: ProgressController };

export const ProgressRootProvider = forwardRef<HTMLDivElement, ProgressRootProviderProps>(
  function ProgressRootProvider(
    {
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      bufferValue,
      children,
      className,
      formatOptions,
      locale,
      orientation = "horizontal",
      shape = "rounded",
      radius,
      size = "md",
      variant = "outline",
      layout = "stacked",
      striped = false,
      animated = false,
      valueFormat = "percent",
      style,
      tone = "accent",
      value,
      "data-slot": dataSlot,
      ...props
    },
    ref,
  ) {
    const localeContext = useLocaleContext();
    const labelId = value.ids.label;
    const bufferState =
      bufferValue === null || bufferValue === undefined
        ? null
        : getProgressState({ value: bufferValue, min: value.min, max: value.max });

    return (
      <ProgressVisualContext.Provider
        value={{
          bufferPercent: bufferState?.percent ?? null,
          formatOptions,
          labelId,
          valueFormat,
          locale: locale ?? localeContext.locale,
        }}
      >
        <AtomProgress.RootProvider
          {...props}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy ?? (ariaLabel ? undefined : labelId)}
          className={mergeClassName("brick-progress", className)}
          data-orientation={orientation}
          data-shape={radius === undefined ? shape : "rounded"}
          {...responsiveDataAttributes("data-size", size, { defaultValue: "md", alwaysInitial: true })}
          {...responsiveDataAttributes("data-variant", variant, { defaultValue: "outline", alwaysInitial: true })}
          data-layout={layout}
          data-striped={striped || animated ? "" : undefined}
          data-animated={animated ? "" : undefined}
          data-slot={dataSlot ?? "progress"}
          data-tone={tone}
          ref={ref}
          style={radiusStyle(radius, "--brick-progress-radius", style)}
          value={value}
        >
          {children}
        </AtomProgress.RootProvider>
      </ProgressVisualContext.Provider>
    );
  },
);

export const ProgressRoot = forwardRef<HTMLDivElement, ProgressRootProps>(function ProgressRoot(
  { value, defaultValue, onValueChange, ids, min, max, ...props }, ref,
) {
  const controller = useProgress({ value, defaultValue, onValueChange, ids, min, max });
  return <ProgressRootProvider {...props} value={controller} ref={ref} />;
});

export const ProgressContext = AtomProgress.Context;

export interface ProgressLabelProps extends Omit<
  HTMLAttributes<HTMLSpanElement>,
  "id"
> {
  "data-slot"?: string;
  asChild?: boolean;
}

export const ProgressLabel = forwardRef<HTMLSpanElement, ProgressLabelProps>(
  function ProgressLabel({ className, "data-slot": dataSlot, ...props }, ref) {
    const { labelId } = useProgressVisualContext();
    return staticPart("span", { ...props, className, id: labelId, "data-slot": dataSlot } as StaticPartProps,
      ref as Ref<HTMLElement>, "brick-progress__label", "progress-label");
  },
);

export interface ProgressValueDetails {
  formattedValue: string;
  max: number;
  min: number;
  percent: number | null;
  state: "loading" | "complete" | "indeterminate";
  value: number | null;
}

export interface ProgressValueProps extends Omit<
  HTMLAttributes<HTMLSpanElement>,
  "children"
> {
  children?: ReactNode | ((details: ProgressValueDetails) => ReactNode);
  "data-slot"?: string;
  asChild?: boolean;
}

export const ProgressValue = forwardRef<HTMLSpanElement, ProgressValueProps>(
  function ProgressValue(
    { children, className, "data-slot": dataSlot, ...props },
    ref,
  ) {
    const state = useProgressContext();
    const { formatOptions, locale, valueFormat } = useProgressVisualContext();
    const formattedValue =
      state.percent === null
        ? ""
        : new Intl.NumberFormat(locale, {
            maximumFractionDigits: 0,
            style: valueFormat === "percent" ? "percent" : "decimal",
            ...formatOptions,
          }).format(valueFormat === "percent" ? state.percent / 100 : state.value!);
    const details: ProgressValueDetails = {
      formattedValue,
      max: state.max,
      min: state.min,
      percent: state.percent,
      state: state.dataState,
      value: state.value,
    };
    const content =
      typeof children === "function" ? children(details) : children ?? formattedValue;

    return staticPart("span", { ...props, className, children: content, "aria-hidden": true, "data-slot": dataSlot } as StaticPartProps,
      ref as Ref<HTMLElement>, "brick-progress__value", "progress-value");
  },
);

export interface ProgressTrackProps extends HTMLAttributes<HTMLDivElement> {
  "data-slot"?: string;
  asChild?: boolean;
}

export const ProgressTrack = forwardRef<HTMLDivElement, ProgressTrackProps>(
  function ProgressTrack({ className, "data-slot": dataSlot, ...props }, ref) {
    return staticPart("div", { ...props, className, "aria-hidden": true, "data-slot": dataSlot } as StaticPartProps,
      ref as Ref<HTMLElement>, "brick-progress__track", "progress-track");
  },
);

export interface ProgressBufferProps extends HTMLAttributes<HTMLDivElement> {
  "data-slot"?: string;
  asChild?: boolean;
}

export const ProgressBuffer = forwardRef<HTMLDivElement, ProgressBufferProps>(
  function ProgressBuffer({ className, style, "data-slot": dataSlot, ...props }, ref) {
    const { bufferPercent } = useProgressVisualContext();
    const resolvedStyle = {
      ...style,
      "--brick-progress-buffer-percent": bufferPercent ?? 0,
    } as CSSProperties;
    return staticPart("div", { ...props, className, "aria-hidden": true, "data-slot": dataSlot,
      "data-present": bufferPercent === null ? undefined : "", style: resolvedStyle } as StaticPartProps,
      ref as Ref<HTMLElement>, "brick-progress__buffer", "progress-buffer");
  },
);

export type ProgressIndicatorProps = AtomProgressIndicatorProps;

export const ProgressIndicator = forwardRef<
  HTMLDivElement,
  ProgressIndicatorProps
>(function ProgressIndicator(
  { className, style, "data-slot": dataSlot, ...props },
  ref,
) {
  const state = useProgressContext();
  const resolvedStyle = {
    ...style,
    "--brick-progress-percent": state.percent ?? 0,
  } as CSSProperties;
  return (
    <AtomProgress.Indicator
      {...props}
      className={mergeClassName("brick-progress__indicator", className)}
      data-slot={dataSlot ?? "progress-indicator"}
      ref={ref}
      style={resolvedStyle}
    />
  );
});

ProgressRoot.displayName = "Progress.Root";
ProgressRootProvider.displayName = "Progress.RootProvider";
ProgressLabel.displayName = "Progress.Label";
ProgressValue.displayName = "Progress.Value";
ProgressTrack.displayName = "Progress.Track";
ProgressBuffer.displayName = "Progress.Buffer";
ProgressIndicator.displayName = "Progress.Indicator";

export const Progress = Object.freeze({
  Root: ProgressRoot,
  RootProvider: ProgressRootProvider,
  Context: ProgressContext,
  Label: ProgressLabel,
  Value: ProgressValue,
  Track: ProgressTrack,
  Buffer: ProgressBuffer,
  Indicator: ProgressIndicator,
});

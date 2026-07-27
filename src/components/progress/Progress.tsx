import {
  createContext,
  forwardRef,
  useContext,
  useId,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import {
  Progress as AtomProgress,
  getProgressState,
  useProgressContext,
  type ProgressIndicatorProps as AtomProgressIndicatorProps,
  type ProgressRootProps as AtomProgressRootProps,
} from "@flowstack-ui/atom/progress";

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

export interface ProgressRootProps extends Omit<
  AtomProgressRootProps,
  "className" | "style"
> {
  orientation?: ProgressOrientation;
  size?: ProgressSize;
  shape?: ProgressShape;
  tone?: ProgressTone;
  bufferValue?: number | null;
  locale?: Intl.LocalesArgument;
  formatOptions?: ProgressFormatOptions;
  className?: string;
  style?: CSSProperties;
}

export const ProgressRoot = forwardRef<HTMLDivElement, ProgressRootProps>(
  function ProgressRoot(
    {
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      bufferValue,
      children,
      className,
      formatOptions,
      locale,
      max = 100,
      min = 0,
      orientation = "horizontal",
      shape = "rounded",
      size = "md",
      style,
      tone = "accent",
      value,
      "data-slot": dataSlot,
      ...props
    },
    ref,
  ) {
    const generatedId = useId();
    const labelId = `${generatedId}-label`;
    const bufferState =
      bufferValue === null || bufferValue === undefined
        ? null
        : getProgressState({ value: bufferValue, min, max });

    return (
      <ProgressVisualContext.Provider
        value={{
          bufferPercent: bufferState?.percent ?? null,
          formatOptions,
          labelId,
          locale,
        }}
      >
        <AtomProgress.Root
          {...props}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy ?? (ariaLabel ? undefined : labelId)}
          className={mergeClassName("brick-progress", className)}
          data-orientation={orientation}
          data-shape={shape}
          data-size={size}
          data-slot={dataSlot ?? "progress"}
          data-tone={tone}
          max={max}
          min={min}
          ref={ref}
          style={style}
          value={value}
        >
          {children}
        </AtomProgress.Root>
      </ProgressVisualContext.Provider>
    );
  },
);

export interface ProgressLabelProps extends Omit<
  HTMLAttributes<HTMLSpanElement>,
  "id"
> {
  "data-slot"?: string;
}

export const ProgressLabel = forwardRef<HTMLSpanElement, ProgressLabelProps>(
  function ProgressLabel({ className, "data-slot": dataSlot, ...props }, ref) {
    const { labelId } = useProgressVisualContext();
    return (
      <span
        {...props}
        className={mergeClassName("brick-progress__label", className)}
        data-slot={dataSlot ?? "progress-label"}
        id={labelId}
        ref={ref}
      />
    );
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
}

export const ProgressValue = forwardRef<HTMLSpanElement, ProgressValueProps>(
  function ProgressValue(
    { children, className, "data-slot": dataSlot, ...props },
    ref,
  ) {
    const state = useProgressContext();
    const { formatOptions, locale } = useProgressVisualContext();
    const formattedValue =
      state.percent === null
        ? ""
        : new Intl.NumberFormat(locale, {
            maximumFractionDigits: 0,
            style: "percent",
            ...formatOptions,
          }).format(state.percent / 100);
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

    return (
      <span
        {...props}
        aria-hidden="true"
        className={mergeClassName("brick-progress__value", className)}
        data-slot={dataSlot ?? "progress-value"}
        ref={ref}
      >
        {content}
      </span>
    );
  },
);

export interface ProgressTrackProps extends HTMLAttributes<HTMLDivElement> {
  "data-slot"?: string;
}

export const ProgressTrack = forwardRef<HTMLDivElement, ProgressTrackProps>(
  function ProgressTrack({ className, "data-slot": dataSlot, ...props }, ref) {
    return (
      <div
        {...props}
        aria-hidden="true"
        className={mergeClassName("brick-progress__track", className)}
        data-slot={dataSlot ?? "progress-track"}
        ref={ref}
      />
    );
  },
);

export interface ProgressBufferProps extends HTMLAttributes<HTMLDivElement> {
  "data-slot"?: string;
}

export const ProgressBuffer = forwardRef<HTMLDivElement, ProgressBufferProps>(
  function ProgressBuffer({ className, style, "data-slot": dataSlot, ...props }, ref) {
    const { bufferPercent } = useProgressVisualContext();
    const resolvedStyle = {
      ...style,
      "--brick-progress-buffer-percent": bufferPercent ?? 0,
    } as CSSProperties;
    return (
      <div
        {...props}
        aria-hidden="true"
        className={mergeClassName("brick-progress__buffer", className)}
        data-present={bufferPercent === null ? undefined : ""}
        data-slot={dataSlot ?? "progress-buffer"}
        ref={ref}
        style={resolvedStyle}
      />
    );
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
ProgressLabel.displayName = "Progress.Label";
ProgressValue.displayName = "Progress.Value";
ProgressTrack.displayName = "Progress.Track";
ProgressBuffer.displayName = "Progress.Buffer";
ProgressIndicator.displayName = "Progress.Indicator";

export const Progress = Object.freeze({
  Root: ProgressRoot,
  Label: ProgressLabel,
  Value: ProgressValue,
  Track: ProgressTrack,
  Buffer: ProgressBuffer,
  Indicator: ProgressIndicator,
});

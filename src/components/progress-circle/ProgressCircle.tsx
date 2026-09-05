import {
  createContext,
  forwardRef,
  useContext,
  useId,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
  type SVGProps,
} from "react";
import {
  Progress as AtomProgress,
  useProgressContext,
  type ProgressRootProps as AtomProgressRootProps,
} from "@flowstack-ui/atom/progress";
import { useLocaleContext } from "../locale-provider/LocaleProvider.js";

export type ProgressCircleSize = "xs" | "sm" | "md" | "lg" | "xl";
export type ProgressCircleThickness = "thin" | "regular" | "thick";
export type ProgressCircleCap = "round" | "butt";
export type ProgressCircleTone =
  | "neutral"
  | "accent"
  | "info"
  | "success"
  | "warning"
  | "danger";

interface ProgressCircleVisualContextValue {
  formatOptions?: Intl.NumberFormatOptions;
  labelId: string;
  locale?: Intl.LocalesArgument;
}

const ProgressCircleVisualContext =
  createContext<ProgressCircleVisualContextValue | null>(null);

const PROGRESS_CIRCLE_RADIUS = 45;
const PROGRESS_CIRCLE_CIRCUMFERENCE = 2 * Math.PI * PROGRESS_CIRCLE_RADIUS;

function useProgressCircleVisualContext() {
  const context = useContext(ProgressCircleVisualContext);
  if (!context) {
    throw new Error(
      "Brick ProgressCircle parts must be used within <ProgressCircle.Root>.",
    );
  }
  return context;
}

function mergeClassName(base: string, className?: string) {
  return className ? `${base} ${className}` : base;
}

export interface ProgressCircleRootProps extends Omit<
  AtomProgressRootProps,
  "className" | "style"
> {
  size?: ProgressCircleSize;
  thickness?: ProgressCircleThickness;
  cap?: ProgressCircleCap;
  tone?: ProgressCircleTone;
  locale?: Intl.LocalesArgument;
  formatOptions?: Intl.NumberFormatOptions;
  className?: string;
  style?: CSSProperties;
}

export const ProgressCircleRoot = forwardRef<
  HTMLDivElement,
  ProgressCircleRootProps
>(function ProgressCircleRoot(
  {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    cap = "round",
    children,
    className,
    formatOptions,
    locale,
    size = "md",
    style,
    thickness = "regular",
    tone = "accent",
    "data-slot": dataSlot,
    ...props
  },
  ref,
) {
  const localeContext = useLocaleContext();
  const generatedId = useId();
  const labelId = `${generatedId}-label`;
  return (
    <ProgressCircleVisualContext.Provider value={{ formatOptions, labelId, locale: locale ?? localeContext.locale }}>
      <AtomProgress.Root
        {...props}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy ?? (ariaLabel ? undefined : labelId)}
        className={mergeClassName("brick-progress-circle", className)}
        data-cap={cap}
        data-size={size}
        data-slot={dataSlot ?? "progress-circle"}
        data-thickness={thickness}
        data-tone={tone}
        ref={ref}
        style={style}
      >
        {children}
      </AtomProgress.Root>
    </ProgressCircleVisualContext.Provider>
  );
});

export interface ProgressCircleCircleProps extends Omit<
  SVGProps<SVGSVGElement>,
  "children" | "viewBox"
> {
  children?: ReactNode;
  "data-slot"?: string;
}

export const ProgressCircleCircle = forwardRef<
  SVGSVGElement,
  ProgressCircleCircleProps
>(function ProgressCircleCircle(
  { children, className, "data-slot": dataSlot, ...props },
  ref,
) {
  return (
    <svg
      {...props}
      aria-hidden="true"
      className={mergeClassName("brick-progress-circle__circle", className)}
      data-slot={dataSlot ?? "progress-circle-circle"}
      focusable="false"
      ref={ref}
      viewBox="0 0 100 100"
    >
      {children}
    </svg>
  );
});

export interface ProgressCircleTrackProps extends Omit<
  SVGProps<SVGCircleElement>,
  "cx" | "cy" | "r"
> {
  "data-slot"?: string;
}

export const ProgressCircleTrack = forwardRef<
  SVGCircleElement,
  ProgressCircleTrackProps
>(function ProgressCircleTrack(
  { className, "data-slot": dataSlot, ...props },
  ref,
) {
  return (
    <circle
      {...props}
      className={mergeClassName("brick-progress-circle__track", className)}
      cx="50"
      cy="50"
      data-slot={dataSlot ?? "progress-circle-track"}
      r={PROGRESS_CIRCLE_RADIUS}
      ref={ref}
    />
  );
});

export interface ProgressCircleIndicatorProps extends Omit<
  SVGProps<SVGCircleElement>,
  "cx" | "cy" | "r" | "pathLength" | "strokeDasharray" | "strokeDashoffset"
> {
  "data-slot"?: string;
}

export const ProgressCircleIndicator = forwardRef<
  SVGCircleElement,
  ProgressCircleIndicatorProps
>(function ProgressCircleIndicator(
  { className, style, "data-slot": dataSlot, ...props },
  ref,
) {
  const state = useProgressContext();
  return (
    <circle
      {...props}
      aria-hidden="true"
      className={mergeClassName("brick-progress-circle__indicator", className)}
      cx="50"
      cy="50"
      data-max={state.max}
      data-min={state.min}
      data-percent={state.percent ?? undefined}
      data-slot={dataSlot ?? "progress-circle-indicator"}
      data-state={state.dataState}
      data-value={state.value ?? undefined}
      r={PROGRESS_CIRCLE_RADIUS}
      ref={ref}
      strokeDasharray={`${PROGRESS_CIRCLE_CIRCUMFERENCE} ${PROGRESS_CIRCLE_CIRCUMFERENCE}`}
      strokeDashoffset={
        state.percent === null
          ? 0
          : PROGRESS_CIRCLE_CIRCUMFERENCE * (1 - state.percent / 100)
      }
      style={style}
    />
  );
});

export interface ProgressCircleLabelProps extends Omit<
  HTMLAttributes<HTMLSpanElement>,
  "id"
> {
  "data-slot"?: string;
}

export const ProgressCircleLabel = forwardRef<
  HTMLSpanElement,
  ProgressCircleLabelProps
>(function ProgressCircleLabel(
  { className, "data-slot": dataSlot, ...props },
  ref,
) {
  const { labelId } = useProgressCircleVisualContext();
  return (
    <span
      {...props}
      className={mergeClassName("brick-progress-circle__label", className)}
      data-slot={dataSlot ?? "progress-circle-label"}
      id={labelId}
      ref={ref}
    />
  );
});

export interface ProgressCircleValueDetails {
  formattedValue: string;
  max: number;
  min: number;
  percent: number | null;
  state: "loading" | "complete" | "indeterminate";
  value: number | null;
}

export interface ProgressCircleValueProps extends Omit<
  HTMLAttributes<HTMLSpanElement>,
  "children"
> {
  children?: ReactNode | ((details: ProgressCircleValueDetails) => ReactNode);
  "data-slot"?: string;
}

export const ProgressCircleValue = forwardRef<
  HTMLSpanElement,
  ProgressCircleValueProps
>(function ProgressCircleValue(
  { children, className, "data-slot": dataSlot, ...props },
  ref,
) {
  const state = useProgressContext();
  const { formatOptions, locale } = useProgressCircleVisualContext();
  const formattedValue =
    state.percent === null
      ? ""
      : new Intl.NumberFormat(locale, {
          maximumFractionDigits: 0,
          style: "percent",
          ...formatOptions,
        }).format(state.percent / 100);
  const details: ProgressCircleValueDetails = {
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
      className={mergeClassName("brick-progress-circle__value", className)}
      data-slot={dataSlot ?? "progress-circle-value"}
      ref={ref}
    >
      {content}
    </span>
  );
});

ProgressCircleRoot.displayName = "ProgressCircle.Root";
ProgressCircleCircle.displayName = "ProgressCircle.Circle";
ProgressCircleTrack.displayName = "ProgressCircle.Track";
ProgressCircleIndicator.displayName = "ProgressCircle.Indicator";
ProgressCircleLabel.displayName = "ProgressCircle.Label";
ProgressCircleValue.displayName = "ProgressCircle.Value";

export const ProgressCircle = Object.freeze({
  Root: ProgressCircleRoot,
  Circle: ProgressCircleCircle,
  Track: ProgressCircleTrack,
  Indicator: ProgressCircleIndicator,
  Label: ProgressCircleLabel,
  Value: ProgressCircleValue,
});

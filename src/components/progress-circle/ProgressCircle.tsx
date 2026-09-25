import {
  createContext,
  forwardRef,
  useContext,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
  type SVGProps,
  type Ref,
} from "react";
import {
  Progress as AtomProgress,
  useProgressContext,
  useProgress,
  type ProgressController,
  type UseProgressProps,
  type ProgressRootProps as AtomProgressRootProps,
} from "@flowstack-ui/atom/progress";
import { useLocaleContext } from "../locale-provider/LocaleProvider.js";
import { responsiveDataAttributes, type ResponsiveValue } from "../_responsive-value/ResponsiveValue.js";
import { staticPart, type StaticPartProps } from "../_internal/StaticPart.js";
import { layoutHost } from "../_internal/layout-host.js";
export type ProgressCircleValueFormat = "percent" | "value";

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
  valueFormat: ProgressCircleValueFormat;
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
  size?: ResponsiveValue<ProgressCircleSize>;
  valueFormat?: ProgressCircleValueFormat;
  thickness?: ProgressCircleThickness;
  cap?: ProgressCircleCap;
  tone?: ProgressCircleTone;
  locale?: Intl.LocalesArgument;
  formatOptions?: Intl.NumberFormatOptions;
  className?: string;
  style?: CSSProperties;
}

export type ProgressCircleRootProviderProps = Omit<ProgressCircleRootProps, keyof UseProgressProps> & { value: ProgressController };

export const ProgressCircleRootProvider = forwardRef<
  HTMLDivElement,
  ProgressCircleRootProviderProps
>(function ProgressCircleRootProvider(
  {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    cap = "round",
    children,
    className,
    formatOptions,
    valueFormat = "percent",
    value,
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
  const labelId = value.ids.label;
  return (
    <ProgressCircleVisualContext.Provider value={{ formatOptions, valueFormat, labelId, locale: locale ?? localeContext.locale }}>
      <AtomProgress.RootProvider
        {...props}
        value={value}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy ?? (ariaLabel ? undefined : labelId)}
        className={mergeClassName("brick-progress-circle", className)}
        data-cap={cap}
        {...responsiveDataAttributes("data-size", size, { defaultValue: "md", alwaysInitial: true })}
        data-slot={dataSlot ?? "progress-circle"}
        data-thickness={thickness}
        data-tone={tone}
        ref={ref}
        style={style}
      >
        {children}
      </AtomProgress.RootProvider>
    </ProgressCircleVisualContext.Provider>
  );
});

export const ProgressCircleRoot = forwardRef<HTMLDivElement, ProgressCircleRootProps>(function ProgressCircleRoot(
  { value, defaultValue, onValueChange, ids, min, max, ...props }, ref,
) {
  const controller = useProgress({ value, defaultValue, onValueChange, ids, min, max });
  return <ProgressCircleRootProvider {...props} value={controller} ref={ref} />;
});
export const ProgressCircleContext = AtomProgress.Context;

export interface ProgressCircleCircleProps extends Omit<
  SVGProps<SVGSVGElement>,
  "children" | "viewBox"
> {
  children?: ReactNode;
  "data-slot"?: string;
  asChild?: boolean;
}

export const ProgressCircleCircle = forwardRef<
  SVGSVGElement,
  ProgressCircleCircleProps
>(function ProgressCircleCircle(
  { children, className, asChild, "data-slot": dataSlot, ...props },
  ref,
) {
  if (asChild) return layoutHost(children, { ...props, "aria-hidden": true, className: mergeClassName("brick-progress-circle__circle", className), "data-slot": dataSlot ?? "progress-circle-circle", focusable: "false", viewBox: "0 0 100 100" }, ref as unknown as Ref<HTMLElement>, "ProgressCircle.Circle");
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
  asChild?: boolean;
}

export const ProgressCircleTrack = forwardRef<
  SVGCircleElement,
  ProgressCircleTrackProps
>(function ProgressCircleTrack(
  { className, asChild, children, "data-slot": dataSlot, ...props },
  ref,
) {
  if (asChild) return layoutHost(children, { ...props, "aria-hidden": true, className: mergeClassName("brick-progress-circle__track", className), "data-slot": dataSlot ?? "progress-circle-track", cx: 50, cy: 50, r: PROGRESS_CIRCLE_RADIUS }, ref as unknown as Ref<HTMLElement>, "ProgressCircle.Track");
  return (
    <circle
      {...props}
      aria-hidden="true"
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
  asChild?: boolean;
}

export const ProgressCircleIndicator = forwardRef<
  SVGCircleElement,
  ProgressCircleIndicatorProps
>(function ProgressCircleIndicator(
  { className, style, asChild, children, "data-slot": dataSlot, ...props },
  ref,
) {
  const state = useProgressContext();
  const resolvedStyle = { ...style, "--brick-progress-circle-percent": state.percent ?? 0 } as CSSProperties;
  if (asChild) return layoutHost(children, { ...props, "aria-hidden": true,
    className: mergeClassName("brick-progress-circle__indicator", className), "data-slot": dataSlot ?? "progress-circle-indicator",
    "data-state": state.dataState, "data-percent": state.percent ?? undefined, "data-min": state.min, "data-max": state.max, "data-value": state.value ?? undefined,
    cx: 50, cy: 50, r: PROGRESS_CIRCLE_RADIUS, strokeDasharray: `${PROGRESS_CIRCLE_CIRCUMFERENCE} ${PROGRESS_CIRCLE_CIRCUMFERENCE}`,
    strokeDashoffset: state.percent === null ? 0 : PROGRESS_CIRCLE_CIRCUMFERENCE * (1 - state.percent / 100), style: resolvedStyle,
  }, ref as unknown as Ref<HTMLElement>, "ProgressCircle.Indicator");
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
      style={resolvedStyle}
    />
  );
});

export interface ProgressCircleLabelProps extends Omit<
  HTMLAttributes<HTMLSpanElement>,
  "id"
> {
  "data-slot"?: string;
  asChild?: boolean;
}

export const ProgressCircleLabel = forwardRef<
  HTMLSpanElement,
  ProgressCircleLabelProps
>(function ProgressCircleLabel(
  { className, "data-slot": dataSlot, ...props },
  ref,
) {
  const { labelId } = useProgressCircleVisualContext();
  return staticPart("span", { ...props, className, id: labelId, "data-slot": dataSlot } as StaticPartProps,
    ref as Ref<HTMLElement>, "brick-progress-circle__label", "progress-circle-label");
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
  asChild?: boolean;
}

export const ProgressCircleValue = forwardRef<
  HTMLSpanElement,
  ProgressCircleValueProps
>(function ProgressCircleValue(
  { children, className, "data-slot": dataSlot, ...props },
  ref,
) {
  const state = useProgressContext();
  const { formatOptions, locale, valueFormat } = useProgressCircleVisualContext();
  const formattedValue =
    state.percent === null
      ? ""
      : new Intl.NumberFormat(locale, {
          maximumFractionDigits: 0,
          style: valueFormat === "percent" ? "percent" : "decimal",
          ...formatOptions,
        }).format(valueFormat === "percent" ? state.percent / 100 : state.value!);
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
  return staticPart("span", { ...props, className, children: content, "aria-hidden": true, "data-slot": dataSlot } as StaticPartProps,
    ref as Ref<HTMLElement>, "brick-progress-circle__value", "progress-circle-value");
});

ProgressCircleRoot.displayName = "ProgressCircle.Root";
ProgressCircleRootProvider.displayName = "ProgressCircle.RootProvider";
ProgressCircleCircle.displayName = "ProgressCircle.Circle";
ProgressCircleTrack.displayName = "ProgressCircle.Track";
ProgressCircleIndicator.displayName = "ProgressCircle.Indicator";
ProgressCircleLabel.displayName = "ProgressCircle.Label";
ProgressCircleValue.displayName = "ProgressCircle.Value";

export const ProgressCircle = Object.freeze({
  Root: ProgressCircleRoot,
  RootProvider: ProgressCircleRootProvider,
  Context: ProgressCircleContext,
  Circle: ProgressCircleCircle,
  Track: ProgressCircleTrack,
  Indicator: ProgressCircleIndicator,
  Label: ProgressCircleLabel,
  Value: ProgressCircleValue,
});

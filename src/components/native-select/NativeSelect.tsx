"use client";
import { fieldVariantAttributes, type FieldVariant, type ResponsiveFieldVariant } from "../_field-variant/FieldVariant.js";
import { radiusStyle, type RadiusShapeProps } from "../_radius/Radius.js";
import { layoutHost } from "../_internal/layout-host.js";

import {
  createContext,
  createElement,
  forwardRef,
  useContext,
  useMemo,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react";
import {
  NativeSelect as AtomNativeSelect,
  type NativeSelectRootProps as AtomProps,
} from "@flowstack-ui/atom/native-select";
import {
  controlSizeDataAttributes,
  type ResponsiveControlSize,
} from "../_control-size/ControlSize.js";

export type NativeSelectVariant = "outline" | "surface" | "soft" | "subtle" | "ghost" | "plain" | "underline";
export type NativeSelectShape = "sharp" | "rounded" | "pill";
interface NativeSelectState {
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  multiple?: boolean;
  rows?: number;
}
type RootBase = Omit<HTMLAttributes<HTMLElement>, "color" | "children"> &
  NativeSelectState & {
    size?: ResponsiveControlSize;
    fullWidth?: boolean;
    "data-slot"?: string;
  };
export type NativeSelectRootProps = RootBase &
  ({ asChild?: false; children?: ReactNode } | { asChild: true; children: ReactElement }) &
  (
    | (RadiusShapeProps<NativeSelectShape> & {
        variant?: Exclude<NativeSelectVariant, "underline">;
      })
    | { variant: ResponsiveFieldVariant; shape?: never; radius?: never }
  );
export type NativeSelectFieldProps = Omit<AtomProps, "size" | "multiple">;
export type NativeSelectIndicatorProps = HTMLAttributes<HTMLSpanElement> & {
  "data-slot"?: string;
};
const Context = createContext<NativeSelectState | null>(null);
Context.displayName = "NativeSelect";
function useNativeSelect() {
  const context = useContext(Context);
  if (!context) throw new Error("NativeSelect parts require NativeSelect.Root");
  return context;
}
const cn = (base: string, extra?: string) =>
  extra ? `${base} ${extra}` : base;

export const NativeSelectRoot = forwardRef<
  HTMLElement,
  NativeSelectRootProps
>(function NativeSelectRoot(
  {
    size = "lg",
    asChild = false,
    variant = "outline",
    shape = "rounded",
    radius,
    style,
    fullWidth = true,
    disabled,
    invalid,
    required,
    multiple = false,
    rows,
    className,
    children,
    "data-slot": slot = "native-select",
    ...props
  },
  ref,
) {
  const count =
    rows === undefined
      ? undefined
      : Math.max(1, Math.floor(Number.isFinite(rows) ? rows : 1));
  const value = useMemo(
    () => ({ disabled, invalid, required, multiple, rows: count }),
    [disabled, invalid, required, multiple, count],
  );
  const rootProps = {
    ...props,
    className: cn("brick-native-select brick-control-size", className),
    "data-slot": slot,
    ...fieldVariantAttributes(variant),
    "data-shape": variant === "underline" ? undefined : radius === undefined ? shape : "rounded",
    style: radiusStyle(variant === "underline" ? undefined : radius, "--brick-native-select-radius", style),
    "data-full-width": fullWidth ? "" : undefined,
    "data-list": multiple || (count ?? 0) > 1 ? "" : undefined,
    ...controlSizeDataAttributes(size),
  };
  return (
    <Context.Provider value={value}>
      {asChild ? layoutHost(children, rootProps, ref, "NativeSelect.Root") : createElement("div", { ...rootProps, ref }, children)}
    </Context.Provider>
  );
});
export const NativeSelectField = forwardRef<
  HTMLSelectElement,
  NativeSelectFieldProps
>(function NativeSelectField(
  { className, "data-slot": slot = "native-select-field", ...props },
  ref,
) {
  const { rows, ...state } = useNativeSelect();
  return (
    <AtomNativeSelect.Root
      {...state}
      {...props}
      size={rows}
      ref={ref}
      className={cn("brick-native-select-field", className)}
      data-slot={slot}
    />
  );
});
export const NativeSelectIndicator = forwardRef<
  HTMLSpanElement,
  NativeSelectIndicatorProps
>(function NativeSelectIndicator(
  {
    className,
    children,
    "data-slot": slot = "native-select-indicator",
    ...props
  },
  ref,
) {
  const { multiple, rows } = useNativeSelect();
  if (multiple || (rows ?? 0) > 1) return null;
  return (
    <span
      {...props}
      ref={ref}
      aria-hidden="true"
      data-slot={slot}
      className={cn("brick-native-select-indicator", className)}
    >
      {children ?? (
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="m4 6 4 4 4-4" />
        </svg>
      )}
    </span>
  );
});
export const NativeSelect = {
  Root: NativeSelectRoot,
  Field: NativeSelectField,
  Indicator: NativeSelectIndicator,
} as const;

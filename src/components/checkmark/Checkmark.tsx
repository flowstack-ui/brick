import { forwardRef, type SVGAttributes } from "react";
import {
  responsiveDataAttributes,
  type ResponsiveValue,
} from "../_responsive-value/ResponsiveValue.js";
import { radiusStyle, type Radius } from "../_radius/Radius.js";

export type CheckmarkSize = "xs" | "sm" | "md" | "lg";
export type CheckmarkTone =
  | "neutral"
  | "accent"
  | "contrast"
  | "info"
  | "success"
  | "warning"
  | "danger";
export type CheckmarkVariant =
  | "solid"
  | "outline"
  | "soft"
  | "subtle"
  | "plain"
  | "inverted";

export interface CheckmarkProps
  extends Omit<SVGAttributes<SVGSVGElement>, "children" | "color"> {
  "data-slot"?: string;
  checked?: boolean;
  filled?: boolean;
  disabled?: boolean;
  /** Visual validation state only; the parent owns semantics. */
  invalid?: boolean;
  indeterminate?: boolean;
  size?: ResponsiveValue<CheckmarkSize>;
  radius?: Radius;
  tone?: CheckmarkTone;
  variant?: ResponsiveValue<CheckmarkVariant>;
}

function mergeClassName(base: string, className?: string) {
  return className ? `${base} ${className}` : base;
}

export const Checkmark = forwardRef<SVGSVGElement, CheckmarkProps>(
  function Checkmark(
    {
      checked = false,
      filled = false,
      className,
      disabled = false,
      invalid = false,
      indeterminate = false,
      size = "md",
      tone = "accent",
      variant = "solid",
      radius,
      style,
      "data-slot": dataSlot,
      ...props
    },
    ref,
  ) {
    const state = indeterminate
      ? "indeterminate"
      : checked
        ? "checked"
        : "unchecked";
    return (
      <svg
        {...props}
        aria-hidden="true"
        className={mergeClassName("brick-checkmark", className)}
        data-disabled={disabled ? "" : undefined}
        data-invalid={invalid ? "" : undefined}
        data-filled={filled ? "" : undefined}
        {...responsiveDataAttributes("data-size", size, {
          alwaysInitial: true,
          defaultValue: "md",
        })}
        style={radiusStyle(radius, "--brick-checkmark-radius", style)}
        data-slot={dataSlot ?? "checkmark"}
        data-state={state}
        data-tone={tone}
        {...responsiveDataAttributes("data-variant", variant, {
          alwaysInitial: true,
          defaultValue: "solid",
        })}
        focusable="false"
        ref={ref}
        viewBox="0 0 16 16"
      >
        {indeterminate ? (
          <path d="M3.5 8h9" />
        ) : checked ? (
          <path d="m3.25 8.1 3.05 3.05 6.45-6.45" />
        ) : null}
      </svg>
    );
  },
);
Checkmark.displayName = "Checkmark";

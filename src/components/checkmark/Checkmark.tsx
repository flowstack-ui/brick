import { forwardRef, type SVGAttributes } from "react";

export type CheckmarkSize = "xs" | "sm" | "md" | "lg";
export type CheckmarkTone =
  | "neutral" | "accent" | "info" | "success" | "warning" | "danger";
export type CheckmarkVariant = "solid" | "outline" | "soft" | "plain";

export interface CheckmarkProps extends Omit<
  SVGAttributes<SVGSVGElement>,
  "children" | "color"
> {
  "data-slot"?: string;
  checked?: boolean;
  disabled?: boolean;
  indeterminate?: boolean;
  size?: CheckmarkSize;
  tone?: CheckmarkTone;
  variant?: CheckmarkVariant;
}

function mergeClassName(base: string, className?: string) {
  return className ? `${base} ${className}` : base;
}

export const Checkmark = forwardRef<SVGSVGElement, CheckmarkProps>(
  function Checkmark(
    {
      checked = false,
      className,
      disabled = false,
      indeterminate = false,
      size = "md",
      tone = "accent",
      variant = "solid",
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
        data-size={size}
        data-slot={dataSlot ?? "checkmark"}
        data-state={state}
        data-tone={tone}
        data-variant={variant}
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

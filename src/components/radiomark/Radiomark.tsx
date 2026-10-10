import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import {
  responsiveDataAttributes,
  type ResponsiveValue,
} from "../_responsive-value/ResponsiveValue.js";

export type RadiomarkSize = "xs" | "sm" | "md" | "lg";
export type RadiomarkTone =
  | "neutral"
  | "accent"
  | "contrast"
  | "info"
  | "success"
  | "warning"
  | "danger";
export type RadiomarkVariant =
  | "solid"
  | "outline"
  | "soft"
  | "subtle"
  | "inverted";

export interface RadiomarkProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, "children" | "color"> {
  "data-slot"?: string;
  checked?: boolean;
  filled?: boolean;
  disabled?: boolean;
  /** Visual validation state only; the parent owns semantics. */
  invalid?: boolean;
  size?: ResponsiveValue<RadiomarkSize>;
  tone?: RadiomarkTone;
  variant?: ResponsiveValue<RadiomarkVariant>;
  /** Decorative replacement artwork; omitted renders one dot. */
  children?: ReactNode;
}

function mergeClassName(base: string, className?: string) {
  return className ? `${base} ${className}` : base;
}

export const Radiomark = forwardRef<HTMLSpanElement, RadiomarkProps>(
  function Radiomark(
    {
      checked = false,
      filled = false,
      className,
      disabled = false,
      invalid = false,
      size = "md",
      tone = "accent",
      variant = "solid",
      children,
      "data-slot": dataSlot,
      ...props
    },
    ref,
  ) {
    return (
      <span
        {...props}
        aria-hidden="true"
        className={mergeClassName("brick-radiomark", className)}
        data-disabled={disabled ? "" : undefined}
        data-invalid={invalid ? "" : undefined}
        data-filled={filled ? "" : undefined}
        {...responsiveDataAttributes("data-size", size, {
          defaultValue: "md",
          alwaysInitial: true,
        })}
        data-slot={dataSlot ?? "radiomark"}
        data-state={checked ? "checked" : "unchecked"}
        data-tone={tone}
        {...responsiveDataAttributes("data-variant", variant, {
          defaultValue: "solid",
          alwaysInitial: true,
        })}
        ref={ref}
      >
        {children === undefined ? (
          <span className="brick-radiomark__dot" data-slot="radiomark-dot" />
        ) : (
          <span className="brick-radiomark__artwork">{children}</span>
        )}
      </span>
    );
  },
);
Radiomark.displayName = "Radiomark";

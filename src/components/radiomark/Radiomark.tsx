import { forwardRef, type HTMLAttributes } from "react";

export type RadiomarkSize = "xs" | "sm" | "md" | "lg";
export type RadiomarkTone =
  | "neutral" | "accent" | "info" | "success" | "warning" | "danger";
export type RadiomarkVariant = "solid" | "outline" | "soft";

export interface RadiomarkProps extends Omit<
  HTMLAttributes<HTMLSpanElement>,
  "children" | "color"
> {
  "data-slot"?: string;
  checked?: boolean;
  disabled?: boolean;
  size?: RadiomarkSize;
  tone?: RadiomarkTone;
  variant?: RadiomarkVariant;
}

function mergeClassName(base: string, className?: string) {
  return className ? `${base} ${className}` : base;
}

export const Radiomark = forwardRef<HTMLSpanElement, RadiomarkProps>(
  function Radiomark(
    {
      checked = false,
      className,
      disabled = false,
      size = "md",
      tone = "accent",
      variant = "solid",
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
        data-size={size}
        data-slot={dataSlot ?? "radiomark"}
        data-state={checked ? "checked" : "unchecked"}
        data-tone={tone}
        data-variant={variant}
        ref={ref}
      >
        <span className="brick-radiomark__dot" data-slot="radiomark-dot" />
      </span>
    );
  },
);
Radiomark.displayName = "Radiomark";

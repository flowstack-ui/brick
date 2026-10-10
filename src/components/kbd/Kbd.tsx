import { forwardRef, type CSSProperties, type HTMLAttributes, type ReactNode, type ReactElement } from "react";
import { staticPart } from "../_internal/StaticPart.js";

export type KbdVariant = "raised" | "outline" | "subtle" | "plain";
export type KbdSize = "sm" | "md" | "lg";
export type KbdTone = "neutral" | "accent" | "info" | "success" | "warning" | "danger";

interface KbdCommonProps extends Omit<HTMLAttributes<HTMLElement>, "children" | "className" | "style" | "color"> {
  variant?: KbdVariant;
  size?: KbdSize;
  tone?: KbdTone;
  className?: string;
  style?: CSSProperties;
  slot?: string;
}
export type KbdProps = KbdCommonProps & (
  | { asChild?: false; children: ReactNode }
  | { asChild: true; children: ReactElement }
);

const classes = (className?: string) => className ? `brick-kbd ${className}` : "brick-kbd";

export const Kbd = forwardRef<HTMLElement, KbdProps>(function Kbd(
  { children, variant = "raised", size = "md", tone = "neutral", asChild = false, className, slot = "kbd", ...props },
  ref,
) {
  if (asChild) return staticPart("kbd", {
    ...props, asChild: true, children: children as ReactElement, className,
    "data-size": size, "data-tone": tone, "data-slot": slot, "data-variant": variant,
  }, ref, "brick-kbd", slot);
  return <kbd {...props} className={classes(className)} data-size={size} data-tone={tone} data-slot={slot} data-variant={variant} ref={ref}>{children}</kbd>;
});

Kbd.displayName = "Kbd";

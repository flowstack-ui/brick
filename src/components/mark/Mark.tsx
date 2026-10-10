import { forwardRef, type CSSProperties, type HTMLAttributes, type ReactNode, type ReactElement } from "react";
import { staticPart } from "../_internal/StaticPart.js";

export type MarkVariant = "subtle" | "solid" | "text" | "plain";
export type MarkTone = "accent" | "neutral" | "info" | "success" | "warning" | "danger";

interface MarkCommonProps extends Omit<HTMLAttributes<HTMLElement>, "children" | "className" | "color" | "style"> {
  variant?: MarkVariant;
  tone?: MarkTone;
  className?: string;
  style?: CSSProperties;
  slot?: string;
}
export type MarkProps = MarkCommonProps & (
  | { asChild?: false; children: ReactNode }
  | { asChild: true; children: ReactElement }
);

const classes = (className?: string) => className ? `brick-mark ${className}` : "brick-mark";

export const Mark = forwardRef<HTMLElement, MarkProps>(function Mark(
  { children, variant = "subtle", tone = "accent", asChild = false, className, slot = "mark", ...props },
  ref,
) {
  if (asChild) return staticPart("mark", { ...props, asChild: true,
    children: children as ReactElement, className, "data-slot": slot,
    "data-tone": tone, "data-variant": variant,
  }, ref, "brick-mark", slot);
  return <mark {...props} className={classes(className)} data-slot={slot} data-tone={tone} data-variant={variant} ref={ref}>{children}</mark>;
});

Mark.displayName = "Mark";

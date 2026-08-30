import { forwardRef, type CSSProperties, type HTMLAttributes, type ReactNode } from "react";

export type MarkVariant = "subtle" | "solid" | "plain";
export type MarkTone = "accent" | "neutral";

export interface MarkProps extends Omit<HTMLAttributes<HTMLElement>, "children" | "className" | "color" | "style"> {
  children: ReactNode;
  variant?: MarkVariant;
  tone?: MarkTone;
  className?: string;
  style?: CSSProperties;
  slot?: string;
}

const classes = (className?: string) => className ? `brick-mark ${className}` : "brick-mark";

export const Mark = forwardRef<HTMLElement, MarkProps>(function Mark(
  { children, variant = "subtle", tone = "accent", className, slot = "mark", ...props },
  ref,
) {
  return <mark {...props} className={classes(className)} data-slot={slot} data-tone={tone} data-variant={variant} ref={ref}>{children}</mark>;
});

Mark.displayName = "Mark";

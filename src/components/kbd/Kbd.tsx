import { forwardRef, type CSSProperties, type HTMLAttributes, type ReactNode } from "react";

export type KbdVariant = "raised" | "outline" | "subtle" | "plain";
export type KbdSize = "sm" | "md" | "lg";

export interface KbdProps extends Omit<HTMLAttributes<HTMLElement>, "children" | "className" | "style"> {
  children: ReactNode;
  variant?: KbdVariant;
  size?: KbdSize;
  className?: string;
  style?: CSSProperties;
  slot?: string;
}

const classes = (className?: string) => className ? `brick-kbd ${className}` : "brick-kbd";

export const Kbd = forwardRef<HTMLElement, KbdProps>(function Kbd(
  { children, variant = "raised", size = "md", className, slot = "kbd", ...props },
  ref,
) {
  return <kbd {...props} className={classes(className)} data-size={size} data-slot={slot} data-variant={variant} ref={ref}>{children}</kbd>;
});

Kbd.displayName = "Kbd";

import {
  forwardRef,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
  type ReactElement,
} from "react";
import { staticPart } from "../_internal/StaticPart.js";

export type CodeVariant = "subtle" | "plain" | "solid" | "outline" | "surface";
export type CodeTone = "neutral" | "inherit" | "accent" | "info" | "success" | "warning" | "danger";
export type CodeSize = "inherit" | "xs" | "sm" | "md" | "lg";

interface CodeCommonProps extends Omit<HTMLAttributes<HTMLElement>, "children" | "className" | "color" | "style"> {
  variant?: CodeVariant;
  tone?: CodeTone;
  size?: CodeSize;
  className?: string;
  style?: CSSProperties;
  slot?: string;
}
export type CodeProps = CodeCommonProps & (
  | { asChild?: false; children: ReactNode }
  | { asChild: true; children: ReactElement }
);

function classes(className: string | undefined) {
  return className ? `brick-code ${className}` : "brick-code";
}

export const Code = forwardRef<HTMLElement, CodeProps>(function Code(
  {
    children,
    variant = "subtle",
    tone = "neutral",
    size = "inherit",
    className,
    slot = "code",
    asChild = false,
    ...props
  },
  ref,
) {
  if (asChild) return staticPart("code", {
    ...props, asChild: true, children: children as ReactElement,
    className, "data-size": size, "data-tone": tone, "data-variant": variant,
    "data-slot": slot,
  }, ref, "brick-code", slot);
  return (
    <code
      {...props}
      className={classes(className)}
      data-size={size}
      data-slot={slot}
      data-tone={tone}
      data-variant={variant}
      ref={ref}
    >
      {children}
    </code>
  );
});

Code.displayName = "Code";

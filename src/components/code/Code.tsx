import {
  forwardRef,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from "react";

export type CodeVariant = "subtle" | "plain";
export type CodeTone = "neutral" | "inherit";
export type CodeSize = "inherit" | "sm" | "md";

export interface CodeProps extends Omit<HTMLAttributes<HTMLElement>, "children" | "className" | "color" | "style"> {
  children: ReactNode;
  variant?: CodeVariant;
  tone?: CodeTone;
  size?: CodeSize;
  className?: string;
  style?: CSSProperties;
  slot?: string;
}

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
    ...props
  },
  ref,
) {
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

import {
  forwardRef,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from "react";

export interface EmProps
  extends Omit<HTMLAttributes<HTMLElement>, "children" | "className" | "style"> {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  slot?: string;
}

function classes(className: string | undefined) {
  return className ? `brick-em ${className}` : "brick-em";
}

export const Em = forwardRef<HTMLElement, EmProps>(function Em(
  { children, className, slot = "em", ...props },
  ref,
) {
  return (
    <em
      {...props}
      className={classes(className)}
      data-slot={slot}
      ref={ref}
    >
      {children}
    </em>
  );
});

Em.displayName = "Em";

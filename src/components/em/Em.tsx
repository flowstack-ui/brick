import {
  forwardRef,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
  type ReactElement,
} from "react";
import { staticPart } from "../_internal/StaticPart.js";

interface EmBaseProps
  extends Omit<HTMLAttributes<HTMLElement>, "children" | "className" | "style"> {
  className?: string;
  style?: CSSProperties;
  /** @deprecated Use data-slot. This legacy alias does not forward HTML slot. */
  slot?: string;
  "data-slot"?: string;
}
export type EmProps = EmBaseProps & (
  | { asChild?: false; children: ReactNode }
  | { asChild: true; children: ReactElement }
);

function classes(className: string | undefined) {
  return className ? `brick-em ${className}` : "brick-em";
}

export const Em = forwardRef<HTMLElement, EmProps>(function Em(
  { children, className, asChild = false, slot, "data-slot": dataSlot = slot ?? "em", ...props },
  ref,
) {
  if (asChild) return staticPart("em", {
    ...props, asChild: true, children: children as ReactElement,
    className, "data-slot": dataSlot,
  }, ref, "brick-em", "em");
  return (
    <em
      {...props}
      className={classes(className)}
      data-slot={dataSlot}
      ref={ref}
    >
      {children}
    </em>
  );
});

Em.displayName = "Em";

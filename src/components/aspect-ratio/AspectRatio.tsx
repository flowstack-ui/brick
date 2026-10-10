import {
  AspectRatio as AtomAspectRatio,
  type AspectRatioRootProps as AtomAspectRatioRootProps,
} from "@flowstack-ui/atom/aspect-ratio";
import { forwardRef, type CSSProperties } from "react";
import { normalizeResponsiveValue, type ResponsiveValue } from "../_responsive-value/ResponsiveValue.js";
import { radiusStyle, type Radius } from "../_radius/Radius.js";

export type AspectRatioVariant = "plain" | "subtle" | "outline";
export type AspectRatioRadius = Radius;
export type AspectRatioOverflow = "visible" | "hidden";
export type AspectRatioContentLayout = "fill" | "flow";

export interface AspectRatioRootProps extends Omit<AtomAspectRatioRootProps, "ratio" | "ratioVariable"> {
  ratio?: ResponsiveValue<number>;
  contentLayout?: AspectRatioContentLayout;
  variant?: AspectRatioVariant;
  radius?: AspectRatioRadius;
  overflow?: AspectRatioOverflow;
}

function mergeClassName(className: string | undefined) {
  return className
    ? `brick-aspect-ratio ${className}`
    : "brick-aspect-ratio";
}

export const AspectRatioRoot = forwardRef<HTMLDivElement, AspectRatioRootProps>(
  function AspectRatioRoot(
    {
      className,
      ratio = 16 / 9,
      contentLayout = "fill",
      style,
      "data-slot": dataSlot = "aspect-ratio",
      overflow = "hidden",
      radius,
      variant = "plain",
      ...props
    },
    ref,
  ) {
    const values = normalizeResponsiveValue(ratio);
    const normalize = (value: number | undefined) => value !== undefined && Number.isFinite(value) && value > 0 ? value : 16 / 9;
    const responsive = typeof ratio === "object";
    const ratioStyle: CSSProperties & Record<string, string | number | undefined> = { ...style };
    if (responsive) {
      // Assign every breakpoint locally: nested frames never inherit a parent's ratio.
      let current = normalize(values.initial);
      for (const breakpoint of ["initial", "sm", "md", "lg", "xl"] as const) {
        if (values[breakpoint] !== undefined) current = normalize(values[breakpoint]);
        ratioStyle[`--_brick-aspect-ratio-${breakpoint}`] = current;
      }
    }
    return (
      <AtomAspectRatio.Root
        {...props}
        ratio={normalize(values.initial)}
        ratioVariable={responsive ? "--_brick-aspect-ratio-current" : undefined}
        style={radiusStyle(radius, "--brick-aspect-ratio-radius", ratioStyle)}
        className={mergeClassName(className)}
        data-slot={dataSlot}
        data-overflow={overflow}
        data-content-layout={contentLayout}
        data-radius={radius ?? "none"}
        data-variant={variant}
        ref={ref}
      />
    );
  },
);

AspectRatioRoot.displayName = "AspectRatio.Root";

export const AspectRatio = { Root: AspectRatioRoot };

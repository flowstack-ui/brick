import {
  AspectRatio as AtomAspectRatio,
  type AspectRatioRootProps as AtomAspectRatioRootProps,
} from "@flowstack-ui/atom/aspect-ratio";
import { forwardRef } from "react";

export type AspectRatioVariant = "plain" | "subtle" | "outline";
export type AspectRatioRadius = "none" | "sm" | "md" | "lg" | "full";
export type AspectRatioOverflow = "visible" | "hidden";

export interface AspectRatioRootProps extends AtomAspectRatioRootProps {
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
      "data-slot": dataSlot = "aspect-ratio",
      overflow = "hidden",
      radius = "none",
      variant = "plain",
      ...props
    },
    ref,
  ) {
    return (
      <AtomAspectRatio.Root
        {...props}
        className={mergeClassName(className)}
        data-slot={dataSlot}
        data-overflow={overflow}
        data-radius={radius}
        data-variant={variant}
        ref={ref}
      />
    );
  },
);

AspectRatioRoot.displayName = "AspectRatio.Root";

export const AspectRatio = { Root: AspectRatioRoot };

import { forwardRef } from "react";
import {
  Highlight as AtomHighlight,
  type HighlightRootProps as AtomHighlightRootProps,
} from "@flowstack-ui/atom/highlight";

export type HighlightVariant = "subtle" | "solid" | "underline";
export type HighlightTone = "accent" | "neutral";

export interface HighlightProps extends Omit<AtomHighlightRootProps, "render"> {
  variant?: HighlightVariant;
  tone?: HighlightTone;
}

const classes = (className?: string) => className ? `brick-highlight ${className}` : "brick-highlight";

export const Highlight = forwardRef<HTMLSpanElement, HighlightProps>(function Highlight(
  { variant = "subtle", tone = "accent", className, "data-slot": dataSlot = "highlight", ...props },
  ref,
) {
  return <AtomHighlight.Root {...props} className={classes(className)} data-slot={dataSlot} data-tone={tone} data-variant={variant} ref={ref} />;
});

Highlight.displayName = "Highlight";

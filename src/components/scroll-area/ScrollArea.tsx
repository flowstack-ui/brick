import {
  ScrollArea as AtomScrollArea,
  type ScrollAreaRootProps as AtomRootProps,
  type ScrollAreaViewportProps as AtomViewportProps,
} from "@flowstack-ui/atom/scroll-area";
import { forwardRef } from "react";

export type ScrollAreaOrientation = "vertical" | "horizontal" | "both";
export type ScrollAreaScrollbarGutter = "auto" | "stable";
export type ScrollAreaScrollbarVisibility = "auto" | "always" | "interaction";
export type ScrollAreaRootElement = HTMLDivElement;
export type ScrollAreaViewportElement = HTMLDivElement;

export interface ScrollAreaRootProps extends Omit<AtomRootProps, "orientation"> {
  orientation?: ScrollAreaOrientation;
  scrollbarGutter?: ScrollAreaScrollbarGutter;
  scrollbarVisibility?: ScrollAreaScrollbarVisibility;
}

export interface ScrollAreaViewportProps extends AtomViewportProps {}

function classes(base: string, value: string | undefined) {
  return value ? `${base} ${value}` : base;
}

export const ScrollAreaRoot = forwardRef<ScrollAreaRootElement, ScrollAreaRootProps>(
  function ScrollAreaRoot(
    {
      className,
      orientation = "vertical",
      scrollbarGutter = "auto",
      scrollbarVisibility = "auto",
      ...props
    },
    ref,
  ) {
    return (
      <AtomScrollArea.Root
        {...props}
        className={classes("brick-scroll-area", className)}
        data-scrollbar-gutter={scrollbarGutter}
        data-scrollbar-visibility={scrollbarVisibility}
        orientation={orientation}
        ref={ref}
      />
    );
  },
);
ScrollAreaRoot.displayName = "ScrollArea.Root";

export const ScrollAreaViewport = forwardRef<
  ScrollAreaViewportElement,
  ScrollAreaViewportProps
>(function ScrollAreaViewport({ className, ...props }, ref) {
  return (
    <AtomScrollArea.Viewport
      {...props}
      className={classes("brick-scroll-area-viewport", className)}
      ref={ref}
    />
  );
});
ScrollAreaViewport.displayName = "ScrollArea.Viewport";

export const ScrollArea = Object.freeze({
  Root: ScrollAreaRoot,
  Viewport: ScrollAreaViewport,
});

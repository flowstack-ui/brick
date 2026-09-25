import {
  ScrollArea as AtomScrollArea,
  type ScrollAreaRootProps as AtomRootProps,
  type ScrollAreaViewportProps as AtomViewportProps,
  type ScrollAreaRootProviderProps as AtomProviderProps,
  type ScrollAreaContentProps,
  type ScrollAreaScrollbarProps,
  type ScrollAreaThumbProps,
  type ScrollAreaCornerProps,
} from "@flowstack-ui/atom/scroll-area";
import { forwardRef } from "react";
import { useCustomAnatomy } from "./use-custom-anatomy.js";

export {
  useScrollArea,
  type ScrollAreaController,
  type UseScrollAreaProps,
  type ScrollAreaScrollToDetails,
  type ScrollAreaScrollToEdgeDetails,
  type ScrollAreaScrollbarState,
  type ScrollAreaState,
  type ScrollAreaAxis,
  type ScrollAreaEdge,
  type ScrollAreaIds,
} from "@flowstack-ui/atom/scroll-area";
export type {
  ScrollAreaContentProps,
  ScrollAreaScrollbarProps,
  ScrollAreaThumbProps,
  ScrollAreaCornerProps,
};
export type ScrollAreaScrollbar = "native" | "custom";
export type ScrollAreaSize = "xs" | "sm" | "md" | "lg";
export type ScrollAreaScrollShadow =
  | "none"
  | "vertical"
  | "horizontal"
  | "both";

export type ScrollAreaOrientation = "vertical" | "horizontal" | "both";
export type ScrollAreaScrollbarGutter = "auto" | "stable";
export type ScrollAreaScrollbarVisibility = "auto" | "always" | "interaction";
export type ScrollAreaRootElement = HTMLDivElement;
export type ScrollAreaViewportElement = HTMLDivElement;

type ScrollAreaRecipeProps = {
  scrollbarGutter?: ScrollAreaScrollbarGutter;
  scrollbarVisibility?: ScrollAreaScrollbarVisibility;
} & (
  | { scrollbar?: "native"; size?: never; scrollShadow?: never }
  | {
      scrollbar: "custom";
      size?: ScrollAreaSize;
      scrollShadow?: ScrollAreaScrollShadow;
    }
);
export type ScrollAreaRootProps = Omit<AtomRootProps, "orientation"> &
  ScrollAreaRecipeProps & { orientation?: ScrollAreaOrientation };
export type ScrollAreaRootProviderProps = AtomProviderProps &
  ScrollAreaRecipeProps;

export interface ScrollAreaViewportProps extends AtomViewportProps {}

function classes(base: string, value: string | undefined) {
  return value ? `${base} ${value}` : base;
}

export const ScrollAreaRoot = forwardRef<
  ScrollAreaRootElement,
  ScrollAreaRootProps
>(function ScrollAreaRoot(
  {
    className,
    orientation = "vertical",
    scrollbarGutter = "auto",
    scrollbarVisibility = "auto",
    scrollbar = "native",
    size = "md",
    scrollShadow = "none",
    ...props
  },
  ref,
) {
  const rootRef = useCustomAnatomy(ref, scrollbar === "custom", orientation);
  return (
    <AtomScrollArea.Root
      {...props}
      className={classes("brick-scroll-area", className)}
      data-scrollbar-gutter={scrollbarGutter}
      data-scrollbar-visibility={scrollbarVisibility}
      data-scrollbar={scrollbar}
      data-size={size}
      data-scroll-shadow={scrollShadow}
      orientation={orientation}
      ref={rootRef}
    />
  );
});
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

export const ScrollAreaRootProvider = forwardRef<
  HTMLDivElement,
  ScrollAreaRootProviderProps
>(function ScrollAreaRootProvider(
  {
    className,
    scrollbar = "native",
    size = "md",
    scrollShadow = "none",
    scrollbarGutter = "auto",
    scrollbarVisibility = "auto",
    ...props
  },
  ref,
) {
  const rootRef = useCustomAnatomy(
    ref,
    scrollbar === "custom",
    props.value.orientation,
  );
  return (
    <AtomScrollArea.RootProvider
      {...props}
      ref={rootRef}
      className={classes("brick-scroll-area", className)}
      data-scrollbar={scrollbar}
      data-size={size}
      data-scroll-shadow={scrollShadow}
      data-scrollbar-gutter={scrollbarGutter}
      data-scrollbar-visibility={scrollbarVisibility}
    />
  );
});
export const ScrollAreaContent = forwardRef<
  HTMLDivElement,
  ScrollAreaContentProps
>(function ScrollAreaContent({ className, ...props }, ref) {
  return (
    <AtomScrollArea.Content
      {...props}
      ref={ref}
      className={classes("brick-scroll-area-content", className)}
    />
  );
});
export const ScrollAreaThumb = forwardRef<HTMLDivElement, ScrollAreaThumbProps>(
  function ScrollAreaThumb({ className, ...props }, ref) {
    return (
      <AtomScrollArea.Thumb
        {...props}
        ref={ref}
        className={classes("brick-scroll-area-thumb", className)}
      />
    );
  },
);
export const ScrollAreaScrollbar = forwardRef<
  HTMLDivElement,
  ScrollAreaScrollbarProps
>(function ScrollAreaScrollbar({ className, children, ...props }, ref) {
  return (
    <AtomScrollArea.Scrollbar
      {...props}
      ref={ref}
      className={classes("brick-scroll-area-scrollbar", className)}
    >
      {children === undefined ? <ScrollAreaThumb /> : children}
    </AtomScrollArea.Scrollbar>
  );
});
export const ScrollAreaCorner = forwardRef<
  HTMLDivElement,
  ScrollAreaCornerProps
>(function ScrollAreaCorner({ className, ...props }, ref) {
  return (
    <AtomScrollArea.Corner
      {...props}
      ref={ref}
      className={classes("brick-scroll-area-corner", className)}
    />
  );
});
export const ScrollAreaContext = AtomScrollArea.Context;

export const ScrollArea = Object.freeze({
  Root: ScrollAreaRoot,
  Viewport: ScrollAreaViewport,
  RootProvider: ScrollAreaRootProvider,
  Content: ScrollAreaContent,
  Scrollbar: ScrollAreaScrollbar,
  Thumb: ScrollAreaThumb,
  Corner: ScrollAreaCorner,
  Context: ScrollAreaContext,
});

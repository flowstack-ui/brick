import { forwardRef } from "react";
import {
  SwipeableItem as AtomSwipeableItem,
  type SwipeableItemActionsProps as AtomSwipeableItemActionsProps,
  type SwipeableItemContentProps as AtomSwipeableItemContentProps,
  type SwipeableItemRootProps as AtomSwipeableItemRootProps,
} from "@flowstack-ui/atom/swipeable-item";

export type SwipeableItemVariant = "plain" | "outline";

export interface SwipeableItemRootProps
  extends Omit<AtomSwipeableItemRootProps, "onFullSwipe" | "fullSwipeThreshold"> {
  variant?: SwipeableItemVariant;
}

export interface SwipeableItemContentProps extends AtomSwipeableItemContentProps {}

export type SwipeableItemActionsProps = Omit<AtomSwipeableItemActionsProps, "aria-label"> & {
  "aria-label": string;
};

function mergeClassName(base: string, className?: string) {
  return className ? `${base} ${className}` : base;
}

export const SwipeableItemRoot = forwardRef<HTMLDivElement, SwipeableItemRootProps>(
  function SwipeableItemRoot(
    { className, variant = "plain", "data-slot": dataSlot, ...props },
    ref,
  ) {
    return (
      <AtomSwipeableItem.Root
        {...props}
        className={mergeClassName("brick-swipeable-item", className)}
        data-slot={dataSlot ?? "swipeable-item"}
        data-variant={variant}
        ref={ref}
      />
    );
  },
);

export const SwipeableItemContent = forwardRef<HTMLElement, SwipeableItemContentProps>(
  function SwipeableItemContent({ className, "data-slot": dataSlot, ...props }, ref) {
    return (
      <AtomSwipeableItem.Content
        {...props}
        className={mergeClassName("brick-swipeable-item__content", className)}
        data-slot={dataSlot ?? "swipeable-item-content"}
        ref={ref}
      />
    );
  },
);

export const SwipeableItemActions = forwardRef<HTMLElement, SwipeableItemActionsProps>(
  function SwipeableItemActions({ className, "data-slot": dataSlot, ...props }, ref) {
    return (
      <AtomSwipeableItem.Actions
        {...props}
        className={mergeClassName("brick-swipeable-item__actions", className)}
        data-slot={dataSlot ?? "swipeable-item-actions"}
        ref={ref}
      />
    );
  },
);

SwipeableItemRoot.displayName = "SwipeableItem.Root";
SwipeableItemContent.displayName = "SwipeableItem.Content";
SwipeableItemActions.displayName = "SwipeableItem.Actions";

export const SwipeableItem = Object.freeze({
  Root: SwipeableItemRoot,
  Content: SwipeableItemContent,
  Actions: SwipeableItemActions,
});

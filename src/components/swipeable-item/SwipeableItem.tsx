import { forwardRef } from "react";
import {
  SwipeableItem as AtomSwipeableItem,
  useSwipeableItem as useAtomSwipeableItem,
  type UseSwipeableItemProps,
  type SwipeableItemController,
  type SwipeableItemRootProviderProps as AtomSwipeableItemRootProviderProps,
  type SwipeableItemActionsProps as AtomSwipeableItemActionsProps,
  type SwipeableItemContentProps as AtomSwipeableItemContentProps,
  type SwipeableItemRootProps as AtomSwipeableItemRootProps,
} from "@flowstack-ui/atom/swipeable-item";
import { radiusStyle, type Radius } from "../_radius/Radius.js";
import { resolveSpacingValue, type SpacingValue } from "../_spacing-value/SpacingValue.js";

export type { UseSwipeableItemProps, SwipeableItemController };
const noFullSwipe: readonly ("start" | "end")[] = [];
export function useSwipeableItem(props: UseSwipeableItemProps = {}) {
  return useAtomSwipeableItem({ ...props, fullSwipeSides: props.fullSwipeSides ?? noFullSwipe });
}

export type SwipeableItemVariant = "plain" | "outline";

export interface SwipeableItemRootProps
  extends AtomSwipeableItemRootProps {
  variant?: SwipeableItemVariant;
  radius?: Radius;
}
export interface SwipeableItemRootProviderProps extends AtomSwipeableItemRootProviderProps {
  variant?: SwipeableItemVariant;
  radius?: Radius;
}
export const SwipeableItemRootProvider = forwardRef<HTMLDivElement, SwipeableItemRootProviderProps>(
  function SwipeableItemRootProvider({ className, variant = "plain", radius, style, ...props }, ref) {
    return <AtomSwipeableItem.RootProvider {...props} ref={ref}
      className={mergeClassName("brick-swipeable-item", className)} data-variant={variant}
      style={radiusStyle(radius, "--brick-swipeable-item-radius", style)} />;
  },
);
export const SwipeableItemContext = AtomSwipeableItem.Context;

export interface SwipeableItemContentProps extends AtomSwipeableItemContentProps {}

export type SwipeableItemActionsProps = Omit<AtomSwipeableItemActionsProps, "aria-label"> & {
  "aria-label": string;
  gap?: SpacingValue;
  inset?: SpacingValue;
};

function mergeClassName(base: string, className?: string) {
  return className ? `${base} ${className}` : base;
}

export const SwipeableItemRoot = forwardRef<HTMLDivElement, SwipeableItemRootProps>(
  function SwipeableItemRoot(
    { className, variant = "plain", radius, style, fullSwipeSides = noFullSwipe, "data-slot": dataSlot, ...props },
    ref,
  ) {
    return (
      <AtomSwipeableItem.Root
        {...props}
        fullSwipeSides={fullSwipeSides}
        style={radiusStyle(radius, "--brick-swipeable-item-radius", style)}
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
  function SwipeableItemActions({ className, gap, inset, style, "data-slot": dataSlot, ...props }, ref) {
    return (
      <AtomSwipeableItem.Actions
        {...props}
        style={{
          ...(gap !== undefined && { "--brick-swipeable-item-action-gap": resolveSpacingValue(gap) }),
          ...(inset !== undefined && { "--brick-swipeable-item-action-padding-inline": resolveSpacingValue(inset) }),
          ...style,
        }}
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
  RootProvider: SwipeableItemRootProvider,
  Context: SwipeableItemContext,
  Content: SwipeableItemContent,
  Actions: SwipeableItemActions,
});

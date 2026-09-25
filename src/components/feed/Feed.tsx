"use client";

import { radiusStyle, type Radius } from "../_radius/Radius.js";
import { createContext, useContext, forwardRef, type ReactNode } from "react";
import {
  responsiveDataAttributes,
  type ResponsiveValue,
} from "../_responsive-value/ResponsiveValue.js";
import {
  Feed as AtomFeed,
  type FeedItemProps as AtomFeedItemProps,
  type FeedRootProps as AtomFeedRootProps,
} from "@flowstack-ui/atom/feed";

export type FeedVariant = "plain" | "divided" | "outline";
export type FeedDensity = "compact" | "comfortable";
export type FeedDividerStrength = "subtle" | "default";

export interface FeedRootProps extends AtomFeedRootProps {
  radius?: Radius;
  variant?: ResponsiveValue<FeedVariant>;
  density?: ResponsiveValue<FeedDensity>;
  dividerStrength?: ResponsiveValue<FeedDividerStrength>;
}

export interface FeedItemProps extends AtomFeedItemProps {}

export type FeedRecipeProps = Pick<
  FeedRootProps,
  "variant" | "density" | "dividerStrength" | "radius"
>;
export interface FeedPropsProviderProps {
  value: FeedRecipeProps;
  children?: ReactNode;
}
const RecipeContext = createContext<FeedRecipeProps>({});
export function FeedPropsProvider({ value, children }: FeedPropsProviderProps) {
  const parent = useContext(RecipeContext);
  return (
    <RecipeContext.Provider value={{ ...parent, ...value }}>
      {children}
    </RecipeContext.Provider>
  );
}

function mergeClassName(base: string, className?: string) {
  return className ? `${base} ${className}` : base;
}

export const FeedRoot = forwardRef<HTMLElement, FeedRootProps>(
  function FeedRoot(
    {
      className,
      radius,
      style,
      density,
      dividerStrength,
      variant,
      "data-slot": dataSlot,
      ...props
    },
    ref,
  ) {
    const defaults = useContext(RecipeContext);
    return (
      <AtomFeed.Root
        {...props}
        className={mergeClassName("brick-feed", className)}
        style={radiusStyle(
          radius ?? defaults.radius,
          "--brick-feed-radius",
          style,
        )}
        {...responsiveDataAttributes(
          "data-density",
          density ?? defaults.density ?? "comfortable",
          { defaultValue: "comfortable", alwaysInitial: true },
        )}
        {...responsiveDataAttributes(
          "data-divider-strength",
          dividerStrength ?? defaults.dividerStrength ?? "subtle",
          { defaultValue: "subtle", alwaysInitial: true },
        )}
        data-slot={dataSlot ?? "feed"}
        {...responsiveDataAttributes(
          "data-variant",
          variant ?? defaults.variant ?? "divided",
          { defaultValue: "divided", alwaysInitial: true },
        )}
        ref={ref}
      />
    );
  },
);

export const FeedItem = forwardRef<HTMLElement, FeedItemProps>(
  function FeedItem({ className, "data-slot": dataSlot, ...props }, ref) {
    return (
      <AtomFeed.Item
        {...props}
        className={mergeClassName("brick-feed__item", className)}
        data-slot={dataSlot ?? "feed-item"}
        ref={ref}
      />
    );
  },
);

FeedRoot.displayName = "Feed.Root";
FeedItem.displayName = "Feed.Item";

export const Feed = Object.freeze({
  Root: FeedRoot,
  Item: FeedItem,
  PropsProvider: FeedPropsProvider,
});

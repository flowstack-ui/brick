import { forwardRef } from "react";
import {
  Feed as AtomFeed,
  type FeedItemProps as AtomFeedItemProps,
  type FeedRootProps as AtomFeedRootProps,
} from "@flowstack-ui/atom/feed";

export type FeedVariant = "plain" | "divided" | "outline";
export type FeedDensity = "compact" | "comfortable";
export type FeedDividerStrength = "subtle" | "default";

export interface FeedRootProps extends AtomFeedRootProps {
  variant?: FeedVariant;
  density?: FeedDensity;
  dividerStrength?: FeedDividerStrength;
}

export interface FeedItemProps extends AtomFeedItemProps {}

function mergeClassName(base: string, className?: string) {
  return className ? `${base} ${className}` : base;
}

const FeedRoot = forwardRef<HTMLElement, FeedRootProps>(function FeedRoot(
  {
    className,
    density = "comfortable",
    dividerStrength = "subtle",
    variant = "divided",
    "data-slot": dataSlot,
    ...props
  },
  ref,
) {
  return (
    <AtomFeed.Root
      {...props}
      className={mergeClassName("brick-feed", className)}
      data-density={density}
      data-divider-strength={dividerStrength}
      data-slot={dataSlot ?? "feed"}
      data-variant={variant}
      ref={ref}
    />
  );
});

const FeedItem = forwardRef<HTMLElement, FeedItemProps>(function FeedItem(
  { className, "data-slot": dataSlot, ...props },
  ref,
) {
  return (
    <AtomFeed.Item
      {...props}
      className={mergeClassName("brick-feed__item", className)}
      data-slot={dataSlot ?? "feed-item"}
      ref={ref}
    />
  );
});

FeedRoot.displayName = "Feed.Root";
FeedItem.displayName = "Feed.Item";

export const Feed = Object.freeze({ Root: FeedRoot, Item: FeedItem });

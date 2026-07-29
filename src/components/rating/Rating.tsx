"use client";

import { forwardRef, type CSSProperties, type ReactNode } from "react";
import {
  Rating as AtomRating,
  useRatingContext,
  type RatingItemProps as AtomRatingItemProps,
  type RatingRootProps as AtomRatingRootProps,
} from "@flowstack-ui/atom/rating";

export type RatingSize = "sm" | "md" | "lg";
export type RatingTone = "accent" | "neutral";
export type RatingVariant = "solid" | "outline";

function mergeClassName(base: string, className?: string) {
  return className ? `${base} ${className}` : base;
}

function StarArtwork() {
  return (
    <svg aria-hidden="true" className="brick-rating__star" viewBox="0 0 24 24">
      <path d="m12 2.6 2.86 5.8 6.4.93-4.63 4.51 1.09 6.38L12 17.21l-5.72 3.01 1.09-6.38-4.63-4.51 6.4-.93L12 2.6Z" />
    </svg>
  );
}

export interface RatingRootProps extends AtomRatingRootProps {
  /** Item artwork size while preserving the pointer target. @default "md" */
  size?: RatingSize;
  /** Semantic artwork tone. @default "accent" */
  tone?: RatingTone;
  /** Filled-star paint treatment. @default "solid" */
  variant?: RatingVariant;
}

export interface RatingItemProps extends Omit<AtomRatingItemProps, "children"> {
  /** Decorative artwork used for both empty and proportional filled layers. */
  children?: ReactNode;
}

export const RatingRoot = forwardRef<HTMLDivElement, RatingRootProps>(
  function RatingRoot(
    {
      className,
      size = "md",
      tone = "accent",
      variant = "solid",
      "data-slot": dataSlot,
      ...props
    },
    ref,
  ) {
    return (
      <AtomRating.Root
        {...props}
        className={mergeClassName("brick-rating", className)}
        data-size={size}
        data-slot={dataSlot ?? "rating"}
        data-tone={tone}
        data-variant={variant}
        ref={ref}
      />
    );
  },
);

export const RatingItem = forwardRef<HTMLSpanElement, RatingItemProps>(
  function RatingItem(
    { children, className, style, value, "data-slot": dataSlot, ...props },
    ref,
  ) {
    const context = useRatingContext();
    const state = context.getItemState(value);
    const artwork = children ?? <StarArtwork />;
    const resolvedStyle = {
      ...style,
      "--brick-rating-fill": `${state.fill}%`,
    } as CSSProperties;

    return (
      <AtomRating.Item
        {...props}
        className={mergeClassName("brick-rating__item", className)}
        data-slot={dataSlot ?? "rating-item"}
        ref={ref}
        style={resolvedStyle}
        value={value}
      >
        <span className="brick-rating__artwork brick-rating__artwork--empty">
          {artwork}
        </span>
        <span className="brick-rating__artwork brick-rating__artwork--fill">
          {artwork}
        </span>
      </AtomRating.Item>
    );
  },
);

RatingRoot.displayName = "Rating.Root";
RatingItem.displayName = "Rating.Item";

export const Rating = Object.freeze({ Root: RatingRoot, Item: RatingItem });

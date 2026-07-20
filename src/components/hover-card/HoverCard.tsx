"use client";

import { forwardRef } from "react";
import {
  HoverCard as AtomHoverCard,
  type HoverCardArrowProps as AtomHoverCardArrowProps,
  type HoverCardContentProps as AtomHoverCardContentProps,
  type HoverCardPortalProps as AtomHoverCardPortalProps,
  type HoverCardRootProps as AtomHoverCardRootProps,
  type HoverCardTriggerProps as AtomHoverCardTriggerProps,
} from "@flowstack-ui/atom/hover-card";

export type HoverCardSize = "sm" | "md" | "lg";
export type HoverCardRootProps = AtomHoverCardRootProps;
export type HoverCardTriggerProps = AtomHoverCardTriggerProps;
export type HoverCardPortalProps = AtomHoverCardPortalProps;
export interface HoverCardContentProps
  extends Omit<AtomHoverCardContentProps, "aria-label" | "ariaLabel"> {
  /** Preferred maximum inline size. @default "md" */
  size?: HoverCardSize;
}
export type HoverCardArrowProps = AtomHoverCardArrowProps;

function mergeClassName(base: string, className: string | undefined) {
  return className ? `${base} ${className}` : base;
}

function slotOrDefault(slot: string | undefined, fallback: string) {
  return slot ?? fallback;
}

export const HoverCardRoot = AtomHoverCard.Root;
export const HoverCardPortal = AtomHoverCard.Portal;

export const HoverCardTrigger = forwardRef<HTMLElement, HoverCardTriggerProps>(
  function HoverCardTrigger({ className, "data-slot": dataSlot, ...props }, ref) {
    return (
      <AtomHoverCard.Trigger
        {...props}
        className={mergeClassName("brick-hover-card__trigger", className)}
        data-slot={slotOrDefault(dataSlot, "hover-card-trigger")}
        ref={ref}
      />
    );
  },
);

export const HoverCardContent = forwardRef<HTMLDivElement, HoverCardContentProps>(
  function HoverCardContent(
    {
      className,
      sideOffset = 8,
      size = "md",
      "data-slot": dataSlot,
      ...props
    },
    ref,
  ) {
    return (
      <AtomHoverCard.Content
        {...props}
        className={mergeClassName("brick-hover-card", className)}
        data-size={size}
        data-slot={slotOrDefault(dataSlot, "hover-card")}
        ref={ref}
        sideOffset={sideOffset}
      />
    );
  },
);

export const HoverCardArrow = forwardRef<SVGSVGElement, HoverCardArrowProps>(
  function HoverCardArrow({ className, "data-slot": dataSlot, ...props }, ref) {
    return (
      <AtomHoverCard.Arrow
        {...props}
        className={mergeClassName("brick-hover-card__arrow", className)}
        data-slot={slotOrDefault(dataSlot, "hover-card-arrow")}
        ref={ref}
      />
    );
  },
);

HoverCardTrigger.displayName = "HoverCard.Trigger";
HoverCardContent.displayName = "HoverCard.Content";
HoverCardArrow.displayName = "HoverCard.Arrow";

export const HoverCard = Object.freeze({
  Root: HoverCardRoot,
  Trigger: HoverCardTrigger,
  Portal: HoverCardPortal,
  Content: HoverCardContent,
  Arrow: HoverCardArrow,
});

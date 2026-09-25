"use client";

import { FloatingArrowArtwork, floatingArrowWidth, floatingArrowHeight, floatingArrowStyle } from "../_floating-arrow/FloatingArrowArtwork.js";

import { Children, cloneElement, Fragment, forwardRef, isValidElement, type ReactNode } from "react";
import { radiusStyle, type Radius } from "../_radius/Radius.js";
import {
  HoverCard as AtomHoverCard,
  type HoverCardArrowProps as AtomHoverCardArrowProps,
  type HoverCardContentProps as AtomHoverCardContentProps,
  type HoverCardPortalProps as AtomHoverCardPortalProps,
  type HoverCardRootProps as AtomHoverCardRootProps,
  type HoverCardTriggerProps as AtomHoverCardTriggerProps,
} from "@flowstack-ui/atom/hover-card";

export type HoverCardSize = "sm" | "md" | "lg";
export type HoverCardInset = "xs" | "sm" | "md" | "lg";
export { useHoverCard } from "@flowstack-ui/atom/hover-card";
export type { UseHoverCardOptions, UseHoverCardReturn, HoverCardRootProviderProps, HoverCardContextProps, HoverCardIds, HoverCardLifecycleOptions, HoverCardOutsideEvents, HoverCardPositioningOptions } from "@flowstack-ui/atom/hover-card";
export type HoverCardRootProps = AtomHoverCardRootProps;
export type HoverCardTriggerProps = AtomHoverCardTriggerProps;
export type HoverCardPortalProps = AtomHoverCardPortalProps;
export interface HoverCardContentProps
  extends Omit<AtomHoverCardContentProps, "aria-label" | "ariaLabel"> {
  /** Preferred maximum inline size. @default "md" */
  size?: HoverCardSize;
  /** Independent content padding. @default "md" */
  inset?: HoverCardInset;
  radius?: Radius;
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
export const HoverCardRootProvider = AtomHoverCard.RootProvider;
export const HoverCardContext = AtomHoverCard.Context;

function flattenFragments(children: ReactNode): ReactNode[] {
  return Children.toArray(children).flatMap(child => isValidElement<{ children?: ReactNode }>(child) && child.type === Fragment ? flattenFragments(child.props.children) : [child]);
}

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

export const HoverCardArrow = forwardRef<SVGSVGElement, HoverCardArrowProps>(
  function HoverCardArrow({ className, children, width, height, style, "data-slot": dataSlot, ...props }, ref) {
    return (
      <AtomHoverCard.Arrow
        {...props}
        width={width ?? floatingArrowWidth}
        height={height ?? floatingArrowHeight}
        style={floatingArrowStyle(width, height, style)}
        className={mergeClassName("brick-hover-card__arrow brick-floating-arrow", className)}
        children={children ?? (props.asChild || props.render ? undefined : <FloatingArrowArtwork width={width ?? floatingArrowWidth} height={height ?? floatingArrowHeight} />)}
        data-slot={slotOrDefault(dataSlot, "hover-card-arrow")}
        ref={ref}
      />
    );
  },
);

export const HoverCardContent = forwardRef<HTMLDivElement, HoverCardContentProps>(
  function HoverCardContent(
    {
      children,
      className,
      sideOffset = 8,
      size = "md",
      inset = "md", radius, style, asChild,
      "data-slot": dataSlot,
      ...props
    },
    ref,
  ) {
    const host = asChild && isValidElement<{ children?: ReactNode }>(children) ? children : null;
    const childArray = flattenFragments(host ? host.props.children : children);
    const arrows = childArray.filter(
      (child) => isValidElement(child) && child.type === HoverCardArrow,
    );
    const content = childArray.filter(
      (child) => !isValidElement(child) || child.type !== HoverCardArrow,
    );

    return (
      <AtomHoverCard.Content
        {...props}
        className={mergeClassName("brick-hover-card", className)}
        data-size={size}
        data-inset={inset}
        data-radius={radius}
        style={radiusStyle(radius, "--brick-hover-card-radius", style)}
        asChild={asChild}
        data-slot={slotOrDefault(dataSlot, "hover-card")}
        ref={ref}
        sideOffset={sideOffset}
      >
        {host ? cloneElement(host, undefined, <><div className="brick-hover-card__viewport">{content}</div>{arrows}</>) : <><div className="brick-hover-card__viewport">{content}</div>{arrows}</>}
      </AtomHoverCard.Content>
    );
  },
);

HoverCardTrigger.displayName = "HoverCard.Trigger";
HoverCardContent.displayName = "HoverCard.Content";
HoverCardArrow.displayName = "HoverCard.Arrow";

export const HoverCard = Object.freeze({
  Root: HoverCardRoot,
  RootProvider: HoverCardRootProvider,
  Context: HoverCardContext,
  Trigger: HoverCardTrigger,
  Portal: HoverCardPortal,
  Content: HoverCardContent,
  Arrow: HoverCardArrow,
});

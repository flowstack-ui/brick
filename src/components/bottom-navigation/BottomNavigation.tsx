"use client";

import { forwardRef } from "react";
import {
  BottomNavigation as AtomBottomNavigation,
  type BottomNavigationItemProps as AtomBottomNavigationItemProps,
  type BottomNavigationLabelVisibility as AtomBottomNavigationLabelVisibility,
  type BottomNavigationPosition as AtomBottomNavigationPosition,
  type BottomNavigationRootProps as AtomBottomNavigationRootProps,
} from "@flowstack-ui/atom/bottom-navigation";
import {
  createStaticSpanPart,
  type StaticSpanPartProps,
} from "../_internal/StaticSpanPart.js";

export type BottomNavigationVariant = "solid" | "soft" | "outline" | "ghost";
export type BottomNavigationTone = "accent" | "neutral";
export type BottomNavigationLayout = "full" | "floating";
export type BottomNavigationArrangement = "equal" | "centered";
export type BottomNavigationSize = "sm" | "md" | "lg";
export type BottomNavigationLabelVisibility = AtomBottomNavigationLabelVisibility;
export type BottomNavigationPosition = AtomBottomNavigationPosition;

type IndicatorSelection = {
  /** Paint the selected Icon area. @default "indicator" */
  selection?: "indicator";
  /** Selected Icon-area geometry. @default "pill" */
  selectionShape?: "circle" | "rounded" | "pill";
};

type ItemSelection = {
  /** Paint the complete selected Item. */
  selection: "item";
  /** Selected Item geometry. @default "pill" */
  selectionShape?: "square" | "rounded" | "pill";
};

export type BottomNavigationRootProps = AtomBottomNavigationRootProps &
  (IndicatorSelection | ItemSelection) & {
    /** Destination distribution. @default "equal" */
    arrangement?: BottomNavigationArrangement;
    /** Add a translucent backdrop treatment. @default false */
    blurred?: boolean;
    /** Add static surface separation. @default false */
    elevated?: boolean;
    /** Edge-to-edge or inset geometry. @default "full" */
    layout?: BottomNavigationLayout;
    /** Include viewport safe-area protection. @default true */
    safeArea?: boolean;
    /** Coordinated target, icon, indicator, and label geometry. @default "md" */
    size?: BottomNavigationSize;
    /** Navigation palette. @default "accent" */
    tone?: BottomNavigationTone;
    /** Root surface treatment. @default "outline" */
    variant?: BottomNavigationVariant;
  };

export type BottomNavigationItemProps = AtomBottomNavigationItemProps;
export type BottomNavigationIconProps = StaticSpanPartProps;
export type BottomNavigationLabelProps = StaticSpanPartProps;

function mergeClassName(base: string, className: string | undefined) {
  return className ? `${base} ${className}` : base;
}

export const BottomNavigationRoot = forwardRef<HTMLElement, BottomNavigationRootProps>(
  function BottomNavigationRoot(
    {
      arrangement = "equal",
      blurred = false,
      className,
      elevated = false,
      layout = "full",
      safeArea = true,
      selection = "indicator",
      selectionShape = "pill",
      size = "md",
      tone = "accent",
      variant = "outline",
      "data-slot": dataSlot,
      ...props
    },
    ref,
  ) {
    return (
      <AtomBottomNavigation.Root
        {...props}
        className={mergeClassName("brick-bottom-navigation", className)}
        data-arrangement={arrangement}
        data-blurred={blurred ? "" : undefined}
        data-elevated={elevated ? "" : undefined}
        data-layout={layout}
        data-safe-area={safeArea ? "" : undefined}
        data-selection={selection}
        data-selection-shape={selectionShape}
        data-size={size}
        data-slot={dataSlot ?? "bottom-navigation"}
        data-tone={tone}
        data-variant={variant}
        ref={ref}
      />
    );
  },
);

export const BottomNavigationItem = forwardRef<HTMLElement, BottomNavigationItemProps>(
  function BottomNavigationItem(
    { className, "data-slot": dataSlot, ...props },
    ref,
  ) {
    return (
      <AtomBottomNavigation.Item
        {...props}
        className={mergeClassName("brick-bottom-navigation__item", className)}
        data-slot={dataSlot ?? "bottom-navigation-item"}
        ref={ref}
      />
    );
  },
);

export const BottomNavigationIcon = createStaticSpanPart(
  "brick-bottom-navigation__icon",
  "bottom-navigation-icon",
  "BottomNavigation.Icon",
);

export const BottomNavigationLabel = createStaticSpanPart(
  "brick-bottom-navigation__label",
  "bottom-navigation-label",
  "BottomNavigation.Label",
);

BottomNavigationRoot.displayName = "BottomNavigation.Root";
BottomNavigationItem.displayName = "BottomNavigation.Item";

export const BottomNavigation = Object.freeze({
  Root: BottomNavigationRoot,
  Item: BottomNavigationItem,
  Icon: BottomNavigationIcon,
  Label: BottomNavigationLabel,
});

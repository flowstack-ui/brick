import { surfaceEffects, type SurfaceEffectProps } from "../_surface-effects/SurfaceEffects.js";
"use client";

import { forwardRef } from "react";
import { radiusStyle, type Radius } from "../_radius/Radius.js";
import { responsiveDataAttributes, type ResponsiveValue } from "../_responsive-value/ResponsiveValue.js";
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

export type BottomNavigationVariant = "solid" | "soft" | "outline" | "surface" | "ghost";
export type BottomNavigationElevation = "none" | "low" | "medium" | "high";
export type BottomNavigationSelectionVariant = "soft" | "outline" | "plain";
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

export type BottomNavigationRootProps = AtomBottomNavigationRootProps & SurfaceEffectProps &
  (IndicatorSelection | ItemSelection) & {
    /** Destination distribution. @default "equal" */
    arrangement?: ResponsiveValue<BottomNavigationArrangement>;
    /** Add a translucent backdrop treatment. @default false */
    blurred?: boolean;
    /** Add static surface separation. @default false */
    elevated?: boolean;
    /** Semantic shadow role; overrides elevated. */
    elevation?: BottomNavigationElevation;
    /** Root corners; defaults to none for full and overlay for floating. */
    radius?: Radius;
    /** Selected area corners; overrides selectionShape curvature, not circle geometry. */
    selectionRadius?: Radius;
    /** Selected paint independent from the bar surface. @default "soft" */
    selectionVariant?: BottomNavigationSelectionVariant;
    /** Edge-to-edge or inset geometry. @default "full" */
    layout?: BottomNavigationLayout;
    /** Include viewport safe-area protection. @default true */
    safeArea?: boolean;
    /** Coordinated target, icon, indicator, and label geometry. @default "md" */
    size?: ResponsiveValue<BottomNavigationSize>;
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
      treatment, backgroundOpacity, backdropBlur, backdropSaturate, borderColor, borderOpacity,
      blurred = false,
      className,
      elevated = false,
      elevation,
      radius,
      selectionRadius,
      selectionVariant = "soft",
      style,
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
    const effects = surfaceEffects({ treatment, backgroundOpacity, backdropBlur, backdropSaturate, borderColor, borderOpacity }, blurred);
    return (
      <AtomBottomNavigation.Root
        {...props}
        {...effects.attributes}
        className={mergeClassName("brick-bottom-navigation", className)}
        {...responsiveDataAttributes("data-arrangement", arrangement, { defaultValue: "equal", alwaysInitial: true })}
        data-blurred={effects.blurred ? "" : undefined}
        data-elevated={(elevation ?? (elevated ? "low" : "none")) !== "none" ? "" : undefined}
        data-elevation={elevation ?? (elevated ? "low" : "none")}
        data-layout={layout}
        data-safe-area={safeArea ? "" : undefined}
        data-selection={selection}
        data-selection-shape={selectionShape}
        data-selection-variant={selectionVariant}
        {...responsiveDataAttributes("data-size", size, { defaultValue: "md", alwaysInitial: true })}
        data-slot={dataSlot ?? "bottom-navigation"}
        data-tone={tone}
        data-variant={variant}
        style={radiusStyle(radius, "--brick-bottom-navigation-radius-input",
          radiusStyle(selectionRadius, "--brick-bottom-navigation-selection-radius-input", { ...effects.style, ...style }))}
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

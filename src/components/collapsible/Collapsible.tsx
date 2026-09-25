import { radiusStyle, type Radius } from "../_radius/Radius.js";
import { forwardRef, useEffect } from "react";
import { staticPart, type StaticPartProps } from "../_internal/StaticPart.js";
import { layoutHost } from "../_internal/layout-host.js";
import { responsiveDataAttributes, type ResponsiveValue } from "../_responsive-value/ResponsiveValue.js";
import {
  Collapsible as AtomCollapsible,
  type CollapsibleContentProps as AtomCollapsibleContentProps,
  type CollapsibleRootProps as AtomCollapsibleRootProps,
  type CollapsibleTriggerProps as AtomCollapsibleTriggerProps,
  type CollapsibleIndicatorProps as AtomCollapsibleIndicatorProps,
  type CollapsibleRootProviderProps as AtomCollapsibleRootProviderProps,
  useCollapsibleContext,
} from "@flowstack-ui/atom/collapsible";
export {
  useCollapsible,
  useCollapsibleContext,
  CollapsibleContext,
  type UseCollapsibleOptions,
  type UseCollapsibleReturn,
} from "@flowstack-ui/atom/collapsible";

export type CollapsibleVariant = "plain" | "soft" | "outline";
export type CollapsibleSize = "sm" | "md" | "lg";

export interface CollapsibleRootProps extends AtomCollapsibleRootProps {
  radius?: Radius;
  variant?: ResponsiveValue<CollapsibleVariant>;
  size?: ResponsiveValue<CollapsibleSize>;
  unstyled?: boolean;
}
export type CollapsibleRootProviderProps = AtomCollapsibleRootProviderProps &
  Pick<CollapsibleRootProps, "radius" | "variant" | "size" | "unstyled">;
export type CollapsibleHighlight = "none" | "hover" | "open" | "both";
export type CollapsibleTriggerProps = AtomCollapsibleTriggerProps & {
  iconOnly?: boolean;
  highlight?: CollapsibleHighlight;
  unstyled?: boolean;
};
export type CollapsibleContentProps = AtomCollapsibleContentProps & {
  motion?: "auto" | "none";
};
export type CollapsibleIndicatorProps = Omit<AtomCollapsibleIndicatorProps, "aria-hidden"> & {
  placement?: "start" | "end" | "inline";
};
export type CollapsibleContentInnerProps = StaticPartProps & {
  inset?: "auto" | "none";
};

function classes(base: string, className?: string) {
  return className ? `${base} ${className}` : base;
}

export const CollapsibleRoot = forwardRef<HTMLDivElement, CollapsibleRootProps>(
  function CollapsibleRoot(
    {
      className,
      radius,
      style,
      size = "md",
      variant = "plain",
      unstyled,
      "data-slot": slot,
      ...props
    },
    ref,
  ) {
    return (
      <AtomCollapsible.Root
        {...props}
        className={classes("brick-collapsible", className)}
        style={radiusStyle(radius, "--brick-collapsible-radius", style)}
        {...responsiveDataAttributes("data-size", size, {defaultValue:"md",alwaysInitial:true})}
        data-unstyled={unstyled ? "" : undefined}
        data-slot={slot ?? "collapsible-root"}
        {...responsiveDataAttributes("data-variant", variant, {defaultValue:"plain",alwaysInitial:true})}
        ref={ref}
      />
    );
  },
);

export const CollapsibleRootProvider = forwardRef<
  HTMLDivElement,
  CollapsibleRootProviderProps
>(function CollapsibleRootProvider(
  {
    className,
    radius,
    style,
    size = "md",
    variant = "plain",
    unstyled,
    "data-slot": slot,
    ...props
  },
  ref,
) {
  return (
    <AtomCollapsible.RootProvider
      {...props}
      ref={ref}
      className={classes("brick-collapsible", className)}
      style={radiusStyle(radius, "--brick-collapsible-radius", style)}
      {...responsiveDataAttributes("data-size", size, {defaultValue:"md",alwaysInitial:true})}
      {...responsiveDataAttributes("data-variant", variant, {defaultValue:"plain",alwaysInitial:true})}
      data-unstyled={unstyled ? "" : undefined}
      data-slot={slot ?? "collapsible-root"}
    />
  );
});

export const CollapsibleTrigger = forwardRef<
  HTMLButtonElement,
  CollapsibleTriggerProps
>(function CollapsibleTrigger(
  {
    className,
    iconOnly = false,
    highlight,
    unstyled,
    "data-slot": slot,
    ...props
  },
  ref,
) {
  useEffect(() => {
    if (unstyled && (iconOnly || highlight !== undefined))
      console.warn(
        "Collapsible.Trigger: unstyled delegates visuals to the child; iconOnly and highlight are ignored.",
      );
  }, [unstyled, iconOnly, highlight]);
  return (
    <AtomCollapsible.Trigger
      {...props}
      className={classes("brick-collapsible-trigger", className)}
      data-icon-only={iconOnly ? "" : undefined}
      data-highlight={highlight ?? "both"}
      data-unstyled={unstyled ? "" : undefined}
      data-slot={slot ?? "collapsible-trigger"}
      ref={ref}
    />
  );
});

export const CollapsibleIndicator = forwardRef<
  HTMLSpanElement,
  CollapsibleIndicatorProps
>(function CollapsibleIndicator(
  { children, className, placement = "end", "data-slot": slot, ...props },
  ref,
) {
  return (
    <AtomCollapsible.Indicator
      {...props}
      aria-hidden="true"
      className={classes("brick-collapsible-indicator", className)}
      data-placement={placement}
      data-slot={slot ?? "collapsible-indicator"}
      ref={ref}
    >
      {children ?? (
        <svg fill="none" viewBox="0 0 16 16">
          <path
            d="m3.5 6 4.5 4.5L12.5 6"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </svg>
      )}
    </AtomCollapsible.Indicator>
  );
});

export const CollapsibleContent = forwardRef<
  HTMLDivElement,
  CollapsibleContentProps
>(function CollapsibleContent(
  { className, motion = "auto", "data-slot": slot, ...props },
  ref,
) {
  return (
    <AtomCollapsible.Content
      {...props}
      className={classes("brick-collapsible-content", className)}
      data-motion={motion}
      data-slot={slot ?? "collapsible-content"}
      ref={ref}
    />
  );
});

export const CollapsibleContentInner = forwardRef<
  HTMLElement,
  CollapsibleContentInnerProps
>(function CollapsibleContentInner({ inset = "auto", ...props }, ref) {
  const { orientation } = useCollapsibleContext();
  if (props.asChild) {
    const { asChild, children, className, "data-slot": slot, ...native } = props;
    return layoutHost(children, { ...native, className: classes("brick-collapsible-content-inner", className), "data-slot": slot ?? "collapsible-content-inner", "data-inset": inset, "data-orientation": orientation }, ref, "Collapsible.ContentInner");
  }
  return staticPart(
    "div",
    { ...props, "data-inset": inset, "data-orientation": orientation },
    ref,
    "brick-collapsible-content-inner",
    "collapsible-content-inner",
  );
});

CollapsibleRoot.displayName = "Collapsible.Root";
CollapsibleTrigger.displayName = "Collapsible.Trigger";
CollapsibleIndicator.displayName = "Collapsible.Indicator";
CollapsibleContent.displayName = "Collapsible.Content";
CollapsibleContentInner.displayName = "Collapsible.ContentInner";

export const Collapsible = Object.freeze({
  Root: CollapsibleRoot,
  RootProvider: CollapsibleRootProvider,
  Context: AtomCollapsible.Context,
  Trigger: CollapsibleTrigger,
  Indicator: CollapsibleIndicator,
  Content: CollapsibleContent,
  ContentInner: CollapsibleContentInner,
});

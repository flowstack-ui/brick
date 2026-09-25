import { radiusStyle, type Radius } from "../_radius/Radius.js";
import { forwardRef, createContext, useContext } from "react";
import { staticPart, type StaticPartProps } from "../_internal/StaticPart.js";
import { layoutHost } from "../_internal/layout-host.js";
import {
  responsiveDataAttributes,
  type ResponsiveValue,
} from "../_responsive-value/ResponsiveValue.js";
import {
  Accordion as AtomAccordion,
  type AccordionContentProps as AtomAccordionContentProps,
  type AccordionHeaderProps as AtomAccordionHeaderProps,
  type AccordionItemProps as AtomAccordionItemProps,
  type AccordionRootProps as AtomAccordionRootProps,
  type AccordionTriggerProps as AtomAccordionTriggerProps,
  type AccordionIndicatorProps as AtomAccordionIndicatorProps,
  type AccordionRootProviderProps as AtomAccordionRootProviderProps,
  useAccordionContext,
} from "@flowstack-ui/atom/accordion";
export {
  useAccordion,
  useAccordionContext,
  useAccordionItemContext,
  AccordionContext,
  AccordionItemContext,
  type UseAccordionOptions,
  type UseAccordionReturn,
} from "@flowstack-ui/atom/accordion";

export type AccordionVariant =
  | "plain"
  | "ghost"
  | "soft"
  | "outline"
  | "subtle"
  | "enclosed";
export type AccordionSize = "sm" | "md" | "lg" | "xl";
export type AccordionIndicatorPlacement = "start" | "end";

export type AccordionRootProps = AtomAccordionRootProps & {
  radius?: Radius;
  variant?: ResponsiveValue<AccordionVariant>;
  size?: ResponsiveValue<AccordionSize>;
  unstyled?: boolean;
  indicatorPlacement?: AccordionIndicatorPlacement;
};
export type AccordionItemProps = AtomAccordionItemProps;
export type AccordionHeaderProps = AtomAccordionHeaderProps;
export type AccordionTriggerProps = AtomAccordionTriggerProps & {
  unstyled?: boolean;
};
export type AccordionContentProps = AtomAccordionContentProps & {
  motion?: "auto" | "none";
};
export type AccordionRootProviderProps = AtomAccordionRootProviderProps &
  Pick<
    AccordionRootProps,
    "radius" | "variant" | "size" | "indicatorPlacement" | "unstyled"
  >;

export type AccordionIndicatorProps = AtomAccordionIndicatorProps;
export type AccordionContentInnerProps = StaticPartProps & {
  inset?: "auto" | "none";
};
const RecipeContext = createContext({
  placement: "end" as AccordionIndicatorPlacement,
  unstyled: false,
});

function classes(base: string, className?: string) {
  return className ? `${base} ${className}` : base;
}

export const AccordionRoot = forwardRef<HTMLDivElement, AccordionRootProps>(
  function AccordionRoot(
    {
      className,
      radius,
      style,
      indicatorPlacement = "end",
      size = "md",
      variant = "plain",
      unstyled = false,
      "data-slot": slot,
      ...props
    },
    ref,
  ) {
    return (
      <RecipeContext.Provider
        value={{ placement: indicatorPlacement, unstyled }}
      >
        <AtomAccordion.Root
          {...props}
          className={classes("brick-accordion", className)}
          style={radiusStyle(radius, "--brick-accordion-radius", style)}
          data-indicator-placement={indicatorPlacement}
          {...responsiveDataAttributes("data-size", size, {
            defaultValue: "md",
            alwaysInitial: true,
          })}
          data-slot={slot ?? "accordion-root"}
          {...responsiveDataAttributes("data-variant", variant, {
            defaultValue: "plain",
            alwaysInitial: true,
          })}
          data-unstyled={unstyled ? "" : undefined}
          ref={ref}
        />
      </RecipeContext.Provider>
    );
  },
);

export const AccordionRootProvider = forwardRef<
  HTMLDivElement,
  AccordionRootProviderProps
>(function AccordionRootProvider(
  {
    className,
    radius,
    style,
    indicatorPlacement = "end",
    size = "md",
    variant = "plain",
    unstyled = false,
    "data-slot": slot,
    ...props
  },
  ref,
) {
  return (
    <RecipeContext.Provider value={{ placement: indicatorPlacement, unstyled }}>
      <AtomAccordion.RootProvider
        {...props}
        ref={ref}
        className={classes("brick-accordion", className)}
        style={radiusStyle(radius, "--brick-accordion-radius", style)}
        data-slot={slot ?? "accordion-root"}
        data-indicator-placement={indicatorPlacement}
        data-unstyled={unstyled ? "" : undefined}
        {...responsiveDataAttributes("data-size", size, {
          defaultValue: "md",
          alwaysInitial: true,
        })}
        {...responsiveDataAttributes("data-variant", variant, {
          defaultValue: "plain",
          alwaysInitial: true,
        })}
      />
    </RecipeContext.Provider>
  );
});

export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  function AccordionItem({ className, "data-slot": slot, ...props }, ref) {
    const recipe = useContext(RecipeContext);
    return (
      <AtomAccordion.Item
        {...props}
        className={classes("brick-accordion-item", className)}
        data-slot={slot ?? "accordion-item"}
        data-unstyled={recipe.unstyled ? "" : undefined}
        ref={ref}
      />
    );
  },
);

export const AccordionHeader = forwardRef<
  HTMLHeadingElement,
  AccordionHeaderProps
>(function AccordionHeader({ className, "data-slot": slot, ...props }, ref) {
  return (
    <AtomAccordion.Header
      {...props}
      className={classes("brick-accordion-header", className)}
      data-slot={slot ?? "accordion-header"}
      ref={ref}
    />
  );
});

export const AccordionTrigger = forwardRef<
  HTMLButtonElement,
  AccordionTriggerProps
>(function AccordionTrigger(
  { className, unstyled, "data-slot": slot, ...props },
  ref,
) {
  const recipe = useContext(RecipeContext);
  return (
    <AtomAccordion.Trigger
      {...props}
      className={classes("brick-accordion-trigger", className)}
      data-slot={slot ?? "accordion-trigger"}
      data-unstyled={(unstyled ?? recipe.unstyled) ? "" : undefined}
      ref={ref}
    />
  );
});

export const AccordionIndicator = forwardRef<
  HTMLSpanElement,
  AccordionIndicatorProps
>(function AccordionIndicator(
  { children, className, "data-slot": slot, ...props },
  ref,
) {
  const recipe = useContext(RecipeContext);
  return (
    <AtomAccordion.Indicator
      {...props}
      aria-hidden="true"
      className={classes("brick-accordion-indicator", className)}
      data-slot={slot ?? "accordion-indicator"}
      data-placement={recipe.placement}
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
    </AtomAccordion.Indicator>
  );
});

export const AccordionContent = forwardRef<
  HTMLDivElement,
  AccordionContentProps
>(function AccordionContent(
  { className, motion = "auto", "data-slot": slot, ...props },
  ref,
) {
  return (
    <AtomAccordion.Content
      {...props}
      className={classes("brick-accordion-content", className)}
      data-slot={slot ?? "accordion-content"}
      data-motion={motion}
      ref={ref}
    />
  );
});

export const AccordionContentInner = forwardRef<
  HTMLElement,
  AccordionContentInnerProps
>(function AccordionContentInner({ inset = "auto", ...props }, ref) {
  const { orientation } = useAccordionContext();
  const recipe = useContext(RecipeContext);
  const attributes: StaticPartProps = {
    ...props,
    "data-inset": recipe.unstyled ? "none" : inset,
    "data-orientation": orientation,
  };
  if (props.asChild) {
    const {
      asChild,
      children,
      className,
      "data-slot": slot,
      ...native
    } = attributes;
    return layoutHost(
      children,
      {
        ...native,
        className: classes("brick-accordion-content-inner", className),
        "data-slot": slot ?? "accordion-content-inner",
      },
      ref,
      "Accordion.ContentInner",
    );
  }
  return staticPart(
    "div",
    attributes,
    ref,
    "brick-accordion-content-inner",
    "accordion-content-inner",
  );
});

AccordionRoot.displayName = "Accordion.Root";
AccordionItem.displayName = "Accordion.Item";
AccordionHeader.displayName = "Accordion.Header";
AccordionTrigger.displayName = "Accordion.Trigger";
AccordionIndicator.displayName = "Accordion.Indicator";
AccordionContent.displayName = "Accordion.Content";
AccordionContentInner.displayName = "Accordion.ContentInner";

export const Accordion = Object.freeze({
  RootProvider: AccordionRootProvider,
  Context: AtomAccordion.Context,
  ItemContext: AtomAccordion.ItemContext,
  Root: AccordionRoot,
  Item: AccordionItem,
  Header: AccordionHeader,
  Trigger: AccordionTrigger,
  Indicator: AccordionIndicator,
  Content: AccordionContent,
  ContentInner: AccordionContentInner,
});

"use client";

import {
  createContext,
  Children,
  cloneElement,
  forwardRef,
  useContext,
  type HTMLAttributes,
  type ReactNode,
  type ReactElement,
} from "react";
import { radiusStyle, type Radius } from "../_radius/Radius.js";
import {
  NavigationMenu as AtomNavigationMenu,
  type NavigationMenuContentProps as AtomNavigationMenuContentProps,
  type NavigationMenuIndicatorProps as AtomNavigationMenuIndicatorProps,
  type NavigationMenuItemProps as AtomNavigationMenuItemProps,
  type NavigationMenuLinkProps as AtomNavigationMenuLinkProps,
  type NavigationMenuListProps as AtomNavigationMenuListProps,
  type NavigationMenuRootProps as AtomNavigationMenuRootProps,
  type NavigationMenuSubProps as AtomNavigationMenuSubProps,
  type NavigationMenuTriggerProps as AtomNavigationMenuTriggerProps,
  type NavigationMenuViewportProps as AtomNavigationMenuViewportProps,
  type NavigationMenuItemIndicatorProps,
  type NavigationMenuRootProviderProps as AtomRootProviderProps,
} from "@flowstack-ui/atom/navigation-menu";
export {
  useNavigationMenu,
  useNavigationMenuContext,
  type UseNavigationMenuOptions,
  type UseNavigationMenuReturn,
  type NavigationMenuApi,
} from "@flowstack-ui/atom/navigation-menu";
export type { NavigationMenuItemIndicatorProps };
export const NavigationMenuContext = AtomNavigationMenu.Context;
export interface NavigationMenuRootProviderProps extends AtomRootProviderProps {
  size?: NavigationMenuSize;
  variant?: NavigationMenuVariant;
  tone?: NavigationMenuTone;
}

export type NavigationMenuSize = "sm" | "md" | "lg";
export type NavigationMenuLinkVariant = "control" | "destination" | "panel";
export type NavigationMenuVariant = "subtle" | "plain";
export type NavigationMenuTone = "neutral" | "accent" | "contrast";
type NavigationMenuRecipe = {
  viewport: boolean;
  size: NavigationMenuSize;
  variant: NavigationMenuVariant;
  tone: NavigationMenuTone;
};
export interface NavigationMenuRootProps extends AtomNavigationMenuRootProps {
  size?: NavigationMenuSize;
  variant?: NavigationMenuVariant;
  tone?: NavigationMenuTone;
}
export type NavigationMenuSubProps = AtomNavigationMenuSubProps;
export interface NavigationMenuListProps extends AtomNavigationMenuListProps {
  surface?: "transparent" | "raised";
}
export type NavigationMenuItemProps = AtomNavigationMenuItemProps;
export interface NavigationMenuTriggerProps
  extends AtomNavigationMenuTriggerProps {
  variant?: NavigationMenuVariant;
  tone?: NavigationMenuTone;
  radius?: Radius;
  /** Undefined supplies the default chevron; null removes it; custom replaces. */
  indicator?: ReactNode;
}
export type NavigationMenuInset = "none" | "sm" | "md" | "lg";
export interface NavigationMenuContentProps
  extends AtomNavigationMenuContentProps {
  inset?: NavigationMenuInset;
}
export interface NavigationMenuLinkProps extends AtomNavigationMenuLinkProps {
  variant?: NavigationMenuLinkVariant;
  controlVariant?: NavigationMenuVariant;
  tone?: NavigationMenuTone;
  radius?: Radius;
}
export type NavigationMenuIndicatorProps = AtomNavigationMenuIndicatorProps;
export interface NavigationMenuIndicatorArrowProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  "data-slot"?: string;
}
export interface NavigationMenuViewportProps
  extends AtomNavigationMenuViewportProps {
  radius?: Radius;
}

const RecipeContext = createContext<NavigationMenuRecipe>({
  viewport: true,
  size: "md",
  variant: "subtle",
  tone: "neutral",
});
// Presentation follows React ownership even when Atom moves Content into Viewport.
const LinkPresentationContext = createContext<"control" | "destination">(
  "control",
);
const merge = (base: string, className?: string) =>
  className ? `${base} ${className}` : base;
const slot = (value: string | undefined, fallback: string) => value ?? fallback;

export const NavigationMenuRoot = forwardRef<
  HTMLElement,
  NavigationMenuRootProps
>(function NavigationMenuRoot(
  {
    children,
    className,
    size = "md",
    variant = "subtle",
    tone = "neutral",
    "data-slot": dataSlot,
    ...props
  },
  ref,
) {
  return (
    <RecipeContext.Provider
      value={{ size, variant, tone, viewport: props.viewport !== false }}
    >
      <AtomNavigationMenu.Root
        {...props}
        className={merge("brick-navigation-menu", className)}
        data-size={size}
        data-variant={variant}
        data-tone={tone}
        data-viewport={props.viewport === false ? "inline" : "shared"}
        data-slot={slot(dataSlot, "navigation-menu")}
        ref={ref}
      >
        {children}
      </AtomNavigationMenu.Root>
    </RecipeContext.Provider>
  );
});
export const NavigationMenuRootProvider = forwardRef<
  HTMLElement,
  NavigationMenuRootProviderProps
>(function NavigationMenuRootProvider(
  {
    children,
    className,
    size = "md",
    variant = "subtle",
    tone = "neutral",
    value,
    "data-slot": dataSlot,
    ...props
  },
  ref,
) {
  return (
    <RecipeContext.Provider
      value={{
        size,
        variant,
        tone,
        viewport: value.rootProps.viewport !== false,
      }}
    >
      <AtomNavigationMenu.RootProvider
        {...props}
        value={value}
        className={merge("brick-navigation-menu", className)}
        data-size={size}
        data-variant={variant}
        data-tone={tone}
        data-viewport={value.rootProps.viewport === false ? "inline" : "shared"}
        data-slot={slot(dataSlot, "navigation-menu")}
        ref={ref}
      >
        {children}
      </AtomNavigationMenu.RootProvider>
    </RecipeContext.Provider>
  );
});
export const NavigationMenuSub = forwardRef<
  HTMLDivElement,
  NavigationMenuSubProps
>(function NavigationMenuSub(
  { children, className, "data-slot": dataSlot, ...props },
  ref,
) {
  const recipe = useContext(RecipeContext);
  const viewport = props.viewport ?? recipe.viewport;
  return (
    <RecipeContext.Provider value={{ ...recipe, viewport }}>
      <AtomNavigationMenu.Sub
        {...props}
        className={merge("brick-navigation-menu__sub", className)}
        data-size={recipe.size}
        data-viewport={viewport ? "shared" : "inline"}
        data-slot={slot(dataSlot, "navigation-menu-sub")}
        ref={ref}
      >
        {children}
      </AtomNavigationMenu.Sub>
    </RecipeContext.Provider>
  );
});
export const NavigationMenuList = forwardRef<
  HTMLUListElement,
  NavigationMenuListProps
>(function NavigationMenuList(
  { className, surface = "transparent", "data-slot": dataSlot, ...props },
  ref,
) {
  return (
    <LinkPresentationContext.Provider value="control">
      <AtomNavigationMenu.List
        {...props}
        className={merge("brick-navigation-menu__list", className)}
        data-slot={slot(dataSlot, "navigation-menu-list")}
        data-surface={surface}
        ref={ref}
      />
    </LinkPresentationContext.Provider>
  );
});
export const NavigationMenuItem = forwardRef<
  HTMLLIElement,
  NavigationMenuItemProps
>(function NavigationMenuItem(
  { className, "data-slot": dataSlot, ...props },
  ref,
) {
  return (
    <AtomNavigationMenu.Item
      {...props}
      className={merge("brick-navigation-menu__item", className)}
      data-slot={slot(dataSlot, "navigation-menu-item")}
      ref={ref}
    />
  );
});
export const NavigationMenuTrigger = forwardRef<
  HTMLButtonElement,
  NavigationMenuTriggerProps
>(function NavigationMenuTrigger(
  {
    children,
    indicator,
    className,
    variant,
    tone,
    radius,
    style,
    "data-slot": dataSlot,
    ...props
  },
  ref,
) {
  const recipe = useContext(RecipeContext);
  const artwork =
    indicator === null ? null : (
      <span className="brick-navigation-menu__adornment" aria-hidden="true">
        {indicator === undefined ? <NavigationMenuItemIndicator /> : indicator}
      </span>
    );
  let content = children;
  if (artwork) {
    if (props.asChild) {
      const child = Children.only(children) as ReactElement<{
        children?: ReactNode;
      }>;
      content = cloneElement(child, undefined, child.props.children, artwork);
    } else
      content = (
        <>
          {children}
          {artwork}
        </>
      );
  }
  return (
    <AtomNavigationMenu.Trigger
      {...props}
      className={merge("brick-navigation-menu__trigger", className)}
      data-control-variant={variant ?? recipe.variant}
      data-tone={tone ?? recipe.tone}
      style={radiusStyle(
        radius,
        "--brick-navigation-menu-control-radius",
        style,
      )}
      data-slot={slot(dataSlot, "navigation-menu-trigger")}
      ref={ref}
    >
      {content}
    </AtomNavigationMenu.Trigger>
  );
});
export const NavigationMenuContent = forwardRef<
  HTMLDivElement,
  NavigationMenuContentProps
>(function NavigationMenuContent(
  { children, className, inset = "sm", "data-slot": dataSlot, ...props },
  ref,
) {
  // Atom registers the authored children for its shared viewport. Put the
  // presentation boundary inside that payload, preserving an asChild host.
  const wrap = (content: ReactNode) => (
    <LinkPresentationContext.Provider value="destination">
      {content}
    </LinkPresentationContext.Provider>
  );
  const child = props.asChild
    ? (Children.only(children) as ReactElement<{ children?: ReactNode }>)
    : null;
  const content = child
    ? cloneElement(child, undefined, wrap(child.props.children))
    : wrap(children);
  return (
    <AtomNavigationMenu.Content
      {...props}
      className={merge("brick-navigation-menu__content", className)}
      data-inset={inset}
      ref={ref}
      data-slot={slot(dataSlot, "navigation-menu-content")}
    >
      {content}
    </AtomNavigationMenu.Content>
  );
});
export const NavigationMenuItemIndicator = forwardRef<
  HTMLSpanElement,
  NavigationMenuItemIndicatorProps
>(function NavigationMenuItemIndicator(
  { children, className, "data-slot": dataSlot, ...props },
  ref,
) {
  return (
    <AtomNavigationMenu.ItemIndicator
      {...props}
      className={merge("brick-navigation-menu__item-indicator", className)}
      data-slot={slot(dataSlot, "navigation-menu-item-indicator")}
      ref={ref}
    >
      {children === undefined ? (
        <span className="brick-navigation-menu__chevron" />
      ) : (
        children
      )}
    </AtomNavigationMenu.ItemIndicator>
  );
});
export const NavigationMenuLink = forwardRef<
  HTMLAnchorElement,
  NavigationMenuLinkProps
>(function NavigationMenuLink(
  {
    className,
    "data-slot": dataSlot,
    variant,
    controlVariant,
    tone,
    radius,
    style,
    ...props
  },
  ref,
) {
  const recipe = useContext(RecipeContext);
  const inheritedPresentation = useContext(LinkPresentationContext);
  const presentation = variant ?? inheritedPresentation;
  return (
    <AtomNavigationMenu.Link
      {...props}
      className={merge("brick-navigation-menu__link", className)}
      data-slot={slot(dataSlot, "navigation-menu-link")}
      data-variant={presentation}
      data-control-variant={controlVariant ?? recipe.variant}
      data-tone={tone ?? recipe.tone}
      style={radiusStyle(
        radius,
        presentation === "destination"
          ? "--brick-navigation-menu-destination-radius"
          : "--brick-navigation-menu-control-radius",
        style,
      )}
      ref={ref}
    />
  );
});
export const NavigationMenuIndicatorArrow = forwardRef<
  HTMLSpanElement,
  NavigationMenuIndicatorArrowProps
>(function NavigationMenuIndicatorArrow(
  { className, "data-slot": dataSlot, ...props },
  ref,
) {
  return (
    <span
      {...props}
      aria-hidden="true"
      className={merge("brick-navigation-menu__indicator-arrow", className)}
      data-slot={slot(dataSlot, "navigation-menu-indicator-arrow")}
      ref={ref}
    />
  );
});
export const NavigationMenuIndicator = forwardRef<
  HTMLDivElement,
  NavigationMenuIndicatorProps
>(function NavigationMenuIndicator(
  { children, className, "data-slot": dataSlot, ...props },
  ref,
) {
  return (
    <AtomNavigationMenu.Indicator
      {...props}
      className={merge("brick-navigation-menu__indicator", className)}
      data-slot={slot(dataSlot, "navigation-menu-indicator")}
      ref={ref}
    >
      {children === undefined ? <NavigationMenuIndicatorArrow /> : children}
    </AtomNavigationMenu.Indicator>
  );
});
export const NavigationMenuViewport = forwardRef<
  HTMLDivElement,
  NavigationMenuViewportProps
>(function NavigationMenuViewport(
  { className, radius, style, "data-slot": dataSlot, ...props },
  ref,
) {
  return (
    <AtomNavigationMenu.Viewport
      {...props}
      className={merge("brick-navigation-menu__viewport", className)}
      style={radiusStyle(
        radius,
        "--brick-navigation-menu-viewport-radius",
        style,
      )}
      data-slot={slot(dataSlot, "navigation-menu-viewport")}
      ref={ref}
    />
  );
});

for (const [component, name] of [
  [NavigationMenuRoot, "Root"],
  [NavigationMenuRootProvider, "RootProvider"],
  [NavigationMenuContent, "Content"],
  [NavigationMenuItemIndicator, "ItemIndicator"],
  [NavigationMenuSub, "Sub"],
  [NavigationMenuList, "List"],
  [NavigationMenuItem, "Item"],
  [NavigationMenuTrigger, "Trigger"],
  [NavigationMenuLink, "Link"],
  [NavigationMenuIndicator, "Indicator"],
  [NavigationMenuIndicatorArrow, "IndicatorArrow"],
  [NavigationMenuViewport, "Viewport"],
] as const)
  component.displayName = `NavigationMenu.${name}`;

export const NavigationMenu = Object.freeze({
  Root: NavigationMenuRoot,
  RootProvider: NavigationMenuRootProvider,
  Context: NavigationMenuContext,
  ItemIndicator: NavigationMenuItemIndicator,
  Sub: NavigationMenuSub,
  List: NavigationMenuList,
  Item: NavigationMenuItem,
  Trigger: NavigationMenuTrigger,
  Content: NavigationMenuContent,
  Link: NavigationMenuLink,
  Indicator: NavigationMenuIndicator,
  IndicatorArrow: NavigationMenuIndicatorArrow,
  Viewport: NavigationMenuViewport,
});

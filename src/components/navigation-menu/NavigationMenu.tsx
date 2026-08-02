"use client";

import { createContext, forwardRef, useContext, type HTMLAttributes } from "react";
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
} from "@flowstack-ui/atom/navigation-menu";

export type NavigationMenuSize = "sm" | "md" | "lg";
export interface NavigationMenuRootProps extends AtomNavigationMenuRootProps { size?: NavigationMenuSize }
export type NavigationMenuSubProps = AtomNavigationMenuSubProps;
export type NavigationMenuListProps = AtomNavigationMenuListProps;
export type NavigationMenuItemProps = AtomNavigationMenuItemProps;
export type NavigationMenuTriggerProps = AtomNavigationMenuTriggerProps;
export type NavigationMenuContentProps = AtomNavigationMenuContentProps;
export type NavigationMenuLinkProps = AtomNavigationMenuLinkProps;
export type NavigationMenuIndicatorProps = AtomNavigationMenuIndicatorProps;
export interface NavigationMenuIndicatorArrowProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> { "data-slot"?: string }
export type NavigationMenuViewportProps = AtomNavigationMenuViewportProps;

const SizeContext = createContext<NavigationMenuSize>("md");
const merge = (base: string, className?: string) => className ? `${base} ${className}` : base;
const slot = (value: string | undefined, fallback: string) => value ?? fallback;

export const NavigationMenuRoot = forwardRef<HTMLElement, NavigationMenuRootProps>(function NavigationMenuRoot({ children, className, size = "md", "data-slot": dataSlot, ...props }, ref) {
  return <SizeContext.Provider value={size}><AtomNavigationMenu.Root {...props} className={merge("brick-navigation-menu", className)} data-size={size} data-slot={slot(dataSlot, "navigation-menu")} ref={ref}>{children}</AtomNavigationMenu.Root></SizeContext.Provider>;
});
export const NavigationMenuSub = forwardRef<HTMLDivElement, NavigationMenuSubProps>(function NavigationMenuSub({ className, "data-slot": dataSlot, ...props }, ref) {
  const size = useContext(SizeContext);
  return <AtomNavigationMenu.Sub {...props} className={merge("brick-navigation-menu__sub", className)} data-size={size} data-slot={slot(dataSlot, "navigation-menu-sub")} ref={ref} />;
});
export const NavigationMenuList = forwardRef<HTMLUListElement, NavigationMenuListProps>(function NavigationMenuList({ className, "data-slot": dataSlot, ...props }, ref) {
  return <AtomNavigationMenu.List {...props} className={merge("brick-navigation-menu__list", className)} data-slot={slot(dataSlot, "navigation-menu-list")} ref={ref} />;
});
export const NavigationMenuItem = forwardRef<HTMLLIElement, NavigationMenuItemProps>(function NavigationMenuItem({ className, "data-slot": dataSlot, ...props }, ref) {
  return <AtomNavigationMenu.Item {...props} className={merge("brick-navigation-menu__item", className)} data-slot={slot(dataSlot, "navigation-menu-item")} ref={ref} />;
});
export const NavigationMenuTrigger = forwardRef<HTMLButtonElement, NavigationMenuTriggerProps>(function NavigationMenuTrigger({ className, "data-slot": dataSlot, ...props }, ref) {
  return <AtomNavigationMenu.Trigger {...props} className={merge("brick-navigation-menu__trigger", className)} data-slot={slot(dataSlot, "navigation-menu-trigger")} ref={ref} />;
});
export function NavigationMenuContent({ className, "data-slot": dataSlot, ...props }: NavigationMenuContentProps) {
  return <AtomNavigationMenu.Content {...props} className={merge("brick-navigation-menu__content", className)} data-slot={slot(dataSlot, "navigation-menu-content")} />;
}
export const NavigationMenuLink = forwardRef<HTMLAnchorElement, NavigationMenuLinkProps>(function NavigationMenuLink({ className, "data-slot": dataSlot, ...props }, ref) {
  return <AtomNavigationMenu.Link {...props} className={merge("brick-navigation-menu__link", className)} data-slot={slot(dataSlot, "navigation-menu-link")} ref={ref} />;
});
export const NavigationMenuIndicatorArrow = forwardRef<HTMLSpanElement, NavigationMenuIndicatorArrowProps>(function NavigationMenuIndicatorArrow({ className, "data-slot": dataSlot, ...props }, ref) {
  return <span {...props} aria-hidden="true" className={merge("brick-navigation-menu__indicator-arrow", className)} data-slot={slot(dataSlot, "navigation-menu-indicator-arrow")} ref={ref} />;
});
export const NavigationMenuIndicator = forwardRef<HTMLDivElement, NavigationMenuIndicatorProps>(function NavigationMenuIndicator({ children, className, "data-slot": dataSlot, ...props }, ref) {
  return <AtomNavigationMenu.Indicator {...props} className={merge("brick-navigation-menu__indicator", className)} data-slot={slot(dataSlot, "navigation-menu-indicator")} ref={ref}>{children === undefined ? <NavigationMenuIndicatorArrow /> : children}</AtomNavigationMenu.Indicator>;
});
export const NavigationMenuViewport = forwardRef<HTMLDivElement, NavigationMenuViewportProps>(function NavigationMenuViewport({ className, "data-slot": dataSlot, ...props }, ref) {
  return <AtomNavigationMenu.Viewport {...props} className={merge("brick-navigation-menu__viewport", className)} data-slot={slot(dataSlot, "navigation-menu-viewport")} ref={ref} />;
});

for (const [component, name] of [[NavigationMenuRoot, "Root"], [NavigationMenuSub, "Sub"], [NavigationMenuList, "List"], [NavigationMenuItem, "Item"], [NavigationMenuTrigger, "Trigger"], [NavigationMenuLink, "Link"], [NavigationMenuIndicator, "Indicator"], [NavigationMenuIndicatorArrow, "IndicatorArrow"], [NavigationMenuViewport, "Viewport"]] as const) component.displayName = `NavigationMenu.${name}`;

export const NavigationMenu = Object.freeze({ Root: NavigationMenuRoot, Sub: NavigationMenuSub, List: NavigationMenuList, Item: NavigationMenuItem, Trigger: NavigationMenuTrigger, Content: NavigationMenuContent, Link: NavigationMenuLink, Indicator: NavigationMenuIndicator, IndicatorArrow: NavigationMenuIndicatorArrow, Viewport: NavigationMenuViewport });

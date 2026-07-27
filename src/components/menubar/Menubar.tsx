"use client";

import { createContext, forwardRef, useContext } from "react";
import {
  Menubar as AtomMenubar,
  type MenuArrowProps as AtomMenuArrowProps,
  type MenuCheckboxItemProps as AtomMenuCheckboxItemProps,
  type MenuGroupProps as AtomMenuGroupProps,
  type MenuItemIndicatorProps as AtomMenuItemIndicatorProps,
  type MenuItemProps as AtomMenuItemProps,
  type MenuLabelProps as AtomMenuLabelProps,
  type MenuPortalProps as AtomMenuPortalProps,
  type MenuRadioGroupProps as AtomMenuRadioGroupProps,
  type MenuRadioItemProps as AtomMenuRadioItemProps,
  type MenuSeparatorProps as AtomMenuSeparatorProps,
  type MenuSubContentProps as AtomMenuSubContentProps,
  type MenuSubRootProps as AtomMenuSubRootProps,
  type MenuSubTriggerProps as AtomMenuSubTriggerProps,
  type MenubarContentProps as AtomMenubarContentProps,
  type MenubarMenuProps as AtomMenubarMenuProps,
  type MenubarRootProps as AtomMenubarRootProps,
  type MenubarTriggerProps as AtomMenubarTriggerProps,
} from "@flowstack-ui/atom/menubar";
import { createStaticSpanPart, type StaticSpanPartProps } from "../_internal/StaticSpanPart.js";

export type MenubarSize = "sm" | "md" | "lg";
export type MenubarItemTone = "neutral" | "danger";
export interface MenubarRootProps extends AtomMenubarRootProps { size?: MenubarSize }
export type MenubarMenuProps = AtomMenubarMenuProps;
export type MenubarTriggerProps = AtomMenubarTriggerProps;
export type MenubarPortalProps = AtomMenuPortalProps;
export interface MenubarContentProps extends AtomMenubarContentProps { "data-slot"?: string }
export type MenubarArrowProps = AtomMenuArrowProps;
export type MenubarGroupProps = AtomMenuGroupProps;
export type MenubarLabelProps = AtomMenuLabelProps;
export interface MenubarItemProps extends AtomMenuItemProps { tone?: MenubarItemTone }
export interface MenubarCheckboxItemProps extends AtomMenuCheckboxItemProps { tone?: MenubarItemTone }
export type MenubarRadioGroupProps = AtomMenuRadioGroupProps;
export interface MenubarRadioItemProps extends AtomMenuRadioItemProps { tone?: MenubarItemTone }
export type MenubarItemIndicatorProps = AtomMenuItemIndicatorProps;
export type MenubarLeadingProps = StaticSpanPartProps;
export type MenubarItemLabelProps = StaticSpanPartProps;
export type MenubarDescriptionProps = StaticSpanPartProps;
export type MenubarShortcutProps = StaticSpanPartProps;
export type MenubarSeparatorProps = AtomMenuSeparatorProps;
export type MenubarSubProps = AtomMenuSubRootProps;
export interface MenubarSubTriggerProps extends AtomMenuSubTriggerProps { tone?: MenubarItemTone }
export type MenubarSubContentProps = AtomMenuSubContentProps;

const SizeContext = createContext<MenubarSize>("md");
const merge = (base: string, className?: string) => className ? `${base} ${className}` : base;
const slot = (value: string | undefined, fallback: string) => value ?? fallback;

export const MenubarRoot = forwardRef<HTMLElement, MenubarRootProps>(function MenubarRoot({ children, className, size = "md", "data-slot": dataSlot, ...props }, ref) {
  return <SizeContext.Provider value={size}><AtomMenubar.Root {...props} className={merge("brick-menubar", className)} data-size={size} data-slot={slot(dataSlot, "menubar")} ref={ref}>{children}</AtomMenubar.Root></SizeContext.Provider>;
});
export const MenubarMenu = AtomMenubar.Menu;
export const MenubarTrigger = forwardRef<HTMLElement, MenubarTriggerProps>(function MenubarTrigger({ className, "data-slot": dataSlot, ...props }, ref) {
  return <AtomMenubar.Trigger {...props} className={merge("brick-menubar__trigger", className)} data-slot={slot(dataSlot, "menubar-trigger")} ref={ref} />;
});
export const MenubarPortal = AtomMenubar.Portal;
export const MenubarContent = forwardRef<HTMLDivElement, MenubarContentProps>(function MenubarContent({ className, "data-slot": dataSlot, ...props }, ref) {
  const size = useContext(SizeContext);
  const atomProps = { ...props, className: merge("brick-menubar__content", className), "data-size": size, "data-slot": slot(dataSlot, "menubar-content") };
  return <AtomMenubar.Content {...atomProps} ref={ref} />;
});
export const MenubarArrow = forwardRef<SVGSVGElement, MenubarArrowProps>(function MenubarArrow({ className, "data-slot": dataSlot, ...props }, ref) {
  return <AtomMenubar.Arrow {...props} className={merge("brick-menubar__arrow", className)} data-slot={slot(dataSlot, "menubar-arrow")} ref={ref} />;
});
export const MenubarGroup = forwardRef<HTMLElement, MenubarGroupProps>(function MenubarGroup({ className, "data-slot": dataSlot, ...props }, ref) {
  return <AtomMenubar.Group {...props} className={merge("brick-menubar__group", className)} data-slot={slot(dataSlot, "menubar-group")} ref={ref} />;
});
export const MenubarLabel = forwardRef<HTMLElement, MenubarLabelProps>(function MenubarLabel({ className, "data-slot": dataSlot, ...props }, ref) {
  return <AtomMenubar.Label {...props} className={merge("brick-menubar__label", className)} data-slot={slot(dataSlot, "menubar-label")} ref={ref} />;
});
export const MenubarItem = forwardRef<HTMLElement, MenubarItemProps>(function MenubarItem({ className, tone = "neutral", "data-slot": dataSlot, ...props }, ref) {
  return <AtomMenubar.Item {...props} className={merge("brick-menubar__item", className)} data-slot={slot(dataSlot, "menubar-item")} data-tone={tone} ref={ref} />;
});
export const MenubarCheckboxItem = forwardRef<HTMLElement, MenubarCheckboxItemProps>(function MenubarCheckboxItem({ className, tone = "neutral", "data-slot": dataSlot, ...props }, ref) {
  return <AtomMenubar.CheckboxItem {...props} className={merge("brick-menubar__checkbox-item", className)} data-slot={slot(dataSlot, "menubar-checkbox-item")} data-tone={tone} ref={ref} />;
});
export const MenubarRadioGroup = forwardRef<HTMLElement, MenubarRadioGroupProps>(function MenubarRadioGroup({ className, "data-slot": dataSlot, ...props }, ref) {
  return <AtomMenubar.RadioGroup {...props} className={merge("brick-menubar__radio-group", className)} data-slot={slot(dataSlot, "menubar-radio-group")} ref={ref} />;
});
export const MenubarRadioItem = forwardRef<HTMLElement, MenubarRadioItemProps>(function MenubarRadioItem({ className, tone = "neutral", "data-slot": dataSlot, ...props }, ref) {
  return <AtomMenubar.RadioItem {...props} className={merge("brick-menubar__radio-item", className)} data-slot={slot(dataSlot, "menubar-radio-item")} data-tone={tone} ref={ref} />;
});
export const MenubarItemIndicator = forwardRef<HTMLElement, MenubarItemIndicatorProps>(function MenubarItemIndicator({ className, "data-slot": dataSlot, ...props }, ref) {
  return <AtomMenubar.ItemIndicator {...props} className={merge("brick-menubar__item-indicator", className)} data-slot={slot(dataSlot, "menubar-item-indicator")} ref={ref} />;
});
export const MenubarLeading = createStaticSpanPart("brick-menubar__leading", "menubar-leading", "Menubar.Leading");
export const MenubarItemLabel = createStaticSpanPart("brick-menubar__item-label", "menubar-item-label", "Menubar.ItemLabel");
export const MenubarDescription = createStaticSpanPart("brick-menubar__description", "menubar-description", "Menubar.Description");
export const MenubarShortcut = createStaticSpanPart("brick-menubar__shortcut", "menubar-shortcut", "Menubar.Shortcut");
export const MenubarSeparator = forwardRef<HTMLElement, MenubarSeparatorProps>(function MenubarSeparator({ className, "data-slot": dataSlot, ...props }, ref) {
  return <AtomMenubar.Separator {...props} className={merge("brick-menubar__separator", className)} data-slot={slot(dataSlot, "menubar-separator")} ref={ref} />;
});
export const MenubarSub = AtomMenubar.Sub;
export const MenubarSubTrigger = forwardRef<HTMLElement, MenubarSubTriggerProps>(function MenubarSubTrigger({ className, tone = "neutral", "data-slot": dataSlot, ...props }, ref) {
  return <AtomMenubar.SubTrigger {...props} className={merge("brick-menubar__sub-trigger", className)} data-slot={slot(dataSlot, "menubar-sub-trigger")} data-tone={tone} ref={ref} />;
});
export const MenubarSubContent = forwardRef<HTMLDivElement, MenubarSubContentProps>(function MenubarSubContent({ className, "data-slot": dataSlot, ...props }, ref) {
  const size = useContext(SizeContext);
  return <AtomMenubar.SubContent {...props} className={merge("brick-menubar__sub-content", className)} data-size={size} data-slot={slot(dataSlot, "menubar-sub-content")} ref={ref} />;
});

for (const [component, name] of [[MenubarRoot, "Root"], [MenubarTrigger, "Trigger"], [MenubarContent, "Content"], [MenubarArrow, "Arrow"], [MenubarGroup, "Group"], [MenubarLabel, "Label"], [MenubarItem, "Item"], [MenubarCheckboxItem, "CheckboxItem"], [MenubarRadioGroup, "RadioGroup"], [MenubarRadioItem, "RadioItem"], [MenubarItemIndicator, "ItemIndicator"], [MenubarSeparator, "Separator"], [MenubarSubTrigger, "SubTrigger"], [MenubarSubContent, "SubContent"]] as const) component.displayName = `Menubar.${name}`;

export const Menubar = Object.freeze({ Root: MenubarRoot, Menu: MenubarMenu, Trigger: MenubarTrigger, Portal: MenubarPortal, Content: MenubarContent, Arrow: MenubarArrow, Group: MenubarGroup, Label: MenubarLabel, Item: MenubarItem, CheckboxItem: MenubarCheckboxItem, RadioGroup: MenubarRadioGroup, RadioItem: MenubarRadioItem, ItemIndicator: MenubarItemIndicator, Leading: MenubarLeading, ItemLabel: MenubarItemLabel, Description: MenubarDescription, Shortcut: MenubarShortcut, Separator: MenubarSeparator, Sub: MenubarSub, SubTrigger: MenubarSubTrigger, SubContent: MenubarSubContent });

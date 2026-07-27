"use client";

import { createContext, forwardRef, useContext, type ReactNode } from "react";
import {
  ContextMenu as AtomContextMenu,
  type ContextMenuContentProps as AtomContextMenuContentProps,
  type ContextMenuRootProps as AtomContextMenuRootProps,
  type ContextMenuTriggerProps as AtomContextMenuTriggerProps,
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
} from "@flowstack-ui/atom/context-menu";
import { createStaticSpanPart, type StaticSpanPartProps } from "../_internal/StaticSpanPart.js";

export type ContextMenuSize = "sm" | "md" | "lg";
export type ContextMenuItemTone = "neutral" | "danger";
export interface ContextMenuRootProps extends AtomContextMenuRootProps { size?: ContextMenuSize }
export type ContextMenuTriggerProps = AtomContextMenuTriggerProps;
export type ContextMenuPortalProps = AtomMenuPortalProps;
export type ContextMenuContentProps = AtomContextMenuContentProps;
export type ContextMenuArrowProps = AtomMenuArrowProps;
export type ContextMenuGroupProps = AtomMenuGroupProps;
export type ContextMenuLabelProps = AtomMenuLabelProps;
export interface ContextMenuItemProps extends AtomMenuItemProps { tone?: ContextMenuItemTone }
export interface ContextMenuCheckboxItemProps extends AtomMenuCheckboxItemProps { tone?: ContextMenuItemTone }
export type ContextMenuRadioGroupProps = AtomMenuRadioGroupProps;
export interface ContextMenuRadioItemProps extends AtomMenuRadioItemProps { tone?: ContextMenuItemTone }
export type ContextMenuItemIndicatorProps = AtomMenuItemIndicatorProps;
export type ContextMenuLeadingProps = StaticSpanPartProps;
export type ContextMenuItemLabelProps = StaticSpanPartProps;
export type ContextMenuDescriptionProps = StaticSpanPartProps;
export type ContextMenuShortcutProps = StaticSpanPartProps;
export type ContextMenuSeparatorProps = AtomMenuSeparatorProps;
export type ContextMenuSubProps = AtomMenuSubRootProps;
export interface ContextMenuSubTriggerProps extends AtomMenuSubTriggerProps { tone?: ContextMenuItemTone }
export type ContextMenuSubContentProps = AtomMenuSubContentProps;

const SizeContext = createContext<ContextMenuSize>("md");
const merge = (base: string, className?: string) => className ? `${base} ${className}` : base;
const slot = (value: string | undefined, fallback: string) => value ?? fallback;

export function ContextMenuRoot({ children, size = "md", ...props }: ContextMenuRootProps) {
  return <SizeContext.Provider value={size}><AtomContextMenu.Root {...props}>{children as ReactNode}</AtomContextMenu.Root></SizeContext.Provider>;
}

export const ContextMenuTrigger = forwardRef<HTMLElement, ContextMenuTriggerProps>(function ContextMenuTrigger({ className, "data-slot": dataSlot, ...props }, ref) {
  return <AtomContextMenu.Trigger {...props} className={merge("brick-context-menu__trigger", className)} data-slot={slot(dataSlot, "context-menu-trigger")} ref={ref} />;
});
export const ContextMenuPortal = AtomContextMenu.Portal;
export const ContextMenuContent = forwardRef<HTMLDivElement, ContextMenuContentProps>(function ContextMenuContent({ className, "data-slot": dataSlot, ...props }, ref) {
  const size = useContext(SizeContext);
  return <AtomContextMenu.Content {...props} className={merge("brick-context-menu__content", className)} data-size={size} data-slot={slot(dataSlot, "context-menu-content")} ref={ref} />;
});
export const ContextMenuArrow = forwardRef<SVGSVGElement, ContextMenuArrowProps>(function ContextMenuArrow({ className, "data-slot": dataSlot, ...props }, ref) {
  return <AtomContextMenu.Arrow {...props} className={merge("brick-context-menu__arrow", className)} data-slot={slot(dataSlot, "context-menu-arrow")} ref={ref} />;
});
export const ContextMenuGroup = forwardRef<HTMLElement, ContextMenuGroupProps>(function ContextMenuGroup({ className, "data-slot": dataSlot, ...props }, ref) {
  return <AtomContextMenu.Group {...props} className={merge("brick-context-menu__group", className)} data-slot={slot(dataSlot, "context-menu-group")} ref={ref} />;
});
export const ContextMenuLabel = forwardRef<HTMLElement, ContextMenuLabelProps>(function ContextMenuLabel({ className, "data-slot": dataSlot, ...props }, ref) {
  return <AtomContextMenu.Label {...props} className={merge("brick-context-menu__label", className)} data-slot={slot(dataSlot, "context-menu-label")} ref={ref} />;
});
export const ContextMenuItem = forwardRef<HTMLElement, ContextMenuItemProps>(function ContextMenuItem({ className, tone = "neutral", "data-slot": dataSlot, ...props }, ref) {
  return <AtomContextMenu.Item {...props} className={merge("brick-context-menu__item", className)} data-slot={slot(dataSlot, "context-menu-item")} data-tone={tone} ref={ref} />;
});
export const ContextMenuCheckboxItem = forwardRef<HTMLElement, ContextMenuCheckboxItemProps>(function ContextMenuCheckboxItem({ className, tone = "neutral", "data-slot": dataSlot, ...props }, ref) {
  return <AtomContextMenu.CheckboxItem {...props} className={merge("brick-context-menu__checkbox-item", className)} data-slot={slot(dataSlot, "context-menu-checkbox-item")} data-tone={tone} ref={ref} />;
});
export const ContextMenuRadioGroup = forwardRef<HTMLElement, ContextMenuRadioGroupProps>(function ContextMenuRadioGroup({ className, "data-slot": dataSlot, ...props }, ref) {
  return <AtomContextMenu.RadioGroup {...props} className={merge("brick-context-menu__radio-group", className)} data-slot={slot(dataSlot, "context-menu-radio-group")} ref={ref} />;
});
export const ContextMenuRadioItem = forwardRef<HTMLElement, ContextMenuRadioItemProps>(function ContextMenuRadioItem({ className, tone = "neutral", "data-slot": dataSlot, ...props }, ref) {
  return <AtomContextMenu.RadioItem {...props} className={merge("brick-context-menu__radio-item", className)} data-slot={slot(dataSlot, "context-menu-radio-item")} data-tone={tone} ref={ref} />;
});
export const ContextMenuItemIndicator = forwardRef<HTMLElement, ContextMenuItemIndicatorProps>(function ContextMenuItemIndicator({ className, "data-slot": dataSlot, ...props }, ref) {
  return <AtomContextMenu.ItemIndicator {...props} className={merge("brick-context-menu__item-indicator", className)} data-slot={slot(dataSlot, "context-menu-item-indicator")} ref={ref} />;
});
export const ContextMenuLeading = createStaticSpanPart("brick-context-menu__leading", "context-menu-leading", "ContextMenu.Leading");
export const ContextMenuItemLabel = createStaticSpanPart("brick-context-menu__item-label", "context-menu-item-label", "ContextMenu.ItemLabel");
export const ContextMenuDescription = createStaticSpanPart("brick-context-menu__description", "context-menu-description", "ContextMenu.Description");
export const ContextMenuShortcut = createStaticSpanPart("brick-context-menu__shortcut", "context-menu-shortcut", "ContextMenu.Shortcut");
export const ContextMenuSeparator = forwardRef<HTMLElement, ContextMenuSeparatorProps>(function ContextMenuSeparator({ className, "data-slot": dataSlot, ...props }, ref) {
  return <AtomContextMenu.Separator {...props} className={merge("brick-context-menu__separator", className)} data-slot={slot(dataSlot, "context-menu-separator")} ref={ref} />;
});
export const ContextMenuSub = AtomContextMenu.Sub;
export const ContextMenuSubTrigger = forwardRef<HTMLElement, ContextMenuSubTriggerProps>(function ContextMenuSubTrigger({ className, tone = "neutral", "data-slot": dataSlot, ...props }, ref) {
  return <AtomContextMenu.SubTrigger {...props} className={merge("brick-context-menu__sub-trigger", className)} data-slot={slot(dataSlot, "context-menu-sub-trigger")} data-tone={tone} ref={ref} />;
});
export const ContextMenuSubContent = forwardRef<HTMLDivElement, ContextMenuSubContentProps>(function ContextMenuSubContent({ className, "data-slot": dataSlot, ...props }, ref) {
  const size = useContext(SizeContext);
  return <AtomContextMenu.SubContent {...props} className={merge("brick-context-menu__sub-content", className)} data-size={size} data-slot={slot(dataSlot, "context-menu-sub-content")} ref={ref} />;
});

for (const [component, name] of [
  [ContextMenuTrigger, "Trigger"], [ContextMenuContent, "Content"], [ContextMenuArrow, "Arrow"], [ContextMenuGroup, "Group"], [ContextMenuLabel, "Label"], [ContextMenuItem, "Item"], [ContextMenuCheckboxItem, "CheckboxItem"], [ContextMenuRadioGroup, "RadioGroup"], [ContextMenuRadioItem, "RadioItem"], [ContextMenuItemIndicator, "ItemIndicator"], [ContextMenuSeparator, "Separator"], [ContextMenuSubTrigger, "SubTrigger"], [ContextMenuSubContent, "SubContent"],
] as const) component.displayName = `ContextMenu.${name}`;

export const ContextMenu = Object.freeze({ Root: ContextMenuRoot, Trigger: ContextMenuTrigger, Portal: ContextMenuPortal, Content: ContextMenuContent, Arrow: ContextMenuArrow, Group: ContextMenuGroup, Label: ContextMenuLabel, Item: ContextMenuItem, CheckboxItem: ContextMenuCheckboxItem, RadioGroup: ContextMenuRadioGroup, RadioItem: ContextMenuRadioItem, ItemIndicator: ContextMenuItemIndicator, Leading: ContextMenuLeading, ItemLabel: ContextMenuItemLabel, Description: ContextMenuDescription, Shortcut: ContextMenuShortcut, Separator: ContextMenuSeparator, Sub: ContextMenuSub, SubTrigger: ContextMenuSubTrigger, SubContent: ContextMenuSubContent });

"use client";

import { createContext, forwardRef, useContext, type ReactNode } from "react";
import {
  DropdownMenu as AtomDropdownMenu,
  type DropdownMenuTriggerProps as AtomDropdownMenuTriggerProps,
  type MenuArrowProps as AtomMenuArrowProps,
  type MenuCheckboxItemProps as AtomMenuCheckboxItemProps,
  type MenuContentProps as AtomMenuContentProps,
  type MenuGroupProps as AtomMenuGroupProps,
  type MenuItemIndicatorProps as AtomMenuItemIndicatorProps,
  type MenuItemProps as AtomMenuItemProps,
  type MenuLabelProps as AtomMenuLabelProps,
  type MenuPortalProps as AtomMenuPortalProps,
  type MenuRadioGroupProps as AtomMenuRadioGroupProps,
  type MenuRadioItemProps as AtomMenuRadioItemProps,
  type MenuRootProps as AtomMenuRootProps,
  type MenuSeparatorProps as AtomMenuSeparatorProps,
  type MenuSubContentProps as AtomMenuSubContentProps,
  type MenuSubRootProps as AtomMenuSubRootProps,
  type MenuSubTriggerProps as AtomMenuSubTriggerProps,
} from "@flowstack-ui/atom/dropdown-menu";
import {
  createStaticSpanPart,
  type StaticSpanPartProps,
} from "../_internal/StaticSpanPart.js";

export type DropdownMenuSize = "sm" | "md" | "lg";
export type DropdownMenuItemTone = "neutral" | "danger";

export interface DropdownMenuRootProps extends AtomMenuRootProps {
  size?: DropdownMenuSize;
}
export type DropdownMenuTriggerProps = AtomDropdownMenuTriggerProps;
export type DropdownMenuPortalProps = AtomMenuPortalProps;
export type DropdownMenuContentProps = AtomMenuContentProps;
export type DropdownMenuArrowProps = AtomMenuArrowProps;
export type DropdownMenuGroupProps = AtomMenuGroupProps;
export type DropdownMenuLabelProps = AtomMenuLabelProps;
export interface DropdownMenuItemProps extends AtomMenuItemProps {
  tone?: DropdownMenuItemTone;
}
export interface DropdownMenuCheckboxItemProps extends AtomMenuCheckboxItemProps {
  tone?: DropdownMenuItemTone;
}
export type DropdownMenuRadioGroupProps = AtomMenuRadioGroupProps;
export interface DropdownMenuRadioItemProps extends AtomMenuRadioItemProps {
  tone?: DropdownMenuItemTone;
}
export type DropdownMenuItemIndicatorProps = AtomMenuItemIndicatorProps;
export type DropdownMenuLeadingProps = StaticSpanPartProps;
export type DropdownMenuItemLabelProps = StaticSpanPartProps;
export type DropdownMenuDescriptionProps = StaticSpanPartProps;
export type DropdownMenuShortcutProps = StaticSpanPartProps;
export type DropdownMenuSeparatorProps = AtomMenuSeparatorProps;
export type DropdownMenuSubProps = AtomMenuSubRootProps;
export interface DropdownMenuSubTriggerProps extends AtomMenuSubTriggerProps {
  tone?: DropdownMenuItemTone;
}
export type DropdownMenuSubContentProps = AtomMenuSubContentProps;

const SizeContext = createContext<DropdownMenuSize>("md");

function merge(base: string, className?: string) {
  return className ? `${base} ${className}` : base;
}

function slot(value: string | undefined, fallback: string) {
  return value ?? fallback;
}

export function DropdownMenuRoot({ children, size = "md", ...props }: DropdownMenuRootProps) {
  return (
    <SizeContext.Provider value={size}>
      <AtomDropdownMenu.Root {...props}>{children as ReactNode}</AtomDropdownMenu.Root>
    </SizeContext.Provider>
  );
}

export const DropdownMenuTrigger = forwardRef<HTMLElement, DropdownMenuTriggerProps>(
  function DropdownMenuTrigger({ className, "data-slot": dataSlot, ...props }, ref) {
    return <AtomDropdownMenu.Trigger {...props} className={merge("brick-dropdown-menu__trigger", className)} data-slot={slot(dataSlot, "dropdown-menu-trigger")} ref={ref} />;
  },
);

export const DropdownMenuPortal = AtomDropdownMenu.Portal;

export const DropdownMenuContent = forwardRef<HTMLDivElement, DropdownMenuContentProps>(
  function DropdownMenuContent({ className, "data-slot": dataSlot, ...props }, ref) {
    const size = useContext(SizeContext);
    return <AtomDropdownMenu.Content {...props} className={merge("brick-dropdown-menu__content", className)} data-size={size} data-slot={slot(dataSlot, "dropdown-menu-content")} ref={ref} />;
  },
);

export const DropdownMenuArrow = forwardRef<SVGSVGElement, DropdownMenuArrowProps>(
  function DropdownMenuArrow({ className, "data-slot": dataSlot, ...props }, ref) {
    return <AtomDropdownMenu.Arrow {...props} className={merge("brick-dropdown-menu__arrow", className)} data-slot={slot(dataSlot, "dropdown-menu-arrow")} ref={ref} />;
  },
);

export const DropdownMenuGroup = forwardRef<HTMLElement, DropdownMenuGroupProps>(
  function DropdownMenuGroup({ className, "data-slot": dataSlot, ...props }, ref) {
    return <AtomDropdownMenu.Group {...props} className={merge("brick-dropdown-menu__group", className)} data-slot={slot(dataSlot, "dropdown-menu-group")} ref={ref} />;
  },
);

export const DropdownMenuLabel = forwardRef<HTMLElement, DropdownMenuLabelProps>(
  function DropdownMenuLabel({ className, "data-slot": dataSlot, ...props }, ref) {
    return <AtomDropdownMenu.Label {...props} className={merge("brick-dropdown-menu__label", className)} data-slot={slot(dataSlot, "dropdown-menu-label")} ref={ref} />;
  },
);

export const DropdownMenuItem = forwardRef<HTMLElement, DropdownMenuItemProps>(
  function DropdownMenuItem({ className, tone = "neutral", "data-slot": dataSlot, ...props }, ref) {
    return <AtomDropdownMenu.Item {...props} className={merge("brick-dropdown-menu__item", className)} data-slot={slot(dataSlot, "dropdown-menu-item")} data-tone={tone} ref={ref} />;
  },
);

export const DropdownMenuCheckboxItem = forwardRef<HTMLElement, DropdownMenuCheckboxItemProps>(
  function DropdownMenuCheckboxItem({ className, tone = "neutral", "data-slot": dataSlot, ...props }, ref) {
    return <AtomDropdownMenu.CheckboxItem {...props} className={merge("brick-dropdown-menu__checkbox-item", className)} data-slot={slot(dataSlot, "dropdown-menu-checkbox-item")} data-tone={tone} ref={ref} />;
  },
);

export const DropdownMenuRadioGroup = forwardRef<HTMLElement, DropdownMenuRadioGroupProps>(
  function DropdownMenuRadioGroup({ className, "data-slot": dataSlot, ...props }, ref) {
    return <AtomDropdownMenu.RadioGroup {...props} className={merge("brick-dropdown-menu__radio-group", className)} data-slot={slot(dataSlot, "dropdown-menu-radio-group")} ref={ref} />;
  },
);

export const DropdownMenuRadioItem = forwardRef<HTMLElement, DropdownMenuRadioItemProps>(
  function DropdownMenuRadioItem({ className, tone = "neutral", "data-slot": dataSlot, ...props }, ref) {
    return <AtomDropdownMenu.RadioItem {...props} className={merge("brick-dropdown-menu__radio-item", className)} data-slot={slot(dataSlot, "dropdown-menu-radio-item")} data-tone={tone} ref={ref} />;
  },
);

export const DropdownMenuItemIndicator = forwardRef<HTMLElement, DropdownMenuItemIndicatorProps>(
  function DropdownMenuItemIndicator({ className, "data-slot": dataSlot, ...props }, ref) {
    return <AtomDropdownMenu.ItemIndicator {...props} className={merge("brick-dropdown-menu__item-indicator", className)} data-slot={slot(dataSlot, "dropdown-menu-item-indicator")} ref={ref} />;
  },
);

export const DropdownMenuLeading = createStaticSpanPart("brick-dropdown-menu__leading", "dropdown-menu-leading", "DropdownMenu.Leading");
export const DropdownMenuItemLabel = createStaticSpanPart("brick-dropdown-menu__item-label", "dropdown-menu-item-label", "DropdownMenu.ItemLabel");
export const DropdownMenuDescription = createStaticSpanPart("brick-dropdown-menu__description", "dropdown-menu-description", "DropdownMenu.Description");
export const DropdownMenuShortcut = createStaticSpanPart("brick-dropdown-menu__shortcut", "dropdown-menu-shortcut", "DropdownMenu.Shortcut");

export const DropdownMenuSeparator = forwardRef<HTMLElement, DropdownMenuSeparatorProps>(
  function DropdownMenuSeparator({ className, "data-slot": dataSlot, ...props }, ref) {
    return <AtomDropdownMenu.Separator {...props} className={merge("brick-dropdown-menu__separator", className)} data-slot={slot(dataSlot, "dropdown-menu-separator")} ref={ref} />;
  },
);

export const DropdownMenuSub = AtomDropdownMenu.Sub;

export const DropdownMenuSubTrigger = forwardRef<HTMLElement, DropdownMenuSubTriggerProps>(
  function DropdownMenuSubTrigger({ className, tone = "neutral", "data-slot": dataSlot, ...props }, ref) {
    return <AtomDropdownMenu.SubTrigger {...props} className={merge("brick-dropdown-menu__sub-trigger", className)} data-slot={slot(dataSlot, "dropdown-menu-sub-trigger")} data-tone={tone} ref={ref} />;
  },
);

export const DropdownMenuSubContent = forwardRef<HTMLDivElement, DropdownMenuSubContentProps>(
  function DropdownMenuSubContent({ className, "data-slot": dataSlot, ...props }, ref) {
    const size = useContext(SizeContext);
    return <AtomDropdownMenu.SubContent {...props} className={merge("brick-dropdown-menu__sub-content", className)} data-size={size} data-slot={slot(dataSlot, "dropdown-menu-sub-content")} ref={ref} />;
  },
);

for (const [component, name] of [
  [DropdownMenuTrigger, "Trigger"], [DropdownMenuContent, "Content"], [DropdownMenuArrow, "Arrow"],
  [DropdownMenuGroup, "Group"], [DropdownMenuLabel, "Label"], [DropdownMenuItem, "Item"],
  [DropdownMenuCheckboxItem, "CheckboxItem"], [DropdownMenuRadioGroup, "RadioGroup"],
  [DropdownMenuRadioItem, "RadioItem"], [DropdownMenuItemIndicator, "ItemIndicator"],
  [DropdownMenuSeparator, "Separator"], [DropdownMenuSubTrigger, "SubTrigger"],
  [DropdownMenuSubContent, "SubContent"],
] as const) component.displayName = `DropdownMenu.${name}`;

export const DropdownMenu = Object.freeze({
  Root: DropdownMenuRoot,
  Trigger: DropdownMenuTrigger,
  Portal: DropdownMenuPortal,
  Content: DropdownMenuContent,
  Arrow: DropdownMenuArrow,
  Group: DropdownMenuGroup,
  Label: DropdownMenuLabel,
  Item: DropdownMenuItem,
  CheckboxItem: DropdownMenuCheckboxItem,
  RadioGroup: DropdownMenuRadioGroup,
  RadioItem: DropdownMenuRadioItem,
  ItemIndicator: DropdownMenuItemIndicator,
  Leading: DropdownMenuLeading,
  ItemLabel: DropdownMenuItemLabel,
  Description: DropdownMenuDescription,
  Shortcut: DropdownMenuShortcut,
  Separator: DropdownMenuSeparator,
  Sub: DropdownMenuSub,
  SubTrigger: DropdownMenuSubTrigger,
  SubContent: DropdownMenuSubContent,
});

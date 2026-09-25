"use client";

import { floatingArrowStyle } from "../_floating-arrow/FloatingArrowArtwork.js";
import {
  ActionMenuArrowArtwork,
  actionMenuArrowWidth,
  actionMenuArrowHeight,
} from "../_action-menu/ActionMenuArrowArtwork.js";

import { radiusStyle, type Radius } from "../_radius/Radius.js";

import { createContext, forwardRef, useContext, type ReactNode } from "react";
import {
  Menubar as AtomMenubar,
  useMenubar,
  type MenubarRootProviderProps as AtomMenubarRootProviderProps,
  type MenubarContextProps as AtomMenubarContextProps,
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
import {
  createStaticSpanPart,
  type StaticSpanPartProps,
} from "../_internal/StaticSpanPart.js";

import {
  ActionMenuPresentation,
  useActionMenuPresentation,
  actionMenuAttributes,
  actionMenuSubTriggerChildren,
  ActionMenuSelectionMark,
  ActionMenuChevron,
  type ActionMenuSize,
  type ActionMenuVariant,
  type ActionMenuTone,
  type ActionMenuInset,
  type ActionMenuVisualProps,
  type ActionMenuPopupVisualProps,
  type ActionMenuItemVisualProps,
} from "../_action-menu/ActionMenuPresentation.js";
export type MenubarSize = ActionMenuSize;
export type MenubarItemTone = ActionMenuTone;
export type MenubarVariant = ActionMenuVariant;
export type MenubarInset = ActionMenuInset;
export { useMenubar };
export type {
  UseMenubarOptions,
  UseMenubarReturn,
  MenuState as MenubarMenuState,
  MenuHighlightTarget as MenubarHighlightTarget,
  MenuHighlightChangeDetails as MenubarHighlightChangeDetails,
  MenuSelectionEvent as MenubarSelectionEvent,
  MenuNavigateDetails as MenubarNavigateDetails,
  MenuPositioningOptions as MenubarPositioningOptions,
} from "@flowstack-ui/atom/menubar";
export type MenubarContextProps = AtomMenubarContextProps;
export const MenubarContext = AtomMenubar.Context;
export type MenubarRootProviderProps = AtomMenubarRootProviderProps &
  Pick<
    MenubarRootProps,
    | "size"
    | "menuSize"
    | "barVariant"
    | "triggerVariant"
    | "radius"
    | "variant"
    | "tone"
  >;
export interface MenubarRootProps
  extends AtomMenubarRootProps,
    ActionMenuVisualProps {
  size?: MenubarSize;
  menuSize?: MenubarSize;
  barVariant?: "plain" | "surface";
  triggerVariant?: "subtle" | "plain";
  radius?: Radius;
}
export type MenubarMenuProps = AtomMenubarMenuProps;
export type MenubarTriggerProps = AtomMenubarTriggerProps & { radius?: Radius };
export type MenubarPortalProps = AtomMenuPortalProps;
export interface MenubarContentProps
  extends AtomMenubarContentProps,
    ActionMenuPopupVisualProps {
  "data-slot"?: string;
  radius?: Radius;
}
export type MenubarArrowProps = AtomMenuArrowProps;
export type MenubarGroupProps = AtomMenuGroupProps;
export type MenubarLabelProps = AtomMenuLabelProps;
export interface MenubarItemProps
  extends AtomMenuItemProps,
    ActionMenuItemVisualProps {
  layout?: "row" | "stack";
  tone?: MenubarItemTone;
}
export interface MenubarCheckboxItemProps
  extends AtomMenuCheckboxItemProps,
    ActionMenuItemVisualProps {
  tone?: MenubarItemTone;
}
export type MenubarRadioGroupProps = AtomMenuRadioGroupProps;
export interface MenubarRadioItemProps
  extends AtomMenuRadioItemProps,
    ActionMenuItemVisualProps {
  tone?: MenubarItemTone;
}
export type MenubarItemIndicatorProps = AtomMenuItemIndicatorProps;
export type MenubarLeadingProps = StaticSpanPartProps;
export type MenubarItemLabelProps = StaticSpanPartProps;
export type MenubarDescriptionProps = StaticSpanPartProps;
export type MenubarShortcutProps = StaticSpanPartProps;
export type MenubarSeparatorProps = AtomMenuSeparatorProps;
export type MenubarSubProps = AtomMenuSubRootProps;
export interface MenubarSubTriggerProps
  extends AtomMenuSubTriggerProps,
    ActionMenuItemVisualProps {
  indicator?: ReactNode;
  tone?: MenubarItemTone;
}
export type MenubarSubContentProps = AtomMenuSubContentProps &
  ActionMenuPopupVisualProps & { radius?: Radius };

const merge = (base: string, className?: string) =>
  className ? `${base} ${className}` : base;
const slot = (value: string | undefined, fallback: string) => value ?? fallback;

const BarContext = createContext({
  size: "md" as MenubarSize,
  triggerVariant: "subtle" as "subtle" | "plain",
});
export const MenubarRootProvider = forwardRef<
  HTMLElement,
  MenubarRootProviderProps
>(function MenubarRootProvider(
  {
    children,
    className,
    size = "md",
    menuSize,
    variant = "subtle",
    tone = "neutral",
    barVariant = "plain",
    triggerVariant = "subtle",
    radius,
    style,
    "data-slot": dataSlot,
    ...props
  },
  ref,
) {
  return (
    <BarContext.Provider value={{ size, triggerVariant }}>
      <ActionMenuPresentation.Provider
        value={{ size: menuSize ?? size, variant, tone }}
      >
        <AtomMenubar.RootProvider
          {...props}
          style={radiusStyle(radius, "--brick-menubar-radius", style)}
          className={merge("brick-menubar", className)}
          data-size={size}
          data-variant={barVariant}
          data-slot={slot(dataSlot, "menubar")}
          ref={ref}
        >
          {children}
        </AtomMenubar.RootProvider>
      </ActionMenuPresentation.Provider>
    </BarContext.Provider>
  );
});
export type MenubarTriggerIndicatorProps = StaticSpanPartProps;
const MenubarTriggerIndicatorPart = createStaticSpanPart(
  "brick-menubar__trigger-indicator brick-action-menu__trigger-indicator",
  "menubar-trigger-indicator",
  "Menubar.TriggerIndicator",
);
export const MenubarTriggerIndicator = forwardRef<
  HTMLElement,
  MenubarTriggerIndicatorProps
>(function MenubarTriggerIndicator({ children, ...props }, ref) {
  return (
    <MenubarTriggerIndicatorPart aria-hidden="true" {...props} ref={ref}>
      {children === undefined ? <ActionMenuChevron /> : children}
    </MenubarTriggerIndicatorPart>
  );
});
export const MenubarRoot = forwardRef<HTMLElement, MenubarRootProps>(
  function MenubarRoot(
    {
      children,
      className,
      size = "md",
      menuSize,
      variant = "subtle",
      tone = "neutral",
      barVariant = "plain",
      triggerVariant = "subtle",
      radius,
      style,
      "data-slot": dataSlot,
      ...props
    },
    ref,
  ) {
    return (
      <BarContext.Provider value={{ size, triggerVariant }}>
        <ActionMenuPresentation.Provider
          value={{ size: menuSize ?? size, variant, tone }}
        >
          <AtomMenubar.Root
            {...props}
            style={radiusStyle(radius, "--brick-menubar-radius", style)}
            className={merge("brick-menubar", className)}
            data-size={size}
            data-variant={barVariant}
            data-slot={slot(dataSlot, "menubar")}
            ref={ref}
          >
            {children}
          </AtomMenubar.Root>
        </ActionMenuPresentation.Provider>
      </BarContext.Provider>
    );
  },
);
export const MenubarMenu = AtomMenubar.Menu;
export const MenubarTrigger = forwardRef<HTMLElement, MenubarTriggerProps>(
  function MenubarTrigger(
    { className, radius, style, "data-slot": dataSlot, ...props },
    ref,
  ) {
    const bar = useContext(BarContext);
    return (
      <AtomMenubar.Trigger
        {...props}
        style={radiusStyle(radius, "--brick-menubar-trigger-radius", style)}
        data-size={bar.size}
        data-variant={bar.triggerVariant}
        className={merge("brick-menubar__trigger", className)}
        data-slot={slot(dataSlot, "menubar-trigger")}
        ref={ref}
      />
    );
  },
);
export const MenubarPortal = AtomMenubar.Portal;
export const MenubarContent = forwardRef<HTMLDivElement, MenubarContentProps>(
  function MenubarContent(
    {
      className,
      radius,
      style,
      size,
      variant,
      tone,
      inset,
      itemInset,
      leadingSpace,
      "data-slot": dataSlot,
      ...props
    },
    ref,
  ) {
    const recipe = useActionMenuPresentation({
      size,
      variant,
      tone,
      inset,
      itemInset,
      leadingSpace,
    });
    const atomProps = {
      ...props,
      ...actionMenuAttributes(recipe),
      className: merge(
        "brick-menubar__content brick-action-menu__content",
        className,
      ),
      "data-slot": slot(dataSlot, "menubar-content"),
    };
    return (
      <ActionMenuPresentation.Provider value={recipe}>
        <AtomMenubar.Content
          {...atomProps}
          style={radiusStyle(radius, "--brick-menubar-content-radius", style)}
          ref={ref}
        />
      </ActionMenuPresentation.Provider>
    );
  },
);
export const MenubarArrow = forwardRef<SVGSVGElement, MenubarArrowProps>(
  function MenubarArrow(
    {
      className,
      "data-slot": dataSlot,
      width,
      height,
      style,
      children,
      ...props
    },
    ref,
  ) {
    return (
      <AtomMenubar.Arrow
        width={width ?? actionMenuArrowWidth}
        height={height ?? actionMenuArrowHeight}
        children={
          children ??
          (props.asChild || props.render ? undefined : (
            <ActionMenuArrowArtwork width={width ?? actionMenuArrowWidth} height={height ?? actionMenuArrowHeight} />
          ))
        }
        {...props}
      style={floatingArrowStyle(width, height, style)}
        className={merge(
          "brick-menubar__arrow brick-action-menu__arrow brick-floating-arrow",
          className,
        )}
        data-slot={slot(dataSlot, "menubar-arrow")}
        ref={ref}
      />
    );
  },
);
export const MenubarGroup = forwardRef<HTMLElement, MenubarGroupProps>(
  function MenubarGroup({ className, "data-slot": dataSlot, ...props }, ref) {
    return (
      <AtomMenubar.Group
        {...props}
        className={merge(
          "brick-menubar__group brick-action-menu__group",
          className,
        )}
        data-slot={slot(dataSlot, "menubar-group")}
        ref={ref}
      />
    );
  },
);
export const MenubarLabel = forwardRef<HTMLElement, MenubarLabelProps>(
  function MenubarLabel({ className, "data-slot": dataSlot, ...props }, ref) {
    return (
      <AtomMenubar.Label
        {...props}
        className={merge(
          "brick-menubar__label brick-action-menu__label",
          className,
        )}
        data-slot={slot(dataSlot, "menubar-label")}
        ref={ref}
      />
    );
  },
);
export const MenubarItem = forwardRef<HTMLElement, MenubarItemProps>(
  function MenubarItem(
    {
      className,
      tone,
      itemInset,
      layout = "row",
      "data-slot": dataSlot,
      ...props
    },
    ref,
  ) {
    const recipe = useActionMenuPresentation({ tone, itemInset });
    return (
      <AtomMenubar.Item
        {...props}
        className={merge(
          "brick-menubar__item brick-action-menu__row",
          className,
        )}
        data-slot={slot(dataSlot, "menubar-item")}
        {...actionMenuAttributes(recipe)}
        data-item-tone={tone}
        ref={ref}
        data-layout={layout}
      >
        {props.children}
      </AtomMenubar.Item>
    );
  },
);
export const MenubarCheckboxItem = forwardRef<
  HTMLElement,
  MenubarCheckboxItemProps
>(function MenubarCheckboxItem(
  { className, tone, itemInset, "data-slot": dataSlot, ...props },
  ref,
) {
  const recipe = useActionMenuPresentation({ tone, itemInset });
  return (
    <AtomMenubar.CheckboxItem
      {...props}
      className={merge(
        "brick-menubar__checkbox-item brick-action-menu__row",
        className,
      )}
      data-slot={slot(dataSlot, "menubar-checkbox-item")}
      {...actionMenuAttributes(recipe)}
      data-item-tone={tone}
      ref={ref}
    >
      {props.children}
    </AtomMenubar.CheckboxItem>
  );
});
export const MenubarRadioGroup = forwardRef<
  HTMLElement,
  MenubarRadioGroupProps
>(function MenubarRadioGroup(
  { className, "data-slot": dataSlot, ...props },
  ref,
) {
  return (
    <AtomMenubar.RadioGroup
      {...props}
      className={merge("brick-menubar__radio-group", className)}
      data-slot={slot(dataSlot, "menubar-radio-group")}
      ref={ref}
    />
  );
});
export const MenubarRadioItem = forwardRef<HTMLElement, MenubarRadioItemProps>(
  function MenubarRadioItem(
    { className, tone, itemInset, "data-slot": dataSlot, ...props },
    ref,
  ) {
    const recipe = useActionMenuPresentation({ tone, itemInset });
    return (
      <AtomMenubar.RadioItem
        {...props}
        className={merge(
          "brick-menubar__radio-item brick-action-menu__row",
          className,
        )}
        data-slot={slot(dataSlot, "menubar-radio-item")}
        {...actionMenuAttributes(recipe)}
        data-item-tone={tone}
        ref={ref}
      >
        {props.children}
      </AtomMenubar.RadioItem>
    );
  },
);
export const MenubarItemIndicator = forwardRef<
  HTMLElement,
  MenubarItemIndicatorProps
>(function MenubarItemIndicator(
  { className, children, "data-slot": dataSlot, ...props },
  ref,
) {
  return (
    <AtomMenubar.ItemIndicator
      {...props}
      className={merge(
        "brick-menubar__item-indicator brick-action-menu__item-indicator",
        className,
      )}
      data-slot={slot(dataSlot, "menubar-item-indicator")}
      ref={ref}
    >
      {children === undefined ? <ActionMenuSelectionMark /> : children}
    </AtomMenubar.ItemIndicator>
  );
});
export const MenubarLeading = createStaticSpanPart(
  "brick-menubar__leading brick-action-menu__leading",
  "menubar-leading",
  "Menubar.Leading",
);
export const MenubarItemLabel = createStaticSpanPart(
  "brick-menubar__item-label brick-action-menu__item-label",
  "menubar-item-label",
  "Menubar.ItemLabel",
);
export const MenubarDescription = createStaticSpanPart(
  "brick-menubar__description brick-action-menu__description",
  "menubar-description",
  "Menubar.Description",
);
export const MenubarShortcut = createStaticSpanPart(
  "brick-menubar__shortcut brick-action-menu__shortcut",
  "menubar-shortcut",
  "Menubar.Shortcut",
);
export const MenubarSeparator = forwardRef<HTMLElement, MenubarSeparatorProps>(
  function MenubarSeparator(
    { className, "data-slot": dataSlot, ...props },
    ref,
  ) {
    return (
      <AtomMenubar.Separator
        {...props}
        className={merge(
          "brick-menubar__separator brick-action-menu__separator",
          className,
        )}
        data-slot={slot(dataSlot, "menubar-separator")}
        ref={ref}
      />
    );
  },
);
export const MenubarSub = AtomMenubar.Sub;
export const MenubarSubTrigger = forwardRef<
  HTMLElement,
  MenubarSubTriggerProps
>(function MenubarSubTrigger(
  {
    className,
    tone,
    itemInset,
    children,
    indicator,
    "data-slot": dataSlot,
    ...props
  },
  ref,
) {
  const recipe = useActionMenuPresentation({ tone, itemInset });
  return (
    <AtomMenubar.SubTrigger
      {...props}
      className={merge(
        "brick-menubar__sub-trigger brick-action-menu__row",
        className,
      )}
      data-slot={slot(dataSlot, "menubar-sub-trigger")}
      {...actionMenuAttributes(recipe)}
      data-item-tone={tone}
      ref={ref}
    >
      {actionMenuSubTriggerChildren(children, indicator, props.asChild)}
    </AtomMenubar.SubTrigger>
  );
});
export const MenubarSubContent = forwardRef<
  HTMLDivElement,
  MenubarSubContentProps
>(function MenubarSubContent(
  {
    className,
    radius,
    style,
    size,
    variant,
    tone,
    inset,
    itemInset,
    leadingSpace,
    "data-slot": dataSlot,
    ...props
  },
  ref,
) {
  const recipe = useActionMenuPresentation({
    size,
    variant,
    tone,
    inset,
    itemInset,
    leadingSpace,
  });
  return (
    <ActionMenuPresentation.Provider value={recipe}>
      <AtomMenubar.SubContent
        {...props}
        style={radiusStyle(radius, "--brick-menubar-content-radius", style)}
        className={merge(
          "brick-menubar__sub-content brick-action-menu__content",
          className,
        )}
        {...actionMenuAttributes(recipe)}
        data-slot={slot(dataSlot, "menubar-sub-content")}
        ref={ref}
      />
    </ActionMenuPresentation.Provider>
  );
});

for (const [component, name] of [
  [MenubarRoot, "Root"],
  [MenubarTrigger, "Trigger"],
  [MenubarContent, "Content"],
  [MenubarArrow, "Arrow"],
  [MenubarGroup, "Group"],
  [MenubarLabel, "Label"],
  [MenubarItem, "Item"],
  [MenubarCheckboxItem, "CheckboxItem"],
  [MenubarRadioGroup, "RadioGroup"],
  [MenubarRadioItem, "RadioItem"],
  [MenubarItemIndicator, "ItemIndicator"],
  [MenubarSeparator, "Separator"],
  [MenubarSubTrigger, "SubTrigger"],
  [MenubarSubContent, "SubContent"],
] as const)
  component.displayName = `Menubar.${name}`;

export const Menubar = Object.freeze({
  RootProvider: MenubarRootProvider,
  Context: MenubarContext,
  TriggerIndicator: MenubarTriggerIndicator,
  Root: MenubarRoot,
  Menu: MenubarMenu,
  Trigger: MenubarTrigger,
  Portal: MenubarPortal,
  Content: MenubarContent,
  Arrow: MenubarArrow,
  Group: MenubarGroup,
  Label: MenubarLabel,
  Item: MenubarItem,
  CheckboxItem: MenubarCheckboxItem,
  RadioGroup: MenubarRadioGroup,
  RadioItem: MenubarRadioItem,
  ItemIndicator: MenubarItemIndicator,
  Leading: MenubarLeading,
  ItemLabel: MenubarItemLabel,
  Description: MenubarDescription,
  Shortcut: MenubarShortcut,
  Separator: MenubarSeparator,
  Sub: MenubarSub,
  SubTrigger: MenubarSubTrigger,
  SubContent: MenubarSubContent,
});

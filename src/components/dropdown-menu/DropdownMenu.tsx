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
  DropdownMenu as AtomDropdownMenu,
  useDropdownMenu,
  type MenuRootProviderProps as AtomRootProviderProps,
  type MenuContextProps as AtomContextProps,
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
export type DropdownMenuSize = ActionMenuSize;
export type DropdownMenuItemTone = ActionMenuTone;
export type DropdownMenuVariant = ActionMenuVariant;
export type DropdownMenuInset = ActionMenuInset;
export { useDropdownMenu };
export type {
  UseMenuOptions as UseDropdownMenuOptions,
  UseMenuReturn as UseDropdownMenuReturn,
  MenuState as DropdownMenuState,
  MenuHighlightTarget as DropdownMenuHighlightTarget,
  MenuHighlightChangeDetails as DropdownMenuHighlightChangeDetails,
  MenuSelectionEvent as DropdownMenuSelectionEvent,
  MenuNavigateDetails as DropdownMenuNavigateDetails,
  MenuPositioningOptions as DropdownMenuPositioningOptions,
} from "@flowstack-ui/atom/dropdown-menu";
export type DropdownMenuRootProviderProps = AtomRootProviderProps &
  ActionMenuVisualProps;
export type DropdownMenuContextProps = AtomContextProps;
export const DropdownMenuContext = AtomDropdownMenu.Context;
export function DropdownMenuRootProvider({
  size = "md",
  variant = "subtle",
  tone = "neutral",
  ...props
}: DropdownMenuRootProviderProps) {
  return (
    <ActionMenuPresentation.Provider value={{ size, variant, tone }}>
      <AtomDropdownMenu.RootProvider {...props} />
    </ActionMenuPresentation.Provider>
  );
}
export type DropdownMenuTriggerIndicatorProps = StaticSpanPartProps;
const DropdownMenuTriggerIndicatorPart = createStaticSpanPart(
  "brick-dropdown-menu__trigger-indicator brick-action-menu__trigger-indicator",
  "dropdown-menu-trigger-indicator",
  "DropdownMenu.TriggerIndicator",
);
export const DropdownMenuTriggerIndicator = forwardRef<
  HTMLElement,
  DropdownMenuTriggerIndicatorProps
>(function DropdownMenuTriggerIndicator({ children, ...props }, ref) {
  return (
    <DropdownMenuTriggerIndicatorPart aria-hidden="true" {...props} ref={ref}>
      {children === undefined ? <ActionMenuChevron /> : children}
    </DropdownMenuTriggerIndicatorPart>
  );
});

export interface DropdownMenuRootProps
  extends AtomMenuRootProps,
    ActionMenuVisualProps {
  size?: DropdownMenuSize;
}
export type DropdownMenuTriggerProps = AtomDropdownMenuTriggerProps;
export type DropdownMenuPortalProps = AtomMenuPortalProps;
export type DropdownMenuContentProps = AtomMenuContentProps &
  ActionMenuPopupVisualProps & { radius?: Radius };
export type DropdownMenuArrowProps = AtomMenuArrowProps;
export type DropdownMenuGroupProps = AtomMenuGroupProps;
export type DropdownMenuLabelProps = AtomMenuLabelProps;
export interface DropdownMenuItemProps
  extends AtomMenuItemProps,
    ActionMenuItemVisualProps {
  layout?: "row" | "stack";
  tone?: DropdownMenuItemTone;
}
export interface DropdownMenuCheckboxItemProps
  extends AtomMenuCheckboxItemProps,
    ActionMenuItemVisualProps {
  tone?: DropdownMenuItemTone;
}
export type DropdownMenuRadioGroupProps = AtomMenuRadioGroupProps;
export interface DropdownMenuRadioItemProps
  extends AtomMenuRadioItemProps,
    ActionMenuItemVisualProps {
  tone?: DropdownMenuItemTone;
}
export type DropdownMenuItemIndicatorProps = AtomMenuItemIndicatorProps;
export type DropdownMenuLeadingProps = StaticSpanPartProps;
export type DropdownMenuItemLabelProps = StaticSpanPartProps;
export type DropdownMenuDescriptionProps = StaticSpanPartProps;
export type DropdownMenuShortcutProps = StaticSpanPartProps;
export type DropdownMenuSeparatorProps = AtomMenuSeparatorProps;
export type DropdownMenuSubProps = AtomMenuSubRootProps;
export interface DropdownMenuSubTriggerProps
  extends AtomMenuSubTriggerProps,
    ActionMenuItemVisualProps {
  indicator?: ReactNode;
  tone?: DropdownMenuItemTone;
}
export type DropdownMenuSubContentProps = AtomMenuSubContentProps &
  ActionMenuPopupVisualProps & { radius?: Radius };

function merge(base: string, className?: string) {
  return className ? `${base} ${className}` : base;
}

function slot(value: string | undefined, fallback: string) {
  return value ?? fallback;
}

export function DropdownMenuRoot({
  children,
  size = "md",
  variant = "subtle",
  tone = "neutral",
  ...props
}: DropdownMenuRootProps) {
  return (
    <ActionMenuPresentation.Provider value={{ size, variant, tone }}>
      <AtomDropdownMenu.Root {...props}>
        {children as ReactNode}
      </AtomDropdownMenu.Root>
    </ActionMenuPresentation.Provider>
  );
}

export const DropdownMenuTrigger = forwardRef<
  HTMLElement,
  DropdownMenuTriggerProps
>(function DropdownMenuTrigger(
  { className, "data-slot": dataSlot, ...props },
  ref,
) {
  return (
    <AtomDropdownMenu.Trigger
      {...props}
      data-native-trigger={!props.asChild && !props.render ? "" : undefined}
      className={merge("brick-dropdown-menu__trigger", className)}
      data-slot={slot(dataSlot, "dropdown-menu-trigger")}
      ref={ref}
    />
  );
});

export const DropdownMenuPortal = AtomDropdownMenu.Portal;

export const DropdownMenuContent = forwardRef<
  HTMLDivElement,
  DropdownMenuContentProps
>(function DropdownMenuContent(
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
      <AtomDropdownMenu.Content
        {...props}
        style={radiusStyle(
          radius,
          "--brick-dropdown-menu-content-radius",
          style,
        )}
        className={merge(
          "brick-dropdown-menu__content brick-action-menu__content",
          className,
        )}
        {...actionMenuAttributes(recipe)}
        data-slot={slot(dataSlot, "dropdown-menu-content")}
        ref={ref}
      />
    </ActionMenuPresentation.Provider>
  );
});

export const DropdownMenuArrow = forwardRef<
  SVGSVGElement,
  DropdownMenuArrowProps
>(function DropdownMenuArrow(
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
    <AtomDropdownMenu.Arrow
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
        "brick-dropdown-menu__arrow brick-action-menu__arrow brick-floating-arrow",
        className,
      )}
      data-slot={slot(dataSlot, "dropdown-menu-arrow")}
      ref={ref}
    />
  );
});

export const DropdownMenuGroup = forwardRef<
  HTMLElement,
  DropdownMenuGroupProps
>(function DropdownMenuGroup(
  { className, "data-slot": dataSlot, ...props },
  ref,
) {
  return (
    <AtomDropdownMenu.Group
      {...props}
      className={merge(
        "brick-dropdown-menu__group brick-action-menu__group",
        className,
      )}
      data-slot={slot(dataSlot, "dropdown-menu-group")}
      ref={ref}
    />
  );
});

export const DropdownMenuLabel = forwardRef<
  HTMLElement,
  DropdownMenuLabelProps
>(function DropdownMenuLabel(
  { className, "data-slot": dataSlot, ...props },
  ref,
) {
  return (
    <AtomDropdownMenu.Label
      {...props}
      className={merge(
        "brick-dropdown-menu__label brick-action-menu__label",
        className,
      )}
      data-slot={slot(dataSlot, "dropdown-menu-label")}
      ref={ref}
    />
  );
});

export const DropdownMenuItem = forwardRef<HTMLElement, DropdownMenuItemProps>(
  function DropdownMenuItem(
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
      <AtomDropdownMenu.Item
        {...props}
        className={merge(
          "brick-dropdown-menu__item brick-action-menu__row",
          className,
        )}
        data-slot={slot(dataSlot, "dropdown-menu-item")}
        {...actionMenuAttributes(recipe)}
        data-item-tone={tone}
        ref={ref}
        data-layout={layout}
      >
        {props.children}
      </AtomDropdownMenu.Item>
    );
  },
);

export const DropdownMenuCheckboxItem = forwardRef<
  HTMLElement,
  DropdownMenuCheckboxItemProps
>(function DropdownMenuCheckboxItem(
  { className, tone, itemInset, "data-slot": dataSlot, ...props },
  ref,
) {
  const recipe = useActionMenuPresentation({ tone, itemInset });
  return (
    <AtomDropdownMenu.CheckboxItem
      {...props}
      className={merge(
        "brick-dropdown-menu__checkbox-item brick-action-menu__row",
        className,
      )}
      data-slot={slot(dataSlot, "dropdown-menu-checkbox-item")}
      {...actionMenuAttributes(recipe)}
      data-item-tone={tone}
      ref={ref}
    >
      {props.children}
    </AtomDropdownMenu.CheckboxItem>
  );
});

export const DropdownMenuRadioGroup = forwardRef<
  HTMLElement,
  DropdownMenuRadioGroupProps
>(function DropdownMenuRadioGroup(
  { className, "data-slot": dataSlot, ...props },
  ref,
) {
  return (
    <AtomDropdownMenu.RadioGroup
      {...props}
      className={merge("brick-dropdown-menu__radio-group", className)}
      data-slot={slot(dataSlot, "dropdown-menu-radio-group")}
      ref={ref}
    />
  );
});

export const DropdownMenuRadioItem = forwardRef<
  HTMLElement,
  DropdownMenuRadioItemProps
>(function DropdownMenuRadioItem(
  { className, tone, itemInset, "data-slot": dataSlot, ...props },
  ref,
) {
  const recipe = useActionMenuPresentation({ tone, itemInset });
  return (
    <AtomDropdownMenu.RadioItem
      {...props}
      className={merge(
        "brick-dropdown-menu__radio-item brick-action-menu__row",
        className,
      )}
      data-slot={slot(dataSlot, "dropdown-menu-radio-item")}
      {...actionMenuAttributes(recipe)}
      data-item-tone={tone}
      ref={ref}
    >
      {props.children}
    </AtomDropdownMenu.RadioItem>
  );
});

export const DropdownMenuItemIndicator = forwardRef<
  HTMLElement,
  DropdownMenuItemIndicatorProps
>(function DropdownMenuItemIndicator(
  { className, children, "data-slot": dataSlot, ...props },
  ref,
) {
  return (
    <AtomDropdownMenu.ItemIndicator
      {...props}
      className={merge(
        "brick-dropdown-menu__item-indicator brick-action-menu__item-indicator",
        className,
      )}
      data-slot={slot(dataSlot, "dropdown-menu-item-indicator")}
      ref={ref}
    >
      {children === undefined ? <ActionMenuSelectionMark /> : children}
    </AtomDropdownMenu.ItemIndicator>
  );
});

export const DropdownMenuLeading = createStaticSpanPart(
  "brick-dropdown-menu__leading brick-action-menu__leading",
  "dropdown-menu-leading",
  "DropdownMenu.Leading",
);
export const DropdownMenuItemLabel = createStaticSpanPart(
  "brick-dropdown-menu__item-label brick-action-menu__item-label",
  "dropdown-menu-item-label",
  "DropdownMenu.ItemLabel",
);
export const DropdownMenuDescription = createStaticSpanPart(
  "brick-dropdown-menu__description brick-action-menu__description",
  "dropdown-menu-description",
  "DropdownMenu.Description",
);
export const DropdownMenuShortcut = createStaticSpanPart(
  "brick-dropdown-menu__shortcut brick-action-menu__shortcut",
  "dropdown-menu-shortcut",
  "DropdownMenu.Shortcut",
);

export const DropdownMenuSeparator = forwardRef<
  HTMLElement,
  DropdownMenuSeparatorProps
>(function DropdownMenuSeparator(
  { className, "data-slot": dataSlot, ...props },
  ref,
) {
  return (
    <AtomDropdownMenu.Separator
      {...props}
      className={merge(
        "brick-dropdown-menu__separator brick-action-menu__separator",
        className,
      )}
      data-slot={slot(dataSlot, "dropdown-menu-separator")}
      ref={ref}
    />
  );
});

export const DropdownMenuSub = AtomDropdownMenu.Sub;

export const DropdownMenuSubTrigger = forwardRef<
  HTMLElement,
  DropdownMenuSubTriggerProps
>(function DropdownMenuSubTrigger(
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
    <AtomDropdownMenu.SubTrigger
      {...props}
      className={merge(
        "brick-dropdown-menu__sub-trigger brick-action-menu__row",
        className,
      )}
      data-slot={slot(dataSlot, "dropdown-menu-sub-trigger")}
      {...actionMenuAttributes(recipe)}
      data-item-tone={tone}
      ref={ref}
    >
      {actionMenuSubTriggerChildren(children, indicator, props.asChild)}
    </AtomDropdownMenu.SubTrigger>
  );
});

export const DropdownMenuSubContent = forwardRef<
  HTMLDivElement,
  DropdownMenuSubContentProps
>(function DropdownMenuSubContent(
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
      <AtomDropdownMenu.SubContent
        {...props}
        style={radiusStyle(
          radius,
          "--brick-dropdown-menu-content-radius",
          style,
        )}
        className={merge(
          "brick-dropdown-menu__sub-content brick-action-menu__content",
          className,
        )}
        {...actionMenuAttributes(recipe)}
        data-slot={slot(dataSlot, "dropdown-menu-sub-content")}
        ref={ref}
      />
    </ActionMenuPresentation.Provider>
  );
});

for (const [component, name] of [
  [DropdownMenuTrigger, "Trigger"],
  [DropdownMenuContent, "Content"],
  [DropdownMenuArrow, "Arrow"],
  [DropdownMenuGroup, "Group"],
  [DropdownMenuLabel, "Label"],
  [DropdownMenuItem, "Item"],
  [DropdownMenuCheckboxItem, "CheckboxItem"],
  [DropdownMenuRadioGroup, "RadioGroup"],
  [DropdownMenuRadioItem, "RadioItem"],
  [DropdownMenuItemIndicator, "ItemIndicator"],
  [DropdownMenuSeparator, "Separator"],
  [DropdownMenuSubTrigger, "SubTrigger"],
  [DropdownMenuSubContent, "SubContent"],
] as const)
  component.displayName = `DropdownMenu.${name}`;

export const DropdownMenu = Object.freeze({
  RootProvider: DropdownMenuRootProvider,
  Context: DropdownMenuContext,
  TriggerIndicator: DropdownMenuTriggerIndicator,
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

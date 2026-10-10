"use client";

import { radiusStyle, type Radius } from "../_radius/Radius.js";
import { responsiveDataAttributes, type ResponsiveValue } from "../_responsive-value/ResponsiveValue.js";
import {
  forwardRef,
  type CSSProperties,
  type ComponentPropsWithoutRef,
} from "react";
import {
  Tree as AtomTree,
  useTreeItemContext,
  type TreeTriggerProps as AtomTreeTriggerProps,
  type TreeCheckboxProps as AtomTreeCheckboxProps,
  type TreeGroupProps as AtomTreeGroupProps,
  type TreeItemProps as AtomTreeItemProps,
  type TreeItemTextProps as AtomTreeItemTextProps,
  type TreeRootProps as AtomTreeRootProps,
} from "@flowstack-ui/atom/tree";
export { createTreeCollection, useTreeController, useTreeContext, useTreeItemContext } from "@flowstack-ui/atom/tree";
export type { TreeCollection, TreeNode, TreeNodeEntry, UseTreeControllerOptions } from "@flowstack-ui/atom/tree";

export type TreeVariant = "plain" | "soft" | "outline";
export type TreeSize = "xs" | "sm" | "md";
export type TreeDensity = "compact" | "comfortable";
export type TreeTone = "neutral" | "accent";
export type TreeSelectionVariant = "subtle" | "solid";
export type TreeBorderTone = "subtle" | "default" | "strong";

export interface TreeRootProps extends Omit<AtomTreeRootProps, "orientation"> {
  radius?: Radius;
  variant?: ResponsiveValue<TreeVariant>;
  size?: ResponsiveValue<TreeSize>;
  density?: ResponsiveValue<TreeDensity>;
  tone?: TreeTone;
  selectionVariant?: TreeSelectionVariant;
  showGuide?: boolean;
  borderTone?: TreeBorderTone;
}

export interface TreeItemProps extends AtomTreeItemProps {}
export interface TreeRootProviderProps extends Omit<TreeRootProps, "value"> {
  value: { rootProps: AtomTreeRootProps };
}
export interface TreeItemContentProps extends ComponentPropsWithoutRef<"div"> {
  "data-slot"?: string;
}
export interface TreeIndicatorProps extends ComponentPropsWithoutRef<"span"> {
  "data-slot"?: string;
}
export interface TreeItemTextProps extends AtomTreeItemTextProps {}
export interface TreeGroupProps extends AtomTreeGroupProps {}
export interface TreeTriggerProps extends AtomTreeTriggerProps {}
export interface TreeCheckboxProps extends AtomTreeCheckboxProps {}

function mergeClassName(base: string, className?: string) {
  return className ? `${base} ${className}` : base;
}

function slot(value: string | undefined, fallback: string) {
  return value ?? fallback;
}

export const TreeRoot = forwardRef<HTMLDivElement, TreeRootProps>(function TreeRoot(
  {
    variant = "plain",
    size = "md",
    density = "comfortable",
    tone = "neutral",
    selectionVariant = "subtle",
    showGuide = false,
    borderTone = "default",
    className, radius, style,
    "data-slot": dataSlot,
    ...props
  },
  ref,
) {
  return (
    <AtomTree.Root
      {...props}
      className={mergeClassName("brick-tree", className)} style={radiusStyle(radius, "--brick-tree-radius", style)}
      data-border-tone={borderTone}
      data-guide={showGuide ? "" : undefined}
      {...responsiveDataAttributes("data-size", size, { defaultValue: "md", alwaysInitial: true })}
      {...responsiveDataAttributes("data-density", density, { defaultValue: "comfortable", alwaysInitial: true })}
      data-tone={tone}
      data-selection-variant={selectionVariant}
      data-slot={slot(dataSlot, "tree")}
      {...responsiveDataAttributes("data-variant", variant, { defaultValue: "plain", alwaysInitial: true })}
      orientation="vertical"
      ref={ref}
    />
  );
});

export const TreeItem = forwardRef<HTMLDivElement, TreeItemProps>(function TreeItem(
  { className, "data-slot": dataSlot, ...props },
  ref,
) {
  return (
    <AtomTree.Item
      {...props}
      className={mergeClassName("brick-tree__item", className)}
      data-slot={slot(dataSlot, "tree-item")}
      ref={ref}
    />
  );
});

export const TreeItemContent = forwardRef<HTMLDivElement, TreeItemContentProps>(
  function TreeItemContent({ className, style, "data-slot": dataSlot, ...props }, ref) {
    const { level } = useTreeItemContext();
    return (
      <div
        {...props}
        style={{ "--brick-tree-level": level, ...style } as CSSProperties}
        className={mergeClassName("brick-tree__item-content", className)}
        data-slot={slot(dataSlot, "tree-item-content")}
        ref={ref}
      />
    );
  },
);

export const TreeIndicator = forwardRef<HTMLSpanElement, TreeIndicatorProps>(
  function TreeIndicator({ className, "data-slot": dataSlot, children, ...props }, ref) {
    return (
      <span
        {...props}
        aria-hidden="true"
        className={mergeClassName("brick-tree__indicator", className)}
        data-slot={slot(dataSlot, "tree-indicator")}
        ref={ref}
      >
        {children ?? (
          <svg aria-hidden="true" viewBox="0 0 16 16">
            <path d="m6 3 5 5-5 5" />
          </svg>
        )}
      </span>
    );
  },
);

export const TreeItemText = forwardRef<HTMLSpanElement, TreeItemTextProps>(
  function TreeItemText({ className, "data-slot": dataSlot, ...props }, ref) {
    return (
      <AtomTree.ItemText
        {...props}
        className={mergeClassName("brick-tree__item-text", className)}
        data-slot={slot(dataSlot, "tree-item-text")}
        ref={ref}
      />
    );
  },
);

export const TreeGroup = forwardRef<HTMLDivElement, TreeGroupProps>(function TreeGroup(
  { className, style, "data-slot": dataSlot, ...props },
  ref,
) {
  const { level } = useTreeItemContext();
  return (
    <AtomTree.Group
      {...props}
      style={{ "--brick-tree-level": level, ...style } as CSSProperties}
      className={mergeClassName("brick-tree__group", className)}
      data-slot={slot(dataSlot, "tree-group")}
      ref={ref}
    />
  );
});

export const TreeTrigger = forwardRef<HTMLElement, TreeTriggerProps>(function TreeTrigger(
  { className, children, ...props }, ref,
) {
  return <AtomTree.Trigger {...props} ref={ref} className={mergeClassName("brick-tree__trigger", className)}>
    {children ?? <TreeIndicator />}
  </AtomTree.Trigger>;
});

export const TreeCheckbox = forwardRef<HTMLElement, TreeCheckboxProps>(function TreeCheckbox(
  { className, children, ...props }, ref,
) {
  return <AtomTree.Checkbox {...props} ref={ref} className={mergeClassName("brick-tree__checkbox", className)}>
    {children ?? <svg aria-hidden="true" viewBox="0 0 16 16"><path data-check="" d="m3 8 3 3 7-7" /><path data-mixed="" d="M3 8h10" /></svg>}
  </AtomTree.Checkbox>;
});

TreeRoot.displayName = "Tree.Root";
export const TreeRootProvider = forwardRef<HTMLDivElement, TreeRootProviderProps>(function TreeRootProvider({ value, ...props }, ref) {
  const { orientation: _orientation, ...rootProps } = value.rootProps;
  return <TreeRoot {...rootProps} {...props} ref={ref} />;
});
TreeItem.displayName = "Tree.Item";
TreeItemContent.displayName = "Tree.ItemContent";
TreeIndicator.displayName = "Tree.Indicator";
TreeItemText.displayName = "Tree.ItemText";
TreeGroup.displayName = "Tree.Group";

export const Tree = Object.freeze({
  Root: TreeRoot,
  RootProvider: TreeRootProvider,
  Item: TreeItem,
  ItemContent: TreeItemContent,
  Indicator: TreeIndicator,
  ItemText: TreeItemText,
  Group: TreeGroup,
  Trigger: TreeTrigger,
  Checkbox: TreeCheckbox,
});

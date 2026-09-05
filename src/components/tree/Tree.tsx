import {
  forwardRef,
  type ComponentPropsWithoutRef,
} from "react";
import {
  Tree as AtomTree,
  type TreeGroupProps as AtomTreeGroupProps,
  type TreeItemProps as AtomTreeItemProps,
  type TreeItemTextProps as AtomTreeItemTextProps,
  type TreeRootProps as AtomTreeRootProps,
} from "@flowstack-ui/atom/tree";

export type TreeVariant = "plain" | "soft" | "outline";
export type TreeSize = "sm" | "md";
export type TreeBorderTone = "subtle" | "default" | "strong";

export interface TreeRootProps extends Omit<AtomTreeRootProps, "orientation"> {
  variant?: TreeVariant;
  size?: TreeSize;
  showGuide?: boolean;
  borderTone?: TreeBorderTone;
}

export interface TreeItemProps extends AtomTreeItemProps {}
export interface TreeItemContentProps extends ComponentPropsWithoutRef<"div"> {
  "data-slot"?: string;
}
export interface TreeIndicatorProps extends ComponentPropsWithoutRef<"span"> {
  "data-slot"?: string;
}
export interface TreeItemTextProps extends AtomTreeItemTextProps {}
export interface TreeGroupProps extends AtomTreeGroupProps {}

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
    showGuide = false,
    borderTone = "default",
    className,
    "data-slot": dataSlot,
    ...props
  },
  ref,
) {
  return (
    <AtomTree.Root
      {...props}
      className={mergeClassName("brick-tree", className)}
      data-border-tone={borderTone}
      data-guide={showGuide ? "" : undefined}
      data-size={size}
      data-slot={slot(dataSlot, "tree")}
      data-variant={variant}
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
  function TreeItemContent({ className, "data-slot": dataSlot, ...props }, ref) {
    return (
      <div
        {...props}
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
  { className, "data-slot": dataSlot, ...props },
  ref,
) {
  return (
    <AtomTree.Group
      {...props}
      className={mergeClassName("brick-tree__group", className)}
      data-slot={slot(dataSlot, "tree-group")}
      ref={ref}
    />
  );
});

TreeRoot.displayName = "Tree.Root";
TreeItem.displayName = "Tree.Item";
TreeItemContent.displayName = "Tree.ItemContent";
TreeIndicator.displayName = "Tree.Indicator";
TreeItemText.displayName = "Tree.ItemText";
TreeGroup.displayName = "Tree.Group";

export const Tree = Object.freeze({
  Root: TreeRoot,
  Item: TreeItem,
  ItemContent: TreeItemContent,
  Indicator: TreeIndicator,
  ItemText: TreeItemText,
  Group: TreeGroup,
});

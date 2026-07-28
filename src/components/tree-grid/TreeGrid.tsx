import { forwardRef, type HTMLAttributes } from "react";
import {
  TreeGrid as AtomTreeGrid,
  type TreeGridBodyProps as AtomTreeGridBodyProps,
  type TreeGridCaptionProps as AtomTreeGridCaptionProps,
  type TreeGridCellProps as AtomTreeGridCellProps,
  type TreeGridColumnHeaderProps as AtomTreeGridColumnHeaderProps,
  type TreeGridFooterProps as AtomTreeGridFooterProps,
  type TreeGridHeaderProps as AtomTreeGridHeaderProps,
  type TreeGridRootProps as AtomTreeGridRootProps,
  type TreeGridRowHeaderProps as AtomTreeGridRowHeaderProps,
  type TreeGridRowProps as AtomTreeGridRowProps,
} from "@flowstack-ui/atom/tree-grid";

export type TreeGridVariant = "line" | "outline";
export type TreeGridSize = "sm" | "md" | "lg";
export type TreeGridDensity = "compact" | "comfortable" | "spacious";
export type TreeGridCaptionSide = "top" | "bottom";
export type TreeGridCellAlign = "start" | "center" | "end";

export interface TreeGridContainerProps extends HTMLAttributes<HTMLDivElement> { "data-slot"?: string; }
export interface TreeGridRootProps extends AtomTreeGridRootProps { variant?: TreeGridVariant; size?: TreeGridSize; density?: TreeGridDensity; }
export interface TreeGridCaptionProps extends AtomTreeGridCaptionProps { side?: TreeGridCaptionSide; }
export interface TreeGridHeaderProps extends AtomTreeGridHeaderProps {}
export interface TreeGridBodyProps extends AtomTreeGridBodyProps {}
export interface TreeGridFooterProps extends AtomTreeGridFooterProps {}
export interface TreeGridRowProps extends AtomTreeGridRowProps {}
export interface TreeGridColumnHeaderProps extends Omit<AtomTreeGridColumnHeaderProps, "align"> { align?: TreeGridCellAlign; numeric?: boolean; }
export interface TreeGridRowHeaderProps extends Omit<AtomTreeGridRowHeaderProps, "align"> { align?: TreeGridCellAlign; numeric?: boolean; }
export interface TreeGridCellProps extends Omit<AtomTreeGridCellProps, "align"> { align?: TreeGridCellAlign; numeric?: boolean; }
export interface TreeGridIndicatorProps extends HTMLAttributes<HTMLSpanElement> { "data-slot"?: string; }
export interface TreeGridSortIndicatorProps extends HTMLAttributes<HTMLSpanElement> { "data-slot"?: string; }

function mergeClassName(base: string, className?: string) { return className ? `${base} ${className}` : base; }
function slot(value: string | undefined, fallback: string) { return value ?? fallback; }
function alignment(align: TreeGridCellAlign | undefined, numeric: boolean) { return align ?? (numeric ? "end" : "start"); }

export const TreeGridContainer = forwardRef<HTMLDivElement, TreeGridContainerProps>(function TreeGridContainer({ className, "data-slot": dataSlot, ...props }, ref) {
  return <div {...props} className={mergeClassName("brick-tree-grid-container", className)} data-slot={slot(dataSlot, "tree-grid-container")} ref={ref} />;
});
export const TreeGridRoot = forwardRef<HTMLElement, TreeGridRootProps>(function TreeGridRoot({ variant = "line", size = "md", density = "comfortable", className, "data-slot": dataSlot, ...props }, ref) {
  return <AtomTreeGrid.Root {...props} className={mergeClassName("brick-tree-grid", className)} data-density={density} data-size={size} data-slot={slot(dataSlot, "tree-grid")} data-variant={variant} ref={ref} />;
});
export const TreeGridCaption = forwardRef<HTMLTableCaptionElement, TreeGridCaptionProps>(function TreeGridCaption({ side = "bottom", className, "data-slot": dataSlot, ...props }, ref) {
  return <AtomTreeGrid.Caption {...props} className={mergeClassName("brick-tree-grid__caption", className)} data-side={side} data-slot={slot(dataSlot, "tree-grid-caption")} ref={ref} />;
});
export const TreeGridHeader = forwardRef<HTMLTableSectionElement, TreeGridHeaderProps>(function TreeGridHeader({ className, "data-slot": dataSlot, ...props }, ref) {
  return <AtomTreeGrid.Header {...props} className={mergeClassName("brick-tree-grid__header", className)} data-slot={slot(dataSlot, "tree-grid-header")} ref={ref} />;
});
export const TreeGridBody = forwardRef<HTMLTableSectionElement, TreeGridBodyProps>(function TreeGridBody({ className, "data-slot": dataSlot, ...props }, ref) {
  return <AtomTreeGrid.Body {...props} className={mergeClassName("brick-tree-grid__body", className)} data-slot={slot(dataSlot, "tree-grid-body")} ref={ref} />;
});
export const TreeGridFooter = forwardRef<HTMLTableSectionElement, TreeGridFooterProps>(function TreeGridFooter({ className, "data-slot": dataSlot, ...props }, ref) {
  return <AtomTreeGrid.Footer {...props} className={mergeClassName("brick-tree-grid__footer", className)} data-slot={slot(dataSlot, "tree-grid-footer")} ref={ref} />;
});
export const TreeGridRow = forwardRef<HTMLTableRowElement, TreeGridRowProps>(function TreeGridRow({ className, "data-slot": dataSlot, ...props }, ref) {
  return <AtomTreeGrid.Row {...props} className={mergeClassName("brick-tree-grid__row", className)} data-slot={slot(dataSlot, "tree-grid-row")} ref={ref} />;
});
export const TreeGridColumnHeader = forwardRef<HTMLTableCellElement, TreeGridColumnHeaderProps>(function TreeGridColumnHeader({ align, numeric = false, className, "data-slot": dataSlot, ...props }, ref) {
  return <AtomTreeGrid.ColumnHeader {...props} className={mergeClassName("brick-tree-grid__column-header", className)} data-align={alignment(align, numeric)} data-numeric={numeric ? "" : undefined} data-slot={slot(dataSlot, "tree-grid-column-header")} ref={ref} />;
});
export const TreeGridRowHeader = forwardRef<HTMLTableCellElement, TreeGridRowHeaderProps>(function TreeGridRowHeader({ align, numeric = false, className, "data-slot": dataSlot, ...props }, ref) {
  return <AtomTreeGrid.RowHeader {...props} className={mergeClassName("brick-tree-grid__row-header", className)} data-align={alignment(align, numeric)} data-numeric={numeric ? "" : undefined} data-slot={slot(dataSlot, "tree-grid-row-header")} ref={ref} />;
});
export const TreeGridCell = forwardRef<HTMLTableCellElement, TreeGridCellProps>(function TreeGridCell({ align, numeric = false, className, "data-slot": dataSlot, ...props }, ref) {
  return <AtomTreeGrid.Cell {...props} className={mergeClassName("brick-tree-grid__cell", className)} data-align={alignment(align, numeric)} data-numeric={numeric ? "" : undefined} data-slot={slot(dataSlot, "tree-grid-cell")} ref={ref} />;
});
export const TreeGridIndicator = forwardRef<HTMLSpanElement, TreeGridIndicatorProps>(function TreeGridIndicator({ className, "data-slot": dataSlot, children, ...props }, ref) {
  return <span {...props} aria-hidden="true" className={mergeClassName("brick-tree-grid__indicator", className)} data-slot={slot(dataSlot, "tree-grid-indicator")} ref={ref}>{children ?? <svg aria-hidden="true" viewBox="0 0 16 16"><path d="m6 3 5 5-5 5" /></svg>}</span>;
});
export const TreeGridSortIndicator = forwardRef<HTMLSpanElement, TreeGridSortIndicatorProps>(function TreeGridSortIndicator({ className, "data-slot": dataSlot, children, ...props }, ref) {
  return <span {...props} aria-hidden="true" className={mergeClassName("brick-tree-grid__sort-indicator", className)} data-slot={slot(dataSlot, "tree-grid-sort-indicator")} ref={ref}>{children ?? <svg aria-hidden="true" viewBox="0 0 16 16"><path d="m4 6 4-4 4 4M12 10l-4 4-4-4" /></svg>}</span>;
});

TreeGridContainer.displayName = "TreeGrid.Container";
TreeGridRoot.displayName = "TreeGrid.Root";
TreeGridCaption.displayName = "TreeGrid.Caption";
TreeGridHeader.displayName = "TreeGrid.Header";
TreeGridBody.displayName = "TreeGrid.Body";
TreeGridFooter.displayName = "TreeGrid.Footer";
TreeGridRow.displayName = "TreeGrid.Row";
TreeGridColumnHeader.displayName = "TreeGrid.ColumnHeader";
TreeGridRowHeader.displayName = "TreeGrid.RowHeader";
TreeGridCell.displayName = "TreeGrid.Cell";
TreeGridIndicator.displayName = "TreeGrid.Indicator";
TreeGridSortIndicator.displayName = "TreeGrid.SortIndicator";

export const TreeGrid = Object.freeze({ Container: TreeGridContainer, Root: TreeGridRoot, Caption: TreeGridCaption, Header: TreeGridHeader, Body: TreeGridBody, Footer: TreeGridFooter, Row: TreeGridRow, ColumnHeader: TreeGridColumnHeader, RowHeader: TreeGridRowHeader, Cell: TreeGridCell, Indicator: TreeGridIndicator, SortIndicator: TreeGridSortIndicator });

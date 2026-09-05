import { forwardRef, type HTMLAttributes } from "react";
import {
  DataGrid as AtomDataGrid,
  type DataGridBodyProps as AtomDataGridBodyProps,
  type DataGridCaptionProps as AtomDataGridCaptionProps,
  type DataGridCellProps as AtomDataGridCellProps,
  type DataGridColumnGroupProps as AtomDataGridColumnGroupProps,
  type DataGridColumnProps as AtomDataGridColumnProps,
  type DataGridColumnHeaderProps as AtomDataGridColumnHeaderProps,
  type DataGridFooterProps as AtomDataGridFooterProps,
  type DataGridHeaderProps as AtomDataGridHeaderProps,
  type DataGridRootProps as AtomDataGridRootProps,
  type DataGridRowProps as AtomDataGridRowProps,
} from "@flowstack-ui/atom/data-grid";

export type DataGridVariant = "line" | "outline";
export type DataGridSize = "sm" | "md" | "lg";
export type DataGridDensity = "compact" | "comfortable" | "spacious";
export type DataGridCaptionSide = "top" | "bottom";
export type DataGridCellAlign = "start" | "center" | "end";
export type DataGridCellVerticalAlign = "top" | "middle" | "bottom";
export type DataGridSurface = "transparent" | "base";
export type DataGridBorderTone = "subtle" | "default" | "strong";
export type DataGridLayout = "auto" | "fixed";

export interface DataGridContainerProps extends HTMLAttributes<HTMLDivElement> { "data-slot"?: string; }
export interface DataGridRootProps extends AtomDataGridRootProps { variant?: DataGridVariant; size?: DataGridSize; density?: DataGridDensity; surface?: DataGridSurface; borderTone?: DataGridBorderTone; showColumnBorder?: boolean; layout?: DataGridLayout; striped?: boolean; stickyHeader?: boolean; }
export interface DataGridCaptionProps extends AtomDataGridCaptionProps { side?: DataGridCaptionSide; }
export interface DataGridColumnGroupProps extends AtomDataGridColumnGroupProps {}
export interface DataGridColumnProps extends AtomDataGridColumnProps {}
export interface DataGridHeaderProps extends AtomDataGridHeaderProps {}
export interface DataGridBodyProps extends AtomDataGridBodyProps {}
export interface DataGridFooterProps extends AtomDataGridFooterProps {}
export interface DataGridRowProps extends AtomDataGridRowProps {}
export interface DataGridColumnHeaderProps extends Omit<AtomDataGridColumnHeaderProps, "align"> { align?: DataGridCellAlign; verticalAlign?: DataGridCellVerticalAlign; numeric?: boolean; }
export interface DataGridCellProps extends Omit<AtomDataGridCellProps, "align"> { align?: DataGridCellAlign; verticalAlign?: DataGridCellVerticalAlign; numeric?: boolean; }
export interface DataGridSortIndicatorProps extends HTMLAttributes<HTMLSpanElement> { "data-slot"?: string; }

function mergeClassName(base: string, className?: string) { return className ? `${base} ${className}` : base; }
function slot(value: string | undefined, fallback: string) { return value ?? fallback; }

export const DataGridContainer = forwardRef<HTMLDivElement, DataGridContainerProps>(function DataGridContainer({ className, "data-slot": dataSlot, ...props }, ref) {
  return <div {...props} className={mergeClassName("brick-data-grid-container", className)} data-slot={slot(dataSlot, "data-grid-container")} ref={ref} />;
});
export const DataGridRoot = forwardRef<HTMLTableElement, DataGridRootProps>(function DataGridRoot({ variant = "line", size = "md", density = "comfortable", surface = "transparent", borderTone = "default", showColumnBorder = false, layout = "auto", striped = false, stickyHeader = false, className, "data-slot": dataSlot, ...props }, ref) {
  return <AtomDataGrid.Root {...props} className={mergeClassName("brick-data-grid", className)} data-border-tone={borderTone} data-column-border={showColumnBorder ? "" : undefined} data-density={density} data-layout={layout} data-size={size} data-slot={slot(dataSlot, "data-grid")} data-sticky-header={stickyHeader ? "" : undefined} data-striped={striped ? "" : undefined} data-surface={surface} data-variant={variant} ref={ref} />;
});
export const DataGridColumnGroup = forwardRef<HTMLTableColElement, DataGridColumnGroupProps>(function DataGridColumnGroup({ className, "data-slot": dataSlot, ...props }, ref) {
  return <AtomDataGrid.ColumnGroup {...props} className={mergeClassName("brick-data-grid__column-group", className)} data-slot={slot(dataSlot, "data-grid-column-group")} ref={ref} />;
});
export const DataGridColumn = forwardRef<HTMLTableColElement, DataGridColumnProps>(function DataGridColumn({ className, "data-slot": dataSlot, ...props }, ref) {
  return <AtomDataGrid.Column {...props} className={mergeClassName("brick-data-grid__column", className)} data-slot={slot(dataSlot, "data-grid-column")} ref={ref} />;
});
export const DataGridCaption = forwardRef<HTMLTableCaptionElement, DataGridCaptionProps>(function DataGridCaption({ side = "bottom", className, "data-slot": dataSlot, ...props }, ref) {
  return <AtomDataGrid.Caption {...props} className={mergeClassName("brick-data-grid__caption", className)} data-side={side} data-slot={slot(dataSlot, "data-grid-caption")} ref={ref} />;
});
export const DataGridHeader = forwardRef<HTMLTableSectionElement, DataGridHeaderProps>(function DataGridHeader({ className, "data-slot": dataSlot, ...props }, ref) {
  return <AtomDataGrid.Header {...props} className={mergeClassName("brick-data-grid__header", className)} data-slot={slot(dataSlot, "data-grid-header")} ref={ref} />;
});
export const DataGridBody = forwardRef<HTMLTableSectionElement, DataGridBodyProps>(function DataGridBody({ className, "data-slot": dataSlot, ...props }, ref) {
  return <AtomDataGrid.Body {...props} className={mergeClassName("brick-data-grid__body", className)} data-slot={slot(dataSlot, "data-grid-body")} ref={ref} />;
});
export const DataGridFooter = forwardRef<HTMLTableSectionElement, DataGridFooterProps>(function DataGridFooter({ className, "data-slot": dataSlot, ...props }, ref) {
  return <AtomDataGrid.Footer {...props} className={mergeClassName("brick-data-grid__footer", className)} data-slot={slot(dataSlot, "data-grid-footer")} ref={ref} />;
});
export const DataGridRow = forwardRef<HTMLTableRowElement, DataGridRowProps>(function DataGridRow({ className, "data-slot": dataSlot, ...props }, ref) {
  return <AtomDataGrid.Row {...props} className={mergeClassName("brick-data-grid__row", className)} data-slot={slot(dataSlot, "data-grid-row")} ref={ref} />;
});
export const DataGridColumnHeader = forwardRef<HTMLTableCellElement, DataGridColumnHeaderProps>(function DataGridColumnHeader({ align, verticalAlign = "middle", numeric = false, className, "data-slot": dataSlot, ...props }, ref) {
  return <AtomDataGrid.ColumnHeader {...props} className={mergeClassName("brick-data-grid__column-header", className)} data-align={align ?? (numeric ? "end" : "start")} data-numeric={numeric ? "" : undefined} data-slot={slot(dataSlot, "data-grid-column-header")} data-vertical-align={verticalAlign} ref={ref} />;
});
export const DataGridCell = forwardRef<HTMLTableCellElement, DataGridCellProps>(function DataGridCell({ align, verticalAlign = "middle", numeric = false, className, "data-slot": dataSlot, ...props }, ref) {
  return <AtomDataGrid.Cell {...props} className={mergeClassName("brick-data-grid__cell", className)} data-align={align ?? (numeric ? "end" : "start")} data-numeric={numeric ? "" : undefined} data-slot={slot(dataSlot, "data-grid-cell")} data-vertical-align={verticalAlign} ref={ref} />;
});
export const DataGridSortIndicator = forwardRef<HTMLSpanElement, DataGridSortIndicatorProps>(function DataGridSortIndicator({ className, "data-slot": dataSlot, children, ...props }, ref) {
  return <span {...props} aria-hidden="true" className={mergeClassName("brick-data-grid__sort-indicator", className)} data-slot={slot(dataSlot, "data-grid-sort-indicator")} ref={ref}>{children ?? <svg aria-hidden="true" viewBox="0 0 16 16"><path d="m4 6 4-4 4 4M12 10l-4 4-4-4" /></svg>}</span>;
});

DataGridContainer.displayName = "DataGrid.Container";
DataGridRoot.displayName = "DataGrid.Root";
DataGridColumnGroup.displayName = "DataGrid.ColumnGroup";
DataGridColumn.displayName = "DataGrid.Column";
DataGridCaption.displayName = "DataGrid.Caption";
DataGridHeader.displayName = "DataGrid.Header";
DataGridBody.displayName = "DataGrid.Body";
DataGridFooter.displayName = "DataGrid.Footer";
DataGridRow.displayName = "DataGrid.Row";
DataGridColumnHeader.displayName = "DataGrid.ColumnHeader";
DataGridCell.displayName = "DataGrid.Cell";
DataGridSortIndicator.displayName = "DataGrid.SortIndicator";

export const DataGrid = Object.freeze({ Container: DataGridContainer, Root: DataGridRoot, ColumnGroup: DataGridColumnGroup, Column: DataGridColumn, Caption: DataGridCaption, Header: DataGridHeader, Body: DataGridBody, Footer: DataGridFooter, Row: DataGridRow, ColumnHeader: DataGridColumnHeader, Cell: DataGridCell, SortIndicator: DataGridSortIndicator });

import { forwardRef, type CSSProperties, type HTMLAttributes } from "react";
import {
  Table as AtomTable,
  type TableBodyProps as AtomTableBodyProps,
  type TableCaptionProps as AtomTableCaptionProps,
  type TableCellProps as AtomTableCellProps,
  type TableColumnGroupProps as AtomTableColumnGroupProps,
  type TableColumnProps as AtomTableColumnProps,
  type TableFooterProps as AtomTableFooterProps,
  type TableHeadProps as AtomTableHeadProps,
  type TableHeaderProps as AtomTableHeaderProps,
  type TableRootProps as AtomTableRootProps,
  type TableRowProps as AtomTableRowProps,
} from "@flowstack-ui/atom/table";

export type TableVariant = "line" | "outline";
export type TableSize = "sm" | "md" | "lg";
export type TableDensity = "compact" | "comfortable";
export type TableCaptionSide = "top" | "bottom";
export type TableCellAlign = "start" | "center" | "end";
export type TableCellVerticalAlign = "top" | "middle" | "bottom";
export type TableSurface = "transparent" | "base";
export type TableBorderTone = "subtle" | "default" | "strong";
export type TableLayout = "auto" | "fixed";
export type TableRowVariant = "default" | "section";
export type TableLength = string | number;

export interface TableContainerProps extends HTMLAttributes<HTMLDivElement> {
  "data-slot"?: string;
}
export interface TableRootProps extends AtomTableRootProps {
  variant?: TableVariant;
  size?: TableSize;
  density?: TableDensity;
  striped?: boolean;
  stickyHeader?: boolean;
  surface?: TableSurface;
  borderTone?: TableBorderTone;
  showColumnBorder?: boolean;
  layout?: TableLayout;
  minInlineSize?: TableLength;
}
export interface TableCaptionProps extends AtomTableCaptionProps { side?: TableCaptionSide; }
export interface TableColumnGroupProps extends AtomTableColumnGroupProps {}
export interface TableColumnProps extends AtomTableColumnProps {}
export interface TableHeaderProps extends AtomTableHeaderProps {}
export interface TableBodyProps extends AtomTableBodyProps {}
export interface TableFooterProps extends AtomTableFooterProps {}
export interface TableRowProps extends AtomTableRowProps { variant?: TableRowVariant; }
export interface TableHeadProps extends Omit<AtomTableHeadProps, "align"> { align?: TableCellAlign; verticalAlign?: TableCellVerticalAlign; numeric?: boolean; }
export interface TableCellProps extends Omit<AtomTableCellProps, "align"> { align?: TableCellAlign; verticalAlign?: TableCellVerticalAlign; numeric?: boolean; }
export interface TableSortIndicatorProps extends HTMLAttributes<HTMLSpanElement> { "data-slot"?: string; }

function mergeClassName(base: string, className?: string) { return className ? `${base} ${className}` : base; }
function slot(value: string | undefined, fallback: string) { return value ?? fallback; }
function serializeLength(value: TableLength) { return typeof value === "number" && value !== 0 ? `${value}px` : String(value); }
type TableRootStyle = CSSProperties & { "--brick-table-min-inline-size"?: string };

export const TableContainer = forwardRef<HTMLDivElement, TableContainerProps>(function TableContainer({ className, "data-slot": dataSlot, ...props }, ref) {
  return <div {...props} className={mergeClassName("brick-table-container", className)} data-slot={slot(dataSlot, "table-container")} ref={ref} />;
});
export const TableRoot = forwardRef<HTMLTableElement, TableRootProps>(function TableRoot({ variant = "line", size = "md", density = "comfortable", striped = false, stickyHeader = false, surface = "transparent", borderTone = "default", showColumnBorder = false, layout = "auto", minInlineSize, className, style, "data-slot": dataSlot, ...props }, ref) {
  const rootStyle: TableRootStyle = { ...style };
  if (minInlineSize !== undefined) rootStyle["--brick-table-min-inline-size"] = serializeLength(minInlineSize);
  return <AtomTable.Root {...props} className={mergeClassName("brick-table", className)} data-border-tone={borderTone} data-column-border={showColumnBorder ? "" : undefined} data-density={density} data-layout={layout} data-size={size} data-slot={slot(dataSlot, "table")} data-sticky-header={stickyHeader ? "" : undefined} data-striped={striped ? "" : undefined} data-surface={surface} data-variant={variant} ref={ref} style={rootStyle} />;
});
export const TableColumnGroup = forwardRef<HTMLTableColElement, TableColumnGroupProps>(function TableColumnGroup({ className, "data-slot": dataSlot, ...props }, ref) {
  return <AtomTable.ColumnGroup {...props} className={mergeClassName("brick-table__column-group", className)} data-slot={slot(dataSlot, "table-column-group")} ref={ref} />;
});
export const TableColumn = forwardRef<HTMLTableColElement, TableColumnProps>(function TableColumn({ className, "data-slot": dataSlot, ...props }, ref) {
  return <AtomTable.Column {...props} className={mergeClassName("brick-table__column", className)} data-slot={slot(dataSlot, "table-column")} ref={ref} />;
});
export const TableCaption = forwardRef<HTMLTableCaptionElement, TableCaptionProps>(function TableCaption({ side = "top", className, "data-slot": dataSlot, ...props }, ref) {
  return <AtomTable.Caption {...props} className={mergeClassName("brick-table__caption", className)} data-side={side} data-slot={slot(dataSlot, "table-caption")} ref={ref} />;
});
export const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>(function TableHeader({ className, "data-slot": dataSlot, ...props }, ref) {
  return <AtomTable.Header {...props} className={mergeClassName("brick-table__header", className)} data-slot={slot(dataSlot, "table-header")} ref={ref} />;
});
export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(function TableBody({ className, "data-slot": dataSlot, ...props }, ref) {
  return <AtomTable.Body {...props} className={mergeClassName("brick-table__body", className)} data-slot={slot(dataSlot, "table-body")} ref={ref} />;
});
export const TableFooter = forwardRef<HTMLTableSectionElement, TableFooterProps>(function TableFooter({ className, "data-slot": dataSlot, ...props }, ref) {
  return <AtomTable.Footer {...props} className={mergeClassName("brick-table__footer", className)} data-slot={slot(dataSlot, "table-footer")} ref={ref} />;
});
export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(function TableRow({ className, variant = "default", "data-slot": dataSlot, ...props }, ref) {
  return <AtomTable.Row {...props} className={mergeClassName("brick-table__row", className)} data-slot={slot(dataSlot, "table-row")} data-variant={variant} ref={ref} />;
});
export const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(function TableHead({ align, verticalAlign = "middle", numeric = false, className, "data-slot": dataSlot, ...props }, ref) {
  return <AtomTable.Head {...props} className={mergeClassName("brick-table__head", className)} data-align={align ?? (numeric ? "end" : "start")} data-numeric={numeric ? "" : undefined} data-slot={slot(dataSlot, "table-head")} data-vertical-align={verticalAlign} ref={ref} />;
});
export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(function TableCell({ align, verticalAlign = "middle", numeric = false, className, "data-slot": dataSlot, ...props }, ref) {
  return <AtomTable.Cell {...props} className={mergeClassName("brick-table__cell", className)} data-align={align ?? (numeric ? "end" : "start")} data-numeric={numeric ? "" : undefined} data-slot={slot(dataSlot, "table-cell")} data-vertical-align={verticalAlign} ref={ref} />;
});
export const TableSortIndicator = forwardRef<HTMLSpanElement, TableSortIndicatorProps>(function TableSortIndicator({ className, "data-slot": dataSlot, ...props }, ref) {
  return <span {...props} aria-hidden="true" className={mergeClassName("brick-table__sort-indicator", className)} data-slot={slot(dataSlot, "table-sort-indicator")} ref={ref}><svg aria-hidden="true" viewBox="0 0 16 16"><path d="m4 6 4-4 4 4M12 10l-4 4-4-4" /></svg></span>;
});

TableContainer.displayName = "Table.Container";
TableRoot.displayName = "Table.Root";
TableColumnGroup.displayName = "Table.ColumnGroup";
TableColumn.displayName = "Table.Column";
TableCaption.displayName = "Table.Caption";
TableHeader.displayName = "Table.Header";
TableBody.displayName = "Table.Body";
TableFooter.displayName = "Table.Footer";
TableRow.displayName = "Table.Row";
TableHead.displayName = "Table.Head";
TableCell.displayName = "Table.Cell";
TableSortIndicator.displayName = "Table.SortIndicator";

export const Table = Object.freeze({ Container: TableContainer, Root: TableRoot, ColumnGroup: TableColumnGroup, Column: TableColumn, Caption: TableCaption, Header: TableHeader, Body: TableBody, Footer: TableFooter, Row: TableRow, Head: TableHead, Cell: TableCell, SortIndicator: TableSortIndicator });

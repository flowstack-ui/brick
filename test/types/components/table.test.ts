import { createElement, createRef } from "react";
import { Table, TableColumn, TableColumnGroup, TableRoot, type TableBorderTone, type TableCellAlign, type TableCellVerticalAlign, type TableColumnGroupProps, type TableColumnProps, type TableDensity, type TableLayout, type TableRowVariant, type TableSize, type TableSurface, type TableVariant } from "../../../src/table.js";
import { Table as RootTable } from "../../../src/index.js";

const variant: TableVariant = "outline";
const size: TableSize = "lg";
const density: TableDensity = "compact";
const align: TableCellAlign = "end";
const verticalAlign: TableCellVerticalAlign = "top";
const surface: TableSurface = "transparent";
const borderTone: TableBorderTone = "default";
const layout: TableLayout = "fixed";
const rowVariant: TableRowVariant = "section";
const rootRef = createRef<HTMLTableElement>();
const cellRef = createRef<HTMLTableCellElement>();
const columnRef = createRef<HTMLTableColElement>();
const columnGroupProps: TableColumnGroupProps = { children: createElement(TableColumn, { htmlWidth: "35%" }) };
const columnProps: TableColumnProps = { htmlWidth: 240 };

createElement(Table.Root, { variant, size, density, surface, borderTone, layout, minInlineSize: "52rem", showColumnBorder: true, striped: true, stickyHeader: true, ref: rootRef, "aria-label": "Results" }, createElement(TableColumnGroup, columnGroupProps), createElement(Table.ColumnGroup, null, createElement(Table.Column, { ...columnProps, ref: columnRef })), createElement(Table.Body, null, createElement(Table.Row, { variant: rowVariant }, createElement(Table.Cell, { align, verticalAlign, numeric: true, ref: cellRef, colSpan: 2 }, "42"))));
createElement(TableRoot, { render: createElement("table") });
createElement(RootTable.Root, null, createElement(RootTable.Caption, { side: "bottom" }, "Results"));

// @ts-expect-error native column width hints accept pixels or percentages, not CSS units
createElement(Table.Column, { htmlWidth: "18rem" });
// @ts-expect-error closed variant
createElement(Table.Root, { variant: "filled" });
// @ts-expect-error physical native align is deliberately replaced
createElement(Table.Cell, { align: "left" });
// @ts-expect-error closed density
createElement(Table.Root, { density: "spacious" });
// @ts-expect-error closed vertical alignment
createElement(Table.Cell, { verticalAlign: "baseline" });

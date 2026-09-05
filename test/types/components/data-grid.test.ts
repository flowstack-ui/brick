import { createElement, createRef } from "react";
import { DataGrid, DataGridColumn, DataGridColumnGroup, DataGridRoot, type DataGridBorderTone, type DataGridCellAlign, type DataGridCellVerticalAlign, type DataGridColumnGroupProps, type DataGridColumnProps, type DataGridDensity, type DataGridLayout, type DataGridSize, type DataGridSurface, type DataGridVariant } from "../../../src/data-grid.js";
import { DataGrid as RootDataGrid } from "../../../src/index.js";

const variant: DataGridVariant = "outline";
const size: DataGridSize = "lg";
const density: DataGridDensity = "spacious";
const align: DataGridCellAlign = "end";
const verticalAlign: DataGridCellVerticalAlign = "bottom";
const surface: DataGridSurface = "base";
const borderTone: DataGridBorderTone = "strong";
const layout: DataGridLayout = "fixed";
const rootRef = createRef<HTMLTableElement>();
const cellRef = createRef<HTMLTableCellElement>();
const columnRef = createRef<HTMLTableColElement>();
const columnGroupProps: DataGridColumnGroupProps = { children: createElement(DataGridColumn, { htmlWidth: "50%" }) };
const columnProps: DataGridColumnProps = { htmlWidth: 160 };

createElement(DataGrid.Root, { variant, size, density, surface, borderTone, layout, showColumnBorder: true, striped: true, stickyHeader: true, columnCount: 2, rowCount: 1, ref: rootRef, "aria-label": "Results", selectionMode: "single", value: "row", activeCell: { rowIndex: 1, columnIndex: 1 } }, createElement(DataGridColumnGroup, columnGroupProps), createElement(DataGrid.ColumnGroup, null, createElement(DataGrid.Column, { ...columnProps, ref: columnRef })), createElement(DataGrid.Body, null, createElement(DataGrid.Row, { rowIndex: 1, value: "row", selectable: true }, createElement(DataGrid.Cell, { columnIndex: 1, align, verticalAlign, numeric: true, ref: cellRef }, "42"))));
createElement(DataGrid.ColumnHeader, { columnIndex: 0, sortDirection: "ascending", onAction: () => undefined }, "Name");
createElement(DataGridRoot, { columnCount: 0, rowCount: 0, "aria-label": "Empty" });
createElement(RootDataGrid.Root, { columnCount: 0, rowCount: 0, "aria-label": "Empty" });

// @ts-expect-error native column width hints accept pixels or percentages, not CSS units
createElement(DataGrid.Column, { htmlWidth: "16rem" });
// @ts-expect-error closed variant
createElement(DataGrid.Root, { variant: "filled" });
// @ts-expect-error physical native align is deliberately replaced
createElement(DataGrid.Cell, { align: "left" });
// @ts-expect-error closed density
createElement(DataGrid.Root, { density: "dense" });
// @ts-expect-error closed vertical alignment
createElement(DataGrid.Cell, { columnIndex: 1, verticalAlign: "baseline" });

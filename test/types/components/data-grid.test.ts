import { createElement, createRef } from "react";
import { DataGrid, DataGridRoot, type DataGridCellAlign, type DataGridDensity, type DataGridSize, type DataGridVariant } from "../../../src/data-grid.js";
import { DataGrid as RootDataGrid } from "../../../src/index.js";

const variant: DataGridVariant = "outline";
const size: DataGridSize = "lg";
const density: DataGridDensity = "spacious";
const align: DataGridCellAlign = "end";
const rootRef = createRef<HTMLTableElement>();
const cellRef = createRef<HTMLTableCellElement>();

createElement(DataGrid.Root, { variant, size, density, columnCount: 2, rowCount: 1, ref: rootRef, "aria-label": "Results", selectionMode: "single", value: "row", activeCell: { rowIndex: 1, columnIndex: 1 } }, createElement(DataGrid.Body, null, createElement(DataGrid.Row, { rowIndex: 1, value: "row", selectable: true }, createElement(DataGrid.Cell, { columnIndex: 1, align, numeric: true, ref: cellRef }, "42"))));
createElement(DataGrid.ColumnHeader, { columnIndex: 0, sortDirection: "ascending", onAction: () => undefined }, "Name");
createElement(DataGridRoot, { columnCount: 0, rowCount: 0, "aria-label": "Empty" });
createElement(RootDataGrid.Root, { columnCount: 0, rowCount: 0, "aria-label": "Empty" });

// @ts-expect-error closed variant
createElement(DataGrid.Root, { variant: "filled" });
// @ts-expect-error physical native align is deliberately replaced
createElement(DataGrid.Cell, { align: "left" });
// @ts-expect-error closed density
createElement(DataGrid.Root, { density: "dense" });

import { createElement, createRef } from "react";
import { TreeGrid, TreeGridRoot, type TreeGridCellAlign, type TreeGridDensity, type TreeGridSize, type TreeGridVariant } from "../../../src/tree-grid.js";
import { TreeGrid as RootTreeGrid } from "../../../src/index.js";

const variant: TreeGridVariant = "outline";
const size: TreeGridSize = "lg";
const density: TreeGridDensity = "spacious";
const align: TreeGridCellAlign = "end";
const rootRef = createRef<HTMLElement>();
const cellRef = createRef<HTMLTableCellElement>();

createElement(TreeGrid.Root, { variant, size, density, columnCount: 2, rowCount: 1, ref: rootRef, "aria-label": "Files", selectionMode: "single", value: "src", expandedValue: ["src"], activeCell: { rowIndex: 1, columnIndex: 1 } }, createElement(TreeGrid.Body, null, createElement(TreeGrid.Row, { rowIndex: 1, value: "src", level: 1, expandable: true, selectable: true }, createElement(TreeGrid.RowHeader, { columnIndex: 1 }, createElement(TreeGrid.Indicator), "src"), createElement(TreeGrid.Cell, { columnIndex: 2, align, numeric: true, ref: cellRef }, "42"))));
createElement(TreeGrid.ColumnHeader, { columnIndex: 1, sortDirection: "ascending", onAction: () => undefined }, "Name", createElement(TreeGrid.SortIndicator));
createElement(TreeGridRoot, { columnCount: 0, rowCount: 0, "aria-label": "Empty" });
createElement(RootTreeGrid.Root, { columnCount: 0, rowCount: 0, "aria-label": "Empty" });

// @ts-expect-error closed variant
createElement(TreeGrid.Root, { variant: "filled" });
// @ts-expect-error physical native align is deliberately replaced
createElement(TreeGrid.Cell, { align: "left" });
// @ts-expect-error closed density
createElement(TreeGrid.Root, { density: "dense" });

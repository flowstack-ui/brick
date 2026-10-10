import { createElement, createRef } from "react";
import { TreeGrid, TreeGridColumn, TreeGridColumnGroup, TreeGridRoot, type TreeGridBorderTone, type TreeGridCellAlign, type TreeGridCellVerticalAlign, type TreeGridColumnGroupProps, type TreeGridColumnProps, type TreeGridDensity, type TreeGridLayout, type TreeGridSize, type TreeGridSurface, type TreeGridVariant } from "../../../src/tree-grid.js";
import { TreeGrid as RootTreeGrid } from "../../../src/index.js";

const variant: TreeGridVariant = "outline";
const size: TreeGridSize = "lg";
const density: TreeGridDensity = "spacious";
const align: TreeGridCellAlign = "end";
const verticalAlign: TreeGridCellVerticalAlign = "top";
const surface: TreeGridSurface = "transparent";
const borderTone: TreeGridBorderTone = "subtle";
const layout: TreeGridLayout = "fixed";
const rootRef = createRef<HTMLElement>();
const cellRef = createRef<HTMLTableCellElement>();
const columnRef = createRef<HTMLTableColElement>();
const columnGroupProps: TreeGridColumnGroupProps = { children: createElement(TreeGridColumn, { htmlWidth: "50%" }) };
const columnProps: TreeGridColumnProps = { htmlWidth: 200 };

createElement(TreeGrid.Root, { variant, size, density, surface, borderTone, layout, showColumnBorder: true, striped: true, stickyHeader: true, columnCount: 2, rowCount: 1, ref: rootRef, "aria-label": "Files", selectionMode: "single", value: "src", expandedValue: ["src"], activeCell: { rowIndex: 1, columnIndex: 1 } }, createElement(TreeGridColumnGroup, columnGroupProps), createElement(TreeGrid.ColumnGroup, null, createElement(TreeGrid.Column, { ...columnProps, ref: columnRef })), createElement(TreeGrid.Body, null, createElement(TreeGrid.Row, { rowIndex: 1, value: "src", level: 1, expandable: true, selectable: true }, createElement(TreeGrid.RowHeader, { columnIndex: 1 }, createElement(TreeGrid.Indicator), "src"), createElement(TreeGrid.Cell, { columnIndex: 2, align, verticalAlign, numeric: true, ref: cellRef }, "42"))));
createElement(TreeGrid.ColumnHeader, { columnIndex: 1, sortDirection: "ascending", onAction: () => undefined }, "Name", createElement(TreeGrid.SortIndicator));
createElement(TreeGridRoot, { columnCount: 0, rowCount: 0, "aria-label": "Empty" });
createElement(RootTreeGrid.Root, { columnCount: 0, rowCount: 0, "aria-label": "Empty" });

// @ts-expect-error native column width hints accept pixels or percentages, not CSS units
createElement(TreeGrid.Column, { htmlWidth: "18rem" });
// @ts-expect-error closed variant
createElement(TreeGrid.Root, { variant: "filled" });
// @ts-expect-error physical native align is deliberately replaced
createElement(TreeGrid.Cell, { align: "left" });
// @ts-expect-error closed density
createElement(TreeGrid.Root, { density: "dense" });
// @ts-expect-error closed vertical alignment
createElement(TreeGrid.Cell, { columnIndex: 1, verticalAlign: "baseline" });

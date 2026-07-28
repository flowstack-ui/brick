import { createElement, createRef } from "react";
import { Table, TableRoot, type TableCellAlign, type TableDensity, type TableSize, type TableVariant } from "../../../src/table.js";
import { Table as RootTable } from "../../../src/index.js";

const variant: TableVariant = "outline";
const size: TableSize = "lg";
const density: TableDensity = "compact";
const align: TableCellAlign = "end";
const rootRef = createRef<HTMLTableElement>();
const cellRef = createRef<HTMLTableCellElement>();

createElement(Table.Root, { variant, size, density, striped: true, stickyHeader: true, ref: rootRef, "aria-label": "Results" }, createElement(Table.Body, null, createElement(Table.Row, null, createElement(Table.Cell, { align, numeric: true, ref: cellRef, colSpan: 2 }, "42"))));
createElement(TableRoot, { render: createElement("table") });
createElement(RootTable.Root, null, createElement(RootTable.Caption, { side: "bottom" }, "Results"));

// @ts-expect-error closed variant
createElement(Table.Root, { variant: "filled" });
// @ts-expect-error physical native align is deliberately replaced
createElement(Table.Cell, { align: "left" });
// @ts-expect-error closed density
createElement(Table.Root, { density: "spacious" });

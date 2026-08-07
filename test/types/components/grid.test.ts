import { createElement, createRef } from "react";
import {
  Grid,
  type GridAlign,
  type GridColumnSpan,
  type GridColumns,
  type GridGap,
  type GridItemElement,
  type GridItemProps,
  type GridJustify,
  type GridLine,
  type GridMinItemSize,
  type GridRootElement,
  type GridRootProps,
  type GridSelfAlign,
  type GridSelfJustify,
  type GridSpan,
} from "../../../src/grid.js";
import { Grid as RootGrid } from "../../../src/index.js";

const ref = createRef<HTMLElement>();
const rootElements: GridRootElement[] = [
  "div", "span", "section", "article", "nav", "header", "footer",
  "main", "aside", "ul", "ol", "li",
];
const itemElements: GridItemElement[] = [
  "div", "span", "section", "article", "header", "footer", "aside", "li",
];
const columns: GridColumns[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const lines: GridLine[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
const spans: GridSpan[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const columnSpans: GridColumnSpan[] = [...spans, "full"];
const gaps: GridGap[] = ["0", "1", "2", "3", "4", "5", "6"];
const sizes: GridMinItemSize[] = ["xs", "sm", "md", "lg", "xl"];
const aligns: GridAlign[] = ["stretch", "start", "center", "end", "baseline"];
const justifies: GridJustify[] = ["stretch", "start", "center", "end"];
const selfAligns: GridSelfAlign[] = ["auto", ...aligns];
const selfJustifies: GridSelfJustify[] = ["auto", ...justifies];
const rootProps: GridRootProps = {
  "aria-label": "Summary",
  as: "section",
  children: "Content",
  className: "consumer-grid",
  columns: 3,
  gap: "3",
  onClick: () => undefined,
  style: { minInlineSize: 0 },
};
const itemProps: GridItemProps = {
  as: "article",
  children: "Featured",
  columnSpan: 2,
  rowSpan: 2,
};

createElement(Grid.Root, { ...rootProps, ref });
createElement(Grid.Item, { ...itemProps, ref });
createElement(RootGrid.Root, { minItemSize: "md" });
createElement(RootGrid.Item, { columnSpan: "full" });
createElement(Grid.Item, { columnStart: 2, columnSpan: 3 });
createElement(Grid.Item, { columnStart: 2, columnEnd: 5 });
createElement(Grid.Item, { rowStart: 2, rowSpan: 3 });
createElement(Grid.Item, { rowStart: 2, rowEnd: 5 });
createElement(Grid.Item, {
  asChild: true,
  children: createElement("a", { href: "/reports" }),
  columnStart: 2,
});

// @ts-expect-error Root hosts are deliberately closed.
createElement(Grid.Root, { as: "table" });
// @ts-expect-error Item hosts are deliberately closed.
createElement(Grid.Item, { as: "button" });
// @ts-expect-error Explicit and intrinsic modes are mutually exclusive.
createElement(Grid.Root, { columns: 3, minItemSize: "md" });
// @ts-expect-error Columns use the closed 1-12 scale.
createElement(Grid.Root, { columns: 13 });
// @ts-expect-error Arbitrary minimum sizes are excluded.
createElement(Grid.Root, { minItemSize: "18rem" });
// @ts-expect-error Arbitrary gaps are excluded.
createElement(Grid.Root, { gap: "8" });
// @ts-expect-error Responsive objects are excluded.
createElement(Grid.Root, { columns: { base: 1, md: 3 } });
// @ts-expect-error Physical alignment is excluded.
createElement(Grid.Root, { align: "left" });
// @ts-expect-error Span and explicit end are mutually exclusive.
createElement(Grid.Item, { columnSpan: 2, columnEnd: 4 });
// @ts-expect-error Full span cannot combine with a start.
createElement(Grid.Item, { columnSpan: "full", columnStart: 2 });
// @ts-expect-error Row span and explicit end are mutually exclusive.
createElement(Grid.Item, { rowSpan: 2, rowEnd: 4 });
// @ts-expect-error Placement lines are closed at 13.
createElement(Grid.Item, { columnStart: 14 });
// @ts-expect-error Spans are closed at 12.
createElement(Grid.Item, { rowSpan: 13 });
// @ts-expect-error Ordering is deliberately excluded.
createElement(Grid.Item, { order: 2 });
// @ts-expect-error Root deliberately has no asChild composition API.
createElement(Grid.Root, { asChild: true });
// @ts-expect-error Item asChild requires exactly one React element.
createElement(Grid.Item, { asChild: true, children: "Text" });
// @ts-expect-error Item asChild and as are mutually exclusive.
createElement(Grid.Item, { as: "article", asChild: true, children: createElement("a") });
// @ts-expect-error No render composition API.
createElement(Grid.Item, { render: createElement("div") });

void rootElements;
void itemElements;
void columns;
void lines;
void spans;
void columnSpans;
void gaps;
void sizes;
void aligns;
void justifies;
void selfAligns;
void selfJustifies;

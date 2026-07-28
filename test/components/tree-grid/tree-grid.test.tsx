import { createRef } from "react";
import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TreeGrid, type TreeGridDensity, type TreeGridSize, type TreeGridVariant } from "../../../src/tree-grid.js";

Element.prototype.scrollIntoView = vi.fn();

function Example(props: Partial<React.ComponentProps<typeof TreeGrid.Root>> = {}) {
  return <TreeGrid.Container data-testid="container"><TreeGrid.Root {...props} aria-label="Release files" columnCount={3} rowCount={2} data-testid="root" defaultExpandedValue={["src"]}><TreeGrid.Caption>Release files</TreeGrid.Caption><TreeGrid.Header><TreeGrid.Row value="header" rowIndex={1} selectable={false}><TreeGrid.ColumnHeader columnIndex={1}>Name</TreeGrid.ColumnHeader><TreeGrid.ColumnHeader columnIndex={2}>Type</TreeGrid.ColumnHeader><TreeGrid.ColumnHeader columnIndex={3} numeric>Bytes</TreeGrid.ColumnHeader></TreeGrid.Row></TreeGrid.Header><TreeGrid.Body><TreeGrid.Row value="src" rowIndex={2} level={1} expandable selectable><TreeGrid.RowHeader columnIndex={1}><TreeGrid.Indicator />src</TreeGrid.RowHeader><TreeGrid.Cell columnIndex={2}>Folder</TreeGrid.Cell><TreeGrid.Cell columnIndex={3} numeric>—</TreeGrid.Cell></TreeGrid.Row></TreeGrid.Body></TreeGrid.Root></TreeGrid.Container>;
}

describe("TreeGrid", () => {
  it("renders the twelve-part anatomy, refs, defaults, and slots", () => {
    const containerRef = createRef<HTMLDivElement>();
    const rootRef = createRef<HTMLElement>();
    const rowHeaderRef = createRef<HTMLTableCellElement>();
    const { getByTestId, getByText } = render(<TreeGrid.Container ref={containerRef} data-testid="container"><TreeGrid.Root ref={rootRef} aria-label="Files" columnCount={1} rowCount={1} data-testid="root"><TreeGrid.Caption>Files</TreeGrid.Caption><TreeGrid.Header><TreeGrid.Row value="header" rowIndex={1} selectable={false}><TreeGrid.ColumnHeader columnIndex={1}>Name<TreeGrid.SortIndicator data-testid="sort-indicator" /></TreeGrid.ColumnHeader></TreeGrid.Row></TreeGrid.Header><TreeGrid.Body><TreeGrid.Row value="src" rowIndex={2} level={1} expandable><TreeGrid.RowHeader columnIndex={1} ref={rowHeaderRef}><TreeGrid.Indicator data-testid="indicator" />src</TreeGrid.RowHeader></TreeGrid.Row></TreeGrid.Body><TreeGrid.Footer><TreeGrid.Row value="footer" rowIndex={3} selectable={false}><TreeGrid.Cell columnIndex={1}>1 item</TreeGrid.Cell></TreeGrid.Row></TreeGrid.Footer></TreeGrid.Root></TreeGrid.Container>);
    expect(getByTestId("container")).toBe(containerRef.current);
    expect(rootRef.current?.tagName).toBe("TABLE");
    expect(rowHeaderRef.current?.tagName).toBe("TH");
    expect(getByTestId("root")).toHaveAttribute("role", "treegrid");
    expect(getByTestId("root")).toHaveAttribute("data-variant", "line");
    expect(getByTestId("root")).toHaveAttribute("data-size", "md");
    expect(getByTestId("root")).toHaveAttribute("data-density", "comfortable");
    expect(getByText("Files")).toHaveAttribute("data-side", "bottom");
    expect(getByTestId("indicator")).toHaveAttribute("aria-hidden", "true");
    expect(getByTestId("sort-indicator")).toHaveAttribute("aria-hidden", "true");
  });

  it("exposes closed visual recipes without leaking props", () => {
    const variants: TreeGridVariant[] = ["line", "outline"];
    const sizes: TreeGridSize[] = ["sm", "md", "lg"];
    const densities: TreeGridDensity[] = ["compact", "comfortable", "spacious"];
    const { getByTestId, rerender } = render(<Example />);
    for (const variant of variants) { rerender(<Example variant={variant} />); expect(getByTestId("root")).toHaveAttribute("data-variant", variant); }
    for (const size of sizes) { rerender(<Example size={size} />); expect(getByTestId("root")).toHaveAttribute("data-size", size); }
    for (const density of densities) { rerender(<Example density={density} />); expect(getByTestId("root")).toHaveAttribute("data-density", density); }
    expect(getByTestId("root")).not.toHaveAttribute("variant");
    expect(getByTestId("root")).not.toHaveAttribute("density");
  });

  it("maps hierarchy, alignment, numeric, selection, and expansion state", () => {
    const { getByTestId } = render(<TreeGrid.Root aria-label="Files" columnCount={3} rowCount={1} selectionMode="single" value="src" defaultExpandedValue={["src"]}><TreeGrid.Body><TreeGrid.Row rowIndex={1} value="src" level={3} expandable selectable data-testid="row"><TreeGrid.RowHeader columnIndex={1} data-testid="name"><TreeGrid.Indicator data-testid="indicator" />src</TreeGrid.RowHeader><TreeGrid.Cell columnIndex={2} align="center" data-testid="center">Folder</TreeGrid.Cell><TreeGrid.Cell columnIndex={3} numeric data-testid="numeric">42</TreeGrid.Cell></TreeGrid.Row></TreeGrid.Body></TreeGrid.Root>);
    expect(getByTestId("row")).toHaveAttribute("aria-level", "3");
    expect(getByTestId("row")).toHaveAttribute("aria-expanded", "true");
    expect(getByTestId("row")).toHaveAttribute("aria-selected", "true");
    expect(getByTestId("name")).toHaveAttribute("data-align", "start");
    expect(getByTestId("center")).toHaveAttribute("data-align", "center");
    expect(getByTestId("numeric")).toHaveAttribute("data-align", "end");
    expect(getByTestId("numeric")).toHaveAttribute("data-numeric", "");
    expect(getByTestId("numeric")).not.toHaveAttribute("numeric");
  });

  it("invokes sortable headers by pointer and active-cell Enter", () => {
    const onAction = vi.fn();
    const { getByRole, getByTestId } = render(<TreeGrid.Root aria-label="Files" columnCount={1} rowCount={0}><TreeGrid.Header><TreeGrid.Row value="header" rowIndex={1} selectable={false}><TreeGrid.ColumnHeader columnIndex={1} onAction={onAction} sortDirection="ascending" data-testid="sort">Name<TreeGrid.SortIndicator /></TreeGrid.ColumnHeader></TreeGrid.Row></TreeGrid.Header></TreeGrid.Root>);
    fireEvent.click(getByTestId("sort"));
    expect(onAction).toHaveBeenCalledOnce();
    expect(getByRole("treegrid")).toHaveFocus();
    expect(getByTestId("sort")).toHaveAttribute("data-active", "");
    fireEvent.keyDown(getByRole("treegrid"), { key: "Enter" });
    expect(onAction).toHaveBeenCalledTimes(2);
  });
});

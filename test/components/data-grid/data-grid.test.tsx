import { createRef } from "react";
import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { DataGrid, type DataGridDensity, type DataGridSize, type DataGridVariant } from "../../../src/data-grid.js";

Element.prototype.scrollIntoView = vi.fn();

function Example(props: React.ComponentProps<typeof DataGrid.Root> = {}) {
  return <DataGrid.Container data-testid="container"><DataGrid.Root {...props} aria-label="Projects" columnCount={2} rowCount={2} data-testid="root"><DataGrid.Caption>Projects</DataGrid.Caption><DataGrid.Header><DataGrid.Row rowIndex={1}><DataGrid.ColumnHeader columnIndex={1}>Project</DataGrid.ColumnHeader><DataGrid.ColumnHeader columnIndex={2} numeric>Checks</DataGrid.ColumnHeader></DataGrid.Row></DataGrid.Header><DataGrid.Body><DataGrid.Row rowIndex={2} value="atom" selectable><DataGrid.Cell columnIndex={1}>Atom</DataGrid.Cell><DataGrid.Cell columnIndex={2} numeric>42</DataGrid.Cell></DataGrid.Row></DataGrid.Body></DataGrid.Root></DataGrid.Container>;
}

describe("DataGrid", () => {
  it("renders exact anatomy, refs, defaults, and slots", () => {
    const containerRef = createRef<HTMLDivElement>();
    const rootRef = createRef<HTMLTableElement>();
    const headerRef = createRef<HTMLTableCellElement>();
    const { getByTestId, getByText } = render(<DataGrid.Container ref={containerRef} data-testid="container"><DataGrid.Root ref={rootRef} aria-label="Projects" columnCount={1} rowCount={0} data-testid="root"><DataGrid.Caption>Projects</DataGrid.Caption><DataGrid.Header><DataGrid.Row rowIndex={1}><DataGrid.ColumnHeader columnIndex={1} ref={headerRef}>Project</DataGrid.ColumnHeader></DataGrid.Row></DataGrid.Header></DataGrid.Root></DataGrid.Container>);
    expect(getByTestId("container")).toBe(containerRef.current);
    expect(rootRef.current?.tagName).toBe("TABLE");
    expect(headerRef.current?.tagName).toBe("TH");
    expect(getByTestId("root")).toHaveAttribute("role", "grid");
    expect(getByTestId("root")).toHaveAttribute("data-variant", "line");
    expect(getByTestId("root")).toHaveAttribute("data-size", "md");
    expect(getByTestId("root")).toHaveAttribute("data-density", "comfortable");
    expect(getByText("Projects")).toHaveAttribute("data-side", "bottom");
  });

  it("exposes closed visual recipes without leaking props", () => {
    const variants: DataGridVariant[] = ["line", "outline"];
    const sizes: DataGridSize[] = ["sm", "md", "lg"];
    const densities: DataGridDensity[] = ["compact", "comfortable", "spacious"];
    const { getByTestId, rerender } = render(<Example />);
    for (const variant of variants) { rerender(<Example variant={variant} />); expect(getByTestId("root")).toHaveAttribute("data-variant", variant); }
    for (const size of sizes) { rerender(<Example size={size} />); expect(getByTestId("root")).toHaveAttribute("data-size", size); }
    for (const density of densities) { rerender(<Example density={density} />); expect(getByTestId("root")).toHaveAttribute("data-density", density); }
    expect(getByTestId("root")).not.toHaveAttribute("variant");
    expect(getByTestId("root")).not.toHaveAttribute("density");
  });

  it("preserves Atom grid metadata and invokes actionable headers", () => {
    const onAction = vi.fn();
    const { getByRole, getByTestId } = render(<DataGrid.Root aria-label="Projects" columnCount={1} rowCount={0}><DataGrid.Header><DataGrid.Row rowIndex={1}><DataGrid.ColumnHeader columnIndex={1} onAction={onAction} sortDirection="ascending" data-testid="sort">Project<DataGrid.SortIndicator data-testid="indicator" /></DataGrid.ColumnHeader></DataGrid.Row></DataGrid.Header></DataGrid.Root>);
    expect(getByTestId("sort")).toHaveAttribute("aria-colindex", "1");
    expect(getByTestId("sort")).toHaveAttribute("aria-sort", "ascending");
    expect(getByTestId("sort")).toHaveAttribute("data-actionable", "");
    fireEvent.click(getByTestId("sort"));
    expect(onAction).toHaveBeenCalledOnce();
    expect(getByRole("grid")).toHaveFocus();
    expect(getByTestId("sort")).toHaveAttribute("data-active", "");
    fireEvent.keyDown(getByRole("grid"), { key: "Enter" });
    expect(onAction).toHaveBeenCalledTimes(2);
    expect(getByTestId("indicator")).toHaveAttribute("aria-hidden", "true");
  });

  it("uses logical alignment, numeric defaults, selection, active, and disabled state", () => {
    const { getByTestId } = render(<DataGrid.Root aria-label="Data" columnCount={3} rowCount={1} selectionMode="single" value="row"><DataGrid.Body><DataGrid.Row rowIndex={1} value="row" selectable disabled data-testid="row"><DataGrid.Cell columnIndex={1} numeric data-testid="numeric">42</DataGrid.Cell><DataGrid.Cell columnIndex={2} numeric align="center" data-testid="active">43</DataGrid.Cell><DataGrid.Cell columnIndex={3} data-testid="ordinary">Text</DataGrid.Cell></DataGrid.Row></DataGrid.Body></DataGrid.Root>);
    expect(getByTestId("row")).toHaveAttribute("aria-selected", "true");
    expect(getByTestId("row")).toHaveAttribute("aria-disabled", "true");
    expect(getByTestId("numeric")).toHaveAttribute("data-align", "end");
    expect(getByTestId("active")).toHaveAttribute("data-align", "center");
    expect(getByTestId("ordinary")).toHaveAttribute("data-align", "start");
    expect(getByTestId("numeric")).not.toHaveAttribute("align");
  });
});

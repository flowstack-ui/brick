import { createRef } from "react";
import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { DataGrid, type DataGridBorderTone, type DataGridDensity, type DataGridLayout, type DataGridSize, type DataGridSurface, type DataGridVariant } from "../../../src/data-grid.js";

Element.prototype.scrollIntoView = vi.fn();

function Example(props: React.ComponentProps<typeof DataGrid.Root> = {}) {
  return <DataGrid.Container data-testid="container"><DataGrid.Root {...props} aria-label="Projects" columnCount={2} rowCount={2} data-testid="root"><DataGrid.Caption>Projects</DataGrid.Caption><DataGrid.Header><DataGrid.Row rowIndex={1}><DataGrid.ColumnHeader columnIndex={1}>Project</DataGrid.ColumnHeader><DataGrid.ColumnHeader columnIndex={2} numeric>Checks</DataGrid.ColumnHeader></DataGrid.Row></DataGrid.Header><DataGrid.Body><DataGrid.Row rowIndex={2} value="atom" selectable><DataGrid.Cell columnIndex={1}>Atom</DataGrid.Cell><DataGrid.Cell columnIndex={2} numeric>42</DataGrid.Cell></DataGrid.Row></DataGrid.Body></DataGrid.Root></DataGrid.Container>;
}

describe("DataGrid", () => {
  it("serializes sparse responsive recipes and preserves custom sort artwork", () => {
    const { getByRole, getByTestId } = render(<DataGrid.Root aria-label="Responsive" size={{ md: "lg" }} variant={{ initial: "line", lg: "outline" }} density={{ sm: "compact" }} tone="neutral" minInlineSize={640}><DataGrid.Body><DataGrid.Row rowIndex={1}><DataGrid.RowHeader columnIndex={1} sticky="start" stickyOffset={20}>Name<DataGrid.SortIndicator><span data-testid="custom">↑</span></DataGrid.SortIndicator></DataGrid.RowHeader></DataGrid.Row></DataGrid.Body></DataGrid.Root>);
    expect(getByRole("grid")).toHaveAttribute("data-size", "md");
    expect(getByRole("grid")).toHaveAttribute("data-size-md", "lg");
    expect(getByRole("grid")).toHaveAttribute("data-density-sm", "compact");
    expect(getByRole("grid")).toHaveAttribute("data-tone", "neutral");
    expect(getByRole("rowheader").tagName).toBe("TH");
    expect(getByRole("rowheader")).toHaveAttribute("scope", "row");
    expect(getByTestId("custom")).toHaveTextContent("↑");
  });

  it("establishes entry, moves by pages, and skips newly disabled cells", () => {
    const ExampleRows = ({ disabled = false }) => <DataGrid.Root aria-label="Pages" pageSize={2}><DataGrid.Body>{[1,2,3,4,5].map(row => <DataGrid.Row key={row} rowIndex={row} value={String(row)} disabled={disabled && row === 3}><DataGrid.Cell columnIndex={1}>{row}</DataGrid.Cell><DataGrid.Cell columnIndex={2}>{row * 2}</DataGrid.Cell></DataGrid.Row>)}</DataGrid.Body></DataGrid.Root>;
    const { getByRole, rerender } = render(<ExampleRows />);
    const root = getByRole("grid");
    fireEvent.focusIn(root);
    expect(root.querySelector("[data-active]")).toHaveTextContent("1");
    fireEvent.keyDown(root, { key: "PageDown" });
    expect(root.querySelector("[data-active]")).toHaveTextContent("3");
    rerender(<ExampleRows disabled />);
    expect(root.querySelector("[data-active]")).toHaveTextContent("4");
    fireEvent.keyDown(root, { key: "PageUp" });
    expect(root.querySelector("[data-active]")).toHaveTextContent("1");
  });

  it("selects a mounted range and select-all preserves offscreen IDs", () => {
    const onChange = vi.fn();
    const { getByRole } = render(<DataGrid.Root aria-label="Select" selectionMode="multiple" defaultValue={["offscreen"]} onValueChange={onChange} selectOnRowClick><DataGrid.Body>{[1,2,3].map(row => <DataGrid.Row key={row} rowIndex={row} value={String(row)} selectable><DataGrid.Cell columnIndex={1}>Row {row}</DataGrid.Cell></DataGrid.Row>)}</DataGrid.Body></DataGrid.Root>);
    const root = getByRole("grid");
    fireEvent.click(root.querySelectorAll("td")[0]);
    fireEvent.click(root.querySelectorAll("td")[2], { shiftKey: true });
    expect(onChange).toHaveBeenLastCalledWith(["offscreen", "1", "2", "3"]);
    fireEvent.keyDown(root, { key: "a", ctrlKey: true });
    expect(onChange).toHaveBeenLastCalledWith(["offscreen"]);
  });

  it("keeps child clicks out of selection and preserves their arrow keys", () => {
    const onChange = vi.fn();
    const { getByRole } = render(<DataGrid.Root aria-label="Controls" selectionMode="multiple" selectOnRowClick onValueChange={onChange}><DataGrid.Body><DataGrid.Row rowIndex={1} value="one" selectable><DataGrid.Cell columnIndex={1} interactive><input aria-label="Editor" /></DataGrid.Cell><DataGrid.Cell columnIndex={2}>End</DataGrid.Cell></DataGrid.Row></DataGrid.Body></DataGrid.Root>);
    const input = getByRole("textbox");
    expect(input).toHaveAttribute("tabindex", "-1");
    fireEvent.click(input);
    expect(onChange).not.toHaveBeenCalled();
    input.focus();
    fireEvent.keyDown(input, { key: "ArrowRight" });
    expect(input).toHaveFocus();
    fireEvent.keyDown(input, { key: "Escape" });
    expect(getByRole("grid")).toHaveFocus();
  });

  it("inherits RTL resize direction and enforces keyboard bounds", () => {
    const onChange = vi.fn();
    const { getByRole } = render(<DataGrid.Root aria-label="Resize" dir="rtl"><DataGrid.Header><DataGrid.Row rowIndex={1}><DataGrid.ColumnHeader columnIndex={1} interactive>Width<DataGrid.ColumnResizeHandle aria-label="Width" defaultValue={160} min={150} max={180} onValueChange={onChange} /></DataGrid.ColumnHeader></DataGrid.Row></DataGrid.Header></DataGrid.Root>);
    const handle = getByRole("separator");
    fireEvent.keyDown(handle, { key: "ArrowLeft" });
    expect(onChange).toHaveBeenLastCalledWith(170);
    fireEvent.keyDown(handle, { key: "End" });
    expect(handle).toHaveAttribute("aria-valuenow", "180");
    fireEvent.keyDown(handle, { key: "Home" });
    expect(handle).toHaveAttribute("aria-valuenow", "150");
  });
  it("renders exact anatomy, refs, defaults, and slots", () => {
    const containerRef = createRef<HTMLDivElement>();
    const rootRef = createRef<HTMLTableElement>();
    const columnGroupRef = createRef<HTMLTableColElement>();
    const columnRef = createRef<HTMLTableColElement>();
    const headerRef = createRef<HTMLTableCellElement>();
    const { getByTestId, getByText } = render(<DataGrid.Container ref={containerRef} data-testid="container"><DataGrid.Root ref={rootRef} aria-label="Projects" columnCount={1} rowCount={0} data-testid="root"><DataGrid.ColumnGroup ref={columnGroupRef} data-testid="column-group"><DataGrid.Column ref={columnRef} htmlWidth={240} data-testid="column" /></DataGrid.ColumnGroup><DataGrid.Caption>Projects</DataGrid.Caption><DataGrid.Header><DataGrid.Row rowIndex={1}><DataGrid.ColumnHeader columnIndex={1} ref={headerRef}>Project</DataGrid.ColumnHeader></DataGrid.Row></DataGrid.Header></DataGrid.Root></DataGrid.Container>);
    expect(getByTestId("container")).toBe(containerRef.current);
    expect(rootRef.current?.tagName).toBe("TABLE");
    expect(columnGroupRef.current?.tagName).toBe("COLGROUP");
    expect(columnRef.current?.tagName).toBe("COL");
    expect(getByTestId("column-group")).toHaveClass("brick-data-grid__column-group");
    expect(getByTestId("column")).toHaveAttribute("width", "240");
    expect(getByTestId("column")).not.toHaveAttribute("htmlWidth");
    expect(headerRef.current?.tagName).toBe("TH");
    expect(getByTestId("root")).toHaveAttribute("role", "grid");
    expect(getByTestId("root")).toHaveAttribute("data-variant", "line");
    expect(getByTestId("root")).toHaveAttribute("data-size", "md");
    expect(getByTestId("root")).toHaveAttribute("data-density", "comfortable");
    expect(getByTestId("root")).toHaveAttribute("data-surface", "transparent");
    expect(getByTestId("root")).toHaveAttribute("data-border-tone", "default");
    expect(getByTestId("root")).toHaveAttribute("data-layout", "auto");
    expect(getByText("Projects")).toHaveAttribute("data-side", "bottom");
  });

  it("exposes closed visual recipes without leaking props", () => {
    const variants: DataGridVariant[] = ["line", "outline"];
    const sizes: DataGridSize[] = ["sm", "md", "lg"];
    const densities: DataGridDensity[] = ["compact", "comfortable", "spacious"];
    const surfaces: DataGridSurface[] = ["transparent", "base"];
    const borderTones: DataGridBorderTone[] = ["subtle", "default", "strong"];
    const layouts: DataGridLayout[] = ["auto", "fixed"];
    const { getByTestId, rerender } = render(<Example />);
    for (const variant of variants) { rerender(<Example variant={variant} />); expect(getByTestId("root")).toHaveAttribute("data-variant", variant); }
    for (const size of sizes) { rerender(<Example size={size} />); expect(getByTestId("root")).toHaveAttribute("data-size", size); }
    for (const density of densities) { rerender(<Example density={density} />); expect(getByTestId("root")).toHaveAttribute("data-density", density); }
    for (const surface of surfaces) { rerender(<Example surface={surface} />); expect(getByTestId("root")).toHaveAttribute("data-surface", surface); }
    for (const borderTone of borderTones) { rerender(<Example borderTone={borderTone} />); expect(getByTestId("root")).toHaveAttribute("data-border-tone", borderTone); }
    for (const layout of layouts) { rerender(<Example layout={layout} />); expect(getByTestId("root")).toHaveAttribute("data-layout", layout); }
    rerender(<Example showColumnBorder striped stickyHeader />);
    expect(getByTestId("root")).toHaveAttribute("data-column-border", "");
    expect(getByTestId("root")).toHaveAttribute("data-striped", "");
    expect(getByTestId("root")).toHaveAttribute("data-sticky-header", "");
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
    const { getByTestId } = render(<DataGrid.Root aria-label="Data" columnCount={3} rowCount={1} selectionMode="single" value="row"><DataGrid.Body><DataGrid.Row rowIndex={1} value="row" selectable disabled data-testid="row"><DataGrid.Cell columnIndex={1} numeric verticalAlign="top" data-testid="numeric">42</DataGrid.Cell><DataGrid.Cell columnIndex={2} numeric align="center" verticalAlign="bottom" data-testid="active">43</DataGrid.Cell><DataGrid.Cell columnIndex={3} data-testid="ordinary">Text</DataGrid.Cell></DataGrid.Row></DataGrid.Body></DataGrid.Root>);
    expect(getByTestId("row")).toHaveAttribute("aria-selected", "true");
    expect(getByTestId("row")).toHaveAttribute("aria-disabled", "true");
    expect(getByTestId("numeric")).toHaveAttribute("data-align", "end");
    expect(getByTestId("active")).toHaveAttribute("data-align", "center");
    expect(getByTestId("ordinary")).toHaveAttribute("data-align", "start");
    expect(getByTestId("numeric")).toHaveAttribute("data-vertical-align", "top");
    expect(getByTestId("active")).toHaveAttribute("data-vertical-align", "bottom");
    expect(getByTestId("ordinary")).toHaveAttribute("data-vertical-align", "middle");
    expect(getByTestId("numeric")).not.toHaveAttribute("align");
  });
});

import { createRef } from "react";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Table, type TableDensity, type TableSize, type TableVariant } from "../../../src/table.js";

function Example(props: React.ComponentProps<typeof Table.Root> = {}) {
  return <Table.Container data-testid="container"><Table.Root {...props} data-testid="root"><Table.Caption>Quarterly revenue</Table.Caption><Table.Header><Table.Row><Table.Head>Region</Table.Head><Table.Head numeric>Revenue</Table.Head></Table.Row></Table.Header><Table.Body><Table.Row><Table.Head scope="row">North</Table.Head><Table.Cell numeric>$42,000</Table.Cell></Table.Row></Table.Body><Table.Footer><Table.Row><Table.Head scope="row">Total</Table.Head><Table.Cell numeric>$42,000</Table.Cell></Table.Row></Table.Footer></Table.Root></Table.Container>;
}

describe("Table", () => {
  it("renders native anatomy, defaults, slots, and exact refs", () => {
    const containerRef = createRef<HTMLDivElement>();
    const rootRef = createRef<HTMLTableElement>();
    const headRef = createRef<HTMLTableCellElement>();
    const { getByTestId, getByText } = render(<Table.Container ref={containerRef} data-testid="container"><Table.Root ref={rootRef} data-testid="root"><Table.Caption>Revenue</Table.Caption><Table.Header><Table.Row><Table.Head ref={headRef}>Region</Table.Head></Table.Row></Table.Header><Table.Body><Table.Row><Table.Cell>North</Table.Cell></Table.Row></Table.Body></Table.Root></Table.Container>);
    expect(getByTestId("container")).toBe(containerRef.current);
    expect(rootRef.current?.tagName).toBe("TABLE");
    expect(headRef.current?.tagName).toBe("TH");
    expect(headRef.current).toHaveAttribute("scope", "col");
    expect(getByTestId("root")).toHaveAttribute("data-variant", "line");
    expect(getByTestId("root")).toHaveAttribute("data-size", "md");
    expect(getByTestId("root")).toHaveAttribute("data-density", "comfortable");
    expect(getByText("Revenue").tagName).toBe("CAPTION");
  });

  it("exposes recipes without leaking visual props", () => {
    const variants: TableVariant[] = ["line", "outline"];
    const sizes: TableSize[] = ["sm", "md", "lg"];
    const densities: TableDensity[] = ["compact", "comfortable"];
    const { getByTestId, rerender } = render(<Example />);
    for (const variant of variants) { rerender(<Example variant={variant} />); expect(getByTestId("root")).toHaveAttribute("data-variant", variant); }
    for (const size of sizes) { rerender(<Example size={size} />); expect(getByTestId("root")).toHaveAttribute("data-size", size); }
    for (const density of densities) { rerender(<Example density={density} />); expect(getByTestId("root")).toHaveAttribute("data-density", density); }
    rerender(<Example striped stickyHeader />);
    expect(getByTestId("root")).toHaveAttribute("data-striped", "");
    expect(getByTestId("root")).toHaveAttribute("data-sticky-header", "");
    expect(getByTestId("root")).not.toHaveAttribute("variant");
  });

  it("preserves native table metadata, spans, sorting, composition, and custom slots", () => {
    const { getByTestId } = render(<Table.Root aria-label="Invoices" asChild><table data-testid="root"><Table.Caption side="bottom">Invoices</Table.Caption><Table.Body><Table.Row><Table.Head scope="row" rowSpan={2} sortDirection="ascending" data-testid="head">Open<Table.SortIndicator data-testid="indicator" /></Table.Head><Table.Cell colSpan={2} headers="open" data-testid="cell">12</Table.Cell></Table.Row></Table.Body></table></Table.Root>);
    expect(getByTestId("root")).toHaveAttribute("aria-label", "Invoices");
    expect(getByTestId("head")).toHaveAttribute("aria-sort", "ascending");
    expect(getByTestId("head")).toHaveAttribute("rowspan", "2");
    expect(getByTestId("cell")).toHaveAttribute("colspan", "2");
    expect(getByTestId("cell")).toHaveAttribute("headers", "open");
    expect(getByTestId("indicator")).toHaveAttribute("aria-hidden", "true");
  });

  it("uses logical alignment and lets explicit align override numeric default", () => {
    const { getByTestId } = render(<Table.Root><Table.Body><Table.Row><Table.Cell numeric data-testid="numeric">42</Table.Cell><Table.Cell numeric align="center" data-testid="override">43</Table.Cell><Table.Cell data-testid="ordinary">Text</Table.Cell></Table.Row></Table.Body></Table.Root>);
    expect(getByTestId("numeric")).toHaveAttribute("data-align", "end");
    expect(getByTestId("numeric")).toHaveAttribute("data-numeric", "");
    expect(getByTestId("override")).toHaveAttribute("data-align", "center");
    expect(getByTestId("ordinary")).toHaveAttribute("data-align", "start");
    expect(getByTestId("numeric")).not.toHaveAttribute("numeric");
    expect(getByTestId("numeric")).not.toHaveAttribute("align");
  });
});

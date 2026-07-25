import { createRef, type CSSProperties } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  Grid,
  type GridAlign,
  type GridColumns,
  type GridGap,
  type GridItemElement,
  type GridJustify,
  type GridLine,
  type GridMinItemSize,
  type GridRootElement,
  type GridSpan,
} from "../../../src/grid.js";

describe("Grid", () => {
  it("renders the adopted Root and Item defaults, including empty parts", () => {
    const rootRef = createRef<HTMLElement>();
    const itemRef = createRef<HTMLElement>();
    render(
      <Grid.Root data-testid="root" ref={rootRef}>
        <span>Ordinary child</span>
        <Grid.Item data-testid="item" ref={itemRef} />
      </Grid.Root>,
    );
    const root = screen.getByTestId("root");
    const item = screen.getByTestId("item");

    expect(root).toBe(rootRef.current);
    expect(root.tagName).toBe("DIV");
    expect(root).toHaveClass("brick-grid");
    expect(root).toHaveAttribute("data-slot", "grid");
    expect(root).toHaveAttribute("data-mode", "explicit");
    expect(root).toHaveAttribute("data-columns", "1");
    expect(root).toHaveAttribute("data-gap", "0");
    expect(root).not.toHaveAttribute("data-align");
    expect(root).not.toHaveAttribute("data-justify");
    expect(root).not.toHaveAttribute("role");
    expect(root.children).toHaveLength(2);

    expect(item).toBe(itemRef.current);
    expect(item.tagName).toBe("DIV");
    expect(item).toHaveClass("brick-grid-item");
    expect(item).toHaveAttribute("data-slot", "grid-item");
    expect(item).not.toHaveAttribute("data-column-span");
    expect(item).not.toHaveAttribute("data-row-span");
    expect(item).not.toHaveAttribute("data-align");
    expect(item).not.toHaveAttribute("data-justify");
  });

  it("exposes every explicit column, gap, and intrinsic token", () => {
    const columns: GridColumns[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const gaps: GridGap[] = ["0", "1", "2", "3", "4", "5", "6"];
    const sizes: GridMinItemSize[] = ["xs", "sm", "md", "lg", "xl"];
    const { rerender } = render(<Grid.Root data-testid="root" />);

    for (const value of columns) {
      rerender(<Grid.Root columns={value} data-testid="root" />);
      expect(screen.getByTestId("root")).toHaveAttribute("data-columns", `${value}`);
    }

    for (const value of gaps) {
      rerender(
        <Grid.Root
          columnGap={value}
          data-testid="root"
          gap={value}
          rowGap={value}
        />,
      );
      const root = screen.getByTestId("root");
      expect(root).toHaveAttribute("data-gap", value);
      expect(root).toHaveAttribute("data-row-gap", value);
      expect(root).toHaveAttribute("data-column-gap", value);
    }

    for (const value of sizes) {
      rerender(<Grid.Root data-testid="root" minItemSize={value} />);
      const root = screen.getByTestId("root");
      expect(root).toHaveAttribute("data-mode", "intrinsic");
      expect(root).toHaveAttribute("data-min-item-size", value);
      expect(root).not.toHaveAttribute("data-columns");
    }
  });

  it("exposes Root alignment and justification through stable metadata", () => {
    const aligns: GridAlign[] = ["stretch", "start", "center", "end", "baseline"];
    const justifies: GridJustify[] = ["stretch", "start", "center", "end"];
    const { rerender } = render(<Grid.Root data-testid="root" />);

    for (const value of aligns) {
      rerender(<Grid.Root align={value} data-testid="root" />);
      const root = screen.getByTestId("root");
      if (value === "stretch") expect(root).not.toHaveAttribute("data-align");
      else expect(root).toHaveAttribute("data-align", value);
    }

    for (const value of justifies) {
      rerender(<Grid.Root data-testid="root" justify={value} />);
      const root = screen.getByTestId("root");
      if (value === "stretch") expect(root).not.toHaveAttribute("data-justify");
      else expect(root).toHaveAttribute("data-justify", value);
    }
  });

  it("supports every adopted Root and Item semantic host", () => {
    const roots: GridRootElement[] = [
      "div", "span", "section", "article", "nav", "header", "footer",
      "main", "aside", "ul", "ol", "li",
    ];
    const items: GridItemElement[] = [
      "div", "span", "section", "article", "header", "footer", "aside", "li",
    ];
    const { rerender } = render(
      <Grid.Root data-testid="root"><Grid.Item data-testid="item" /></Grid.Root>,
    );

    for (const as of roots) {
      rerender(<Grid.Root as={as} data-testid="root" />);
      expect(screen.getByTestId("root").tagName).toBe(as.toUpperCase());
    }
    for (const as of items) {
      rerender(
        <Grid.Root><Grid.Item as={as} data-testid="item" /></Grid.Root>,
      );
      expect(screen.getByTestId("item").tagName).toBe(as.toUpperCase());
    }
  });

  it("maps every Item span and line to stable hooks and CSS variables", () => {
    const spans: GridSpan[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const lines: GridLine[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    const { rerender } = render(
      <Grid.Root><Grid.Item data-testid="item" /></Grid.Root>,
    );

    for (const value of spans) {
      rerender(
        <Grid.Root>
          <Grid.Item
            columnSpan={value}
            data-testid="item"
            rowSpan={value}
          />
        </Grid.Root>,
      );
      const item = screen.getByTestId("item");
      expect(item).toHaveAttribute("data-column-span", `${value}`);
      expect(item).toHaveAttribute("data-row-span", `${value}`);
    }

    for (const value of lines) {
      rerender(
        <Grid.Root>
          <Grid.Item
            columnEnd={value}
            columnStart={1}
            data-testid="item"
            rowEnd={value}
            rowStart={1}
          />
        </Grid.Root>,
      );
      const item = screen.getByTestId("item");
      expect(item).toHaveAttribute("data-column-end", `${value}`);
      expect(item).toHaveAttribute("data-row-end", `${value}`);
    }

    rerender(
      <Grid.Root>
        <Grid.Item columnSpan="full" data-testid="item" />
      </Grid.Root>,
    );
    const full = screen.getByTestId("item");
    expect(full).toHaveAttribute("data-column-span", "full");
  });

  it("forwards native props, hooks, events, styles, content, and refs", () => {
    const rootRef = createRef<HTMLElement>();
    const itemRef = createRef<HTMLElement>();
    let clicks = 0;
    render(
      <Grid.Root
        aria-label="Account summary"
        className="consumer-grid"
        columns={2}
        data-evidence="root"
        dir="rtl"
        onClick={() => clicks++}
        ref={rootRef}
        slot="summary-grid"
        style={{ inlineSize: 480 }}
      >
        <Grid.Item
          align="center"
          className="consumer-item"
          data-evidence="item"
          justify="end"
          ref={itemRef}
          slot="summary"
          style={{ "--brick-grid-item-column-end": "span 1" } as CSSProperties}
        >
          Balance
        </Grid.Item>
      </Grid.Root>,
    );
    const root = screen.getByLabelText("Account summary");
    const item = screen.getByText("Balance");
    fireEvent.click(item);

    expect(clicks).toBe(1);
    expect(root).toBe(rootRef.current);
    expect(item).toBe(itemRef.current);
    expect(root).toHaveClass("brick-grid", "consumer-grid");
    expect(root).toHaveAttribute("data-slot", "summary-grid");
    expect(root).toHaveAttribute("data-evidence", "root");
    expect(root).toHaveAttribute("dir", "rtl");
    expect(root).toHaveStyle({ inlineSize: "480px" });
    expect(item).toHaveClass("brick-grid-item", "consumer-item");
    expect(item).toHaveAttribute("data-slot", "summary");
    expect(item).toHaveAttribute("data-align", "center");
    expect(item).toHaveAttribute("data-justify", "end");
    expect(item.style.getPropertyValue("--brick-grid-item-column-end")).toBe("span 1");
    expect(root).not.toHaveAttribute("columns");
    expect(item).not.toHaveAttribute("columnSpan");
  });

  it("keeps the namespace immutable and parts independently addressable", () => {
    expect(Object.isFrozen(Grid)).toBe(true);
    expect(Grid.Root.displayName).toBe("Grid.Root");
    expect(Grid.Item.displayName).toBe("Grid.Item");
  });
});

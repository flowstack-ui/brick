import { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ScrollArea, ScrollAreaRoot, ScrollAreaViewport } from "../../../src/scroll-area.js";

describe("ScrollArea", () => {
  it("renders adopted Atom-backed defaults", () => {
    render(<ScrollArea.Root data-testid="root"><ScrollArea.Viewport data-testid="viewport">Content</ScrollArea.Viewport></ScrollArea.Root>);
    const root = screen.getByTestId("root");
    const viewport = screen.getByTestId("viewport");
    expect(ScrollArea.Root).toBe(ScrollAreaRoot);
    expect(ScrollArea.Viewport).toBe(ScrollAreaViewport);
    expect(root).toHaveClass("brick-scroll-area");
    expect(root).toHaveAttribute("data-orientation", "vertical");
    expect(root).toHaveAttribute("data-scrollbar-gutter", "auto");
    expect(root).toHaveAttribute("data-scrollbar-visibility", "auto");
    expect(viewport).toHaveClass("brick-scroll-area-viewport");
    expect(viewport).toHaveAttribute("data-orientation", "vertical");
    expect(viewport).not.toHaveAttribute("tabindex");
    expect(viewport).not.toHaveAttribute("role");
  });

  it("exposes every orientation, gutter, and visibility", () => {
    const { rerender } = render(<ScrollArea.Root data-testid="root"><ScrollArea.Viewport /></ScrollArea.Root>);
    for (const orientation of ["vertical", "horizontal", "both"] as const) {
      for (const scrollbarGutter of ["auto", "stable"] as const) {
        for (const scrollbarVisibility of ["auto", "always", "interaction"] as const) {
          rerender(<ScrollArea.Root data-testid="root" {...{ orientation, scrollbarGutter, scrollbarVisibility }}><ScrollArea.Viewport /></ScrollArea.Root>);
          const root = screen.getByTestId("root");
          expect(root).toHaveAttribute("data-orientation", orientation);
          expect(root).toHaveAttribute("data-scrollbar-gutter", scrollbarGutter);
          expect(root).toHaveAttribute("data-scrollbar-visibility", scrollbarVisibility);
        }
      }
    }
  });

  it("preserves focus and named-region behavior from Atom", () => {
    render(<ScrollArea.Root><ScrollArea.Viewport aria-label="Activity" focusable>Content</ScrollArea.Viewport></ScrollArea.Root>);
    const viewport = screen.getByRole("region", { name: "Activity" });
    expect(viewport).toHaveAttribute("tabindex", "0");
  });

  it("forwards props, events, classes, styles, content, and refs", () => {
    const rootRef = createRef<HTMLDivElement>();
    const viewportRef = createRef<HTMLDivElement>();
    let clicks = 0;
    render(<ScrollArea.Root className="root-custom" data-owner="root" ref={rootRef}><ScrollArea.Viewport className="viewport-custom" data-owner="viewport" onClick={() => clicks++} ref={viewportRef} style={{ blockSize: 120 }}>Content</ScrollArea.Viewport></ScrollArea.Root>);
    fireEvent.click(screen.getByText("Content"));
    expect(clicks).toBe(1);
    expect(rootRef.current).toHaveClass("brick-scroll-area", "root-custom");
    expect(viewportRef.current).toHaveClass("brick-scroll-area-viewport", "viewport-custom");
    expect(viewportRef.current).toHaveStyle({ blockSize: "120px" });
  });

  it("preserves Root and Viewport asChild composition", () => {
    render(<ScrollArea.Root asChild orientation="horizontal"><section data-testid="root"><ScrollArea.Viewport asChild><article data-testid="viewport">Wide</article></ScrollArea.Viewport></section></ScrollArea.Root>);
    expect(screen.getByTestId("root").tagName).toBe("SECTION");
    expect(screen.getByTestId("root")).toHaveClass("brick-scroll-area");
    expect(screen.getByTestId("viewport").tagName).toBe("ARTICLE");
    expect(screen.getByTestId("viewport")).toHaveClass("brick-scroll-area-viewport");
  });
});

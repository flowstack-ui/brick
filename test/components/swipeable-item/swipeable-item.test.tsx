import { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SwipeableItem } from "../../../src/swipeable-item.js";

function Example(props: Partial<React.ComponentProps<typeof SwipeableItem.Root>> = {}) {
  return (
    <SwipeableItem.Root {...props}>
      <SwipeableItem.Actions aria-label="Archive actions" side="start">
        <button type="button">Archive</button>
      </SwipeableItem.Actions>
      <SwipeableItem.Content>Quarterly report</SwipeableItem.Content>
      <SwipeableItem.Actions aria-label="Delete actions" side="end">
        <button type="button">Delete</button>
      </SwipeableItem.Actions>
    </SwipeableItem.Root>
  );
}

describe("SwipeableItem", () => {
  it("renders the adopted three-part plain contract", () => {
    render(<Example />);
    const content = screen.getByText("Quarterly report");
    const root = content.parentElement;
    expect(root).toHaveClass("brick-swipeable-item");
    expect(root).toHaveAttribute("data-slot", "swipeable-item");
    expect(root).toHaveAttribute("data-state", "closed");
    expect(root).toHaveAttribute("data-variant", "plain");
    expect(content).toHaveClass("brick-swipeable-item__content");
    expect(content).toHaveAttribute("data-slot", "swipeable-item-content");
    expect(root?.querySelector('[aria-label="Archive actions"]')).toHaveClass("brick-swipeable-item__actions");
    expect(root?.querySelector('[aria-label="Delete actions"]')).toHaveAttribute("data-side", "end");
  });

  it("exposes the closed outline recipe without leaking variant", () => {
    render(<Example variant="outline" />);
    const root = screen.getByText("Quarterly report").parentElement;
    expect(root).toHaveAttribute("data-variant", "outline");
    expect(root).not.toHaveAttribute("variant");
  });

  it("preserves Atom keyboard state while nested controls keep Arrow keys", () => {
    const geometry = vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({
      bottom: 48, height: 48, left: 0, right: 96, top: 0, width: 96, x: 0, y: 0,
      toJSON: () => ({}),
    });
    const onOpenSideChange = vi.fn();
    render(
      <SwipeableItem.Root onOpenSideChange={onOpenSideChange}>
        <SwipeableItem.Content><input aria-label="Rename" /></SwipeableItem.Content>
        <SwipeableItem.Actions aria-label="Item actions" side="end"><button>Delete</button></SwipeableItem.Actions>
      </SwipeableItem.Root>,
    );
    const content = screen.getByText((_, element) => element?.classList.contains("brick-swipeable-item__content") ?? false);
    fireEvent.keyDown(content, { key: "ArrowLeft" });
    expect(onOpenSideChange).toHaveBeenLastCalledWith("end");
    fireEvent.keyDown(screen.getByRole("textbox", { name: "Rename" }), { key: "ArrowLeft" });
    expect(onOpenSideChange).toHaveBeenCalledTimes(1);
    geometry.mockRestore();
  });

  it("preserves native props, custom classes and slots, styles, and refs", () => {
    const rootRef = createRef<HTMLDivElement>();
    const contentRef = createRef<HTMLElement>();
    const actionsRef = createRef<HTMLElement>();
    render(
      <SwipeableItem.Root className="consumer-root" data-evidence="root" data-slot="mail-row" ref={rootRef}>
        <SwipeableItem.Content className="consumer-content" data-slot="mail-content" ref={contentRef} style={{ color: "rgb(1, 2, 3)" }}>Message</SwipeableItem.Content>
        <SwipeableItem.Actions aria-label="Message actions" className="consumer-actions" data-slot="mail-actions" ref={actionsRef} side="end"><button>Delete</button></SwipeableItem.Actions>
      </SwipeableItem.Root>,
    );
    expect(rootRef.current).toHaveClass("brick-swipeable-item", "consumer-root");
    expect(rootRef.current).toHaveAttribute("data-evidence", "root");
    expect(rootRef.current).toHaveAttribute("data-slot", "mail-row");
    expect(contentRef.current).toHaveClass("brick-swipeable-item__content", "consumer-content");
    expect(contentRef.current).toHaveAttribute("data-slot", "mail-content");
    expect(contentRef.current).toHaveStyle({ color: "rgb(1, 2, 3)" });
    expect(actionsRef.current).toHaveClass("brick-swipeable-item__actions", "consumer-actions");
    expect(actionsRef.current).toHaveAttribute("data-slot", "mail-actions");
  });

  it("preserves Atom render and asChild composition", () => {
    const { rerender } = render(
      <SwipeableItem.Root render={<article data-testid="render-root" />}>
        <SwipeableItem.Content render={<section data-testid="render-content" />}>Rendered</SwipeableItem.Content>
        <SwipeableItem.Actions aria-label="Rendered actions" render={<aside data-testid="render-actions" />} side="end"><button>Delete</button></SwipeableItem.Actions>
      </SwipeableItem.Root>,
    );
    expect(screen.getByTestId("render-root")).toHaveClass("brick-swipeable-item");
    expect(screen.getByTestId("render-content")).toHaveClass("brick-swipeable-item__content");
    expect(screen.getByTestId("render-actions")).toHaveClass("brick-swipeable-item__actions");

    rerender(
      <SwipeableItem.Root asChild><article data-testid="child-root">
        <SwipeableItem.Content asChild><section data-testid="child-content">Composed</section></SwipeableItem.Content>
        <SwipeableItem.Actions aria-label="Composed actions" asChild side="end"><aside data-testid="child-actions"><button>Delete</button></aside></SwipeableItem.Actions>
      </article></SwipeableItem.Root>,
    );
    expect(screen.getByTestId("child-root")).toHaveClass("brick-swipeable-item");
    expect(screen.getByTestId("child-content")).toHaveClass("brick-swipeable-item__content");
    expect(screen.getByTestId("child-actions")).toHaveClass("brick-swipeable-item__actions");
  });
});

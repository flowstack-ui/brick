import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ZStack } from "../../../src/z-stack.js";

describe("ZStack", () => {
  it("renders a paintless overlapping root with adopted defaults", () => {
    const ref = createRef<HTMLElement>();
    render(<ZStack.Root data-testid="root" ref={ref}><span>Back</span><span>Front</span></ZStack.Root>);
    const root = screen.getByTestId("root");
    expect(root).toBe(ref.current);
    expect(root).toHaveClass("brick-z-stack");
    expect(root).toHaveAttribute("data-slot", "z-stack");
    expect(root).not.toHaveAttribute("data-align");
    expect(root).not.toHaveAttribute("data-justify");
    expect(root.children).toHaveLength(2);
  });

  it("places items and composes an existing child without another host", () => {
    const ref = createRef<HTMLElement>();
    render(<ZStack.Root align="center" justify="end"><ZStack.Item align="end" asChild justify="start" ref={ref}><strong className="label">New</strong></ZStack.Item></ZStack.Root>);
    const item = screen.getByText("New");
    expect(item).toBe(ref.current);
    expect(item.tagName).toBe("STRONG");
    expect(item).toHaveClass("label", "brick-z-stack-item");
    expect(item).toHaveAttribute("data-align", "end");
    expect(item).toHaveAttribute("data-justify", "start");
    expect(item.parentElement).toHaveAttribute("data-align", "center");
    expect(item.parentElement).toHaveAttribute("data-justify", "end");
  });

  it("serializes responsive logical placement without changing the tree", () => {
    render(
      <ZStack.Root
        align={{ initial: "stretch", md: "center" }}
        data-testid="root"
        justify={{ initial: "stretch", lg: "end" }}
      >
        <span>Back</span>
        <ZStack.Item
          align={{ initial: "start", md: "end" }}
          data-testid="item"
          justify={{ initial: "end", lg: "center" }}
        >
          Front
        </ZStack.Item>
      </ZStack.Root>,
    );
    const root = screen.getByTestId("root");
    const item = screen.getByTestId("item");
    expect(root.children).toHaveLength(2);
    expect(root).toHaveAttribute("data-align-md", "center");
    expect(root).toHaveAttribute("data-justify-lg", "end");
    expect(item).toHaveAttribute("data-align", "start");
    expect(item).toHaveAttribute("data-align-md", "end");
    expect(item).toHaveAttribute("data-justify", "end");
    expect(item).toHaveAttribute("data-justify-lg", "center");
  });

  it("expresses open overlay participation without consumer CSS", () => {
    render(
      <ZStack.Root data-testid="root" isolation="open">
        <span>Media</span>
        <ZStack.Item
          data-testid="action"
          edgeSpacing={{ initial: "3", md: 5 }}
          layer="action"
        >
          Save
        </ZStack.Item>
      </ZStack.Root>,
    );
    expect(screen.getByTestId("root")).toHaveAttribute("data-isolation", "open");
    expect(screen.getByTestId("action")).toHaveAttribute("data-edge-spacing", "3");
    expect(screen.getByTestId("action")).toHaveAttribute("data-edge-spacing-md", "5");
    expect(screen.getByTestId("action")).toHaveAttribute("data-layer", "action");
    expect(screen.getByTestId("action").getAttribute("style")).toContain(
      "--brick-z-stack-item-edge-spacing-input: var(--brick-space-3)",
    );
  });
});

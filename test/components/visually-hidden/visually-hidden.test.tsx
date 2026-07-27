import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { VisuallyHidden } from "../../../src/visually-hidden.js";

describe("VisuallyHidden", () => {
  it("delegates authoritative hiding behavior while adding Brick identity", () => {
    const ref = createRef<HTMLSpanElement>();
    render(<VisuallyHidden.Root className="consumer-class" data-owner="test" ref={ref}>Search</VisuallyHidden.Root>);
    const root = screen.getByText("Search");
    expect(ref.current).toBe(root);
    expect(root).toHaveClass("brick-visually-hidden", "consumer-class");
    expect(root).toHaveAttribute("data-slot", "visually-hidden");
    expect(root).toHaveAttribute("data-owner", "test");
    expect(root).toHaveStyle({ position: "absolute", width: "1px", height: "1px", overflow: "hidden" });
  });

  it("preserves render, asChild, authored slots, and consumer styles", () => {
    const { rerender } = render(
      <VisuallyHidden.Root data-slot="custom-hidden" render={<strong data-owner="render" />} style={{ color: "red" }}>Details</VisuallyHidden.Root>,
    );
    const rendered = screen.getByText("Details");
    expect(rendered.tagName).toBe("STRONG");
    expect(rendered).toHaveAttribute("data-slot", "custom-hidden");
    expect(rendered).toHaveStyle({ color: "rgb(255, 0, 0)", position: "absolute" });

    rerender(<VisuallyHidden.Root asChild><em data-owner="child">Context</em></VisuallyHidden.Root>);
    const child = screen.getByText("Context");
    expect(child.tagName).toBe("EM");
    expect(child).toHaveClass("brick-visually-hidden");
    expect(child).toHaveStyle({ clipPath: "inset(50%)" });
  });
});

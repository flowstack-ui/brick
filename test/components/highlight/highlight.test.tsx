import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Highlight, type HighlightTone, type HighlightVariant } from "../../../src/highlight.js";

describe("Highlight", () => {
  it("delegates matching to Atom and renders closed Brick recipes", () => {
    const ref = createRef<HTMLSpanElement>();
    const { rerender } = render(<Highlight query={["system", "design system"]} ref={ref} text="A design system is a system." />);
    const root = ref.current!;
    expect(root.tagName).toBe("SPAN");
    expect(root).toHaveClass("brick-highlight");
    expect(root).toHaveAttribute("data-slot", "highlight");
    expect(root).toHaveAttribute("data-variant", "subtle");
    expect(root).toHaveAttribute("data-tone", "accent");
    expect(root.querySelectorAll("mark")).toHaveLength(2);
    expect(root.querySelector("mark")?.textContent).toBe("design system");
    expect(root.textContent).toBe("A design system is a system.");
    for (const variant of ["subtle", "solid", "underline"] satisfies HighlightVariant[]) {
      rerender(<Highlight query="system" text="system" variant={variant} />);
      expect(screen.getByText("system").parentElement).toHaveAttribute("data-variant", variant);
    }
    for (const tone of ["accent", "neutral"] satisfies HighlightTone[]) {
      rerender(<Highlight query="system" text="system" tone={tone} />);
      expect(screen.getByText("system").parentElement).toHaveAttribute("data-tone", tone);
    }
  });

  it("preserves exact Atom options, native props, hooks, and refs", () => {
    const ref = createRef<HTMLSpanElement>();
    render(<Highlight aria-label="Search result" className="consumer-highlight" data-owner="docs" exactMatch ignoreCase={false} matchAll={false} query="Flow" ref={ref} style={{ color: "red" }} text="flow Flow Flowstack" />);
    const root = screen.getByLabelText("Search result");
    expect(root).toBe(ref.current);
    expect(root).toHaveClass("brick-highlight", "consumer-highlight");
    expect(root.querySelectorAll("mark")).toHaveLength(1);
    expect(root.querySelector("mark")?.textContent).toBe("Flow");
    expect(root.textContent).toBe("flow Flow Flowstack");
  });

  it("rejects injected HTML from untyped consumers", () => {
    const unsafeProps = {
      dangerouslySetInnerHTML: { __html: "<mark data-unsafe>Injected</mark>" },
    } as unknown as Record<string, unknown>;
    const { container } = render(<Highlight {...unsafeProps} query="safe" text="safe text" />);
    expect(container.querySelector("[data-unsafe]")).toBeNull();
    expect(container.textContent).toBe("safe text");
  });
});

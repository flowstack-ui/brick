import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Blockquote, type BlockquoteAlign, type BlockquoteVariant } from "../../../src/blockquote.js";

describe("Blockquote", () => {
  it("renders the semantic native anatomy and closed root recipes", () => {
    const ref = createRef<HTMLElement>();
    const { rerender } = render(
      <Blockquote.Root ref={ref}>
        <Blockquote.Icon />
        <Blockquote.Content cite="https://example.com/source">Clarity compounds.</Blockquote.Content>
        <Blockquote.Caption>Pat Lee, <Blockquote.Cite>Systems</Blockquote.Cite></Blockquote.Caption>
      </Blockquote.Root>,
    );
    const root = ref.current!;
    expect(root.tagName).toBe("FIGURE");
    expect(root).toHaveAttribute("data-variant", "accent");
    expect(root).toHaveAttribute("data-align", "start");
    expect(root.querySelector(":scope > blockquote")).toHaveAttribute("cite", "https://example.com/source");
    expect(root.querySelector(":scope > figcaption")).toBeTruthy();
    expect(root.querySelector("blockquote figcaption")).toBeNull();
    expect(root.querySelector("cite")?.textContent).toBe("Systems");
    expect(root.querySelector(".brick-blockquote__icon")).toHaveAttribute("aria-hidden", "true");
    for (const variant of ["accent", "surface", "plain"] satisfies BlockquoteVariant[]) {
      rerender(<Blockquote.Root variant={variant}><Blockquote.Content>Quote</Blockquote.Content></Blockquote.Root>);
      expect(screen.getByText("Quote").parentElement).toHaveAttribute("data-variant", variant);
    }
    for (const align of ["start", "center", "end"] satisfies BlockquoteAlign[]) {
      rerender(<Blockquote.Root align={align}><Blockquote.Content>Quote</Blockquote.Content></Blockquote.Root>);
      expect(screen.getByText("Quote").parentElement).toHaveAttribute("data-align", align);
    }
  });

  it("forwards native attributes, hooks, children, and refs on every part", () => {
    const contentRef = createRef<HTMLQuoteElement>();
    render(
      <Blockquote.Root aria-label="Quoted principle" className="consumer-root" data-owner="docs">
        <Blockquote.Icon className="consumer-icon">Q</Blockquote.Icon>
        <Blockquote.Content className="consumer-content" data-owner="source" ref={contentRef}>A durable interface.</Blockquote.Content>
        <Blockquote.Caption className="consumer-caption">From <Blockquote.Cite className="consumer-cite">The Manual</Blockquote.Cite></Blockquote.Caption>
      </Blockquote.Root>,
    );
    const root = screen.getByLabelText("Quoted principle");
    expect(root).toHaveClass("brick-blockquote", "consumer-root");
    expect(contentRef.current).toHaveClass("brick-blockquote__content", "consumer-content");
    expect(root.querySelector(".consumer-icon")?.textContent).toBe("Q");
    expect(root.querySelector(".consumer-caption")).toBeTruthy();
    expect(root.querySelector(".consumer-cite")).toBeTruthy();
  });
});

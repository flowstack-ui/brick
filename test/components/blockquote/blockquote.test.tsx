import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Blockquote, type BlockquoteAlign, type BlockquoteVariant } from "../../../src/blockquote.js";

describe("Blockquote", () => {
  it("projects native hosts and composes refs without duplicate quotation elements", () => {
    const outer = createRef<HTMLElement>();
    const inner = createRef<HTMLElement>();
    const { container } = render(<Blockquote.Root asChild ref={outer} tone="success"><figure ref={inner} className="authored"><Blockquote.Content asChild cite="https://example.com"><blockquote>Quote</blockquote></Blockquote.Content><Blockquote.Caption asChild><figcaption>Author, <Blockquote.Cite asChild><cite>Work</cite></Blockquote.Cite></figcaption></Blockquote.Caption></figure></Blockquote.Root>);
    expect(outer.current).toBe(inner.current);
    expect(outer.current).toHaveClass("brick-blockquote", "authored");
    expect(container.querySelectorAll("figure")).toHaveLength(1);
    expect(container.querySelectorAll("blockquote")).toHaveLength(1);
    expect(container.querySelector("blockquote")).toHaveAttribute("cite", "https://example.com");
  });

  it("keeps default and custom icons decorative and preserves legacy accent tone", () => {
    const { container, rerender } = render(<Blockquote.Root variant="accent"><Blockquote.Icon /><Blockquote.Content>Quote</Blockquote.Content></Blockquote.Root>);
    expect(container.querySelector("figure")).toHaveAttribute("data-tone", "accent");
    expect(container.querySelector("svg")).toHaveAttribute("viewBox", "0 0 24 24");
    rerender(<Blockquote.Root variant="accent" tone="danger"><Blockquote.Icon asChild><svg viewBox="0 0 24 24" /></Blockquote.Icon></Blockquote.Root>);
    expect(container.querySelector("figure")).toHaveAttribute("data-tone", "danger");
    expect(container.querySelector("svg")).toHaveClass("brick-blockquote__icon");
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
    expect(container.querySelectorAll("span")).toHaveLength(0);
  });
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
    expect(root).toHaveAttribute("data-variant", "subtle");
    expect(root).toHaveAttribute("data-tone", "neutral");
    expect(root).toHaveAttribute("data-align", "start");
    expect(root.querySelector(":scope > blockquote")).toHaveAttribute("cite", "https://example.com/source");
    expect(root.querySelector(":scope > figcaption")).toBeTruthy();
    expect(root.querySelector("blockquote figcaption")).toBeNull();
    expect(root.querySelector("cite")?.textContent).toBe("Systems");
    expect(root.querySelector(".brick-blockquote__icon")).toHaveAttribute("aria-hidden", "true");
    for (const variant of ["subtle", "solid", "accent", "surface", "plain"] satisfies BlockquoteVariant[]) {
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

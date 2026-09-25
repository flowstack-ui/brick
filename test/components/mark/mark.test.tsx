import { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Mark, type MarkTone, type MarkVariant } from "../../../src/mark.js";

describe("Mark", () => {
  it("projects one semantic host and merges refs and classes", () => {
    const outer = createRef<HTMLElement>();
    const inner = createRef<HTMLElement>();
    const {container,unmount} = render(<Mark asChild ref={outer} tone="info" className="outer"><mark ref={inner} className="inner">Relevant</mark></Mark>);
    expect(container.querySelectorAll("mark")).toHaveLength(1);
    expect(outer.current).toBe(inner.current);
    expect(outer.current).toHaveClass("brick-mark", "outer", "inner");
    expect(outer.current).toHaveAttribute("data-tone", "info");
    unmount();
    expect(outer.current).toBeNull();
    expect(inner.current).toBeNull();
  });
  it("renders native mark defaults and every closed recipe", () => {
    const ref = createRef<HTMLElement>();
    const { rerender } = render(<Mark ref={ref}>relevant</Mark>);
    const marked = screen.getByText("relevant");
    expect(marked.tagName).toBe("MARK");
    expect(marked).toBe(ref.current);
    expect(marked).toHaveClass("brick-mark");
    expect(marked).toHaveAttribute("data-slot", "mark");
    expect(marked).toHaveAttribute("data-variant", "subtle");
    expect(marked).toHaveAttribute("data-tone", "accent");
    const variants: MarkVariant[] = ["subtle", "solid", "text", "plain"];
    const tones: MarkTone[] = ["accent", "neutral", "info", "success", "warning", "danger"];
    for (const variant of variants) {
      rerender(<Mark variant={variant}>relevant</Mark>);
      expect(screen.getByText("relevant")).toHaveAttribute("data-variant", variant);
    }
    for (const tone of tones) {
      rerender(<Mark tone={tone}>relevant</Mark>);
      expect(screen.getByText("relevant")).toHaveAttribute("data-tone", tone);
    }
  });

  it("forwards native attributes, events, hooks, style, children, and ref", () => {
    const ref = createRef<HTMLElement>();
    let clicks = 0;
    render(<Mark aria-label="Relevant phrase" className="consumer-mark" data-owner="docs" onClick={() => clicks++} ref={ref} slot="result" style={{ color: "red" }}><span>shipping window</span></Mark>);
    const marked = screen.getByLabelText("Relevant phrase");
    fireEvent.click(marked);
    expect(clicks).toBe(1);
    expect(marked).toBe(ref.current);
    expect(marked).toHaveClass("brick-mark", "consumer-mark");
    expect(marked).toHaveAttribute("data-slot", "result");
    expect(marked).toHaveStyle({ color: "rgb(255, 0, 0)" });
  });
});

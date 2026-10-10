import { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Kbd, type KbdSize, type KbdVariant } from "../../../src/kbd.js";

describe("Kbd", () => {
  it("projects one semantic host and merges refs, attributes and classes", () => {
    const outer = createRef<HTMLElement>();
    const inner = createRef<HTMLElement>();
    const { container, unmount } = render(<Kbd asChild ref={outer} tone="accent" className="outer"><kbd ref={inner} className="inner">Ctrl + K</kbd></Kbd>);
    expect(container.querySelectorAll("kbd")).toHaveLength(1);
    expect(outer.current).toBe(inner.current);
    expect(outer.current).toHaveClass("brick-kbd", "outer", "inner");
    expect(outer.current).toHaveAttribute("data-tone", "accent");
    unmount();
    expect(outer.current).toBeNull();
    expect(inner.current).toBeNull();
  });

  it("supports all semantic tones without adding interaction", () => {
    const { rerender } = render(<Kbd>Ctrl + K</Kbd>);
    for (const tone of ["neutral", "accent", "info", "success", "warning", "danger"] as const) {
      rerender(<Kbd tone={tone}>Ctrl + K</Kbd>);
      const key = screen.getByText("Ctrl + K");
      expect(key).toHaveAttribute("data-tone", tone);
      expect(key).not.toHaveAttribute("tabindex");
      expect(key).not.toHaveAttribute("role");
    }
  });
  it("renders native defaults and every closed recipe", () => {
    const ref = createRef<HTMLElement>();
    const { rerender } = render(<Kbd ref={ref}>Enter</Kbd>);
    const key = screen.getByText("Enter");
    expect(key.tagName).toBe("KBD");
    expect(key).toBe(ref.current);
    expect(key).toHaveClass("brick-kbd");
    expect(key).toHaveAttribute("data-slot", "kbd");
    expect(key).toHaveAttribute("data-variant", "raised");
    expect(key).toHaveAttribute("data-size", "md");
    for (const variant of ["raised", "outline", "subtle", "plain"] satisfies KbdVariant[]) {
      rerender(<Kbd variant={variant}>Enter</Kbd>);
      expect(screen.getByText("Enter")).toHaveAttribute("data-variant", variant);
    }
    for (const size of ["sm", "md", "lg"] satisfies KbdSize[]) {
      rerender(<Kbd size={size}>Enter</Kbd>);
      expect(screen.getByText("Enter")).toHaveAttribute("data-size", size);
    }
  });

  it("forwards native attributes, events, hooks, style, children, and ref", () => {
    const ref = createRef<HTMLElement>();
    let clicks = 0;
    render(<Kbd aria-label="Enter key" className="consumer-kbd" data-owner="docs" onClick={() => clicks++} ref={ref} slot="key" style={{ color: "red" }}><span>Enter</span></Kbd>);
    const key = screen.getByLabelText("Enter key");
    fireEvent.click(key);
    expect(clicks).toBe(1);
    expect(key).toBe(ref.current);
    expect(key).toHaveClass("brick-kbd", "consumer-kbd");
    expect(key).toHaveAttribute("data-slot", "key");
    expect(key).toHaveStyle({ color: "rgb(255, 0, 0)" });
  });
});

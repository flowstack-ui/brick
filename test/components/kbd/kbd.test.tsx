import { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Kbd, type KbdSize, type KbdVariant } from "../../../src/kbd.js";

describe("Kbd", () => {
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

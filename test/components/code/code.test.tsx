import { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Code, type CodeSize, type CodeTone, type CodeVariant } from "../../../src/code.js";

describe("Code", () => {
  it("renders the native adopted default", () => {
    const ref = createRef<HTMLElement>();
    render(<Code ref={ref}>aria-label</Code>);
    const code = screen.getByText("aria-label");
    expect(code.tagName).toBe("CODE");
    expect(code).toBe(ref.current);
    expect(code).toHaveClass("brick-code");
    expect(code).toHaveAttribute("data-slot", "code");
    expect(code).toHaveAttribute("data-variant", "subtle");
    expect(code).toHaveAttribute("data-tone", "neutral");
    expect(code).toHaveAttribute("data-size", "inherit");
    expect(code).not.toHaveAttribute("role");
  });

  it("exposes every closed recipe independently", () => {
    const variants: CodeVariant[] = ["subtle", "plain"];
    const tones: CodeTone[] = ["neutral", "inherit"];
    const sizes: CodeSize[] = ["inherit", "sm", "md"];
    const { rerender } = render(<Code>token</Code>);
    for (const variant of variants) {
      rerender(<Code variant={variant}>token</Code>);
      expect(screen.getByText("token")).toHaveAttribute("data-variant", variant);
    }
    for (const tone of tones) {
      rerender(<Code tone={tone}>token</Code>);
      expect(screen.getByText("token")).toHaveAttribute("data-tone", tone);
    }
    for (const size of sizes) {
      rerender(<Code size={size}>token</Code>);
      expect(screen.getByText("token")).toHaveAttribute("data-size", size);
    }
  });

  it("forwards native content, attributes, events, hooks, style, and ref", () => {
    const ref = createRef<HTMLElement>();
    let clicks = 0;
    render(<Code aria-label="Property" className="custom" data-owner="docs" dir="ltr" lang="en" onClick={() => clicks++} ref={ref} slot="property" style={{ color: "red" }}><span>--brick-space-4</span></Code>);
    const code = screen.getByLabelText("Property");
    fireEvent.click(code);
    expect(clicks).toBe(1);
    expect(code).toBe(ref.current);
    expect(code).toHaveClass("brick-code", "custom");
    expect(code).toHaveAttribute("data-slot", "property");
    expect(code).toHaveAttribute("data-owner", "docs");
    expect(code).toHaveStyle({ color: "rgb(255, 0, 0)" });
    expect(code.querySelector("span")).toHaveTextContent("--brick-space-4");
  });
});

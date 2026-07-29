import { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Hide, type HideBreakpoint, type HideElement } from "../../../src/hide.js";

describe("Hide", () => {
  it("renders one server-safe native root with required breakpoint metadata", () => {
    const ref = createRef<HTMLElement>();
    render(<Hide data-testid="hide" from="md" ref={ref}>Compact tools</Hide>);
    const root = screen.getByTestId("hide");
    expect(root).toBe(ref.current); expect(root.tagName).toBe("DIV");
    expect(root).toHaveClass("brick-hide");
    expect(root).toHaveAttribute("data-from", "md");
    expect(root).toHaveAttribute("data-slot", "hide");
    expect(root).not.toHaveAttribute("role");
  });

  it("exposes the closed breakpoints and semantic hosts", () => {
    const breakpoints: HideBreakpoint[] = ["sm", "md", "lg", "xl"];
    const hosts: HideElement[] = ["div", "span", "section", "article", "nav", "header", "footer", "main", "aside", "ul", "ol", "li"];
    const { rerender } = render(<Hide data-testid="hide" from="sm">Content</Hide>);
    for (const from of breakpoints) { rerender(<Hide data-testid="hide" from={from}>Content</Hide>); expect(screen.getByTestId("hide")).toHaveAttribute("data-from", from); }
    for (const as of hosts) { rerender(<Hide as={as} data-testid="hide" from="sm">Content</Hide>); expect(screen.getByTestId("hide").tagName).toBe(as.toUpperCase()); }
  });

  it("forwards native props, events, class, style, slot, children, and ref", () => {
    const ref = createRef<HTMLElement>(); let clicks = 0;
    render(<Hide aria-label="Compact workspace" as="section" className="consumer-hide" data-evidence="native" from="lg" onClick={() => clicks++} ref={ref} slot="workspace-hide" style={{ display: "flex" }}><span>Tools</span></Hide>);
    const root = screen.getByLabelText("Compact workspace"); fireEvent.click(root);
    expect(clicks).toBe(1); expect(root).toBe(ref.current);
    expect(root).toHaveClass("brick-hide", "consumer-hide");
    expect(root).toHaveAttribute("data-slot", "workspace-hide");
    expect(root.style.display).toBe("flex"); expect(root).not.toHaveAttribute("from");
  });
});

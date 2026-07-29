import { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Show, type ShowBreakpoint, type ShowElement } from "../../../src/show.js";

describe("Show", () => {
  it("renders one server-safe native root with required breakpoint metadata", () => {
    const ref = createRef<HTMLElement>();
    render(<Show data-testid="show" from="md" ref={ref}>Desktop tools</Show>);
    const root = screen.getByTestId("show");
    expect(root).toBe(ref.current);
    expect(root.tagName).toBe("DIV");
    expect(root).toHaveClass("brick-show");
    expect(root).toHaveAttribute("data-from", "md");
    expect(root).toHaveAttribute("data-slot", "show");
    expect(root).not.toHaveAttribute("role");
    expect(root).toHaveTextContent("Desktop tools");
  });

  it("exposes the closed breakpoints and semantic hosts", () => {
    const breakpoints: ShowBreakpoint[] = ["sm", "md", "lg", "xl"];
    const hosts: ShowElement[] = ["div", "span", "section", "article", "nav", "header", "footer", "main", "aside", "ul", "ol", "li"];
    const { rerender } = render(<Show data-testid="show" from="sm">Content</Show>);
    for (const from of breakpoints) {
      rerender(<Show data-testid="show" from={from}>Content</Show>);
      expect(screen.getByTestId("show")).toHaveAttribute("data-from", from);
    }
    for (const as of hosts) {
      rerender(<Show as={as} data-testid="show" from="sm">Content</Show>);
      expect(screen.getByTestId("show").tagName).toBe(as.toUpperCase());
    }
  });

  it("forwards native props, events, class, style, slot, children, and ref", () => {
    const ref = createRef<HTMLElement>(); let clicks = 0;
    render(<Show aria-label="Workspace tools" as="section" className="consumer-show" data-evidence="native" dir="rtl" from="lg" onClick={() => clicks++} ref={ref} slot="workspace-show" style={{ display: "grid" }}><span>Tools</span></Show>);
    const root = screen.getByLabelText("Workspace tools"); fireEvent.click(root);
    expect(clicks).toBe(1); expect(root).toBe(ref.current);
    expect(root).toHaveClass("brick-show", "consumer-show");
    expect(root).toHaveAttribute("data-slot", "workspace-show");
    expect(root).toHaveAttribute("data-evidence", "native");
    expect(root.style.display).toBe("grid");
    expect(root).not.toHaveAttribute("from");
  });
});

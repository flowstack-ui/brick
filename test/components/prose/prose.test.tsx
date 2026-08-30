import { createElement, createRef } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Prose, type ProseMeasure, type ProseSize } from "../../../src/prose.js";

describe("Prose", () => {
  it("renders one semantic host with closed size and measure metadata", () => {
    const ref = createRef<HTMLElement>();
    const { rerender } = render(<Prose as="article" ref={ref}><h1>Release notes</h1><p>Trusted React content.</p></Prose>);
    expect(ref.current?.tagName).toBe("ARTICLE");
    expect(ref.current).toHaveClass("brick-prose");
    expect(ref.current).toHaveAttribute("data-slot", "prose");
    expect(ref.current).toHaveAttribute("data-size", "md");
    expect(ref.current).toHaveAttribute("data-measure", "default");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Release notes");

    for (const size of ["sm", "md", "lg"] satisfies ProseSize[]) {
      rerender(<Prose size={size}>Content</Prose>);
      expect(screen.getByText("Content")).toHaveAttribute("data-size", size);
    }
    for (const measure of ["narrow", "default", "wide", "none"] satisfies ProseMeasure[]) {
      rerender(<Prose measure={measure}>Content</Prose>);
      expect(screen.getByText("Content")).toHaveAttribute("data-measure", measure);
    }
  });

  it("preserves trusted descendants, native attributes, hooks, styles, and refs", () => {
    const ref = createRef<HTMLElement>();
    render(<Prose aria-label="Guide" className="consumer-prose" data-owner="docs" ref={ref} style={{ maxWidth: "60ch" }}><p>Read <a href="/guide">the guide</a>.</p></Prose>);
    const root = screen.getByLabelText("Guide");
    expect(root).toBe(ref.current);
    expect(root).toHaveClass("brick-prose", "consumer-prose");
    expect(root).toHaveAttribute("data-owner", "docs");
    expect(screen.getByRole("link")).toHaveAttribute("href", "/guide");
  });

  it("rejects injected HTML at runtime for untyped consumers", () => {
    const { container } = render(createElement(Prose as never, {
      dangerouslySetInnerHTML: { __html: "<p data-unsafe>Injected</p>" },
    }));

    expect(container.querySelector(".brick-prose")).toBeEmptyDOMElement();
    expect(container.querySelector("[data-unsafe]")).toBeNull();
  });
});

import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Spinner } from "../../../src/spinner.js";

describe("Spinner", () => {
  it("is a decorative span by default without progress or live semantics", () => {
    const ref = createRef<HTMLSpanElement>();
    render(<Spinner ref={ref} />);
    expect(ref.current?.tagName).toBe("SPAN");
    expect(ref.current).toHaveAttribute("aria-hidden", "true");
    expect(ref.current).not.toHaveAttribute("role");
    expect(ref.current).toHaveAttribute("data-size", "md");
    expect(ref.current).not.toHaveAttribute("aria-live");
  });
  it("supports exactly one authored graphic name", () => {
    const { rerender } = render(<Spinner label="Preparing preview" />);
    expect(screen.getByRole("img", { name: "Preparing preview" })).not.toHaveAttribute("aria-hidden");
    rerender(<><span id="name">Préparation</span><Spinner aria-labelledby="name" /></>);
    expect(screen.getByRole("img", { name: "Préparation" })).toBeInTheDocument();
  });
  it("consumes recipe props and preserves native and customization hooks", () => {
    const ref = createRef<HTMLSpanElement>();
    render(<Spinner ref={ref} size="xl" tone="success" emphasis="solid" thickness="thick"
      title="Loading preview" className="preview" data-slot="preview-spinner" style={{ "--brick-spinner-duration": "1s" }} />);
    for (const prop of ["size", "tone", "emphasis", "thickness", "label"]) expect(ref.current).not.toHaveAttribute(prop);
    expect(ref.current).toHaveClass("brick-spinner", "preview");
    expect(ref.current).toHaveAttribute("data-slot", "preview-spinner");
    expect(ref.current?.style.getPropertyValue("--brick-spinner-duration")).toBe("1s");
    expect(ref.current).toHaveAttribute("title", "Loading preview");
  });
  it("renders deterministic server markup with no browser state", () => {
    const first = renderToString(<Spinner size="inherit" />);
    expect(renderToString(<Spinner size="inherit" />)).toBe(first);
    expect(first).not.toContain("progressbar");
  });
});

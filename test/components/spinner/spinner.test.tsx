import { render, screen } from "@testing-library/react";
import { createRef, Fragment } from "react";
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
  it("serializes sparse responsive sizes without leaking object props", () => {
    const { container } = render(<Spinner size={{ md: "lg", xl: "inherit" }} />);
    expect(container.firstChild).toHaveAttribute("data-size", "md");
    expect(container.firstChild).toHaveAttribute("data-size-md", "lg");
    expect(container.firstChild).toHaveAttribute("data-size-xl", "inherit");
    expect(container.innerHTML).not.toContain("[object Object]");
  });
  it("projects passive artwork and preserves both refs, classes and styles", () => {
    const ref = createRef<SVGSVGElement>();
    const inner = createRef<SVGSVGElement>();
    const { container } = render(<Spinner asChild ref={ref} size="lg" tone="accent" label="Working" className="outer" style={{ "--brick-spinner-duration": "1s" }}><svg ref={inner} className="inner" style={{ opacity: .8 }} data-size="custom" viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 1 10 10" /></svg></Spinner>);
    expect(container.children).toHaveLength(1);
    expect(ref.current).toBe(inner.current);
    expect(ref.current).toHaveClass("brick-spinner", "outer", "inner");
    expect(ref.current).toHaveAttribute("data-size", "custom");
    expect(ref.current).toHaveAttribute("data-spinner-size", "lg");
    expect(ref.current).toHaveAttribute("data-spinner-artwork", "");
    expect(ref.current).not.toHaveAttribute("data-thickness");
    expect(ref.current?.style.opacity).toBe("0.8");
    expect(screen.getByRole("img", { name: "Working" })).toBe(ref.current);
  });
  it("keeps whitespace names decorative and ignores runtime tab stops", () => {
    const { container } = render(<Spinner label="  " {...({tabIndex: 0} as object)} />);
    expect(container.firstChild).toHaveAttribute("aria-hidden", "true");
    expect(container.firstChild).not.toHaveAttribute("role");
    expect(container.firstChild).toHaveAttribute("tabindex", "-1");
  });
  it("rejects fragments as projected artwork hosts", () => {
    expect(() => renderToString(<Spinner asChild><Fragment><svg /></Fragment></Spinner>)).toThrow("requires one element host");
  });
});

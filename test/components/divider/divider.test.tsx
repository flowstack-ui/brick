import { createRef, type CSSProperties } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Divider } from "../../../src/divider.js";

describe("Divider", () => {
  it("renders the adopted Atom-backed defaults", () => {
    const ref = createRef<HTMLHRElement | HTMLDivElement>();
    render(<Divider data-testid="divider" ref={ref} />);
    const divider = screen.getByTestId("divider");
    expect(divider).toBe(ref.current);
    expect(divider.tagName).toBe("HR");
    expect(divider).toHaveClass("brick-divider");
    expect(divider).toHaveAttribute("role", "none");
    expect(divider).toHaveAttribute("data-orientation", "horizontal");
    expect(divider).toHaveAttribute("data-variant", "solid");
    expect(divider).toHaveAttribute("data-thickness", "subtle");
    expect(divider).toHaveAttribute("data-inset", "none");
    expect(divider).not.toHaveAttribute("data-stretch");
  });

  it("forwards semantic orientation and every visual recipe", () => {
    render(<Divider decorative={false} inset="start" orientation="vertical" stretch thickness="strong" variant="dotted" data-testid="divider" />);
    const divider = screen.getByTestId("divider");
    expect(divider).toHaveAttribute("role", "separator");
    expect(divider).toHaveAttribute("aria-orientation", "vertical");
    expect(divider).toHaveAttribute("data-inset", "start");
    expect(divider).toHaveAttribute("data-stretch", "");
    expect(divider).toHaveAttribute("data-thickness", "strong");
    expect(divider).toHaveAttribute("data-variant", "dotted");
    expect(divider).not.toHaveAttribute("stretch");
    expect(divider).not.toHaveAttribute("thickness");
    expect(divider).not.toHaveAttribute("variant");
  });

  it("renders exact labeled anatomy", () => {
    render(<Divider labelAlign="end" data-testid="divider">or continue with</Divider>);
    const divider = screen.getByTestId("divider");
    expect(divider.tagName).toBe("DIV");
    expect(divider).toHaveAttribute("data-label-align", "end");
    expect(divider.children).toHaveLength(3);
    expect(divider.children[0]).toHaveAttribute("data-slot", "divider-line-start");
    expect(divider.children[0]).toHaveAttribute("aria-hidden", "true");
    expect(divider.children[1]).toHaveAttribute("data-slot", "divider-label");
    expect(divider.children[1]).toHaveTextContent("or continue with");
    expect(divider.children[2]).toHaveAttribute("data-slot", "divider-line-end");
  });

  it("supports root composition and native customization", () => {
    const ref = createRef<HTMLDivElement>();
    let clicks = 0;
    render(<Divider asChild className="consumer-divider" data-testid="divider" onClick={() => clicks++} ref={ref} slot="section-break" style={{ "--brick-divider-color": "red" } as CSSProperties}><div>Composed host</div></Divider>);
    const divider = screen.getByTestId("divider");
    fireEvent.click(divider);
    expect(clicks).toBe(1);
    expect(divider).toBe(ref.current);
    expect(divider.tagName).toBe("DIV");
    expect(divider).toHaveClass("brick-divider", "consumer-divider");
    expect(divider).toHaveAttribute("data-slot", "section-break");
    expect(divider.style.getPropertyValue("--brick-divider-color")).toBe("red");
  });
});

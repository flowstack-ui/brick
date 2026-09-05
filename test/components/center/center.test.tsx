import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Center, Circle, Square } from "../../../src/center.js";

describe("Center", () => {
  it("renders a neutral centered host without invented semantics", () => {
    const ref = createRef<HTMLElement>();
    render(<Center data-testid="center" ref={ref}>Content</Center>);
    const center = screen.getByTestId("center");
    expect(center).toBe(ref.current);
    expect(center.tagName).toBe("DIV");
    expect(center).toHaveClass("brick-center");
    expect(center).toHaveAttribute("data-slot", "center");
    expect(center).not.toHaveAttribute("role");
    expect(center).not.toHaveAttribute("data-inline");
  });

  it("keeps each public identity on one host", () => {
    const { rerender } = render(<Square data-testid="shape" size="2rem">S</Square>);
    const shape = screen.getByTestId("shape");
    expect(shape).toHaveClass("brick-center", "brick-square");
    expect(shape).not.toHaveClass("brick-circle");
    expect(shape).toHaveAttribute("data-slot", "square");

    rerender(<Circle data-testid="shape" size="2rem">C</Circle>);
    const circle = screen.getByTestId("shape");
    expect(circle).toHaveClass("brick-center", "brick-square", "brick-circle");
    expect(circle).toHaveAttribute("data-slot", "circle");
  });

  it("serializes scalar and responsive equal-size values", () => {
    const { rerender } = render(<Square data-testid="shape" size={32} />);
    const shape = screen.getByTestId("shape");
    expect(shape.style.getPropertyValue("--brick-center-size")).toBe("32px");

    rerender(
      <Square
        data-testid="shape"
        size={{ initial: "2rem", md: 40, xl: "3rem" }}
      />,
    );
    expect(shape.style.getPropertyValue("--brick-center-size")).toBe("2rem");
    expect(shape.style.getPropertyValue("--brick-center-size-md")).toBe("40px");
    expect(shape.style.getPropertyValue("--brick-center-size-xl")).toBe("3rem");
  });

  it("keeps automatic baseline geometry for a sparse responsive size", () => {
    render(<Square data-testid="shape" size={{ lg: 48 }} />);
    const style = screen.getByTestId("shape").style;
    expect(style.getPropertyValue("--brick-center-size")).toBe("");
    expect(style.getPropertyValue("--brick-center-size-lg")).toBe("48px");
  });

  it("enhances one child while preserving props, style, events, and ref", () => {
    const ref = createRef<HTMLElement>();
    let presses = 0;
    render(
      <Square
        asChild
        className="consumer-square"
        onClick={() => presses++}
        ref={ref}
        size="2rem"
        style={{ color: "red" }}
      >
        <span
          className="child"
          data-testid="shape"
          onClick={() => presses++}
          style={{ padding: "1px" }}
        >
          S
        </span>
      </Square>,
    );
    const shape = screen.getByTestId("shape");
    shape.click();
    expect(shape).toBe(ref.current);
    expect(shape.tagName).toBe("SPAN");
    expect(shape).toHaveClass("child", "brick-center", "brick-square", "consumer-square");
    expect(shape.style.padding).toBe("1px");
    expect(shape.style.color).toBe("red");
    expect(presses).toBe(2);
  });

  it("supports inline flow without leaking owned props", () => {
    render(<Circle data-testid="shape" inline size={0}>C</Circle>);
    const shape = screen.getByTestId("shape");
    expect(shape).toHaveAttribute("data-inline", "");
    expect(shape.style.getPropertyValue("--brick-center-size")).toBe("0");
    expect(shape).not.toHaveAttribute("inline");
    expect(shape).not.toHaveAttribute("size");
  });
});

import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ColorSwatch } from "../../../src/color-swatch.js";

describe("ColorSwatch", () => {
  it("renders a decorative alpha-aware root with a public value hook", () => {
    const ref = createRef<HTMLSpanElement>();
    render(<ColorSwatch.Root data-testid="swatch" ref={ref} value="rgb(91 91 214 / 60%)" />);
    const swatch = screen.getByTestId("swatch");
    expect(swatch).toBe(ref.current);
    expect(swatch).toHaveClass("brick-color-swatch");
    expect(swatch).toHaveAttribute("aria-hidden", "true");
    expect(swatch).toHaveAttribute("data-size", "md");
    expect(swatch.style.getPropertyValue("--brick-color-swatch-value")).toBe("rgb(91 91 214 / 60%)");
  });

  it("exposes a labeled swatch only when requested", () => {
    render(<ColorSwatch.Root data-testid="swatch" label="Indigo 9" value="#5b5bd6" />);
    expect(screen.getByRole("img", { name: "Indigo 9" })).toBe(screen.getByTestId("swatch"));
    expect(screen.getByTestId("swatch")).not.toHaveAttribute("aria-hidden");
  });

  it("renders a mixed swatch with every segment and closed sizes", () => {
    const { rerender } = render(<ColorSwatch.Mix data-testid="mix" values={["red", "green", "blue"]} />);
    expect(screen.getByTestId("mix")).toHaveClass("brick-color-swatch--mix");
    expect(screen.getByTestId("mix").style.getPropertyValue("--brick-color-swatch-value"))
      .toBe("conic-gradient(red 0% 33.333333333333336%, green 33.333333333333336% 66.66666666666667%, blue 66.66666666666667% 100%)");
    for (const size of ["sm", "md", "lg"] as const) {
      rerender(<ColorSwatch.Mix data-testid="mix" size={size} values={["red", "blue"]} />);
      expect(screen.getByTestId("mix")).toHaveAttribute("data-size", size);
    }
  });
});

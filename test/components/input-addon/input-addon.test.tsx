import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { InputAddon } from "../../../src/input-addon.js";
describe("InputAddon", () => {
  it("owns a noninteractive span with native ref and responsive recipes", () => {
    const ref = createRef<HTMLSpanElement>();
    render(<InputAddon ref={ref} size={{ sm: "sm" }} variant={{ md: "subtle" }}>https://</InputAddon>);
    expect(screen.getByText("https://")).toBe(ref.current);
    expect(ref.current?.tagName).toBe("SPAN");
    expect(ref.current).toHaveAttribute("data-size", "lg");
    expect(ref.current).toHaveAttribute("data-variant", "outline");
    expect(ref.current).toHaveAttribute("data-variant-md", "subtle");
    expect(ref.current).not.toHaveAttribute("tabindex");
  });
});

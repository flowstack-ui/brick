import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { Checkmark } from "../../../src/checkmark.js";

describe("Checkmark", () => {
  it("renders stable checked, mixed, and unchecked visual states", () => {
    const ref = createRef<SVGSVGElement>();
    const { container, rerender } = render(<Checkmark checked ref={ref} />);
    expect(ref.current).toHaveAttribute("data-state", "checked");
    expect(ref.current).toHaveAttribute("aria-hidden", "true");
    expect(container.querySelector("path")).not.toBeNull();
    rerender(<Checkmark indeterminate />);
    expect(container.querySelector("svg")).toHaveAttribute("data-state", "indeterminate");
    rerender(<Checkmark />);
    expect(container.querySelector("svg")).toHaveAttribute("data-state", "unchecked");
    expect(container.querySelector("path")).toBeNull();
    expect(screen.queryByRole("checkbox")).toBeNull();
  });
});

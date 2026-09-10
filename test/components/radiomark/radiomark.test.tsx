import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { Radiomark } from "../../../src/radiomark.js";

describe("Radiomark", () => {
  it("consumes filled and inverted presentation without adding behavior", () => {
    const { container } = render(<Radiomark filled checked variant="inverted" />);
    const mark = container.firstElementChild!;
    expect(mark).toHaveAttribute("data-filled");
    expect(mark).toHaveAttribute("data-variant", "inverted");
    expect(mark).not.toHaveAttribute("filled");
    expect(mark).toHaveAttribute("aria-hidden", "true");
  });
  it("renders one non-interactive circular state indicator", () => {
    const ref = createRef<HTMLSpanElement>();
    const { container } = render(<Radiomark checked disabled ref={ref} />);
    expect(ref.current).toHaveAttribute("data-state", "checked");
    expect(ref.current).toHaveAttribute("data-disabled");
    expect(container.querySelectorAll(".brick-radiomark__dot")).toHaveLength(1);
    expect(screen.queryByRole("radio")).toBeNull();
  });
});

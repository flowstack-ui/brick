import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { Radiomark } from "../../../src/radiomark.js";

describe("Radiomark", () => {
  it("renders one non-interactive circular state indicator", () => {
    const ref = createRef<HTMLSpanElement>();
    const { container } = render(<Radiomark checked disabled ref={ref} />);
    expect(ref.current).toHaveAttribute("data-state", "checked");
    expect(ref.current).toHaveAttribute("data-disabled");
    expect(container.querySelectorAll(".brick-radiomark__dot")).toHaveLength(1);
    expect(screen.queryByRole("radio")).toBeNull();
  });
});

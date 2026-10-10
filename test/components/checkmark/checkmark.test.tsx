import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { Checkmark } from "../../../src/checkmark.js";

describe("Checkmark", () => {
  it("consumes passive invalid paint and sparse responsive variants", () => {
    const { container } = render(
      <Checkmark invalid variant={{ md: "outline", xl: "subtle" }} />,
    );
    const mark = container.firstElementChild!;
    expect(mark).toHaveAttribute("data-invalid", "");
    expect(mark).not.toHaveAttribute("invalid");
    expect(mark).not.toHaveAttribute("aria-invalid");
    expect(mark).toHaveAttribute("data-variant", "solid");
    expect(mark).toHaveAttribute("data-variant-md", "outline");
    expect(mark).toHaveAttribute("data-variant-xl", "subtle");
    expect(mark).toHaveAttribute("aria-hidden", "true");
  });
  it("exposes responsive sizing, shared radius and subtle variant", () => {
    const { container } = render(
      <Checkmark
        checked
        size={{ initial: "sm", md: "lg" }}
        radius="none"
        tone="contrast"
        variant="subtle"
      />,
    );
    expect(container.firstChild).toHaveAttribute("data-size", "sm");
    expect(container.firstChild).toHaveAttribute("data-size-md", "lg");
    expect(container.firstChild).toHaveAttribute("data-tone", "contrast");
    expect(container.firstChild).toHaveAttribute("data-variant", "subtle");
    expect(container.firstChild).toHaveAttribute("aria-hidden", "true");
  });
  it("consumes filled and inverted as passive presentation props", () => {
    const { container } = render(
      <Checkmark filled variant="inverted" checked />,
    );
    expect(container.firstChild).toHaveAttribute("data-filled", "");
    expect(container.firstChild).not.toHaveAttribute("filled");
    expect(container.firstChild).toHaveAttribute("data-variant", "inverted");
  });
  it("renders stable checked, mixed, and unchecked visual states", () => {
    const ref = createRef<SVGSVGElement>();
    const { container, rerender } = render(<Checkmark checked ref={ref} />);
    expect(ref.current).toHaveAttribute("data-state", "checked");
    expect(ref.current).toHaveAttribute("aria-hidden", "true");
    expect(container.querySelector("path")).not.toBeNull();
    rerender(<Checkmark indeterminate />);
    expect(container.querySelector("svg")).toHaveAttribute(
      "data-state",
      "indeterminate",
    );
    rerender(<Checkmark />);
    expect(container.querySelector("svg")).toHaveAttribute(
      "data-state",
      "unchecked",
    );
    expect(container.querySelector("path")).toBeNull();
    expect(screen.queryByRole("checkbox")).toBeNull();
  });
});

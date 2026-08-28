import { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Field } from "../../../src/field.js";
import { Rating } from "../../../src/rating.js";

function Example(props: React.ComponentProps<typeof Rating.Root> = {}) { return <Rating.Root aria-label="Product rating" defaultValue={3} {...props}>{[1,2,3,4,5].map((value) => <Rating.Item key={value} value={value} />)}</Rating.Root>; }

describe("Rating", () => {
  it("renders one slider with decorative proportional items and default recipes", () => {
    render(<Example />); const root = screen.getByRole("slider", { name: "Product rating" });
    expect(root).toHaveClass("brick-rating"); expect(root).toHaveAttribute("data-size", "md"); expect(root).toHaveAttribute("data-tone", "accent"); expect(root).toHaveAttribute("data-variant", "solid"); expect(root).toHaveAttribute("aria-valuenow", "3");
    expect(root.querySelectorAll(".brick-rating__item")).toHaveLength(5); expect(root.querySelectorAll("svg[aria-hidden='true']")).toHaveLength(10);
  });

  it("supports fractional values, recipes, custom artwork, and read-only focus", () => {
    render(<Rating.Root aria-label="Score" defaultValue={2.5} step={0.5} readOnly size="lg" tone="neutral" variant="outline">{[1,2,3,4,5].map((value) => <Rating.Item key={value} value={value}><span aria-hidden="true">◆</span></Rating.Item>)}</Rating.Root>);
    const root = screen.getByRole("slider"); expect(root).toHaveAttribute("aria-valuenow", "2.5"); expect(root).toHaveAttribute("data-readonly"); expect(root).toHaveAttribute("tabindex", "0"); expect(root).toHaveAttribute("data-size", "lg");
    const items = root.querySelectorAll(".brick-rating__item"); expect((items[2] as HTMLElement).style.getPropertyValue("--brick-rating-fill")).toBe("50%");
  });

  it("inherits Field state, changes by keyboard, and owns form value", () => {
    render(<Field.Root invalid><Field.Label>Service</Field.Label><Example name="service" /></Field.Root>);
    const root = screen.getByRole("slider", { name: "Product rating" }); expect(root).toHaveAttribute("aria-invalid", "true"); expect(root).toHaveAttribute("data-invalid"); expect(document.querySelector('input[name="service"]')).toHaveValue("3"); fireEvent.keyDown(root, { key: "ArrowRight" }); expect(root).toHaveAttribute("aria-valuenow", "4");
  });

  it("forwards props, refs, classes, and slots", () => {
    const rootRef = createRef<HTMLDivElement>(); const itemRef = createRef<HTMLSpanElement>(); render(<Rating.Root ref={rootRef} aria-label="Rating" className="consumer"><Rating.Item ref={itemRef} className="consumer-item" data-slot="custom-item" value={1} /></Rating.Root>); expect(rootRef.current).toHaveClass("brick-rating", "consumer"); expect(itemRef.current).toHaveClass("brick-rating__item", "consumer-item"); expect(itemRef.current).toHaveAttribute("data-slot", "custom-item");
  });

  it("renders a compact, noninteractive aggregate display", () => {
    render(<Rating.Display label="4.5 out of 5 stars" size="sm" value={4.5} />);
    const display = screen.getByRole("img", { name: "4.5 out of 5 stars" });
    expect(display).toHaveClass("brick-rating", "brick-rating--display");
    expect(display).not.toHaveAttribute("tabindex");
    expect(display.querySelectorAll(".brick-rating__item")).toHaveLength(5);
    const items = display.querySelectorAll(".brick-rating__item");
    expect((items[3] as HTMLElement).style.getPropertyValue("--brick-rating-fill")).toBe("100%");
    expect((items[4] as HTMLElement).style.getPropertyValue("--brick-rating-fill")).toBe("50%");
  });

  it("renders a compact one-star numeric summary with one accessible label", () => {
    render(<Rating.Summary label="4.8 out of 5 stars" size="sm" value={4.8} valueText="4.8" />);
    const summary = screen.getByRole("img", { name: "4.8 out of 5 stars" });
    expect(summary).toHaveClass("brick-rating-summary");
    expect(summary).toHaveAttribute("data-size", "sm");
    expect(summary).not.toHaveAttribute("tabindex");
    expect(summary.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
    expect(summary).toHaveTextContent("4.8");
  });
});

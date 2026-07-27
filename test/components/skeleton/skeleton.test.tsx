import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Skeleton } from "../../../src/skeleton.js";

describe("Skeleton", () => {
  it("renders complete defaults without a live-region role", () => {
    render(<Skeleton data-testid="skeleton" />);
    const root = screen.getByTestId("skeleton");
    expect(root).toHaveClass("brick-skeleton");
    expect(root).toHaveAttribute("data-variant", "text");
    expect(root).toHaveAttribute("data-animation", "pulse");
    expect(root).toHaveAttribute("data-loading", "");
    expect(root).toHaveAttribute("aria-hidden", "true");
    expect(root).not.toHaveAttribute("role");
  });

  it("supports all shapes, animations, dimensions, and multi-line text", () => {
    const { rerender } = render(<Skeleton data-testid="skeleton" />);
    for (const variant of ["text", "circular", "rectangular", "rounded"] as const) for (const animation of ["pulse", "wave", "none"] as const) {
      rerender(<Skeleton animation={animation} height={32} lines={variant === "text" ? 3 : 1} variant={variant} width="12rem" data-testid="skeleton" />);
      const root = screen.getByTestId("skeleton");
      expect(root).toHaveAttribute("data-variant", variant);
      expect(root).toHaveAttribute("data-animation", animation);
      expect(root.style.getPropertyValue("--brick-skeleton-width")).toBe("12rem");
    }
    rerender(<Skeleton lines={3} data-testid="skeleton" />);
    expect(screen.getByTestId("skeleton").querySelectorAll(".brick-skeleton-line")).toHaveLength(3);
  });

  it("keeps one root and reveals wrapped content when loaded", () => {
    const { rerender } = render(<Skeleton loading data-testid="skeleton"><button>Save</button></Skeleton>);
    const root = screen.getByTestId("skeleton");
    expect(root).toHaveAttribute("aria-hidden", "true");
    expect(root.querySelector("button")).toBeTruthy();
    rerender(<Skeleton loading={false} data-testid="skeleton"><button>Save</button></Skeleton>);
    expect(screen.getByTestId("skeleton")).toBe(root);
    expect(screen.getByRole("button", { name: "Save" })).toBeVisible();
    expect(root).not.toHaveAttribute("aria-hidden");
  });

  it("forwards native props, class, style, slot, and ref", () => {
    const ref = createRef<HTMLSpanElement>();
    render(<Skeleton ref={ref} className="consumer" slot="custom-skeleton" style={{ margin: 2 }} title="Loading profile" />);
    expect(ref.current).toHaveClass("brick-skeleton", "consumer");
    expect(ref.current).toHaveAttribute("data-slot", "custom-skeleton");
    expect(ref.current).toHaveStyle({ margin: "2px" });
  });
});

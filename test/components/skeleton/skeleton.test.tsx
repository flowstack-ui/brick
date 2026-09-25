import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Skeleton } from "../../../src/skeleton.js";

describe("Skeleton", () => {
  it("normalizes line counts and limits lines to standalone text", () => {
    const { container, rerender } = render(<Skeleton lines={Infinity} />);
    expect(container.querySelectorAll(".brick-skeleton-line")).toHaveLength(0);
    rerender(<Skeleton lines={1000} />);
    expect(container.querySelectorAll(".brick-skeleton-line")).toHaveLength(100);
    rerender(<Skeleton variant="circular" lines={3} />);
    expect(container.querySelectorAll(".brick-skeleton-line")).toHaveLength(0);
    rerender(<Skeleton lines={3}>Text</Skeleton>);
    expect(container.querySelector("[data-lines]")).toBeNull();
  });
  it("projects onto one host without a private content wrapper", () => {
    const ref = createRef<HTMLSpanElement>();
    const { rerender } = render(<Skeleton asChild ref={ref}><article>Profile</article></Skeleton>);
    expect(ref.current?.tagName).toBe("ARTICLE");
    expect(ref.current).toHaveAttribute("inert");
    expect(ref.current?.querySelector("span")).toBeNull();
    const host = ref.current;
    rerender(<Skeleton asChild ref={ref} loading={false}><article>Profile</article></Skeleton>);
    expect(ref.current).toBe(host);
    expect(ref.current).not.toHaveAttribute("inert");
  });
  it("supports equal dimensions, radius and line geometry", () => {
    const { container } = render(<Skeleton variant="circular" width={64} radius="lg" gap={12} lastLineWidth="60%" />);
    const root = container.firstElementChild as HTMLElement;
    expect(root.style.getPropertyValue("--brick-skeleton-height")).toBe("64px");
    expect(root.style.getPropertyValue("--brick-skeleton-radius")).toBe("var(--brick-radius-core-lg)");
    expect(root.style.getPropertyValue("--brick-skeleton-gap")).toBe("12px");
    expect(root.style.getPropertyValue("--brick-skeleton-last-line-width")).toBe("60%");
  });
  it("preserves child and outer refs and authored accessibility after load", () => {
    const childRef = createRef<HTMLSpanElement>();
    const outerRef = createRef<HTMLSpanElement>();
    const { rerender } = render(<Skeleton asChild ref={outerRef}><span ref={childRef} aria-hidden="true">Private</span></Skeleton>);
    expect(childRef.current).toBe(outerRef.current);
    rerender(<Skeleton asChild ref={outerRef} loading={false}><span ref={childRef} aria-hidden="true">Private</span></Skeleton>);
    expect(outerRef.current).toHaveAttribute("aria-hidden", "true");
  });
  it("keeps projected state separate from the child component state", () => {
    const { container } = render(<Skeleton asChild><button data-variant="outline">Save</button></Skeleton>);
    expect(container.firstChild).toHaveAttribute("data-variant", "outline");
    expect(container.firstChild).not.toHaveAttribute("data-loading");
    expect(container.firstChild).toHaveAttribute("data-skeleton-loading", "");
  });
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

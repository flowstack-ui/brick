import { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Status, type StatusSize, type StatusTone } from "../../../src/status.js";

describe("Status", () => {
  it("inherits sparse sizes and removes stale breakpoint attributes", () => {
    const { rerender } = render(<Status.Root size={{ md: "lg" }} data-testid="responsive">Ready</Status.Root>);
    const root = screen.getByTestId("responsive");
    expect(root).toHaveAttribute("data-size", "md");
    expect(root).toHaveAttribute("data-size-md", "lg");
    rerender(<Status.Root size="sm" data-testid="responsive">Ready</Status.Root>);
    expect(root).toHaveAttribute("data-size", "sm");
    expect(root).not.toHaveAttribute("data-size-md");
  });

  it("projects all parts, merges refs/events and preserves decorative semantics", () => {
    const rootRef = createRef<HTMLSpanElement>(), childRef = createRef<HTMLSpanElement>();
    const dotRef = createRef<HTMLSpanElement>(), labelRef = createRef<HTMLSpanElement>();
    const calls: string[] = [];
    const { unmount } = render(<Status.Root asChild ref={rootRef} onClick={() => calls.push("root")}>
      <span ref={childRef} className="authored" onClick={() => calls.push("child")}>
        <Status.Indicator asChild ref={dotRef}><i aria-hidden="false" /></Status.Indicator>
        <Status.Label asChild ref={labelRef}><strong>Available</strong></Status.Label>
      </span>
    </Status.Root>);
    expect(rootRef.current).toBe(childRef.current);
    expect(rootRef.current).toHaveClass("brick-status", "authored");
    expect(dotRef.current?.tagName).toBe("I");
    expect(dotRef.current).toHaveAttribute("aria-hidden", "true");
    expect(labelRef.current?.tagName).toBe("STRONG");
    fireEvent.click(screen.getByText("Available"));
    expect(calls).toEqual(["root", "child"]);
    expect(rootRef.current).not.toHaveAttribute("asChild");
    unmount();
    for (const ref of [rootRef, childRef, dotRef, labelRef]) expect(ref.current).toBeNull();
  });
  it("renders a passive indicator and visible label without live-region semantics", () => {
    const ref = createRef<HTMLSpanElement>();
    render(
      <Status.Root ref={ref}>
        <Status.Indicator />
        <Status.Label>Available</Status.Label>
      </Status.Root>,
    );
    const label = screen.getByText("Available");
    const root = label.parentElement;
    expect(root).toBe(ref.current);
    expect(root).toHaveClass("brick-status");
    expect(root).toHaveAttribute("data-size", "md");
    expect(root).toHaveAttribute("data-tone", "neutral");
    expect(root).not.toHaveAttribute("role");
    expect(root).not.toHaveAttribute("aria-live");
    expect(root?.querySelector("[data-slot='status-indicator']")).toHaveAttribute("aria-hidden", "true");
  });

  it("exposes every closed size and semantic tone", () => {
    const sizes: StatusSize[] = ["sm", "md", "lg"];
    const tones: StatusTone[] = ["neutral", "accent", "info", "success", "warning", "danger"];
    const { rerender } = render(<Status.Root data-testid="status" />);
    for (const size of sizes) {
      rerender(<Status.Root data-testid="status" size={size} />);
      expect(screen.getByTestId("status")).toHaveAttribute("data-size", size);
    }
    for (const tone of tones) {
      rerender(<Status.Root data-testid="status" tone={tone} />);
      expect(screen.getByTestId("status")).toHaveAttribute("data-tone", tone);
    }
  });

  it("allows an indicator-only marker when adjacent content carries the state", () => {
    render(
      <p>
        <Status.Root aria-hidden="true" data-testid="unread-status" size="sm" tone="accent">
          <Status.Indicator />
        </Status.Root>
        Unread notification
      </p>,
    );

    const root = screen.getByTestId("unread-status");
    expect(root).toHaveAttribute("aria-hidden", "true");
    expect(root).toHaveAttribute("data-size", "sm");
    expect(root).toHaveAttribute("data-tone", "accent");
    expect(root.querySelector("[data-slot='status-label']")).toBeNull();
  });
});

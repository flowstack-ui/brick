import { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  Badge,
  type BadgeShape,
  type BadgeSize,
  type BadgeTone,
  type BadgeVariant,
} from "../../../src/badge.js";

describe("Badge", () => {
  it("owns passive Badge defaults and visual metadata", () => {
    render(<Badge>Published</Badge>);
    const badge = screen.getByText("Published");
    expect(badge).toHaveClass("brick-badge");
    expect(badge).toHaveAttribute("data-variant", "soft");
    expect(badge).toHaveAttribute("data-tone", "neutral");
    expect(badge).toHaveAttribute("data-size", "md");
    expect(badge).toHaveAttribute("data-shape", "rounded");
    expect(badge).not.toHaveAttribute("role");
    expect(badge).not.toHaveAttribute("tabindex");
    expect(badge).not.toHaveAttribute("variant");
    expect(badge).not.toHaveAttribute("tone");
    expect(badge).not.toHaveAttribute("size");
    expect(badge).not.toHaveAttribute("shape");
  });

  it("exposes every closed recipe through stable metadata", () => {
    const variants: BadgeVariant[] = ["soft", "solid", "outline"];
    const tones: BadgeTone[] = [
      "neutral",
      "accent",
      "info",
      "success",
      "warning",
      "danger",
    ];
    const sizes: BadgeSize[] = ["sm", "md", "lg"];
    const shapes: BadgeShape[] = ["rounded", "pill"];
    const { rerender } = render(<Badge>Status</Badge>);
    const badge = screen.getByText("Status");

    for (const variant of variants) {
      rerender(<Badge variant={variant}>Status</Badge>);
      expect(badge).toHaveAttribute("data-variant", variant);
    }
    for (const tone of tones) {
      rerender(<Badge tone={tone}>Status</Badge>);
      expect(badge).toHaveAttribute("data-tone", tone);
    }
    for (const size of sizes) {
      rerender(<Badge size={size}>Status</Badge>);
      expect(badge).toHaveAttribute("data-size", size);
    }
    for (const shape of shapes) {
      rerender(<Badge shape={shape}>Status</Badge>);
      expect(badge).toHaveAttribute("data-shape", shape);
    }
  });

  it("preserves native props, consumer hooks, composition, and span ref", () => {
    const ref = createRef<HTMLSpanElement>();
    let presses = 0;
    const { rerender } = render(
      <Badge
        aria-describedby="badge-help"
        className="consumer-badge"
        data-slot="release-status"
        onClick={() => presses++}
        ref={ref}
        style={{ marginInlineStart: 4 }}
        title="Release status"
      >
        Published
      </Badge>,
    );
    const badge = screen.getByText("Published");
    fireEvent.click(badge);
    expect(presses).toBe(1);
    expect(ref.current).toBe(badge);
    expect(badge).toHaveClass("brick-badge", "consumer-badge");
    expect(badge).toHaveAttribute("data-slot", "release-status");
    expect(badge).toHaveAttribute("aria-describedby", "badge-help");
    expect(badge).toHaveAttribute("title", "Release status");
    expect(badge).toHaveStyle({ marginInlineStart: "4px" });

    rerender(
      <Badge render={<strong data-testid="rendered-badge" />}>Status</Badge>,
    );
    expect(screen.getByTestId("rendered-badge").tagName).toBe("STRONG");
    expect(screen.getByTestId("rendered-badge")).toHaveClass("brick-badge");

    rerender(
      <Badge asChild>
        <em data-testid="child-badge">Status</em>
      </Badge>,
    );
    expect(screen.getByTestId("child-badge").tagName).toBe("EM");
    expect(screen.getByTestId("child-badge")).toHaveClass("brick-badge");
  });
});

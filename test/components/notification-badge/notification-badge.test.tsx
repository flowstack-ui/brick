import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  NotificationBadge,
  type NotificationBadgeOverlap,
  type NotificationBadgePlacement,
  type NotificationBadgeSize,
} from "../../../src/badge.js";

describe("NotificationBadge", () => {
  it("owns count formatting and its visual-only indicator", () => {
    render(
      <NotificationBadge count={125} max={99}>
        <button aria-label="Inbox, more than 99 unread messages">Inbox</button>
      </NotificationBadge>,
    );
    const indicator = screen.getByText("99+");
    expect(indicator).toHaveAttribute("aria-hidden", "true");
    expect(indicator).toHaveAttribute("data-variant", "count");
    expect(indicator).toHaveAttribute("data-shape", "pill");
  });

  it("owns canonical wrapper defaults without changing its single child", () => {
    render(
      <NotificationBadge count={4}>
        <button aria-label="Inbox, 4 unread messages">Inbox</button>
      </NotificationBadge>,
    );
    const root = screen.getByRole("button").parentElement;
    expect(root).toHaveClass("brick-notification-badge");
    expect(root).toHaveAttribute("data-slot", "notification-badge");
    expect(root).toHaveAttribute("data-tone", "danger");
    expect(root).toHaveAttribute("data-size", "md");
    expect(root).toHaveAttribute("data-placement", "top-end");
    expect(root).toHaveAttribute("data-overlap", "rectangular");
    expect(screen.getByRole("button")).toHaveAccessibleName(
      "Inbox, 4 unread messages",
    );
    expect(root).not.toHaveAttribute("role");
    expect(root).not.toHaveAttribute("tabindex");
  });

  it("validates count visibility, overflow, zero, and dot modes", () => {
    const child = <button aria-label="Inbox">Inbox</button>;
    const { container, rerender } = render(
      <NotificationBadge count={0}>{child}</NotificationBadge>,
    );
    expect(
      container.querySelector("[data-slot='notification-badge-indicator']"),
    ).toBeNull();
    expect(container.firstElementChild).toHaveAttribute("data-invisible", "");

    rerender(
      <NotificationBadge count={0} showZero>
        {child}
      </NotificationBadge>,
    );
    expect(screen.getByText("0")).toHaveAttribute("data-shape", "circle");

    rerender(
      <NotificationBadge count={125} max={9}>
        {child}
      </NotificationBadge>,
    );
    expect(screen.getByText("9+")).toHaveAttribute("data-shape", "pill");

    rerender(
      <NotificationBadge count={12} max={Number.NaN}>
        {child}
      </NotificationBadge>,
    );
    expect(screen.getByText("12")).toHaveAttribute("data-shape", "pill");

    rerender(<NotificationBadge count={1.5}>{child}</NotificationBadge>);
    expect(
      container.querySelector("[data-slot='notification-badge-indicator']"),
    ).toBeNull();

    rerender(<NotificationBadge dot>{child}</NotificationBadge>);
    const dot = container.querySelector("[data-variant='dot']");
    expect(dot).toHaveAttribute("aria-hidden", "true");
    expect(dot).toHaveAttribute("data-shape", "circle");
    expect(dot).toBeEmptyDOMElement();

    rerender(
      <NotificationBadge count={4} invisible>
        {child}
      </NotificationBadge>,
    );
    expect(
      container.querySelector("[data-slot='notification-badge-indicator']"),
    ).toBeNull();
  });

  it("exposes every placement, overlap, size, and tone as root metadata", () => {
    const placements: NotificationBadgePlacement[] = [
      "top-start",
      "top-end",
      "bottom-start",
      "bottom-end",
    ];
    const overlaps: NotificationBadgeOverlap[] = ["rectangular", "circular"];
    const sizes: NotificationBadgeSize[] = ["sm", "md", "lg"];
    const tones = [
      "neutral",
      "accent",
      "info",
      "success",
      "warning",
      "danger",
    ] as const;
    const child = <button aria-label="Inbox">Inbox</button>;
    const { rerender } = render(
      <NotificationBadge count={4}>{child}</NotificationBadge>,
    );
    const root = screen.getByRole("button").parentElement;

    for (const placement of placements) {
      rerender(
        <NotificationBadge count={4} placement={placement}>
          {child}
        </NotificationBadge>,
      );
      expect(root).toHaveAttribute("data-placement", placement);
    }
    for (const overlap of overlaps) {
      rerender(
        <NotificationBadge count={4} overlap={overlap}>
          {child}
        </NotificationBadge>,
      );
      expect(root).toHaveAttribute("data-overlap", overlap);
    }
    for (const size of sizes) {
      rerender(
        <NotificationBadge count={4} size={size}>
          {child}
        </NotificationBadge>,
      );
      expect(root).toHaveAttribute("data-size", size);
    }
    for (const tone of tones) {
      rerender(
        <NotificationBadge count={4} tone={tone}>
          {child}
        </NotificationBadge>,
      );
      expect(root).toHaveAttribute("data-tone", tone);
    }
  });

  it("preserves wrapper render, class, style, slot, and span ref", () => {
    const ref = createRef<HTMLSpanElement>();
    render(
      <NotificationBadge
        className="consumer-notification"
        count={4}
        data-slot="inbox-notification"
        ref={ref}
        render={<span title="Inbox status" />}
        style={{ marginInlineStart: 4 }}
      >
        <button aria-label="Inbox, 4 unread messages">Inbox</button>
      </NotificationBadge>,
    );
    const root = screen.getByRole("button").parentElement;
    expect(ref.current).toBe(root);
    expect(root).toHaveClass(
      "brick-notification-badge",
      "consumer-notification",
    );
    expect(root).toHaveAttribute("data-slot", "inbox-notification");
    expect(root).toHaveAttribute("title", "Inbox status");
    expect(root).toHaveStyle({ marginInlineStart: "4px" });
  });
});

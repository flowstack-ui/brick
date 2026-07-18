import { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  Badge,
  NotificationBadge,
  type BadgeShape,
  type BadgeSize,
  type BadgeTone,
  type BadgeVariant,
  type NotificationBadgeOverlap,
  type NotificationBadgePlacement,
  type NotificationBadgeSize,
} from "../../src/badge.js";

describe("Badge", () => {
  it("renders passive semantic defaults without invented behavior or leaked props", () => {
    render(<Badge>Published</Badge>);

    const badge = screen.getByText("Published");
    expect(badge.tagName).toBe("SPAN");
    expect(badge).toHaveClass("brick-badge");
    expect(badge).toHaveAttribute("data-slot", "badge");
    expect(badge).toHaveAttribute("data-variant", "soft");
    expect(badge).toHaveAttribute("data-tone", "neutral");
    expect(badge).toHaveAttribute("data-size", "md");
    expect(badge).toHaveAttribute("data-shape", "rounded");
    expect(badge).not.toHaveAttribute("role");
    expect(badge).not.toHaveAttribute("aria-live");
    expect(badge).not.toHaveAttribute("tabindex");
    expect(badge).not.toHaveAttribute("variant");
    expect(badge).not.toHaveAttribute("tone");
    expect(badge).not.toHaveAttribute("shape");
  });

  it("forwards native props, events, refs, class, style, and slot overrides", () => {
    const ref = createRef<HTMLSpanElement>();
    const onClick = vi.fn();
    render(
      <Badge
        aria-describedby="status-help"
        className="consumer-badge"
        data-slot="release-status"
        onClick={onClick}
        ref={ref}
        style={{ marginInlineStart: 4 }}
        title="Release status"
      >
        Ready
      </Badge>,
    );

    const badge = screen.getByText("Ready");
    fireEvent.click(badge);
    expect(onClick).toHaveBeenCalledOnce();
    expect(badge).toBe(ref.current);
    expect(badge).toHaveClass("brick-badge", "consumer-badge");
    expect(badge).toHaveAttribute("data-slot", "release-status");
    expect(badge).toHaveAttribute("aria-describedby", "status-help");
    expect(badge).toHaveAttribute("title", "Release status");
    expect(badge).toHaveStyle({ marginInlineStart: "4px" });
  });

  it("exposes every closed visual recipe as resolved metadata", () => {
    const variants: BadgeVariant[] = ["soft", "solid", "outline"];
    const tones: BadgeTone[] = ["neutral", "accent", "info", "success", "warning", "danger"];
    const sizes: BadgeSize[] = ["sm", "md", "lg"];
    const shapes: BadgeShape[] = ["rounded", "pill"];
    const { rerender } = render(<Badge>Recipe</Badge>);
    const badge = screen.getByText("Recipe");

    for (const variant of variants) {
      rerender(<Badge variant={variant}>Recipe</Badge>);
      expect(badge).toHaveAttribute("data-variant", variant);
    }
    for (const tone of tones) {
      rerender(<Badge tone={tone}>Recipe</Badge>);
      expect(badge).toHaveAttribute("data-tone", tone);
    }
    for (const size of sizes) {
      rerender(<Badge size={size}>Recipe</Badge>);
      expect(badge).toHaveAttribute("data-size", size);
    }
    for (const shape of shapes) {
      rerender(<Badge shape={shape}>Recipe</Badge>);
      expect(badge).toHaveAttribute("data-shape", shape);
    }
  });

  it("preserves Atom asChild and render composition", () => {
    const { rerender } = render(
      <Badge asChild tone="info">
        <strong data-testid="composed">Beta</strong>
      </Badge>,
    );
    expect(screen.getByTestId("composed")).toHaveClass("brick-badge");
    expect(screen.getByTestId("composed")).toHaveAttribute("data-tone", "info");

    rerender(<Badge render={<em data-testid="rendered" />}>Preview</Badge>);
    expect(screen.getByTestId("rendered").tagName).toBe("EM");
    expect(screen.getByTestId("rendered")).toHaveTextContent("Preview");
    expect(screen.getByTestId("rendered")).toHaveClass("brick-badge");
  });
});

describe("NotificationBadge", () => {
  it("renders a contextual count as a visual-only circular indicator", () => {
    render(
      <NotificationBadge count={3}>
        <button aria-label="Inbox, 3 unread messages">Inbox</button>
      </NotificationBadge>,
    );

    const wrapper = screen.getByRole("button", { name: "Inbox, 3 unread messages" }).parentElement;
    const indicator = wrapper?.querySelector("[data-slot='notification-badge-indicator']");
    expect(wrapper).toHaveClass("brick-notification-badge");
    expect(wrapper).toHaveAttribute("data-slot", "notification-badge");
    expect(wrapper).toHaveAttribute("data-tone", "danger");
    expect(wrapper).toHaveAttribute("data-size", "md");
    expect(wrapper).toHaveAttribute("data-placement", "top-end");
    expect(wrapper).toHaveAttribute("data-overlap", "rectangular");
    expect(indicator).toHaveTextContent("3");
    expect(indicator).toHaveAttribute("aria-hidden", "true");
    expect(indicator).toHaveAttribute("data-variant", "count");
    expect(indicator).toHaveAttribute("data-shape", "circle");
  });

  it("formats multi-digit and overflow counts as pills", () => {
    const { rerender } = render(
      <NotificationBadge count={12}>
        <span>Tasks</span>
      </NotificationBadge>,
    );
    let indicator = screen.getByText("12");
    expect(indicator).toHaveAttribute("data-shape", "pill");

    rerender(
      <NotificationBadge count={125} max={99}>
        <span>Tasks</span>
      </NotificationBadge>,
    );
    indicator = screen.getByText("99+");
    expect(indicator).toHaveAttribute("data-shape", "pill");
  });

  it("handles zero, invalid counts, invalid maxima, invisible, and dot modes deterministically", () => {
    const { container, rerender } = render(
      <NotificationBadge count={0}>
        <span>Tasks</span>
      </NotificationBadge>,
    );
    const indicator = () => container.querySelector("[data-slot='notification-badge-indicator']");
    expect(indicator()).toBeNull();

    rerender(
      <NotificationBadge count={0} showZero>
        <span>Tasks</span>
      </NotificationBadge>,
    );
    expect(indicator()).toHaveTextContent("0");

    for (const count of [-1, 1.5, Number.NaN, Number.POSITIVE_INFINITY]) {
      rerender(
        <NotificationBadge count={count}>
          <span>Tasks</span>
        </NotificationBadge>,
      );
      expect(indicator()).toBeNull();
    }

    rerender(
      <NotificationBadge count={100} max={0}>
        <span>Tasks</span>
      </NotificationBadge>,
    );
    expect(indicator()).toHaveTextContent("99+");

    rerender(
      <NotificationBadge dot>
        <span>Presence</span>
      </NotificationBadge>,
    );
    expect(indicator()).toBeEmptyDOMElement();
    expect(indicator()).toHaveAttribute("data-variant", "dot");

    rerender(
      <NotificationBadge dot invisible>
        <span>Presence</span>
      </NotificationBadge>,
    );
    expect(indicator()).toBeNull();
  });

  it("forwards wrapper props/ref without renaming or mutating the child", () => {
    const ref = createRef<HTMLSpanElement>();
    render(
      <NotificationBadge
        className="consumer-notification"
        count={8}
        data-slot="task-notification"
        ref={ref}
        render={<aside data-testid="notification-wrapper" />}
        style={{ marginInlineStart: 6 }}
        tone="info"
      >
        <button aria-label="Tasks, 8 ready">Tasks</button>
      </NotificationBadge>,
    );

    const wrapper = screen.getByTestId("notification-wrapper");
    const child = screen.getByRole("button", { name: "Tasks, 8 ready" });
    expect(wrapper).toBe(ref.current);
    expect(wrapper).toHaveClass("brick-notification-badge", "consumer-notification");
    expect(wrapper).toHaveAttribute("data-slot", "task-notification");
    expect(wrapper).toHaveAttribute("data-tone", "info");
    expect(wrapper).toHaveStyle({ marginInlineStart: "6px" });
    expect(child).toHaveAttribute("aria-label", "Tasks, 8 ready");
    expect(child).not.toHaveAttribute("aria-describedby");
  });

  it("exposes every placement, overlap, and size recipe", () => {
    const placements: NotificationBadgePlacement[] = ["top-start", "top-end", "bottom-start", "bottom-end"];
    const overlaps: NotificationBadgeOverlap[] = ["rectangular", "circular"];
    const sizes: NotificationBadgeSize[] = ["sm", "md", "lg"];
    const { rerender } = render(
      <NotificationBadge count={1}>
        <span>Anchor</span>
      </NotificationBadge>,
    );
    const wrapper = screen.getByText("Anchor").parentElement;

    for (const placement of placements) {
      rerender(<NotificationBadge count={1} placement={placement}><span>Anchor</span></NotificationBadge>);
      expect(wrapper).toHaveAttribute("data-placement", placement);
    }
    for (const overlap of overlaps) {
      rerender(<NotificationBadge count={1} overlap={overlap}><span>Anchor</span></NotificationBadge>);
      expect(wrapper).toHaveAttribute("data-overlap", overlap);
    }
    for (const size of sizes) {
      rerender(<NotificationBadge count={1} size={size}><span>Anchor</span></NotificationBadge>);
      expect(wrapper).toHaveAttribute("data-size", size);
    }
  });
});

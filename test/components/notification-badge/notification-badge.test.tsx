import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { NotificationBadge } from "../../../src/badge.js";

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
});

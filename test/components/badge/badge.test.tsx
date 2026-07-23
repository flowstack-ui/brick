import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Badge } from "../../../src/badge.js";

describe("Badge", () => {
  it("owns passive Badge defaults and visual metadata", () => {
    render(<Badge>Published</Badge>);
    const badge = screen.getByText("Published");
    expect(badge).toHaveClass("brick-badge");
    expect(badge).toHaveAttribute("data-variant", "soft");
    expect(badge).toHaveAttribute("data-tone", "neutral");
    expect(badge).not.toHaveAttribute("role");
  });
});

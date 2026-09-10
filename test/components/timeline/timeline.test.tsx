import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Timeline } from "../../../src/timeline.js";

describe("Timeline", () => {
  it("uses native list grammar and decorative marker anatomy", () => {
    render(<Timeline.Root aria-label="Events"><Timeline.Item><Timeline.Connector><Timeline.Separator /><Timeline.Indicator>1</Timeline.Indicator></Timeline.Connector><Timeline.Content><Timeline.Title>Placed</Timeline.Title><Timeline.Description>Today</Timeline.Description></Timeline.Content></Timeline.Item></Timeline.Root>);
    const list = screen.getByRole("list", { name: "Events" });
    expect(list.tagName).toBe("OL");
    expect(screen.getByRole("listitem").tagName).toBe("LI");
    expect(list).toHaveAttribute("data-size", "md");
    expect(list).toHaveAttribute("data-variant", "solid");
    expect(list).toHaveAttribute("data-tone", "neutral");
    expect(list).toHaveAttribute("data-show-last-separator", "false");
    expect(screen.getByText("Placed").tagName).toBe("P");
    expect(screen.getByText("1")).toHaveAttribute("aria-hidden", "true");
    expect(list.querySelector(".brick-timeline-separator")).toHaveAttribute("aria-hidden", "true");
    expect(list.querySelector(".brick-timeline-content")).toHaveAttribute("data-side", "after");
  });
  it("preserves native props, refs, projection and explicit event overrides", () => {
    const ref = createRef<HTMLElement>();
    render(<Timeline.Root showLastSeparator size="xl" variant="outline"><Timeline.Item tone="success"><Timeline.Content side="before" ref={ref} className="custom" data-slot="authored"><Timeline.Title asChild><h3>Approved</h3></Timeline.Title></Timeline.Content></Timeline.Item></Timeline.Root>);
    expect(ref.current).toHaveAttribute("data-side", "before");
    expect(ref.current).toHaveAttribute("data-slot", "authored");
    expect(ref.current).toHaveClass("brick-timeline-content", "custom");
    expect(screen.getByRole("heading")).toHaveClass("brick-timeline-title");
    expect(screen.getByRole("listitem")).toHaveAttribute("data-tone", "success");
    expect(screen.getByRole("list")).not.toHaveAttribute("showLastSeparator");
  });
  it("does not invent events for empty children or roles for content", () => {
    render(<Timeline.Root aria-label="Empty" />);
    expect(screen.getByRole("list")).toBeEmptyDOMElement();
    expect(screen.getByRole("list")).not.toHaveAttribute("aria-live");
  });
});

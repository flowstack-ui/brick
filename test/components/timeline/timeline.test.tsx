import { createRef, StrictMode } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Timeline } from "../../../src/timeline.js";

describe("Timeline", () => {
  it("preserves composed callback cleanup and clears object refs on replacement and unmount", () => {
    const cleanup = vi.fn();
    const childRef = vi.fn((node: HTMLElement | null) =>
      node ? cleanup : undefined,
    );
    const ref = createRef<HTMLElement>();
    const { rerender, unmount } = render(
      <Timeline.Content asChild ref={ref}>
        <section ref={childRef}>First</section>
      </Timeline.Content>,
    );
    expect(ref.current?.tagName).toBe("SECTION");
    rerender(
      <Timeline.Content asChild ref={ref}>
        <article ref={childRef}>Second</article>
      </Timeline.Content>,
    );
    expect(cleanup).toHaveBeenCalledTimes(1);
    expect(ref.current?.tagName).toBe("ARTICLE");
    unmount();
    expect(cleanup).toHaveBeenCalledTimes(2);
    expect(childRef).not.toHaveBeenCalledWith(null);
    expect(ref.current).toBeNull();
  });
  it("balances strict-mode callback attachments and cleanup", () => {
    const cleanup = vi.fn();
    const attach = vi.fn(() => cleanup);
    const { unmount } = render(
      <StrictMode>
        <Timeline.Title asChild>
          <h3 ref={attach}>Review</h3>
        </Timeline.Title>
      </StrictMode>,
    );
    unmount();
    expect(cleanup.mock.calls.length).toBe(attach.mock.calls.length);
  });
  it("merges provider defaults but replaces responsive maps and honors explicit false", () => {
    render(
      <Timeline.PropsProvider
        value={{
          size: { initial: "sm", lg: "xl" },
          variant: "subtle",
          showLastSeparator: true,
        }}
      >
        <Timeline.Root aria-label="outer" />
        <Timeline.RootPropsProvider
          value={{ size: { md: "lg" }, variant: undefined }}
        >
          <Timeline.Root
            aria-label="inner"
            showLastSeparator={false}
            layout={{ initial: "compact", lg: "balanced" }}
          />
        </Timeline.RootPropsProvider>
      </Timeline.PropsProvider>,
    );
    expect(screen.getByLabelText("outer")).toHaveAttribute(
      "data-size-lg",
      "xl",
    );
    const inner = screen.getByLabelText("inner");
    expect(inner).toHaveAttribute("data-size", "md");
    expect(inner).toHaveAttribute("data-size-md", "lg");
    expect(inner).not.toHaveAttribute("data-size-lg");
    expect(inner).toHaveAttribute("data-variant", "subtle");
    expect(inner).toHaveAttribute("data-show-last-separator", "false");
    expect(inner).toHaveAttribute("data-layout", "compact");
  });
  it("removes recipes for unstyled parts without losing native semantics, decoration or nested isolation", () => {
    render(
      <Timeline.Root unstyled aria-label="raw">
        <Timeline.Item>
          <Timeline.Connector>
            <Timeline.Indicator>Dot</Timeline.Indicator>
          </Timeline.Connector>
          <Timeline.Content>
            <Timeline.Title unstyled={false}>Styled title</Timeline.Title>
            <Timeline.Root aria-label="nested" />
          </Timeline.Content>
        </Timeline.Item>
      </Timeline.Root>,
    );
    expect(screen.getByLabelText("raw")).not.toHaveClass("brick-timeline");
    expect(screen.getByText("Dot")).not.toHaveClass("brick-timeline-indicator");
    expect(screen.getByText("Dot")).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByText("Styled title")).toHaveClass(
      "brick-timeline-title",
    );
    expect(screen.getByLabelText("nested")).toHaveClass("brick-timeline");
  });
  it("uses native list grammar and decorative marker anatomy", () => {
    render(
      <Timeline.Root aria-label="Events">
        <Timeline.Item>
          <Timeline.Connector>
            <Timeline.Separator />
            <Timeline.Indicator>1</Timeline.Indicator>
          </Timeline.Connector>
          <Timeline.Content>
            <Timeline.Title>Placed</Timeline.Title>
            <Timeline.Description>Today</Timeline.Description>
          </Timeline.Content>
        </Timeline.Item>
      </Timeline.Root>,
    );
    const list = screen.getByRole("list", { name: "Events" });
    expect(list.tagName).toBe("OL");
    expect(screen.getByRole("listitem").tagName).toBe("LI");
    expect(list).toHaveAttribute("data-size", "md");
    expect(list).toHaveAttribute("data-variant", "solid");
    expect(list).toHaveAttribute("data-tone", "neutral");
    expect(list).toHaveAttribute("data-show-last-separator", "false");
    expect(screen.getByText("Placed").tagName).toBe("P");
    expect(screen.getByText("1")).toHaveAttribute("aria-hidden", "true");
    expect(list.querySelector(".brick-timeline-separator")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
    expect(list.querySelector(".brick-timeline-content")).toHaveAttribute(
      "data-side",
      "after",
    );
  });
  it("preserves native props, refs, projection and explicit event overrides", () => {
    const ref = createRef<HTMLElement>();
    render(
      <Timeline.Root showLastSeparator size="xl" variant="outline">
        <Timeline.Item tone="success">
          <Timeline.Content
            side="before"
            ref={ref}
            className="custom"
            data-slot="authored"
          >
            <Timeline.Title asChild>
              <h3>Approved</h3>
            </Timeline.Title>
          </Timeline.Content>
        </Timeline.Item>
      </Timeline.Root>,
    );
    expect(ref.current).toHaveAttribute("data-side", "before");
    expect(ref.current).toHaveAttribute("data-slot", "authored");
    expect(ref.current).toHaveClass("brick-timeline-content", "custom");
    expect(screen.getByRole("heading")).toHaveClass("brick-timeline-title");
    expect(screen.getByRole("listitem")).toHaveAttribute(
      "data-tone",
      "success",
    );
    expect(screen.getByRole("list")).not.toHaveAttribute("showLastSeparator");
  });
  it("does not invent events for empty children or roles for content", () => {
    render(<Timeline.Root aria-label="Empty" />);
    expect(screen.getByRole("list")).toBeEmptyDOMElement();
    expect(screen.getByRole("list")).not.toHaveAttribute("aria-live");
  });
});

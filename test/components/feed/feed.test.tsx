import { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Feed } from "../../../src/feed.js";

function ActivityFeed(props: Partial<React.ComponentProps<typeof Feed.Root>> = {}) {
  return (
    <Feed.Root aria-label="Activity" setSize={2} {...props}>
      <Feed.Item aria-labelledby="first-title" index={0}>
        <h2 id="first-title">Build published</h2>
        <button type="button">Open release</button>
      </Feed.Item>
      <Feed.Item aria-describedby="second-summary" aria-labelledby="second-title" position={2}>
        <h2 id="second-title">Review requested</h2>
        <p id="second-summary">Morgan requested a design review.</p>
      </Feed.Item>
    </Feed.Root>
  );
}

describe("Feed", () => {
  it("renders the two-part default contract without Brick wrappers", () => {
    render(<ActivityFeed />);
    const root = screen.getByRole("feed", { name: "Activity" });
    const articles = screen.getAllByRole("article");

    expect(root).toHaveClass("brick-feed");
    expect(root).toHaveAttribute("data-density", "comfortable");
    expect(root).toHaveAttribute("data-divider-strength", "subtle");
    expect(root).toHaveAttribute("data-variant", "divided");
    expect(root).toHaveAttribute("data-slot", "feed");
    expect(articles).toHaveLength(2);
    expect(articles[0]).toBe(root.firstElementChild);
    expect(articles[1]).toBe(root.lastElementChild);
    expect(articles[0]).toHaveClass("brick-feed__item");
    expect(articles[0]).toHaveAttribute("data-slot", "feed-item");
    expect(articles[0]).toHaveAttribute("aria-posinset", "1");
    expect(articles[0]).toHaveAttribute("aria-setsize", "2");
    expect(articles[0].firstElementChild?.tagName).toBe("H2");
    expect(articles[0].querySelector(".brick-feed__content")).toBeNull();
  });

  it("exposes every closed recipe without leaking recipe props", () => {
    const variants = ["plain", "divided", "outline"] as const;
    const densities = ["compact", "comfortable"] as const;
    const dividerStrengths = ["subtle", "default"] as const;
    const { rerender } = render(<ActivityFeed />);

    for (const variant of variants) {
      for (const density of densities) {
        rerender(<ActivityFeed density={density} variant={variant} />);
        const root = screen.getByRole("feed", { name: "Activity" });
        expect(root).toHaveAttribute("data-density", density);
        expect(root).toHaveAttribute("data-variant", variant);
        expect(root).not.toHaveAttribute("density");
        expect(root).not.toHaveAttribute("variant");
      }
    }
    for (const dividerStrength of dividerStrengths) {
      rerender(<ActivityFeed dividerStrength={dividerStrength} />);
      const root = screen.getByRole("feed", { name: "Activity" });
      expect(root).toHaveAttribute("data-divider-strength", dividerStrength);
      expect(root).not.toHaveAttribute("dividerStrength");
    }
  });

  it("preserves Atom state, relationships, native props, events, styles, classes, slots, and refs", () => {
    const onClick = vi.fn();
    const rootRef = createRef<HTMLElement>();
    const itemRef = createRef<HTMLElement>();
    render(
      <Feed.Root
        aria-describedby="feed-help"
        aria-label="Updates"
        busy
        className="consumer-feed"
        data-evidence="root"
        data-slot="activity-feed"
        dir="rtl"
        onClick={onClick}
        ref={rootRef}
        setSize="unknown"
        style={{ color: "rgb(1, 2, 3)" }}
      >
        <Feed.Item
          aria-label="Deployment update"
          className="consumer-item"
          data-slot="activity-item"
          position={41}
          ref={itemRef}
        >
          Deployment complete
        </Feed.Item>
      </Feed.Root>,
    );

    const root = screen.getByRole("feed", { name: "Updates" });
    const item = screen.getByRole("article", { name: "Deployment update" });
    fireEvent.click(item);
    expect(onClick).toHaveBeenCalledOnce();
    expect(rootRef.current).toBe(root);
    expect(itemRef.current).toBe(item);
    expect(root).toHaveClass("brick-feed", "consumer-feed");
    expect(item).toHaveClass("brick-feed__item", "consumer-item");
    expect(root).toHaveAttribute("aria-busy", "true");
    expect(root).toHaveAttribute("data-busy", "");
    expect(root).toHaveAttribute("data-evidence", "root");
    expect(root).toHaveAttribute("data-slot", "activity-feed");
    expect(root).toHaveAttribute("dir", "rtl");
    expect(root.style.color).toBe("rgb(1, 2, 3)");
    expect(item).toHaveAttribute("aria-posinset", "41");
    expect(item).toHaveAttribute("aria-setsize", "-1");
    expect(item).toHaveAttribute("data-setsize", "unknown");
    expect(item).toHaveAttribute("data-slot", "activity-item");
  });

  it("preserves Atom render and asChild composition", () => {
    const { rerender } = render(
      <Feed.Root aria-label="Rendered" render={<section data-testid="rendered-root" />}>
        <Feed.Item render={<section data-testid="rendered-item" />}>Rendered article</Feed.Item>
      </Feed.Root>,
    );
    expect(screen.getByTestId("rendered-root")).toHaveClass("brick-feed");
    expect(screen.getByTestId("rendered-item")).toHaveClass("brick-feed__item");
    expect(screen.getByTestId("rendered-item")).toHaveAttribute("role", "article");

    rerender(
      <Feed.Root aria-label="Composed" asChild>
        <section data-testid="child-root">
          <Feed.Item asChild><article data-testid="child-item">Composed article</article></Feed.Item>
        </section>
      </Feed.Root>,
    );
    expect(screen.getByTestId("child-root")).toHaveClass("brick-feed");
    expect(screen.getByTestId("child-item")).toHaveClass("brick-feed__item");
    expect(screen.getByTestId("child-item")).toHaveAttribute("tabindex", "0");
  });
});

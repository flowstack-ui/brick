import { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  SkipLink,
  SkipLinkRoot,
  SkipLinkTarget,
} from "../../../src/skip-link.js";

describe("SkipLink", () => {
  it("adapts the Atom defaults with stable Brick identity", () => {
    render(
      <>
        <SkipLink.Root />
        <SkipLink.Target>Primary content</SkipLink.Target>
      </>,
    );

    const root = screen.getByRole("link", { name: "Skip to main content" });
    const target = screen.getByRole("main");
    expect(root).toHaveAttribute("href", "#main-content");
    expect(root).toHaveAttribute("data-slot", "skip-link");
    expect(root).toHaveClass("brick-skip-link");
    expect(target).toHaveAttribute("id", "main-content");
    expect(target).toHaveAttribute("tabindex", "-1");
    expect(target).toHaveAttribute("data-slot", "skip-link-target");
    expect(target).toHaveClass("brick-skip-link__target");
    expect(SkipLink.Root).toBe(SkipLinkRoot);
    expect(SkipLink.Target).toBe(SkipLinkTarget);
  });

  it("preserves native props, authored slots, classes, styles, events, and refs", () => {
    const rootRef = createRef<HTMLAnchorElement>();
    const targetRef = createRef<HTMLElement>();
    const onClick = vi.fn((event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
    });

    render(
      <>
        <SkipLink.Root
          className="consumer-root"
          data-owner="workspace"
          data-slot="primary-bypass"
          href="#workspace-content"
          onClick={onClick}
          ref={rootRef}
          style={{ color: "red" }}
        >
          Skip workspace tools
        </SkipLink.Root>
        <SkipLink.Target
          className="consumer-target"
          data-slot="workspace-destination"
          id="workspace-content"
          ref={targetRef}
        >
          Workspace content
        </SkipLink.Target>
      </>,
    );

    const root = screen.getByRole("link", { name: "Skip workspace tools" });
    expect(rootRef.current).toBe(root);
    expect(targetRef.current).toBe(screen.getByRole("main"));
    expect(root).toHaveClass("brick-skip-link", "consumer-root");
    expect(root).toHaveAttribute("data-owner", "workspace");
    expect(root).toHaveAttribute("data-slot", "primary-bypass");
    expect(root).toHaveStyle({ color: "rgb(255, 0, 0)" });
    fireEvent.click(root);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("preserves render and asChild composition on both parts", () => {
    const { rerender } = render(
      <>
        <SkipLink.Root render={<a data-adapter="render-root" />}>
          Skip navigation
        </SkipLink.Root>
        <SkipLink.Target render={<section aria-label="Primary content" data-adapter="render-target" />}>
          Content
        </SkipLink.Target>
      </>,
    );

    expect(screen.getByRole("link")).toHaveAttribute("data-adapter", "render-root");
    expect(screen.getByRole("region", { name: "Primary content" })).toHaveClass(
      "brick-skip-link__target",
    );

    rerender(
      <>
        <SkipLink.Root asChild>
          <a data-adapter="child-root" href="#child-content">Skip tools</a>
        </SkipLink.Root>
        <SkipLink.Target asChild id="child-content">
          <section aria-label="Child content" data-adapter="child-target" />
        </SkipLink.Target>
      </>,
    );

    expect(screen.getByRole("link")).toHaveAttribute("data-adapter", "child-root");
    expect(screen.getByRole("region", { name: "Child content" })).toHaveAttribute(
      "data-adapter",
      "child-target",
    );
  });
});


import { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  LinkBox,
  type LinkBoxRootElement,
} from "../../../src/link-box.js";

describe("LinkBox", () => {
  it("renders a neutral Root and one real primary destination", () => {
    render(
      <LinkBox.Root>
        <h2>
          <LinkBox.Link href="/products/stride-run-360">
            Stride Run 360
          </LinkBox.Link>
        </h2>
      </LinkBox.Root>,
    );

    const link = screen.getByRole("link", { name: "Stride Run 360" });
    const root = link.closest(".brick-link-box");
    expect(root?.tagName).toBe("DIV");
    expect(root).toHaveAttribute("data-slot", "link-box");
    expect(root).toHaveAttribute("data-variant", "outline");
    expect(root).not.toHaveAttribute("role");
    expect(root).not.toHaveAttribute("tabindex");
    expect(link).toHaveAttribute("href", "/products/stride-run-360");
    expect(link).toHaveClass("brick-link", "brick-link-box__link");
    expect(link).toHaveAttribute("data-slot", "link-box-link");
    expect(link).toHaveAttribute("data-variant", "plain");
    expect(link).toHaveAttribute("data-tone", "inherit");
  });

  it("exposes the plain boundary variant without changing link semantics", () => {
    render(
      <LinkBox.Root data-testid="root" variant="plain">
        <LinkBox.Link href="/journal">Journal</LinkBox.Link>
      </LinkBox.Root>,
    );
    expect(screen.getByTestId("root")).toHaveAttribute("data-variant", "plain");
    expect(screen.getByRole("link", { name: "Journal" })).toHaveAttribute("href", "/journal");
  });

  it("supports the closed semantic Root host set", () => {
    const elements: LinkBoxRootElement[] = ["div", "article", "section", "li"];
    const { container, rerender } = render(<LinkBox.Root>Item</LinkBox.Root>);

    for (const element of elements) {
      rerender(<LinkBox.Root as={element}>Item</LinkBox.Root>);
      expect(container.firstElementChild?.tagName.toLowerCase()).toBe(element);
    }
  });

  it("forwards refs, native props, classes, styles, events, and slots", () => {
    const rootRef = createRef<HTMLElement>();
    const linkRef = createRef<HTMLAnchorElement>();
    const actionRef = createRef<HTMLDivElement>();
    const onRootClick = vi.fn();
    render(
      <LinkBox.Root
        aria-labelledby="listing-title"
        className="listing-box"
        data-slot="listing"
        onClick={onRootClick}
        ref={rootRef}
        style={{ marginInlineStart: 4 }}
      >
        <h2 id="listing-title">
          <LinkBox.Link
            className="listing-link"
            data-slot="listing-link"
            href="/listings/harbor-townhome"
            ref={linkRef}
          >
            Harbor Townhome
          </LinkBox.Link>
        </h2>
        <LinkBox.Action
          className="listing-action"
          data-slot="listing-action"
          ref={actionRef}
        >
          <button type="button">Save</button>
        </LinkBox.Action>
      </LinkBox.Root>,
    );

    expect(rootRef.current).toHaveClass("brick-link-box", "listing-box");
    expect(rootRef.current).toHaveAttribute("aria-labelledby", "listing-title");
    expect(rootRef.current).toHaveAttribute("data-slot", "listing");
    expect(rootRef.current).toHaveStyle({ marginInlineStart: "4px" });
    expect(linkRef.current).toHaveClass("brick-link-box__link", "listing-link");
    expect(linkRef.current).toHaveAttribute("data-slot", "listing-link");
    expect(actionRef.current).toHaveClass("brick-link-box__action", "listing-action");
    expect(actionRef.current).toHaveAttribute("data-slot", "listing-action");
    fireEvent.click(rootRef.current!);
    expect(onRootClick).toHaveBeenCalledOnce();
  });

  it("keeps a secondary control outside the anchor and independently operable", () => {
    const onSave = vi.fn();
    render(
      <LinkBox.Root as="article">
        <LinkBox.Link href="/homes/harbor-townhome">Harbor Townhome</LinkBox.Link>
        <LinkBox.Action>
          <button onClick={onSave} type="button">Save Harbor Townhome</button>
        </LinkBox.Action>
      </LinkBox.Root>,
    );

    const link = screen.getByRole("link", { name: "Harbor Townhome" });
    const button = screen.getByRole("button", { name: "Save Harbor Townhome" });
    expect(link).not.toContainElement(button);
    expect(button.closest("[data-slot='link-box-action']")).not.toBeNull();
    fireEvent.click(button);
    expect(onSave).toHaveBeenCalledOnce();
  });

  it("preserves explicit Link presentation and router composition", () => {
    render(
      <LinkBox.Root>
        <LinkBox.Link asChild tone="accent" variant="underline">
          <a data-router-link="true" href="/reports">Quarterly report</a>
        </LinkBox.Link>
      </LinkBox.Root>,
    );

    const link = screen.getByRole("link", { name: "Quarterly report" });
    expect(link).toHaveAttribute("data-router-link", "true");
    expect(link).toHaveAttribute("data-tone", "accent");
    expect(link).toHaveAttribute("data-variant", "underline");
  });
});

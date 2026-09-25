import { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  Card,
  type CardRootElement,
  type CardSize,
  type CardTitleElement,
  type CardVariant,
} from "../../../src/card.js";

describe("Card", () => {
  it("serializes sparse responsive recipes and removes stale attributes", () => {
    const view = render(<Card.Root size={{ md: "lg" }} variant={{ lg: "subtle" }}>Status</Card.Root>);
    const root = view.container.firstElementChild;
    expect(root).toHaveAttribute("data-size", "md");
    expect(root).toHaveAttribute("data-size-md", "lg");
    expect(root).toHaveAttribute("data-variant", "outline");
    expect(root).toHaveAttribute("data-variant-lg", "subtle");
    view.rerender(<Card.Root>Default</Card.Root>);
    expect(root).not.toHaveAttribute("data-size-md");
    expect(root).not.toHaveAttribute("data-variant-lg");
  });

  it("composes every public part without leaking region props", () => {
    for (const Part of [Card.Header, Card.Content, Card.Footer, Card.Action]) {
      const childRef = createRef<HTMLDivElement>();
      const ownerRef = createRef<HTMLDivElement>();
      const view = render(<Part asChild gap={{ md: 3 }} ref={ownerRef}><div ref={childRef}>Region</div></Part>);
      expect(childRef.current).toBe(ownerRef.current);
      expect(ownerRef.current).not.toHaveAttribute("asChild");
      expect(ownerRef.current).not.toHaveAttribute("gap");
      expect(ownerRef.current?.style.getPropertyValue("--brick-card-region-gap-md-input")).toBe("calc(var(--brick-space-1) * 3)");
      view.unmount();
      expect(ownerRef.current).toBeNull();
      expect(childRef.current).toBeNull();
    }
    const view = render(<Card.Root><Card.Title asChild><h2>Title</h2></Card.Title><Card.Description asChild><p>Copy</p></Card.Description><Card.Footer justify={{ md: "end" }}>Actions</Card.Footer></Card.Root>);
    expect(view.getByRole("heading", { level: 2 })).toHaveClass("brick-card-title");
    expect(view.getByText("Copy")).toHaveClass("brick-card-description");
    expect(view.getByText("Actions")).toHaveAttribute("data-card-justify-md", "end");
    expect(view.getByText("Actions")).not.toHaveAttribute("justify");
  });

  it("composes a native form with both refs and event handlers", () => {
    const owner = createRef<HTMLElement>();
    const child = createRef<HTMLFormElement>();
    const onOwner = vi.fn();
    const onChild = vi.fn();
    const view = render(<Card.Root asChild ref={owner} overflow="visible" onClick={onOwner}><form aria-label="Profile" ref={child} onClick={onChild}><Card.Content>Profile</Card.Content></form></Card.Root>);
    const form = view.getByRole("form");
    expect(owner.current).toBe(form);
    expect(child.current).toBe(form);
    expect(form).toHaveAttribute("data-overflow", "visible");
    expect(form).not.toHaveAttribute("asChild");
    fireEvent.click(form);
    expect(onOwner).toHaveBeenCalledOnce();
    expect(onChild).toHaveBeenCalledOnce();
    view.unmount();
    expect(owner.current).toBeNull();
    expect(child.current).toBeNull();
  });
  it("paints selection without changing semantics", () => {
    const view = render(<Card.Root as="article" selected>Product</Card.Root>);
    const card = view.getByRole("article");
    expect(card).toHaveAttribute("data-selected", "");
    for (const name of ["selected", "aria-selected", "tabindex", "role"]) expect(card).not.toHaveAttribute(name);
  });
  it("renders the adopted static defaults without invented semantics", () => {
    render(
      <Card.Root>
        <Card.Content>Report content</Card.Content>
      </Card.Root>,
    );

    const root = screen.getByText("Report content").parentElement;
    expect(root?.tagName).toBe("DIV");
    expect(root).toHaveClass("brick-card");
    expect(root).toHaveAttribute("data-slot", "card");
    expect(root).toHaveAttribute("data-variant", "outline");
    expect(root).toHaveAttribute("data-size", "md");
    expect(root).not.toHaveAttribute("data-bordered");
    expect(root).not.toHaveAttribute("role");
    expect(root).not.toHaveAttribute("tabindex");
    expect(root).not.toHaveAttribute("variant");
    expect(root).not.toHaveAttribute("size");
    expect(root).not.toHaveAttribute("bordered");
  });

  it("renders every public part with its stable class and default slot", () => {
    render(
      <Card.Root as="article" aria-labelledby="card-title">
        <Card.Header>
          <Card.Title as="h1" id="card-title">
            Page report
          </Card.Title>
          <Card.Description>Updated now</Card.Description>
          <Card.Action>
            <button>More</button>
          </Card.Action>
        </Card.Header>
        <Card.Content>Details</Card.Content>
        <Card.Footer>Footer</Card.Footer>
      </Card.Root>,
    );

    const article = screen.getByRole("article");
    expect(article).toHaveAttribute("aria-labelledby", "card-title");
    expect(
      screen.getByRole("heading", { level: 1, name: "Page report" }),
    ).toHaveClass("brick-card-title");
    expect(screen.getByText("Updated now")).toHaveAttribute(
      "data-slot",
      "card-description",
    );
    expect(
      screen.getByRole("button", { name: "More" }).parentElement,
    ).toHaveClass("brick-card-action");
    expect(screen.getByText("Details")).toHaveClass("brick-card-content");
    expect(screen.getByText("Footer")).toHaveClass("brick-card-footer");
    expect(article.querySelector("[data-slot='card-header']")).toHaveClass(
      "brick-card-header",
    );
  });

  it("forwards native props, refs, classes, styles, events, and slot overrides", () => {
    const rootRef = createRef<HTMLElement>();
    const contentRef = createRef<HTMLDivElement>();
    const onClick = vi.fn();
    render(
      <Card.Root
        className="consumer-card"
        data-card-id="report"
        data-slot="report-card"
        onClick={onClick}
        ref={rootRef}
        style={{ marginInlineStart: 4 }}
      >
        <Card.Content
          className="consumer-content"
          data-slot="report-body"
          ref={contentRef}
        >
          Content
        </Card.Content>
      </Card.Root>,
    );

    const root = rootRef.current;
    expect(root).toHaveClass("brick-card", "consumer-card");
    expect(root).toHaveAttribute("data-card-id", "report");
    expect(root).toHaveAttribute("data-slot", "report-card");
    expect(root).toHaveStyle({ marginInlineStart: "4px" });
    expect(contentRef.current).toHaveClass(
      "brick-card-content",
      "consumer-content",
    );
    expect(contentRef.current).toHaveAttribute("data-slot", "report-body");
    fireEvent.click(root!);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("reflects every closed variant and size recipe", () => {
    const variants: CardVariant[] = ["outline", "elevated", "subtle"];
    const sizes: CardSize[] = ["sm", "md", "lg"];
    const { container, rerender } = render(<Card.Root>Recipe</Card.Root>);

    for (const variant of variants) {
      rerender(<Card.Root variant={variant}>Recipe</Card.Root>);
      expect(container.firstElementChild).toHaveAttribute(
        "data-variant",
        variant,
      );
    }
    for (const size of sizes) {
      rerender(<Card.Root size={size}>Recipe</Card.Root>);
      expect(container.firstElementChild).toHaveAttribute("data-size", size);
    }
  });

  it("can remove recipe border geometry without changing the selected variant", () => {
    const { container } = render(
      <Card.Root bordered={false} variant="elevated">
        Borderless media card
      </Card.Root>,
    );

    expect(container.firstElementChild).toHaveAttribute(
      "data-bordered",
      "false",
    );
    expect(container.firstElementChild).toHaveAttribute(
      "data-variant",
      "elevated",
    );
    expect(container.firstElementChild).not.toHaveAttribute("bordered");
  });

  it("can explicitly restore recipe border geometry", () => {
    const { container } = render(
      <Card.Root bordered variant="elevated">
        Bordered elevated card
      </Card.Root>,
    );

    expect(container.firstElementChild).toHaveAttribute(
      "data-bordered",
      "true",
    );
    expect(container.firstElementChild).not.toHaveAttribute("bordered");
  });

  it("supports only the approved Root semantic elements", () => {
    const elements: CardRootElement[] = ["div", "article", "section", "li"];
    const { container, rerender } = render(
      <Card.Root>Semantic card</Card.Root>,
    );

    for (const element of elements) {
      rerender(<Card.Root as={element}>Semantic card</Card.Root>);
      expect(container.firstElementChild?.tagName.toLowerCase()).toBe(element);
    }
  });

  it("supports h1 through h6 while defaulting Title to h3", () => {
    const elements: CardTitleElement[] = ["h1", "h2", "h3", "h4", "h5", "h6"];
    const { container, rerender } = render(<Card.Title>Title</Card.Title>);
    expect(container.firstElementChild?.tagName).toBe("H3");

    for (const element of elements) {
      rerender(<Card.Title as={element}>Title</Card.Title>);
      expect(container.firstElementChild?.tagName.toLowerCase()).toBe(element);
    }
  });
});

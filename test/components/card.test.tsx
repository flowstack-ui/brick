import { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  Card,
  type CardRootElement,
  type CardSize,
  type CardTitleElement,
  type CardVariant,
} from "../../src/card.js";

describe("Card", () => {
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
    expect(root).not.toHaveAttribute("role");
    expect(root).not.toHaveAttribute("tabindex");
    expect(root).not.toHaveAttribute("variant");
    expect(root).not.toHaveAttribute("size");
  });

  it("renders every public part with its stable class and default slot", () => {
    render(
      <Card.Root as="article" aria-labelledby="card-title">
        <Card.Header>
          <Card.Title as="h1" id="card-title">Page report</Card.Title>
          <Card.Description>Updated now</Card.Description>
          <Card.Action><button>More</button></Card.Action>
        </Card.Header>
        <Card.Content>Details</Card.Content>
        <Card.Footer>Footer</Card.Footer>
      </Card.Root>,
    );

    const article = screen.getByRole("article");
    expect(article).toHaveAttribute("aria-labelledby", "card-title");
    expect(screen.getByRole("heading", { level: 1, name: "Page report" })).toHaveClass(
      "brick-card-title",
    );
    expect(screen.getByText("Updated now")).toHaveAttribute("data-slot", "card-description");
    expect(screen.getByRole("button", { name: "More" }).parentElement).toHaveClass(
      "brick-card-action",
    );
    expect(screen.getByText("Details")).toHaveClass("brick-card-content");
    expect(screen.getByText("Footer")).toHaveClass("brick-card-footer");
    expect(article.querySelector("[data-slot='card-header']")).toHaveClass("brick-card-header");
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
        <Card.Content className="consumer-content" data-slot="report-body" ref={contentRef}>
          Content
        </Card.Content>
      </Card.Root>,
    );

    const root = rootRef.current;
    expect(root).toHaveClass("brick-card", "consumer-card");
    expect(root).toHaveAttribute("data-card-id", "report");
    expect(root).toHaveAttribute("data-slot", "report-card");
    expect(root).toHaveStyle({ marginInlineStart: "4px" });
    expect(contentRef.current).toHaveClass("brick-card-content", "consumer-content");
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
      expect(container.firstElementChild).toHaveAttribute("data-variant", variant);
    }
    for (const size of sizes) {
      rerender(<Card.Root size={size}>Recipe</Card.Root>);
      expect(container.firstElementChild).toHaveAttribute("data-size", size);
    }
  });

  it("supports only the approved Root semantic elements", () => {
    const elements: CardRootElement[] = ["div", "article", "section", "li"];
    const { container, rerender } = render(<Card.Root>Semantic card</Card.Root>);

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

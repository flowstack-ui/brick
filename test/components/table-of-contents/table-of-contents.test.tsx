import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TableOfContents } from "../../../src/table-of-contents.js";
const items = [
  { id: "intro", depth: 2 },
  { id: "details", depth: 3 },
];
describe("TableOfContents", () => {
  it("serializes sparse responsive recipes on Nav without leaking objects", () => {
    render(<TableOfContents.Root items={items} enabled={false} size={{md: "md"}} variant={{sm: "line", lg: "plain"}}>
      <TableOfContents.Nav aria-label="Responsive contents" />
    </TableOfContents.Root>);
    const nav = screen.getByRole("navigation");
    expect(nav).toHaveAttribute("data-size", "sm");
    expect(nav).toHaveAttribute("data-size-md", "md");
    expect(nav).toHaveAttribute("data-variant", "plain");
    expect(nav).toHaveAttribute("data-variant-sm", "line");
    expect(nav).toHaveAttribute("data-variant-lg", "plain");
    expect(nav).not.toHaveAttribute("size");
  });
  it("defaults to calm plain neutral sm and preserves naming and current semantics", () => {
    render(
      <TableOfContents.Root
        items={items}
        enabled={false}
        defaultActiveId="intro"
      >
        <TableOfContents.Nav>
          <TableOfContents.Title>On this page</TableOfContents.Title>
          <TableOfContents.List>
            <TableOfContents.Item value="intro">
              <TableOfContents.Link>Introduction</TableOfContents.Link>
            </TableOfContents.Item>
          </TableOfContents.List>
          <TableOfContents.Indicator />
        </TableOfContents.Nav>
      </TableOfContents.Root>,
    );
    const nav = screen.getByRole("navigation", { name: "On this page" });
    expect(nav).toHaveAttribute("data-size", "sm");
    expect(nav).toHaveAttribute("data-variant", "plain");
    expect(nav).toHaveAttribute("data-tone", "neutral");
    expect(nav).not.toHaveAttribute("size");
    expect(screen.getByRole("link")).toHaveAttribute(
      "aria-current",
      "location",
    );
    expect(screen.getByRole("link")).toHaveAttribute("href", "#intro");
    expect(nav.querySelector("ul > span")).toBeNull();
  });
  it("forwards ref, native attributes, classes, recipes and delegated anchors", () => {
    const ref = createRef<HTMLAnchorElement>();
    render(
      <TableOfContents.Root
        items={items}
        enabled={false}
        size="md"
        tone="accent"
        variant="line"
      >
        <TableOfContents.Nav aria-label="Outline">
          <TableOfContents.List>
            <TableOfContents.Item value="details">
              <TableOfContents.Link asChild ref={ref} className="custom">
                <a data-example="yes">Details</a>
              </TableOfContents.Link>
            </TableOfContents.Item>
          </TableOfContents.List>
        </TableOfContents.Nav>
      </TableOfContents.Root>,
    );
    expect(screen.getByRole("navigation")).toHaveAttribute(
      "data-variant",
      "line",
    );
    expect(ref.current).toBe(screen.getByRole("link"));
    expect(ref.current).toHaveClass("custom", "brick-table-of-contents__link");
    expect(ref.current).toHaveAttribute("data-example", "yes");
    expect(ref.current?.parentElement).toHaveAttribute("data-level", "1");
  });
});

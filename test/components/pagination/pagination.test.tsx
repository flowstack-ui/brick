import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Pagination } from "../../../src/pagination.js";

function Standard(props: Partial<React.ComponentProps<typeof Pagination.Root>> = {}) {
  return <Pagination.Root aria-label="Search result pages" totalPages={12} {...props}><Pagination.List><Pagination.Previous /><Pagination.Items /><Pagination.Next /></Pagination.List></Pagination.Root>;
}

describe("Pagination", () => {
  it("renders the seven-part generated contract and default recipes", () => {
    render(<Standard defaultPage={6} />);
    const root = screen.getByRole("navigation", { name: "Search result pages" });
    expect(root).toHaveClass("brick-pagination");
    expect(root).toHaveAttribute("data-size", "md");
    expect(root).toHaveAttribute("data-variant", "plain");
    expect(root.querySelector(".brick-pagination__list")).toBeInstanceOf(HTMLOListElement);
    expect(screen.getByRole("button", { name: "Page 6, current page" })).toHaveAttribute("aria-current", "page");
    expect(root.querySelectorAll(".brick-pagination__item").length).toBeGreaterThan(3);
    expect(root.querySelectorAll(".brick-pagination__ellipsis").length).toBeGreaterThan(0);
    expect(screen.getByRole("button", { name: "Previous page" }).querySelector("svg")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Next page" }).querySelector("svg")).toBeTruthy();
  });

  it("preserves state, localization, direct labels, hooks, and refs", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    const rootRef = createRef<HTMLElement>();
    render(<Pagination.Root aria-label="Pages" boundaryVariant="outline" className="custom-root" defaultPage={2} getItemAriaLabel={({ page, isCurrent }) => isCurrent ? `Current ${page}` : `Open ${page}`} nextAriaLabel="Forward" onPageChange={onPageChange} previousAriaLabel="Back" ref={rootRef} size="lg" totalPages={4} variant="outline"><Pagination.List><Pagination.Previous aria-label="Earlier" /><Pagination.Items itemProps={{ className: "custom-item" }} /><Pagination.Next /></Pagination.List></Pagination.Root>);
    expect(rootRef.current).toHaveClass("brick-pagination", "custom-root");
    expect(rootRef.current).toHaveAttribute("data-size", "lg");
    expect(rootRef.current).toHaveAttribute("data-variant", "outline");
    expect(rootRef.current).toHaveAttribute("data-boundary-variant", "outline");
    expect(screen.getByRole("button", { name: "Earlier" })).toBeVisible();
    expect(screen.getByRole("button", { name: "Current 2" })).toHaveClass("custom-item");
    await user.click(screen.getByRole("button", { name: "Forward" }));
    expect(onPageChange).toHaveBeenLastCalledWith(3);
  });

  it("supports explicit composition and omits non-positive totals", () => {
    const { rerender } = render(<Pagination.Root totalPages={2}><Pagination.List><Pagination.Item page={1}>First</Pagination.Item><Pagination.Ellipsis /><Pagination.Item page={2}>Second</Pagination.Item></Pagination.List></Pagination.Root>);
    expect(screen.getByRole("button", { name: "Page 1, current page" })).toHaveClass("brick-pagination__item");
    expect(document.querySelector(".brick-pagination__ellipsis")).toHaveTextContent("…");
    rerender(<Pagination.Root totalPages={0}><Pagination.List><Pagination.Items /></Pagination.List></Pagination.Root>);
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });

  it("renders URL-backed pages as native links with inert boundaries", () => {
    render(
      <Pagination.Root
        aria-label="Incident result pages"
        getPageHref={({ page }) => `/incidents?status=open&page=${page}`}
        page={1}
        totalPages={3}
      >
        <Pagination.List>
          <Pagination.Previous />
          <Pagination.Items />
          <Pagination.Next />
        </Pagination.List>
      </Pagination.Root>,
    );

    const current = screen.getByRole("link", { name: "Page 1, current page" });
    expect(current).toHaveAttribute("href", "/incidents?status=open&page=1");
    expect(current).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Go to page 2" })).toHaveAttribute(
      "href",
      "/incidents?status=open&page=2",
    );
    expect(screen.getByRole("link", { name: "Next page" })).toHaveAttribute(
      "href",
      "/incidents?status=open&page=2",
    );

    const previous = screen.getByRole("link", { name: "Previous page" });
    expect(previous).not.toHaveAttribute("href");
    expect(previous).toHaveAttribute("aria-disabled", "true");
    expect(previous).toHaveAttribute("tabindex", "-1");
  });
});

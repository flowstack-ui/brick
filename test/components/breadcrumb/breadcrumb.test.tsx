import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  Breadcrumb,
  type BreadcrumbSize,
  type BreadcrumbVariant,
} from "../../../src/breadcrumb.js";

function Trail() {
  return (
    <Breadcrumb.Root ariaLabel="Project path">
      <Breadcrumb.List>
        <Breadcrumb.Item><Breadcrumb.Link href="/">Home</Breadcrumb.Link></Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item><Breadcrumb.Link href="/projects">Projects</Breadcrumb.Link></Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item><Breadcrumb.Page>Quarterly report</Breadcrumb.Page></Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb.Root>
  );
}

describe("Breadcrumb", () => {
  it("renders adopted defaults and complete semantic anatomy", () => {
    render(<Trail />);
    const root = screen.getByRole("navigation", { name: "Project path" });
    expect(root).toHaveClass("brick-breadcrumb");
    expect(root).toHaveAttribute("data-size", "md");
    expect(root).toHaveAttribute("data-variant", "plain");
    expect(root.querySelector("ol")).toHaveClass("brick-breadcrumb-list");
    expect(root.querySelectorAll(".brick-breadcrumb-item")).toHaveLength(3);
    expect(screen.getByRole("link", { name: "Home" })).toHaveClass("brick-breadcrumb-link");
    expect(root.querySelector("[aria-current='page']")).toHaveClass("brick-breadcrumb-page");
    for (const separator of root.querySelectorAll(".brick-breadcrumb-separator")) {
      expect(separator).toHaveAttribute("role", "presentation");
      expect(separator).toHaveAttribute("aria-hidden", "true");
      expect(separator).toHaveTextContent("/");
    }
  });

  it("supports every closed size and variant without leaking recipe props", () => {
    const sizes: BreadcrumbSize[] = ["sm", "md", "lg"];
    const variants: BreadcrumbVariant[] = ["plain", "underline"];
    const { rerender } = render(<Breadcrumb.Root><Breadcrumb.List /></Breadcrumb.Root>);
    for (const size of sizes) {
      for (const variant of variants) {
        rerender(<Breadcrumb.Root size={size} variant={variant}><Breadcrumb.List /></Breadcrumb.Root>);
        const root = screen.getByRole("navigation");
        expect(root).toHaveAttribute("data-size", size);
        expect(root).toHaveAttribute("data-variant", variant);
        expect(root).not.toHaveAttribute("size");
        expect(root).not.toHaveAttribute("variant");
      }
    }
  });

  it("forwards native link props, custom separator content, and current-page state", () => {
    render(
      <Breadcrumb.Root>
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/report.csv" download="report.csv" target="_blank" rel="noopener">Report</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator data-testid="separator">→</Breadcrumb.Separator>
          <Breadcrumb.Item><Breadcrumb.Page title="Current location">Exports</Breadcrumb.Page></Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb.Root>,
    );
    expect(screen.getByRole("link", { name: "Report" })).toHaveAttribute("download", "report.csv");
    expect(screen.getByRole("link", { name: "Report" })).toHaveAttribute("target", "_blank");
    expect(screen.getByTestId("separator")).toHaveTextContent("→");
    expect(screen.getByTitle("Current location")).toHaveAttribute("aria-current", "page");
  });

  it("supports static and interactive Ellipsis without inventing behavior", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Breadcrumb.Root>
        <Breadcrumb.List>
          <Breadcrumb.Item><Breadcrumb.Ellipsis aria-label="Collapsed pages" /></Breadcrumb.Item>
          <Breadcrumb.Item>
            <Breadcrumb.Ellipsis asChild>
              <button type="button" aria-label="Show collapsed pages" onClick={onClick}>…</button>
            </Breadcrumb.Ellipsis>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb.Root>,
    );
    expect(screen.getByLabelText("Collapsed pages")).toHaveClass("brick-breadcrumb-ellipsis");
    const trigger = screen.getByRole("button", { name: "Show collapsed pages" });
    expect(trigger).toHaveClass("brick-breadcrumb-ellipsis");
    await user.click(trigger);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("preserves refs, custom slots, class/style, render, and asChild on public parts", () => {
    const rootRef = createRef<HTMLElement>();
    const linkRef = createRef<HTMLAnchorElement>();
    render(
      <>
        <Breadcrumb.Root ref={rootRef} render={<section data-adapter="root" />} data-slot="custom-root" className="consumer-root">
          <Breadcrumb.List render={<ol data-adapter="list" />}>
            <Breadcrumb.Item asChild><li data-adapter="item"><Breadcrumb.Link ref={linkRef} asChild><a href="/router" data-adapter="link">Router</a></Breadcrumb.Link></li></Breadcrumb.Item>
            <Breadcrumb.Separator render={<li data-adapter="separator" />}>›</Breadcrumb.Separator>
            <Breadcrumb.Item><Breadcrumb.Page render={<strong data-adapter="page" />}>Current</Breadcrumb.Page></Breadcrumb.Item>
          </Breadcrumb.List>
        </Breadcrumb.Root>
        <Breadcrumb.Ellipsis render={<i data-adapter="ellipsis" />} />
      </>,
    );
    expect(rootRef.current).toHaveAttribute("data-adapter", "root");
    expect(rootRef.current).toHaveClass("brick-breadcrumb", "consumer-root");
    expect(rootRef.current).toHaveAttribute("data-slot", "custom-root");
    expect(screen.getByRole("link", { name: "Router" })).toBe(linkRef.current);
    expect(screen.getByRole("link", { name: "Router" })).toHaveClass("brick-breadcrumb-link");
    expect(document.querySelector("[data-adapter='page']")).toHaveAttribute("aria-current", "page");
    expect(document.querySelector("[data-adapter='separator']")).toHaveAttribute("aria-hidden", "true");
    expect(document.querySelector("[data-adapter='ellipsis']")).toHaveTextContent("…");
  });
});

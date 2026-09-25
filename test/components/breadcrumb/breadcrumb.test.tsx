import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  Breadcrumb,
  type BreadcrumbSize,
  type BreadcrumbVariant,
} from "../../../src/breadcrumb.js";

import { PathBreadcrumb } from "../../../playground/src/components/breadcrumb/examples/BreadcrumbClosed.js";

function Trail() {
  return (
    <Breadcrumb.Root ariaLabel="Project path">
      <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Link href="/projects">Projects</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Page>Quarterly report</Breadcrumb.Page>
        </Breadcrumb.Item>
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
    expect(screen.getByRole("link", { name: "Home" })).toHaveClass(
      "brick-breadcrumb-link",
    );
    expect(root.querySelector("[aria-current='page']")).toHaveClass(
      "brick-breadcrumb-page",
    );
    for (const separator of root.querySelectorAll(
      ".brick-breadcrumb-separator",
    )) {
      expect(separator).toHaveAttribute("role", "presentation");
      expect(separator).toHaveAttribute("aria-hidden", "true");
      expect(separator.querySelector("svg")).not.toBeNull();
      expect(separator.querySelector(".brick-icon")).toHaveAttribute(
        "data-directional",
        "",
      );
    }
  });

  it("supports every closed size and variant without leaking recipe props", () => {
    const sizes: BreadcrumbSize[] = ["sm", "md", "lg"];
    const variants: BreadcrumbVariant[] = ["plain", "underline", "subtle"];
    const { rerender } = render(
      <Breadcrumb.Root>
        <Breadcrumb.List />
      </Breadcrumb.Root>,
    );
    for (const size of sizes) {
      for (const variant of variants) {
        rerender(
          <Breadcrumb.Root size={size} variant={variant}>
            <Breadcrumb.List />
          </Breadcrumb.Root>,
        );
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
            <Breadcrumb.Link
              href="/report.csv"
              download="report.csv"
              target="_blank"
              rel="noopener"
            >
              Report
            </Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator data-testid="separator">→</Breadcrumb.Separator>
          <Breadcrumb.Item>
            <Breadcrumb.Page title="Current location">Exports</Breadcrumb.Page>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb.Root>,
    );
    expect(screen.getByRole("link", { name: "Report" })).toHaveAttribute(
      "download",
      "report.csv",
    );
    expect(screen.getByRole("link", { name: "Report" })).toHaveAttribute(
      "target",
      "_blank",
    );
    expect(screen.getByTestId("separator")).toHaveTextContent("→");
    expect(screen.getByTitle("Current location")).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("supports static and interactive Ellipsis without inventing behavior", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Breadcrumb.Root>
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Ellipsis aria-label="Collapsed pages" />
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Breadcrumb.Ellipsis asChild>
              <button
                type="button"
                aria-label="Show collapsed pages"
                onClick={onClick}
              >
                …
              </button>
            </Breadcrumb.Ellipsis>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb.Root>,
    );
    expect(screen.getByLabelText("Collapsed pages")).toHaveClass(
      "brick-breadcrumb-ellipsis",
    );
    const trigger = screen.getByRole("button", {
      name: "Show collapsed pages",
    });
    expect(trigger).toHaveClass("brick-breadcrumb-ellipsis");
    await user.click(trigger);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("preserves refs, custom slots, class/style, render, and asChild on public parts", () => {
    const rootRef = createRef<HTMLElement>();
    const linkRef = createRef<HTMLAnchorElement>();
    render(
      <>
        <Breadcrumb.Root
          ref={rootRef}
          render={<section data-adapter="root" />}
          data-slot="custom-root"
          className="consumer-root"
        >
          <Breadcrumb.List render={<ol data-adapter="list" />}>
            <Breadcrumb.Item asChild>
              <li data-adapter="item">
                <Breadcrumb.Link ref={linkRef} asChild>
                  <a href="/router" data-adapter="link">
                    Router
                  </a>
                </Breadcrumb.Link>
              </li>
            </Breadcrumb.Item>
            <Breadcrumb.Separator render={<li data-adapter="separator" />}>
              ›
            </Breadcrumb.Separator>
            <Breadcrumb.Item>
              <Breadcrumb.Page render={<strong data-adapter="page" />}>
                Current
              </Breadcrumb.Page>
            </Breadcrumb.Item>
          </Breadcrumb.List>
        </Breadcrumb.Root>
        <Breadcrumb.Ellipsis render={<i data-adapter="ellipsis" />} />
      </>,
    );
    expect(rootRef.current).toHaveAttribute("data-adapter", "root");
    expect(rootRef.current).toHaveClass("brick-breadcrumb", "consumer-root");
    expect(rootRef.current).toHaveAttribute("data-slot", "custom-root");
    expect(screen.getByRole("link", { name: "Router" })).toBe(linkRef.current);
    expect(screen.getByRole("link", { name: "Router" })).toHaveClass(
      "brick-breadcrumb-link",
    );
    expect(document.querySelector("[data-adapter='page']")).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(
      document.querySelector("[data-adapter='separator']"),
    ).toHaveAttribute("aria-hidden", "true");
    expect(
      document.querySelector("[data-adapter='ellipsis'] svg"),
    ).not.toBeNull();
  });
});

it("preserves native names, responsive recipes, tones, and linked current pages", () => {
  render(
    <Breadcrumb.Root
      aria-label="Native path"
      ariaLabel="Legacy path"
      size={{ initial: "sm", md: "lg" }}
      variant={{ initial: "underline", lg: "plain" }}
      tone="accent"
    >
      <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Page asChild>
            <a href="/current">Current</a>
          </Breadcrumb.Page>
        </Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb.Root>,
  );
  const root = screen.getByRole("navigation", { name: "Native path" });
  expect(root).toHaveAttribute("data-size", "sm");
  expect(root).toHaveAttribute("data-size-md", "lg");
  expect(root).toHaveAttribute("data-variant-lg", "plain");
  expect(root).toHaveAttribute("data-tone", "accent");
  expect(root).not.toHaveAttribute("tone");
  expect(screen.getByRole("link", { name: "Current" })).toHaveAttribute(
    "aria-current",
    "page",
  );
});

it("Trigger is one native non-submitting button with a forwarded ref and native disabled behavior", async () => {
  const ref = createRef<HTMLElement>();
  const onPress = vi.fn();
  const user = userEvent.setup();
  const { rerender } = render(
    <Breadcrumb.Root>
      <Breadcrumb.Trigger ref={ref} onPress={onPress}>
        Ancestors
      </Breadcrumb.Trigger>
    </Breadcrumb.Root>,
  );
  const trigger = screen.getByRole("button", { name: "Ancestors" });
  expect(trigger).toBe(ref.current);
  expect(trigger).toHaveAttribute("type", "button");
  expect(trigger).toHaveClass("brick-breadcrumb-trigger");
  await user.click(trigger);
  expect(onPress).toHaveBeenCalledOnce();
  rerender(
    <Breadcrumb.Root>
      <Breadcrumb.Trigger disabled onPress={onPress}>
        Ancestors
      </Breadcrumb.Trigger>
    </Breadcrumb.Root>,
  );
  await user.click(screen.getByRole("button", { name: "Ancestors" }));
  expect(onPress).toHaveBeenCalledOnce();
});

it("preserves custom null artwork, asChild content and parent-owned destinations", () => {
  render(
    <Breadcrumb.Root>
      <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Link asChild href="/parent">
            <a>Parent</a>
          </Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator data-testid="empty" children={null} />
        <Breadcrumb.Separator asChild>
          <li data-testid="custom">/</li>
        </Breadcrumb.Separator>
        <Breadcrumb.Item>
          <Breadcrumb.Ellipsis asChild>
            <button type="button">Hidden</button>
          </Breadcrumb.Ellipsis>
        </Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb.Root>,
  );
  expect(screen.getByTestId("empty")).toBeEmptyDOMElement();
  expect(screen.getByTestId("custom")).toHaveTextContent("/");
  expect(
    screen.getByRole("button", { name: "Hidden" }).querySelector("svg"),
  ).toBeNull();
  expect(screen.getByRole("link", { name: "Parent" })).toHaveAttribute(
    "href",
    "/parent",
  );
});


it.each([undefined, 0, 8, "1rem", "var(--brick-space-2)"])("normalizes closed recipe gap %s without losing CSS lengths", (gap) => {
  render(<PathBreadcrumb separatorGap={gap} items={[{ id: "home", title: "Home", href: "/" }]} />);
  expect(screen.getByRole("list").style.getPropertyValue("--brick-breadcrumb-list-gap")).toBe(
    typeof gap === "number" ? `${gap}px` : gap ?? "",
  );
});

it("closed recipe handles zero, one and multiple locations without duplicate current content", () => {
  const items = [
    { id: "root", title: "Home", href: "/" },
    { id: "current", title: "Current", href: "/current" },
  ];
  const { container, rerender } = render(<PathBreadcrumb items={[]} />);
  expect(container).toBeEmptyDOMElement();
  rerender(<PathBreadcrumb items={items.slice(0, 1)} />);
  expect(container.querySelectorAll("li")).toHaveLength(1);
  expect(container.querySelectorAll("[aria-current=page]")).toHaveLength(1);
  expect(screen.queryByRole("link")).not.toBeInTheDocument();
  rerender(<PathBreadcrumb items={items} linkCurrent separator="/" />);
  expect(container.querySelectorAll(".brick-breadcrumb-item")).toHaveLength(2);
  expect(container.querySelectorAll(".brick-breadcrumb-separator")).toHaveLength(1);
  expect(screen.getAllByText("Current")).toHaveLength(1);
  expect(screen.getByRole("link", { name: "Current" })).toHaveAttribute("aria-current", "page");
});

import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AppBar, type AppBarVariant } from "../../../src/app-bar.js";

describe("AppBar", () => {
  it("renders the exact Atom anatomy without toolbar widget semantics", () => {
    render(
      <AppBar.Root aria-label="Application" position="sticky">
        <AppBar.Toolbar density="compact">
          <AppBar.Start>Brand</AppBar.Start>
          <AppBar.Center>Workspace</AppBar.Center>
          <AppBar.End>Actions</AppBar.End>
        </AppBar.Toolbar>
      </AppBar.Root>,
    );
    const root = screen.getByRole("banner", { name: "Application" });
    expect(root).toHaveClass("brick-app-bar");
    expect(root).toHaveAttribute("data-position", "sticky");
    expect(root).toHaveAttribute("data-variant", "surface");
    expect(root).toHaveAttribute("data-bordered", "");
    expect(root).not.toHaveAttribute("data-elevated");
    const toolbar = root.querySelector("[data-slot='appbar-toolbar']");
    expect(toolbar).toHaveClass("brick-app-bar-toolbar");
    expect(toolbar).toHaveAttribute("data-density", "compact");
    expect(toolbar).not.toHaveAttribute("role");
    expect(root.querySelector("[data-slot='appbar-start']")).toHaveClass("brick-app-bar-start");
    expect(root.querySelector("[data-slot='appbar-center']")).toHaveClass("brick-app-bar-center");
    expect(root.querySelector("[data-slot='appbar-end']")).toHaveClass("brick-app-bar-end");
  });

  it("forwards native props, composition, refs, and closed visual state", () => {
    const rootRef = createRef<HTMLElement>();
    const toolbarRef = createRef<HTMLDivElement>();
    const variants: AppBarVariant[] = ["solid", "surface", "transparent"];
    const { rerender } = render(
      <AppBar.Root
        aria-label="Secondary"
        blurred
        bordered={false}
        className="consumer-bar"
        elevated
        ref={rootRef}
        style={{ insetBlockStart: 4 }}
        variant="solid"
      >
        <AppBar.Toolbar ref={toolbarRef}>Content</AppBar.Toolbar>
      </AppBar.Root>,
    );
    const root = screen.getByRole("banner", { name: "Secondary" });
    expect(root).toBe(rootRef.current);
    expect(root).toHaveClass("brick-app-bar", "consumer-bar");
    expect(root).toHaveAttribute("data-blurred", "");
    expect(root).not.toHaveAttribute("data-bordered");
    expect(root).toHaveAttribute("data-elevated", "");
    expect(root).toHaveStyle({ insetBlockStart: "4px" });
    expect(root.querySelector("[data-slot='appbar-toolbar']")).toBe(toolbarRef.current);

    for (const variant of variants) {
      rerender(<AppBar.Root aria-label="Secondary" variant={variant}>Content</AppBar.Root>);
      expect(root).toHaveAttribute("data-variant", variant);
    }

    rerender(
      <AppBar.Root aria-label="Composed" asChild>
        <header className="custom-header">Composed bar</header>
      </AppBar.Root>,
    );
    expect(screen.getByRole("banner", { name: "Composed" })).toHaveClass(
      "brick-app-bar",
      "custom-header",
    );
  });
});

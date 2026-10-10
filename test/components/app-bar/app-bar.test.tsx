import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AppBar, type AppBarVariant } from "../../../src/app-bar.js";

describe("AppBar", () => {
  it("adapts sparse visual recipes without leaking objects or spacing props to Atom", () => {
    const start = createRef<HTMLDivElement>();
    const center = createRef<HTMLDivElement>();
    const end = createRef<HTMLDivElement>();
    render(<AppBar.Root aria-label="Responsive" elevated elevation="none" offset={{ md: 3 }}>
      <AppBar.Toolbar density={{ md: "compact" }} inset={{ sm: "none" }} layout={{ lg: "flex" }} gap={{ initial: 2, md: 4 }}>
        <AppBar.Start ref={start} gap={3}>Start</AppBar.Start>
        <AppBar.Center ref={center}>Center</AppBar.Center>
        <AppBar.End ref={end}>End</AppBar.End>
      </AppBar.Toolbar>
    </AppBar.Root>);
    const root = screen.getByRole("banner", { name: "Responsive" });
    const toolbar = root.querySelector(".brick-app-bar-toolbar")!;
    expect(root).not.toHaveAttribute("data-elevated");
    expect(root).toHaveAttribute("data-elevation", "none");
    expect(toolbar).toHaveAttribute("data-density", "comfortable");
    expect(toolbar).toHaveAttribute("data-density-md", "compact");
    expect(toolbar).toHaveAttribute("data-layout", "balanced");
    expect(toolbar).toHaveAttribute("data-layout-lg", "flex");
    expect(toolbar).toHaveAttribute("data-inset", "default");
    expect(toolbar).not.toHaveAttribute("gap");
    expect(start.current).toHaveClass("brick-app-bar-start");
    expect(center.current).toHaveClass("brick-app-bar-center");
    expect(end.current).toHaveClass("brick-app-bar-end");
    expect(start.current!.style.getPropertyValue("--brick-app-bar-section-gap-input")).toContain("* 3");
    expect(root.style.getPropertyValue("--brick-app-bar-offset-md-input")).toContain("* 3");
  });

  it("lets authored inline styles override spacing inputs", () => {
    render(<AppBar.Root aria-label="Override" offset={2} style={{ "--brick-app-bar-offset-input": "9px" } as React.CSSProperties}>
      <AppBar.Toolbar gap={2} style={{ "--brick-app-bar-toolbar-gap-input": "7px" } as React.CSSProperties}>Content</AppBar.Toolbar>
    </AppBar.Root>);
    const root = screen.getByRole("banner", { name: "Override" });
    expect(root.style.getPropertyValue("--brick-app-bar-offset-input")).toBe("9px");
    expect((root.firstElementChild as HTMLElement).style.getPropertyValue("--brick-app-bar-toolbar-gap-input")).toBe("7px");
  });
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
    expect(toolbar).toHaveAttribute("data-inset", "default");
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

    rerender(
      <AppBar.Root aria-label="Inset">
        <AppBar.Toolbar inset="none">Content</AppBar.Toolbar>
      </AppBar.Root>,
    );
    expect(root.querySelector("[data-slot='appbar-toolbar']")).toHaveAttribute(
      "data-inset",
      "none",
    );

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


describe("surface effect compatibility", () => {
  it("preserves legacy blur and lets explicit treatment reset it", () => {
    const view = render(<AppBar.Root data-testid="surface-effect-bar" blurred />);
    const bar = screen.getByTestId("surface-effect-bar");
    expect(bar).toHaveAttribute("data-blurred");
    expect(bar).not.toHaveAttribute("data-surface-effects");
    view.rerender(<AppBar.Root data-testid="surface-effect-bar" blurred treatment="none" />);
    expect(bar).not.toHaveAttribute("data-blurred");
    expect(bar).toHaveAttribute("data-surface-effects", "none");
    view.rerender(<AppBar.Root data-testid="surface-effect-bar" blurred backgroundOpacity={0.6} backdropBlur="18px" />);
    expect(bar).toHaveAttribute("data-surface-effects", "legacy");
    expect(bar.style.getPropertyValue("--brick-surface-effect-opacity")).toBe("60%");
    expect(bar.style.getPropertyValue("--brick-surface-effect-blur")).toBe("18px");
  });
});

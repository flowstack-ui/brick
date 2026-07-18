import { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  Drawer,
  DrawerContent,
  DrawerRoot,
  type DrawerRootProps,
} from "../../src/drawer.js";
import { Button } from "../../src/button.js";

function OpenDrawer({
  onOpenChange,
}: {
  onOpenChange?: NonNullable<DrawerRootProps["onOpenChange"]>;
}) {
  return (
    <Drawer.Root defaultOpen onOpenChange={onOpenChange}>
      <Drawer.Trigger>Open filters</Drawer.Trigger>
      <Drawer.Portal disabled>
        <Drawer.Overlay />
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>Filter projects</Drawer.Title>
            <Drawer.Description>Narrow the visible project list.</Drawer.Description>
          </Drawer.Header>
          <Drawer.Body>Filter controls</Drawer.Body>
          <Drawer.Branch>Owned portal branch</Drawer.Branch>
          <Drawer.Footer>
            <Drawer.Close>Apply filters</Drawer.Close>
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

describe("Drawer", () => {
  it("renders the adopted anatomy and defaults with generated relationships", () => {
    render(<OpenDrawer />);

    const drawer = screen.getByRole("dialog", { name: "Filter projects" });
    expect(drawer).toHaveClass("brick-drawer-content");
    expect(drawer).toHaveAttribute("data-slot", "drawer-content");
    expect(drawer).toHaveAttribute("data-placement", "end");
    expect(drawer).toHaveAttribute("data-size", "md");
    expect(drawer).toHaveAccessibleDescription("Narrow the visible project list.");
    expect(screen.getByRole("heading", { level: 2, name: "Filter projects" })).toHaveClass(
      "brick-drawer-title",
    );
    expect(screen.getByText("Filter controls")).toHaveClass("brick-drawer-body");
    expect(screen.getByText("Owned portal branch")).toHaveClass("brick-drawer-branch");
    expect(screen.getByRole("button", { name: "Apply filters" }).parentElement).toHaveClass(
      "brick-drawer-footer",
    );
    expect(document.querySelector(".brick-drawer-overlay")).toHaveAttribute(
      "data-slot",
      "drawer-overlay",
    );
  });

  it.each([
    ["start", "sm"],
    ["end", "md"],
    ["top", "lg"],
    ["bottom", "full"],
  ] as const)("forwards the %s placement and %s size", (placement, size) => {
    render(
      <Drawer.Root defaultOpen>
        <Drawer.Portal disabled>
          <Drawer.Content aria-label={`${placement} ${size}`} placement={placement} size={size}>
            Content
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>,
    );

    const drawer = screen.getByRole("dialog", { name: `${placement} ${size}` });
    expect(drawer).toHaveAttribute("data-placement", placement);
    expect(drawer).toHaveAttribute("data-size", size);
  });

  it("forwards native props, refs, classes, styles, and slot overrides", () => {
    const ref = createRef<HTMLDivElement>();
    const onClick = vi.fn();
    render(
      <Drawer.Root defaultOpen>
        <Drawer.Portal disabled>
          <Drawer.Content
            aria-label="Settings"
            className="consumer-drawer"
            data-purpose="settings"
            data-slot="settings-drawer"
            onClick={onClick}
            ref={ref}
            style={{ marginTop: 2 }}
          >
            Settings content
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>,
    );

    expect(ref.current).toHaveClass("brick-drawer-content", "consumer-drawer");
    expect(ref.current).toHaveAttribute("data-purpose", "settings");
    expect(ref.current).toHaveAttribute("data-slot", "settings-drawer");
    expect(ref.current).toHaveStyle({ marginTop: "2px" });
    fireEvent.click(ref.current!);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("preserves Atom close reasons and asChild composition", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <Drawer.Root onOpenChange={onOpenChange}>
        <Drawer.Trigger asChild>
          <button className="trigger-child">Open composed</button>
        </Drawer.Trigger>
        <Drawer.Portal disabled>
          <Drawer.Overlay />
          <Drawer.Content aria-label="Composed drawer">
            <Drawer.Close asChild>
              <button className="close-child">Close composed</button>
            </Drawer.Close>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>,
    );

    const trigger = screen.getByRole("button", { name: "Open composed" });
    expect(trigger).toHaveClass("brick-drawer-trigger", "trigger-child");
    await user.click(trigger);
    const close = screen.getByRole("button", { name: "Close composed" });
    expect(close).toHaveClass("brick-drawer-close", "close-child");
    await user.click(close);
    expect(onOpenChange).toHaveBeenLastCalledWith(false, "closeClick");
  });

  it("preserves disabled Root behavior through native and composed triggers", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <>
        <Drawer.Root disabled onOpenChange={onOpenChange}>
          <Drawer.Trigger>Unavailable native drawer</Drawer.Trigger>
        </Drawer.Root>
        <Drawer.Root disabled onOpenChange={onOpenChange}>
          <Drawer.Trigger asChild>
            <Button>Unavailable composed drawer</Button>
          </Drawer.Trigger>
        </Drawer.Root>
      </>,
    );

    const nativeTrigger = screen.getByRole("button", { name: "Unavailable native drawer" });
    const composedTrigger = screen.getByRole("button", {
      name: "Unavailable composed drawer",
    });
    expect(nativeTrigger).toBeDisabled();
    expect(nativeTrigger).toHaveAttribute("data-disabled", "");
    expect(composedTrigger).toBeDisabled();
    expect(composedTrigger).toHaveAttribute("tabindex", "-1");
    await user.click(nativeTrigger);
    await user.click(composedTrigger);
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it("preserves render composition for Trigger, Close, and Branch", async () => {
    const user = userEvent.setup();
    const triggerRef = createRef<HTMLElement>();
    const closeRef = createRef<HTMLElement>();
    const branchRef = createRef<HTMLElement>();
    render(
      <Drawer.Root>
        <Drawer.Trigger ref={triggerRef} render={<a href="#render-drawer" />}>
          Open rendered
        </Drawer.Trigger>
        <Drawer.Portal disabled>
          <Drawer.Content aria-label="Rendered composition">
            <Drawer.Branch ref={branchRef} render={<aside data-purpose="owned-branch" />}>
              Rendered branch
            </Drawer.Branch>
            <Drawer.Close ref={closeRef} render={<a href="#render-close" />}>
              Close rendered
            </Drawer.Close>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>,
    );

    const trigger = screen.getByRole("button", { name: "Open rendered" });
    expect(triggerRef.current).toBe(trigger);
    await user.click(trigger);
    const branch = screen.getByText("Rendered branch");
    expect(branch.tagName).toBe("ASIDE");
    expect(branch).toHaveAttribute("data-slot", "drawer-branch");
    expect(branchRef.current).toBe(branch);
    const close = screen.getByRole("link", { name: "Close rendered" });
    expect(closeRef.current).toBe(close);
    await user.click(close);
    expect(screen.queryByRole("dialog", { name: "Rendered composition" })).toBeNull();
  });

  it("forwards a custom Portal container and Title heading level", () => {
    const container = document.createElement("div");
    document.body.append(container);

    const { unmount } = render(
      <Drawer.Root defaultOpen>
        <Drawer.Portal container={container}>
          <Drawer.Content>
            <Drawer.Title as="h1">Container drawer</Drawer.Title>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>,
    );

    const drawer = screen.getByRole("dialog", { name: "Container drawer" });
    expect(container).toContainElement(drawer);
    expect(screen.getByRole("heading", { level: 1, name: "Container drawer" })).toHaveClass(
      "brick-drawer-title",
    );
    unmount();
    container.remove();
  });

  it("exports namespace parts as the canonical direct components", () => {
    expect(Drawer.Root).toBe(DrawerRoot);
    expect(Drawer.Content).toBe(DrawerContent);
  });
});

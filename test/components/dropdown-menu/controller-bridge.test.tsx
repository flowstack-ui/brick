import { createRef } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { DropdownMenu, useDropdownMenu } from "../../../src/dropdown-menu.js";
import { ContextMenu, useContextMenu } from "../../../src/context-menu.js";
import { Menubar, useMenubar } from "../../../src/menubar.js";

Element.prototype.scrollIntoView = vi.fn();

describe("action menu controller presentation bridges", () => {
  it("preserves DropdownMenu controller state and popup presentation", async () => {
    function Example() {
      const controller = useDropdownMenu();
      return (
        <DropdownMenu.RootProvider
          value={controller}
          size="sm"
          variant="solid"
          tone="accent"
        >
          <DropdownMenu.Trigger>
            Commands
            <DropdownMenu.TriggerIndicator />
          </DropdownMenu.Trigger>
          <DropdownMenu.Context>
            {(state) => <output>{state.open ? "open" : "closed"}</output>}
          </DropdownMenu.Context>
          <DropdownMenu.Portal>
            <DropdownMenu.Content ariaLabel="Commands">
              <DropdownMenu.Item value="save">Save</DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.RootProvider>
      );
    }
    render(<Example />);
    await waitFor(() => {
      for (const popup of document.querySelectorAll(
        "[data-atom-menu-positioner]",
      )) {
        if (popup.querySelector("[data-state='open']"))
          expect((popup as HTMLElement).style.visibility).not.toBe("hidden");
      }
    });
    expect(screen.getByRole("status")).toHaveTextContent("closed");
    expect(
      document.querySelectorAll(".brick-dropdown-menu__trigger-indicator"),
    ).toHaveLength(1);
    await userEvent.click(screen.getByRole("button", { name: "Commands" }));
    expect(screen.getByRole("status")).toHaveTextContent("open");
    const menu = screen.getByRole("menu");
    expect(menu).toHaveAttribute("data-size", "sm");
    expect(menu).toHaveAttribute("data-tone", "accent");
    expect(menu).toHaveAttribute("data-variant", "solid");
    await userEvent.click(screen.getByRole("menuitem", { name: "Save" }));
    expect(screen.getByRole("status")).toHaveTextContent("closed");
  });

  it("retains ContextMenu point provider and popup recipe with an external controller", async () => {
    function Example() {
      const controller = useContextMenu({ defaultOpen: true });
      return (
        <ContextMenu.RootProvider value={controller} size="lg" tone="danger">
          <ContextMenu.Trigger>Target</ContextMenu.Trigger>
          <ContextMenu.Context>
            {(state) => <output>{String(state.open)}</output>}
          </ContextMenu.Context>
          <ContextMenu.Content ariaLabel="Target actions">
            <ContextMenu.Item value="inspect">Inspect</ContextMenu.Item>
          </ContextMenu.Content>
        </ContextMenu.RootProvider>
      );
    }
    render(<Example />);
    await waitFor(() => {
      for (const popup of document.querySelectorAll(
        "[data-atom-menu-positioner]",
      )) {
        if (popup.querySelector("[data-state='open']"))
          expect((popup as HTMLElement).style.visibility).not.toBe("hidden");
      }
    });
    expect(screen.getByRole("status")).toHaveTextContent("true");
    expect(screen.getByRole("menu")).toHaveAttribute("data-size", "lg");
    expect(screen.getByRole("menu")).toHaveAttribute("data-tone", "danger");
  });

  it("retains Menubar shell ref and independent strip/popup recipes with one controller", async () => {
    const ref = createRef<HTMLElement>();
    function Example() {
      const controller = useMenubar({ defaultValue: "file" });
      return (
        <Menubar.RootProvider
          value={controller}
          ref={ref}
          aria-label="Editor"
          size="lg"
          menuSize="sm"
          tone="accent"
          barVariant="surface"
        >
          <Menubar.Context>
            {(state) => <output>{state.value}</output>}
          </Menubar.Context>
          <Menubar.Menu value="file">
            <Menubar.Trigger>
              File
              <Menubar.TriggerIndicator>
                <span>+</span>
              </Menubar.TriggerIndicator>
            </Menubar.Trigger>
            <Menubar.Content>
              <Menubar.Item value="new">New</Menubar.Item>
            </Menubar.Content>
          </Menubar.Menu>
        </Menubar.RootProvider>
      );
    }
    render(<Example />);
    await waitFor(() => {
      for (const popup of document.querySelectorAll(
        "[data-atom-menu-positioner]",
      )) {
        if (popup.querySelector("[data-state='open']"))
          expect((popup as HTMLElement).style.visibility).not.toBe("hidden");
      }
    });
    expect(screen.getByRole("menubar")).toBe(ref.current);
    expect(screen.getByRole("menubar")).toHaveAttribute("data-size", "lg");
    expect(screen.getByRole("menubar")).toHaveAttribute(
      "data-variant",
      "surface",
    );
    expect(screen.getByRole("menu")).toHaveAttribute("data-size", "sm");
    expect(screen.getByRole("status")).toHaveTextContent("file");
    expect(
      document.querySelector(".brick-menubar__trigger-indicator"),
    ).toHaveTextContent("+");
    expect(
      document.querySelector(".brick-menubar__trigger-indicator svg"),
    ).toBeNull();
  });
});

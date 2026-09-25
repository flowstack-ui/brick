import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Menubar } from "../../../src/menubar.js";

Element.prototype.scrollIntoView = vi.fn();

function Example({
  orientation = "horizontal",
  size = "md",
}: {
  orientation?: "horizontal" | "vertical";
  size?: "sm" | "md" | "lg";
}) {
  return (
    <Menubar.Root
      aria-label="Editor commands"
      defaultValue="file"
      orientation={orientation}
      size={size}
    >
      <Menubar.Menu value="file">
        <Menubar.Trigger>File</Menubar.Trigger>
        <Menubar.Portal>
          <Menubar.Content ariaLabel="File commands">
            <Menubar.Item value="new">
              <Menubar.ItemLabel>New file</Menubar.ItemLabel>
              <Menubar.Shortcut>⌘N</Menubar.Shortcut>
            </Menubar.Item>
            <Menubar.CheckboxItem checked value="autosave">
              <Menubar.ItemIndicator />
              <Menubar.ItemLabel>Auto save</Menubar.ItemLabel>
            </Menubar.CheckboxItem>
            <Menubar.Item tone="danger" value="close">
              <Menubar.ItemLabel>Close project</Menubar.ItemLabel>
            </Menubar.Item>
          </Menubar.Content>
        </Menubar.Portal>
      </Menubar.Menu>
      <Menubar.Menu value="edit">
        <Menubar.Trigger>Edit</Menubar.Trigger>
        <Menubar.Content>
          <Menubar.Item value="undo">Undo</Menubar.Item>
        </Menubar.Content>
      </Menubar.Menu>
    </Menubar.Root>
  );
}

describe("Menubar", () => {
  it("renders a persistent command strip and inherited popup density", async () => {
    render(<Example size="lg" />);
    await waitFor(() => {
      for (const popup of document.querySelectorAll(
        "[data-atom-menu-positioner]",
      )) {
        if (popup.querySelector("[data-state='open']"))
          expect((popup as HTMLElement).style.visibility).not.toBe("hidden");
      }
    });
    const root = screen.getByRole("menubar", { name: "Editor commands" });
    expect(root).toHaveClass("brick-menubar");
    expect(root).toHaveAttribute("data-size", "lg");
    expect(screen.getByRole("menu", { name: "File commands" })).toHaveAttribute(
      "data-size",
      "lg",
    );
    expect(
      screen.getByRole("menuitem", { name: /Close project/ }),
    ).toHaveAttribute("data-tone", "danger");
  });

  it("preserves vertical orientation and roving trigger focus", async () => {
    const user = userEvent.setup();
    render(
      <Menubar.Root aria-label="Editor commands" orientation="vertical">
        <Menubar.Menu value="file">
          <Menubar.Trigger>File</Menubar.Trigger>
          <Menubar.Content>
            <Menubar.Item value="new">New</Menubar.Item>
          </Menubar.Content>
        </Menubar.Menu>
        <Menubar.Menu value="edit">
          <Menubar.Trigger>Edit</Menubar.Trigger>
          <Menubar.Content>
            <Menubar.Item value="undo">Undo</Menubar.Item>
          </Menubar.Content>
        </Menubar.Menu>
      </Menubar.Root>,
    );
    await waitFor(() => {
      for (const popup of document.querySelectorAll(
        "[data-atom-menu-positioner]",
      )) {
        if (popup.querySelector("[data-state='open']"))
          expect((popup as HTMLElement).style.visibility).not.toBe("hidden");
      }
    });
    const root = screen.getByRole("menubar");
    expect(root).toHaveAttribute("aria-orientation", "vertical");
    const file = screen.getByRole("menuitem", { name: "File" });
    file.focus();
    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("menuitem", { name: "Edit" })).toHaveFocus();
  });
});

describe("Menubar visual recipes", () => {
  it("separates rail and trigger settings from popup size and palette", async () => {
    render(
      <Menubar.Root
        aria-label="Independent recipes"
        defaultValue="file"
        size="lg"
        menuSize="sm"
        tone="danger"
        barVariant="surface"
        triggerVariant="plain"
      >
        <Menubar.Menu value="file">
          <Menubar.Trigger>File</Menubar.Trigger>
          <Menubar.Portal>
            <Menubar.Content ariaLabel="Independent popup">
              <Menubar.Item value="new">New</Menubar.Item>
            </Menubar.Content>
          </Menubar.Portal>
        </Menubar.Menu>
      </Menubar.Root>,
    );
    await waitFor(() => {
      for (const popup of document.querySelectorAll(
        "[data-atom-menu-positioner]",
      )) {
        if (popup.querySelector("[data-state='open']"))
          expect((popup as HTMLElement).style.visibility).not.toBe("hidden");
      }
    });
    expect(screen.getByRole("menubar")).toHaveAttribute(
      "data-variant",
      "surface",
    );
    const trigger = screen.getByRole("menuitem", { name: "File" });
    expect(trigger).toHaveAttribute("data-size", "lg");
    expect(trigger).toHaveAttribute("data-variant", "plain");
    expect(trigger).not.toHaveAttribute("data-tone");
    expect(screen.getByRole("menu")).toHaveAttribute("data-size", "sm");
    expect(screen.getByRole("menu")).toHaveAttribute("data-tone", "danger");
  });
  it("inherits popup recipes while explicit row tone and inline inset win", async () => {
    render(
      <Menubar.Root
        aria-label="Recipe menus"
        defaultValue="test"
        size="lg"
        variant="solid"
        tone="accent"
      >
        <Menubar.Menu value="test">
          <Menubar.Trigger>Recipe trigger</Menubar.Trigger>
          <Menubar.Portal>
            <Menubar.Content
              size="sm"
              variant="plain"
              inset="none"
              itemInset="none"
              leadingSpace="reserve"
              ariaLabel="Recipe popup"
            >
              <Menubar.Item value="inherited">Inherited</Menubar.Item>
              <Menubar.Item
                value="neutral"
                tone="neutral"
                itemInset="default"
                layout="stack"
              >
                Neutral
              </Menubar.Item>
            </Menubar.Content>
          </Menubar.Portal>
        </Menubar.Menu>
      </Menubar.Root>,
    );
    await waitFor(() => {
      for (const popup of document.querySelectorAll(
        "[data-atom-menu-positioner]",
      )) {
        if (popup.querySelector("[data-state='open']"))
          expect((popup as HTMLElement).style.visibility).not.toBe("hidden");
      }
    });
    const popup = screen.getByRole("menu", { name: "Recipe popup" });
    expect(popup).toHaveAttribute("data-size", "sm");
    expect(popup).toHaveAttribute("data-variant", "plain");
    expect(popup).toHaveAttribute("data-inset", "none");
    const inherited = screen.getByRole("menuitem", { name: "Inherited" });
    expect(inherited).toHaveAttribute("data-tone", "accent");
    expect(inherited).toHaveAttribute("data-item-inset", "none");
    expect(inherited).toHaveAttribute("data-leading-space", "reserve");
    expect(inherited).not.toHaveAttribute("itemInset");
    expect(inherited).not.toHaveAttribute("layout");
    const reset = screen.getByRole("menuitem", { name: "Neutral" });
    expect(reset).toHaveAttribute("data-tone", "neutral");
    expect(reset).toHaveAttribute("data-item-inset", "default");
    expect(reset).toHaveAttribute("data-layout", "stack");
  });
  it("replaces and suppresses submenu artwork without duplicating the default", async () => {
    render(
      <Menubar.Root aria-label="Recipe menus" defaultValue="test">
        <Menubar.Menu value="test">
          <Menubar.Trigger>Recipe trigger</Menubar.Trigger>
          <Menubar.Content ariaLabel="Artwork popup">
            <Menubar.Sub>
              <Menubar.SubTrigger value="default">
                Default arrow
              </Menubar.SubTrigger>
              <Menubar.SubContent>
                <Menubar.Item value="one">One</Menubar.Item>
              </Menubar.SubContent>
            </Menubar.Sub>
            <Menubar.Sub>
              <Menubar.SubTrigger
                value="custom"
                indicator={<span>Custom arrow</span>}
                asChild
              >
                <button>Custom trigger</button>
              </Menubar.SubTrigger>
              <Menubar.SubContent>
                <Menubar.Item value="two">Two</Menubar.Item>
              </Menubar.SubContent>
            </Menubar.Sub>
            <Menubar.Sub>
              <Menubar.SubTrigger value="none" indicator={null}>
                No arrow
              </Menubar.SubTrigger>
              <Menubar.SubContent>
                <Menubar.Item value="three">Three</Menubar.Item>
              </Menubar.SubContent>
            </Menubar.Sub>
          </Menubar.Content>
        </Menubar.Menu>
      </Menubar.Root>,
    );
    await waitFor(() => {
      for (const popup of document.querySelectorAll(
        "[data-atom-menu-positioner]",
      )) {
        if (popup.querySelector("[data-state='open']"))
          expect((popup as HTMLElement).style.visibility).not.toBe("hidden");
      }
    });
    expect(
      screen
        .getByRole("menuitem", { name: "Default arrow" })
        .querySelectorAll(".brick-action-menu__chevron"),
    ).toHaveLength(1);
    expect(
      screen
        .getByRole("menuitem", { name: "Custom trigger" })
        .querySelectorAll(".brick-action-menu__chevron"),
    ).toHaveLength(0);
    expect(
      screen.getByRole("menuitem", { name: "Custom trigger" }),
    ).toHaveTextContent("Custom arrow");
    expect(
      screen
        .getByRole("menuitem", { name: "No arrow" })
        .querySelector(".brick-action-menu__submenu-indicator"),
    ).toBeNull();
  });
});

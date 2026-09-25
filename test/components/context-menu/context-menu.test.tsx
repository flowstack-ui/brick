import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ContextMenu } from "../../../src/context-menu.js";

Element.prototype.scrollIntoView = vi.fn();

function Example() {
  return (
    <ContextMenu.Root size="lg">
      <ContextMenu.Trigger asChild>
        <article aria-label="Quarterly report">Quarterly report</article>
      </ContextMenu.Trigger>
      <ContextMenu.Portal>
        <ContextMenu.Content ariaLabel="Report actions">
          <ContextMenu.Item value="open">
            <ContextMenu.ItemLabel>Open report</ContextMenu.ItemLabel>
            <ContextMenu.Shortcut>Enter</ContextMenu.Shortcut>
          </ContextMenu.Item>
          <ContextMenu.CheckboxItem checked="indeterminate" value="shared">
            <ContextMenu.ItemIndicator />
            <ContextMenu.ItemLabel>Shared access</ContextMenu.ItemLabel>
          </ContextMenu.CheckboxItem>
          <ContextMenu.Item tone="danger" value="delete">
            <ContextMenu.ItemLabel>Delete report</ContextMenu.ItemLabel>
          </ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
}

describe("ContextMenu", () => {
  it("keeps the target paintless and opens an independently styled point menu", async () => {
    render(<Example />);
    await waitFor(() => {
      for (const popup of document.querySelectorAll(
        "[data-atom-menu-positioner]",
      )) {
        if (popup.querySelector("[data-state='open']"))
          expect((popup as HTMLElement).style.visibility).not.toBe("hidden");
      }
    });
    const target = screen.getByRole("article", { name: "Quarterly report" });
    expect(target).toHaveClass("brick-context-menu__trigger");
    fireEvent.contextMenu(target, { clientX: 40, clientY: 50 });
    expect(
      await screen.findByRole("menu", { name: "Report actions" }),
    ).toHaveClass("brick-context-menu__content");
    expect(screen.getByRole("menu")).toHaveAttribute("data-size", "lg");
    expect(
      document.querySelector(".brick-context-menu__item-indicator"),
    ).toHaveAttribute("data-state", "indeterminate");
  });

  it("preserves selection and danger tone", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(
      <ContextMenu.Root>
        <ContextMenu.Trigger>Target</ContextMenu.Trigger>
        <ContextMenu.Content>
          <ContextMenu.Item onSelect={onSelect} tone="danger" value="remove">
            <ContextMenu.ItemLabel>Remove</ContextMenu.ItemLabel>
          </ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Root>,
    );
    await waitFor(() => {
      for (const popup of document.querySelectorAll(
        "[data-atom-menu-positioner]",
      )) {
        if (popup.querySelector("[data-state='open']"))
          expect((popup as HTMLElement).style.visibility).not.toBe("hidden");
      }
    });
    fireEvent.contextMenu(screen.getByText("Target"));
    const item = await screen.findByRole("menuitem", { name: "Remove" });
    expect(item).toHaveAttribute("data-tone", "danger");
    await user.click(item);
    expect(onSelect).toHaveBeenCalledOnce();
  });
});

describe("ContextMenu visual recipes", () => {
  it("inherits popup recipes while explicit row tone and inline inset win", async () => {
    render(
      <ContextMenu.Root defaultOpen size="lg" variant="solid" tone="accent">
        <ContextMenu.Trigger>Recipe trigger</ContextMenu.Trigger>
        <ContextMenu.Portal>
          <ContextMenu.Content
            size="sm"
            variant="plain"
            inset="none"
            itemInset="none"
            leadingSpace="reserve"
            ariaLabel="Recipe popup"
          >
            <ContextMenu.Item value="inherited">Inherited</ContextMenu.Item>
            <ContextMenu.Item
              value="neutral"
              tone="neutral"
              itemInset="default"
              layout="stack"
            >
              Neutral
            </ContextMenu.Item>
          </ContextMenu.Content>
        </ContextMenu.Portal>
      </ContextMenu.Root>,
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
      <ContextMenu.Root defaultOpen>
        <ContextMenu.Trigger>Recipe trigger</ContextMenu.Trigger>
        <ContextMenu.Content ariaLabel="Artwork popup">
          <ContextMenu.Sub>
            <ContextMenu.SubTrigger value="default">
              Default arrow
            </ContextMenu.SubTrigger>
            <ContextMenu.SubContent>
              <ContextMenu.Item value="one">One</ContextMenu.Item>
            </ContextMenu.SubContent>
          </ContextMenu.Sub>
          <ContextMenu.Sub>
            <ContextMenu.SubTrigger
              value="custom"
              indicator={<span>Custom arrow</span>}
              asChild
            >
              <button>Custom trigger</button>
            </ContextMenu.SubTrigger>
            <ContextMenu.SubContent>
              <ContextMenu.Item value="two">Two</ContextMenu.Item>
            </ContextMenu.SubContent>
          </ContextMenu.Sub>
          <ContextMenu.Sub>
            <ContextMenu.SubTrigger value="none" indicator={null}>
              No arrow
            </ContextMenu.SubTrigger>
            <ContextMenu.SubContent>
              <ContextMenu.Item value="three">Three</ContextMenu.Item>
            </ContextMenu.SubContent>
          </ContextMenu.Sub>
        </ContextMenu.Content>
      </ContextMenu.Root>,
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

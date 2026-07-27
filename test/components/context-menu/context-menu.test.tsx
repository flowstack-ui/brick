import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ContextMenu } from "../../../src/context-menu.js";

Element.prototype.scrollIntoView = vi.fn();

function Example() {
  return <ContextMenu.Root size="lg"><ContextMenu.Trigger asChild><article aria-label="Quarterly report">Quarterly report</article></ContextMenu.Trigger><ContextMenu.Portal><ContextMenu.Content ariaLabel="Report actions"><ContextMenu.Item value="open"><ContextMenu.ItemLabel>Open report</ContextMenu.ItemLabel><ContextMenu.Shortcut>Enter</ContextMenu.Shortcut></ContextMenu.Item><ContextMenu.CheckboxItem checked="indeterminate" value="shared"><ContextMenu.ItemIndicator /><ContextMenu.ItemLabel>Shared access</ContextMenu.ItemLabel></ContextMenu.CheckboxItem><ContextMenu.Item tone="danger" value="delete"><ContextMenu.ItemLabel>Delete report</ContextMenu.ItemLabel></ContextMenu.Item></ContextMenu.Content></ContextMenu.Portal></ContextMenu.Root>;
}

describe("ContextMenu", () => {
  it("keeps the target paintless and opens an independently styled point menu", () => {
    render(<Example />);
    const target = screen.getByRole("article", { name: "Quarterly report" });
    expect(target).toHaveClass("brick-context-menu__trigger");
    fireEvent.contextMenu(target, { clientX: 40, clientY: 50 });
    expect(screen.getByRole("menu", { name: "Report actions" })).toHaveClass("brick-context-menu__content");
    expect(screen.getByRole("menu")).toHaveAttribute("data-size", "lg");
    expect(document.querySelector(".brick-context-menu__item-indicator")).toHaveAttribute("data-state", "indeterminate");
  });

  it("preserves selection and danger tone", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<ContextMenu.Root><ContextMenu.Trigger>Target</ContextMenu.Trigger><ContextMenu.Content><ContextMenu.Item onSelect={onSelect} tone="danger" value="remove"><ContextMenu.ItemLabel>Remove</ContextMenu.ItemLabel></ContextMenu.Item></ContextMenu.Content></ContextMenu.Root>);
    fireEvent.contextMenu(screen.getByText("Target"));
    const item = screen.getByRole("menuitem", { name: "Remove" });
    expect(item).toHaveAttribute("data-tone", "danger");
    await user.click(item);
    expect(onSelect).toHaveBeenCalledOnce();
  });
});

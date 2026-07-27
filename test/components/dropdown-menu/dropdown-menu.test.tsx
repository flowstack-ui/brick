import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { DropdownMenu } from "../../../src/dropdown-menu.js";

Element.prototype.scrollIntoView = vi.fn();

function Example({ defaultOpen = true, size = "md" }: { defaultOpen?: boolean; size?: "sm" | "md" | "lg" }) {
  return <DropdownMenu.Root defaultOpen={defaultOpen} size={size}><DropdownMenu.Trigger>Project actions</DropdownMenu.Trigger><DropdownMenu.Portal><DropdownMenu.Content ariaLabel="Project actions"><DropdownMenu.Label>Project</DropdownMenu.Label><DropdownMenu.Item value="rename"><DropdownMenu.Leading>R</DropdownMenu.Leading><DropdownMenu.ItemLabel>Rename project</DropdownMenu.ItemLabel><DropdownMenu.Description>Change the visible project name.</DropdownMenu.Description><DropdownMenu.Shortcut>⌘R</DropdownMenu.Shortcut></DropdownMenu.Item><DropdownMenu.CheckboxItem checked value="updates"><DropdownMenu.ItemIndicator /><DropdownMenu.ItemLabel>Email updates</DropdownMenu.ItemLabel></DropdownMenu.CheckboxItem><DropdownMenu.Item disabled value="archive"><DropdownMenu.ItemLabel>Archive project</DropdownMenu.ItemLabel></DropdownMenu.Item><DropdownMenu.Item tone="danger" value="delete"><DropdownMenu.ItemLabel>Delete project</DropdownMenu.ItemLabel></DropdownMenu.Item><DropdownMenu.Separator /></DropdownMenu.Content></DropdownMenu.Portal></DropdownMenu.Root>;
}

describe("DropdownMenu", () => {
  it("renders the adopted defaults and independent anatomy", () => {
    render(<Example />);
    expect(screen.getByRole("button", { name: "Project actions" })).toHaveClass("brick-dropdown-menu__trigger");
    expect(screen.getByRole("menu", { name: "Project actions" })).toHaveClass("brick-dropdown-menu__content");
    expect(screen.getByRole("menu")).toHaveAttribute("data-size", "md");
    expect(screen.getByRole("menuitem", { name: /Delete project/ })).toHaveAttribute("data-tone", "danger");
    expect(document.querySelector(".brick-dropdown-menu__item-indicator")).toHaveAttribute("data-state", "checked");
    expect(document.querySelector(".brick-dropdown-menu__description")).toBeInTheDocument();
  });

  it("propagates density without leaking it to a host", () => {
    const { rerender } = render(<Example size="sm" />);
    expect(screen.getByRole("menu")).toHaveAttribute("data-size", "sm");
    rerender(<Example size="lg" />);
    expect(screen.getByRole("menu")).toHaveAttribute("data-size", "lg");
    expect(screen.getByRole("button", { name: "Project actions" })).not.toHaveAttribute("size");
  });

  it("preserves Atom activation, disabled behavior, composition, and refs", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    const ref = createRef<HTMLElement>();
    render(<DropdownMenu.Root><DropdownMenu.Trigger asChild><button>More</button></DropdownMenu.Trigger><DropdownMenu.Content><DropdownMenu.Item onSelect={onSelect} ref={ref} value="rename" asChild><div data-owner="consumer"><DropdownMenu.ItemLabel>Rename</DropdownMenu.ItemLabel></div></DropdownMenu.Item></DropdownMenu.Content></DropdownMenu.Root>);
    await user.click(screen.getByRole("button", { name: "More" }));
    const item = screen.getByRole("menuitem", { name: "Rename" });
    expect(item).toBe(ref.current);
    expect(item).toHaveClass("brick-dropdown-menu__item");
    expect(item).toHaveAttribute("data-owner", "consumer");
    await user.click(item);
    expect(onSelect).toHaveBeenCalledOnce();
  });
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Menubar } from "../../../src/menubar.js";

Element.prototype.scrollIntoView = vi.fn();

function Example({ orientation = "horizontal", size = "md" }: { orientation?: "horizontal" | "vertical"; size?: "sm" | "md" | "lg" }) {
  return <Menubar.Root aria-label="Editor commands" defaultValue="file" orientation={orientation} size={size}><Menubar.Menu value="file"><Menubar.Trigger>File</Menubar.Trigger><Menubar.Portal><Menubar.Content ariaLabel="File commands"><Menubar.Item value="new"><Menubar.ItemLabel>New file</Menubar.ItemLabel><Menubar.Shortcut>⌘N</Menubar.Shortcut></Menubar.Item><Menubar.CheckboxItem checked value="autosave"><Menubar.ItemIndicator /><Menubar.ItemLabel>Auto save</Menubar.ItemLabel></Menubar.CheckboxItem><Menubar.Item tone="danger" value="close"><Menubar.ItemLabel>Close project</Menubar.ItemLabel></Menubar.Item></Menubar.Content></Menubar.Portal></Menubar.Menu><Menubar.Menu value="edit"><Menubar.Trigger>Edit</Menubar.Trigger><Menubar.Content><Menubar.Item value="undo">Undo</Menubar.Item></Menubar.Content></Menubar.Menu></Menubar.Root>;
}

describe("Menubar", () => {
  it("renders a persistent command strip and inherited popup density", () => {
    render(<Example size="lg" />);
    const root = screen.getByRole("menubar", { name: "Editor commands" });
    expect(root).toHaveClass("brick-menubar");
    expect(root).toHaveAttribute("data-size", "lg");
    expect(screen.getByRole("menu", { name: "File commands" })).toHaveAttribute("data-size", "lg");
    expect(screen.getByRole("menuitem", { name: /Close project/ })).toHaveAttribute("data-tone", "danger");
  });

  it("preserves vertical orientation and roving trigger focus", async () => {
    const user = userEvent.setup();
    render(<Menubar.Root aria-label="Editor commands" orientation="vertical"><Menubar.Menu value="file"><Menubar.Trigger>File</Menubar.Trigger><Menubar.Content><Menubar.Item value="new">New</Menubar.Item></Menubar.Content></Menubar.Menu><Menubar.Menu value="edit"><Menubar.Trigger>Edit</Menubar.Trigger><Menubar.Content><Menubar.Item value="undo">Undo</Menubar.Item></Menubar.Content></Menubar.Menu></Menubar.Root>);
    const root = screen.getByRole("menubar");
    expect(root).toHaveAttribute("aria-orientation", "vertical");
    const file = screen.getByRole("menuitem", { name: "File" });
    file.focus();
    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("menuitem", { name: "Edit" })).toHaveFocus();
  });
});

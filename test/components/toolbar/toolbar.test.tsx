import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Toolbar } from "../../../src/toolbar.js";

describe("Toolbar", () => {
  it("renders the six-part default contract", () => {
    render(<Toolbar.Root ariaLabel="Editor"><Toolbar.Button>Save</Toolbar.Button><Toolbar.Separator /><Toolbar.ToggleGroup ariaLabel="Format" defaultValue="bold"><Toolbar.ToggleItem value="bold">Bold</Toolbar.ToggleItem></Toolbar.ToggleGroup><Toolbar.Link href="/help">Help</Toolbar.Link></Toolbar.Root>);
    const root = screen.getByRole("toolbar", { name: "Editor" });
    expect(root).toHaveClass("brick-toolbar");
    expect(root).toHaveAttribute("data-size", "md");
    expect(root).toHaveAttribute("data-variant", "soft");
    expect(screen.getByRole("button", { name: "Save" })).toHaveClass("brick-toolbar__button");
    expect(screen.getByRole("separator")).toHaveClass("brick-toolbar__separator");
    expect(screen.getByRole("group", { name: "Format" })).toHaveClass("brick-toolbar__toggle-group");
    expect(screen.getByRole("group", { name: "Format" })).toHaveAttribute("data-tone", "accent");
    expect(screen.getByRole("group", { name: "Format" })).toHaveAttribute("data-variant", "soft");
    expect(screen.getByRole("button", { name: "Bold" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("link", { name: "Help" })).toHaveClass("brick-toolbar__link");
  });
  it("applies recipes and preserves refs and consumer hooks", () => {
    const rootRef = createRef<HTMLDivElement>(); const buttonRef = createRef<HTMLButtonElement>();
    render(<Toolbar.Root ariaLabel="Tools" className="custom" orientation="vertical" ref={rootRef} size="lg" variant="outline"><Toolbar.Button className="action" ref={buttonRef}>Run</Toolbar.Button></Toolbar.Root>);
    expect(rootRef.current).toHaveClass("brick-toolbar", "custom");
    expect(rootRef.current).toHaveAttribute("data-orientation", "vertical");
    expect(rootRef.current).toHaveAttribute("data-size", "lg");
    expect(rootRef.current).toHaveAttribute("data-variant", "outline");
    expect(buttonRef.current).toHaveClass("brick-toolbar__button", "action");
  });
  it("applies shared toggle variant and tone at the Toolbar group boundary", () => {
    render(<Toolbar.Root ariaLabel="Views"><Toolbar.ToggleGroup ariaLabel="View" defaultValue="preview" tone="neutral" variant="solid"><Toolbar.ToggleItem value="preview">Preview</Toolbar.ToggleItem><Toolbar.ToggleItem value="code">Code</Toolbar.ToggleItem></Toolbar.ToggleGroup></Toolbar.Root>);
    const group = screen.getByRole("group", { name: "View" });
    expect(group).toHaveAttribute("data-tone", "neutral");
    expect(group).toHaveAttribute("data-variant", "solid");
    expect(screen.getByRole("button", { name: "Preview" })).toHaveAttribute("aria-pressed", "true");
  });
  it("preserves Atom command and toggle behavior", async () => {
    const user = userEvent.setup(); const action = vi.fn(); const toggle = vi.fn();
    render(<Toolbar.Root ariaLabel="Tools"><Toolbar.Button onClick={action}>Run</Toolbar.Button><Toolbar.ToggleGroup ariaLabel="View" onValueChange={toggle} type="single"><Toolbar.ToggleItem value="grid">Grid</Toolbar.ToggleItem></Toolbar.ToggleGroup></Toolbar.Root>);
    await user.click(screen.getByRole("button", { name: "Run" }));
    await user.click(screen.getByRole("button", { name: "Grid" }));
    expect(action).toHaveBeenCalledOnce(); expect(toggle).toHaveBeenLastCalledWith("grid");
  });
});

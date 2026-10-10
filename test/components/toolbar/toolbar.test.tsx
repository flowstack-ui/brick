import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Toolbar } from "../../../src/toolbar.js";
import { IconButton } from "../../../src/icon-button.js";

describe("Toolbar", () => {
  it("preserves individual disabled and loading semantics through the shared Button renderer", async () => {
    const action=vi.fn(); const user=userEvent.setup();
    render(<Toolbar.Root><Toolbar.Button disabled onClick={action}>Unavailable</Toolbar.Button><Toolbar.Button loading onClick={action}>Pending</Toolbar.Button></Toolbar.Root>);
    for(const button of screen.getAllByRole("button")) { expect(button).toBeDisabled(); await user.click(button); }
    expect(action).not.toHaveBeenCalled();
  });
  it("inherits responsive recipes with item overrides and native input refs", () => {
    const input = createRef<HTMLInputElement>();
    render(<Toolbar.Root aria-label="Search" size={{initial:"xs",md:"lg"}}><Toolbar.Group aria-label="History"><Toolbar.Button>Undo</Toolbar.Button><Toolbar.Button size="2xl">Redo</Toolbar.Button></Toolbar.Group><Toolbar.Input ref={input} aria-label="Find" fullWidth={false}/><Toolbar.ToggleGroup aria-label="View" tone="accent"><Toolbar.ToggleItem value="grid" tone="contrast" size="sm">Grid</Toolbar.ToggleItem></Toolbar.ToggleGroup></Toolbar.Root>);
    expect(screen.getByRole("button",{name:"Undo"})).toHaveAttribute("data-size","xs");
    expect(screen.getByRole("button",{name:"Undo"})).toHaveAttribute("data-size-md","lg");
    expect(screen.getByRole("button",{name:"Redo"})).toHaveAttribute("data-size","2xl");
    expect(screen.getByRole("button",{name:"Grid"})).toHaveAttribute("data-tone","contrast");
    expect(input.current).toBe(screen.getByRole("textbox",{name:"Find"}));
    expect(input.current).toHaveAttribute("data-slot","input-control");
  });
  it("composes an IconButton on one host and calls actions once", async () => {
    const user=userEvent.setup(); const action=vi.fn();
    render(<Toolbar.Root><Toolbar.Button asChild><IconButton aria-label="Save" onClick={action} size="sm">S</IconButton></Toolbar.Button></Toolbar.Root>);
    expect(screen.getAllByRole("button")).toHaveLength(1);
    await user.click(screen.getByRole("button")); expect(action).toHaveBeenCalledOnce();
  });
  it("keeps loading and root-disabled actions inert including composed hosts", async () => {
    const user=userEvent.setup(); const action=vi.fn();
    render(<Toolbar.Root disabled><Toolbar.Button focusableWhenDisabled onClick={action}>Discover</Toolbar.Button><Toolbar.Button loading loadingText="Saving" onClick={action}>Save</Toolbar.Button><Toolbar.Button asChild><IconButton aria-label="Delete" onClick={action}>D</IconButton></Toolbar.Button><Toolbar.Input aria-label="Find"/></Toolbar.Root>);
    const discover=screen.getByRole("button",{name:"Discover"});
    expect(discover).toHaveAttribute("aria-disabled","true");
    expect(discover).not.toBeDisabled();
    expect(screen.getByRole("button",{name:"Delete"})).toBeDisabled();
    await user.click(discover); await user.click(screen.getByRole("button",{name:"Delete"}));
    expect(action).not.toHaveBeenCalled(); expect(screen.getByRole("textbox")).toBeDisabled();
  });
  it("renders the shared presentation contract", () => {
    render(<Toolbar.Root ariaLabel="Editor"><Toolbar.Button>Save</Toolbar.Button><Toolbar.Separator /><Toolbar.ToggleGroup ariaLabel="Format" defaultValue="bold"><Toolbar.ToggleItem value="bold">Bold</Toolbar.ToggleItem></Toolbar.ToggleGroup><Toolbar.Link href="/help">Help</Toolbar.Link></Toolbar.Root>);
    const root = screen.getByRole("toolbar", { name: "Editor" });
    expect(root).toHaveClass("brick-toolbar");
    expect(root).toHaveAttribute("data-size", "md");
    expect(root).toHaveAttribute("data-variant", "soft");
    expect(screen.getByRole("button", { name: "Save" })).toHaveClass("brick-button");
    expect(screen.getByRole("separator")).toHaveClass("brick-toolbar__separator");
    expect(screen.getByRole("group", { name: "Format" })).toHaveClass("brick-toolbar__toggle-group");
    expect(screen.getByRole("button", { name: "Bold" })).toHaveAttribute("data-tone", "neutral");
    expect(screen.getByRole("button", { name: "Bold" })).toHaveAttribute("data-variant", "ghost");
    expect(screen.getByRole("button", { name: "Bold" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("link", { name: "Help" })).toHaveClass("brick-button");
  });
  it("applies recipes and preserves refs and consumer hooks", () => {
    const rootRef = createRef<HTMLDivElement>(); const buttonRef = createRef<HTMLButtonElement>();
    render(<Toolbar.Root ariaLabel="Tools" className="custom" orientation="vertical" ref={rootRef} size="lg" variant="outline"><Toolbar.Button className="action" ref={buttonRef}>Run</Toolbar.Button></Toolbar.Root>);
    expect(rootRef.current).toHaveClass("brick-toolbar", "custom");
    expect(rootRef.current).toHaveAttribute("data-orientation", "vertical");
    expect(rootRef.current).toHaveAttribute("data-size", "lg");
    expect(rootRef.current).toHaveAttribute("data-variant", "outline");
    expect(buttonRef.current).toHaveClass("brick-button", "action");
  });
  it("applies shared toggle variant and tone at the Toolbar group boundary", () => {
    render(<Toolbar.Root ariaLabel="Views"><Toolbar.ToggleGroup ariaLabel="View" defaultValue="preview" tone="neutral" variant="solid"><Toolbar.ToggleItem value="preview">Preview</Toolbar.ToggleItem><Toolbar.ToggleItem value="code">Code</Toolbar.ToggleItem></Toolbar.ToggleGroup></Toolbar.Root>);
    const group = screen.getByRole("button", { name: "Preview" });
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

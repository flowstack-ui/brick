import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ActionBar, useActionBar } from "../../../src/action-bar.js";
describe("ActionBar", () => {
  it("renders named detached content and native refs", () => {
    const ref = createRef<HTMLDivElement>();
    render(<ActionBar.Root defaultOpen><ActionBar.Positioner placement="bottom-end" data-testid="positioner"><ActionBar.Content ref={ref} aria-label="Files"><ActionBar.SelectionTrigger>2 selected</ActionBar.SelectionTrigger><ActionBar.Separator /></ActionBar.Content></ActionBar.Positioner></ActionBar.Root>);
    expect(ref.current).toBe(screen.getByRole("dialog", { name:"Files" }));
    expect(ref.current).toHaveClass("brick-action-bar");
    expect(screen.getByTestId("positioner")).toHaveAttribute("data-placement", "bottom-end");
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
    expect(ref.current?.querySelector('[data-slot="popover-viewport"]')).toBeNull();
  });
  it("keeps the default root lazy", () => {
    render(<ActionBar.Root><ActionBar.Content aria-label="Files">Actions</ActionBar.Content></ActionBar.Root>);
    expect(screen.queryByRole("dialog")).toBeNull();
  });
  it("exports a controller and composes the positioner host", () => {
    const ref = createRef<HTMLDivElement>();
    function Demo() {
      const value = useActionBar({ defaultOpen: true, skipAnimationOnMount: true });
      return <ActionBar.RootProvider value={value}><ActionBar.Positioner asChild ref={ref}><section data-testid="host"><ActionBar.Content aria-label="Controller" radius="none">Actions</ActionBar.Content></section></ActionBar.Positioner></ActionBar.RootProvider>;
    }
    render(<Demo />);
    expect(ref.current).toBe(screen.getByTestId("host"));
    expect(ref.current).toHaveClass("brick-action-bar__positioner");
    expect(screen.getByRole("dialog", { name: "Controller" })).toHaveAttribute("data-initial-open");
    expect(screen.getByRole("dialog", { name: "Controller" }).style.getPropertyValue("--brick-action-bar-radius")).toBe("0px");
  });
});

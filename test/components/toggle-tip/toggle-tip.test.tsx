import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { ToggleTip, useToggleTip } from "../../../src/toggle-tip.js";
import { Popover } from "../../../src/popover.js";

describe("ToggleTip", () => {
  it("reuses Popover behavior rather than duplicating an engine", () => {
    expect(Object.isFrozen(ToggleTip)).toBe(true);
    for (const part of ["Trigger", "Portal", "Arrow", "Close", "State", "RootProvider"] as const) expect(ToggleTip[part]).toBe(Popover[part]);
  });
  it.each(["xs", "sm", "md", "lg"] as const)("renders %s size and a named compact body", size => {
    render(<ToggleTip.Root defaultOpen><ToggleTip.Trigger>Help</ToggleTip.Trigger><ToggleTip.Content size={size}><ToggleTip.Body><ToggleTip.Title>Storage</ToggleTip.Title><ToggleTip.Description>Shared storage</ToggleTip.Description></ToggleTip.Body><ToggleTip.Arrow /></ToggleTip.Content></ToggleTip.Root>);
    const panel=screen.getByRole("dialog",{name:"Storage"});
    expect(panel).toHaveAttribute("data-tip-size",size);
    expect(panel).toHaveClass("brick-toggle-tip");
    expect(panel).toHaveAccessibleDescription("Shared storage");
    expect(panel.querySelector(".brick-toggle-tip__body")).toBeTruthy();
    expect(panel.querySelector("[data-slot=popover-arrow]")?.parentElement).toBe(panel);
  });
  it("defaults to xs, forwards refs and native props", () => {
    const ref=createRef<HTMLDivElement>();
    render(<ToggleTip.Root defaultOpen><ToggleTip.Trigger>Help</ToggleTip.Trigger><ToggleTip.Content ref={ref} aria-label="Storage" className="custom" data-example="yes"><ToggleTip.Body>Shared</ToggleTip.Body></ToggleTip.Content></ToggleTip.Root>);
    expect(ref.current).toBe(screen.getByRole("dialog"));
    expect(ref.current).toHaveAttribute("data-tip-size","xs");
    expect(ref.current).toHaveClass("custom");
    expect(ref.current).toHaveAttribute("data-example","yes");
  });
  it("opens and closes through an explicit action", async () => {
    const user=userEvent.setup();
    render(<ToggleTip.Root><ToggleTip.Trigger>Help</ToggleTip.Trigger><ToggleTip.Content aria-label="Storage"><ToggleTip.Body><ToggleTip.Close>Done</ToggleTip.Close></ToggleTip.Body></ToggleTip.Content></ToggleTip.Root>);
    await user.click(screen.getByRole("button",{name:"Help"}));
    expect(await screen.findByRole("dialog")).toBeVisible();
    await user.click(screen.getByRole("button",{name:"Done"}));
    expect(screen.queryByRole("dialog")).toBeNull();
  });
  it("supports the original external controller", () => {
    function Demo(){ const tip=useToggleTip({defaultOpen:true}); return <ToggleTip.RootProvider value={tip}><ToggleTip.Trigger>Help</ToggleTip.Trigger><ToggleTip.Content aria-label="Controller"><ToggleTip.Body>Ready</ToggleTip.Body></ToggleTip.Content></ToggleTip.RootProvider>; }
    render(<Demo/>);
    expect(screen.getByRole("dialog",{name:"Controller"})).toBeTruthy();
  });
});

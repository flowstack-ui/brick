import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { FloatingPanel, useFloatingPanel } from "../../../src/floating-panel.js";

describe("FloatingPanel", () => {
  it("adapts every visual part without adding a DOM wrapper", () => {
    const ref=createRef<HTMLDivElement>();
    render(<FloatingPanel.Root defaultOpen><FloatingPanel.Positioner><FloatingPanel.Content ref={ref}>
      <FloatingPanel.Header><FloatingPanel.DragTrigger><FloatingPanel.Title>Inspector</FloatingPanel.Title></FloatingPanel.DragTrigger><FloatingPanel.Control><FloatingPanel.CloseTrigger>Close</FloatingPanel.CloseTrigger></FloatingPanel.Control></FloatingPanel.Header>
      <FloatingPanel.Body><FloatingPanel.Description>Appearance settings</FloatingPanel.Description></FloatingPanel.Body><FloatingPanel.ResizeTriggers axes={["se","e"]}/>
    </FloatingPanel.Content></FloatingPanel.Positioner></FloatingPanel.Root>);
    expect(ref.current).toBe(screen.getByRole("dialog",{name:"Inspector"}));
    expect(ref.current).toHaveClass("brick-floating-panel-content");
    expect(ref.current?.parentElement).toHaveClass("brick-floating-panel-positioner");
    expect(ref.current?.querySelectorAll(".brick-floating-panel-resize-trigger")).toHaveLength(2);
    expect(screen.getByRole("button",{name:"Close panel"})).toHaveAttribute("type","button");
  });
  it("keeps Root and the Brick hook minimum defaults equivalent", () => {
    function Store() { const value=useFloatingPanel(); return <FloatingPanel.RootProvider value={value}><FloatingPanel.Context>{c=><span>{`${c.size.width}x${c.size.height}`}</span>}</FloatingPanel.Context></FloatingPanel.RootProvider>; }
    render(<Store/>); expect(screen.getByText("320x240")).toBeInTheDocument();
  });
  it("forwards explicit slots, native props, render and refs",()=>{
    const ref=createRef<HTMLDivElement>();
    render(<FloatingPanel.Root defaultOpen><FloatingPanel.Positioner><FloatingPanel.Content aria-label="Tool" ref={ref} data-slot="custom-panel" data-testid="custom" render={<section/>}/></FloatingPanel.Positioner></FloatingPanel.Root>);
    expect(ref.current?.tagName).toBe("SECTION");expect(screen.getByTestId("custom")).toHaveAttribute("data-slot","custom-panel");
  });
});

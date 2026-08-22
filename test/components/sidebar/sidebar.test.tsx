import { createRef, useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Sidebar } from "../../../src/sidebar.js";

describe("Sidebar", () => {
  it("renders complete default anatomy and recipes", () => {
    const ref = createRef<HTMLDivElement>();
    render(<Sidebar.Root ref={ref}><Sidebar.Trigger>Toggle</Sidebar.Trigger><Sidebar.Panel aria-label="Workspace"><Sidebar.Header>Brand</Sidebar.Header><Sidebar.Content>Navigation</Sidebar.Content><Sidebar.Footer>Account</Sidebar.Footer></Sidebar.Panel><Sidebar.Main>Main</Sidebar.Main></Sidebar.Root>);
    expect(ref.current).toHaveAttribute("data-state", "expanded");
    expect(ref.current).toHaveAttribute("data-variant", "docked");
    expect(ref.current).toHaveAttribute("data-size", "md");
    expect(ref.current).toHaveAttribute("data-position", "static");
    expect(ref.current).toHaveAttribute("data-surface", "base");
    expect(screen.getByRole("complementary", { name: "Workspace" })).toContainElement(screen.getByText("Navigation"));
    expect(screen.getByRole("main")).toHaveTextContent("Main");
    expect(screen.getByRole("button", { name: "Toggle" })).toHaveAttribute("aria-expanded", "true");
  });

  it("resolves panel surfaces independently from shell geometry", () => {
    const { rerender } = render(<Sidebar.Root variant="floating"><Sidebar.Panel>Panel</Sidebar.Panel><Sidebar.Main>Main</Sidebar.Main></Sidebar.Root>);
    expect(screen.getByText("Main").closest(".brick-sidebar")).toHaveAttribute("data-surface", "raised");
    rerender(<Sidebar.Root surface="transparent" variant="floating"><Sidebar.Panel>Panel</Sidebar.Panel><Sidebar.Main>Main</Sidebar.Main></Sidebar.Root>);
    expect(screen.getByText("Main").closest(".brick-sidebar")).toHaveAttribute("data-surface", "transparent");
  });

  it("preserves controlled state, exact targets, disabled behavior, and relationships", () => {
    const change = vi.fn();
    function Example() {
      const [state, setState] = useState<"expanded" | "rail" | "offcanvas">("expanded");
      return <Sidebar.Root collapsedState="rail" disabled={state === "rail"} onStateChange={(next) => { change(next); setState(next); }} state={state}><Sidebar.Trigger>Toggle</Sidebar.Trigger><Sidebar.Panel>Panel</Sidebar.Panel><Sidebar.Main>Main</Sidebar.Main></Sidebar.Root>;
    }
    render(<Example />);
    const trigger = screen.getByRole("button");
    const panel = screen.getByRole("complementary");
    expect(trigger).toHaveAttribute("aria-controls", panel.id);
    expect(trigger).toHaveAttribute("data-target-state", "rail");
    fireEvent.click(trigger);
    expect(change).toHaveBeenCalledWith("rail");
    expect(trigger).toBeDisabled();
    expect(panel).not.toHaveAttribute("inert");
  });

  it("makes offcanvas content inert and forwards recipes, side, native props, and slots", () => {
    render(<Sidebar.Root defaultState="offcanvas" position="sticky" side="right" size="lg" variant="floating"><Sidebar.Trigger toState="expanded">Open</Sidebar.Trigger><Sidebar.Panel aria-label="Tools" data-owner="test" data-slot="custom-panel">Panel</Sidebar.Panel><Sidebar.Main>Main</Sidebar.Main></Sidebar.Root>);
    const root = screen.getByText("Main").closest(".brick-sidebar")!;
    const panel = document.querySelector("[data-slot='custom-panel']")!;
    expect(root).toHaveAttribute("data-side", "right");
    expect(root).toHaveAttribute("data-size", "lg");
    expect(root).toHaveAttribute("data-variant", "floating");
    expect(root).toHaveAttribute("data-position", "sticky");
    expect(panel).toHaveAttribute("aria-hidden", "true");
    expect(panel).toHaveAttribute("inert");
    expect(panel).toHaveAttribute("data-owner", "test");
  });

  it("composes Atom and static parts without wrappers and forwards refs", () => {
    const contentRef = createRef<HTMLDivElement>();
    render(<Sidebar.Root asChild><section><Sidebar.Trigger asChild><button>Toggle</button></Sidebar.Trigger><Sidebar.Panel asChild><aside>Panel</aside></Sidebar.Panel><Sidebar.Main asChild><main>Main</main></Sidebar.Main></section></Sidebar.Root>);
    render(<Sidebar.Content asChild ref={contentRef}><section data-custom="">Content</section></Sidebar.Content>);
    expect(screen.getByText("Panel")).toHaveClass("brick-sidebar__panel");
    expect(screen.getByText("Main")).toHaveClass("brick-sidebar__main");
    expect(contentRef.current).toHaveAttribute("data-custom");
    expect(contentRef.current).toHaveClass("brick-sidebar__content");
  });
});

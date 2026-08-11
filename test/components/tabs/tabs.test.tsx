import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Tabs } from "../../../src/tabs.js";

class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}
globalThis.ResizeObserver = ResizeObserverStub;

function Example({ onValueChange = vi.fn() }: { onValueChange?: (value: string) => void }) {
  return <Tabs.Root defaultValue="one" onValueChange={onValueChange}><Tabs.List ariaLabel="Sections"><Tabs.Trigger value="one">One</Tabs.Trigger><Tabs.Trigger value="two">Two</Tabs.Trigger><Tabs.Trigger disabled value="disabled">Disabled</Tabs.Trigger><Tabs.Indicator /></Tabs.List><Tabs.Content value="one">Panel one</Tabs.Content><Tabs.Content value="two">Panel two</Tabs.Content></Tabs.Root>;
}

describe("Tabs", () => {
  it("renders adopted defaults and Atom relationships", () => {
    render(<Example />);
    const root = screen.getByRole("tablist", { name: "Sections" }).parentElement!;
    const list = screen.getByRole("tablist", { name: "Sections" });
    expect(root).toHaveClass("brick-tabs");
    expect(root).toHaveAttribute("data-size", "md");
    expect(root).toHaveAttribute("data-variant", "line");
    expect(list).toHaveAttribute("data-radius", "default");
    expect(screen.getByRole("tab", { name: "One" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel")).toHaveAttribute("aria-labelledby", screen.getByRole("tab", { name: "One" }).id);
  });

  it("supports every recipe without leaking visual props", () => {
    const { rerender } = render(<Tabs.Root><Tabs.List /></Tabs.Root>);
    for (const size of ["sm", "md", "lg"] as const) for (const variant of ["line", "solid", "soft", "enclosed"] as const) {
      rerender(<Tabs.Root fullWidth size={size} variant={variant}><Tabs.List /></Tabs.Root>);
      const root = screen.getByRole("tablist").parentElement!;
      expect(root).toHaveAttribute("data-size", size);
      expect(root).toHaveAttribute("data-variant", variant);
      expect(root).toHaveAttribute("data-full-width", "");
      expect(root).not.toHaveAttribute("size");
      expect(root).not.toHaveAttribute("variant");
    }
  });

  it("preserves automatic and manual keyboard activation", async () => {
    const user = userEvent.setup();
    render(<Example />);
    const one = screen.getByRole("tab", { name: "One" });
    one.focus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Two" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Panel two");
  });

  it("preserves composition, native props, and refs", () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Tabs.Root defaultValue="one" render={<section data-adapter="root" />}><Tabs.List ariaLabel="Composed" asChild><nav><Tabs.Trigger ref={ref} value="one" asChild><button data-adapter="trigger">One</button></Tabs.Trigger></nav></Tabs.List><Tabs.Content value="one" render={<article data-adapter="panel" />}>Panel</Tabs.Content></Tabs.Root>);
    expect(document.querySelector("[data-adapter='root']")).toHaveClass("brick-tabs");
    expect(ref.current).toHaveClass("brick-tabs-trigger");
    expect(document.querySelector("[data-adapter='panel']")).toHaveAttribute("role", "tabpanel");
  });

  it("exposes an optional content inset without leaking it", () => {
    render(<Tabs.Root defaultValue="one"><Tabs.List><Tabs.Trigger value="one">One</Tabs.Trigger></Tabs.List><Tabs.Content data-testid="panel" inset="none" value="one">Panel</Tabs.Content></Tabs.Root>);
    expect(screen.getByTestId("panel")).toHaveAttribute("data-inset", "none");
    expect(screen.getByTestId("panel")).not.toHaveAttribute("inset");
  });

  it("exposes a List-owned zero-radius recipe without leaking it", () => {
    render(<Tabs.Root><Tabs.List data-testid="list" radius="none" triggerRadius="default" /></Tabs.Root>);
    expect(screen.getByTestId("list")).toHaveAttribute("data-radius", "none");
    expect(screen.getByTestId("list")).toHaveAttribute("data-trigger-radius", "default");
    expect(screen.getByTestId("list")).not.toHaveAttribute("radius");
    expect(screen.getByTestId("list")).not.toHaveAttribute("triggerRadius");
  });

  it("serializes responsive visual layout without changing semantic orientation", () => {
    render(<Tabs.Root data-testid="root" layout={{ initial: "stacked", lg: "side" }} orientation="vertical"><Tabs.List columns={{ initial: 2, lg: 1 }} /></Tabs.Root>);
    const root = screen.getByTestId("root");
    const list = screen.getByRole("tablist");
    expect(root).toHaveAttribute("data-layout", "stacked");
    expect(root).toHaveAttribute("data-layout-lg", "side");
    expect(root).toHaveAttribute("data-orientation", "vertical");
    expect(list).toHaveAttribute("data-columns", "2");
    expect(list).toHaveAttribute("data-columns-lg", "1");
    expect(list).not.toHaveAttribute("columns");
  });
});

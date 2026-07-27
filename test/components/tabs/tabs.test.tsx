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
    expect(root).toHaveClass("brick-tabs");
    expect(root).toHaveAttribute("data-size", "md");
    expect(root).toHaveAttribute("data-variant", "line");
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
});

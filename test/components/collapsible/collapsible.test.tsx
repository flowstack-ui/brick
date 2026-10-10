import { createRef, useState } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Collapsible, useCollapsible } from "../../../src/collapsible.js";
import { Button } from "../../../src/button.js";

function Example(props: React.ComponentProps<typeof Collapsible.Root> = {}) {
  return (
    <Collapsible.Root {...props}>
      <Collapsible.Trigger>
        Advanced settings
        <Collapsible.Indicator />
      </Collapsible.Trigger>
      <Collapsible.Content>
        <Collapsible.ContentInner>Panel content</Collapsible.ContentInner>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}

describe("Collapsible", () => {
  it("serializes responsive recipes without leaking objects onto native hosts", () => {
    render(<Example size={{ md: "lg" }} variant={{ initial: "plain", md: "outline" }} />);
    const root=screen.getByRole("button").closest(".brick-collapsible");
    expect(root).toHaveAttribute("data-size", "md");
    expect(root).toHaveAttribute("data-size-md", "lg");
    expect(root).toHaveAttribute("data-variant-md", "outline");
    expect(root).not.toHaveAttribute("size");
    expect(root).not.toHaveAttribute("variant");
  });
  it("preserves composed inner callback-ref cleanup", () => {
    const cleanup = vi.fn();
    const ref = vi.fn(() => cleanup);
    const { unmount } = render(<Collapsible.Root defaultOpen><Collapsible.Trigger>Details</Collapsible.Trigger><Collapsible.Content><Collapsible.ContentInner asChild><section ref={ref}>Retained host</section></Collapsible.ContentInner></Collapsible.Content></Collapsible.Root>);
    expect(ref).toHaveBeenCalled();
    unmount();
    expect(cleanup).toHaveBeenCalled();
  });
  it("delegates a composed Button without introducing a second control", () => {
    const changed = vi.fn();
    render(<Collapsible.Root unstyled onOpenChange={changed}><Collapsible.Trigger unstyled asChild><Button>Composed</Button></Collapsible.Trigger><Collapsible.Content motion="none"><Collapsible.ContentInner inset="none" asChild><section>Details</section></Collapsible.ContentInner></Collapsible.Content></Collapsible.Root>);
    const trigger = screen.getByRole("button", { name: "Composed" });
    expect(trigger).toHaveClass("brick-button", "brick-collapsible-trigger");
    expect(trigger).toHaveAttribute("data-unstyled");
    expect(screen.getAllByRole("button")).toHaveLength(1);
    fireEvent.click(trigger);
    expect(changed).toHaveBeenCalledExactlyOnceWith(true);
    expect(screen.getByRole("region")).toHaveAttribute("data-motion", "none");
    expect(screen.getByText("Details")).toHaveAttribute("data-inset", "none");
    expect(screen.getByText("Details").tagName).toBe("SECTION");
  });

  it("supports provider recipes and context-driven closing", () => {
    function Store() {
      const value = useCollapsible({ defaultOpen: true });
      return <Collapsible.RootProvider value={value} variant="outline" size="sm"><Collapsible.Trigger highlight="none">Store<Collapsible.Indicator placement="inline" /></Collapsible.Trigger><Collapsible.Content><Collapsible.ContentInner><Collapsible.Context>{({ onClose }) => <button onClick={onClose}>Close now</button>}</Collapsible.Context></Collapsible.ContentInner></Collapsible.Content></Collapsible.RootProvider>;
    }
    render(<Store />);
    const trigger = screen.getByRole("button", { name: "Store" });
    expect(trigger).toHaveAttribute("data-highlight", "none");
    expect(trigger.closest(".brick-collapsible")).toHaveAttribute("data-variant", "outline");
    expect(trigger.querySelector(".brick-collapsible-indicator")).toHaveAttribute("data-state", "open");
    fireEvent.click(screen.getByRole("button", { name: "Close now" }));
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("keeps partial content inert and its props off the DOM", () => {
    render(<Example collapsedHeight={40} />);
    const content = screen.getByRole("region", { hidden: true });
    expect(content).toHaveAttribute("inert");
    expect(content).toHaveAttribute("aria-hidden", "true");
    expect(content).not.toHaveAttribute("hidden");
    expect(content).not.toHaveAttribute("collapsedHeight");
  });

  it("diagnoses competing unstyled trigger recipes", () => {
    const warning = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(<Collapsible.Root><Collapsible.Trigger unstyled highlight="none" iconOnly aria-label="Details" /></Collapsible.Root>);
    expect(warning).toHaveBeenCalledWith(expect.stringContaining("ignored"));
    warning.mockRestore();
  });
  it("renders the five-part default contract and Atom relationships", () => {
    render(<Example />);
    const root = screen.getByText("Advanced settings").closest(".brick-collapsible");
    const trigger = screen.getByRole("button", { name: "Advanced settings" });
    expect(root).toHaveAttribute("data-variant", "plain");
    expect(root).toHaveAttribute("data-size", "md");
    expect(root).toHaveAttribute("data-state", "closed");
    expect(root).toHaveAttribute("data-orientation", "vertical");
    expect(trigger).toHaveAttribute("data-orientation", "vertical");
    expect(trigger).toHaveAttribute("type", "button");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger.querySelector(".brick-collapsible-indicator")).toHaveAttribute("aria-hidden", "true");
    expect(trigger.querySelector(".brick-collapsible-indicator path")).toHaveAttribute("d", "m3.5 6 4.5 4.5L12.5 6");
    expect(screen.queryByRole("region")).not.toBeInTheDocument();

    fireEvent.click(trigger);
    const region = screen.getByRole("region");
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(trigger).toHaveAttribute("aria-controls", region.id);
    expect(region).toHaveAttribute("aria-labelledby", trigger.id);
    expect(region.querySelector(".brick-collapsible-content-inner")).toHaveTextContent("Panel content");
  });

  it("forwards horizontal orientation to every Atom-backed motion part", () => {
    render(<Example orientation="horizontal" defaultOpen />);
    const root = screen.getByText("Advanced settings").closest(".brick-collapsible");
    const trigger = screen.getByRole("button", { name: "Advanced settings" });
    const content = screen.getByRole("region");
    expect(root).toHaveAttribute("data-orientation", "horizontal");
    expect(trigger).toHaveAttribute("data-orientation", "horizontal");
    expect(content).toHaveAttribute("data-orientation", "horizontal");
  });

  it("supports every closed variant and size without leaking recipe props", () => {
    const { rerender } = render(<Example />);
    for (const variant of ["plain", "soft", "outline"] as const) {
      for (const size of ["sm", "md", "lg"] as const) {
        rerender(<Example variant={variant} size={size} />);
        const root = screen.getByText("Advanced settings").closest(".brick-collapsible");
        expect(root).toHaveAttribute("data-variant", variant);
        expect(root).toHaveAttribute("data-size", size);
        expect(root).not.toHaveAttribute("variant");
        expect(root).not.toHaveAttribute("size");
      }
    }
  });

  it("supports controlled state and composes consumer events", () => {
    const onOpenChange = vi.fn();
    const onClick = vi.fn();
    function Controlled() {
      const [open, setOpen] = useState(false);
      return (
        <Collapsible.Root open={open} onOpenChange={(next) => { onOpenChange(next); setOpen(next); }}>
          <Collapsible.Trigger onClick={onClick}>Details</Collapsible.Trigger>
          <Collapsible.Content><Collapsible.ContentInner>Result</Collapsible.ContentInner></Collapsible.Content>
        </Collapsible.Root>
      );
    }
    render(<Controlled />);
    fireEvent.click(screen.getByRole("button", { name: "Details" }));
    expect(onClick).toHaveBeenCalledOnce();
    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(screen.getByRole("region")).toHaveTextContent("Result");
  });

  it("keeps disabled disclosures closed", () => {
    const onOpenChange = vi.fn();
    render(<Example disabled onOpenChange={onOpenChange} />);
    const trigger = screen.getByRole("button", { name: "Advanced settings" });
    expect(trigger).toBeDisabled();
    expect(trigger).toHaveAttribute("aria-disabled", "true");
    fireEvent.click(trigger);
    expect(onOpenChange).not.toHaveBeenCalled();
    expect(screen.queryByRole("region")).not.toBeInTheDocument();
  });

  it("keeps closed content mounted when requested", async () => {
    render(
      <Collapsible.Root>
        <Collapsible.Trigger>Details</Collapsible.Trigger>
        <Collapsible.Content keepMounted><Collapsible.ContentInner>Result</Collapsible.ContentInner></Collapsible.Content>
      </Collapsible.Root>,
    );
    await waitFor(() => expect(screen.getByRole("region", { hidden: true })).toHaveAttribute("hidden"));
  });

  it("supports custom indicator artwork while preserving decoration", () => {
    render(
      <Collapsible.Root>
        <Collapsible.Trigger>Details<Collapsible.Indicator data-testid="indicator"><span>+</span></Collapsible.Indicator></Collapsible.Trigger>
      </Collapsible.Root>,
    );
    expect(screen.getByTestId("indicator")).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByTestId("indicator")).toHaveTextContent("+");
    expect(screen.getByTestId("indicator").querySelector("svg")).toBeNull();
  });

  it("supports an icon-only trigger without leaking the recipe prop", () => {
    render(
      <Collapsible.Root size="sm">
        <Collapsible.Trigger aria-label="Open navigation" iconOnly>
          <svg aria-hidden="true" viewBox="0 0 16 16" />
        </Collapsible.Trigger>
      </Collapsible.Root>,
    );
    const trigger = screen.getByRole("button", { name: "Open navigation" });
    expect(trigger).toHaveAttribute("data-icon-only", "");
    expect(trigger).not.toHaveAttribute("iconOnly");
  });

  it("merges classes, styles, slots, native props, and refs on every part", () => {
    const rootRef = createRef<HTMLDivElement>();
    const triggerRef = createRef<HTMLButtonElement>();
    const indicatorRef = createRef<HTMLSpanElement>();
    const contentRef = createRef<HTMLDivElement>();
    const innerRef = createRef<HTMLDivElement>();
    render(
      <Collapsible.Root defaultOpen ref={rootRef} className="root-extra" data-slot="root-custom" title="Root">
        <Collapsible.Trigger ref={triggerRef} className="trigger-extra" data-slot="trigger-custom" style={{ margin: 1 }}>Details<Collapsible.Indicator ref={indicatorRef} className="indicator-extra" data-slot="indicator-custom" /></Collapsible.Trigger>
        <Collapsible.Content ref={contentRef} className="content-extra" data-slot="content-custom">
          <Collapsible.ContentInner ref={innerRef} className="inner-extra" data-slot="inner-custom">Result</Collapsible.ContentInner>
        </Collapsible.Content>
      </Collapsible.Root>,
    );
    expect(rootRef.current).toHaveClass("brick-collapsible", "root-extra");
    expect(rootRef.current).toHaveAttribute("data-slot", "root-custom");
    expect(triggerRef.current).toHaveClass("brick-collapsible-trigger", "trigger-extra");
    expect(triggerRef.current).toHaveAttribute("data-slot", "trigger-custom");
    expect(indicatorRef.current).toHaveClass("brick-collapsible-indicator", "indicator-extra");
    expect(contentRef.current).toHaveClass("brick-collapsible-content", "content-extra");
    expect(innerRef.current).toHaveClass("brick-collapsible-content-inner", "inner-extra");
  });

  it("preserves Atom render and asChild composition", () => {
    render(
      <Collapsible.Root defaultOpen render="section" data-testid="render-root">
        <Collapsible.Trigger asChild><div data-testid="custom-trigger">Details</div></Collapsible.Trigger>
        <Collapsible.Content render="article" data-testid="custom-content"><Collapsible.ContentInner>Result</Collapsible.ContentInner></Collapsible.Content>
      </Collapsible.Root>,
    );
    expect(screen.getByTestId("render-root").tagName).toBe("SECTION");
    expect(screen.getByTestId("custom-trigger")).toHaveAttribute("role", "button");
    expect(screen.getByTestId("custom-content").tagName).toBe("ARTICLE");
  });
});

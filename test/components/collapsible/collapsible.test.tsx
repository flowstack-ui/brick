import { createRef, useState } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Collapsible } from "../../../src/collapsible.js";

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

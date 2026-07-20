import { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  Popover,
  PopoverContent,
  PopoverRoot,
} from "../../src/popover.js";

describe("Popover", () => {
  it("exposes exactly the adopted frozen twelve-part namespace", () => {
    expect(Object.keys(Popover)).toEqual([
      "Root",
      "Anchor",
      "Trigger",
      "Portal",
      "Content",
      "Header",
      "Title",
      "Description",
      "Body",
      "Footer",
      "Close",
      "Arrow",
    ]);
    expect(Object.isFrozen(Popover)).toBe(true);
    expect(Popover.Root).toBe(PopoverRoot);
    expect(Popover.Content).toBe(PopoverContent);
  });

  it("renders generated dialog relationships and the default visual recipe", () => {
    render(
      <Popover.Root defaultOpen>
        <Popover.Trigger>Project settings</Popover.Trigger>
        <Popover.Portal disabled>
          <Popover.Content>
            <Popover.Title>Workspace settings</Popover.Title>
            <Popover.Description>Change compact workspace options.</Popover.Description>
            <Popover.Body>Settings form</Popover.Body>
            <Popover.Footer><Popover.Close>Done</Popover.Close></Popover.Footer>
            <Popover.Arrow />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>,
    );

    const popover = screen.getByRole("dialog", { name: "Workspace settings" });
    expect(popover).toHaveAccessibleDescription("Change compact workspace options.");
    expect(popover).toHaveClass("brick-popover");
    expect(popover).toHaveAttribute("data-slot", "popover");
    expect(popover).toHaveAttribute("data-size", "md");
    expect(screen.getByText("Settings form")).toHaveClass("brick-popover__body");
    expect(screen.getByRole("button", { name: "Done" })).toHaveClass("brick-popover__close");
    expect(document.querySelector("[data-slot='popover-arrow']")).toHaveClass("brick-popover__arrow");
  });

  it("forwards sizes, native hooks, refs, Anchor, and structural composition", () => {
    const anchorRef = createRef<HTMLElement>();
    const contentRef = createRef<HTMLDivElement>();
    const bodyRef = createRef<HTMLElement>();
    const onClick = vi.fn();
    render(
      <Popover.Root defaultOpen>
        <Popover.Anchor asChild ref={anchorRef}><span>Position anchor</span></Popover.Anchor>
        <Popover.Trigger>Open</Popover.Trigger>
        <Popover.Portal disabled>
          <Popover.Content
            aria-label="Quick controls"
            className="consumer-popover"
            data-purpose="settings"
            data-slot="quick-controls"
            onClick={onClick}
            ref={contentRef}
            size="lg"
            style={{ marginTop: 2 }}
          >
            <Popover.Body asChild ref={bodyRef}>
              <section data-purpose="composed-body">Controls</section>
            </Popover.Body>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>,
    );

    expect(anchorRef.current).toHaveClass("brick-popover__anchor");
    expect(contentRef.current).toHaveClass("brick-popover", "consumer-popover");
    expect(contentRef.current).toHaveAttribute("data-purpose", "settings");
    expect(contentRef.current).toHaveAttribute("data-slot", "quick-controls");
    expect(contentRef.current).toHaveAttribute("data-size", "lg");
    expect(contentRef.current).toHaveStyle({ marginTop: "2px" });
    fireEvent.click(contentRef.current!);
    expect(onClick).toHaveBeenCalledOnce();
    expect(bodyRef.current?.tagName).toBe("SECTION");
    expect(bodyRef.current).toHaveClass("brick-popover__body");
    expect(bodyRef.current).toHaveAttribute("data-slot", "popover-body");
  });

  it("preserves click activation, close reasons, and Trigger/Close render composition", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <Popover.Root onOpenChange={onOpenChange}>
        <Popover.Trigger render={<a href="#settings" />}>Open rendered settings</Popover.Trigger>
        <Popover.Portal disabled>
          <Popover.Content aria-label="Rendered settings">
            <Popover.Close render={<a href="#done" />}>Finish rendered settings</Popover.Close>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>,
    );

    const trigger = screen.getByRole("button", { name: "Open rendered settings" });
    expect(trigger).toHaveClass("brick-popover__trigger");
    await user.click(trigger);
    expect(onOpenChange).toHaveBeenLastCalledWith(true, undefined);
    const close = screen.getByRole("link", { name: "Finish rendered settings" });
    expect(close).toHaveClass("brick-popover__close");
    await user.click(close);
    expect(onOpenChange).toHaveBeenLastCalledWith(false, "closeClick");
  });

  it("supports structural render composition and explicit native relationships", () => {
    const headerRef = vi.fn<(element: HTMLElement | null) => void>();
    render(
      <Popover.Root defaultOpen>
        <Popover.Portal disabled>
          <Popover.Content
            aria-describedby="rendered-description"
            aria-labelledby="rendered-title"
          >
            <Popover.Header
              ref={headerRef}
              render={<section className="consumer-header" data-purpose="rendered-header" />}
            >
              <h4 data-slot="popover-title" id="rendered-title">Rendered heading</h4>
              <p data-slot="popover-description" id="rendered-description">Rendered details</p>
            </Popover.Header>
            <Popover.Body asChild>Plain fallback body</Popover.Body>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>,
    );

    expect(screen.getByRole("dialog", { name: "Rendered heading" })).toHaveAccessibleDescription(
      "Rendered details",
    );
    const headerElement = headerRef.mock.calls[headerRef.mock.calls.length - 1]?.[0];
    expect(headerElement?.tagName).toBe("SECTION");
    expect(headerElement).toHaveClass("brick-popover__header", "consumer-header");
    expect(headerElement).toHaveAttribute("data-purpose", "rendered-header");
    expect(screen.getByRole("heading", { level: 4 })).toHaveAttribute("data-slot", "popover-title");
    expect(screen.getByText("Plain fallback body")).toHaveClass("brick-popover__body");
  });

  it("preserves disabled Root behavior", async () => {
    const user = userEvent.setup();
    render(
      <Popover.Root disabled>
        <Popover.Trigger>Unavailable settings</Popover.Trigger>
        <Popover.Portal disabled>
          <Popover.Content aria-label="Unavailable content">Content</Popover.Content>
        </Popover.Portal>
      </Popover.Root>,
    );
    const trigger = screen.getByRole("button", { name: "Unavailable settings" });
    expect(trigger).toBeDisabled();
    await user.click(trigger);
    expect(screen.queryByRole("dialog")).toBeNull();
  });
});

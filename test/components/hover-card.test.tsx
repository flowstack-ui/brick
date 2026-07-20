import { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  HoverCard,
  HoverCardContent,
  HoverCardRoot,
} from "../../src/hover-card.js";

describe("HoverCard", () => {
  it("exposes exactly the approved frozen five-part namespace", () => {
    expect(Object.keys(HoverCard)).toEqual([
      "Root",
      "Trigger",
      "Portal",
      "Content",
      "Arrow",
    ]);
    expect(Object.isFrozen(HoverCard)).toBe(true);
    expect(HoverCard.Root).toBe(HoverCardRoot);
    expect(HoverCard.Content).toBe(HoverCardContent);
  });

  it("preserves a genuine link trigger and generic noninteractive content", () => {
    render(
      <HoverCard.Root defaultOpen>
        <HoverCard.Trigger asChild>
          <a href="/people/ada">Ada Lovelace</a>
        </HoverCard.Trigger>
        <HoverCard.Portal disabled>
          <HoverCard.Content>
            <strong>Ada Lovelace</strong>
            <p>Mathematician and computing author.</p>
          </HoverCard.Content>
        </HoverCard.Portal>
      </HoverCard.Root>,
    );

    const trigger = screen.getByRole("link", { name: "Ada Lovelace" });
    const content = screen.getByText("Mathematician and computing author.").parentElement;
    expect(trigger).toHaveAttribute("href", "/people/ada");
    expect(trigger).toHaveClass("brick-hover-card__trigger");
    expect(trigger).toHaveAttribute("data-slot", "hover-card-trigger");
    expect(content).toHaveClass("brick-hover-card");
    expect(content).toHaveAttribute("data-size", "md");
    expect(content).not.toHaveAttribute("role");
    expect(content).not.toHaveAttribute("aria-label");
    expect(trigger).not.toHaveAttribute("aria-expanded");
    expect(trigger).not.toHaveAttribute("aria-haspopup");
  });

  it("forwards size, custom hooks, native props, refs, and Arrow geometry", () => {
    const contentRef = createRef<HTMLDivElement>();
    const triggerRef = createRef<HTMLElement>();
    const arrowRef = createRef<SVGSVGElement>();
    const onClick = vi.fn();
    render(
      <HoverCard.Root defaultOpen>
        <HoverCard.Trigger ref={triggerRef}>Preview</HoverCard.Trigger>
        <HoverCard.Portal disabled>
          <HoverCard.Content
            className="consumer-preview"
            data-purpose="profile"
            data-slot="profile-preview"
            onClick={onClick}
            ref={contentRef}
            sideOffset={12}
            size="lg"
            style={{ marginTop: 2 }}
          >
            Profile
            <HoverCard.Arrow className="consumer-arrow" height={6} ref={arrowRef} width={12} />
          </HoverCard.Content>
        </HoverCard.Portal>
      </HoverCard.Root>,
    );

    expect(triggerRef.current).toHaveClass("brick-hover-card__trigger");
    expect(contentRef.current).toHaveClass("brick-hover-card", "consumer-preview");
    expect(contentRef.current).toHaveAttribute("data-purpose", "profile");
    expect(contentRef.current).toHaveAttribute("data-slot", "profile-preview");
    expect(contentRef.current).toHaveAttribute("data-size", "lg");
    expect(contentRef.current).toHaveStyle({ marginTop: "2px" });
    fireEvent.click(contentRef.current!);
    expect(onClick).toHaveBeenCalledOnce();
    expect(arrowRef.current).toHaveClass("brick-hover-card__arrow", "consumer-arrow");
    expect(arrowRef.current).toHaveAttribute("data-slot", "hover-card-arrow");
    expect(arrowRef.current).toHaveAttribute("width", "12");
    expect(arrowRef.current).toHaveAttribute("height", "6");
  });

  it("preserves Trigger render composition", () => {
    render(
      <HoverCard.Root defaultOpen>
        <HoverCard.Trigger render={<a href="/documents/engine" data-purpose="rendered-trigger" />}>
          Analytical Engine notes
        </HoverCard.Trigger>
        <HoverCard.Portal disabled>
          <HoverCard.Content>Document preview</HoverCard.Content>
        </HoverCard.Portal>
      </HoverCard.Root>,
    );

    expect(screen.getByRole("link", { name: "Analytical Engine notes" })).toHaveAttribute(
      "data-purpose",
      "rendered-trigger",
    );
  });
});

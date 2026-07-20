import { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  Tooltip,
  TooltipContent,
  TooltipRoot,
} from "../../src/tooltip.js";

describe("Tooltip", () => {
  it("exposes exactly the approved eight-part namespace", () => {
    expect(Object.keys(Tooltip)).toEqual([
      "Provider",
      "Root",
      "Trigger",
      "Portal",
      "Content",
      "Title",
      "Description",
      "Arrow",
    ]);
    expect(Tooltip.Root).toBe(TooltipRoot);
    expect(Tooltip.Content).toBe(TooltipContent);
  });

  it("renders plain Atom semantics with Brick styling and the default offset", () => {
    render(
      <Tooltip.Provider>
        <Tooltip.Root defaultOpen>
          <Tooltip.Trigger asChild>
            <button aria-label="Search workspace">Search</button>
          </Tooltip.Trigger>
          <Tooltip.Portal disabled>
            <Tooltip.Content>Search projects</Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>,
    );

    const trigger = screen.getByRole("button", { name: "Search workspace" });
    const content = screen.getByRole("tooltip");
    expect(trigger).toHaveClass("brick-tooltip__trigger");
    expect(trigger).toHaveAttribute("aria-describedby", content.id);
    expect(content).toHaveClass("brick-tooltip");
    expect(content).toHaveAttribute("data-slot", "tooltip");
    expect(content).toHaveAttribute("data-variant", "plain");
  });

  it("renders rich title, description, Arrow, custom hooks, native props, and refs", () => {
    const contentRef = createRef<HTMLDivElement>();
    const titleRef = createRef<HTMLElement>();
    const onClick = vi.fn();
    render(
      <Tooltip.Root defaultOpen variant="rich">
        <Tooltip.Trigger>More information</Tooltip.Trigger>
        <Tooltip.Portal disabled>
          <Tooltip.Content
            className="consumer-tooltip"
            data-purpose="help"
            data-slot="help-tooltip"
            onClick={onClick}
            ref={contentRef}
            sideOffset={12}
            style={{ marginTop: 2 }}
          >
            <Tooltip.Title data-slot="help-title" ref={titleRef}>
              Workspace search
            </Tooltip.Title>
            <Tooltip.Description>
              Search projects, files, and commands.
            </Tooltip.Description>
            <Tooltip.Arrow height={6} width={12} />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>,
    );

    expect(contentRef.current).toHaveClass("brick-tooltip", "consumer-tooltip");
    expect(contentRef.current).toHaveAttribute("data-purpose", "help");
    expect(contentRef.current).toHaveAttribute("data-slot", "help-tooltip");
    expect(contentRef.current).toHaveAttribute("data-variant", "rich");
    expect(contentRef.current).toHaveStyle({ marginTop: "2px" });
    fireEvent.click(contentRef.current!);
    expect(onClick).toHaveBeenCalledOnce();
    expect(titleRef.current).toHaveClass("brick-tooltip__title");
    expect(titleRef.current).toHaveAttribute("data-slot", "help-title");
    expect(screen.getByText("Search projects, files, and commands.")).toHaveClass(
      "brick-tooltip__description",
    );
    expect(document.querySelector(".brick-tooltip__arrow")).toHaveAttribute(
      "data-slot",
      "tooltip-arrow",
    );
  });

  it("preserves Trigger and text-part composition", () => {
    const titleRef = createRef<HTMLElement>();
    render(
      <Tooltip.Root defaultOpen variant="rich">
        <Tooltip.Trigger render={<button data-purpose="rendered-trigger" />}>
          Rendered trigger
        </Tooltip.Trigger>
        <Tooltip.Portal disabled>
          <Tooltip.Content>
            <Tooltip.Title asChild ref={titleRef}>
              <strong data-purpose="composed-title">Composed title</strong>
            </Tooltip.Title>
            <Tooltip.Description render={<p data-purpose="rendered-description" />}>
              Rendered description
            </Tooltip.Description>
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>,
    );

    expect(screen.getByRole("button", { name: "Rendered trigger" })).toHaveAttribute(
      "data-purpose",
      "rendered-trigger",
    );
    expect(titleRef.current?.tagName).toBe("STRONG");
    expect(titleRef.current).toHaveClass("brick-tooltip__title");
    expect(screen.getByText("Rendered description").tagName).toBe("P");
    expect(screen.getByText("Rendered description")).toHaveClass(
      "brick-tooltip__description",
    );
  });
});

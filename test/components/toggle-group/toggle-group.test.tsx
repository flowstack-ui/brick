import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  ToggleGroup,
  type ToggleGroupRootProps,
} from "../../../src/toggle-group.js";

describe("ToggleGroup", () => {
  it("owns the adopted Root and Item contract", () => {
    render(
      <ToggleGroup.Root ariaLabel="Text formatting" defaultValue={["bold"]} type="multiple">
        <ToggleGroup.Item value="bold">Bold</ToggleGroup.Item>
        <ToggleGroup.Item value="italic">Italic</ToggleGroup.Item>
      </ToggleGroup.Root>,
    );
    const group = screen.getByRole("group", { name: "Text formatting" });
    expect(group).toHaveClass("brick-toggle-group");
    expect(group).toHaveAttribute("data-attached", "false");
    expect(group).toHaveAttribute("data-orientation", "horizontal");
    expect(group).toHaveAttribute("data-variant", "soft");
    expect(group).toHaveAttribute("data-tone", "accent");
    expect(group).toHaveAttribute("data-size", "md");
    expect(group).toHaveAttribute("data-shape", "rounded");
    expect(screen.getByRole("button", { name: "Bold" })).toHaveClass(
      "brick-toggle-group-item",
    );
    expect(screen.getByRole("button", { name: "Bold" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("applies group recipes and item-only icon geometry", () => {
    render(
      <ToggleGroup.Root ariaLabel="View" attached fullWidth orientation="vertical" shape="pill" size="lg" tone="neutral" variant="outline">
        <ToggleGroup.Item ariaLabel="Cards" iconOnly value="cards"><svg /></ToggleGroup.Item>
        <ToggleGroup.Item value="list">List</ToggleGroup.Item>
      </ToggleGroup.Root>,
    );
    const group = screen.getByRole("group", { name: "View" });
    expect(group).toHaveAttribute("data-attached", "true");
    expect(group).toHaveAttribute("data-full-width", "");
    expect(group).toHaveAttribute("data-orientation", "vertical");
    expect(group).toHaveAttribute("data-shape", "pill");
    expect(group).toHaveAttribute("data-size", "lg");
    expect(group).toHaveAttribute("data-variant", "outline");
    expect(group).toHaveAttribute("data-tone", "neutral");
    expect(screen.getByRole("button", { name: "Cards" })).toHaveAttribute(
      "data-icon-only",
      "",
    );
  });

  it("forwards single and multiple callback values", async () => {
    const user = userEvent.setup();
    const single = vi.fn();
    const multiple = vi.fn();
    const { rerender } = render(
      <ToggleGroup.Root ariaLabel="View" onValueChange={single} type="single">
        <ToggleGroup.Item value="cards">Cards</ToggleGroup.Item>
        <ToggleGroup.Item value="list">List</ToggleGroup.Item>
      </ToggleGroup.Root>,
    );
    await user.click(screen.getByRole("button", { name: "Cards" }));
    expect(single).toHaveBeenLastCalledWith("cards");
    await user.click(screen.getByRole("button", { name: "Cards" }));
    expect(single).toHaveBeenLastCalledWith("");
    rerender(
      <ToggleGroup.Root ariaLabel="Format" onValueChange={multiple} type="multiple">
        <ToggleGroup.Item value="bold">Bold</ToggleGroup.Item>
        <ToggleGroup.Item value="italic">Italic</ToggleGroup.Item>
      </ToggleGroup.Root>,
    );
    await user.click(screen.getByRole("button", { name: "Bold" }));
    expect(multiple).toHaveBeenLastCalledWith(["bold"]);
  });

  it("preserves disabled, native, composition, and ref paths", () => {
    const rootRef = createRef<HTMLDivElement>();
    const itemRef = createRef<HTMLButtonElement>();
    render(
      <ToggleGroup.Root aria-labelledby="group-label" className="consumer-group" data-slot="view-group" disabled ref={rootRef} style={{ marginBlockStart: 2 }}>
        <ToggleGroup.Item className="consumer-item" ref={itemRef} value="cards">Cards</ToggleGroup.Item>
        <ToggleGroup.Item asChild value="list"><span>List</span></ToggleGroup.Item>
      </ToggleGroup.Root>,
    );
    const group = screen.getByRole("group");
    const cards = screen.getByRole("button", { name: "Cards" });
    const list = screen.getByRole("button", { name: "List" });
    expect(group).toBe(rootRef.current);
    expect(group).toHaveClass("brick-toggle-group", "consumer-group");
    expect(group).toHaveAttribute("data-slot", "view-group");
    expect(group).toHaveAttribute("aria-disabled", "true");
    expect(cards).toBe(itemRef.current);
    expect(cards).toBeDisabled();
    expect(cards).toHaveClass("brick-toggle-group-item", "consumer-item");
    expect(list).toHaveAttribute("aria-disabled", "true");
  });

  it("accepts the documented discriminated Root union", () => {
    const single: ToggleGroupRootProps = {
      children: null,
      type: "single",
      value: "cards",
    };
    const multiple: ToggleGroupRootProps = {
      children: null,
      type: "multiple",
      value: ["bold"],
    };
    expect(single.value).toBe("cards");
    expect(multiple.value).toEqual(["bold"]);
  });
});

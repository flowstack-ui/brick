import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  Toggle,
  type ToggleShape,
  type ToggleSize,
  type ToggleVariant,
} from "../../src/toggle.js";
import {
  ToggleGroup,
  type ToggleGroupRootProps,
} from "../../src/toggle-group.js";

describe("Toggle", () => {
  it("renders the adopted defaults and Atom pressed semantics", () => {
    render(<Toggle>Bold</Toggle>);
    const toggle = screen.getByRole("button", { name: "Bold" });
    expect(toggle).toHaveClass("brick-toggle");
    expect(toggle).toHaveAttribute("type", "button");
    expect(toggle).toHaveAttribute("aria-pressed", "false");
    expect(toggle).toHaveAttribute("data-state", "off");
    expect(toggle).toHaveAttribute("data-variant", "soft");
    expect(toggle).toHaveAttribute("data-size", "md");
    expect(toggle).toHaveAttribute("data-shape", "rounded");
    expect(toggle).not.toHaveAttribute("data-icon-only");
  });

  it("forwards controlled state, native props, class, style, slot, and ref", () => {
    const ref = createRef<HTMLButtonElement>();
    render(
      <Toggle
        aria-describedby="favorite-help"
        className="consumer-toggle"
        data-slot="favorite-toggle"
        iconOnly
        pressed
        ref={ref}
        style={{ marginInlineStart: 4 }}
        title="Favorite"
      >
        <svg aria-label="Favorite" />
      </Toggle>,
    );
    const toggle = screen.getByRole("button", { name: "Favorite" });
    expect(toggle).toBe(ref.current);
    expect(toggle).toHaveClass("brick-toggle", "consumer-toggle");
    expect(toggle).toHaveAttribute("data-slot", "favorite-toggle");
    expect(toggle).toHaveAttribute("data-icon-only", "");
    expect(toggle).toHaveAttribute("aria-pressed", "true");
    expect(toggle).toHaveAttribute("title", "Favorite");
    expect(toggle).toHaveStyle({ marginInlineStart: "4px" });
  });

  it("exposes every closed visual recipe", () => {
    const variants: ToggleVariant[] = ["soft", "outline", "ghost"];
    const sizes: ToggleSize[] = ["sm", "md", "lg"];
    const shapes: ToggleShape[] = ["rounded", "pill"];
    const { rerender } = render(<Toggle>Recipe</Toggle>);
    const toggle = screen.getByRole("button", { name: "Recipe" });

    for (const variant of variants) {
      rerender(<Toggle variant={variant}>Recipe</Toggle>);
      expect(toggle).toHaveAttribute("data-variant", variant);
    }
    for (const size of sizes) {
      rerender(<Toggle size={size}>Recipe</Toggle>);
      expect(toggle).toHaveAttribute("data-size", size);
    }
    for (const shape of shapes) {
      rerender(<Toggle shape={shape}>Recipe</Toggle>);
      expect(toggle).toHaveAttribute("data-shape", shape);
    }
  });

  it("keeps Atom as the uncontrolled pointer and keyboard state owner", async () => {
    const user = userEvent.setup();
    const onPressedChange = vi.fn();
    render(<Toggle onPressedChange={onPressedChange}>Pin</Toggle>);
    const toggle = screen.getByRole("button", { name: "Pin" });

    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-pressed", "true");
    expect(onPressedChange).toHaveBeenLastCalledWith(true);
    await user.keyboard(" ");
    expect(toggle).toHaveAttribute("aria-pressed", "false");
    expect(onPressedChange).toHaveBeenLastCalledWith(false);
  });

  it("preserves asChild and render composition", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    const { unmount } = render(
      <Toggle asChild className="root-toggle" onClick={onClick}>
        <span className="child-toggle">Preview</span>
      </Toggle>,
    );
    const composed = screen.getByRole("button", { name: "Preview" });
    expect(composed).toHaveClass("brick-toggle", "root-toggle", "child-toggle");
    await user.click(composed);
    expect(onClick).toHaveBeenCalledOnce();
    expect(composed).toHaveAttribute("aria-pressed", "true");

    unmount();
    render(<Toggle render={<span data-testid="rendered-toggle" />}>Rendered</Toggle>);
    expect(screen.getByTestId("rendered-toggle")).toHaveClass("brick-toggle");
    expect(screen.getByRole("button", { name: "Rendered" })).toHaveAttribute("aria-pressed", "false");
  });
});

describe("ToggleGroup", () => {
  it("renders the adopted Root and Item contract", () => {
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
    expect(group).toHaveAttribute("data-size", "md");
    expect(group).toHaveAttribute("data-shape", "rounded");
    expect(screen.getByRole("button", { name: "Bold" })).toHaveClass("brick-toggle-group-item");
    expect(screen.getByRole("button", { name: "Bold" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "Italic" })).toHaveAttribute("aria-pressed", "false");
  });

  it("applies group-owned visual props and item-only icon geometry", () => {
    render(
      <ToggleGroup.Root
        ariaLabel="View"
        attached
        fullWidth
        orientation="vertical"
        shape="pill"
        size="lg"
        variant="outline"
      >
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
    expect(screen.getByRole("button", { name: "Cards" })).toHaveAttribute("data-icon-only", "");
  });

  it("forwards single and multiple callback types without owning state", async () => {
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
      <ToggleGroup.Root
        aria-labelledby="group-label"
        className="consumer-group"
        data-slot="view-group"
        disabled
        ref={rootRef}
        style={{ marginBlockStart: 2 }}
      >
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
    expect(list).toHaveClass("brick-toggle-group-item");
  });

  it("accepts the documented discriminated Root union", () => {
    const single: ToggleGroupRootProps = { children: null, type: "single", value: "cards" };
    const multiple: ToggleGroupRootProps = { children: null, type: "multiple", value: ["bold"] };
    expect(single.value).toBe("cards");
    expect(multiple.value).toEqual(["bold"]);
  });
});

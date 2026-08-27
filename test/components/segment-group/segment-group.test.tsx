import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SegmentGroup, type SegmentGroupSize } from "../../../src/segment-group.js";

function Example({ onValueChange }: { onValueChange?: (value: string) => void }) {
  return (
    <SegmentGroup.Root aria-label="View" defaultValue="list" onValueChange={onValueChange}>
      <SegmentGroup.Indicator data-testid="indicator" />
      <SegmentGroup.Item value="list">List</SegmentGroup.Item>
      <SegmentGroup.Item value="grid">Grid</SegmentGroup.Item>
    </SegmentGroup.Root>
  );
}

describe("SegmentGroup", () => {
  it("renders adopted defaults, parts, and refs", () => {
    const rootRef = createRef<HTMLDivElement>();
    const itemRef = createRef<HTMLButtonElement>();
    render(
      <SegmentGroup.Root aria-label="View" defaultValue="list" ref={rootRef}>
        <SegmentGroup.Indicator />
        <SegmentGroup.Item ref={itemRef} value="list"><SegmentGroup.ItemText>List</SegmentGroup.ItemText></SegmentGroup.Item>
      </SegmentGroup.Root>,
    );
    const root = screen.getByRole("radiogroup", { name: "View" });
    expect(root).toBe(rootRef.current);
    expect(root).toHaveAttribute("data-size", "md");
    expect(root).toHaveAttribute("data-orientation", "horizontal");
    expect(itemRef.current).toHaveAttribute("role", "radio");
    expect(itemRef.current).toHaveAttribute("data-state", "checked");
    expect(root.querySelector("[data-slot='segment-group-indicator']")).toHaveAttribute("aria-hidden", "true");
    expect(root.querySelector("[data-slot='segment-group-item-text']")).toHaveTextContent("List");
  });

  it("preserves Atom one-value selection and keyboard behavior", async () => {
    const user = userEvent.setup();
    const changes = vi.fn();
    render(<Example onValueChange={changes} />);
    const list = screen.getByRole("radio", { name: "List" });
    const grid = screen.getByRole("radio", { name: "Grid" });
    await user.click(grid);
    expect(changes).toHaveBeenLastCalledWith("grid");
    expect(grid).toHaveAttribute("aria-checked", "true");
    grid.focus();
    await user.keyboard("{ArrowLeft}");
    expect(list).toHaveFocus();
  });

  it("routes shared sizes, full width, and icon-only geometry to data", () => {
    const sizes: SegmentGroupSize[] = ["sm", "md", "lg"];
    const { rerender } = render(<Example />);
    for (const size of sizes) {
      rerender(<SegmentGroup.Root aria-label="View" defaultValue="list" size={size}><SegmentGroup.Item value="list">List</SegmentGroup.Item></SegmentGroup.Root>);
      expect(screen.getByRole("radiogroup")).toHaveAttribute("data-size", size);
    }
    rerender(<SegmentGroup.Root aria-label="View" defaultValue="list" fullWidth><SegmentGroup.Item aria-label="List view" iconOnly value="list">L</SegmentGroup.Item></SegmentGroup.Root>);
    expect(screen.getByRole("radiogroup")).toHaveAttribute("data-full-width", "");
    expect(screen.getByRole("radio")).toHaveAttribute("data-icon-only", "");
  });
});

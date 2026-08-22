import { createRef, useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ReorderableList } from "../../../src/reorderable-list.js";

const labels: Record<string, string> = {
  connect: "Connect source",
  configure: "Configure deployment",
  verify: "Verify setup",
};

function Example({ onItemsChange = vi.fn(), ...rootProps }: Partial<React.ComponentProps<typeof ReorderableList.Root>> = {}) {
  const [items, setItems] = useState(["connect", "configure", "verify"]);
  return (
    <ReorderableList.Root
      {...rootProps}
      getItemLabel={(value) => labels[value]}
      items={items}
      onItemsChange={(nextItems, details) => {
        setItems(nextItems);
        onItemsChange(nextItems, details);
      }}
    >
      {items.map((value) => (
        <ReorderableList.Item key={value} value={value}>
          <ReorderableList.Handle aria-label={`Reorder ${labels[value]}`}>Handle</ReorderableList.Handle>
          <ReorderableList.Content>{labels[value]}</ReorderableList.Content>
          <ReorderableList.Actions>
            <ReorderableList.MoveBefore aria-label={`Move ${labels[value]} earlier`}>Earlier</ReorderableList.MoveBefore>
            <ReorderableList.MoveAfter aria-label={`Move ${labels[value]} later`}>Later</ReorderableList.MoveAfter>
          </ReorderableList.Actions>
          <ReorderableList.DropIndicator />
        </ReorderableList.Item>
      ))}
    </ReorderableList.Root>
  );
}

describe("ReorderableList", () => {
  it("renders the adopted ordered-list anatomy and default recipe", () => {
    render(<Example />);
    const root = screen.getByRole("list");
    expect(root.tagName).toBe("OL");
    expect(root).toHaveClass("brick-reorderable-list");
    expect(root).toHaveAttribute("data-size", "md");
    expect(root).toHaveAttribute("data-variant", "outline");
    expect(root).toHaveAttribute("data-orientation", "vertical");
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
    expect(screen.getByLabelText("Reorder Connect source")).toHaveClass("brick-reorderable-list__handle");
    expect(screen.getByText("Connect source")).toHaveClass("brick-reorderable-list__content");
    expect(screen.getByLabelText("Move Connect source later").parentElement).toHaveClass("brick-reorderable-list__actions");
    expect(root.querySelectorAll(".brick-reorderable-list__drop-indicator")).toHaveLength(3);
  });

  it("exposes closed size and variant recipes without leaking visual props", () => {
    render(<Example size="lg" variant="soft" />);
    const root = screen.getByRole("list");
    expect(root).toHaveAttribute("data-size", "lg");
    expect(root).toHaveAttribute("data-variant", "soft");
    expect(root).not.toHaveAttribute("size");
    expect(root).not.toHaveAttribute("variant");
  });

  it("delegates direct movement and returns Atom completion details", () => {
    const onItemsChange = vi.fn();
    render(<Example onItemsChange={onItemsChange} />);
    fireEvent.click(screen.getByLabelText("Move Connect source later"));
    expect(screen.getAllByRole("listitem").map((item) => item.textContent)).toEqual([
      expect.stringContaining("Configure deployment"),
      expect.stringContaining("Connect source"),
      expect.stringContaining("Verify setup"),
    ]);
    expect(onItemsChange).toHaveBeenCalledWith(
      ["configure", "connect", "verify"],
      expect.objectContaining({ activeValue: "connect", input: "control", previousIndex: 0, nextIndex: 1 }),
    );
  });

  it("preserves native props, custom classes, slots, styles, and refs", () => {
    const rootRef = createRef<HTMLOListElement>();
    const itemRef = createRef<HTMLLIElement>();
    const handleRef = createRef<HTMLElement>();
    const contentRef = createRef<HTMLDivElement>();
    const actionsRef = createRef<HTMLDivElement>();
    render(
      <ReorderableList.Root className="consumer-root" data-evidence="root" data-slot="steps" getItemLabel={() => "Step"} items={["step"]} onItemsChange={() => {}} ref={rootRef}>
        <ReorderableList.Item className="consumer-item" data-slot="step" ref={itemRef} value="step">
          <ReorderableList.Handle aria-label="Reorder step" className="consumer-handle" ref={handleRef}>Handle</ReorderableList.Handle>
          <ReorderableList.Content className="consumer-content" data-slot="step-content" ref={contentRef} style={{ color: "rgb(1, 2, 3)" }}>Step</ReorderableList.Content>
          <ReorderableList.Actions className="consumer-actions" ref={actionsRef} />
          <ReorderableList.DropIndicator />
        </ReorderableList.Item>
      </ReorderableList.Root>,
    );
    expect(rootRef.current).toHaveClass("brick-reorderable-list", "consumer-root");
    expect(rootRef.current).toHaveAttribute("data-evidence", "root");
    expect(rootRef.current).toHaveAttribute("data-slot", "steps");
    expect(itemRef.current).toHaveClass("brick-reorderable-list__item", "consumer-item");
    expect(handleRef.current).toHaveClass("brick-reorderable-list__handle", "consumer-handle");
    expect(contentRef.current).toHaveAttribute("data-slot", "step-content");
    expect(contentRef.current).toHaveStyle({ color: "rgb(1, 2, 3)" });
    expect(actionsRef.current).toHaveClass("brick-reorderable-list__actions", "consumer-actions");
  });

  it("preserves disabled and read-only behavior from Atom", () => {
    const { rerender } = render(<Example disabled />);
    expect(screen.getByRole("list")).toHaveAttribute("data-disabled", "");
    expect(screen.getByLabelText("Reorder Connect source")).toBeDisabled();
    rerender(<Example readOnly />);
    expect(screen.getByRole("list")).toHaveAttribute("data-readonly", "");
    expect(screen.getByLabelText("Move Connect source later")).toBeDisabled();
  });
});

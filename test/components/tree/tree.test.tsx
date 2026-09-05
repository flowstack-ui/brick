import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { Tree } from "../../../src/tree.js";

const originalScrollIntoView = HTMLElement.prototype.scrollIntoView;

beforeAll(() => {
  HTMLElement.prototype.scrollIntoView = vi.fn();
});

afterAll(() => {
  HTMLElement.prototype.scrollIntoView = originalScrollIntoView;
});

function Standard(props: Partial<React.ComponentProps<typeof Tree.Root>> = {}) {
  return (
    <Tree.Root aria-label="Repository" defaultExpandedValue={["src"]} {...props}>
      <Tree.Item value="src">
        <Tree.ItemContent>
          <Tree.Indicator />
          <Tree.ItemText>src</Tree.ItemText>
        </Tree.ItemContent>
        <Tree.Group>
          <Tree.Item value="index">
            <Tree.ItemContent>
              <Tree.Indicator />
              <Tree.ItemText>index.ts</Tree.ItemText>
            </Tree.ItemContent>
          </Tree.Item>
        </Tree.Group>
      </Tree.Item>
      <Tree.Item value="readme">
        <Tree.ItemContent>
          <Tree.Indicator data-testid="leaf-indicator" />
          <Tree.ItemText>README.md</Tree.ItemText>
        </Tree.ItemContent>
      </Tree.Item>
    </Tree.Root>
  );
}

describe("Tree", () => {
  it("renders the six-part contract and default recipes", () => {
    render(<Standard />);
    const root = screen.getByRole("tree", { name: "Repository" });
    expect(root).toHaveClass("brick-tree");
    expect(root).toHaveAttribute("aria-orientation", "vertical");
    expect(root).toHaveAttribute("data-size", "md");
    expect(root).toHaveAttribute("data-variant", "plain");
    expect(root).toHaveAttribute("data-border-tone", "default");
    expect(root).not.toHaveAttribute("data-guide");
    expect(screen.getByRole("treeitem", { name: "src" })).toHaveClass("brick-tree__item");
    expect(root.querySelector(".brick-tree__item-content")).toBeInstanceOf(HTMLDivElement);
    expect(root.querySelector(".brick-tree__item-text")).toBeInstanceOf(HTMLSpanElement);
    expect(root.querySelector(".brick-tree__group")).toHaveAttribute("role", "group");
    expect(root.querySelector(".brick-tree__indicator svg")).toBeTruthy();
    expect(screen.getByTestId("leaf-indicator")).toHaveAttribute("aria-hidden", "true");
  });

  it("forwards behavior, hooks, native props, and refs without leaking recipes", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    const ref = createRef<HTMLDivElement>();
    render(<Standard borderTone="strong" className="custom-root" data-testid="tree" onValueChange={onValueChange} ref={ref} showGuide size="sm" variant="outline" />);
    const root = screen.getByTestId("tree");
    expect(ref.current).toBe(root);
    expect(root).toHaveClass("brick-tree", "custom-root");
    expect(root).toHaveAttribute("data-guide", "");
    expect(root).toHaveAttribute("data-size", "sm");
    expect(root).toHaveAttribute("data-variant", "outline");
    expect(root).toHaveAttribute("data-border-tone", "strong");
    expect(root).not.toHaveAttribute("showGuide");
    await user.click(screen.getByRole("treeitem", { name: "README.md" }));
    expect(onValueChange).toHaveBeenCalledWith("readme");
  });

  it("keeps custom indicator content decorative", () => {
    render(<Tree.Root aria-label="Custom"><Tree.Item value="folder"><Tree.ItemContent><Tree.Indicator><span>+</span></Tree.Indicator><Tree.ItemText>Folder</Tree.ItemText></Tree.ItemContent><Tree.Group><Tree.Item value="file"><Tree.ItemContent><Tree.Indicator /><Tree.ItemText>File</Tree.ItemText></Tree.ItemContent></Tree.Item></Tree.Group></Tree.Item></Tree.Root>);
    const indicator = screen.getByText("+").parentElement;
    expect(indicator).toHaveClass("brick-tree__indicator");
    expect(indicator).toHaveAttribute("aria-hidden", "true");
  });
});

import { createRef } from "react";
import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  List,
  type ListDensity,
  type ListMarker,
  type ListSize,
  type ListVariant,
} from "../../../src/list.js";

describe("List", () => {
  it("renders native defaults, stable anatomy, slots, and refs", () => {
    const rootRef = createRef<HTMLUListElement>();
    const itemRef = createRef<HTMLLIElement>();
    const { getByRole, getByText } = render(
      <List.Root aria-label="Release checks" ref={rootRef}>
        <List.Item ref={itemRef}>
          <List.Leading data-testid="leading">✓</List.Leading>
          <List.Content>
            <List.Title>Package build</List.Title>
            <List.Description>Verified against the packed artifact</List.Description>
          </List.Content>
          <List.Trailing data-testid="trailing">Ready</List.Trailing>
        </List.Item>
      </List.Root>,
    );
    const root = getByRole("list", { name: "Release checks" });
    expect(root).toBe(rootRef.current);
    expect(root.tagName).toBe("UL");
    expect(root).toHaveClass("brick-list");
    expect(root).toHaveAttribute("data-variant", "plain");
    expect(root).toHaveAttribute("data-size", "md");
    expect(root).toHaveAttribute("data-density", "comfortable");
    expect(root).toHaveAttribute("data-marker", "auto");
    expect(itemRef.current).toHaveClass("brick-list__item");
    expect(itemRef.current?.firstElementChild).toHaveClass("brick-list__row");
    expect(getByText("Package build")).toHaveAttribute("data-slot", "list-title");
    expect(getByText("Verified against the packed artifact")).toHaveClass("brick-list__description");
  });

  it("forwards ordered native behavior and descriptive disabled metadata", () => {
    const onClick = vi.fn();
    const { container, getByRole } = render(
      <List.Root aria-label="Deployment order" ordered reversed start={4}>
        <List.Item value={7}>Package</List.Item>
        <List.Item disabled><button onClick={onClick}>Unavailable check</button></List.Item>
      </List.Root>,
    );
    const root = getByRole("list", { name: "Deployment order" });
    expect(root.tagName).toBe("OL");
    expect(root).toHaveAttribute("start", "4");
    expect(root).toHaveAttribute("reversed");
    expect(root).toHaveAttribute("data-ordered", "");
    expect(container.querySelector("li[value='7']")).not.toBeNull();
    const disabled = container.querySelector("[data-disabled]");
    expect(disabled).toHaveAttribute("aria-disabled", "true");
    getByRole("button", { name: "Unavailable check" }).click();
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("exposes every closed recipe without leaking props", () => {
    const variants: ListVariant[] = ["plain", "divided", "bordered"];
    const sizes: ListSize[] = ["sm", "md", "lg"];
    const densities: ListDensity[] = ["compact", "comfortable"];
    const markers: ListMarker[] = ["auto", "disc", "circle", "square", "decimal", "lower-alpha", "upper-alpha", "lower-roman", "upper-roman", "none"];
    const { getByTestId, rerender } = render(<List.Root data-testid="root"><List.Item>One</List.Item></List.Root>);
    for (const variant of variants) { rerender(<List.Root data-testid="root" variant={variant}><List.Item>One</List.Item></List.Root>); expect(getByTestId("root")).toHaveAttribute("data-variant", variant); }
    for (const size of sizes) { rerender(<List.Root data-testid="root" size={size}><List.Item>One</List.Item></List.Root>); expect(getByTestId("root")).toHaveAttribute("data-size", size); }
    for (const density of densities) { rerender(<List.Root data-testid="root" density={density}><List.Item>One</List.Item></List.Root>); expect(getByTestId("root")).toHaveAttribute("data-density", density); }
    for (const marker of markers) { rerender(<List.Root data-testid="root" marker={marker}><List.Item>One</List.Item></List.Root>); expect(getByTestId("root")).toHaveAttribute("data-marker", marker); }
    const root = getByTestId("root");
    expect(root).not.toHaveAttribute("variant");
    expect(root).not.toHaveAttribute("size");
    expect(root).not.toHaveAttribute("density");
    expect(root).not.toHaveAttribute("marker");
  });

  it("restores marker-free semantics, preserves authored roles, and composes native hosts", () => {
    const { getByTestId, rerender } = render(<List.Root data-testid="root" marker="none"><List.Item>One</List.Item></List.Root>);
    expect(getByTestId("root")).toHaveAttribute("role", "list");
    rerender(<List.Root data-testid="root" marker="none" role="presentation"><List.Item>One</List.Item></List.Root>);
    expect(getByTestId("root")).toHaveAttribute("role", "presentation");
    rerender(
      <List.Root asChild data-testid="root"><ol><List.Item asChild data-testid="item"><li>Composed item</li></List.Item></ol></List.Root>,
    );
    expect(getByTestId("root").tagName).toBe("OL");
    expect(getByTestId("item").tagName).toBe("LI");
    expect(getByTestId("item")).toHaveTextContent("Composed item");
  });
});

import { createRef } from "react";
import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  List,
  type ListAlign,
  type ListDensity,
  type ListInset,
  type ListMarker,
  type ListSize,
  type ListVariant,
} from "../../../src/list.js";

describe("List", () => {
  it("serializes typography, nested indentation and independent marker tones", () => {
    const view = render(<List.Root size="inherit" markerTone="muted" nestedInset={{ md: "5", xl: 8 }}><List.Item markerTone="accent">Accent marker</List.Item><List.Item>Inherited marker</List.Item></List.Root>);
    const root = view.getByRole("list");
    expect(root).toHaveAttribute("data-size", "inherit");
    expect(root).toHaveAttribute("data-marker-tone", "muted");
    expect(root.style.getPropertyValue("--brick-list-nested-inset-md-input")).toBe("var(--brick-space-5)");
    expect(root.style.getPropertyValue("--brick-list-nested-inset-xl-input")).toBe("calc(var(--brick-space-1) * 8)");
    expect(root.style.getPropertyValue("--brick-list-nested-inset-input")).toBe("");
    expect(view.getAllByRole("listitem")[0]).toHaveAttribute("data-marker-tone", "accent");
    expect(view.getAllByRole("listitem")[1]).not.toHaveAttribute("data-marker-tone");
    expect(root).not.toHaveAttribute("nestedInset");
    expect(root).not.toHaveAttribute("markerTone");
  });

  it("projects each presentation part onto one child with refs, classes and events", () => {
    const outer = createRef<HTMLSpanElement>();
    const inner = createRef<HTMLSpanElement>();
    const onOuter = vi.fn();
    const onInner = vi.fn();
    const view = render(<List.Root marker="none"><List.Item>
      <List.Leading asChild ref={outer} className="outer" onClick={onOuter}><span className="inner" ref={inner} onClick={onInner}>Icon</span></List.Leading>
      <List.Content asChild><section><List.Title asChild><strong>Title</strong></List.Title><List.Description asChild><p>Description</p></List.Description></section></List.Content>
      <List.Trailing asChild><span>Metadata</span></List.Trailing>
    </List.Item></List.Root>);
    const leading = view.getByText("Icon");
    expect(leading).toBe(outer.current);
    expect(leading).toBe(inner.current);
    expect(leading).toHaveClass("brick-list__leading", "inner", "outer");
    leading.click();
    expect(onOuter).toHaveBeenCalledOnce();
    expect(onInner).toHaveBeenCalledOnce();
    expect(view.getByText("Title").tagName).toBe("STRONG");
    expect(view.getByText("Description").tagName).toBe("P");
    expect(view.container.querySelector(".brick-list__content")?.tagName).toBe("SECTION");
    expect(view.getByText("Metadata").tagName).toBe("SPAN");
    expect(view.container.querySelector("[aschild]")).toBeNull();
  });
  it("serializes sparse gap without leaking props", () => {
    const view = render(<List.Root density="none" inset="none" gap={{ md: "4" }}><List.Item>One</List.Item></List.Root>);
    const root = view.getByRole("list");
    expect(root.style.getPropertyValue("--brick-list-gap-md-input")).toBe("var(--brick-space-4)");
    expect(root.style.getPropertyValue("--brick-list-gap-input")).toBe("");
    expect(root).not.toHaveAttribute("gap");
  });
  it("paints selection without option semantics", () => {
    const view = render(<List.Root><List.Item selected>Person</List.Item></List.Root>);
    const item = view.getByRole("listitem");
    expect(item).toHaveAttribute("data-selected", "");
    for (const name of ["selected", "aria-selected", "tabindex", "role"]) expect(item).not.toHaveAttribute(name);
  });
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
    expect(root).toHaveAttribute("data-align", "start");
    expect(root).toHaveAttribute("data-size", "md");
    expect(root).toHaveAttribute("data-density", "comfortable");
    expect(root).toHaveAttribute("data-inset", "default");
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
    const densities: ListDensity[] = ["none", "compact", "comfortable"];
    const alignments: ListAlign[] = ["start", "center", "end"];
    const insets: ListInset[] = ["default", "none"];
    const markers: ListMarker[] = ["auto", "disc", "circle", "square", "decimal", "lower-alpha", "upper-alpha", "lower-roman", "upper-roman", "none"];
    const { getByTestId, rerender } = render(<List.Root data-testid="root"><List.Item>One</List.Item></List.Root>);
    for (const variant of variants) { rerender(<List.Root data-testid="root" variant={variant}><List.Item>One</List.Item></List.Root>); expect(getByTestId("root")).toHaveAttribute("data-variant", variant); }
    for (const size of sizes) { rerender(<List.Root data-testid="root" size={size}><List.Item>One</List.Item></List.Root>); expect(getByTestId("root")).toHaveAttribute("data-size", size); }
    for (const density of densities) { rerender(<List.Root data-testid="root" density={density}><List.Item>One</List.Item></List.Root>); expect(getByTestId("root")).toHaveAttribute("data-density", density); }
    for (const align of alignments) { rerender(<List.Root align={align} data-testid="root"><List.Item>One</List.Item></List.Root>); expect(getByTestId("root")).toHaveAttribute("data-align", align); }
    for (const inset of insets) { rerender(<List.Root data-testid="root" inset={inset}><List.Item>One</List.Item></List.Root>); expect(getByTestId("root")).toHaveAttribute("data-inset", inset); }
    for (const marker of markers) { rerender(<List.Root data-testid="root" marker={marker}><List.Item>One</List.Item></List.Root>); expect(getByTestId("root")).toHaveAttribute("data-marker", marker); }
    const root = getByTestId("root");
    expect(root).not.toHaveAttribute("variant");
    expect(root).not.toHaveAttribute("size");
    expect(root).not.toHaveAttribute("density");
    expect(root).not.toHaveAttribute("align");
    expect(root).not.toHaveAttribute("inset");
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

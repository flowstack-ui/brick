import { createRef, useState } from "react";
import { readFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { CheckboxGroup } from "../../../src/checkbox-group.js";

describe("CheckboxGroup", () => {
  it("inherits recipes, permits item overrides and retains limits", async () => {
    render(<CheckboxGroup.Root aria-label="Limit" variant="outline" size={{ md: "lg" }} tone="neutral" maxSelectedValues={1}>
      <CheckboxGroup.Item value="a">A</CheckboxGroup.Item>
      <CheckboxGroup.Item value="b" variant="subtle" tone="accent">B</CheckboxGroup.Item>
    </CheckboxGroup.Root>);
    const a = screen.getByRole("checkbox", { name: "A" });
    const b = screen.getByRole("checkbox", { name: "B" });
    expect(a).toHaveAttribute("data-size", "md");
    expect(a).toHaveAttribute("data-size-md", "lg");
    expect(a).toHaveAttribute("data-variant", "outline");
    expect(b).toHaveAttribute("data-variant", "subtle");
    const user = userEvent.setup();
    await user.click(a);
    expect(b).toBeDisabled();
    expect(a).not.toBeDisabled();
    await user.click(a);
    expect(b).not.toBeDisabled();
  });
  it("keeps the documented controlled Parent example owned by Root", async () => {
    const guide = readFileSync("docs/components/checkbox-group/README.md", "utf8");
    expect(guide).not.toMatch(/<CheckboxGroup\.Parent\b[^>]*\ballValues=/);
    expect(guide).toMatch(/<CheckboxGroup\.Root\b[^>]*\ballValues=/);
    function Example() {
      const [value, setValue] = useState<string[]>([]);
      return (
        <CheckboxGroup.Root aria-label="Notification channels" allValues={["email", "sms"]} value={value} onValueChange={setValue}>
          <CheckboxGroup.Parent>Select all</CheckboxGroup.Parent>
          <CheckboxGroup.Item value="email">Email</CheckboxGroup.Item>
          <CheckboxGroup.Item value="sms">SMS</CheckboxGroup.Item>
        </CheckboxGroup.Root>
      );
    }
    expect(() => renderToStaticMarkup(<Example />)).not.toThrow();
    render(<Example />);
    const user = userEvent.setup();
    await user.click(screen.getByRole("checkbox", { name: "Select all" }));
    expect(screen.getByRole("checkbox", { name: "Email" })).toHaveAttribute("aria-checked", "true");
    expect(screen.getByRole("checkbox", { name: "SMS" })).toHaveAttribute("aria-checked", "true");
    await user.click(screen.getByRole("checkbox", { name: "SMS" }));
    expect(screen.getByRole("checkbox", { name: "Select all" })).toHaveAttribute("aria-checked", "mixed");
  });

  it("owns its exact frozen namespace and defaults", () => {
    expect(Object.keys(CheckboxGroup)).toEqual([
      "Root",
      "RootProvider",
      "Item",
      "ItemLabel",
      "ItemDescription",
      "Parent",
    ]);
    expect(Object.isFrozen(CheckboxGroup)).toBe(true);
    render(
      <CheckboxGroup.Root aria-label="Channels" allValues={["email"]}>
        <CheckboxGroup.Parent>All channels</CheckboxGroup.Parent>
        <CheckboxGroup.Item value="email">Email</CheckboxGroup.Item>
      </CheckboxGroup.Root>,
    );
    const group = screen.getByRole("group", { name: "Channels" });
    expect(group).toHaveClass("brick-checkbox-group");
    expect(group).toHaveAttribute("data-size", "md");
    expect(group).toHaveAttribute("data-orientation", "vertical");
    expect(screen.getByRole("checkbox", { name: "Email" })).toHaveClass(
      "brick-checkbox-group-item",
    );
    expect(screen.getByRole("checkbox", { name: "All channels" })).toHaveClass(
      "brick-checkbox-group-parent",
    );
  });

  it("owns uncontrolled selection and deterministic Parent state", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <CheckboxGroup.Root aria-label="Channels" allValues={["email", "sms"]} defaultValue={["outside"]} onValueChange={onValueChange}>
        <CheckboxGroup.Parent>All</CheckboxGroup.Parent>
        <CheckboxGroup.Item value="email">Email</CheckboxGroup.Item>
        <CheckboxGroup.Item value="sms">SMS</CheckboxGroup.Item>
      </CheckboxGroup.Root>,
    );
    const parent = screen.getByRole("checkbox", { name: "All" });
    const email = screen.getByRole("checkbox", { name: "Email" });
    expect(parent).toHaveAttribute("data-state", "unchecked");
    await user.click(email);
    expect(parent).toHaveAttribute("aria-checked", "mixed");
    await user.click(parent);
    expect(onValueChange).toHaveBeenLastCalledWith(["outside", "email", "sms"]);
    await user.click(parent);
    expect(onValueChange).toHaveBeenLastCalledWith(["outside"]);
  });

  it("owns stable structured relationships in SSR and DOM", () => {
    const tree = (
      <CheckboxGroup.Root aria-label="Destinations">
        <CheckboxGroup.Item value="email">
          <CheckboxGroup.ItemLabel>Email</CheckboxGroup.ItemLabel>
          <CheckboxGroup.ItemDescription>Weekly account summary.</CheckboxGroup.ItemDescription>
        </CheckboxGroup.Item>
      </CheckboxGroup.Root>
    );
    const html = renderToStaticMarkup(tree);
    expect(html).toMatch(/aria-labelledby="[^"]+"/);
    expect(html).toMatch(/aria-describedby="[^"]+"/);
    render(tree);
    const item = screen.getByRole("checkbox", { name: "Email" });
    const label = screen.getByText("Email");
    const description = screen.getByText("Weekly account summary.");
    expect(item).toHaveAttribute("aria-labelledby", label.id);
    expect(item).toHaveAttribute("aria-describedby", description.id);
  });

  it("supports every composition, ref, class, style, and slot path", () => {
    const rootRef = createRef<HTMLDivElement>();
    const itemRef = createRef<HTMLButtonElement>();
    const labelRef = createRef<HTMLSpanElement>();
    const descriptionRef = createRef<HTMLSpanElement>();
    const parentRef = createRef<HTMLButtonElement>();
    render(
      <CheckboxGroup.Root aria-label="Composed" allValues={["one"]} className="consumer-group" data-slot="custom-group" orientation="horizontal" ref={rootRef} render={<section data-adapter="root" />} size="lg" style={{ marginTop: 2 }}>
        <CheckboxGroup.Parent asChild ref={parentRef}><button data-adapter="parent">All</button></CheckboxGroup.Parent>
        <CheckboxGroup.Item asChild ref={itemRef} value="one">
          <button data-adapter="item">
            <CheckboxGroup.ItemLabel asChild ref={labelRef}><strong>One</strong></CheckboxGroup.ItemLabel>
            <CheckboxGroup.ItemDescription ref={descriptionRef} render={<small data-adapter="description" />}>First choice</CheckboxGroup.ItemDescription>
          </button>
        </CheckboxGroup.Item>
      </CheckboxGroup.Root>,
    );
    expect(rootRef.current?.tagName).toBe("SECTION");
    expect(rootRef.current).toHaveClass("brick-checkbox-group", "consumer-group");
    expect(rootRef.current).toHaveAttribute("data-slot", "custom-group");
    expect(rootRef.current).toHaveAttribute("data-orientation", "horizontal");
    expect(rootRef.current).toHaveAttribute("data-size", "lg");
    expect(parentRef.current?.querySelector(".brick-checkbox-control")).toBeTruthy();
    expect(itemRef.current?.querySelector(".brick-checkbox-control")).toBeTruthy();
    expect(labelRef.current?.tagName).toBe("STRONG");
    expect(descriptionRef.current?.tagName).toBe("SMALL");
  });
});

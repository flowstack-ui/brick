import { Fragment, createRef } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Stack, HStack } from "../../../src/stack.js";
import { For } from "../../../src/for.js";

describe("Stack separators", () => {
  it("does not introspect For output and preserves manual separator refs", () => {
    const ref = createRef<HTMLSpanElement>();
    const { container } = render(<Stack separator={<Stack.Separator />}><For each={[1,2]}>{value => <span key={value}>{value}</span>}</For><Stack.Separator ref={ref} /></Stack>);
    expect(container.querySelectorAll("[data-stack-separator-item]")).toHaveLength(1);
    expect(ref.current).toHaveAttribute("data-slot", "stack-separator");
  });
  it("interleaves peers without wrappers and preserves zero/text", () => {
    const { container } = render(
      <Stack separator={<Stack.Separator />}>
        {null}
        {false}
        <span>A</span>
        {0}
        {"Text"}
        <span>B</span>
      </Stack>,
    );
    expect(
      container.querySelectorAll("[data-stack-separator-item]"),
    ).toHaveLength(3);
    expect(container.textContent).toBe("A0TextB");
    expect(container.firstElementChild?.children).toHaveLength(5);
  });
  it("renders no separator for zero or one peer", () => {
    const { container, rerender } = render(
      <Stack separator={<Stack.Separator />} />,
    );
    expect(container.querySelector("[data-stack-separator-item]")).toBeNull();
    rerender(
      <Stack separator={<Stack.Separator />}>
        <span>A</span>
      </Stack>,
    );
    expect(container.querySelector("[data-stack-separator-item]")).toBeNull();
  });
  it("preserves keyed input state and refs across reordering", () => {
    const ref = createRef<HTMLInputElement>();
    const a = <input key="a" ref={ref} aria-label="A" defaultValue="A" />;
    const b = <input key="b" aria-label="B" />;
    const { rerender } = render(
      <HStack separator={<Stack.Separator />}>{[a, b]}</HStack>,
    );
    const node = ref.current;
    node!.value = "Kept";
    rerender(<HStack separator={<Stack.Separator />}>{[b, a]}</HStack>);
    expect(ref.current).toBe(node);
    expect(screen.getByRole("textbox", { name: "A" })).toHaveValue("Kept");
  });
  it("keeps fragments opaque and custom decoration unpainted", () => {
    const { container } = render(
      <Stack separator={<span>/</span>}>
        <Fragment>
          <span>A</span>
          <span>B</span>
        </Fragment>
        <span>C</span>
      </Stack>,
    );
    expect(
      container.querySelectorAll("[data-stack-separator-item]"),
    ).toHaveLength(1);
    expect(container.querySelector(".brick-stack-separator")).toBeNull();
    expect(
      container.querySelector("[data-stack-separator-item]"),
    ).toHaveAttribute("aria-hidden", "true");
  });
  it("rejects repeated ids and fragment templates", () => {
    expect(() =>
      render(
        <Stack separator={<Stack.Separator id="duplicate" />}>
          <span>A</span>
          <span>B</span>
        </Stack>,
      ),
    ).toThrow("id or ref");
    expect(() => render(<Stack separator={<Fragment />} />)).toThrow(
      "non-Fragment",
    );
  });
});

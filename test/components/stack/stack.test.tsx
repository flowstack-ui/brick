import { createRef, Fragment } from "react";
import { renderToString } from "react-dom/server";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  HStack,
  Stack,
  VStack,
  type StackAlign,
  type StackElement,
  type StackGap,
  type StackJustify,
} from "../../../src/stack.js";

describe("Stack", () => {
  it("supports independent responsive gaps, reverse, wrapping, and inline display", () => {
    render(
      <Stack
        data-testid="expanded"
        direction="row-reverse"
        wrap="wrap-reverse"
        inline={{ lg: true }}
        rowGap={2}
        columnGap={{ md: 3 }}
        alignContent="space-between"
      />,
    );
    const node = screen.getByTestId("expanded");
    expect(node.style.getPropertyValue("--brick-stack-direction-input")).toBe(
      "row-reverse",
    );
    expect(node.style.getPropertyValue("--brick-stack-wrap-input")).toBe(
      "wrap-reverse",
    );
    expect(node.style.getPropertyValue("--brick-stack-display-lg-input")).toBe(
      "inline-flex",
    );
    expect(
      node.style.getPropertyValue("--brick-stack-row-gap-input"),
    ).toContain("* 2");
    expect(
      node.style.getPropertyValue("--brick-stack-column-gap-md-input"),
    ).toContain("* 3");
  });

  it("serializes item longhands independently of recipe updates", () => {
    render(
      <Stack.Item
        data-testid="item"
        flex={{ initial: "content", lg: 2 }}
        shrink={0}
        grow={0.5}
        basis={120}
        order={-1}
        marginInlineStart="auto"
      />,
    );
    const node = screen.getByTestId("item");
    expect(
      node.style.getPropertyValue("--brick-stack-item-recipe-grow-lg-input"),
    ).toBe("2");
    expect(node.style.getPropertyValue("--brick-stack-item-shrink-input")).toBe(
      "0",
    );
    expect(node.style.getPropertyValue("--brick-stack-item-grow-input")).toBe(
      "0.5",
    );
    expect(node.style.getPropertyValue("--brick-stack-item-basis-input")).toBe(
      "120px",
    );
    expect(node.style.getPropertyValue("--brick-stack-item-order-input")).toBe(
      "-1",
    );
    expect(
      node.style.getPropertyValue(
        "--brick-stack-item-margin-inline-start-input",
      ),
    ).toBe("auto");
    expect(node).not.toHaveAttribute("grow");
  });

  it("composes root and item on one host without alignment input collisions", () => {
    const { container } = render(
      <Stack.Item asChild align="end">
        <Stack asChild align="center">
          <section>Nested</section>
        </Stack>
      </Stack.Item>,
    );
    const node = screen.getByText("Nested");
    expect(container.querySelectorAll("section,div")).toHaveLength(1);
    expect(node).toHaveClass("brick-stack", "brick-stack-item");
    expect(node.style.getPropertyValue("--brick-stack-align-input")).toBe(
      "center",
    );
    expect(node.style.getPropertyValue("--brick-stack-item-align-input")).toBe(
      "end",
    );
  });

  it("preserves host style, handlers, both refs and cleanup", () => {
    const calls: string[] = [];
    const cleanup = vi.fn();
    const ref = createRef<HTMLElement>();
    const { unmount } = render(
      <Stack asChild ref={ref} onClick={() => calls.push("owner")}>
        <button
          type="button"
          ref={() => cleanup}
          style={{ color: "red" }}
          onClick={() => calls.push("child")}
        >
          Host
        </button>
      </Stack>,
    );
    const node = screen.getByText("Host");
    fireEvent.click(node);
    expect(calls).toEqual(["owner", "child"]);
    expect(node.style.color).toBe("red");
    expect(ref.current).toBe(node);
    unmount();
    expect(ref.current).toBeNull();
    expect(cleanup).toHaveBeenCalledTimes(1);
  });

  it("rejects fragments and missing hosts", () => {
    expect(() =>
      renderToString(
        <Stack asChild>
          <Fragment>
            <span>One</span>
          </Fragment>
        </Stack>,
      ),
    ).toThrow(/non-Fragment/);
  });

  it("validates factors and responsive objects consistently during SSR", () => {
    const warning = vi
      .spyOn(console, "warn")
      .mockImplementation(() => undefined);
    const markup = renderToString(
      <Stack.Item grow={-1} shrink={Infinity} order={0.5} basis={-3}>
        Stable
      </Stack.Item>,
    );
    expect(markup).toContain("--brick-stack-item-grow-input:0");
    expect(markup).toContain("--brick-stack-item-shrink-input:1");
    expect(markup).toContain("--brick-stack-item-order-input:0");
    expect(warning).toHaveBeenCalled();
    warning.mockRestore();
  });
  it("renders the adopted column default and preserves an empty root", () => {
    const ref = createRef<HTMLElement>();
    const { container } = render(<Stack data-testid="stack" ref={ref} />);
    const stack = screen.getByTestId("stack");

    expect(container.firstElementChild).toBe(stack);
    expect(stack).toBe(ref.current);
    expect(stack.tagName).toBe("DIV");
    expect(stack).toHaveClass("brick-stack");
    expect(stack).toHaveAttribute("data-slot", "stack");
    expect(stack).toHaveAttribute("data-direction", "column");
    expect(stack).toHaveAttribute("data-gap", "0");
    expect(stack).not.toHaveAttribute("data-align");
    expect(stack).not.toHaveAttribute("data-justify");
    expect(stack).not.toHaveAttribute("data-wrap");
    expect(stack).not.toHaveAttribute("role");
  });

  it("keeps Stack, HStack, and VStack on one rendered contract", () => {
    const { rerender } = render(<Stack data-testid="layout">One</Stack>);
    let layout = screen.getByTestId("layout");
    expect(layout).toHaveAttribute("data-direction", "column");
    expect(layout).not.toHaveAttribute("data-align");

    rerender(<HStack data-testid="layout">One</HStack>);
    layout = screen.getByTestId("layout");
    expect(layout).toHaveAttribute("data-direction", "row");
    expect(layout).toHaveAttribute("data-align", "center");

    rerender(<VStack data-testid="layout">One</VStack>);
    layout = screen.getByTestId("layout");
    expect(layout).toHaveAttribute("data-direction", "column");
    expect(layout).not.toHaveAttribute("data-align");
  });

  it("exposes every closed layout recipe through stable metadata", () => {
    const gaps: StackGap[] = ["0", "1", "2", "3", "4", "5", "6"];
    const aligns: StackAlign[] = [
      "stretch",
      "start",
      "center",
      "end",
      "baseline",
    ];
    const justifies: StackJustify[] = [
      "start",
      "center",
      "end",
      "between",
      "around",
      "evenly",
    ];
    const { rerender } = render(<Stack data-testid="layout" />);

    for (const gap of gaps) {
      rerender(<Stack data-testid="layout" gap={gap} />);
      expect(screen.getByTestId("layout")).toHaveAttribute("data-gap", gap);
    }
    for (const align of aligns) {
      rerender(<Stack align={align} data-testid="layout" />);
      const layout = screen.getByTestId("layout");
      if (align === "stretch") expect(layout).not.toHaveAttribute("data-align");
      else expect(layout).toHaveAttribute("data-align", align);
    }
    for (const justify of justifies) {
      rerender(<Stack data-testid="layout" justify={justify} />);
      const layout = screen.getByTestId("layout");
      if (justify === "start")
        expect(layout).not.toHaveAttribute("data-justify");
      else expect(layout).toHaveAttribute("data-justify", justify);
    }
    rerender(<Stack data-testid="layout" wrap />);
    expect(screen.getByTestId("layout")).toHaveAttribute("data-wrap", "");
  });

  it("supports the adopted semantic hosts without changing recipes", () => {
    const elements: StackElement[] = [
      "div",
      "span",
      "section",
      "article",
      "nav",
      "header",
      "footer",
      "main",
      "aside",
      "ul",
      "ol",
      "li",
    ];
    const { rerender } = render(<Stack data-testid="layout" />);

    for (const as of elements) {
      rerender(<Stack as={as} data-testid="layout" gap="3" />);
      const layout = screen.getByTestId("layout");
      expect(layout.tagName).toBe(as.toUpperCase());
      expect(layout).toHaveAttribute("data-gap", "3");
    }
  });

  it("forwards native attributes, events, hooks, content, and ref", () => {
    const ref = createRef<HTMLElement>();
    let clicks = 0;
    render(
      <HStack
        aria-label="Account actions"
        className="consumer-stack"
        data-evidence="native"
        dir="rtl"
        gap="2"
        id="actions"
        onClick={() => clicks++}
        ref={ref}
        slot="actions"
        style={{ inlineSize: 320 }}
        wrap
      >
        <button type="button">Save</button>
        <button type="button">Cancel</button>
      </HStack>,
    );
    const stack = screen.getByLabelText("Account actions");
    fireEvent.click(stack);

    expect(clicks).toBe(1);
    expect(stack).toBe(ref.current);
    expect(stack).toHaveClass("brick-stack", "consumer-stack");
    expect(stack).toHaveAttribute("data-slot", "actions");
    expect(stack).toHaveAttribute("data-evidence", "native");
    expect(stack).toHaveAttribute("dir", "rtl");
    expect(stack).toHaveAttribute("data-wrap", "");
    expect(stack).toHaveStyle({ inlineSize: "320px" });
    expect(stack.querySelectorAll("button")).toHaveLength(2);
    expect(stack).not.toHaveAttribute("gap");
    expect(stack).not.toHaveAttribute("align");
    expect(stack).not.toHaveAttribute("justify");
    expect(stack).not.toHaveAttribute("wrap");
  });

  it("locks convenience directions while allowing their other recipes", () => {
    render(
      <>
        <HStack align="end" data-testid="horizontal" justify="between" />
        <VStack align="center" data-testid="vertical" justify="end" />
      </>,
    );
    expect(screen.getByTestId("horizontal")).toHaveAttribute(
      "data-direction",
      "row",
    );
    expect(screen.getByTestId("horizontal")).toHaveAttribute(
      "data-align",
      "end",
    );
    expect(screen.getByTestId("horizontal")).toHaveAttribute(
      "data-justify",
      "between",
    );
    expect(screen.getByTestId("vertical")).toHaveAttribute(
      "data-direction",
      "column",
    );
    expect(screen.getByTestId("vertical")).toHaveAttribute(
      "data-align",
      "center",
    );
    expect(screen.getByTestId("vertical")).toHaveAttribute(
      "data-justify",
      "end",
    );
  });

  it("serializes responsive layout values without viewport JavaScript", () => {
    render(
      <Stack
        align={{ initial: "stretch", lg: "center" }}
        data-testid="responsive"
        direction={{ initial: "column", lg: "row" }}
        endSpacing={{ initial: "2", md: "4" }}
        gap={{ initial: "3", lg: "6" }}
        justify={{ initial: "start", xl: "between" }}
        startSpacing={{ initial: "1", md: "3" }}
        wrap={{ initial: false, sm: true, lg: false }}
      />,
    );
    const stack = screen.getByTestId("responsive");
    expect(stack).toHaveAttribute("data-direction", "column");
    expect(stack).toHaveAttribute("data-direction-lg", "row");
    expect(stack).toHaveAttribute("data-gap", "3");
    expect(stack).toHaveAttribute("data-gap-lg", "6");
    expect(stack).toHaveAttribute("data-align-lg", "center");
    expect(stack).toHaveAttribute("data-justify-xl", "between");
    expect(stack).toHaveAttribute("data-wrap-sm", "true");
    expect(stack).toHaveAttribute("data-wrap-lg", "false");
    expect(stack).toHaveAttribute("data-start-spacing", "1");
    expect(stack).toHaveAttribute("data-start-spacing-md", "3");
    expect(stack).toHaveAttribute("data-end-spacing", "2");
    expect(stack).toHaveAttribute("data-end-spacing-md", "4");
  });

  it("keeps component defaults below sparse responsive overrides", () => {
    render(
      <Stack
        align={{ lg: "center" }}
        data-testid="sparse"
        direction={{ lg: "row" }}
        gap={{ lg: 6 }}
      />,
    );
    const stack = screen.getByTestId("sparse");
    expect(stack).not.toHaveAttribute("data-direction");
    expect(stack).toHaveAttribute("data-direction-lg", "row");
    expect(stack).not.toHaveAttribute("data-gap");
    expect(stack).toHaveAttribute("data-gap-lg", "6");
    expect(stack).not.toHaveAttribute("data-align");
    expect(stack).toHaveAttribute("data-align-lg", "center");
    expect(stack.style.getPropertyValue("--brick-stack-gap-input")).toBe("");
    expect(stack.style.getPropertyValue("--brick-stack-gap-lg-input")).toBe(
      "calc(var(--brick-space-1) * 6)",
    );
  });

  it("resolves numeric factors, explicit CSS values, and responsive mixtures", () => {
    render(
      <Stack
        data-testid="spacing"
        endSpacing={{ initial: "var(--product-edge)", lg: 10 }}
        gap={{ initial: 8, md: "2rem", lg: "10" }}
        startSpacing="1.25rem"
      />,
    );
    const stack = screen.getByTestId("spacing");

    expect(stack).toHaveAttribute("data-gap", "8");
    expect(stack).toHaveAttribute("data-gap-md", "2rem");
    expect(stack).toHaveAttribute("data-gap-lg", "10");
    expect(stack.style.getPropertyValue("--brick-stack-gap-input")).toBe(
      "calc(var(--brick-space-1) * 8)",
    );
    expect(stack.style.getPropertyValue("--brick-stack-gap-md-input")).toBe(
      "2rem",
    );
    expect(stack.style.getPropertyValue("--brick-stack-gap-lg-input")).toBe(
      "calc(var(--brick-space-1) * 10)",
    );
    expect(
      stack.style.getPropertyValue("--brick-stack-start-spacing-input"),
    ).toBe("1.25rem");
    expect(
      stack.style.getPropertyValue("--brick-stack-end-spacing-input"),
    ).toBe("var(--product-edge)");
    expect(
      stack.style.getPropertyValue("--brick-stack-end-spacing-lg-input"),
    ).toBe("calc(var(--brick-space-1) * 10)");
  });

  it("preserves the established string-token scale", () => {
    render(<Stack data-testid="legacy-spacing" gap="6" />);
    expect(
      screen
        .getByTestId("legacy-spacing")
        .style.getPropertyValue("--brick-stack-gap-input"),
    ).toBe("var(--brick-space-6)");
  });

  it("warns and falls back to zero for obvious invalid spacing", () => {
    const warning = vi
      .spyOn(console, "warn")
      .mockImplementation(() => undefined);
    render(
      <Stack
        data-testid="invalid-spacing"
        endSpacing="-2"
        gap={Number.NaN}
        startSpacing=""
      />,
    );
    const stack = screen.getByTestId("invalid-spacing");

    expect(stack.style.getPropertyValue("--brick-stack-gap-input")).toBe(
      "var(--brick-space-0)",
    );
    expect(
      stack.style.getPropertyValue("--brick-stack-start-spacing-input"),
    ).toBe("var(--brick-space-0)");
    expect(
      stack.style.getPropertyValue("--brick-stack-end-spacing-input"),
    ).toBe("var(--brick-space-0)");
    expect(warning).toHaveBeenCalledTimes(3);
    warning.mockRestore();
  });

  it("sizes Stack.Item and composes an existing child", () => {
    const ref = createRef<HTMLElement>();
    render(
      <Stack>
        <Stack.Item data-testid="fixed" flex="fixed">
          Navigation
        </Stack.Item>
        <Stack.Item
          align={{ initial: "auto", lg: "end" }}
          asChild
          flex={{ initial: "content", lg: 2 }}
          ref={ref}
        >
          <section className="existing">Content</section>
        </Stack.Item>
      </Stack>,
    );
    expect(screen.getByTestId("fixed")).toHaveAttribute("data-flex", "fixed");
    const content = screen.getByText("Content");
    expect(content).toBe(ref.current);
    expect(content.tagName).toBe("SECTION");
    expect(content).toHaveClass("existing", "brick-stack-item");
    expect(content).toHaveAttribute("data-flex", "content");
    expect(content).toHaveAttribute("data-flex-lg", "2");
    expect(content).toHaveAttribute("data-align-lg", "end");
    expect(content).toHaveAttribute("data-stack-item-composed", "");
    expect(content).toHaveAttribute("data-slot", "stack-item");
    expect(screen.getByTestId("fixed")).not.toHaveAttribute(
      "data-stack-item-composed",
    );
  });
});

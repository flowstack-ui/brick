import { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
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
    const aligns: StackAlign[] = ["stretch", "start", "center", "end", "baseline"];
    const justifies: StackJustify[] = [
      "start", "center", "end", "between", "around", "evenly",
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
      if (justify === "start") expect(layout).not.toHaveAttribute("data-justify");
      else expect(layout).toHaveAttribute("data-justify", justify);
    }
    rerender(<Stack data-testid="layout" wrap />);
    expect(screen.getByTestId("layout")).toHaveAttribute("data-wrap", "");
  });

  it("supports the adopted semantic hosts without changing recipes", () => {
    const elements: StackElement[] = [
      "div", "span", "section", "article", "nav", "header", "footer",
      "main", "aside", "ul", "ol", "li",
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
    expect(screen.getByTestId("horizontal")).toHaveAttribute("data-direction", "row");
    expect(screen.getByTestId("horizontal")).toHaveAttribute("data-align", "end");
    expect(screen.getByTestId("horizontal")).toHaveAttribute("data-justify", "between");
    expect(screen.getByTestId("vertical")).toHaveAttribute("data-direction", "column");
    expect(screen.getByTestId("vertical")).toHaveAttribute("data-align", "center");
    expect(screen.getByTestId("vertical")).toHaveAttribute("data-justify", "end");
  });
});

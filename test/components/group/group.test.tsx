import { createRef, type CSSProperties } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  Group,
  type GroupElement,
  type GroupOrientation,
} from "../../../src/group.js";

describe("Group", () => {
  it("renders one role-free host with adopted defaults", () => {
    const ref = createRef<HTMLElement>();
    render(
      <Group data-testid="group" ref={ref}>
        <button>One</button>
        <button>Two</button>
      </Group>,
    );
    const group = screen.getByTestId("group");

    expect(group).toBe(ref.current);
    expect(group.tagName).toBe("DIV");
    expect(group).toHaveClass("brick-group");
    expect(group).toHaveAttribute("data-orientation", "horizontal");
    expect(group).toHaveAttribute("data-slot", "group");
    expect(group).not.toHaveAttribute("data-attached");
    expect(group).not.toHaveAttribute("data-grow");
    expect(group).not.toHaveAttribute("role");
    expect(group.children).toHaveLength(2);
    expect(group.style.getPropertyValue("--brick-group-gap-input")).toContain(
      "2",
    );
  });

  it("exposes both hosts, orientations, attachment, growth, and spacing", () => {
    const elements: GroupElement[] = ["div", "span"];
    const orientations: GroupOrientation[] = ["horizontal", "vertical"];
    const { rerender } = render(<Group data-testid="group" />);

    for (const as of elements) {
      rerender(<Group as={as} data-testid="group" />);
      expect(screen.getByTestId("group").tagName).toBe(as.toUpperCase());
    }
    for (const orientation of orientations) {
      rerender(<Group data-testid="group" orientation={orientation} />);
      expect(screen.getByTestId("group")).toHaveAttribute(
        "data-orientation",
        orientation,
      );
    }

    rerender(<Group attached data-testid="group" gap={4} grow />);
    expect(screen.getByTestId("group")).toHaveAttribute("data-attached", "");
    expect(screen.getByTestId("group")).toHaveAttribute("data-grow", "");
    expect(
      screen
        .getByTestId("group")
        .style.getPropertyValue("--brick-group-gap-input"),
    ).toContain("4");
  });

  it("forwards semantics, native props, events, class, style, the Brick slot hook, and ref", () => {
    const ref = createRef<HTMLElement>();
    let clicks = 0;
    render(
      <Group
        aria-label="History controls"
        attached
        className="consumer-group"
        data-evidence="native"
        dir="rtl"
        onClick={() => clicks++}
        ref={ref}
        role="group"
        slot="history-group"
        style={{ "--brick-group-overlap": "2px" } as CSSProperties}
      >
        <button>Previous</button>
        <button>Next</button>
      </Group>,
    );
    const group = screen.getByRole("group", { name: "History controls" });
    fireEvent.click(group);

    expect(clicks).toBe(1);
    expect(group).toBe(ref.current);
    expect(group).toHaveClass("brick-group", "consumer-group");
    expect(group).toHaveAttribute("data-slot", "history-group");
    expect(group).not.toHaveAttribute("slot");
    expect(group).toHaveAttribute("data-evidence", "native");
    expect(group).toHaveAttribute("dir", "rtl");
    expect(group.style.getPropertyValue("--brick-group-overlap")).toBe("2px");
    expect(group).not.toHaveAttribute("attached");
    expect(group).not.toHaveAttribute("grow");
    expect(group).not.toHaveAttribute("gap");
  });
});

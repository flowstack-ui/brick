import { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Avatar } from "../../../src/avatar.js";
import {
  AvatarGroup,
  type AvatarGroupOverlap,
  type AvatarGroupStacking,
} from "../../../src/avatar-group.js";

const identities = [
  ["Ada Lovelace", "AL"],
  ["Grace Hopper", "GH"],
  ["Katherine Johnson", "KJ"],
  ["Margaret Hamilton", "MH"],
  ["Dorothy Vaughan", "DV"],
] as const;

function avatars() {
  return identities.map(([alt, fallback]) => (
    <Avatar alt={alt} fallback={fallback} key={alt} size="5xl" shape="rounded" />
  ));
}

describe("AvatarGroup", () => {
  it("renders an empty neutral root without item or overflow wrappers", () => {
    const { container } = render(<AvatarGroup />);
    const root = container.firstElementChild;

    expect(root).toHaveAttribute("data-count", "0");
    expect(root?.querySelectorAll("[data-slot='avatar-group-item']")).toHaveLength(0);
    expect(root?.querySelector("[data-slot='avatar-group-overflow']")).toBeNull();
  });

  it("renders one child in exactly one item wrapper without overflow", () => {
    const { container } = render(
      <AvatarGroup>{avatars().slice(0, 1)}</AvatarGroup>,
    );
    const root = container.firstElementChild;

    expect(root).toHaveAttribute("data-count", "1");
    expect(root?.querySelectorAll("[data-slot='avatar-group-item']")).toHaveLength(1);
    expect(root?.querySelector("[data-slot='avatar-group-overflow']")).toBeNull();
    expect(screen.getByRole("img", { name: "Ada Lovelace" })).toHaveTextContent("AL");
  });

  it("renders every Avatar in source order with closed visual defaults", () => {
    const { container } = render(<AvatarGroup>{avatars().slice(0, 3)}</AvatarGroup>);
    const root = container.querySelector(".brick-avatar-group");
    const items = root?.querySelectorAll("[data-slot='avatar-group-item']");

    expect(root?.tagName).toBe("DIV");
    expect(root).toHaveAttribute("data-slot", "avatar-group");
    expect(root).toHaveAttribute("data-size", "md");
    expect(root).toHaveAttribute("data-shape", "circle");
    expect(root).toHaveAttribute("data-overlap", "md");
    expect(root).toHaveAttribute("data-stacking", "last-on-top");
    expect(root).not.toHaveAttribute("role");
    expect(items).toHaveLength(3);
    expect([...items!].map((item) => item.textContent)).toEqual(["AL", "GH", "KJ"]);
    for (const avatar of root!.querySelectorAll(".brick-avatar")) {
      expect(avatar).toHaveAttribute("data-size", "md");
      expect(avatar).toHaveAttribute("data-shape", "circle");
    }
  });

  it("exposes every overlap and stacking recipe without changing DOM order", () => {
    const overlaps: AvatarGroupOverlap[] = ["none", "sm", "md", "lg"];
    const stackingValues: AvatarGroupStacking[] = [
      "first-on-top",
      "last-on-top",
    ];
    const { container, rerender } = render(
      <AvatarGroup>{avatars().slice(0, 3)}</AvatarGroup>,
    );

    for (const overlap of overlaps) {
      rerender(<AvatarGroup overlap={overlap}>{avatars().slice(0, 3)}</AvatarGroup>);
      expect(container.firstElementChild).toHaveAttribute("data-overlap", overlap);
    }

    for (const stacking of stackingValues) {
      rerender(<AvatarGroup stacking={stacking}>{avatars().slice(0, 3)}</AvatarGroup>);
      const items = container.querySelectorAll<HTMLElement>(
        "[data-slot='avatar-group-item']",
      );
      expect(container.firstElementChild).toHaveAttribute("data-stacking", stacking);
      expect([...items].map((item) => item.textContent)).toEqual(["AL", "GH", "KJ"]);
      expect(
        [...items].map((item) =>
          item.style.getPropertyValue("--brick-avatar-group-item-order"),
        ),
      ).toEqual(
        stacking === "first-on-top" ? ["3", "2", "1"] : ["1", "2", "3"],
      );
    }
  });

  it("reserves one explicit max slot for localized built-in overflow", () => {
    render(
      <AvatarGroup
        max={4}
        overflowLabel={(count) => `${count} more collaborators`}
        size="sm"
        shape="rounded"
      >
        {avatars()}
      </AvatarGroup>,
    );

    expect(screen.getByRole("img", { name: "2 more collaborators" })).toHaveTextContent(
      "+2",
    );
    expect(screen.queryByRole("img", { name: "Margaret Hamilton" })).toBeNull();
    expect(screen.queryByRole("img", { name: "Dorothy Vaughan" })).toBeNull();
    expect(screen.getAllByRole("img")).toHaveLength(4);
    expect(
      document.querySelector("[data-slot='avatar-group-overflow']"),
    ).toHaveAttribute("data-count", "2");
    expect(
      screen.getByRole("img", { name: "2 more collaborators" }).parentElement,
    ).toHaveAttribute("data-size", "sm");
  });

  it("uses the sole max=1 slot for overflow and normalizes invalid runtime budgets", () => {
    const { container, rerender } = render(
      <AvatarGroup max={1} overflowLabel={(count) => `${count} more collaborators`}>
        {avatars().slice(0, 3)}
      </AvatarGroup>,
    );

    const assertSingleOverflow = () => {
      expect(container.querySelectorAll("[data-slot='avatar-group-item']")).toHaveLength(0);
      expect(container.querySelectorAll(".brick-avatar-group__item")).toHaveLength(1);
      expect(container.querySelectorAll("[data-slot='avatar-group-overflow']")).toHaveLength(1);
      expect(screen.getByRole("img", { name: "3 more collaborators" })).toHaveTextContent("+3");
      expect(screen.queryByRole("img", { name: "Ada Lovelace" })).toBeNull();
    };

    assertSingleOverflow();
    for (const max of [0, -4, Number.NaN, Number.POSITIVE_INFINITY]) {
      rerender(
        <AvatarGroup max={max} overflowLabel={(count) => `${count} more collaborators`}>
          {avatars().slice(0, 3)}
        </AvatarGroup>,
      );
      assertSingleOverflow();
    }
  });

  it("uses external total without under-reporting direct children", () => {
    const { rerender } = render(
      <AvatarGroup max={4} overflowLabel={(count) => `${count} more`} total={12}>
        {avatars().slice(0, 3)}
      </AvatarGroup>,
    );
    expect(screen.getByRole("img", { name: "9 more" })).toHaveTextContent("+9");

    rerender(
      <AvatarGroup max={4} overflowLabel={(count) => `${count} more`} total={1}>
        {avatars()}
      </AvatarGroup>,
    );
    expect(screen.getByRole("img", { name: "2 more" })).toHaveTextContent("+2");

    rerender(
      <AvatarGroup max={4} overflowLabel={(count) => `${count} more`} total={Number.NaN}>
        {avatars()}
      </AvatarGroup>,
    );
    expect(screen.getByRole("img", { name: "2 more" })).toHaveTextContent("+2");
  });

  it("delegates custom overflow semantics and content to the renderer", () => {
    const onClick = vi.fn();
    render(
      <AvatarGroup
        max={3}
        renderOverflow={(count) => (
          <button onClick={onClick} type="button">
            Show {count} more
          </button>
        )}
      >
        {avatars()}
      </AvatarGroup>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Show 3 more" }));
    expect(onClick).toHaveBeenCalledOnce();
    expect(screen.getAllByRole("img")).toHaveLength(2);
  });

  it("preserves host, native props, root class/style/slot, event, and ref", () => {
    const ref = createRef<HTMLElement>();
    const onClick = vi.fn();
    const { container } = render(
      <AvatarGroup
        aria-label="Reviewers"
        as="span"
        className="consumer-group"
        onClick={onClick}
        ref={ref}
        role="group"
        slot="reviewer-stack"
        style={{ marginInlineStart: 4 }}
      >
        {avatars().slice(0, 2)}
      </AvatarGroup>,
    );

    const root = container.firstElementChild;
    fireEvent.click(root!);
    expect(root?.tagName).toBe("SPAN");
    expect(root).toBe(ref.current);
    expect(root).toHaveClass("brick-avatar-group", "consumer-group");
    expect(root).toHaveAttribute("role", "group");
    expect(root).toHaveAttribute("aria-label", "Reviewers");
    expect(root).toHaveAttribute("data-slot", "reviewer-stack");
    expect(root).toHaveStyle({ marginInlineStart: "4px" });
    expect(onClick).toHaveBeenCalledOnce();
    expect(root).not.toHaveAttribute("overlap");
    expect(root).not.toHaveAttribute("stacking");
  });
});

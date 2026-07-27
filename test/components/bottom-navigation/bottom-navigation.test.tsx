import { createRef, useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { BottomNavigation } from "../../../src/bottom-navigation.js";

function DestinationContent({ label }: { label: string }) {
  return (
    <>
      <BottomNavigation.Icon><svg aria-hidden="true" /></BottomNavigation.Icon>
      <BottomNavigation.Label>{label}</BottomNavigation.Label>
    </>
  );
}

describe("BottomNavigation", () => {
  it("renders the complete default landmark, link, icon, and label anatomy", () => {
    const rootRef = createRef<HTMLElement>();
    const itemRef = createRef<HTMLElement>();
    render(
      <BottomNavigation.Root defaultValue="home" ref={rootRef}>
        <BottomNavigation.Item href="/home" ref={itemRef} value="home">
          <DestinationContent label="Home" />
        </BottomNavigation.Item>
        <BottomNavigation.Item href="/search" value="search">
          <DestinationContent label="Search" />
        </BottomNavigation.Item>
      </BottomNavigation.Root>,
    );

    const root = screen.getByRole("navigation", { name: "Bottom navigation" });
    const home = screen.getByRole("link", { name: "Home" });
    expect(rootRef.current).toBe(root);
    expect(itemRef.current).toBe(home);
    expect(root).toHaveClass("brick-bottom-navigation");
    expect(root).toHaveAttribute("data-arrangement", "equal");
    expect(root).toHaveAttribute("data-label-visibility", "always");
    expect(root).toHaveAttribute("data-layout", "full");
    expect(root).toHaveAttribute("data-position", "static");
    expect(root).toHaveAttribute("data-safe-area", "");
    expect(root).toHaveAttribute("data-selection", "indicator");
    expect(root).toHaveAttribute("data-selection-shape", "pill");
    expect(root).toHaveAttribute("data-size", "md");
    expect(root).toHaveAttribute("data-slot", "bottom-navigation");
    expect(root).toHaveAttribute("data-tone", "accent");
    expect(root).toHaveAttribute("data-variant", "outline");
    expect(root).not.toHaveAttribute("data-blurred");
    expect(root).not.toHaveAttribute("data-elevated");
    expect(home).toHaveClass("brick-bottom-navigation__item");
    expect(home).toHaveAttribute("href", "/home");
    expect(home).toHaveAttribute("aria-current", "page");
    expect(home).toHaveAttribute("data-state", "active");
    expect(home.querySelector(".brick-bottom-navigation__icon svg")).not.toBeNull();
    expect(home.querySelector(".brick-bottom-navigation__label")).toHaveTextContent("Home");
  });

  it.each([
    ["variant", ["solid", "soft", "outline", "ghost"]],
    ["tone", ["accent", "neutral"]],
    ["layout", ["full", "floating"]],
    ["arrangement", ["equal", "centered"]],
    ["size", ["sm", "md", "lg"]],
    ["position", ["static", "sticky", "absolute", "fixed"]],
    ["labelVisibility", ["always", "active", "hidden"]],
  ] as const)("forwards every %s recipe value", (prop, values) => {
    for (const value of values) {
      const { unmount } = render(
        <BottomNavigation.Root {...{ [prop]: value }}>
          <BottomNavigation.Item value="home"><DestinationContent label="Home" /></BottomNavigation.Item>
        </BottomNavigation.Root>,
      );
      expect(screen.getByRole("navigation")).toHaveAttribute(
        `data-${prop.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}`,
        value,
      );
      unmount();
    }
  });

  it("exposes independent effects and both valid selection-shape families", () => {
    const { rerender } = render(
      <BottomNavigation.Root blurred elevated selection="indicator" selectionShape="circle">
        <BottomNavigation.Item value="home">Home</BottomNavigation.Item>
      </BottomNavigation.Root>,
    );
    const root = screen.getByRole("navigation");
    expect(root).toHaveAttribute("data-blurred", "");
    expect(root).toHaveAttribute("data-elevated", "");
    expect(root).toHaveAttribute("data-selection", "indicator");
    expect(root).toHaveAttribute("data-selection-shape", "circle");

    rerender(
      <BottomNavigation.Root selection="item" selectionShape="square">
        <BottomNavigation.Item value="home">Home</BottomNavigation.Item>
      </BottomNavigation.Root>,
    );
    expect(root).toHaveAttribute("data-selection", "item");
    expect(root).toHaveAttribute("data-selection-shape", "square");
  });

  it("preserves uncontrolled and controlled destination selection", () => {
    const uncontrolledChange = vi.fn();
    const { rerender } = render(
      <BottomNavigation.Root defaultValue="home" onChange={uncontrolledChange}>
        <BottomNavigation.Item value="home">Home</BottomNavigation.Item>
        <BottomNavigation.Item value="activity">Activity</BottomNavigation.Item>
      </BottomNavigation.Root>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Activity" }));
    expect(uncontrolledChange).toHaveBeenCalledWith("activity");
    expect(screen.getByRole("button", { name: "Activity" })).toHaveAttribute("aria-current", "page");

    function Controlled() {
      const [value, setValue] = useState("home");
      return (
        <BottomNavigation.Root value={value} onChange={setValue} ariaLabel="Controlled destinations">
          <BottomNavigation.Item value="home">Home</BottomNavigation.Item>
          <BottomNavigation.Item value="activity">Activity</BottomNavigation.Item>
        </BottomNavigation.Root>
      );
    }
    rerender(<Controlled />);
    fireEvent.click(screen.getByRole("button", { name: "Activity" }));
    expect(screen.getByRole("button", { name: "Activity" })).toHaveAttribute("data-state", "active");
  });

  it("preserves label visibility, disabled hosts, native props, and safe-area opt out", () => {
    const disabledClick = vi.fn();
    render(
      <BottomNavigation.Root ariaLabel="Primary" data-owner="test" labelVisibility="hidden" safeArea={false}>
        <BottomNavigation.Item href="/home" value="home"><DestinationContent label="Home" /></BottomNavigation.Item>
        <BottomNavigation.Item disabled href="/settings" onClick={disabledClick} value="settings"><DestinationContent label="Settings" /></BottomNavigation.Item>
      </BottomNavigation.Root>,
    );
    const root = screen.getByRole("navigation", { name: "Primary" });
    const disabled = screen.getByText("Settings").closest("a")!;
    expect(root).not.toHaveAttribute("data-safe-area");
    expect(root).toHaveAttribute("data-label-visibility", "hidden");
    expect(root).toHaveAttribute("data-owner", "test");
    expect(disabled).not.toHaveAttribute("href");
    expect(disabled).toHaveAttribute("aria-disabled", "true");
    expect(disabled).toHaveAttribute("tabindex", "-1");
    expect(disabled).not.toHaveAttribute("data-label-visible");
    fireEvent.click(disabled);
    expect(disabledClick).toHaveBeenCalledOnce();
    expect(disabled).toHaveAttribute("data-state", "inactive");
  });

  it("preserves Root and Item composition without supporting wrappers", () => {
    render(
      <BottomNavigation.Root
        ariaLabel="Router destinations"
        defaultValue="home"
        render={<nav data-adapter="router-navigation" />}
      >
        <BottomNavigation.Item asChild value="home">
          <a data-router-link="" href="/home"><DestinationContent label="Home" /></a>
        </BottomNavigation.Item>
      </BottomNavigation.Root>,
    );
    const root = screen.getByRole("navigation", { name: "Router destinations" });
    const link = screen.getByRole("link", { name: "Home" });
    expect(root).toHaveAttribute("data-adapter", "router-navigation");
    expect(link).toHaveAttribute("data-router-link");
    expect(link).toHaveClass("brick-bottom-navigation__item");
    expect(link.querySelectorAll(".brick-bottom-navigation__icon")).toHaveLength(1);
  });

  it("forwards static-part composition, refs, classes, slots, and styles", () => {
    const iconRef = createRef<HTMLElement>();
    const labelRef = createRef<HTMLElement>();
    render(
      <BottomNavigation.Root>
        <BottomNavigation.Item value="home">
          <BottomNavigation.Icon asChild className="custom-icon" data-slot="custom-icon" ref={iconRef}>
            <span data-owner="icon"><svg aria-hidden="true" /></span>
          </BottomNavigation.Icon>
          <BottomNavigation.Label className="custom-label" ref={labelRef} render={<strong data-owner="label" />} style={{ color: "red" }}>
            Home
          </BottomNavigation.Label>
        </BottomNavigation.Item>
      </BottomNavigation.Root>,
    );
    const icon = document.querySelector("[data-owner='icon']")!;
    const label = screen.getByText("Home");
    expect(iconRef.current).toBe(icon);
    expect(labelRef.current).toBe(label);
    expect(icon).toHaveClass("brick-bottom-navigation__icon", "custom-icon");
    expect(icon).toHaveAttribute("data-slot", "custom-icon");
    expect(label.tagName).toBe("STRONG");
    expect(label).toHaveClass("brick-bottom-navigation__label", "custom-label");
    expect(label).toHaveStyle({ color: "rgb(255, 0, 0)" });
  });
});

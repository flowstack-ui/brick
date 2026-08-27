import { createRef, useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { NavList } from "../../../src/nav-list.js";

describe("NavList", () => {
  it("renders native defaults and complete link anatomy", () => {
    const ref = createRef<HTMLElement>();
    render(
      <NavList.Root aria-label="Components" ref={ref}>
        <NavList.List>
          <NavList.Item>
            <NavList.Link
              active
              description="Text entry"
              endIcon={<span>3</span>}
              href="/input"
              startIcon={<svg />}
            >
              Input
            </NavList.Link>
          </NavList.Item>
        </NavList.List>
      </NavList.Root>,
    );
    const root = screen.getByRole("navigation", { name: "Components" });
    const link = screen.getByRole("link", { name: /Input Text entry/ });
    expect(ref.current).toBe(root);
    expect(root).toHaveAttribute("data-variant", "soft");
    expect(root).toHaveAttribute("data-tone", "accent");
    expect(root).toHaveAttribute("data-size", "md");
    expect(root).toHaveAttribute("data-orientation", "vertical");
    expect(root.querySelector("ul > li > a")).toBe(link);
    expect(link).toHaveAttribute("aria-current", "page");
    expect(link).toHaveAttribute("data-has-description");
    expect(link.querySelectorAll("[aria-hidden='true']")).toHaveLength(2);
    expect(link.querySelector(".brick-nav-list__link-description")).toHaveTextContent("Text entry");
  });

  it("forwards recipes, ordered state, disabled behavior, native props, slots, and refs", () => {
    const linkRef = createRef<HTMLAnchorElement>();
    const click = vi.fn();
    render(
      <NavList.Root aria-label="Steps" orientation="horizontal" size="lg" tone="neutral" variant="outline">
        <NavList.List ordered>
          <NavList.Item disabled>
            <NavList.Link className="custom" data-owner="test" data-slot="custom-link" disabled href="/blocked" onClick={click} ref={linkRef} style={{ opacity: 0.5 }}>
              Blocked
            </NavList.Link>
          </NavList.Item>
        </NavList.List>
      </NavList.Root>,
    );
    const root = screen.getByRole("navigation");
    const disabled = screen.getByText("Blocked").closest("a")!;
    expect(root).toHaveAttribute("data-variant", "outline");
    expect(root).toHaveAttribute("data-tone", "neutral");
    expect(root).toHaveAttribute("data-size", "lg");
    expect(root.querySelector("ol")).toHaveAttribute("data-ordered");
    expect(linkRef.current).toBe(disabled);
    expect(disabled).not.toHaveAttribute("href");
    expect(disabled).toHaveAttribute("aria-disabled", "true");
    expect(disabled).toHaveAttribute("data-slot", "custom-link");
    expect(disabled).toHaveClass("brick-nav-list__link", "custom");
    fireEvent.click(disabled);
    expect(click).toHaveBeenCalledOnce();
  });

  it("preserves sections, generated relationships, and controlled disclosure", () => {
    function Example() {
      const [open, setOpen] = useState(false);
      return (
        <NavList.Root aria-label="Settings">
          <NavList.Section collapsible onOpenChange={setOpen} open={open}>
            <NavList.SectionLabel as="h3">Account</NavList.SectionLabel>
            <NavList.SectionTrigger startIcon={<svg data-testid="account-icon" />}>Toggle account</NavList.SectionTrigger>
            <NavList.SectionContent forceMount>
              <NavList.List><NavList.Item><NavList.Link href="/profile">Profile</NavList.Link></NavList.Item></NavList.List>
            </NavList.SectionContent>
          </NavList.Section>
        </NavList.Root>
      );
    }
    render(<Example />);
    const trigger = screen.getByRole("button", { name: "Toggle account" });
    const heading = screen.getByRole("heading", { level: 3, name: "Account" });
    const content = document.querySelector("[data-slot='nav-list-section-content']")!;
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByTestId("account-icon").parentElement).toHaveClass("brick-nav-list__link-start");
    expect(content).toHaveAttribute("hidden");
    expect(content).toHaveAttribute("aria-labelledby", heading.id);
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(content).not.toHaveAttribute("hidden");
  });

  it("exposes the ghost current-destination recipe", () => {
    render(
      <NavList.Root aria-label="Ghost navigation" variant="ghost">
        <NavList.List>
          <NavList.Item><NavList.Link active href="/current">Current</NavList.Link></NavList.Item>
        </NavList.List>
      </NavList.Root>,
    );

    expect(screen.getByRole("navigation", { name: "Ghost navigation" })).toHaveAttribute(
      "data-variant",
      "ghost",
    );
    expect(screen.getByRole("link", { name: "Current" })).not.toHaveAttribute("data-has-description");
  });

  it("preserves asChild anatomy without adding supporting wrappers", () => {
    render(
      <NavList.Root aria-label="Router">
        <NavList.List>
          <NavList.Item>
            <NavList.Link asChild active>
              <a href="/router" data-router="">Router link</a>
            </NavList.Link>
          </NavList.Item>
        </NavList.List>
      </NavList.Root>,
    );
    const link = screen.getByRole("link", { name: "Router link" });
    expect(link).toHaveAttribute("data-router");
    expect(link).toHaveClass("brick-nav-list__link");
    expect(link.querySelector(".brick-nav-list__link-content")).toBeNull();
  });
});

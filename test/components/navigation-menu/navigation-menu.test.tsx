import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { NavigationMenu } from "../../../src/navigation-menu.js";
import { Surface } from "../../../src/surface.js";

class ResizeObserverStub { observe() {} unobserve() {} disconnect() {} }
globalThis.ResizeObserver = ResizeObserverStub;

function Example({ orientation = "horizontal", size = "md" }: { orientation?: "horizontal" | "vertical"; size?: "sm" | "md" | "lg" }) {
  return <NavigationMenu.Root aria-label="Primary" defaultValue="products" orientation={orientation} size={size}><NavigationMenu.List><NavigationMenu.Item value="products"><NavigationMenu.Trigger>Products</NavigationMenu.Trigger><NavigationMenu.Content><NavigationMenu.Link href="/analytics">Analytics</NavigationMenu.Link></NavigationMenu.Content></NavigationMenu.Item><NavigationMenu.Item value="pricing"><NavigationMenu.Link active href="/pricing">Pricing</NavigationMenu.Link></NavigationMenu.Item><NavigationMenu.Indicator /></NavigationMenu.List><NavigationMenu.Viewport /></NavigationMenu.Root>;
}

describe("NavigationMenu", () => {
  it("preserves native navigation anatomy and adopted defaults", () => {
    render(<Example size="lg" />);
    const root = screen.getByRole("navigation", { name: "Primary" });
    expect(root).toHaveClass("brick-navigation-menu");
    expect(root).toHaveAttribute("data-size", "lg");
    expect(screen.getByRole("list")).toHaveClass("brick-navigation-menu__list");
    expect(screen.getByRole("button", { name: "Products" })).toHaveClass("brick-navigation-menu__trigger");
    expect(screen.getByRole("link", { name: "Pricing" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Pricing" })).toHaveAttribute("data-variant", "control");
    expect(document.querySelector(".brick-navigation-menu__indicator-arrow")).toHaveAttribute("data-slot", "navigation-menu-indicator-arrow");
    expect(document.querySelector(".brick-navigation-menu__indicator-arrow")).toHaveAttribute("aria-hidden", "true");
    expect(document.querySelector(".brick-navigation-menu__viewport")).toHaveAttribute("data-state", "open");
  });

  it("exposes the panel Link recipe on the same native destination", () => {
    render(<NavigationMenu.Root aria-label="Rich destinations" defaultValue="services"><NavigationMenu.List><NavigationMenu.Item value="services"><NavigationMenu.Trigger>Services</NavigationMenu.Trigger><NavigationMenu.Content><NavigationMenu.Link href="/services" variant="panel"><Surface inset="sm" level="subtle">Explore services</Surface></NavigationMenu.Link></NavigationMenu.Content></NavigationMenu.Item></NavigationMenu.List><NavigationMenu.Viewport /></NavigationMenu.Root>);
    const link = screen.getByRole("link", { name: "Explore services" });
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", "/services");
    expect(link).toHaveAttribute("data-variant", "panel");
    expect(link).not.toHaveAttribute("variant");
    expect(link.firstElementChild).toHaveClass("brick-surface");
    expect(link.firstElementChild).toHaveAttribute("data-inset", "sm");
  });

  it("keeps panel composition valid without requiring a Surface child", () => {
    render(<NavigationMenu.Root aria-label="Fallback destinations"><NavigationMenu.List><NavigationMenu.Item value="services"><NavigationMenu.Link href="/services" variant="panel"><span>Explore services</span></NavigationMenu.Link></NavigationMenu.Item></NavigationMenu.List></NavigationMenu.Root>);
    const link = screen.getByRole("link", { name: "Explore services" });
    expect(link).toHaveAttribute("data-variant", "panel");
    expect(link.firstElementChild).not.toHaveClass("brick-surface");
  });

  it("preserves custom Indicator content instead of adding the default arrow", () => {
    render(<NavigationMenu.Root aria-label="Custom indicator" defaultValue="products"><NavigationMenu.List><NavigationMenu.Item value="products"><NavigationMenu.Trigger>Products</NavigationMenu.Trigger><NavigationMenu.Content>Products panel</NavigationMenu.Content></NavigationMenu.Item><NavigationMenu.Indicator><span data-testid="custom-indicator" /></NavigationMenu.Indicator></NavigationMenu.List><NavigationMenu.Viewport /></NavigationMenu.Root>);
    expect(screen.getByTestId("custom-indicator")).toBeInTheDocument();
    expect(document.querySelector(".brick-navigation-menu__indicator-arrow")).not.toBeInTheDocument();
  });

  it("supports explicit vertical orientation and native link activation", async () => {
    const user = userEvent.setup();
    render(<Example orientation="vertical" />);
    expect(screen.getByRole("navigation")).toHaveAttribute("data-orientation", "vertical");
    expect(screen.getByRole("list")).toHaveAttribute("data-orientation", "vertical");
    await user.click(screen.getByRole("button", { name: "Products" }));
    expect(document.querySelector(".brick-navigation-menu__viewport")).not.toBeInTheDocument();
  });
});

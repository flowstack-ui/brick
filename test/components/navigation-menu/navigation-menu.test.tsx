import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { NavigationMenu } from "../../../src/navigation-menu.js";

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
    expect(document.querySelector(".brick-navigation-menu__indicator-arrow")).toHaveAttribute("data-slot", "navigation-menu-indicator-arrow");
    expect(document.querySelector(".brick-navigation-menu__indicator-arrow")).toHaveAttribute("aria-hidden", "true");
    expect(document.querySelector(".brick-navigation-menu__viewport")).toHaveAttribute("data-state", "open");
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

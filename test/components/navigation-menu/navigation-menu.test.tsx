import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { NavigationMenu } from "../../../src/navigation-menu.js";
import { Surface } from "../../../src/surface.js";
import { createRef } from "react";
import { useNavigationMenu } from "../../../src/navigation-menu.js";

class ResizeObserverStub { observe() {} unobserve() {} disconnect() {} }
globalThis.ResizeObserver = ResizeObserverStub;

function Example({ orientation = "horizontal", size = "md" }: { orientation?: "horizontal" | "vertical"; size?: "sm" | "md" | "lg" }) {
  return <NavigationMenu.Root aria-label="Primary" defaultValue="products" orientation={orientation} size={size}><NavigationMenu.List><NavigationMenu.Item value="products"><NavigationMenu.Trigger>Products</NavigationMenu.Trigger><NavigationMenu.Content><NavigationMenu.Link href="/analytics">Analytics</NavigationMenu.Link></NavigationMenu.Content></NavigationMenu.Item><NavigationMenu.Item value="pricing"><NavigationMenu.Link active href="/pricing">Pricing</NavigationMenu.Link></NavigationMenu.Item><NavigationMenu.Indicator /></NavigationMenu.List><NavigationMenu.Viewport /></NavigationMenu.Root>;
}

describe("NavigationMenu", () => {
  it.each([false, true])("preserves the composed Content host and its ref with viewport=%s", viewport => {
    const ref = createRef<HTMLDivElement>();
    render(<NavigationMenu.Root viewport={viewport} defaultValue="one"><NavigationMenu.List><NavigationMenu.Item value="one"><NavigationMenu.Trigger>One</NavigationMenu.Trigger><NavigationMenu.Content asChild ref={ref}><div data-testid="host"><NavigationMenu.Link href="#destination">Composed destination</NavigationMenu.Link></div></NavigationMenu.Content></NavigationMenu.Item></NavigationMenu.List>{viewport && <NavigationMenu.Viewport />}</NavigationMenu.Root>);
    expect(ref.current).toBe(screen.getByTestId("host"));
    expect(ref.current).toHaveClass("brick-navigation-menu__content");
    expect(ref.current?.firstElementChild).toBe(screen.getByRole("link", { name: "Composed destination" }));
    expect(screen.getByRole("link", { name: "Composed destination" })).toHaveAttribute("data-variant", "destination");
  });
  it("assigns destination presentation through shared Content and preserves explicit overrides", () => {
    render(<NavigationMenu.Root defaultValue="one"><NavigationMenu.List surface="raised"><NavigationMenu.Item value="one"><NavigationMenu.Trigger>One</NavigationMenu.Trigger><NavigationMenu.Content><NavigationMenu.Link href="#default">Destination</NavigationMenu.Link><NavigationMenu.Link variant="control" href="#override">Explicit control</NavigationMenu.Link></NavigationMenu.Content></NavigationMenu.Item><NavigationMenu.Item value="top"><NavigationMenu.Link href="#top">Top</NavigationMenu.Link></NavigationMenu.Item></NavigationMenu.List><NavigationMenu.Viewport /></NavigationMenu.Root>);
    expect(screen.getByRole("link", { name: "Destination" })).toHaveAttribute("data-variant", "destination");
    expect(screen.getByRole("link", { name: "Explicit control" })).toHaveAttribute("data-variant", "control");
    expect(screen.getByRole("link", { name: "Top" })).toHaveAttribute("data-variant", "control");
    expect(screen.getByRole("list")).toHaveAttribute("data-surface", "raised");
    expect(screen.getByRole("list")).not.toHaveAttribute("surface");
    expect(document.querySelector(".brick-navigation-menu__content")).toHaveAttribute("data-inset", "sm");
  });
  it("resets nested navigation links and keeps destination radius overrides on their owner", () => {
    const ref = createRef<HTMLAnchorElement>();
    render(<NavigationMenu.Root viewport={false} defaultValue="one"><NavigationMenu.List><NavigationMenu.Item value="one"><NavigationMenu.Trigger>One</NavigationMenu.Trigger><NavigationMenu.Content><NavigationMenu.Link asChild ref={ref} radius="none"><a href="#inner">Inner</a></NavigationMenu.Link><NavigationMenu.Sub><NavigationMenu.List><NavigationMenu.Item value="nested"><NavigationMenu.Link href="#nested">Nested top</NavigationMenu.Link></NavigationMenu.Item></NavigationMenu.List></NavigationMenu.Sub></NavigationMenu.Content></NavigationMenu.Item></NavigationMenu.List></NavigationMenu.Root>);
    expect(ref.current).toBe(screen.getByRole("link", { name: "Inner" }));
    expect(ref.current?.style.getPropertyValue("--brick-navigation-menu-destination-radius")).toBe("0px");
    expect(screen.getByRole("link", { name: "Nested top" })).toHaveAttribute("data-variant", "control");
  });
  it("replaces or removes automatic artwork and preserves asChild trigger hosts", () => {
    render(<NavigationMenu.Root><NavigationMenu.List>
      <NavigationMenu.Item value="default"><NavigationMenu.Trigger>Default</NavigationMenu.Trigger></NavigationMenu.Item>
      <NavigationMenu.Item value="custom"><NavigationMenu.Trigger asChild indicator={<span data-testid="replacement">+</span>}><button>Custom</button></NavigationMenu.Trigger></NavigationMenu.Item>
      <NavigationMenu.Item value="none"><NavigationMenu.Trigger indicator={null}>None</NavigationMenu.Trigger></NavigationMenu.Item>
    </NavigationMenu.List></NavigationMenu.Root>);
    expect(screen.getByRole("button", { name: "Default" }).querySelector(".brick-navigation-menu__chevron")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Custom" }).querySelectorAll(".brick-navigation-menu__chevron")).toHaveLength(0);
    expect(screen.getByRole("button", { name: "Custom" })).toContainElement(screen.getByTestId("replacement"));
    expect(screen.getByRole("button", { name: "None" }).querySelector(".brick-navigation-menu__adornment")).not.toBeInTheDocument();
  });
  it("forwards the real inline Content ref and preserves nested inline presentation", () => {
    const ref = createRef<HTMLDivElement>();
    render(<NavigationMenu.Root viewport={false} defaultValue="one"><NavigationMenu.List><NavigationMenu.Item value="one"><NavigationMenu.Trigger>One</NavigationMenu.Trigger><NavigationMenu.Content ref={ref}><NavigationMenu.Sub><NavigationMenu.List><NavigationMenu.Item value="two"><NavigationMenu.Link href="#two">Two</NavigationMenu.Link></NavigationMenu.Item></NavigationMenu.List></NavigationMenu.Sub></NavigationMenu.Content></NavigationMenu.Item></NavigationMenu.List></NavigationMenu.Root>);
    expect(ref.current).toHaveClass("brick-navigation-menu__content");
    expect(document.querySelector(".brick-navigation-menu__sub")).toHaveAttribute("data-viewport", "inline");
    expect(document.querySelector(".brick-navigation-menu__viewport")).not.toBeInTheDocument();
  });
  it("styles RootProvider while the public controller and Context share state", async () => {
    function Example() {
      const menu = useNavigationMenu();
      return <NavigationMenu.RootProvider value={menu} variant="plain" tone="accent"><NavigationMenu.List><NavigationMenu.Item value="one"><NavigationMenu.Trigger>One</NavigationMenu.Trigger><NavigationMenu.Content>Panel</NavigationMenu.Content></NavigationMenu.Item></NavigationMenu.List><NavigationMenu.Viewport /><NavigationMenu.Context>{api => <span role="status">{api.value ?? "closed"}</span>}</NavigationMenu.Context></NavigationMenu.RootProvider>;
    }
    render(<Example />);
    await userEvent.setup().click(screen.getByRole("button", { name: "One" }));
    expect(screen.getByRole("status")).toHaveTextContent("one");
    expect(screen.getByRole("button", { name: "One" })).toHaveAttribute("data-control-variant", "plain");
  });
  it("inherits navigation recipes and consumes explicit part overrides without leaking native props", () => {
    render(<NavigationMenu.Root tone="accent" variant="plain" defaultValue="one"><NavigationMenu.List><NavigationMenu.Item value="one"><NavigationMenu.Trigger radius="none">One</NavigationMenu.Trigger><NavigationMenu.Content inset="lg"><NavigationMenu.Link href="#two" tone="neutral" controlVariant="subtle">Two</NavigationMenu.Link></NavigationMenu.Content></NavigationMenu.Item></NavigationMenu.List><NavigationMenu.Viewport radius="surface" /></NavigationMenu.Root>);
    const trigger = screen.getByRole("button", { name: "One" });
    expect(trigger).toHaveAttribute("data-control-variant", "plain");
    expect(trigger).toHaveAttribute("data-tone", "accent");
    expect(trigger).not.toHaveAttribute("tone");
    expect(trigger.style.getPropertyValue("--brick-navigation-menu-control-radius")).toBe("0px");
    expect(screen.getByRole("link", { name: "Two" })).toHaveAttribute("data-tone", "neutral");
    expect(screen.getByRole("link", { name: "Two" })).toHaveAttribute("data-control-variant", "subtle");
    expect(document.querySelector(".brick-navigation-menu__content")).toHaveAttribute("data-inset", "lg");
    expect((document.querySelector(".brick-navigation-menu__viewport") as HTMLElement).style.getPropertyValue("--brick-navigation-menu-viewport-radius")).toBe("var(--brick-radius-surface)");
  });
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
    await waitFor(() => expect(document.querySelector(".brick-navigation-menu__viewport")).not.toBeInTheDocument());
  });
});

import { createElement, createRef } from "react";
import * as NavigationMenuModule from "../../../src/navigation-menu.js";
import { NavigationMenu, type NavigationMenuLinkVariant, type NavigationMenuRootProps, type NavigationMenuSize } from "../../../src/navigation-menu.js";
import { NavigationMenu as RootNavigationMenu } from "../../../src/index.js";
const ref = createRef<HTMLElement>();
const contentRef = createRef<HTMLDivElement>();
createElement(NavigationMenu.Content, { children: null, ref: contentRef, inset: "lg", onInteractOutside: event => event.preventDefault() });
createElement(NavigationMenu.Root, { children: null, viewport: false, openDelay: 100, closeDelay: 200, unmountOnExit: false });
createElement(NavigationMenu.Trigger, { children: "Custom", indicator: null });
createElement(NavigationMenu.ItemIndicator, { children: "+" });
createElement(NavigationMenu.Viewport, { align: "end", radius: "overlay" });
createElement(NavigationMenu.Viewport, { anchor: "navigation", align: "center" });
// @ts-expect-error Anchoring is owned by the navigation coordinate system.
createElement(NavigationMenu.Viewport, { anchor: "page" });
createElement(NavigationMenu.Link, { children: "Keep open", closeOnClick: false, onSelect: event => event.preventDefault() });
createElement(NavigationMenu.Context, { children: api => api.value });
const sizes: NavigationMenuSize[] = ["sm", "md", "lg"];
const linkVariants: NavigationMenuLinkVariant[] = ["control", "destination", "panel"];
createElement(NavigationMenu.List, { children: null, surface: "raised" });
// @ts-expect-error Surface presentation is a closed navigation recipe.
createElement(NavigationMenu.List, { children: null, surface: "accent" });
const props: NavigationMenuRootProps = { children: null, size: "md", orientation: "horizontal" };
createElement(NavigationMenu.Root, { ...props, ref });
createElement(NavigationMenu.Link, { children: "Pricing", href: "/pricing", active: true });
createElement(NavigationMenu.Link, { children: "Services", href: "/services", variant: "panel" });
createElement(NavigationMenu.IndicatorArrow, { className: "custom-arrow" });
createElement(NavigationMenuModule.Root, { ...props, ref });
createElement(NavigationMenuModule.Link, { children: "Docs", href: "/docs" });
createElement(NavigationMenuModule.IndicatorArrow, { className: "module-arrow" });
createElement(RootNavigationMenu.Root, props);
// @ts-expect-error closed size
createElement(NavigationMenu.Root, { size: "xl" });
createElement(NavigationMenu.Root, { children: null, tone: "accent" });
createElement(NavigationMenu.Root, { children: null, tone: "contrast" });
// @ts-expect-error Navigation uses identity/emphasis, not status semantics.
createElement(NavigationMenu.Root, { children: null, tone: "success" });
createElement(NavigationMenu.Trigger, { children: null, variant: "plain", radius: "none", tone: "neutral" });
createElement(NavigationMenu.Content, { children: null, inset: "none" });
createElement(NavigationMenu.Link, { children: null, variant: "panel", controlVariant: "plain", radius: "surface" });
// @ts-expect-error Closed semantic tone vocabulary.
createElement(NavigationMenu.Root, { tone: "purple" });
// @ts-expect-error Link variants are deliberately closed.
createElement(NavigationMenu.Link, { children: "Services", variant: "card" });
void sizes;
void linkVariants;

import { createElement, createRef } from "react";
import * as NavigationMenuModule from "../../../src/navigation-menu.js";
import { NavigationMenu, type NavigationMenuLinkVariant, type NavigationMenuRootProps, type NavigationMenuSize } from "../../../src/navigation-menu.js";
import { NavigationMenu as RootNavigationMenu } from "../../../src/index.js";
const ref = createRef<HTMLElement>();
const sizes: NavigationMenuSize[] = ["sm", "md", "lg"];
const linkVariants: NavigationMenuLinkVariant[] = ["control", "panel"];
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
// @ts-expect-error Navigation Menu has no visual tone
createElement(NavigationMenu.Root, { tone: "accent" });
// @ts-expect-error Link variants are deliberately closed.
createElement(NavigationMenu.Link, { children: "Services", variant: "card" });
void sizes;
void linkVariants;

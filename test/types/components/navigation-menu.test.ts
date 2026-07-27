import { createElement, createRef } from "react";
import { NavigationMenu, type NavigationMenuRootProps, type NavigationMenuSize } from "../../../src/navigation-menu.js";
import { NavigationMenu as RootNavigationMenu } from "../../../src/index.js";
const ref = createRef<HTMLElement>();
const sizes: NavigationMenuSize[] = ["sm", "md", "lg"];
const props: NavigationMenuRootProps = { children: null, size: "md", orientation: "horizontal" };
createElement(NavigationMenu.Root, { ...props, ref });
createElement(NavigationMenu.Link, { children: "Pricing", href: "/pricing", active: true });
createElement(RootNavigationMenu.Root, props);
// @ts-expect-error closed size
createElement(NavigationMenu.Root, { size: "xl" });
// @ts-expect-error Navigation Menu has no visual tone
createElement(NavigationMenu.Root, { tone: "accent" });
void sizes;

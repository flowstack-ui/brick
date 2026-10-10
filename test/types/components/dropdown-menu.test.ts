import { createElement, createRef } from "react";
import { DropdownMenu, type DropdownMenuItemTone, type DropdownMenuRootProps, type DropdownMenuSize } from "../../../src/dropdown-menu.js";
import { DropdownMenu as RootDropdownMenu } from "../../../src/index.js";
const ref = createRef<HTMLElement>();
const props: DropdownMenuRootProps = { children: null, size: "md" };
const sizes: DropdownMenuSize[] = ["sm", "md", "lg"];
const tones: DropdownMenuItemTone[] = ["neutral", "danger"];
createElement(DropdownMenu.Root, props);
createElement(DropdownMenu.Item, { children: createElement(DropdownMenu.ItemLabel, null, "Delete"), ref, tone: "danger", value: "delete" });
createElement(RootDropdownMenu.Root, props);
// @ts-expect-error closed size
createElement(DropdownMenu.Root, { children: null, size: "xl" });
// @ts-expect-error closed tone
createElement(DropdownMenu.Item, { children: null, tone: "blue", value: "x" });
void sizes; void tones;

createElement(DropdownMenu.Root, { children: null, size: "md", tone: "accent", variant: "solid" });
createElement(DropdownMenu.Content, { children: null, size: "sm", tone: "neutral", variant: "plain", inset: "none", itemInset: "none", leadingSpace: "reserve", radius: "sm" });
createElement(DropdownMenu.Item, { children: null, value: "layout", layout: "stack", itemInset: "none", tone: "success" });
createElement(DropdownMenu.SubTrigger, { children: null, value: "sub", indicator: null });
// @ts-expect-error leading space belongs to popup
createElement(DropdownMenu.Item, { children: null, value: "x", leadingSpace: "reserve" });
// @ts-expect-error unsupported variant
createElement(DropdownMenu.Root, { children: null, variant: "outline" });
// @ts-expect-error inset is a closed menu scale
createElement(DropdownMenu.Content, { children: null, inset: "2xl" });

import { createElement } from "react";
import { ContextMenu, type ContextMenuItemTone, type ContextMenuSize } from "../../../src/context-menu.js";
import { ContextMenu as RootContextMenu } from "../../../src/index.js";
const sizes: ContextMenuSize[] = ["sm", "md", "lg"];
const tones: ContextMenuItemTone[] = ["neutral", "danger"];
createElement(ContextMenu.Root, { children: createElement(ContextMenu.Trigger, null, "Target"), size: "md" });
createElement(RootContextMenu.Item, { children: "Remove", value: "remove", tone: "danger" });
// @ts-expect-error closed size
createElement(ContextMenu.Root, { children: null, size: "xl" });
// @ts-expect-error closed tone
createElement(ContextMenu.Item, { children: null, value: "x", tone: "blue" });
void sizes; void tones;

createElement(ContextMenu.Root, { children: null, size: "md", tone: "accent", variant: "solid" });
createElement(ContextMenu.Content, { children: null, size: "sm", tone: "neutral", variant: "plain", inset: "none", itemInset: "none", leadingSpace: "reserve", radius: "sm" });
createElement(ContextMenu.Item, { children: null, value: "layout", layout: "stack", itemInset: "none", tone: "success" });
createElement(ContextMenu.SubTrigger, { children: null, value: "sub", indicator: null });
// @ts-expect-error leading space belongs to popup
createElement(ContextMenu.Item, { children: null, value: "x", leadingSpace: "reserve" });
// @ts-expect-error unsupported variant
createElement(ContextMenu.Root, { children: null, variant: "outline" });
// @ts-expect-error inset is a closed menu scale
createElement(ContextMenu.Content, { children: null, inset: "2xl" });

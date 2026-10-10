import { createElement, createRef } from "react";
import { Menubar, type MenubarItemTone, type MenubarSize } from "../../../src/menubar.js";
import { Menubar as RootMenubar } from "../../../src/index.js";
const ref = createRef<HTMLDivElement>();
const sizes: MenubarSize[] = ["sm", "md", "lg"];
const tones: MenubarItemTone[] = ["neutral", "danger"];
createElement(Menubar.Root, { children: createElement(Menubar.Menu, { children: createElement(Menubar.Trigger, null, "File"), value: "file" }), ref, size: "md", orientation: "vertical" });
createElement(RootMenubar.Item, { children: "Close", value: "close", tone: "danger" });
// @ts-expect-error closed size
createElement(Menubar.Root, { children: null, size: "xl" });
// @ts-expect-error closed tone
createElement(Menubar.Item, { children: null, value: "x", tone: "blue" });
void sizes; void tones;

createElement(Menubar.Root, { children: null, size: "md", tone: "accent", variant: "solid", menuSize: "sm", barVariant: "surface", triggerVariant: "plain" });
createElement(Menubar.Content, { children: null, size: "sm", tone: "neutral", variant: "plain", inset: "none", itemInset: "none", leadingSpace: "reserve", radius: "sm" });
createElement(Menubar.Item, { children: null, value: "layout", layout: "stack", itemInset: "none", tone: "success" });
createElement(Menubar.SubTrigger, { children: null, value: "sub", indicator: null });
// @ts-expect-error leading space belongs to popup
createElement(Menubar.Item, { children: null, value: "x", leadingSpace: "reserve" });
// @ts-expect-error unsupported variant
createElement(Menubar.Root, { children: null, variant: "outline" });
// @ts-expect-error inset is a closed menu scale
createElement(Menubar.Content, { children: null, inset: "2xl" });

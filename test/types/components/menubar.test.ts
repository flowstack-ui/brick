import { createElement, createRef } from "react";
import { Menubar, type MenubarItemTone, type MenubarSize } from "../../../src/menubar.js";
import { Menubar as RootMenubar } from "../../../src/index.js";
const ref = createRef<HTMLDivElement>();
const sizes: MenubarSize[] = ["sm", "md", "lg"];
const tones: MenubarItemTone[] = ["neutral", "danger"];
createElement(Menubar.Root, { children: createElement(Menubar.Menu, { children: createElement(Menubar.Trigger, null, "File"), value: "file" }), ref, size: "md", orientation: "vertical" });
createElement(RootMenubar.Item, { children: "Close", value: "close", tone: "danger" });
// @ts-expect-error closed size
createElement(Menubar.Root, { size: "xl" });
// @ts-expect-error closed tone
createElement(Menubar.Item, { value: "x", tone: "accent" });
void sizes; void tones;

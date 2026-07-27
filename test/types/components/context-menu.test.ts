import { createElement } from "react";
import { ContextMenu, type ContextMenuItemTone, type ContextMenuSize } from "../../../src/context-menu.js";
import { ContextMenu as RootContextMenu } from "../../../src/index.js";
const sizes: ContextMenuSize[] = ["sm", "md", "lg"];
const tones: ContextMenuItemTone[] = ["neutral", "danger"];
createElement(ContextMenu.Root, { children: createElement(ContextMenu.Trigger, null, "Target"), size: "md" });
createElement(RootContextMenu.Item, { children: "Remove", value: "remove", tone: "danger" });
// @ts-expect-error closed size
createElement(ContextMenu.Root, { size: "xl" });
// @ts-expect-error closed tone
createElement(ContextMenu.Item, { value: "x", tone: "accent" });
void sizes; void tones;

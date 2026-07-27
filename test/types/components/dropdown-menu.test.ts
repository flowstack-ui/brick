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
createElement(DropdownMenu.Root, { size: "xl" });
// @ts-expect-error closed tone
createElement(DropdownMenu.Item, { tone: "accent", value: "x" });
void sizes; void tones;

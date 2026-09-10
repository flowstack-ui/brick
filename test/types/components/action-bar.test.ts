import type { ActionBarPlacement, ActionBarRootProps, ActionBarContentProps } from "../../../src/action-bar.js";
const placement: ActionBarPlacement = "bottom-start";
const root: ActionBarRootProps = { children: null, closeOnInteractOutside:false };
const content: ActionBarContentProps = { children:null, initialFocus:false, "aria-label":"Files" };
// @ts-expect-error ActionBar is not an anchored Popover.
const invalid: ActionBarPlacement = "top";
void [placement, root, content, invalid];

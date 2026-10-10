import { createElement } from "react";
import { Select, type SelectRootProps, type SelectSize } from "../../../src/select.js";

const valid: SelectRootProps = { children: null, size: "md", variant: "outline", shape: "pill" };
createElement(Select.Root, valid);
createElement(Select.Root, { children: null, variant: "underline" });
createElement(Select.Root, { children: null, size: { lg: "xl" }, variant: "ghost" });
createElement(Select.Trigger, { ref: null }, null);
createElement(Select.Arrow, null, createElement("span"));
const sizes: SelectSize[] = ["2xs", "xs", "sm", "md", "lg", "xl", "2xl"];
void sizes;

// @ts-expect-error underline has fixed sharp geometry
createElement(Select.Root, { children: null, variant: "underline", shape: "rounded" });
// @ts-expect-error Select has no multiple-selection mode
createElement(Select.Root, { children: null, multiple: true });

const surfaceRecipe: Pick<import("react").ComponentProps<typeof Select.Root>, "variant"> = { variant: "surface" };
void surfaceRecipe;
createElement(Select.Root, { children: null, items: [{value:"a",label:"Alpha"}], lazyMount: false, unmountOnExit: false, ids: {trigger:"trigger",content:"content"}, onFocusOutside: event => event.preventDefault() });
createElement(Select.ClearTrigger, { "aria-label": "Clear" });
createElement(Select.Trigger, { unstyled: true });

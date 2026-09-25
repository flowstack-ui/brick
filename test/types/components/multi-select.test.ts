import { createElement } from "react";
import { MultiSelect, type MultiSelectRootProps } from "../../../src/multi-select.js";

const valid: MultiSelectRootProps = { children: null, size: "md", variant: "outline", shape: "pill" };
createElement(MultiSelect.Root, valid);
createElement(MultiSelect.Root, { children: null, value: ["design"], onValueChange: (value) => value.join(",") });
createElement(MultiSelect.Root, { children: null, variant: "underline" });
createElement(MultiSelect.Root, { children: null, size: { lg: "xl" } });
createElement(MultiSelect.Trigger, { ref: null }, null);
createElement(MultiSelect.Arrow, null, createElement("span"));

// @ts-expect-error underline has fixed sharp geometry
createElement(MultiSelect.Root, { children: null, variant: "underline", shape: "rounded" });
// @ts-expect-error MultiSelect is always multiple and has no boolean mode
createElement(MultiSelect.Root, { children: null, multiple: true });

const surfaceRecipe: Pick<import("react").ComponentProps<typeof MultiSelect.Root>, "variant"> = { variant: "surface" };
void surfaceRecipe;
createElement(MultiSelect.Root, { children: null, items: [{value:"a",label:"Alpha"}], lazyMount: false, unmountOnExit: false, ids: {trigger:"trigger",content:"content"}, onFocusOutside: event => event.preventDefault() });
createElement(MultiSelect.ClearTrigger, { "aria-label": "Clear" });
createElement(MultiSelect.Trigger, { unstyled: true });

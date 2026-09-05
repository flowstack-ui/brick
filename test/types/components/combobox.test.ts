import { createElement } from "react";
import { Combobox, type ComboboxRootProps } from "../../../src/combobox.js";
const options = [{ value: "a", label: "A" }];
const valid: ComboboxRootProps = { children: null, options, size: "md", variant: "outline", shape: "pill" };
createElement(Combobox.Root, valid);
createElement(Combobox.Root, { children: null, options, size: { lg: "xl" } });
createElement(Combobox.Input, { ref: null });
createElement(Combobox.Trigger, { "aria-label": "Toggle options", ref: null });
// @ts-expect-error underline has fixed sharp geometry
createElement(Combobox.Root, { children: null, options, variant: "underline", shape: "rounded" });
// @ts-expect-error Combobox remains single-value
createElement(Combobox.Root, { children: null, options, multiple: true });

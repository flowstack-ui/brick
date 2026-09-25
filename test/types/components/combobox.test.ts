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
createElement(Combobox.Root, { children: null, options, multiple: true });
createElement(Combobox.Root, { children: null, options, multiple: true, values: ["a"], onValuesChange: values => values.map(value => value.toUpperCase()), variant: { initial: "outline", md: "subtle" } });
createElement(Combobox.Content, { strategy: "fixed", hideWhenDetached: true, placement: "top-start" });

const surfaceRecipe: Pick<import("react").ComponentProps<typeof Combobox.Root>, "variant"> = { variant: "surface" };
void surfaceRecipe;

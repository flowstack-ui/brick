import { Checkbox } from "../../../src/checkbox.js";
import { createElement } from "react";
void Checkbox;
const compound = createElement(Checkbox.Root, { size: "lg", required: true, children: createElement(Checkbox.Control, { name: "terms", checked: false, onCheckedChange() {} }) });
void compound;
// @ts-expect-error State belongs to Control, not the layout/field Root.
const rootState = createElement(Checkbox.Root, { checked: true, children: null });
// @ts-expect-error Text and links belong outside the interactive Control.
const nestedContent = createElement(Checkbox.Control, { children: "Label" });
// Control may intentionally override inherited presentation.
const controlSize = createElement(Checkbox.Control, { size: "lg" });
void rootState; void nestedContent; void controlSize;
// @ts-expect-error asChild must preserve Field's single-element child contract.
const invalidRootChild = createElement(Checkbox.Root, { asChild: true, children: "text" });
void invalidRootChild;

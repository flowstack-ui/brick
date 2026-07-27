import { createElement } from "react";
import { Select, type SelectRootProps } from "../../../src/select.js";

const valid: SelectRootProps = { children: null, size: "md", variant: "outline", shape: "pill" };
createElement(Select.Root, valid);
createElement(Select.Root, { children: null, variant: "underline" });
createElement(Select.Trigger, { ref: null }, null);
createElement(Select.Arrow, null, createElement("span"));

// @ts-expect-error underline has fixed sharp geometry
createElement(Select.Root, { children: null, variant: "underline", shape: "rounded" });
// @ts-expect-error Select has no multiple-selection mode
createElement(Select.Root, { children: null, multiple: true });

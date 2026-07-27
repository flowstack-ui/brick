import { createElement, createRef } from "react";
import {
  VisuallyHidden,
  type VisuallyHiddenRootProps,
} from "../../../src/visually-hidden.js";

const ref = createRef<HTMLSpanElement>();
const props: VisuallyHiddenRootProps = {
  children: "Search",
  className: "consumer-class",
  "data-slot": "accessible-name",
};

createElement(VisuallyHidden.Root, { ...props, ref });
createElement(VisuallyHidden.Root, { asChild: true }, createElement("strong", null, "Context"));
createElement(VisuallyHidden.Root, { render: createElement("em") }, "Details");

// @ts-expect-error VisuallyHidden has no visual recipe props
const invalid: VisuallyHiddenRootProps = { children: "Search", variant: "soft" };
void invalid;

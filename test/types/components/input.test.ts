import { createElement, createRef } from "react";
import {
  Input,
  type InputProps,
  type InputShape,
  type InputSize,
  type InputType,
  type InputVariant,
} from "../../../src/input.js";
import { Input as RootInput } from "../../../src/index.js";

const ref = createRef<HTMLInputElement>();
const variants: InputVariant[] = ["outline", "soft", "underline"];
const sizes: InputSize[] = ["2xs", "xs", "sm", "md", "lg", "xl", "2xl"];
const shapes: InputShape[] = ["sharp", "rounded", "pill"];
const types: InputType[] = [
  "text",
  "email",
  "password",
  "search",
  "tel",
  "url",
];

const props: InputProps = {
  "aria-label": "Email",
  clearLabel: "Clear email",
  clearable: true,
  inputClassName: "native-input",
  inputStyle: { letterSpacing: "0.02em" },
  shape: "pill",
  size: "lg",
  type: "email",
  variant: "soft",
};

createElement(Input, { ...props, ref });
createElement(Input, { "aria-label": "Responsive", size: { lg: "xl" } });
createElement(RootInput, { ...props, ref });

// @ts-expect-error underline has fixed sharp geometry
createElement(Input, { "aria-label": "Query", shape: "rounded", variant: "underline" });
// @ts-expect-error multiline content belongs to Textarea
createElement(Input, { "aria-label": "Message", type: "textarea" });
// @ts-expect-error numeric stepping belongs to Number Input
createElement(Input, { "aria-label": "Quantity", type: "number" });
// @ts-expect-error Input has no children API
createElement(Input, { "aria-label": "Query", children: "Unsupported" });
// @ts-expect-error Field owns visual status and messages
createElement(Input, { "aria-label": "Query", status: "error" });

void variants;
void sizes;
void shapes;
void types;

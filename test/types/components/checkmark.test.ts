import { createElement, createRef } from "react";
import {
  Checkmark,
  type CheckmarkProps,
  type CheckmarkSize,
  type CheckmarkTone,
  type CheckmarkVariant,
} from "../../../src/checkmark.js";

createElement(Checkmark, { filled: true, variant: "inverted" });
createElement(Checkmark, {
  invalid: true,
  variant: { initial: "outline", md: "solid", xl: "subtle" },
  size: { sm: "lg" },
});
// @ts-expect-error There is no interactive input state on a passive mark.
createElement(Checkmark, { value: "selected" });
// @ts-expect-error Selection changes belong to the semantic parent.
createElement(Checkmark, { onCheckedChange: () => {} });
const props: CheckmarkProps = {
  checked: true,
  disabled: false,
  size: "md",
  tone: "success",
  variant: "outline",
};
createElement(Checkmark, { ...props, ref: createRef<SVGSVGElement>() });
const sizes: CheckmarkSize[] = ["xs", "sm", "md", "lg"];
const tones: CheckmarkTone[] = [
  "neutral",
  "accent",
  "info",
  "success",
  "warning",
  "danger",
];
const variants: CheckmarkVariant[] = ["solid", "outline", "soft", "plain"];
// @ts-expect-error Checkmark is visual and does not accept interaction children.
createElement(Checkmark, { children: "Checked" });
void sizes;
void tones;
void variants;

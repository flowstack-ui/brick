import { createElement, createRef } from "react";
import {
  Radiomark,
  type RadiomarkProps,
  type RadiomarkSize,
  type RadiomarkTone,
  type RadiomarkVariant,
} from "../../../src/radiomark.js";

createElement(Radiomark, { filled: true, variant: "inverted" });
createElement(Radiomark, {
  invalid: true,
  variant: { initial: "outline", md: "solid", xl: "subtle" },
  size: { sm: "lg" },
});
// @ts-expect-error There is no interactive input state on a passive mark.
createElement(Radiomark, { value: "selected" });
// @ts-expect-error Selection changes belong to the semantic parent.
createElement(Radiomark, { onCheckedChange: () => {} });
const props: RadiomarkProps = {
  checked: true,
  disabled: false,
  size: "md",
  tone: "accent",
  variant: "solid",
};
createElement(Radiomark, { ...props, ref: createRef<HTMLSpanElement>() });
const sizes: RadiomarkSize[] = ["xs", "sm", "md", "lg"];
const tones: RadiomarkTone[] = [
  "neutral",
  "accent",
  "info",
  "success",
  "warning",
  "danger",
];
const variants: RadiomarkVariant[] = ["solid", "outline", "soft"];
createElement(Radiomark, {
  children: createElement("span", null, "✓"),
  tone: "contrast",
  size: { initial: "xs", md: "lg" },
  variant: { initial: "subtle", lg: "outline" },
});
void sizes;
void tones;
void variants;

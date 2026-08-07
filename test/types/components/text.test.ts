import { createElement, createRef } from "react";
import {
  Text,
  type TextAlign,
  type TextElement,
  type TextLineClamp,
  type TextProps,
  type TextTone,
  type TextVariant,
  type TextWeight,
  type TextWrap,
} from "../../../src/text.js";
import { Text as RootText } from "../../../src/index.js";

const ref = createRef<HTMLElement>();
const elements: TextElement[] = ["span", "p", "div", "h1", "h2", "h3", "h4", "h5", "h6"];
const variants: TextVariant[] = ["display", "title-lg", "title-md", "title-sm", "body-lg", "body-md", "body-sm", "caption", "eyebrow"];
const tones: TextTone[] = ["inherit", "primary", "secondary", "muted", "accent", "info", "success", "warning", "danger"];
const weights: TextWeight[] = ["inherit", "regular", "medium", "semibold"];
const aligns: TextAlign[] = ["start", "center", "end"];
const wraps: TextWrap[] = ["wrap", "nowrap", "balance", "pretty"];
const clamps: TextLineClamp[] = [2, 3, 4, 5, 6];
const props: TextProps = {
  "aria-describedby": "description",
  as: "h2",
  children: "Account settings",
  className: "consumer-text",
  lang: "en",
  onClick: () => undefined,
  style: { maxInlineSize: 320 },
  tone: "secondary",
  variant: "title-sm",
};

createElement(Text, { ...props, ref });
createElement(RootText, { ...props, ref });
createElement(Text, { children: "Summary", truncate: true });
createElement(Text, { children: "Summary", lineClamp: 3 });

// @ts-expect-error Text requires children.
createElement(Text, {});
// @ts-expect-error Text hosts are deliberately closed.
createElement(Text, { as: "a", children: "Link" });
// @ts-expect-error Visual variants do not use semantic heading names.
createElement(Text, { children: "Title", variant: "h1" });
// @ts-expect-error Brand color is accent, not primary text tone.
createElement(Text, { children: "Copy", tone: "brand" });
// @ts-expect-error Physical alignment is excluded.
createElement(Text, { align: "left", children: "Copy" });
// @ts-expect-error Arbitrary numeric weight is excluded.
createElement(Text, { children: "Copy", weight: 700 });
// @ts-expect-error Clamp values are bounded.
createElement(Text, { children: "Copy", lineClamp: 7 });
// @ts-expect-error Truncate and lineClamp are mutually exclusive.
createElement(Text, { children: "Copy", lineClamp: 3, truncate: true });
// @ts-expect-error Links belong to Link.
createElement(Text, { children: "Copy", href: "/docs" });
// @ts-expect-error Text has no asChild composition API.
createElement(Text, { asChild: true, children: "Copy" });

void elements;
void variants;
void tones;
void weights;
void aligns;
void wraps;
void clamps;

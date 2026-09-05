import { createElement, createRef } from "react";
import {
  IconButton,
  type IconButtonProps,
  type IconButtonShape,
  type IconButtonSize,
  type IconButtonTone,
  type IconButtonVariant,
} from "../../../src/icon-button.js";

const variant: IconButtonVariant = "soft";
const tone: IconButtonTone = "accent";
const size: IconButtonSize = "lg";
const shape: IconButtonShape = "circle";

const action: IconButtonProps = {
  "aria-label": "Search workspace",
  children: createElement("svg"),
  className: "consumer-action",
  "data-slot": "search-action",
  onPress: () => undefined,
  shape,
  size,
  style: { borderWidth: "2px" },
  tone,
  type: "submit",
  variant,
};
const responsiveAction: IconButtonProps = {
  "aria-label": "Responsive search",
  children: createElement("svg"),
  size: { md: "md", xl: "2xl" },
};
const actionWithRef = createElement(IconButton, {
  ...action,
  ref: createRef<HTMLElement>(),
});

const link: IconButtonProps = {
  "aria-label": "Read documentation",
  children: createElement("svg"),
  href: "/docs",
  rel: "author",
  target: "_blank",
};

const rendered: IconButtonProps = {
  "aria-label": "Rendered link",
  children: createElement("svg"),
  render: createElement("a", { href: "/rendered" }),
};

const composed: IconButtonProps = {
  "aria-label": "Composed action",
  asChild: true,
  children: createElement("button", null, createElement("svg")),
};

void IconButton;
void action;
void responsiveAction;
void actionWithRef;
void link;
void rendered;
void composed;

const invalidVariant: IconButtonProps = {
  "aria-label": "Invalid",
  children: createElement("svg"),
  // @ts-expect-error IconButton variants are a closed recipe set.
  variant: "link",
};

const invalidTone: IconButtonProps = {
  "aria-label": "Invalid",
  children: createElement("svg"),
  // @ts-expect-error IconButton tones are a closed recipe set.
  tone: "brand",
};

const invalidSize: IconButtonProps = {
  "aria-label": "Invalid",
  children: createElement("svg"),
  // @ts-expect-error IconButton sizes are a closed recipe set.
  size: "3xl",
};

const invalidShape: IconButtonProps = {
  "aria-label": "Invalid",
  children: createElement("svg"),
  // @ts-expect-error IconButton shapes are a closed recipe set.
  shape: "pill",
};

const invalidColor: IconButtonProps = {
  "aria-label": "Invalid",
  children: createElement("svg"),
  // @ts-expect-error Atom color is intentionally replaced by Brick tone.
  color: "red",
};

// @ts-expect-error asChild requires one React element.
const invalidComposedChild: IconButtonProps = {
  "aria-label": "Invalid",
  asChild: true,
  children: "not an element",
};

// @ts-expect-error asChild and render are mutually exclusive.
const invalidDoubleComposition: IconButtonProps = {
  "aria-label": "Invalid",
  asChild: true,
  children: createElement("a"),
  render: createElement("button"),
};

void invalidVariant;
void invalidTone;
void invalidSize;
void invalidShape;
void invalidColor;
void invalidComposedChild;
void invalidDoubleComposition;

import { createElement, createRef } from "react";
import {
  Badge,
  type BadgeProps,
  type BadgeShape,
  type BadgeSize,
  type BadgeTone,
  type BadgeVariant,
} from "../../../src/badge.js";

const variants: BadgeVariant[] = ["soft", "solid", "outline"];
const tones: BadgeTone[] = [
  "neutral",
  "accent",
  "info",
  "success",
  "warning",
  "danger",
];
const sizes: BadgeSize[] = ["sm", "md", "lg"];
const shapes: BadgeShape[] = ["rounded", "pill"];
const ref = createRef<HTMLSpanElement>();
const nativeProps: BadgeProps = {
  "aria-describedby": "status-help",
  children: "Published",
  className: "consumer-badge",
  onClick: () => undefined,
  render: createElement("span"),
  shape: "pill",
  size: "lg",
  style: { marginInlineStart: 4 },
  title: "Release status",
  tone: "success",
  variant: "solid",
};

createElement(Badge, nativeProps);
createElement(Badge, { children: "Status", ref });
createElement(Badge, { asChild: true }, createElement("span", null, "Status"));
void variants;
void tones;
void sizes;
void shapes;

// @ts-expect-error Badge variants are closed.
const invalidVariant: BadgeVariant = "ghost";
// @ts-expect-error Badge tones are closed.
const invalidTone: BadgeTone = "brand";
// @ts-expect-error Badge sizes are closed.
const invalidSize: BadgeSize = "xl";
// @ts-expect-error Badge shapes are closed.
const invalidShape: BadgeShape = "circle";
// @ts-expect-error Native color is excluded in favor of semantic tone.
const invalidColor: BadgeProps = { children: "Status", color: "red" };
// @ts-expect-error Badge has no interactive selected state.
const invalidSelected: BadgeProps = { children: "Status", selected: true };
const invalidRemove: BadgeProps = {
  children: "Status",
  // @ts-expect-error Badge has no removal action API.
  onRemove: () => undefined,
};

void invalidVariant;
void invalidTone;
void invalidSize;
void invalidShape;
void invalidColor;
void invalidSelected;
void invalidRemove;

import { createElement, createRef } from "react";
import { Avatar } from "../../../src/avatar.js";
import {
  AvatarGroup,
  type AvatarGroupElement,
  type AvatarGroupOverlap,
  type AvatarGroupProps,
  type AvatarGroupStacking,
} from "../../../src/avatar-group.js";

const elements: AvatarGroupElement[] = ["div", "span"];
const overlaps: AvatarGroupOverlap[] = ["none", "sm", "md", "lg"];
const stacking: AvatarGroupStacking[] = ["first-on-top", "last-on-top"];
const children = [
  createElement(Avatar, { alt: "Ada", fallback: "AL", key: "ada" }),
  createElement(Avatar, { alt: "Grace", fallback: "GH", key: "grace" }),
];

const unbounded: AvatarGroupProps = {
  "aria-label": "Reviewers",
  as: "span",
  children,
  className: "consumer-group",
  overlap: "lg",
  role: "group",
  shape: "rounded",
  size: "sm",
  stacking: "first-on-top",
  style: { marginInlineStart: 4 },
};
const bounded: AvatarGroupProps = {
  children,
  max: 2,
  overflowLabel: (count) => `${count} more reviewers`,
  total: 8,
};
const custom: AvatarGroupProps = {
  children,
  max: 2,
  renderOverflow: (count) => createElement("button", null, count),
};

createElement(AvatarGroup, unbounded);
createElement(AvatarGroup, { children, ref: createRef<HTMLElement>() });
createElement(AvatarGroup, bounded);
createElement(AvatarGroup, custom);
void elements;
void overlaps;
void stacking;

// @ts-expect-error Built-in overflow requires a localized label.
const invalidMissingLabel: AvatarGroupProps = { children, max: 2 };
// @ts-expect-error total has no meaning without an explicit max.
const invalidTotalOnly: AvatarGroupProps = { children, total: 8 };
// @ts-expect-error Choose built-in or custom overflow semantics, not both.
const invalidBothRenderers: AvatarGroupProps = {
  children,
  max: 2,
  overflowLabel: (count) => `${count} more`,
  renderOverflow: (count) => count,
};
// @ts-expect-error Overlap values are closed.
const invalidOverlap: AvatarGroupOverlap = "xl";
// @ts-expect-error Stacking values are closed.
const invalidStacking: AvatarGroupStacking = "reverse";
// @ts-expect-error Host values are closed.
const invalidElement: AvatarGroupElement = "section";

void invalidMissingLabel;
void invalidTotalOnly;
void invalidBothRenderers;
void invalidOverlap;
void invalidStacking;
void invalidElement;

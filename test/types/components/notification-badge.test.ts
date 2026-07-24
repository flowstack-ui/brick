import { createElement, createRef } from "react";
import {
  NotificationBadge,
  type NotificationBadgeOverlap,
  type NotificationBadgePlacement,
  type NotificationBadgeProps,
  type NotificationBadgeSize,
} from "../../../src/badge.js";

const placements: NotificationBadgePlacement[] = [
  "top-start",
  "top-end",
  "bottom-start",
  "bottom-end",
];
const overlaps: NotificationBadgeOverlap[] = ["rectangular", "circular"];
const sizes: NotificationBadgeSize[] = ["sm", "md", "lg"];
const child = createElement("button", { "aria-label": "Inbox" }, "Inbox");
const countProps: NotificationBadgeProps = {
  children: child,
  count: 125,
  max: 99,
  overlap: "circular",
  placement: "bottom-start",
  showZero: true,
  size: "lg",
  tone: "warning",
};
const dotProps: NotificationBadgeProps = {
  children: child,
  dot: true,
  invisible: true,
  render: createElement("span"),
};

createElement(NotificationBadge, countProps);
createElement(NotificationBadge, dotProps);
createElement(NotificationBadge, {
  children: child,
  count: 4,
  ref: createRef<HTMLSpanElement>(),
});
void placements;
void overlaps;
void sizes;

// @ts-expect-error Placements are logical and closed.
const invalidPlacement: NotificationBadgePlacement = "top-left";
// @ts-expect-error Overlap models are closed.
const invalidOverlap: NotificationBadgeOverlap = "square";
// @ts-expect-error Sizes are closed.
const invalidSize: NotificationBadgeSize = "xl";
// @ts-expect-error Dot mode excludes count.
const invalidDotCount: NotificationBadgeProps = {
  children: child,
  count: 4,
  dot: true,
};
// @ts-expect-error Dot mode excludes maximum formatting.
const invalidDotMax: NotificationBadgeProps = {
  children: child,
  dot: true,
  max: 9,
};
const invalidTextChild: NotificationBadgeProps = {
  // @ts-expect-error NotificationBadge requires exactly one React element child.
  children: "Inbox",
  count: 4,
};
const invalidAsChild: NotificationBadgeProps = {
  // @ts-expect-error The positioning wrapper cannot use asChild.
  asChild: true,
  children: child,
  count: 4,
};
// @ts-expect-error Count mode requires count.
const invalidMissingMode: NotificationBadgeProps = { children: child };

void invalidPlacement;
void invalidOverlap;
void invalidSize;
void invalidDotCount;
void invalidDotMax;
void invalidTextChild;
void invalidAsChild;
void invalidMissingMode;

import { createElement, createRef } from "react";
import {
  Feed,
  type FeedDensity,
  type FeedDividerStrength,
  type FeedItemProps,
  type FeedRootProps,
  type FeedVariant,
} from "../../../src/feed.js";
import { Feed as RootFeed } from "../../../src/index.js";

const rootRef = createRef<HTMLElement>();
const itemRef = createRef<HTMLElement>();
const variants: FeedVariant[] = ["plain", "divided", "outline"];
const densities: FeedDensity[] = ["compact", "comfortable"];
const dividerStrengths: FeedDividerStrength[] = ["subtle", "default"];
const rootProps: FeedRootProps = {
  "aria-label": "Activity",
  busy: true,
  children: null,
  className: "consumer-feed",
  density: "compact",
  dividerStrength: "default",
  onKeyDown: (event) => event.preventDefault(),
  setSize: "unknown",
  style: { maxWidth: 640 },
  variant: "outline",
};
const itemProps: FeedItemProps = {
  "aria-labelledby": "activity-title",
  asChild: true,
  children: createElement("article"),
  index: 0,
  position: 1,
  render: createElement("article"),
  setSize: 3,
  tabIndex: 0,
};

createElement(Feed.Root, { ...rootProps, ref: rootRef }, createElement(Feed.Item, { ...itemProps, ref: itemRef }));
void RootFeed;
void variants;
void densities;
void dividerStrengths;

// @ts-expect-error Feed variants are closed.
const invalidVariant: FeedVariant = "cards";
// @ts-expect-error Feed density is closed.
const invalidDensity: FeedDensity = "spacious";
// @ts-expect-error Feed divider strength is closed.
const invalidDividerStrength: FeedDividerStrength = "strong";
// @ts-expect-error Atom owns aria-busy through busy.
const invalidBusy: FeedRootProps = { "aria-busy": true, children: null };
// @ts-expect-error Atom owns position metadata through position/index.
const invalidPosition: FeedItemProps = { "aria-posinset": 2, children: null };
// @ts-expect-error Feed does not own application loading UI.
const invalidLoading: FeedRootProps = { children: null, loading: true };
// @ts-expect-error Feed does not accept an application data array.
const invalidItems: FeedRootProps = { children: null, items: [] };
void invalidVariant;
void invalidDensity;
void invalidDividerStrength;
void invalidBusy;
void invalidPosition;
void invalidLoading;
void invalidItems;

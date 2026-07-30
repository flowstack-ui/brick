import { createElement, createRef } from "react";
import {
  Feed,
  type FeedDensity,
  type FeedItemProps,
  type FeedRootProps,
  type FeedVariant,
} from "../../../src/feed.js";
import { Feed as RootFeed } from "../../../src/index.js";

const rootRef = createRef<HTMLElement>();
const itemRef = createRef<HTMLElement>();
const variants: FeedVariant[] = ["plain", "divided", "outline"];
const densities: FeedDensity[] = ["compact", "comfortable"];
const rootProps: FeedRootProps = {
  "aria-label": "Activity",
  busy: true,
  children: null,
  className: "consumer-feed",
  density: "compact",
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

// @ts-expect-error Feed variants are closed.
const invalidVariant: FeedVariant = "cards";
// @ts-expect-error Feed density is closed.
const invalidDensity: FeedDensity = "spacious";
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
void invalidBusy;
void invalidPosition;
void invalidLoading;
void invalidItems;

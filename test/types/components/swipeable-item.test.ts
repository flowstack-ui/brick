import { createElement, createRef } from "react";
import {
  SwipeableItem,
  type SwipeableItemActionsProps,
  type SwipeableItemContentProps,
  type SwipeableItemRootProps,
  type SwipeableItemVariant,
} from "../../../src/swipeable-item.js";
import { SwipeableItem as RootSwipeableItem } from "../../../src/index.js";

const rootRef = createRef<HTMLDivElement>();
const contentRef = createRef<HTMLElement>();
const actionsRef = createRef<HTMLElement>();
const variant: SwipeableItemVariant = "outline";
const rootProps: SwipeableItemRootProps = { children: null, defaultOpenSide: null, dir: "rtl", threshold: 0.4, variant };
const contentProps: SwipeableItemContentProps = { children: "Message", tabIndex: 0 };
const actionsProps: SwipeableItemActionsProps = { "aria-label": "Message actions", children: null, side: "end" };
createElement(SwipeableItem.Root, { ...rootProps, ref: rootRef },
  createElement(SwipeableItem.Content, { ...contentProps, ref: contentRef }),
  createElement(SwipeableItem.Actions, { ...actionsProps, ref: actionsRef }),
);
void RootSwipeableItem;

// @ts-expect-error variants are closed.
const invalidVariant: SwipeableItemVariant = "soft";
const fullSwipe: SwipeableItemRootProps = { children: null, fullSwipeSides: ["end"], onFullSwipe: () => {}, fullSwipeThreshold: 0.8, radius: "none" };
// @ts-expect-error only logical sides are supported.
const invalidFullSwipe: SwipeableItemRootProps = { fullSwipeSides: ["left"] };
// @ts-expect-error Actions requires an authored localized group label.
const missingActionsLabel: SwipeableItemActionsProps = { children: null, side: "start" };
void invalidVariant;
void invalidFullSwipe;
void fullSwipe;
void missingActionsLabel;

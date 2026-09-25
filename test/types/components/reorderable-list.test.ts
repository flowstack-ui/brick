import { createElement, createRef } from "react";
import {
  ReorderableList,
  type ReorderableListActionsProps,
  type ReorderableListContentProps,
  type ReorderableListHandleProps,
  type ReorderableListItemProps,
  type ReorderableListMoveProps,
  type ReorderableListRootProps,
  type ReorderableListSize,
  type ReorderableListVariant,
} from "../../../src/reorderable-list.js";
import { ReorderableList as RootReorderableList } from "../../../src/index.js";

const rootRef = createRef<HTMLOListElement>();
const itemRef = createRef<HTMLLIElement>();
const handleRef = createRef<HTMLElement>();
const contentRef = createRef<HTMLDivElement>();
const actionsRef = createRef<HTMLDivElement>();
const size: ReorderableListSize = "lg";
const variant: ReorderableListVariant = "soft";
const rootProps: ReorderableListRootProps = {
  children: null,
  getItemLabel: (value) => value,
  items: ["a"],
  onItemsChange: () => {},
  orientation: "vertical",
  layout: "grid",
  displacement: "auto",
  size,
  variant,
};
const itemProps: ReorderableListItemProps = { children: null, value: "a" };
const handleProps: ReorderableListHandleProps = { "aria-label": "Reorder A", children: "Handle" };
const moveProps: ReorderableListMoveProps = { "aria-label": "Move A later", children: "Later" };
const contentProps: ReorderableListContentProps = { children: "A" };
const actionsProps: ReorderableListActionsProps = { children: null };
createElement(ReorderableList.Root, { ...rootProps, size: { initial: "sm", md: "lg" }, variant: { lg: "surface" }, radius: "none", motion: false, activation: { distance: 10 }, autoScroll: false });
createElement(ReorderableList.Preview, { ref: createRef<HTMLDivElement>(), children: (value: string) => value });
createElement(ReorderableList.Root, { ...rootProps, ref: rootRef },
  createElement(ReorderableList.Item, { ...itemProps, ref: itemRef },
    createElement(ReorderableList.Handle, { ...handleProps, ref: handleRef }),
    createElement(ReorderableList.Content, { ...contentProps, ref: contentRef }),
    createElement(ReorderableList.Actions, { ...actionsProps, ref: actionsRef },
      createElement(ReorderableList.MoveAfter, moveProps),
    ),
    createElement(ReorderableList.DropIndicator),
  ),
);
void RootReorderableList;

// @ts-expect-error sizes are closed.
const invalidSize: ReorderableListSize = "xl";
// @ts-expect-error variants are closed.
const invalidVariant: ReorderableListVariant = "plain";
// @ts-expect-error Handle requires an authored accessible name.
const missingHandleName: ReorderableListHandleProps = { children: "Handle" };
// @ts-expect-error movement controls require an authored accessible name.
const missingMoveName: ReorderableListMoveProps = { children: "Later" };
// @ts-expect-error Root requires stable item labels.
const missingItemLabel: ReorderableListRootProps = { children: null, items: [], onItemsChange: () => {} };
void invalidSize;
void invalidVariant;
void missingHandleName;
void missingMoveName;
void missingItemLabel;

// @ts-expect-error unknown layouts must not leak as native DOM props
const invalidLayout: ReorderableListRootProps["layout"] = "masonry";

import { createElement, createRef } from "react";
import {
  SegmentGroup,
  SegmentGroupIndicator,
  SegmentGroupItem,
  SegmentGroupRoot,
  type SegmentGroupRootProps,
  type SegmentGroupSize,
} from "../../../src/segment-group.js";

const rootRef = createRef<HTMLDivElement>();
const itemRef = createRef<HTMLButtonElement>();
const sizes: SegmentGroupSize[] = ["sm", "md", "lg"];
const root: SegmentGroupRootProps = { "aria-label": "View", defaultValue: "list", children: null, size: "sm" };
createElement(SegmentGroup.Root, { ...root, ref: rootRef });
createElement(SegmentGroupRoot, root);
createElement(SegmentGroupItem, { "aria-label": "List", iconOnly: true, ref: itemRef, value: "list" });
createElement(SegmentGroupIndicator, {});
// @ts-expect-error Segment Group has a closed three-size scale
createElement(SegmentGroup.Root, { ...root, size: "xl" });
void sizes;

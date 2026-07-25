import { createElement, createRef } from "react";
import { ScrollArea, type ScrollAreaOrientation, type ScrollAreaRootElement, type ScrollAreaScrollbarGutter, type ScrollAreaScrollbarVisibility, type ScrollAreaViewportElement } from "../../../src/scroll-area.js";

const orientation: ScrollAreaOrientation = "both";
const gutter: ScrollAreaScrollbarGutter = "stable";
const visibility: ScrollAreaScrollbarVisibility = "interaction";
const rootRef = createRef<ScrollAreaRootElement>();
const viewportRef = createRef<ScrollAreaViewportElement>();

createElement(ScrollArea.Root, { orientation, ref: rootRef, scrollbarGutter: gutter, scrollbarVisibility: visibility },
  createElement(ScrollArea.Viewport, { "aria-label": "Timeline", focusable: true, ref: viewportRef }, "Content"));

// @ts-expect-error closed orientation
createElement(ScrollArea.Root, { orientation: "diagonal" });
// @ts-expect-error closed gutter
createElement(ScrollArea.Root, { scrollbarGutter: "both-edges" });
// @ts-expect-error hidden scrollbars are excluded
createElement(ScrollArea.Root, { scrollbarVisibility: "hidden" });
// @ts-expect-error component-owned max-size props are excluded
createElement(ScrollArea.Root, { maxHeight: "20rem" });

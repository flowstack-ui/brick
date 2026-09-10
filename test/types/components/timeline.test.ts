import { createElement, createRef } from "react";
import { Timeline, type TimelineRootProps, type TimelineContentProps } from "../../../src/timeline.js";
createElement(Timeline.Root, { size: "xl", variant: "outline", showLastSeparator: true, ref: createRef<HTMLElement>() });
createElement(Timeline.Content, { side: "before" });
// @ts-expect-error Closed size recipe.
const size: TimelineRootProps = { size: "huge" };
// @ts-expect-error Logical sides only.
const side: TimelineContentProps = { side: "left" };
// @ts-expect-error This is not an interactive stepper.
const state: TimelineRootProps = { currentStep: 2 };
// @ts-expect-error Projection needs one host.
const projection: TimelineRootProps = { asChild: true };
void [size, side, state, projection];

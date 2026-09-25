import { createElement, createRef } from "react";
import {
  Timeline,
  type TimelineRootProps,
  type TimelineContentProps,
} from "../../../src/timeline.js";
createElement(Timeline.Root, {
  size: "xl",
  variant: "outline",
  showLastSeparator: true,
  ref: createRef<HTMLElement>(),
});
createElement(Timeline.Content, { side: "before" });
createElement(Timeline.Root, {
  size: { md: "lg" },
  variant: { initial: "subtle", lg: "solid" },
  layout: { initial: "compact", xl: "balanced" },
  unstyled: true,
});
createElement(Timeline.PropsProvider, {
  value: { variant: "subtle", size: "sm" },
});
createElement(Timeline.RootPropsProvider, {
  value: { tone: "success", showLastSeparator: false },
});
// @ts-expect-error No independent invented semantic tones.
const tone: TimelineRootProps = { tone: "contrast" };
// @ts-expect-error Breakpoints use the public sparse-map vocabulary.
const breakpoint: TimelineRootProps = { size: { tablet: "lg" } };
void [tone, breakpoint];
// @ts-expect-error Closed size recipe.
const size: TimelineRootProps = { size: "huge" };
// @ts-expect-error Logical sides only.
const side: TimelineContentProps = { side: "left" };
// @ts-expect-error This is not an interactive stepper.
const state: TimelineRootProps = { currentStep: 2 };
// @ts-expect-error Projection needs one host.
const projection: TimelineRootProps = { asChild: true };
void [size, side, state, projection];

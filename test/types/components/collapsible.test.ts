import { createElement, createRef } from "react";
import {
  Collapsible,
  CollapsibleRoot,
  type CollapsibleContentInnerProps,
  type CollapsibleIndicatorProps,
  type CollapsibleRootProps,
  type CollapsibleSize,
  type CollapsibleVariant,
} from "../../../src/collapsible.js";
import { Collapsible as RootCollapsible } from "../../../src/index.js";

const rootRef = createRef<HTMLDivElement>();
const sizes: CollapsibleSize[] = ["sm", "md", "lg"];
const variants: CollapsibleVariant[] = ["plain", "soft", "outline"];
const rootProps: CollapsibleRootProps = { defaultOpen: true, size: "md", variant: "soft" };
const indicatorProps: CollapsibleIndicatorProps = { children: "+", "data-slot": "indicator" };
const innerProps: CollapsibleContentInnerProps = { children: "Content", title: "Details" };
createElement(CollapsibleRoot, { ...rootProps, ref: rootRef });
createElement(Collapsible.Root, rootProps);
createElement(Collapsible.Indicator, indicatorProps);
createElement(Collapsible.ContentInner, innerProps);
createElement(RootCollapsible.Root, rootProps);
// @ts-expect-error closed variant
createElement(Collapsible.Root, { variant: "filled" });
// @ts-expect-error closed size
createElement(Collapsible.Root, { size: "xl" });
// @ts-expect-error Indicator is always decorative
createElement(Collapsible.Indicator, { "aria-hidden": false });
void sizes; void variants;

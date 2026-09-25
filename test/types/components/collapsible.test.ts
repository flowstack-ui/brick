import { createElement, createRef } from "react";
import {
  Collapsible,
  CollapsibleRoot,
  useCollapsible,
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
const responsive: CollapsibleRootProps = { size: { md: "lg" }, variant: { initial: "plain", md: "outline" } };
void responsive;
const indicatorProps: CollapsibleIndicatorProps = { children: "+", "data-slot": "indicator" };
const innerProps: CollapsibleContentInnerProps = { children: "Content", title: "Details" };
createElement(CollapsibleRoot, { ...rootProps, ref: rootRef });
createElement(Collapsible.Root, rootProps);
createElement(Collapsible.Trigger, { "aria-label": "Open navigation", iconOnly: true });
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
function ControllerExample() {
  const value = useCollapsible({ collapsedHeight: "3rem", lazyMount: false, unmountOnExit: false, hideMode: "display-none", onExitComplete() {} });
  return createElement(Collapsible.RootProvider, { value, unstyled: true }, createElement(Collapsible.Trigger, { unstyled: true, asChild: true }, createElement("button", null, "Details")));
}
createElement(Collapsible.Trigger, { highlight: "none" });
createElement(Collapsible.Content, { motion: "none" });
createElement(Collapsible.ContentInner, { inset: "none", asChild: true, children: createElement("section") });
createElement(Collapsible.Indicator, { placement: "inline", asChild: true, children: createElement("span") });
// @ts-expect-error closed highlight policy
createElement(Collapsible.Trigger, { highlight: "active" });
// @ts-expect-error motion is not an arbitrary animation name
createElement(Collapsible.Content, { motion: "bounce" });
void ControllerExample;

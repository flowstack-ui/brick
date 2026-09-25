import { createElement, createRef } from "react";
import { Tooltip, useTooltip, type TooltipPositioningOptions } from "../../../src/tooltip.js";

const positioning: TooltipPositioningOptions = {
  placement: "bottom-start", strategy: "fixed", offset: { mainAxis: 8, crossAxis: 2 },
  flip: ["top-start"], sameWidth: true, fitViewport: true, listeners: { ancestorScroll: true },
};
function Controller() {
  const value = useTooltip({ positioning, closeOnClick: false, lazyMount: false, unmountOnExit: false });
  return createElement(Tooltip.RootProvider, { value, children:
    createElement(Tooltip.Context, { children: state => String(state.open) }) });
}
createElement(Tooltip.Content, { children: "Hint", ref: createRef<HTMLDivElement>(), radius: "sm", ariaLabel: "More information" });
createElement(Tooltip.Trigger, { value: "first", asChild: true, children: createElement("button", null, "First") });
// @ts-expect-error positioning accepts supported placements, not arbitrary text
const invalid: TooltipPositioningOptions = { placement: "diagonal" };
void Controller;
void invalid;

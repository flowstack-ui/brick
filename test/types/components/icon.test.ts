import { createElement, createRef } from "react";
import {
  Icon,
  type IconEmphasis,
  type IconProps,
  type IconSize,
  type IconTone,
} from "../../../src/icon.js";
import { Icon as RootIcon } from "../../../src/index.js";

const graphic = createElement("svg", { viewBox: "0 0 20 20" });
const ref = createRef<HTMLElement | SVGSVGElement>();
const sizes: IconSize[] = [
  "inherit",
  "2xs",
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
];
const tones: IconTone[] = [
  "inherit",
  "primary",
  "secondary",
  "muted",
  "accent",
  "info",
  "success",
  "warning",
  "danger",
];
const emphases: IconEmphasis[] = ["text", "solid"];
const props: IconProps = {
  children: graphic,
  directional: true,
  emphasis: "solid",
  label: "Forward",
  size: "sm",
  tone: "accent",
};

createElement(Icon, { ...props, ref });
createElement(Icon, { "aria-labelledby": "status-label", children: graphic });
createElement(Icon, { asChild: true, children: graphic });
createElement(RootIcon, { children: graphic });

// @ts-expect-error Icon content is required.
createElement(Icon, {});
createElement(Icon, {
  "aria-labelledby": "label",
  children: graphic,
  // @ts-expect-error Labels and label references are mutually exclusive.
  label: "Icon",
});
// @ts-expect-error aria-hidden is controlled by the accessibility mode.
createElement(Icon, { "aria-hidden": false, children: graphic });
// @ts-expect-error Role is controlled by the accessibility mode.
createElement(Icon, { children: graphic, role: "button" });
// @ts-expect-error Sizes are closed.
createElement(Icon, { children: graphic, size: "3xl" });
// @ts-expect-error Arbitrary colors are not the semantic tone API.
createElement(Icon, { children: graphic, color: "#ff00ff" });

void ref;
void sizes;
void tones;
void emphases;

import { createIcon, IconPropsProvider, type ResponsiveIconSize, type CreatedIconProps, type CreateIconOptions } from "../../../src/icon.js";
import { createIcon as rootCreateIcon, IconPropsProvider as RootProvider } from "../../../src/index.js";
const responsive: ResponsiveIconSize = { sm: "xl", md: "md", lg: "inherit" };
const Factory = createIcon({d:"M0 0h24v24z", defaultProps:{size:responsive, strokeWidth:2}});
createElement(Factory,{ref:createRef<SVGSVGElement>(),label:"Status",viewBox:"0 0 32 32",stroke:"currentColor"});
createElement(IconPropsProvider,{value:{size:responsive,tone:"inherit"}},createElement(Factory));
createElement(RootProvider,{value:{emphasis:"solid"}});
rootCreateIcon({path:[createElement("path"),createElement("g")]});
// @ts-expect-error Exactly one geometry source.
createIcon({d:"M0 0",path:graphic});
// @ts-expect-error Geometry is required.
createIcon({});
// @ts-expect-error Names belong to each usage.
createIcon({d:"M0 0",defaultProps:{label:"Status"}});
// @ts-expect-error Factories cannot change their host.
const invalidHost: CreatedIconProps = {asChild:true};
// @ts-expect-error Factory geometry cannot be supplied by instances.
const invalidChildren: CreatedIconProps = {children:graphic};
// @ts-expect-error Factory output is not interactive.
const invalidTabStop: CreatedIconProps = {tabIndex:0};
// @ts-expect-error Raw names are excluded.
const invalidName: CreatedIconProps = {"aria-label":"Status"};
// @ts-expect-error Names cannot be inherited.
createElement(IconPropsProvider,{value:{label:"Status"}});
// @ts-expect-error Factory default refs are excluded.
const invalidDefaultRef: CreateIconOptions = {d:"M0 0",defaultProps:{ref:createRef<SVGSVGElement>()}};
void invalidHost; void invalidChildren; void invalidTabStop; void invalidName; void invalidDefaultRef;

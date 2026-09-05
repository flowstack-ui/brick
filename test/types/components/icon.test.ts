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

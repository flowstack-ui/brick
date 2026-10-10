import { createElement, createRef } from "react";
import {
  Group,
  type GroupElement,
  type GroupOrientation,
  type GroupProps,
} from "../../../src/group.js";
import { Group as RootGroup } from "../../../src/index.js";

const ref = createRef<HTMLElement>();
const elements: GroupElement[] = ["div", "span"];
const orientations: GroupOrientation[] = ["horizontal", "vertical"];
const props: GroupProps = {
  "aria-label": "Related actions",
  as: "div",
  attached: true,
  children: "Content",
  className: "consumer-group",
  gap: 2,
  grow: true,
  onClick: () => undefined,
  orientation: "vertical",
  role: "group",
  style: { minInlineSize: 0 },
};

createElement(Group, { ...props, ref });
createElement(RootGroup, { attached: true });
createElement(Group, { asChild: true, children: createElement("section"), align: { sm: "end" }, justify: "space-between", wrap: { lg: "wrap" }, grow: { md: true }, stacking: "first-on-top", skip: child => child.key === "exclude" });
// @ts-expect-error asChild and as are mutually exclusive.
createElement(Group, { asChild: true, as: "span", children: createElement("span") });
// @ts-expect-error Responsive objects must not be empty.
createElement(Group, { align: {} });

// @ts-expect-error Hosts are deliberately closed.
createElement(Group, { as: "button" });
// @ts-expect-error Orientations are deliberately closed.
createElement(Group, { orientation: "diagonal" });
createElement(Group, { orientation: { initial: "vertical", md: "horizontal" } });
// @ts-expect-error No wrap API; attached chains remain continuous.
createElement(Group, { wrap: true });
// @ts-expect-error No asChild composition API.
createElement(Group, { asChild: true });
// @ts-expect-error No render composition API.
createElement(Group, { render: createElement("div") });

void elements;
void orientations;

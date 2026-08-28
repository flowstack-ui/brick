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

// @ts-expect-error Hosts are deliberately closed.
createElement(Group, { as: "button" });
// @ts-expect-error Orientations are deliberately closed.
createElement(Group, { orientation: "diagonal" });
// @ts-expect-error Responsive orientation belongs to Stack/application policy.
createElement(Group, { orientation: { initial: "vertical", md: "horizontal" } });
// @ts-expect-error No wrap API; attached chains remain continuous.
createElement(Group, { wrap: true });
// @ts-expect-error No asChild composition API.
createElement(Group, { asChild: true });
// @ts-expect-error No render composition API.
createElement(Group, { render: createElement("div") });

void elements;
void orientations;

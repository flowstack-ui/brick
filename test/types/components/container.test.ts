import { createElement, createRef } from "react";
import {
  Container,
  type ContainerElement,
  type ContainerGutter,
  type ContainerMeasure,
  type ContainerProps,
} from "../../../src/container.js";
import { Container as RootContainer } from "../../../src/index.js";

const ref = createRef<HTMLElement>();
const elements: ContainerElement[] = [
  "div", "section", "article", "main", "header", "footer", "nav", "aside",
];
const measures: ContainerMeasure[] = [
  "narrow", "medium", "wide", "max", "full",
];
const gutters: ContainerGutter[] = ["none", "sm", "md", "lg"];
const props: ContainerProps = {
  "aria-label": "Projects",
  as: "section",
  children: "Content",
  className: "consumer-container",
  gutter: "lg",
  measure: "max",
  onClick: () => undefined,
  style: { minInlineSize: 0 },
};

createElement(Container, { ...props, ref });
createElement(RootContainer, { gutter: "none", measure: "full" });

// @ts-expect-error Hosts are deliberately closed.
createElement(Container, { as: "button" });
// @ts-expect-error Measures use a closed recipe.
createElement(Container, { measure: "76rem" });
// @ts-expect-error Gutters use a closed recipe.
createElement(Container, { gutter: "xl" });
// @ts-expect-error Responsive objects are application policy.
createElement(Container, { measure: { base: "full", lg: "wide" } });
// @ts-expect-error Viewport height is excluded.
createElement(Container, { height: "viewport" });
// @ts-expect-error No asChild composition API.
createElement(Container, { asChild: true });
// @ts-expect-error No render composition API.
createElement(Container, { render: createElement("div") });

void elements;
void measures;
void gutters;

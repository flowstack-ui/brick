import { createElement, createRef } from "react";
import {
  Center,
  Circle,
  Square,
  type CenterElement,
  type CenterProps,
  type CircleProps,
  type SquareProps,
} from "../../../src/center.js";
import { Center as RootCenter, Square as RootSquare } from "../../../src/index.js";

const ref = createRef<HTMLElement>();
const elements: CenterElement[] = [
  "div", "span", "section", "article", "aside", "main",
  "header", "footer", "nav", "ul", "ol", "li",
];
const centerProps: CenterProps = { as: "section", inline: true };
const squareProps: SquareProps = { size: { initial: 32, md: "2.5rem" } };
const circleProps: CircleProps = { as: "span", size: "2rem" };

createElement(Center, { ...centerProps, ref });
createElement(Square, { ...squareProps, ref });
createElement(Circle, circleProps);
createElement(RootCenter, { asChild: true, children: createElement("article") });
createElement(RootSquare, { size: 32 });

// @ts-expect-error Square requires one explicit size.
createElement(Square, {});
createElement(Circle, { size: { lg: "3rem" } });
// @ts-expect-error Breakpoints are deliberately closed.
createElement(Square, { size: { initial: 32, xxl: 48 } });
// @ts-expect-error Center does not own paint.
createElement(Center, { level: "subtle" });
// @ts-expect-error Center does not render interactive hosts.
createElement(Center, { as: "button" });

void elements;

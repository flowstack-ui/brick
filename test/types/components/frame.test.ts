import { createElement, createRef } from "react";
import { Frame, type FrameElement, type FrameProps } from "../../../src/frame.js";
import { Frame as RootFrame } from "../../../src/index.js";

const ref = createRef<HTMLElement>();
const elements: FrameElement[] = ["div", "span", "section", "article", "aside", "main", "header", "footer", "nav", "ul", "ol", "li"];
const props: FrameProps = {
  as: "section",
  inlineSize: { initial: "100%", lg: "40rem" },
  minInlineSize: 0,
  maxInlineSize: "72ch",
  blockSize: "auto",
  minBlockSize: "12rem",
  maxBlockSize: { initial: "18rem", md: "24rem" },
};

createElement(Frame, { ...props, ref });
createElement(RootFrame, { asChild: true, children: createElement("article"), maxInlineSize: "40rem" });

createElement(Frame, { inlineSize: { lg: "40rem" } });
// @ts-expect-error Breakpoints are deliberately closed.
createElement(Frame, { maxBlockSize: { initial: "20rem", xxl: "30rem" } });
// @ts-expect-error Frame does not own paint.
createElement(Frame, { level: "subtle" });
// @ts-expect-error Frame does not own overflow.
createElement(Frame, { overflow: "auto" });

void elements;

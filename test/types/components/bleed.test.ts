import { createElement, createRef } from "react";
import { Bleed, type BleedElement, type BleedProps } from "../../../src/bleed.js";
import { Bleed as RootBleed } from "../../../src/index.js";

const ref = createRef<HTMLElement>();
const elements: BleedElement[] = ["div", "span", "section", "article", "aside", "main", "header", "footer", "nav", "ul", "ol", "li"];
const props: BleedProps = { inline: { initial: 4, lg: 8 }, blockStart: "2rem" };

createElement(Bleed, { ...props, ref });
createElement(RootBleed, { asChild: true, children: createElement("figure") });
createElement(Bleed, { inline: { lg: 8 } });
// @ts-expect-error Bleed does not own paint.
createElement(Bleed, { level: "subtle" });
void elements;

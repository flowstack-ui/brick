import { createElement, createRef } from "react";
import { Marquee, type MarqueeRootProps } from "../../../src/marquee.js";
createElement(Marquee.Root, { spacing: 4, side: "end", ref: createRef<HTMLDivElement>() });
createElement(Marquee.Content, { renderReplica: () => "Passive copy" });
createElement(Marquee.Edge, { side: "bottom", ref: createRef<HTMLElement>() });
// @ts-expect-error Direction uses logical side vocabulary.
const side: MarqueeRootProps = { side: "left" };
// @ts-expect-error Speed is the sole timing authority.
const duration: MarqueeRootProps = { duration: 2 };
void [side, duration];

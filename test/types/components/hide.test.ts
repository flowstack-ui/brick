import { createElement, createRef } from "react";
import { Hide, type HideBreakpoint, type HideElement, type HideProps } from "../../../src/hide.js";
import { Hide as RootHide } from "../../../src/index.js";
const ref = createRef<HTMLElement>(); const breakpoint: HideBreakpoint = "md"; const element: HideElement = "nav";
const props: HideProps = { "aria-label": "Compact", as: "nav", children: "Tools", from: breakpoint, style: { display: "flex" } };
createElement(Hide, { ...props, ref }); createElement(RootHide, { children: "Compact", from: "xl" });
// @ts-expect-error from is required.
createElement(Hide, { children: "Missing" });
// @ts-expect-error breakpoints are closed.
createElement(Hide, { children: "Invalid", from: "xxl" });
// @ts-expect-error hosts are closed.
createElement(Hide, { as: "button", children: "Invalid", from: "md" });
// @ts-expect-error permanent hidden is excluded.
createElement(Hide, { children: "Invalid", from: "md", hidden: true });
// @ts-expect-error no conditional mounting API.
createElement(Hide, { children: "Invalid", from: "md", unmount: true });
void ref; void element;

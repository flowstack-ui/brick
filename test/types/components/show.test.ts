import { createElement, createRef } from "react";
import { Show, type ShowBreakpoint, type ShowElement, type ShowProps } from "../../../src/show.js";
import { Show as RootShow } from "../../../src/index.js";
const ref = createRef<HTMLElement>(); const breakpoint: ShowBreakpoint = "md"; const element: ShowElement = "nav";
const props: ShowProps = { "aria-label": "Desktop", as: "nav", children: "Tools", className: "custom", from: breakpoint, style: { display: "flex" } };
createElement(Show, { ...props, ref }); createElement(RootShow, { children: "Wide", from: "xl" });
// @ts-expect-error from is required.
createElement(Show, { children: "Missing" });
// @ts-expect-error breakpoints are closed.
createElement(Show, { children: "Invalid", from: "xxl" });
// @ts-expect-error hosts are closed.
createElement(Show, { as: "button", children: "Invalid", from: "md" });
// @ts-expect-error permanent hidden is excluded.
createElement(Show, { children: "Invalid", from: "md", hidden: true });
// @ts-expect-error no conditional rendering API.
createElement(Show, { children: "Invalid", from: "md", when: true });
void ref; void element;

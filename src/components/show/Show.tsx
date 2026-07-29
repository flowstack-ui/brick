import {
  mergeVisibilityClass,
  type ResponsiveVisibilityProps,
} from "../_responsive-visibility/ResponsiveVisibility.js";
import { createElement, forwardRef } from "react";

export type ShowBreakpoint = "sm" | "md" | "lg" | "xl";
export type ShowElement = "div" | "span" | "section" | "article" | "nav" | "header" | "footer" | "main" | "aside" | "ul" | "ol" | "li";
export type ShowProps = Omit<ResponsiveVisibilityProps, "as" | "from"> & { as?: ShowElement; from: ShowBreakpoint };

export const Show = forwardRef<HTMLElement, ShowProps>(function Show(
  { as = "div", children, className, from, slot = "show", ...props }, ref,
) {
  return createElement(as, { ...props, className: mergeVisibilityClass("brick-show", className), "data-from": from, "data-slot": slot, ref }, children);
});
Show.displayName = "Show";

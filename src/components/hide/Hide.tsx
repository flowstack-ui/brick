import {
  mergeVisibilityClass,
  type ResponsiveVisibilityProps,
} from "../_responsive-visibility/ResponsiveVisibility.js";
import { createElement, forwardRef } from "react";

export type HideBreakpoint = "sm" | "md" | "lg" | "xl";
export type HideElement = "div" | "span" | "section" | "article" | "nav" | "header" | "footer" | "main" | "aside" | "ul" | "ol" | "li";
export type HideProps = Omit<ResponsiveVisibilityProps, "as" | "from"> & { as?: HideElement; from: HideBreakpoint };

export const Hide = forwardRef<HTMLElement, HideProps>(function Hide(
  { as = "div", children, className, from, slot = "hide", ...props }, ref,
) {
  return createElement(as, { ...props, className: mergeVisibilityClass("brick-hide", className), "data-from": from, "data-slot": slot, ref }, children);
});
Hide.displayName = "Hide";

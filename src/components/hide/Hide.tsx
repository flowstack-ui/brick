import {
  mergeVisibilityClass,
  type ResponsiveVisibilityProps,
} from "../_responsive-visibility/ResponsiveVisibility.js";
import { createElement, forwardRef, type ReactElement, type ReactNode } from "react";
import { layoutHost } from "../_internal/layout-host.js";

export type HideBreakpoint = "sm" | "md" | "lg" | "xl";
export type HideElement = "div" | "span" | "section" | "article" | "nav" | "header" | "footer" | "main" | "aside" | "ul" | "ol" | "li";
export type HideProps = Omit<ResponsiveVisibilityProps, "as" | "from" | "children"> & { from: HideBreakpoint } & ({ as?: HideElement; asChild?: false; children: ReactNode } | { as?: never; asChild: true; children: ReactElement });

export const Hide = forwardRef<HTMLElement, HideProps>(function Hide(
  { as = "div", asChild = false, children, className, from, slot, ...props }, ref,
) {
  if (asChild) return layoutHost(children, { ...props, className: mergeVisibilityClass("brick-hide", className), "data-hide-from": from, ...(slot === undefined ? {} : { "data-slot": slot }) }, ref, "Hide");
  return createElement(as, { ...props, className: mergeVisibilityClass("brick-hide", className), "data-from": from, "data-slot": slot ?? "hide", ref }, children);
});
Hide.displayName = "Hide";

import {
  mergeVisibilityClass,
  type ResponsiveVisibilityProps,
} from "../_responsive-visibility/ResponsiveVisibility.js";
import { createElement, forwardRef, Fragment, type ReactElement, type ReactNode, type RefAttributes } from "react";
import { layoutHost } from "../_internal/layout-host.js";

export type ShowBreakpoint = "sm" | "md" | "lg" | "xl";
export type ShowElement = "div" | "span" | "section" | "article" | "nav" | "header" | "footer" | "main" | "aside" | "ul" | "ol" | "li";
type ResponsiveShowProps = Omit<ResponsiveVisibilityProps, "as" | "from" | "children"> & {
  from: ShowBreakpoint;
  when?: never;
  fallback?: never;
} & ({ as?: ShowElement; asChild?: false; children: ReactNode } | { as?: never; asChild: true; children: ReactElement });

type Truthy<T> = Exclude<T, false | 0 | 0n | "" | null | undefined>;
type ConditionalShowProps<T> = {
  when: T;
  fallback?: ReactNode;
  children: ReactNode | ((value: Truthy<T>) => ReactNode);
  from?: never;
  as?: never;
  asChild?: never;
  ref?: never;
  className?: never;
  style?: never;
};
export type ShowProps<T = unknown> = ResponsiveShowProps | ConditionalShowProps<T>;

const ShowImpl = forwardRef<HTMLElement, ShowProps>(function Show(props, ref) {
  if ("when" in props) {
    if (Object.keys(props).some(key => !["when", "children", "fallback"].includes(key)) || ref != null)
      throw new TypeError("Show conditional mode accepts when, fallback and children only.");
    const { when, children, fallback = null } = props;
    const result = when ? (typeof children === "function" ? children(when) : children) : fallback;
    return createElement(Fragment, null, result);
  }
  const { as = "div", asChild = false, children, className, from, slot, ...native } = props;
  if (!from || "fallback" in props || typeof children === "function")
    throw new TypeError("Show responsive mode requires from and node children, without fallback.");
  if (asChild) {
    if (props.as !== undefined) throw new TypeError("Show asChild cannot be combined with as.");
    return layoutHost(children, { ...native, className: mergeVisibilityClass("brick-show", className), "data-show-from": from, ...(slot === undefined ? {} : { "data-slot": slot }) }, ref, "Show");
  }
  return createElement(as, {
    ...native,
    className: mergeVisibilityClass("brick-show", className),
    "data-from": from,
    "data-slot": slot ?? "show",
    ref,
  }, children);
});
export const Show = ShowImpl as {
  <T>(props: ConditionalShowProps<T>): ReactElement | null;
  (props: ResponsiveShowProps & RefAttributes<HTMLElement>): ReactElement | null;
  displayName?: string;
};
Show.displayName = "Show";

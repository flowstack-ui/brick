import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

export type ResponsiveVisibilityBreakpoint = "sm" | "md" | "lg" | "xl";
export type ResponsiveVisibilityElement =
  | "div" | "span" | "section" | "article" | "nav" | "header"
  | "footer" | "main" | "aside" | "ul" | "ol" | "li";

type NativeProps = Omit<
  HTMLAttributes<HTMLElement>,
  "children" | "className" | "hidden" | "style"
>;

export interface ResponsiveVisibilityProps extends NativeProps {
  as?: ResponsiveVisibilityElement;
  children: ReactNode;
  className?: string;
  from: ResponsiveVisibilityBreakpoint;
  style?: CSSProperties;
  slot?: string;
}

export function mergeVisibilityClass(baseClass: string, className?: string) {
  return className ? `${baseClass} ${className}` : baseClass;
}

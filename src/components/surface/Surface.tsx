import {
  createElement,
  forwardRef,
  type CSSProperties,
  type ForwardedRef,
  type HTMLAttributes,
  type ReactNode,
} from "react";

export type SurfaceElement =
  | "div"
  | "section"
  | "article"
  | "aside"
  | "nav"
  | "main"
  | "header"
  | "footer"
  | "form"
  | "li";

export type SurfaceLevel = "canvas" | "base" | "subtle" | "raised";
export type SurfaceElevation = "none" | "low" | "medium" | "high";
export type SurfaceRadius = "none" | "subtle" | "surface";
export type SurfaceInset = "none" | "sm" | "md" | "lg";

type SurfaceNativeProps = Omit<
  HTMLAttributes<HTMLElement>,
  "children" | "className" | "style"
>;

export interface SurfaceProps extends SurfaceNativeProps {
  as?: SurfaceElement;
  children?: ReactNode;
  level?: SurfaceLevel;
  bordered?: boolean;
  elevation?: SurfaceElevation;
  radius?: SurfaceRadius;
  inset?: SurfaceInset;
  className?: string;
  style?: CSSProperties;
  slot?: string;
}

function mergeClassName(className: string | undefined) {
  return className ? `brick-surface ${className}` : "brick-surface";
}

function SurfaceImpl(
  {
    as = "div",
    bordered = false,
    children,
    className,
    elevation = "none",
    inset = "none",
    level = "base",
    radius = "surface",
    slot = "surface",
    ...props
  }: SurfaceProps,
  ref: ForwardedRef<HTMLElement>,
) {
  return createElement(
    as,
    {
      ...props,
      className: mergeClassName(className),
      "data-bordered": bordered ? "" : undefined,
      "data-elevation": elevation,
      "data-inset": inset,
      "data-level": level,
      "data-radius": radius,
      "data-slot": slot,
      ref,
    },
    children,
  );
}

export const Surface = forwardRef<HTMLElement, SurfaceProps>(SurfaceImpl);
Surface.displayName = "Surface";

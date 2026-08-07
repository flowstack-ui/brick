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
export type SurfaceScrimStrength = "soft" | "medium" | "strong";
export type SurfaceScrimDirection =
  | "uniform"
  | "inline-start"
  | "inline-end"
  | "block-start"
  | "block-end";

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

type SurfacePartNativeProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "aria-hidden" | "children" | "className" | "style"
>;

export interface SurfaceMediaProps extends SurfacePartNativeProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  slot?: string;
}

export interface SurfaceScrimProps extends SurfacePartNativeProps {
  direction?: SurfaceScrimDirection;
  strength?: SurfaceScrimStrength;
  className?: string;
  style?: CSSProperties;
  slot?: string;
}

export interface SurfaceContentProps extends SurfacePartNativeProps {
  children?: ReactNode;
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

function mergePartClassName(base: string, className: string | undefined) {
  return className ? `${base} ${className}` : base;
}

export const SurfaceRoot = forwardRef<HTMLElement, SurfaceProps>(SurfaceImpl);

export const SurfaceMedia = forwardRef<HTMLDivElement, SurfaceMediaProps>(
  function SurfaceMedia(
    { children, className, slot = "surface-media", style, ...props },
    ref,
  ) {
    return (
      <div
        {...props}
        aria-hidden="true"
        className={mergePartClassName("brick-surface__media", className)}
        data-slot={slot}
        ref={ref}
        style={style}
      >
        {children}
      </div>
    );
  },
);

export const SurfaceScrim = forwardRef<HTMLDivElement, SurfaceScrimProps>(
  function SurfaceScrim(
    {
      className,
      direction = "uniform",
      slot = "surface-scrim",
      strength = "medium",
      style,
      ...props
    },
    ref,
  ) {
    return (
      <div
        {...props}
        aria-hidden="true"
        className={mergePartClassName("brick-surface__scrim", className)}
        data-direction={direction}
        data-slot={slot}
        data-strength={strength}
        ref={ref}
        style={style}
      />
    );
  },
);

export const SurfaceContent = forwardRef<HTMLDivElement, SurfaceContentProps>(
  function SurfaceContent(
    { children, className, slot = "surface-content", style, ...props },
    ref,
  ) {
    return (
      <div
        {...props}
        className={mergePartClassName("brick-surface__content", className)}
        data-slot={slot}
        ref={ref}
        style={style}
      >
        {children}
      </div>
    );
  },
);

SurfaceRoot.displayName = "Surface.Root";
SurfaceMedia.displayName = "Surface.Media";
SurfaceScrim.displayName = "Surface.Scrim";
SurfaceContent.displayName = "Surface.Content";

export const Surface = Object.assign(SurfaceRoot, {
  Root: SurfaceRoot,
  Media: SurfaceMedia,
  Scrim: SurfaceScrim,
  Content: SurfaceContent,
});

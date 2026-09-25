import { surfaceEffects, type SurfaceEffectProps } from "../_surface-effects/SurfaceEffects.js";
import {
  createElement,
  forwardRef,
  type CSSProperties,
  type ForwardedRef,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react";
import { composeHost } from "@flowstack-ui/atom/compose-host";
import {
  responsiveDataAttributes,
  type ResponsiveValue,
} from "../_responsive-value/ResponsiveValue.js";

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

export type SurfaceLevel = "transparent" | "canvas" | "base" | "subtle" | "raised";
export type SurfaceTone = "neutral" | "accent";
export type SurfaceElevation = "none" | "low" | "medium" | "high";
import { radiusStyle, type Radius } from "../_radius/Radius.js";
export type SurfaceRadius = Radius;
export type SurfaceInset = "none" | "sm" | "md" | "lg" | "xl" | "2xl";
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

type SurfaceHostProps =
  | { as?: SurfaceElement; asChild?: false; children?: ReactNode }
  | { as?: never; asChild: true; children: ReactElement };

export type SurfaceProps = SurfaceNativeProps & SurfaceHostProps & SurfaceEffectProps & {
  level?: SurfaceLevel;
  tone?: SurfaceTone;
  bordered?: boolean;
  elevation?: SurfaceElevation;
  radius?: SurfaceRadius;
  inset?: ResponsiveValue<SurfaceInset>;
  className?: string;
  style?: CSSProperties;
  slot?: string;
};

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
    treatment, backgroundOpacity, backdropBlur, backdropSaturate, borderColor, borderOpacity,
    as = "div",
    asChild = false,
    bordered = false,
    children,
    className,
    elevation = "none",
    inset = "none",
    level = "base",
    radius: explicitRadius,
    style,
    slot = "surface",
    tone = "neutral",
    ...props
  }: SurfaceProps,
  ref: ForwardedRef<HTMLElement>,
) {
  const effects = surfaceEffects({ treatment, backgroundOpacity, backdropBlur, backdropSaturate, borderColor, borderOpacity });
  const radius = explicitRadius ?? "surface";
  const rootProps = {
    ...props,
    ...effects.attributes,
    ...responsiveDataAttributes("data-inset", inset, { alwaysInitial: true }),
    className: mergeClassName(className),
    "data-bordered": bordered ? "" : undefined,
    "data-elevation": elevation,
    "data-level": level,
    "data-radius": radius,
    style: radiusStyle(explicitRadius, "--brick-surface-radius", { ...effects.style, ...style }),
    "data-slot": slot,
    "data-tone": tone,
    ref,
  };

  if (asChild) {
    return composeHost(children, rootProps);
  }

  return createElement(as, rootProps, children);
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

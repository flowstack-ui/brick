import {
  Children,
  cloneElement,
  createElement,
  forwardRef,
  Fragment,
  type CSSProperties,
  type ForwardedRef,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
  type Ref,
} from "react";
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

export type SurfaceLevel = "canvas" | "base" | "subtle" | "raised";
export type SurfaceElevation = "none" | "low" | "medium" | "high";
export type SurfaceRadius = "none" | "subtle" | "surface";
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

export type SurfaceProps = SurfaceNativeProps & SurfaceHostProps & {
  level?: SurfaceLevel;
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

function composeRefs<T>(...refs: Array<Ref<T> | undefined>) {
  return (value: T | null) => {
    for (const ref of refs) {
      if (typeof ref === "function") ref(value);
      else if (ref) ref.current = value;
    }
  };
}

function mergeComposedProps(
  original: Record<string, unknown>,
  override: Record<string, unknown>,
) {
  const merged = { ...original, ...override };
  for (const [key, value] of Object.entries(override)) {
    const current = original[key];
    if (
      key.startsWith("on") &&
      typeof current === "function" &&
      typeof value === "function"
    ) {
      merged[key] = (...args: unknown[]) => {
        value(...args);
        current(...args);
      };
    } else if (
      key === "className" &&
      typeof current === "string" &&
      typeof value === "string"
    ) {
      merged[key] = `${current} ${value}`;
    } else if (
      key === "style" &&
      current &&
      value &&
      typeof current === "object" &&
      typeof value === "object"
    ) {
      merged[key] = { ...current, ...value };
    }
  }
  return merged;
}

function SurfaceImpl(
  {
    as = "div",
    asChild = false,
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
  const rootProps = {
    ...props,
    ...responsiveDataAttributes("data-inset", inset, { alwaysInitial: true }),
    className: mergeClassName(className),
    "data-bordered": bordered ? "" : undefined,
    "data-elevation": elevation,
    "data-level": level,
    "data-radius": radius,
    "data-slot": slot,
    ref,
  };

  if (asChild) {
    const child = Children.only(children) as ReactElement<Record<string, unknown>>;
    if (child.type === Fragment) {
      throw new Error(
        "Surface with asChild requires one DOM or component host; a Fragment cannot receive Surface paint.",
      );
    }
    const childRef = (
      "ref" in child.props
        ? child.props.ref
        : (child as ReactElement & { ref?: Ref<HTMLElement> }).ref
    ) as Ref<HTMLElement> | undefined;
    return cloneElement(
      child,
      mergeComposedProps(child.props, {
        ...rootProps,
        ref: childRef || ref ? composeRefs(childRef, ref) : undefined,
      }),
    );
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

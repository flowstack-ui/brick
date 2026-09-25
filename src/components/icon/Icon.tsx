"use client";

import {
  Children,
  Fragment,
  createContext,
  useContext,
  type ReactNode,
  forwardRef,
  type CSSProperties,
  type HTMLAttributes,
  type ReactElement,
} from "react";

import { composeHost } from "@flowstack-ui/atom/compose-host";
import { responsiveDataAttributes, type ResponsiveValue } from "../_responsive-value/ResponsiveValue.js";

export type IconSize =
  "inherit" | "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type ResponsiveIconSize = ResponsiveValue<IconSize>;
export type IconTone =
  | "inherit"
  | "primary"
  | "secondary"
  | "muted"
  | "accent"
  | "info"
  | "success"
  | "warning"
  | "danger";
export type IconEmphasis = "text" | "solid";

type DecorativeIconProps = {
  label?: never;
  "aria-labelledby"?: never;
};

type LabelledIconProps = {
  label: string;
  "aria-labelledby"?: never;
};

type LabelReferenceIconProps = {
  label?: never;
  "aria-labelledby": string;
};

type IconNativeProps = Omit<
  HTMLAttributes<HTMLSpanElement>,
  | "aria-hidden"
  | "aria-label"
  | "aria-labelledby"
  | "children"
  | "color"
  | "role"
>;

type IconCommonProps = IconNativeProps & {
  children: ReactElement;
  emphasis?: IconEmphasis;
  size?: ResponsiveIconSize;
  tone?: IconTone;
  directional?: boolean;
  className?: string;
  style?: CSSProperties;
  slot?: string;
};

type IconCompositionProps = { asChild: true } | { asChild?: false };

export type IconProps = IconCommonProps &
  IconCompositionProps &
  (DecorativeIconProps | LabelledIconProps | LabelReferenceIconProps);

function mergeClassName(base: string, className: string | undefined) {
  return className ? `${base} ${className}` : base;
}

export type IconPresentationProps = Pick<IconCommonProps, "size" | "tone" | "emphasis">;
export type IconPropsProviderProps = { value: IconPresentationProps; children?: ReactNode };
const IconDefaults = createContext<IconPresentationProps>({});

/** Presentation only: undefined values inherit, responsive values replace whole. */
export function IconPropsProvider({ value, children }: IconPropsProviderProps) {
  const outer = useContext(IconDefaults);
  return <IconDefaults.Provider value={{
    size: value.size ?? outer.size,
    tone: value.tone ?? outer.tone,
    emphasis: value.emphasis ?? outer.emphasis,
  }}>{children}</IconDefaults.Provider>;
}

export function useIconDefaults() { return useContext(IconDefaults); }

function diagnose(condition: boolean, message: string) {
  if (condition && process.env.NODE_ENV !== "production") console.warn(`Icon: ${message}`);
}

export const Icon = forwardRef<HTMLElement | SVGSVGElement, IconProps>(
  function Icon(
    {
      asChild = false,
      children,
      className,
      directional = false,
      emphasis: ownEmphasis,
      label,
      size: ownSize,
      slot = "icon",
      tone: ownTone,
      style,
      "aria-labelledby": ariaLabelledby,
      ...props
    },
    ref,
  ) {
    const defaults = useIconDefaults();
    const size = ownSize ?? defaults.size ?? "md";
    const tone = ownTone ?? defaults.tone ?? "inherit";
    const emphasis = ownEmphasis ?? defaults.emphasis ?? "text";
    const child = Children.only(children);
    if (child.type === Fragment || (typeof child.type === "string" && child.type !== "svg")) {
      throw new Error("Icon requires one noninteractive SVG element; custom components must forward props and ref to one SVG.");
    }
    const childProps = child.props as Record<string, unknown>;
    diagnose(label !== undefined && !label.trim(), "label must be nonempty.");
    diagnose(ariaLabelledby !== undefined && !ariaLabelledby.trim(), "aria-labelledby must be nonempty.");
    diagnose(label !== undefined && ariaLabelledby !== undefined, "provide label or aria-labelledby, not both.");
    diagnose((props.tabIndex ?? -1) >= 0 || Number(childProps.tabIndex ?? -1) >= 0 || childProps.focusable === true || childProps.focusable === "true", "SVG content must be nonfocusable; label the enclosing action.");
    const informative = label !== undefined || ariaLabelledby !== undefined;
    const rootProps: Record<string, unknown> = {
      ...props,
      "aria-hidden": informative ? null : true,
      "aria-label": label ?? null,
      "aria-labelledby": label === undefined ? ariaLabelledby ?? null : null,
      className: mergeClassName("brick-icon", className),
      "data-directional": directional ? "" : undefined,
      "data-emphasis": emphasis,
      ...responsiveDataAttributes("data-size", size, { defaultValue: "md", alwaysInitial: true }),
      "data-slot": slot,
      "data-tone": tone,
      ref,
      role: informative ? "img" : null,
      tabIndex: props.tabIndex !== undefined || (asChild && childProps.tabIndex !== undefined) ? -1 : null,
      style,
    };

    if (asChild) {
      return composeHost(child, { ...rootProps, focusable: "false" });
    }

    return (
      <span {...props} {...rootProps}>
        {children}
      </span>
    );
  },
);

Icon.displayName = "Icon";

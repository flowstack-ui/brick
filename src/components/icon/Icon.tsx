import {
  Children,
  cloneElement,
  forwardRef,
  type CSSProperties,
  type HTMLAttributes,
  type ReactElement,
  type Ref,
} from "react";

export type IconSize =
  "inherit" | "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
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
  size?: IconSize;
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

function composeRefs(...refs: (Ref<unknown> | undefined)[]) {
  return (node: unknown) => {
    for (const ref of refs) {
      if (ref === undefined || ref === null) continue;
      if (typeof ref === "function") ref(node);
      else (ref as { current: unknown }).current = node;
    }
  };
}

function mergeChildProps(
  child: ReactElement,
  iconProps: Record<string, unknown>,
) {
  const childProps = child.props as Record<string, unknown>;
  return {
    ...childProps,
    ...iconProps,
    className: mergeClassName(
      typeof childProps.className === "string" ? childProps.className : "",
      typeof iconProps.className === "string" ? iconProps.className : undefined,
    ).trim(),
    style: {
      ...(childProps.style && typeof childProps.style === "object"
        ? childProps.style
        : {}),
      ...(iconProps.style && typeof iconProps.style === "object"
        ? iconProps.style
        : {}),
    },
    ref: composeRefs(
      (child as ReactElement & { ref?: Ref<unknown> }).ref,
      iconProps.ref as Ref<unknown> | undefined,
    ),
  };
}

export const Icon = forwardRef<HTMLElement | SVGSVGElement, IconProps>(
  function Icon(
    {
      asChild = false,
      children,
      className,
      directional = false,
      emphasis = "text",
      label,
      size = "md",
      slot = "icon",
      tone = "inherit",
      style,
      "aria-labelledby": ariaLabelledby,
      ...props
    },
    ref,
  ) {
    const informative = label !== undefined || ariaLabelledby !== undefined;
    const rootProps: Record<string, unknown> = {
      ...props,
      "aria-hidden": informative ? undefined : true,
      "aria-label": label,
      "aria-labelledby": ariaLabelledby,
      className: mergeClassName("brick-icon", className),
      "data-directional": directional ? "" : undefined,
      "data-emphasis": emphasis,
      "data-size": size,
      "data-slot": slot,
      "data-tone": tone,
      ref,
      role: informative ? "img" : undefined,
      style,
    };

    if (asChild) {
      const child = Children.only(children);
      return cloneElement(child, mergeChildProps(child, rootProps));
    }

    return (
      <span {...props} {...rootProps}>
        {children}
      </span>
    );
  },
);

Icon.displayName = "Icon";

import {
  Children,
  cloneElement,
  Fragment,
  isValidElement,
  createElement,
  forwardRef,
  type CSSProperties,
  type ForwardedRef,
  type HTMLAttributes,
  type ReactNode,
  type ReactElement,
} from "react";
import {
  normalizeResponsiveValue,
  responsiveDataAttributes,
  type ResponsiveValue,
} from "../_responsive-value/ResponsiveValue.js";
import { stackHost } from "../stack/stack-host.js";
import {
  responsiveSpacingStyles,
  type SpacingValue,
} from "../_spacing-value/SpacingValue.js";

export type GroupElement = "div" | "span";
export type GroupOrientation = "horizontal" | "vertical";
export type GroupAlign = "start" | "end" | "center" | "stretch" | "baseline";
export type GroupJustify =
  | "start"
  | "end"
  | "center"
  | "space-between"
  | "space-around"
  | "space-evenly";
export type GroupWrap = "nowrap" | "wrap" | "wrap-reverse";
export type GroupStacking = "first-on-top" | "last-on-top";

type GroupNativeProps = Omit<
  HTMLAttributes<HTMLElement>,
  "children" | "className" | "style"
>;

interface GroupBaseProps extends GroupNativeProps {
  attached?: boolean;
  children?: ReactNode;
  gap?: ResponsiveValue<SpacingValue>;
  grow?: ResponsiveValue<boolean>;
  orientation?: ResponsiveValue<GroupOrientation>;
  align?: ResponsiveValue<GroupAlign>;
  justify?: ResponsiveValue<GroupJustify>;
  wrap?: ResponsiveValue<GroupWrap>;
  stacking?: GroupStacking;
  skip?: (child: ReactElement) => boolean;
  className?: string;
  style?: CSSProperties;
  slot?: string;
}
export type GroupProps = Omit<GroupBaseProps, "children"> &
  (
    | { as?: GroupElement; asChild?: false; children?: ReactNode }
    | {
        as?: never;
        asChild: true;
        children: ReactElement;
      }
  );

function groupValues(
  name: string,
  value: ResponsiveValue<string | boolean>,
  convert: (value: string | boolean) => string = String,
) {
  return Object.fromEntries(
    Object.entries(normalizeResponsiveValue(value)).map(([key, next]) => [
      `--brick-group-${name}-${key}-input`,
      convert(next),
    ]),
  );
}

function flatten(children: ReactNode, prefix = ""): ReactNode[] {
  return Children.toArray(children).flatMap((child, index) => {
    if (!isValidElement(child)) return [child];
    const key = `${prefix}/${child.key ?? index}`;
    return child.type === Fragment
      ? flatten((child.props as { children?: ReactNode }).children, key)
      : [cloneElement(child, { key })];
  });
}

function groupChildren(children: ReactNode, skip?: GroupProps["skip"]) {
  const items = flatten(children);
  const excluded = items.map(
    (child) => !isValidElement(child) || !!skip?.(child),
  );
  const count = excluded.filter((value) => !value).length;
  let index = 0;
  return items.map((child, position) => {
    if (!isValidElement<Record<string, unknown>>(child)) return child;
    if (excluded[position])
      return cloneElement(child, { "data-group-skip": "" });
    const current = index++;
    return cloneElement(child, {
      "data-group-item": "",
      "data-group-first": current === 0 ? "" : undefined,
      "data-group-last": current === count - 1 ? "" : undefined,
      style: {
        ...(child.props.style as CSSProperties),
        "--brick-group-index": current,
        "--brick-group-count": count,
      },
    });
  });
}

function mergeClassName(className: string | undefined) {
  return className ? `brick-group ${className}` : "brick-group";
}

function GroupImpl(
  {
    as = "div",
    asChild = false,
    attached = false,
    children,
    className,
    gap = 2,
    grow = false,
    orientation = "horizontal",
    align = "center",
    justify = "start",
    wrap = "nowrap",
    stacking,
    skip,
    slot = "group",
    style,
    ...props
  }: GroupProps,
  ref: ForwardedRef<HTMLElement>,
) {
  const managed = skip !== undefined || stacking !== undefined;
  const orientations = normalizeResponsiveValue(orientation);
  let direction: GroupOrientation = orientations.initial ?? "horizontal";
  const orientationAttributes = Object.fromEntries(
    ["initial", "sm", "md", "lg", "xl"].map((key) => {
      direction =
        (orientations as Record<string, GroupOrientation>)[key] ?? direction;
      return [
        key === "initial" ? "data-orientation" : `data-orientation-${key}`,
        direction,
      ];
    }),
  );
  const hostProps = {
    ...props,
    className: mergeClassName(className),
    "data-attached": attached ? "" : undefined,
    ...responsiveDataAttributes("data-grow", grow, { defaultValue: false }),
    "data-grow":
      grow === true
        ? ""
        : typeof grow === "object" && grow.initial
          ? ""
          : undefined,
    ...orientationAttributes,
    "data-orientation": orientations.initial ?? "horizontal",
    "data-managed": managed ? "" : undefined,
    "data-stacking": stacking,
    "data-slot": slot,
    ref,
    style: {
      ...groupValues("direction", orientation, (value) =>
        value === "vertical" ? "column" : "row",
      ),
      ...groupValues("align", align),
      ...groupValues("justify", justify),
      ...groupValues("wrap", wrap),
      ...groupValues("display", grow, (value) =>
        value ? "flex" : "inline-flex",
      ),
      ...groupValues("growth", grow, (value) => (value ? "1" : "0")),
      ...groupValues("basis", grow, (value) => (value ? "0px" : "auto")),
      ...responsiveSpacingStyles("--brick-group-gap", gap),
      ...style,
    },
  };
  if (asChild) {
    const child = Children.only(children) as ReactElement<
      Record<string, unknown>
    >;
    if (child.type === Fragment)
      throw new Error("Group asChild requires one non-Fragment host.");
    const composed = stackHost(child, hostProps, ref);
    return managed
      ? cloneElement(
          composed,
          {},
          groupChildren(child.props.children as ReactNode, skip),
        )
      : composed;
  }
  return createElement(
    as,
    hostProps,
    managed ? groupChildren(children, skip) : children,
  );
}

export const Group = forwardRef<HTMLElement, GroupProps>(GroupImpl);
Group.displayName = "Group";

import {
  createElement,
  forwardRef,
  type CSSProperties,
  type ForwardedRef,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import {
  responsiveSpacingStyles,
  type SpacingValue,
} from "../_spacing-value/SpacingValue.js";

export type GroupElement = "div" | "span";
export type GroupOrientation = "horizontal" | "vertical";

type GroupNativeProps = Omit<
  HTMLAttributes<HTMLElement>,
  "children" | "className" | "style"
>;

export interface GroupProps extends GroupNativeProps {
  as?: GroupElement;
  attached?: boolean;
  children?: ReactNode;
  gap?: SpacingValue;
  grow?: boolean;
  orientation?: GroupOrientation;
  className?: string;
  style?: CSSProperties;
  slot?: string;
}

function mergeClassName(className: string | undefined) {
  return className ? `brick-group ${className}` : "brick-group";
}

function GroupImpl(
  {
    as = "div",
    attached = false,
    children,
    className,
    gap = 2,
    grow = false,
    orientation = "horizontal",
    slot = "group",
    style,
    ...props
  }: GroupProps,
  ref: ForwardedRef<HTMLElement>,
) {
  return createElement(
    as,
    {
      ...props,
      className: mergeClassName(className),
      "data-attached": attached ? "" : undefined,
      "data-grow": grow ? "" : undefined,
      "data-orientation": orientation,
      "data-slot": slot,
      ref,
      style: {
        ...responsiveSpacingStyles("--brick-group-gap", gap),
        ...style,
      },
    },
    children,
  );
}

export const Group = forwardRef<HTMLElement, GroupProps>(GroupImpl);
Group.displayName = "Group";

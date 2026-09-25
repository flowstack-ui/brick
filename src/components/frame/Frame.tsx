import {
  createElement,
  forwardRef,
  type CSSProperties,
  type ForwardedRef,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react";
import { layoutHost } from "../_internal/layout-host.js";
import type {
  ResponsiveBreakpoint,
  ResponsiveValue,
} from "../_responsive-value/ResponsiveValue.js";
import { normalizeResponsiveValue } from "../_responsive-value/ResponsiveValue.js";

export type { ResponsiveValue };
export type FrameLength = string | number;
export type FrameElement =
  | "div"
  | "span"
  | "section"
  | "article"
  | "aside"
  | "main"
  | "header"
  | "footer"
  | "nav"
  | "ul"
  | "ol"
  | "li";

type FrameNativeProps = Omit<
  HTMLAttributes<HTMLElement>,
  "children" | "className" | "style"
>;
type FrameHostProps =
  | { as?: FrameElement; asChild?: false; children?: ReactNode }
  | { as?: never; asChild: true; children: ReactElement };

export type FrameProps = FrameNativeProps &
  FrameHostProps & {
    inlineSize?: ResponsiveValue<FrameLength>;
    minInlineSize?: ResponsiveValue<FrameLength>;
    maxInlineSize?: ResponsiveValue<FrameLength>;
    blockSize?: ResponsiveValue<FrameLength>;
    minBlockSize?: ResponsiveValue<FrameLength>;
    maxBlockSize?: ResponsiveValue<FrameLength>;
    className?: string;
    style?: CSSProperties;
    slot?: string;
  };

type FrameProperty =
  | "inline-size"
  | "min-inline-size"
  | "max-inline-size"
  | "block-size"
  | "min-block-size"
  | "max-block-size";
type FrameStyle = CSSProperties &
  Record<`--brick-frame-${string}`, string | number | undefined>;
const breakpoints: ResponsiveBreakpoint[] = ["sm", "md", "lg", "xl"];

function serializeLength(value: FrameLength) {
  if (typeof value === "number" && (!Number.isFinite(value) || value < 0)) {
    throw new RangeError(
      "Frame dimensions must be finite non-negative numbers.",
    );
  }
  return typeof value === "number" && value !== 0
    ? `${value}px`
    : String(value);
}

function constraintVariables(
  property: FrameProperty,
  value: ResponsiveValue<FrameLength> | undefined,
) {
  if (value === undefined) return {};
  const values = normalizeResponsiveValue(value);
  const variables: FrameStyle = {};
  if (values.initial !== undefined) {
    variables[`--brick-frame-${property}`] = serializeLength(values.initial);
  }
  for (const breakpoint of breakpoints) {
    const next = (values as Partial<Record<ResponsiveBreakpoint, FrameLength>>)[
      breakpoint
    ];
    if (next !== undefined) {
      variables[`--brick-frame-${property}-${breakpoint}`] =
        serializeLength(next);
    }
  }
  return variables;
}

function mergeClassName(className: string | undefined) {
  return className ? `brick-frame ${className}` : "brick-frame";
}

function constraintActivation(
  property: FrameProperty,
  value: ResponsiveValue<FrameLength> | undefined,
) {
  if (value === undefined) return {};
  const values = normalizeResponsiveValue(value);
  const first = (["initial", ...breakpoints] as const).find(
    (key) => values[key] !== undefined,
  );
  if (!first)
    throw new TypeError("Frame responsive constraints must not be empty.");
  return { [`data-frame-${property}`]: first };
}

function FrameImpl(
  {
    as = "div",
    asChild = false,
    blockSize,
    children,
    className,
    inlineSize,
    maxBlockSize,
    maxInlineSize,
    minBlockSize,
    minInlineSize,
    slot = "frame",
    style,
    ...props
  }: FrameProps,
  ref: ForwardedRef<HTMLElement>,
) {
  const frameStyle: FrameStyle = {
    ...constraintVariables("inline-size", inlineSize),
    ...constraintVariables("min-inline-size", minInlineSize),
    ...constraintVariables("max-inline-size", maxInlineSize),
    ...constraintVariables("block-size", blockSize),
    ...constraintVariables("min-block-size", minBlockSize),
    ...constraintVariables("max-block-size", maxBlockSize),
    ...style,
  };
  const frameProps = {
    ...props,
    className: mergeClassName(className),
    "data-frame": "",
    ...constraintActivation("inline-size", inlineSize),
    ...constraintActivation("min-inline-size", minInlineSize),
    ...constraintActivation("max-inline-size", maxInlineSize),
    ...constraintActivation("block-size", blockSize),
    ...constraintActivation("min-block-size", minBlockSize),
    ...constraintActivation("max-block-size", maxBlockSize),
    "data-slot": slot,
    ref,
    style: frameStyle,
  };

  if (asChild) return layoutHost(children, frameProps, ref, "Frame");

  return createElement(as, frameProps, children);
}

export const Frame = forwardRef<HTMLElement, FrameProps>(FrameImpl);
Frame.displayName = "Frame";

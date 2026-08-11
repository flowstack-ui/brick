import {
  Children,
  cloneElement,
  createElement,
  forwardRef,
  type CSSProperties,
  type ForwardedRef,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
  type Ref,
} from "react";
import type {
  ResponsiveBreakpoint,
  ResponsiveValue,
} from "../_responsive-value/ResponsiveValue.js";

export type { ResponsiveValue };
export type FrameLength = string | number;
export type FrameElement =
  | "div" | "span" | "section" | "article" | "aside" | "main"
  | "header" | "footer" | "nav" | "ul" | "ol" | "li";

type FrameNativeProps = Omit<HTMLAttributes<HTMLElement>, "children" | "className" | "style">;
type FrameHostProps =
  | { as?: FrameElement; asChild?: false; children?: ReactNode }
  | { as?: never; asChild: true; children: ReactElement };

export type FrameProps = FrameNativeProps & FrameHostProps & {
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
  | "inline-size" | "min-inline-size" | "max-inline-size"
  | "block-size" | "min-block-size" | "max-block-size";
type FrameStyle = CSSProperties & Record<`--brick-frame-${string}`, string | number | undefined>;
const breakpoints: ResponsiveBreakpoint[] = ["sm", "md", "lg", "xl"];

function serializeLength(value: FrameLength) {
  return typeof value === "number" && value !== 0 ? `${value}px` : String(value);
}

function constraintVariables(property: FrameProperty, value: ResponsiveValue<FrameLength> | undefined) {
  if (value === undefined) return {};
  const values = typeof value === "object" && value !== null && "initial" in value
    ? value
    : { initial: value };
  const variables: FrameStyle = {
    [`--brick-frame-${property}`]: serializeLength(values.initial),
  };
  for (const breakpoint of breakpoints) {
    const next = (values as Partial<Record<ResponsiveBreakpoint, FrameLength>>)[breakpoint];
    if (next !== undefined) {
      variables[`--brick-frame-${property}-${breakpoint}`] = serializeLength(next);
    }
  }
  return variables;
}

function mergeClassName(className: string | undefined) {
  return className ? `brick-frame ${className}` : "brick-frame";
}

function composeRefs<T>(...refs: Array<Ref<T> | undefined>) {
  return (value: T | null) => {
    for (const ref of refs) {
      if (typeof ref === "function") ref(value);
      else if (ref) ref.current = value;
    }
  };
}

function mergeComposedProps(original: Record<string, unknown>, override: Record<string, unknown>) {
  const merged = { ...original, ...override };
  for (const [key, value] of Object.entries(override)) {
    const current = original[key];
    if (key.startsWith("on") && typeof current === "function" && typeof value === "function") {
      merged[key] = (...args: unknown[]) => { value(...args); current(...args); };
    } else if (key === "className" && typeof current === "string" && typeof value === "string") {
      merged[key] = `${current} ${value}`;
    } else if (key === "style" && current && value && typeof current === "object" && typeof value === "object") {
      merged[key] = { ...current, ...value };
    }
  }
  return merged;
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
    "data-slot": slot,
    ref,
    style: frameStyle,
  };

  if (asChild) {
    const child = Children.only(children) as ReactElement<Record<string, unknown>>;
    const childRef = (
      "ref" in child.props
        ? child.props.ref
        : (child as ReactElement & { ref?: Ref<HTMLElement> }).ref
    ) as Ref<HTMLElement> | undefined;
    return cloneElement(child, mergeComposedProps(child.props, {
      ...frameProps,
      ref: childRef || ref ? composeRefs(childRef, ref) : undefined,
    }));
  }

  return createElement(as, frameProps, children);
}

export const Frame = forwardRef<HTMLElement, FrameProps>(FrameImpl);
Frame.displayName = "Frame";

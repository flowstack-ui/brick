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
import { normalizeResponsiveValue } from "../_responsive-value/ResponsiveValue.js";

export type { ResponsiveValue };
export type CenterLength = string | number;
export type CenterElement =
  | "div" | "span" | "section" | "article" | "aside" | "main"
  | "header" | "footer" | "nav" | "ul" | "ol" | "li";

type CenterNativeProps = Omit<
  HTMLAttributes<HTMLElement>,
  "children" | "className" | "style"
>;
type CenterHostProps =
  | { as?: CenterElement; asChild?: false; children?: ReactNode }
  | { as?: never; asChild: true; children: ReactElement };

export type CenterProps = CenterNativeProps & CenterHostProps & {
  inline?: boolean;
  className?: string;
  style?: CSSProperties;
  slot?: string;
};

export type SquareProps = CenterProps & {
  size: ResponsiveValue<CenterLength>;
};

export type CircleProps = SquareProps;

type CenterStyle = CSSProperties & Record<`--brick-center-${string}`, string | number | undefined>;
const breakpoints: ResponsiveBreakpoint[] = ["sm", "md", "lg", "xl"];

function serializeLength(value: CenterLength) {
  return typeof value === "number" && value !== 0 ? `${value}px` : String(value);
}

function sizeVariables(size: ResponsiveValue<CenterLength> | undefined) {
  if (size === undefined) return {};
  const values = normalizeResponsiveValue(size);
  const variables: CenterStyle = {};
  if (values.initial !== undefined) {
    variables["--brick-center-size"] = serializeLength(values.initial);
  }
  for (const breakpoint of breakpoints) {
    const next = (values as Partial<Record<ResponsiveBreakpoint, CenterLength>>)[breakpoint];
    if (next !== undefined) {
      variables[`--brick-center-size-${breakpoint}`] = serializeLength(next);
    }
  }
  return variables;
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

type CenterImplementationProps = CenterProps & {
  identity: "center" | "square" | "circle";
  size?: ResponsiveValue<CenterLength>;
};

function CenterImpl(
  {
    as = "div",
    asChild = false,
    children,
    className,
    identity,
    inline = false,
    size,
    slot = identity,
    style,
    ...props
  }: CenterImplementationProps,
  ref: ForwardedRef<HTMLElement>,
) {
  const identityClasses = identity === "center"
    ? "brick-center"
    : identity === "square"
      ? "brick-center brick-square"
      : "brick-center brick-square brick-circle";
  const centerProps = {
    ...props,
    className: className ? `${identityClasses} ${className}` : identityClasses,
    "data-inline": inline ? "" : undefined,
    "data-slot": slot,
    ref,
    style: {
      ...sizeVariables(size),
      ...style,
    },
  };

  if (asChild) {
    const child = Children.only(children) as ReactElement<Record<string, unknown>>;
    const childRef = (
      "ref" in child.props
        ? child.props.ref
        : (child as ReactElement & { ref?: Ref<HTMLElement> }).ref
    ) as Ref<HTMLElement> | undefined;
    return cloneElement(child, mergeComposedProps(child.props, {
      ...centerProps,
      ref: childRef || ref ? composeRefs(childRef, ref) : undefined,
    }));
  }

  return createElement(as, centerProps, children);
}

const CenterRoot = forwardRef<HTMLElement, CenterImplementationProps>(CenterImpl);

export const Center = forwardRef<HTMLElement, CenterProps>(function Center(props, ref) {
  return <CenterRoot {...props} identity="center" ref={ref} />;
});

export const Square = forwardRef<HTMLElement, SquareProps>(function Square(
  { size, ...props },
  ref,
) {
  return <CenterRoot {...props} identity="square" ref={ref} size={size} />;
});

export const Circle = forwardRef<HTMLElement, CircleProps>(function Circle(
  { size, ...props },
  ref,
) {
  return <CenterRoot {...props} identity="circle" ref={ref} size={size} />;
});

Center.displayName = "Center";
Square.displayName = "Square";
Circle.displayName = "Circle";

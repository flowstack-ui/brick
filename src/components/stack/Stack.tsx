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
import {
  responsiveDataAttributes,
  type ResponsiveBreakpoint,
  type ResponsiveValue,
} from "../_responsive-value/ResponsiveValue.js";

export type { ResponsiveValue };
export type StackBreakpoint = ResponsiveBreakpoint;
export type StackElement =
  | "div" | "span" | "section" | "article" | "nav" | "header"
  | "footer" | "main" | "aside" | "ul" | "ol" | "li";
export type StackItemElement =
  | "div" | "span" | "section" | "article" | "header" | "footer"
  | "aside" | "li";
export type StackDirection = "row" | "column";
export type StackGap = "0" | "1" | "2" | "3" | "4" | "5" | "6";
export type StackAlign = "stretch" | "start" | "center" | "end" | "baseline";
export type StackJustify =
  | "start" | "center" | "end" | "between" | "around" | "evenly";
export type StackItemAlign = "auto" | StackAlign;
export type StackItemFlex = "content" | "fixed" | "auto" | 1 | 2 | 3 | 4;

type StackNativeProps = Omit<HTMLAttributes<HTMLElement>, "children" | "className" | "style">;

export interface StackProps extends StackNativeProps {
  as?: StackElement;
  children?: ReactNode;
  direction?: ResponsiveValue<StackDirection>;
  gap?: ResponsiveValue<StackGap>;
  align?: ResponsiveValue<StackAlign>;
  justify?: ResponsiveValue<StackJustify>;
  wrap?: ResponsiveValue<boolean>;
  startSpacing?: ResponsiveValue<StackGap>;
  endSpacing?: ResponsiveValue<StackGap>;
  className?: string;
  style?: CSSProperties;
  slot?: string;
}

export type HStackProps = Omit<StackProps, "direction">;
export type VStackProps = Omit<StackProps, "direction">;

type StackItemHostProps =
  | { as?: StackItemElement; asChild?: false; children?: ReactNode }
  | { as?: never; asChild: true; children: ReactElement };

export type StackItemProps = StackNativeProps & StackItemHostProps & {
  align?: ResponsiveValue<StackItemAlign>;
  flex?: ResponsiveValue<StackItemFlex>;
  className?: string;
  style?: CSSProperties;
  slot?: string;
};

function mergeClassName(base: string, className: string | undefined) {
  return className ? `${base} ${className}` : base;
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

function StackImpl(
  {
    as = "div",
    direction = "column",
    gap = "0",
    align = "stretch",
    justify = "start",
    wrap = false,
    startSpacing = "0",
    endSpacing = "0",
    className,
    slot = "stack",
    children,
    ...props
  }: StackProps,
  ref: ForwardedRef<HTMLElement>,
) {
  const wrapAttributes = responsiveDataAttributes("data-wrap", wrap, { defaultValue: false });
  if (wrapAttributes["data-wrap"] === "true") wrapAttributes["data-wrap"] = "";
  return createElement(as, {
    ...props,
    ...responsiveDataAttributes("data-direction", direction, { alwaysInitial: true }),
    ...responsiveDataAttributes("data-gap", gap, { alwaysInitial: true }),
    ...responsiveDataAttributes("data-align", align, { defaultValue: "stretch" }),
    ...responsiveDataAttributes("data-justify", justify, { defaultValue: "start" }),
    ...wrapAttributes,
    ...responsiveDataAttributes("data-start-spacing", startSpacing, { defaultValue: "0" }),
    ...responsiveDataAttributes("data-end-spacing", endSpacing, { defaultValue: "0" }),
    className: mergeClassName("brick-stack", className),
    "data-slot": slot,
    ref,
  }, children);
}

function StackItemImpl(
  {
    as = "div",
    asChild = false,
    align = "auto",
    flex = "content",
    className,
    slot = "stack-item",
    style,
    children,
    ...props
  }: StackItemProps,
  ref: ForwardedRef<HTMLElement>,
) {
  const itemProps = {
    ...props,
    ...responsiveDataAttributes("data-align", align, { defaultValue: "auto" }),
    ...responsiveDataAttributes("data-flex", flex, { alwaysInitial: true }),
    className: mergeClassName("brick-stack-item", className),
    "data-slot": slot,
    ref,
    style,
  };

  if (asChild) {
    const child = Children.only(children) as ReactElement<Record<string, unknown>>;
    const childRef = (
      "ref" in child.props
        ? child.props.ref
        : (child as ReactElement & { ref?: Ref<HTMLElement> }).ref
    ) as Ref<HTMLElement> | undefined;
    return cloneElement(child, mergeComposedProps(child.props, {
      ...itemProps,
      ref: childRef || ref ? composeRefs(childRef, ref) : undefined,
    }));
  }

  return createElement(as, itemProps, children);
}

const StackRoot = forwardRef<HTMLElement, StackProps>(StackImpl);
StackRoot.displayName = "Stack";

const StackItem = forwardRef<HTMLElement, StackItemProps>(StackItemImpl);
StackItem.displayName = "Stack.Item";

export const Stack = Object.assign(StackRoot, { Item: StackItem });

export const HStack = forwardRef<HTMLElement, HStackProps>(
  function HStack({ align = "center", ...props }, ref) {
    return <StackRoot {...props} align={align} direction="row" ref={ref} />;
  },
);
HStack.displayName = "HStack";

export const VStack = forwardRef<HTMLElement, VStackProps>(
  function VStack(props, ref) {
    return <StackRoot {...props} direction="column" ref={ref} />;
  },
);
VStack.displayName = "VStack";

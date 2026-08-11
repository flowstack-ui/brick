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
  type ResponsiveValue,
} from "../_responsive-value/ResponsiveValue.js";

export type { ResponsiveValue };

export type ZStackElement =
  | "div" | "span" | "section" | "article" | "nav" | "header"
  | "footer" | "main" | "aside" | "ul" | "ol" | "li";
export type ZStackItemElement =
  | "div" | "span" | "section" | "article" | "header" | "footer"
  | "aside" | "li";
export type ZStackAlign = "stretch" | "start" | "center" | "end";
export type ZStackJustify = "stretch" | "start" | "center" | "end";
export type ZStackItemAlign = "auto" | ZStackAlign;
export type ZStackItemJustify = "auto" | ZStackJustify;

type NativeProps = Omit<HTMLAttributes<HTMLElement>, "children" | "className" | "style">;

export interface ZStackRootProps extends NativeProps {
  as?: ZStackElement;
  children?: ReactNode;
  align?: ResponsiveValue<ZStackAlign>;
  justify?: ResponsiveValue<ZStackJustify>;
  className?: string;
  style?: CSSProperties;
  slot?: string;
}

type ZStackItemHostProps =
  | { as?: ZStackItemElement; asChild?: false; children?: ReactNode }
  | { as?: never; asChild: true; children: ReactElement };

export type ZStackItemProps = NativeProps & ZStackItemHostProps & {
  align?: ResponsiveValue<ZStackItemAlign>;
  justify?: ResponsiveValue<ZStackItemJustify>;
  className?: string;
  style?: CSSProperties;
  slot?: string;
};

function classes(base: string, className?: string) {
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

function ZStackRootImpl(
  { as = "div", align = "stretch", justify = "stretch", className, slot = "z-stack", children, ...props }: ZStackRootProps,
  ref: ForwardedRef<HTMLElement>,
) {
  return createElement(as, {
    ...props,
    ...responsiveDataAttributes("data-align", align, { defaultValue: "stretch" }),
    ...responsiveDataAttributes("data-justify", justify, { defaultValue: "stretch" }),
    className: classes("brick-z-stack", className),
    "data-slot": slot,
    ref,
  }, children);
}

function ZStackItemImpl(
  { as = "div", asChild = false, align = "auto", justify = "auto", className, slot = "z-stack-item", style, children, ...props }: ZStackItemProps,
  ref: ForwardedRef<HTMLElement>,
) {
  const itemProps = {
    ...props,
    ...responsiveDataAttributes("data-align", align, { defaultValue: "auto" }),
    ...responsiveDataAttributes("data-justify", justify, { defaultValue: "auto" }),
    className: classes("brick-z-stack-item", className),
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

const ZStackRoot = forwardRef<HTMLElement, ZStackRootProps>(ZStackRootImpl);
ZStackRoot.displayName = "ZStack.Root";
const ZStackItem = forwardRef<HTMLElement, ZStackItemProps>(ZStackItemImpl);
ZStackItem.displayName = "ZStack.Item";

export const ZStack = Object.freeze({ Root: ZStackRoot, Item: ZStackItem });
export { ZStackRoot, ZStackItem };

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
import {
  responsiveDataAttributes,
  type ResponsiveValue,
} from "../_responsive-value/ResponsiveValue.js";
import {
  responsiveSpacingStyles,
  type SpacingValue,
} from "../_spacing-value/SpacingValue.js";

export type { ResponsiveValue };
export type { SpacingValue };

export type ZStackElement =
  | "div"
  | "span"
  | "section"
  | "article"
  | "nav"
  | "header"
  | "footer"
  | "main"
  | "aside"
  | "ul"
  | "ol"
  | "li";
export type ZStackItemElement =
  | "div"
  | "span"
  | "section"
  | "article"
  | "header"
  | "footer"
  | "aside"
  | "li";
export type ZStackAlign = "stretch" | "start" | "center" | "end";
export type ZStackJustify = "stretch" | "start" | "center" | "end";
export type ZStackItemAlign = "auto" | ZStackAlign;
export type ZStackItemJustify = "auto" | ZStackJustify;
export type ZStackIsolation = "contained" | "open";
export type ZStackItemLayer = "base" | "content" | "action";

type NativeProps = Omit<
  HTMLAttributes<HTMLElement>,
  "children" | "className" | "style"
>;

type ZStackRootHostProps =
  | { as?: ZStackElement; asChild?: false; children?: ReactNode }
  | { as?: never; asChild: true; children: ReactElement };

export type ZStackRootProps = NativeProps &
  ZStackRootHostProps & {
    align?: ResponsiveValue<ZStackAlign>;
    isolation?: ZStackIsolation;
    justify?: ResponsiveValue<ZStackJustify>;
    className?: string;
    style?: CSSProperties;
    slot?: string;
  };

type ZStackItemHostProps =
  | { as?: ZStackItemElement; asChild?: false; children?: ReactNode }
  | { as?: never; asChild: true; children: ReactElement };

export type ZStackItemProps = NativeProps &
  ZStackItemHostProps & {
    align?: ResponsiveValue<ZStackItemAlign>;
    edgeSpacing?: ResponsiveValue<SpacingValue>;
    justify?: ResponsiveValue<ZStackItemJustify>;
    layer?: ZStackItemLayer;
    className?: string;
    style?: CSSProperties;
    slot?: string;
  };

function classes(base: string, className?: string) {
  return className ? `${base} ${className}` : base;
}

function ZStackRootImpl(
  {
    as = "div",
    asChild = false,
    align = "stretch",
    isolation = "contained",
    justify = "stretch",
    className,
    slot = "z-stack",
    children,
    ...props
  }: ZStackRootProps,
  ref: ForwardedRef<HTMLElement>,
) {
  const rootProps = {
    ...props,
    ...responsiveDataAttributes("data-align", align, {
      defaultValue: "stretch",
    }),
    ...responsiveDataAttributes("data-justify", justify, {
      defaultValue: "stretch",
    }),
    "data-isolation": isolation === "contained" ? undefined : isolation,
    className: classes("brick-z-stack", className),
    "data-slot": slot,
    ref,
  };
  return asChild
    ? layoutHost(children, rootProps, ref, "ZStack.Root")
    : createElement(as, rootProps, children);
}

function ZStackItemImpl(
  {
    as = "div",
    asChild = false,
    align = "auto",
    edgeSpacing,
    justify = "auto",
    layer = "base",
    className,
    slot = "z-stack-item",
    style,
    children,
    ...props
  }: ZStackItemProps,
  ref: ForwardedRef<HTMLElement>,
) {
  const itemProps = {
    ...props,
    ...responsiveDataAttributes("data-align", align, { defaultValue: "auto" }),
    ...(edgeSpacing === undefined
      ? {}
      : responsiveDataAttributes("data-edge-spacing", edgeSpacing, {
          alwaysInitial: true,
        })),
    ...responsiveDataAttributes("data-justify", justify, {
      defaultValue: "auto",
    }),
    "data-layer": layer === "base" ? undefined : layer,
    className: classes("brick-z-stack-item", className),
    "data-slot": slot,
    ref,
    style: {
      ...(edgeSpacing === undefined
        ? {}
        : responsiveSpacingStyles(
            "--brick-z-stack-item-edge-spacing",
            edgeSpacing,
          )),
      ...style,
    },
  };
  if (asChild) return layoutHost(children, itemProps, ref, "ZStack.Item");
  return createElement(as, itemProps, children);
}

const ZStackRoot = forwardRef<HTMLElement, ZStackRootProps>(ZStackRootImpl);
ZStackRoot.displayName = "ZStack.Root";
const ZStackItem = forwardRef<HTMLElement, ZStackItemProps>(ZStackItemImpl);
ZStackItem.displayName = "ZStack.Item";

export const ZStack = Object.freeze({ Root: ZStackRoot, Item: ZStackItem });
export { ZStackRoot, ZStackItem };

import {
  createElement,
  forwardRef,
  type CSSProperties,
  type ForwardedRef,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react";
import {
  responsiveDataAttributes,
  type ResponsiveBreakpoint,
  type ResponsiveValue,
} from "../_responsive-value/ResponsiveValue.js";
import type { SpacingValue } from "../_spacing-value/SpacingValue.js";
import { stackHost } from "./stack-host.js";
import { separatedChildren, StackSeparator } from "./StackSeparator.js";
import {
  basisValue,
  cssValue,
  enumValue,
  factor,
  spacingValue,
  stackStyles,
  stackValues,
} from "./stack-values.js";

export type { ResponsiveValue, SpacingValue };
export type StackBreakpoint = ResponsiveBreakpoint;
export type StackElement =
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
export type StackItemElement =
  | "div"
  | "span"
  | "section"
  | "article"
  | "header"
  | "footer"
  | "aside"
  | "li";
export type StackDirection =
  | "row"
  | "column"
  | "row-reverse"
  | "column-reverse";
export type StackGap = SpacingValue;
export type StackAlign = NonNullable<CSSProperties["alignItems"]>;
export type StackJustify =
  | NonNullable<CSSProperties["justifyContent"]>
  | "between"
  | "around"
  | "evenly";
export type StackItemAlign = NonNullable<CSSProperties["alignSelf"]>;
export type StackItemFlex = "content" | "fixed" | "auto" | 1 | 2 | 3 | 4;
export type StackWrap = boolean | "nowrap" | "wrap" | "wrap-reverse";
export type StackAlignContent = NonNullable<CSSProperties["alignContent"]>;
export type StackBasis = string | number;
type NativeProps = Omit<
  HTMLAttributes<HTMLElement>,
  "children" | "className" | "style"
>;
type HostProps<T> =
  | { as?: T; asChild?: false; children?: ReactNode }
  | { as?: never; asChild: true; children: ReactElement };
type LayoutProps = {
  direction?: ResponsiveValue<StackDirection>;
  gap?: ResponsiveValue<StackGap>;
  rowGap?: ResponsiveValue<StackGap>;
  columnGap?: ResponsiveValue<StackGap>;
  align?: ResponsiveValue<StackAlign>;
  justify?: ResponsiveValue<StackJustify>;
  alignContent?: ResponsiveValue<StackAlignContent>;
  wrap?: ResponsiveValue<StackWrap>;
  inline?: ResponsiveValue<boolean>;
  startSpacing?: ResponsiveValue<StackGap>;
  endSpacing?: ResponsiveValue<StackGap>;
  className?: string;
  style?: CSSProperties;
  slot?: string;
};
type StackHostProps =
  | (HostProps<StackElement> & { separator?: never })
  | { as?: Exclude<StackElement, "ul" | "ol">; asChild?: false; children?: ReactNode; separator: ReactElement };
export type StackProps = NativeProps & StackHostProps & LayoutProps;
export type HStackProps = NativeProps & StackHostProps & Omit<LayoutProps, "direction">;
export type VStackProps = HStackProps;
export type StackItemProps = NativeProps &
  HostProps<StackItemElement> & {
    align?: ResponsiveValue<StackItemAlign>;
    flex?: ResponsiveValue<StackItemFlex>;
    grow?: ResponsiveValue<number>;
    shrink?: ResponsiveValue<number>;
    basis?: ResponsiveValue<StackBasis>;
    order?: ResponsiveValue<number>;
    marginInlineStart?: ResponsiveValue<SpacingValue>;
    marginInlineEnd?: ResponsiveValue<SpacingValue>;
    marginBlockStart?: ResponsiveValue<SpacingValue>;
    marginBlockEnd?: ResponsiveValue<SpacingValue>;
    className?: string;
    style?: CSSProperties;
    slot?: string;
  };

const directions = ["column", "row", "column-reverse", "row-reverse"] as const;
const recipes = {
  content: [0, 1, "auto"],
  fixed: [0, 0, "auto"],
  auto: [1, 1, "auto"],
  1: [1, 1, "0px"],
  2: [2, 1, "0px"],
  3: [3, 1, "0px"],
  4: [4, 1, "0px"],
} as const;
const justifyValue = (value: StackJustify) =>
  ({
    between: "space-between",
    around: "space-around",
    evenly: "space-evenly",
  })[value as "between"] ?? cssValue(value, "start");
const metadata = <T,>(
  attribute: `data-${string}`,
  value: ResponsiveValue<T> | undefined,
  options = {},
) =>
  value === undefined
    ? {}
    : responsiveDataAttributes(
        attribute,
        stackValues(value) as ResponsiveValue<T>,
        options,
      );

function StackImpl(
  {
    as = "div",
    asChild = false,
    direction = "column",
    gap = "0",
    rowGap,
    columnGap,
    align = "stretch",
    justify = "start",
    alignContent,
    wrap = false,
    inline,
    startSpacing,
    endSpacing,
    className,
    slot = "stack",
    style,
    children,
    separator,
    ...props
  }: StackProps,
  ref: ForwardedRef<HTMLElement>,
) {
  if (separator !== undefined && (asChild || as === "ul" || as === "ol")) throw new TypeError("Stack separator cannot be combined with asChild or a list host. Use explicit valid children instead.");
  const wrapAttributes = metadata("data-wrap", wrap, { defaultValue: false });
  if (wrapAttributes["data-wrap"] === "true") wrapAttributes["data-wrap"] = "";
  const owner = {
    ...props,
    ...metadata("data-direction", direction, { alwaysInitial: true }),
    ...metadata("data-stack-direction", direction, { alwaysInitial: true }),
    ...metadata("data-gap", gap, { alwaysInitial: true }),
    ...metadata("data-align", align, { defaultValue: "stretch" }),
    ...metadata("data-justify", justify, { defaultValue: "start" }),
    ...metadata("data-start-spacing", startSpacing, { defaultValue: "0" }),
    ...metadata("data-end-spacing", endSpacing, { defaultValue: "0" }),
    ...wrapAttributes,
    "data-stack-layout": "",
    "data-stack-separated": separator !== undefined ? "" : undefined,
    "data-stack-edges":
      startSpacing !== undefined || endSpacing !== undefined ? "" : undefined,
    className: ["brick-stack", className].filter(Boolean).join(" "),
    "data-slot": slot,
    ref,
    style: {
      ...stackStyles("--brick-stack-direction", direction, (v) =>
        enumValue(v, directions, "column"),
      ),
      ...stackStyles("--brick-stack-gap", gap, spacingValue),
      ...stackStyles("--brick-stack-row-gap", rowGap, spacingValue),
      ...stackStyles("--brick-stack-column-gap", columnGap, spacingValue),
      ...stackStyles("--brick-stack-align", align, (v) =>
        cssValue(v, "stretch"),
      ),
      ...stackStyles("--brick-stack-justify", justify, justifyValue),
      ...stackStyles("--brick-stack-align-content", alignContent, cssValue),
      ...stackStyles("--brick-stack-wrap", wrap, (v) =>
        typeof v === "boolean"
          ? v
            ? "wrap"
            : "nowrap"
          : enumValue(v, ["nowrap", "wrap", "wrap-reverse"], "nowrap"),
      ),
      ...stackStyles("--brick-stack-display", inline, (v) =>
        enumValue(v, [true, false], "false") === "true"
          ? "inline-flex"
          : "flex",
      ),
      ...stackStyles("--brick-stack-start-spacing", startSpacing, spacingValue),
      ...stackStyles("--brick-stack-end-spacing", endSpacing, spacingValue),
      ...style,
    },
  };
  return asChild
    ? stackHost(children, owner, ref)
    : createElement(as, owner, separator === undefined ? children : separatedChildren(children, separator));
}

function StackItemImpl(
  {
    as = "div",
    asChild = false,
    align = "auto",
    flex = "content",
    grow,
    shrink,
    basis,
    order,
    marginInlineStart,
    marginInlineEnd,
    marginBlockStart,
    marginBlockEnd,
    className,
    slot = "stack-item",
    style,
    children,
    ...props
  }: StackItemProps,
  ref: ForwardedRef<HTMLElement>,
) {
  const recipe = (value: StackItemFlex, index: number) =>
    String((recipes[value] ?? recipes.content)[index]);
  const owner = {
    ...props,
    ...metadata("data-align", align, { defaultValue: "auto" }),
    ...metadata("data-flex", flex, { alwaysInitial: true }),
    "data-stack-item-composed": asChild ? "" : undefined,
    "data-stack-item": "",
    "data-stack-margin-inline-start":
      marginInlineStart !== undefined ? "" : undefined,
    "data-stack-margin-inline-end":
      marginInlineEnd !== undefined ? "" : undefined,
    "data-stack-margin-block-start":
      marginBlockStart !== undefined ? "" : undefined,
    "data-stack-margin-block-end":
      marginBlockEnd !== undefined ? "" : undefined,
    className: ["brick-stack-item", className].filter(Boolean).join(" "),
    "data-slot": slot,
    ref,
    style: {
      ...stackStyles("--brick-stack-item-recipe-grow", flex, (v) =>
        recipe(v, 0),
      ),
      ...stackStyles("--brick-stack-item-recipe-shrink", flex, (v) =>
        recipe(v, 1),
      ),
      ...stackStyles("--brick-stack-item-recipe-basis", flex, (v) =>
        recipe(v, 2),
      ),
      ...stackStyles("--brick-stack-item-grow", grow, (v) => factor(v, 0)),
      ...stackStyles("--brick-stack-item-shrink", shrink, (v) => factor(v, 1)),
      ...stackStyles("--brick-stack-item-basis", basis, basisValue),
      ...stackStyles("--brick-stack-item-order", order, (v) =>
        factor(v, 0, true),
      ),
      ...stackStyles("--brick-stack-item-align", align, (v) =>
        cssValue(v, "auto"),
      ),
      ...stackStyles(
        "--brick-stack-item-margin-inline-start",
        marginInlineStart,
        spacingValue,
      ),
      ...stackStyles(
        "--brick-stack-item-margin-inline-end",
        marginInlineEnd,
        spacingValue,
      ),
      ...stackStyles(
        "--brick-stack-item-margin-block-start",
        marginBlockStart,
        spacingValue,
      ),
      ...stackStyles(
        "--brick-stack-item-margin-block-end",
        marginBlockEnd,
        spacingValue,
      ),
      ...style,
    },
  };
  return asChild
    ? stackHost(children, owner, ref)
    : createElement(as, owner, children);
}
const Root = forwardRef<HTMLElement, StackProps>(StackImpl);
Root.displayName = "Stack";
const Item = forwardRef<HTMLElement, StackItemProps>(StackItemImpl);
Item.displayName = "Stack.Item";
export const Stack = Object.assign(Root, { Item, Separator: StackSeparator });
export const HStack = forwardRef<HTMLElement, HStackProps>(function HStack(
  { align = "center", ...props },
  ref,
) {
  return <Root {...props} direction="row" align={align} ref={ref} />;
});
export const VStack = forwardRef<HTMLElement, VStackProps>(
  function VStack(props, ref) {
    return <Root {...props} direction="column" ref={ref} />;
  },
);

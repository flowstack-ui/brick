import {
  createElement,
  forwardRef,
  type CSSProperties,
  type ForwardedRef,
  type HTMLAttributes,
  type ReactNode,
} from "react";

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

export type StackDirection = "row" | "column";
export type StackGap = "0" | "1" | "2" | "3" | "4" | "5" | "6";
export type StackAlign = "stretch" | "start" | "center" | "end" | "baseline";
export type StackJustify =
  | "start"
  | "center"
  | "end"
  | "between"
  | "around"
  | "evenly";

type StackNativeProps = Omit<
  HTMLAttributes<HTMLElement>,
  "children" | "className" | "style"
>;

export interface StackProps extends StackNativeProps {
  as?: StackElement;
  children?: ReactNode;
  direction?: StackDirection;
  gap?: StackGap;
  align?: StackAlign;
  justify?: StackJustify;
  wrap?: boolean;
  className?: string;
  style?: CSSProperties;
  slot?: string;
}

export type HStackProps = Omit<StackProps, "direction">;
export type VStackProps = Omit<StackProps, "direction">;

function mergeClassName(className: string | undefined) {
  return className ? `brick-stack ${className}` : "brick-stack";
}

function StackImpl(
  {
    as = "div",
    direction = "column",
    gap = "0",
    align = "stretch",
    justify = "start",
    wrap = false,
    className,
    slot = "stack",
    children,
    ...props
  }: StackProps,
  ref: ForwardedRef<HTMLElement>,
) {
  return createElement(
    as,
    {
      ...props,
      className: mergeClassName(className),
      "data-align": align !== "stretch" ? align : undefined,
      "data-direction": direction,
      "data-gap": gap,
      "data-justify": justify !== "start" ? justify : undefined,
      "data-slot": slot,
      "data-wrap": wrap ? "" : undefined,
      ref,
    },
    children,
  );
}

export const Stack = forwardRef<HTMLElement, StackProps>(StackImpl);
Stack.displayName = "Stack";

export const HStack = forwardRef<HTMLElement, HStackProps>(
  function HStack({ align = "center", ...props }, ref) {
    return <Stack {...props} align={align} direction="row" ref={ref} />;
  },
);
HStack.displayName = "HStack";

export const VStack = forwardRef<HTMLElement, VStackProps>(
  function VStack(props, ref) {
    return <Stack {...props} direction="column" ref={ref} />;
  },
);
VStack.displayName = "VStack";

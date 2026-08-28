import {
  Children,
  cloneElement,
  createElement,
  forwardRef,
  Fragment,
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
import {
  resolveSpacingValue,
  type SpacingValue,
} from "../_spacing-value/SpacingValue.js";

export type BleedElement =
  | "div" | "span" | "section" | "article" | "aside" | "main"
  | "header" | "footer" | "nav" | "ul" | "ol" | "li";

type BleedNativeProps = Omit<HTMLAttributes<HTMLElement>, "children" | "className" | "style">;
type BleedHostProps =
  | { as?: BleedElement; asChild?: false; children?: ReactNode }
  | { as?: never; asChild: true; children: ReactElement };

export type BleedProps = BleedNativeProps & BleedHostProps & {
  inline?: ResponsiveValue<SpacingValue>;
  block?: ResponsiveValue<SpacingValue>;
  inlineStart?: ResponsiveValue<SpacingValue>;
  inlineEnd?: ResponsiveValue<SpacingValue>;
  blockStart?: ResponsiveValue<SpacingValue>;
  blockEnd?: ResponsiveValue<SpacingValue>;
  className?: string;
  style?: CSSProperties;
  slot?: string;
};

type Edge = "inline-start" | "inline-end" | "block-start" | "block-end";
type BleedStyle = CSSProperties & Record<`--brick-bleed-${string}`, string | undefined>;
const breakpoints: ResponsiveBreakpoint[] = ["sm", "md", "lg", "xl"];

function normalize(value: ResponsiveValue<SpacingValue> | undefined) {
  if (value === undefined) return undefined;
  return typeof value === "object" && value !== null && "initial" in value
    ? value
    : { initial: value };
}

function edgeVariables(
  edge: Edge,
  axisValue: ResponsiveValue<SpacingValue> | undefined,
  edgeValue: ResponsiveValue<SpacingValue> | undefined,
) {
  const axis = normalize(axisValue);
  const directional = normalize(edgeValue);
  let currentAxis: SpacingValue = axis?.initial ?? 0;
  let currentDirectional: SpacingValue | undefined = directional?.initial;
  const variables: BleedStyle = {
    [`--brick-bleed-${edge}`]: resolveSpacingValue(currentDirectional ?? currentAxis),
  };

  for (const breakpoint of breakpoints) {
    const nextAxis = axis?.[breakpoint];
    const nextDirectional = directional?.[breakpoint];
    if (nextAxis !== undefined) currentAxis = nextAxis;
    if (nextDirectional !== undefined) currentDirectional = nextDirectional;
    variables[`--brick-bleed-${edge}-${breakpoint}`] = resolveSpacingValue(
      currentDirectional ?? currentAxis,
    );
  }
  return variables;
}

function classes(className?: string) {
  return className ? `brick-bleed ${className}` : "brick-bleed";
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

function BleedImpl(
  {
    as = "div",
    asChild = false,
    block,
    blockEnd,
    blockStart,
    children,
    className,
    inline,
    inlineEnd,
    inlineStart,
    slot = "bleed",
    style,
    ...props
  }: BleedProps,
  ref: ForwardedRef<HTMLElement>,
) {
  const bleedStyle: BleedStyle = {
    ...edgeVariables("inline-start", inline, inlineStart),
    ...edgeVariables("inline-end", inline, inlineEnd),
    ...edgeVariables("block-start", block, blockStart),
    ...edgeVariables("block-end", block, blockEnd),
    ...style,
  };
  const bleedProps = {
    ...props,
    className: classes(className),
    "data-bleed": "",
    "data-slot": slot,
    ref,
    style: bleedStyle,
  };

  if (asChild) {
    const child = Children.only(children) as ReactElement<Record<string, unknown>>;
    if (child.type === Fragment) {
      throw new Error("Bleed with asChild requires one non-Fragment host.");
    }
    const childRef = (
      "ref" in child.props
        ? child.props.ref
        : (child as ReactElement & { ref?: Ref<HTMLElement> }).ref
    ) as Ref<HTMLElement> | undefined;
    return cloneElement(child, mergeComposedProps(child.props, {
      ...bleedProps,
      ref: childRef || ref ? composeRefs(childRef, ref) : undefined,
    }));
  }

  return createElement(as, bleedProps, children);
}

export const Bleed = forwardRef<HTMLElement, BleedProps>(BleedImpl);
Bleed.displayName = "Bleed";

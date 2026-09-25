import { Children, cloneElement, createElement, forwardRef, type CSSProperties, type HTMLAttributes, type ReactElement, type ReactNode, type Ref } from "react";
import { normalizeResponsiveValue, responsiveDataAttributes, type ResponsiveValue } from "../_responsive-value/ResponsiveValue.js";
import { resolveSpacingValue } from "../_spacing-value/SpacingValue.js";

export type FloatPlacement = "top-start" | "top-center" | "top-end" | "middle-start" | "middle-center" | "middle-end" | "bottom-start" | "bottom-center" | "bottom-end";
export type FloatOffset = number | string;
export type FloatElement = "div" | "span" | "section" | "article" | "aside" | "main" | "header" | "footer" | "nav" | "ul" | "ol" | "li";
type HostProps = { as?: FloatElement; asChild?: false; children?: ReactNode } | { as?: never; asChild: true; children: ReactElement };
type SharedProps = Omit<HTMLAttributes<HTMLElement>, "children" | "className" | "style"> & HostProps & { className?: string; style?: CSSProperties; slot?: string };
export type FloatRootProps = SharedProps & {
  placement?: ResponsiveValue<FloatPlacement>;
  offset?: ResponsiveValue<FloatOffset>;
  offsetInline?: ResponsiveValue<FloatOffset>;
  offsetBlock?: ResponsiveValue<FloatOffset>;
};
export type FloatAnchorProps = SharedProps & { inline?: boolean };

function offsetValue(value: FloatOffset): string {
  if ((typeof value === "number" && !Number.isFinite(value)) || (typeof value === "string" && !value.trim())) {
    console.warn("[Brick Float] Offset must be finite or a non-empty CSS length-percentage.");
    return "0px";
  }
  if (typeof value === "number" && value < 0) return `calc(${resolveSpacingValue(-value)} * -1)`;
  if (typeof value === "string" && /^-(?:\d+\.?\d*|\.\d+)$/.test(value.trim())) return `calc(${resolveSpacingValue(value.trim().slice(1))} * -1)`;
  return resolveSpacingValue(value);
}
function offsetStyles(axis: string, value?: ResponsiveValue<FloatOffset>) {
  if (value === undefined) return {};
  return Object.fromEntries(Object.entries(normalizeResponsiveValue(value)).map(([key, next]) => [`--brick-float-${axis}-${key}`, offsetValue(next as FloatOffset)]));
}

// The same host/ref composition contract used by Frame and Center.
function renderHost(as: FloatElement, asChild: boolean, children: ReactNode, props: Record<string, unknown>, ref: Ref<HTMLElement>) {
  if (!asChild) return createElement(as, { ...props, ref }, children);
  const child = Children.only(children) as ReactElement<Record<string, unknown>>;
  const childRef = ("ref" in child.props ? child.props.ref : (child as ReactElement & { ref?: Ref<HTMLElement> }).ref) as Ref<HTMLElement> | undefined;
  const merged = { ...child.props, ...props };
  for (const [key, value] of Object.entries(props)) {
    const previous = child.props[key];
    if (key === "className" && previous) merged[key] = `${previous} ${value}`;
    else if (key === "style") merged[key] = { ...(previous as CSSProperties), ...(value as CSSProperties) };
    else if (key.startsWith("on") && typeof previous === "function" && typeof value === "function") merged[key] = (...args: unknown[]) => { value(...args); previous(...args); };
  }
  merged.ref = childRef || ref ? (node: HTMLElement | null) => {
    for (const target of [childRef, ref]) {
      if (typeof target === "function") target(node);
      else if (target) target.current = node;
    }
  } : undefined;
  return cloneElement(child, merged);
}
export const FloatRoot = forwardRef<HTMLElement, FloatRootProps>(function FloatRoot({
  as = "div", asChild = false, children, placement = "top-end", offset, offsetInline, offsetBlock, className, style, slot = "float", ...props
}, ref) {
  return renderHost(as, asChild, children, {
    ...props, ...responsiveDataAttributes("data-placement", placement, { defaultValue: "top-end", alwaysInitial: true }),
    className: ["brick-float", className].filter(Boolean).join(" "), "data-slot": slot,
    style: { ...offsetStyles("offset", offset), ...offsetStyles("inline", offsetInline), ...offsetStyles("block", offsetBlock), ...style },
  }, ref);
});
export const FloatAnchor = forwardRef<HTMLElement, FloatAnchorProps>(function FloatAnchor({
  as = "div", asChild = false, children, inline = false, className, slot = "float-anchor", ...props
}, ref) {
  return renderHost(as, asChild, children, { ...props, className: ["brick-float-anchor", className].filter(Boolean).join(" "), "data-slot": slot, "data-inline": inline || undefined }, ref);
});
export const Float = Object.freeze({ Root: FloatRoot, Anchor: FloatAnchor });

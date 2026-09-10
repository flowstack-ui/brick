import { Children, cloneElement, createElement, Fragment, type HTMLAttributes, type ReactElement, type Ref } from "react";

export type StaticPartProps = Omit<HTMLAttributes<HTMLElement>, "color"> & { [key: `data-${string}`]: string | number | boolean | undefined } & (
  | { asChild: true; children: ReactElement }
  | { asChild?: false }
);

/** Presentation-only host projection, following the existing Center contract. */
export function staticPart(tag: "div" | "span" | "p" | "dl" | "dt" | "dd" | "ol" | "li", props: StaticPartProps, ref: Ref<HTMLElement>, className: string, slot: string): ReactElement {
  const { asChild, children, className: custom, style, "data-slot": customSlot, ...native } = props;
  const host = { ...native, className: [className, custom].filter(Boolean).join(" "), style, "data-slot": customSlot ?? slot, ref };
  if (!asChild) return createElement(tag, host, children);
  const child = Children.only(children) as ReactElement<Record<string, unknown>>;
  if (child.type === Fragment) throw new Error(`${slot} requires one element host, not a Fragment.`);
  const childRef = ("ref" in child.props ? child.props.ref : (child as ReactElement & { ref?: Ref<HTMLElement> }).ref) as Ref<HTMLElement> | undefined;
  const merged: Record<string, unknown> = { ...child.props, ...host,
    className: [child.props.className, host.className].filter(Boolean).join(" "),
    style: { ...(child.props.style as object), ...style },
    ref: (node: HTMLElement | null) => {
      for (const target of [childRef, ref]) {
        if (typeof target === "function") target(node);
        else if (target) target.current = node;
      }
    },
  };
  for (const key of Object.keys(native)) {
    const outer = (native as Record<string, unknown>)[key];
    const inner = child.props[key];
    if (key.startsWith("on") && typeof outer === "function" && typeof inner === "function") {
      merged[key] = (...args: unknown[]) => { outer(...args); inner(...args); };
    }
  }
  return cloneElement(child, merged);
}

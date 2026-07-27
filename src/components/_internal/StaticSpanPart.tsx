"use client";

import {
  cloneElement,
  forwardRef,
  isValidElement,
  type CSSProperties,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
  type Ref,
} from "react";

export interface StaticSpanPartProps extends HTMLAttributes<HTMLSpanElement> {
  asChild?: boolean;
  children?: ReactNode;
  render?: ReactElement;
  "data-slot"?: string;
}

function mergeClassName(base: string, ...values: Array<string | undefined>) {
  const suffix = values.filter(Boolean).join(" ");
  return suffix ? `${base} ${suffix}` : base;
}

function composeRefs<T>(...refs: Array<Ref<T> | undefined>) {
  return (value: T | null) => {
    for (const ref of refs) {
      if (typeof ref === "function") ref(value);
      else if (ref) ref.current = value;
    }
  };
}

export function createStaticSpanPart(
  baseClass: string,
  defaultSlot: string,
  displayName: string,
) {
  const Part = forwardRef<HTMLElement, StaticSpanPartProps>(function StaticSpanPart(
    {
      asChild = false,
      children,
      className,
      render,
      style,
      "data-slot": dataSlot,
      ...props
    },
    ref,
  ) {
    const candidate = render ?? (asChild && isValidElement(children) ? children : null);
    if (candidate && isValidElement<Record<string, unknown>>(candidate)) {
      const candidateProps = candidate.props;
      return cloneElement(candidate, {
        ...candidateProps,
        ...props,
        children: render ? children : candidateProps.children,
        className: mergeClassName(
          baseClass,
          candidateProps.className as string | undefined,
          className,
        ),
        "data-slot": dataSlot ?? defaultSlot,
        ref: composeRefs(candidateProps.ref as Ref<HTMLElement> | undefined, ref),
        style: {
          ...(candidateProps.style as CSSProperties | undefined),
          ...style,
        },
      });
    }

    return (
      <span
        {...props}
        className={mergeClassName(baseClass, className)}
        data-slot={dataSlot ?? defaultSlot}
        ref={ref as Ref<HTMLSpanElement>}
        style={style}
      >
        {children}
      </span>
    );
  });
  Part.displayName = displayName;
  return Part;
}

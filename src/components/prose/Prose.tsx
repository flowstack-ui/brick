import {
  createElement,
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
} from "react";

export type ProseElement = "div" | "article" | "section";
export type ProseSize = "sm" | "md" | "lg";
export type ProseMeasure = "narrow" | "default" | "wide" | "none";

export interface ProseProps extends Omit<HTMLAttributes<HTMLElement>, "children"> {
  as?: ProseElement;
  children?: ReactNode;
  size?: ProseSize;
  measure?: ProseMeasure;
}

function mergeClassName(className?: string) {
  return className ? `brick-prose ${className}` : "brick-prose";
}

export const Prose = forwardRef<HTMLElement, ProseProps>(function Prose(
  {
    as = "div",
    children,
    className,
    measure = "default",
    size = "md",
    slot = "prose",
    ...props
  },
  ref,
) {
  return createElement(
    as,
    {
      ...props,
      className: mergeClassName(className),
      "data-measure": measure,
      "data-size": size,
      "data-slot": slot,
      ref,
    },
    children,
  );
});

Prose.displayName = "Prose";

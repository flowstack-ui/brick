import {
  createElement,
  forwardRef,
  type CSSProperties,
  type ForwardedRef,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import {
  responsiveDataAttributes,
  type ResponsiveValue,
} from "../_responsive-value/ResponsiveValue.js";

export type SectionElement = "section" | "div" | "article" | "aside";
export type SectionSpacing = "none" | "sm" | "md" | "lg" | "xl" | "2xl";

type SectionNativeProps = Omit<
  HTMLAttributes<HTMLElement>,
  "children" | "className" | "style"
>;

export interface SectionProps extends SectionNativeProps {
  as?: SectionElement;
  children?: ReactNode;
  spacing?: ResponsiveValue<SectionSpacing>;
  startSpacing?: ResponsiveValue<SectionSpacing>;
  endSpacing?: ResponsiveValue<SectionSpacing>;
  className?: string;
  style?: CSSProperties;
  slot?: string;
}

function mergeClassName(className: string | undefined) {
  return className ? `brick-section ${className}` : "brick-section";
}

function SectionImpl(
  {
    as = "section",
    children,
    className,
    endSpacing,
    slot = "section",
    spacing = "md",
    startSpacing,
    ...props
  }: SectionProps,
  ref: ForwardedRef<HTMLElement>,
) {
  return createElement(
    as,
    {
      ...props,
      ...responsiveDataAttributes("data-spacing", spacing, {
        alwaysInitial: true,
      }),
      ...(startSpacing === undefined
        ? {}
        : responsiveDataAttributes("data-start-spacing", startSpacing, {
            alwaysInitial: true,
          })),
      ...(endSpacing === undefined
        ? {}
        : responsiveDataAttributes("data-end-spacing", endSpacing, {
            alwaysInitial: true,
          })),
      className: mergeClassName(className),
      "data-slot": slot,
      ref,
    },
    children,
  );
}

export const Section = forwardRef<HTMLElement, SectionProps>(SectionImpl);
Section.displayName = "Section";

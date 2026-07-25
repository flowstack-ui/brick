import {
  createElement,
  forwardRef,
  type CSSProperties,
  type ForwardedRef,
  type HTMLAttributes,
  type ReactNode,
} from "react";

export type ContainerElement =
  | "div"
  | "section"
  | "article"
  | "main"
  | "header"
  | "footer"
  | "nav"
  | "aside";

export type ContainerMeasure =
  | "narrow"
  | "medium"
  | "wide"
  | "max"
  | "full";

export type ContainerGutter = "none" | "sm" | "md" | "lg";

type ContainerNativeProps = Omit<
  HTMLAttributes<HTMLElement>,
  "children" | "className" | "style"
>;

export interface ContainerProps extends ContainerNativeProps {
  as?: ContainerElement;
  children?: ReactNode;
  measure?: ContainerMeasure;
  gutter?: ContainerGutter;
  className?: string;
  style?: CSSProperties;
  slot?: string;
}

function mergeClassName(className: string | undefined) {
  return className ? `brick-container ${className}` : "brick-container";
}

function ContainerImpl(
  {
    as = "div",
    children,
    className,
    gutter = "md",
    measure = "wide",
    slot = "container",
    ...props
  }: ContainerProps,
  ref: ForwardedRef<HTMLElement>,
) {
  return createElement(
    as,
    {
      ...props,
      className: mergeClassName(className),
      "data-gutter": gutter,
      "data-measure": measure,
      "data-slot": slot,
      ref,
    },
    children,
  );
}

export const Container = forwardRef<HTMLElement, ContainerProps>(ContainerImpl);
Container.displayName = "Container";

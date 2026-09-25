import {
  Children,
  Fragment,
  cloneElement,
  forwardRef,
  isValidElement,
  type CSSProperties,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react";
import type { DividerThickness, DividerVariant } from "../divider/Divider.js";

export interface StackSeparatorProps
  extends Omit<
    HTMLAttributes<HTMLSpanElement>,
    "children" | "tabIndex" | "role" | "aria-hidden"
  > {
  children?: never;
  variant?: DividerVariant;
  thickness?: DividerThickness;
  extent?: string;
  align?: "stretch" | "start" | "center" | "end";
}

/** Decorative line; its parent Stack supplies the responsive axis. */
export const StackSeparator = forwardRef<HTMLSpanElement, StackSeparatorProps>(
  function StackSeparator(
    {
      variant = "solid",
      thickness = "subtle",
      extent = "auto",
      align = "stretch",
      className,
      style,
      ...props
    },
    ref,
  ) {
    return (
      <span
        {...props}
        ref={ref}
        aria-hidden="true"
        className={["brick-stack-separator", className]
          .filter(Boolean)
          .join(" ")}
        data-slot="stack-separator"
        data-variant={variant}
        data-thickness={thickness}
        style={
          {
            "--brick-stack-separator-extent": extent,
            alignSelf: align,
            ...style,
          } as CSSProperties
        }
      />
    );
  },
);

export function separatedChildren(
  children: ReactNode,
  separator: ReactElement,
): ReactNode {
  if (!isValidElement(separator) || separator.type === Fragment)
    throw new TypeError("Stack separator requires one non-Fragment element.");
  const template = separator as ReactElement<Record<string, unknown>>;
  const ref =
    Object.getOwnPropertyDescriptor(template.props, "ref")?.value ??
    Object.getOwnPropertyDescriptor(template, "ref")?.value;
  if (template.props.id !== undefined || ref != null)
    throw new TypeError(
      "Stack separator templates cannot have an id or ref because they are repeated.",
    );
  const peers = Children.toArray(children);
  return peers.map((child, index) => (
    <Fragment key={isValidElement(child) ? (child.key ?? index) : index}>
      {child}
      {index < peers.length - 1 &&
        cloneElement(template, {
          "aria-hidden": true,
          "data-stack-separator-item": "",
          className: ["brick-stack-separator-item", template.props.className]
            .filter(Boolean)
            .join(" "),
        })}
    </Fragment>
  ));
}

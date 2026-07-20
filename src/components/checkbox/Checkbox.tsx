import {
  cloneElement,
  forwardRef,
  type ReactElement,
  type ReactNode,
} from "react";
import {
  Checkbox as AtomCheckbox,
  type CheckboxRootProps as AtomCheckboxRootProps,
} from "@flowstack-ui/atom/checkbox";
import { CheckboxVisual } from "./CheckboxVisual.js";

export type CheckboxSize = "sm" | "md" | "lg";

type CheckboxSharedProps = Omit<
  AtomCheckboxRootProps,
  "asChild" | "children" | "render"
> & {
  /** Complete checkbox row and control size. @default "md" */
  size?: CheckboxSize;
};

export type CheckboxProps = CheckboxSharedProps &
  (
    | {
        asChild: true;
        render?: never;
        children: ReactElement<{ children?: ReactNode }>;
      }
    | {
        asChild?: false;
        render?: AtomCheckboxRootProps["render"];
        children?: ReactNode;
      }
  );

function mergeClassName(base: string, className: string | undefined) {
  return className ? `${base} ${className}` : base;
}

function withVisual(children: ReactNode) {
  return (
    <>
      <CheckboxVisual />
      {children}
    </>
  );
}

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  function Checkbox(
    {
      asChild = false,
      children,
      className,
      render,
      size = "md",
      "data-slot": dataSlot,
      ...props
    },
    ref,
  ) {
    const visualChildren = asChild
      ? (() => {
          const child = children as ReactElement<{ children?: ReactNode }>;
          return cloneElement(
            child,
            undefined,
            withVisual(child.props.children),
          );
        })()
      : withVisual(children);

    return (
      <AtomCheckbox.Root
        {...props}
        asChild={asChild}
        className={mergeClassName("brick-checkbox", className)}
        data-size={size}
        data-slot={dataSlot ?? "checkbox"}
        ref={ref}
        render={render}
      >
        {visualChildren}
      </AtomCheckbox.Root>
    );
  },
);

Checkbox.displayName = "Checkbox";

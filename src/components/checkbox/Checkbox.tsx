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
import {
  useCheckboxPresentation,
  checkboxPresentationAttributes,
  type CheckboxPresentationProps,
} from "./CheckboxPresentation.js";

export type {
  CheckboxSize,
  CheckboxVariant,
  CheckboxTone,
  CheckboxPresentationProps,
} from "./CheckboxPresentation.js";

type CheckboxSharedProps = Omit<
  AtomCheckboxRootProps,
  "asChild" | "children" | "render"
> &
  CheckboxPresentationProps & {
    /** Complete checkbox row and control size. @default "md" */
    indicator?: ReactNode;
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

function withVisual(children: ReactNode, indicator?: ReactNode) {
  return (
    <>
      <CheckboxVisual>{indicator}</CheckboxVisual>
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
      size,
      variant,
      tone,
      radius,
      density,
      labelPlacement,
      style,
      indicator,
      "data-slot": dataSlot,
      ...props
    },
    ref,
  ) {
    const presentation = useCheckboxPresentation({
      size,
      variant,
      tone,
      radius,
      density,
      labelPlacement,
    });
    const visualChildren = asChild
      ? (() => {
          const child = children as ReactElement<{ children?: ReactNode }>;
          return cloneElement(
            child,
            undefined,
            withVisual(child.props.children, indicator),
          );
        })()
      : withVisual(children, indicator);

    return (
      <AtomCheckbox.Root
        {...props}
        asChild={asChild}
        className={mergeClassName("brick-checkbox", className)}
        {...checkboxPresentationAttributes(presentation, style)}
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

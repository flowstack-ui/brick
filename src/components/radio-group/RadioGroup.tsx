import {
  cloneElement,
  forwardRef,
  type ReactElement,
  type ReactNode,
} from "react";
import {
  RadioGroup as AtomRadioGroup,
  type RadioGroupRootProps as AtomRootProps,
  type RadioRootProps as AtomRadioProps,
} from "@flowstack-ui/atom/radio-group";

export type RadioGroupSize = "sm" | "md" | "lg";

type ComposedProps<T extends { children?: ReactNode; render?: unknown }> = Omit<
  T,
  "asChild" | "children" | "render"
> &
  (
    | {
        asChild: true;
        render?: never;
        children: ReactElement<{ children?: ReactNode }>;
      }
    | {
        asChild?: false;
        render?: T["render"];
        children?: ReactNode;
      }
  );

export type RadioGroupRootProps = ComposedProps<AtomRootProps> & {
  /** Shared item and visual-control size. @default "md" */
  size?: RadioGroupSize;
};

export type RadioGroupItemProps = Omit<
  ComposedProps<AtomRadioProps>,
  "children"
> & {
  children: ReactNode | ReactElement<{ children?: ReactNode }>;
};

function mergeClassName(base: string, className: string | undefined) {
  return className ? `${base} ${className}` : base;
}

function visualChildren(children: ReactNode) {
  return (
    <>
      <span
        aria-hidden="true"
        className="brick-radio-group-control"
        data-slot="radio-group-control"
      >
        <span className="brick-radio-group-dot" data-slot="radio-group-dot" />
      </span>
      <span className="brick-radio-group-label" data-slot="radio-group-label">
        {children}
      </span>
    </>
  );
}

function composeItemChildren(asChild: boolean, children: ReactNode) {
  if (!asChild) return visualChildren(children);
  const child = children as ReactElement<{ children?: ReactNode }>;
  return cloneElement(child, undefined, visualChildren(child.props.children));
}

export const RadioGroupRoot = forwardRef<
  HTMLDivElement,
  RadioGroupRootProps
>(function RadioGroupRoot(
  {
    asChild = false,
    children,
    className,
    orientation = "vertical",
    render,
    size = "md",
    "data-slot": dataSlot,
    ...props
  },
  ref,
) {
  return (
    <AtomRadioGroup.Root
      {...props}
      asChild={asChild}
      className={mergeClassName("brick-radio-group", className)}
      data-size={size}
      data-slot={dataSlot ?? "radio-group"}
      orientation={orientation}
      ref={ref}
      render={render}
    >
      {children}
    </AtomRadioGroup.Root>
  );
});

export const RadioGroupItem = forwardRef<
  HTMLButtonElement,
  RadioGroupItemProps
>(function RadioGroupItem(
  {
    asChild = false,
    children,
    className,
    render,
    "data-slot": dataSlot,
    ...props
  },
  ref,
) {
  return (
    <AtomRadioGroup.Radio
      {...props}
      asChild={asChild}
      className={mergeClassName("brick-radio-group-item", className)}
      data-slot={dataSlot ?? "radio-group-item"}
      ref={ref}
      render={render}
    >
      {composeItemChildren(asChild, children)}
    </AtomRadioGroup.Radio>
  );
});

RadioGroupRoot.displayName = "RadioGroup.Root";
RadioGroupItem.displayName = "RadioGroup.Item";

export const RadioGroup = Object.freeze({
  Root: RadioGroupRoot,
  Item: RadioGroupItem,
});

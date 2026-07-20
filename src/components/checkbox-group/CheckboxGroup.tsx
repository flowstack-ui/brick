import {
  cloneElement,
  forwardRef,
  type ReactElement,
  type ReactNode,
} from "react";
import {
  CheckboxGroup as AtomCheckboxGroup,
  markCheckboxGroupItemPart,
  type CheckboxGroupItemDescriptionProps as AtomItemDescriptionProps,
  type CheckboxGroupItemLabelProps as AtomItemLabelProps,
  type CheckboxGroupItemProps as AtomItemProps,
  type CheckboxGroupParentProps as AtomParentProps,
  type CheckboxGroupRootProps as AtomRootProps,
} from "@flowstack-ui/atom/checkbox-group";
import type { CheckboxSize } from "../checkbox/Checkbox.js";
import { CheckboxVisual } from "../checkbox/CheckboxVisual.js";

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

type RequiredComposedProps<T extends { children: ReactNode; render?: unknown }> =
  Omit<T, "asChild" | "children" | "render"> &
    (
      | {
          asChild: true;
          render?: never;
          children: ReactElement<{ children?: ReactNode }>;
        }
      | { asChild?: false; render?: T["render"]; children: ReactNode }
    );

export type CheckboxGroupRootProps = ComposedProps<AtomRootProps> & {
  /** Shared row and visual-control size. @default "md" */
  size?: CheckboxSize;
};
export type CheckboxGroupItemProps = ComposedProps<AtomItemProps>;
export type CheckboxGroupItemLabelProps =
  RequiredComposedProps<AtomItemLabelProps>;
export type CheckboxGroupItemDescriptionProps =
  RequiredComposedProps<AtomItemDescriptionProps>;
export type CheckboxGroupParentProps = ComposedProps<AtomParentProps>;

function mergeClassName(base: string, className: string | undefined) {
  return className ? `${base} ${className}` : base;
}

function slotOrDefault(slot: string | undefined, fallback: string) {
  return slot ?? fallback;
}

function withVisual(children: ReactNode) {
  return (
    <>
      <CheckboxVisual />
      {children}
    </>
  );
}

function composeVisualChildren(
  asChild: boolean,
  children: ReactNode,
): ReactNode {
  if (!asChild) return withVisual(children);
  const child = children as ReactElement<{ children?: ReactNode }>;
  return cloneElement(child, undefined, withVisual(child.props.children));
}

export const CheckboxGroupRoot = forwardRef<
  HTMLDivElement,
  CheckboxGroupRootProps
>(function CheckboxGroupRoot(
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
    <AtomCheckboxGroup.Root
      {...props}
      asChild={asChild}
      className={mergeClassName("brick-checkbox-group", className)}
      data-size={size}
      data-slot={slotOrDefault(dataSlot, "checkbox-group")}
      orientation={orientation}
      ref={ref}
      render={render}
    >
      {children}
    </AtomCheckboxGroup.Root>
  );
});

export const CheckboxGroupItem = forwardRef<
  HTMLButtonElement,
  CheckboxGroupItemProps
>(function CheckboxGroupItem(
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
    <AtomCheckboxGroup.Item
      {...props}
      asChild={asChild}
      className={mergeClassName("brick-checkbox-group-item", className)}
      data-slot={slotOrDefault(dataSlot, "checkbox-group-item")}
      ref={ref}
      render={render}
    >
      {composeVisualChildren(asChild, children)}
    </AtomCheckboxGroup.Item>
  );
});

export const CheckboxGroupItemLabel = markCheckboxGroupItemPart(
  forwardRef<HTMLSpanElement, CheckboxGroupItemLabelProps>(
    function CheckboxGroupItemLabel(
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
        <AtomCheckboxGroup.ItemLabel
          {...props}
          asChild={asChild}
          className={mergeClassName("brick-checkbox-group-item-label", className)}
          data-slot={slotOrDefault(dataSlot, "checkbox-group-item-label")}
          ref={ref}
          render={render}
        >
          {children}
        </AtomCheckboxGroup.ItemLabel>
      );
    },
  ),
  "label",
);

export const CheckboxGroupItemDescription = markCheckboxGroupItemPart(
  forwardRef<HTMLSpanElement, CheckboxGroupItemDescriptionProps>(
    function CheckboxGroupItemDescription(
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
        <AtomCheckboxGroup.ItemDescription
          {...props}
          asChild={asChild}
          className={mergeClassName(
            "brick-checkbox-group-item-description",
            className,
          )}
          data-slot={slotOrDefault(dataSlot, "checkbox-group-item-description")}
          ref={ref}
          render={render}
        >
          {children}
        </AtomCheckboxGroup.ItemDescription>
      );
    },
  ),
  "description",
);

export const CheckboxGroupParent = forwardRef<
  HTMLButtonElement,
  CheckboxGroupParentProps
>(function CheckboxGroupParent(
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
    <AtomCheckboxGroup.Parent
      {...props}
      asChild={asChild}
      className={mergeClassName("brick-checkbox-group-parent", className)}
      data-slot={slotOrDefault(dataSlot, "checkbox-group-parent")}
      ref={ref}
      render={render}
    >
      {composeVisualChildren(asChild, children)}
    </AtomCheckboxGroup.Parent>
  );
});

CheckboxGroupRoot.displayName = "CheckboxGroup.Root";
CheckboxGroupItem.displayName = "CheckboxGroup.Item";
CheckboxGroupItemLabel.displayName = "CheckboxGroup.ItemLabel";
CheckboxGroupItemDescription.displayName = "CheckboxGroup.ItemDescription";
CheckboxGroupParent.displayName = "CheckboxGroup.Parent";

export const CheckboxGroup = Object.freeze({
  Root: CheckboxGroupRoot,
  Item: CheckboxGroupItem,
  ItemLabel: CheckboxGroupItemLabel,
  ItemDescription: CheckboxGroupItemDescription,
  Parent: CheckboxGroupParent,
});

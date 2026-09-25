import {
  cloneElement,
  forwardRef,
  type ReactElement,
  type ReactNode,
  type CSSProperties,
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
import {
  CheckboxPresentationContext,
  useCheckboxPresentation,
  checkboxPresentationAttributes,
  type CheckboxPresentationProps,
} from "../checkbox/CheckboxPresentation.js";
import {
  resolveSpacingValue,
  type SpacingValue,
} from "../_spacing-value/SpacingValue.js";
import type { CheckboxGroupController } from "@flowstack-ui/atom/checkbox-group";

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

type RequiredComposedProps<
  T extends { children: ReactNode; render?: unknown },
> = Omit<T, "asChild" | "children" | "render"> &
  (
    | {
        asChild: true;
        render?: never;
        children: ReactElement<{ children?: ReactNode }>;
      }
    | { asChild?: false; render?: T["render"]; children: ReactNode }
  );

export type CheckboxGroupRootProps = ComposedProps<AtomRootProps> &
  CheckboxPresentationProps & {
    /** Shared row and visual-control size. @default "md" */
    gap?: SpacingValue;
  };
export type CheckboxGroupItemProps = ComposedProps<AtomItemProps> &
  CheckboxPresentationProps & { indicator?: ReactNode };
export type CheckboxGroupItemLabelProps =
  RequiredComposedProps<AtomItemLabelProps>;
export type CheckboxGroupItemDescriptionProps =
  RequiredComposedProps<AtomItemDescriptionProps>;
export type CheckboxGroupParentProps = ComposedProps<AtomParentProps> &
  CheckboxPresentationProps & { indicator?: ReactNode };

function mergeClassName(base: string, className: string | undefined) {
  return className ? `${base} ${className}` : base;
}

function slotOrDefault(slot: string | undefined, fallback: string) {
  return slot ?? fallback;
}

function withVisual(children: ReactNode, indicator?: ReactNode) {
  return (
    <>
      <CheckboxVisual>{indicator}</CheckboxVisual>
      {children}
    </>
  );
}

function composeVisualChildren(
  asChild: boolean,
  children: ReactNode,
  indicator?: ReactNode,
): ReactNode {
  if (!asChild) return withVisual(children, indicator);
  const child = children as ReactElement<{ children?: ReactNode }>;
  return cloneElement(
    child,
    undefined,
    withVisual(child.props.children, indicator),
  );
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
    size,
    variant,
    tone,
    radius,
    density,
    labelPlacement,
    style,
    gap,
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
  const rootStyle =
    gap === undefined
      ? style
      : ({
          "--brick-checkbox-group-gap": resolveSpacingValue(gap),
          ...style,
        } as CSSProperties);
  return (
    <CheckboxPresentationContext.Provider value={presentation}>
      <AtomCheckboxGroup.Root
        {...props}
        asChild={asChild}
        className={mergeClassName("brick-checkbox-group", className)}
        {...checkboxPresentationAttributes(presentation, rootStyle)}
        data-slot={slotOrDefault(dataSlot, "checkbox-group")}
        orientation={orientation}
        ref={ref}
        render={render}
      >
        {children}
      </AtomCheckboxGroup.Root>
    </CheckboxPresentationContext.Provider>
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
  return (
    <AtomCheckboxGroup.Item
      {...props}
      {...checkboxPresentationAttributes(presentation, style)}
      asChild={asChild}
      className={mergeClassName("brick-checkbox-group-item", className)}
      data-slot={slotOrDefault(dataSlot, "checkbox-group-item")}
      ref={ref}
      render={render}
    >
      {composeVisualChildren(asChild, children, indicator)}
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
          className={mergeClassName(
            "brick-checkbox-group-item-label",
            className,
          )}
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
  return (
    <AtomCheckboxGroup.Parent
      {...props}
      {...checkboxPresentationAttributes(presentation, style)}
      asChild={asChild}
      className={mergeClassName("brick-checkbox-group-parent", className)}
      data-slot={slotOrDefault(dataSlot, "checkbox-group-parent")}
      ref={ref}
      render={render}
    >
      {composeVisualChildren(asChild, children, indicator)}
    </AtomCheckboxGroup.Parent>
  );
});

CheckboxGroupRoot.displayName = "CheckboxGroup.Root";
CheckboxGroupItem.displayName = "CheckboxGroup.Item";
CheckboxGroupItemLabel.displayName = "CheckboxGroup.ItemLabel";
CheckboxGroupItemDescription.displayName = "CheckboxGroup.ItemDescription";
CheckboxGroupParent.displayName = "CheckboxGroup.Parent";

type ProviderBase<T> = T extends unknown
  ? Omit<T, "value" | "defaultValue" | "onValueChange" | "maxSelectedValues">
  : never;
export type CheckboxGroupRootProviderProps =
  ProviderBase<CheckboxGroupRootProps> & { value: CheckboxGroupController };
export const CheckboxGroupRootProvider = forwardRef<
  HTMLDivElement,
  CheckboxGroupRootProviderProps
>(function CheckboxGroupRootProvider(
  { value, disabled, readOnly, ...props },
  ref,
) {
  return (
    <CheckboxGroupRoot
      {...(props as CheckboxGroupRootProps)}
      ref={ref}
      value={value.value}
      onValueChange={value.setValue}
      disabled={disabled || value.disabled}
      readOnly={readOnly || value.readOnly}
      maxSelectedValues={value.maxSelectedValues}
    />
  );
});

export const CheckboxGroup = Object.freeze({
  Root: CheckboxGroupRoot,
  RootProvider: CheckboxGroupRootProvider,
  Item: CheckboxGroupItem,
  ItemLabel: CheckboxGroupItemLabel,
  ItemDescription: CheckboxGroupItemDescription,
  Parent: CheckboxGroupParent,
});

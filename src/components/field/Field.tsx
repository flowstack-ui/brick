import {
  forwardRef,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from "react";
import {
  responsiveDataAttributes,
  normalizeResponsiveValue,
  type ResponsiveValue,
} from "../_responsive-value/ResponsiveValue.js";
import { createIcon } from "../icon/createIcon.js";
import {
  Field as AtomField,
  markFieldPart,
  useFieldContext,
  type FieldItemProps as AtomFieldItemProps,
  type FieldDescriptionProps as AtomFieldDescriptionProps,
  type FieldErrorProps as AtomFieldErrorProps,
  type FieldLabelProps as AtomFieldLabelProps,
  type FieldOrientation,
  type FieldRequiredIndicatorProps as AtomFieldRequiredIndicatorProps,
  type FieldRootProps as AtomFieldRootProps,
} from "@flowstack-ui/atom/field";

type ComposedRequiredProps<T> = Omit<T, "asChild" | "children" | "render"> &
  (
    | { asChild: true; render?: never; children: ReactElement }
    | {
        asChild?: false;
        render?: T extends { render?: infer R } ? R : never;
        children: ReactNode;
      }
  );

export type FieldSize = "xs" | "sm" | "md";
export type FieldTone = "primary" | "secondary";
export type FieldRootProps = ComposedRequiredProps<
  Omit<AtomFieldRootProps, "orientation">
> & {
  orientation?: ResponsiveValue<FieldOrientation>;
  labelWidth?: CSSProperties["inlineSize"];
  /** Label density used by compact and ordinary form layouts. @default "md" */
  size?: ResponsiveValue<FieldSize>;
  /** Label emphasis. @default "primary" */
  tone?: FieldTone;
};
export type FieldLabelProps = ComposedRequiredProps<AtomFieldLabelProps>;
export type FieldDescriptionProps =
  ComposedRequiredProps<AtomFieldDescriptionProps>;
export type FieldErrorProps = ComposedRequiredProps<AtomFieldErrorProps>;

type RequiredIndicatorSharedProps = Omit<
  AtomFieldRequiredIndicatorProps,
  "asChild" | "children" | "fallback" | "render"
>;

export type FieldRequiredIndicatorProps = RequiredIndicatorSharedProps &
  (
    | {
        asChild: true;
        render?: never;
        children: ReactElement;
        fallback?: ReactElement;
      }
    | {
        asChild?: false;
        render?: AtomFieldRequiredIndicatorProps["render"];
        children?: ReactNode;
        fallback?: ReactNode;
      }
  );

function mergeClassName(base: string, className: string | undefined) {
  return className ? `${base} ${className}` : base;
}

function slotOrDefault(slot: string | undefined, fallback: string) {
  return slot ?? fallback;
}

export const FieldRoot = forwardRef<HTMLDivElement, FieldRootProps>(
  function FieldRoot(
    {
      asChild = false,
      children,
      className,
      orientation = "vertical",
      labelWidth,
      style,
      size = "md",
      tone = "primary",
      render,
      "data-slot": dataSlot,
      ...props
    },
    ref,
  ) {
    return (
      <AtomField.Root
        {...props}
        asChild={asChild}
        className={mergeClassName("brick-field", className)}
        data-slot={slotOrDefault(dataSlot, "field")}
        {...responsiveDataAttributes("data-size", size, {
          alwaysInitial: true,
          defaultValue: "md",
        })}
        {...responsiveDataAttributes("data-orientation", orientation, {
          alwaysInitial: true,
          defaultValue: "vertical",
        })}
        data-tone={tone}
        orientation={
          normalizeResponsiveValue(orientation).initial ?? "vertical"
        }
        style={
          {
            ...(labelWidth === undefined
              ? {}
              : {
                  "--brick-field-columns": `minmax(0, ${typeof labelWidth === "number" ? `${labelWidth}px` : labelWidth}) minmax(0, 1fr)`,
                }),
            ...style,
          } as CSSProperties
        }
        ref={ref}
        render={render}
      >
        {children}
      </AtomField.Root>
    );
  },
);

export const FieldLabel = forwardRef<HTMLLabelElement, FieldLabelProps>(
  function FieldLabel(
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
      <AtomField.Label
        {...props}
        asChild={asChild}
        className={mergeClassName("brick-field-label", className)}
        data-slot={slotOrDefault(dataSlot, "field-label")}
        ref={ref}
        render={render}
      >
        {children}
      </AtomField.Label>
    );
  },
);

export const FieldDescription = forwardRef<
  HTMLParagraphElement,
  FieldDescriptionProps
>(function FieldDescription(
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
    <AtomField.Description
      {...props}
      asChild={asChild}
      className={mergeClassName("brick-field-description", className)}
      data-slot={slotOrDefault(dataSlot, "field-description")}
      ref={ref}
      render={render}
    >
      {children}
    </AtomField.Description>
  );
});

export const FieldError = forwardRef<HTMLParagraphElement, FieldErrorProps>(
  function FieldError(
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
      <AtomField.Error
        {...props}
        asChild={asChild}
        className={mergeClassName("brick-field-error", className)}
        data-slot={slotOrDefault(dataSlot, "field-error")}
        ref={ref}
        render={render}
      >
        {children}
      </AtomField.Error>
    );
  },
);

export const FieldRequiredIndicator = forwardRef<
  HTMLSpanElement,
  FieldRequiredIndicatorProps
>(function FieldRequiredIndicator(
  {
    asChild = false,
    children,
    className,
    fallback,
    render,
    "data-slot": dataSlot,
    ...props
  },
  ref,
) {
  return (
    <AtomField.RequiredIndicator
      {...props}
      asChild={asChild}
      className={mergeClassName("brick-field-required-indicator", className)}
      data-slot={dataSlot}
      fallback={fallback}
      ref={ref}
      render={render}
    >
      {children}
    </AtomField.RequiredIndicator>
  );
});

markFieldPart(FieldDescription, "description");
export const FieldErrorIcon = createIcon({
  displayName: "Field.ErrorIcon",
  defaultProps: {
    size: "inherit",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
  },
  path: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v6m0 3v1" />
    </>
  ),
});
export const FieldItem =
  AtomField.Item as import("react").ForwardRefExoticComponent<
    FieldItemProps & import("react").RefAttributes<HTMLDivElement>
  >;
export const FieldContext = AtomField.Context;
export type FieldItemProps = ComposedRequiredProps<AtomFieldItemProps>;
export { useFieldContext };
markFieldPart(FieldError, "error");

FieldRoot.displayName = "Field.Root";
FieldLabel.displayName = "Field.Label";
FieldDescription.displayName = "Field.Description";
FieldError.displayName = "Field.Error";
FieldRequiredIndicator.displayName = "Field.RequiredIndicator";

export const Field = Object.freeze({
  Item: FieldItem,
  Context: AtomField.Context,
  ErrorIcon: FieldErrorIcon,
  Root: FieldRoot,
  Label: FieldLabel,
  Description: FieldDescription,
  Error: FieldError,
  RequiredIndicator: FieldRequiredIndicator,
});

export type { FieldOrientation };

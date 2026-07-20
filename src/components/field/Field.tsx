import { forwardRef, type ReactElement, type ReactNode } from "react";
import {
  Field as AtomField,
  markFieldPart,
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
    | { asChild?: false; render?: T extends { render?: infer R } ? R : never; children: ReactNode }
  );

export type FieldRootProps = ComposedRequiredProps<AtomFieldRootProps>;
export type FieldLabelProps = ComposedRequiredProps<AtomFieldLabelProps>;
export type FieldDescriptionProps = ComposedRequiredProps<AtomFieldDescriptionProps>;
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
        orientation={orientation}
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
markFieldPart(FieldError, "error");

FieldRoot.displayName = "Field.Root";
FieldLabel.displayName = "Field.Label";
FieldDescription.displayName = "Field.Description";
FieldError.displayName = "Field.Error";
FieldRequiredIndicator.displayName = "Field.RequiredIndicator";

export const Field = Object.freeze({
  Root: FieldRoot,
  Label: FieldLabel,
  Description: FieldDescription,
  Error: FieldError,
  RequiredIndicator: FieldRequiredIndicator,
});

export type { FieldOrientation };

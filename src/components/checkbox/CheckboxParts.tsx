import { forwardRef } from "react";
import {
  CheckboxPresentationContext,
  useCheckboxPresentation,
  checkboxPresentationAttributes,
  type CheckboxPresentationProps,
} from "./CheckboxPresentation.js";
import { Field as AtomField, markFieldPart } from "@flowstack-ui/atom/field";
import type {
  FieldRootProps,
  FieldLabelProps,
  FieldDescriptionProps,
  FieldErrorProps,
} from "../field/Field.js";
import {
  Checkbox as StandaloneCheckbox,
  type CheckboxProps,
  type CheckboxSize,
} from "./Checkbox.js";

/** Visual size only. Atom Field and Checkbox retain all semantic/state ownership. */
type RootBase<T> = T extends unknown
  ? Omit<T, "size" | "tone" | "orientation">
  : never;
export type CheckboxRootProps = RootBase<FieldRootProps> &
  CheckboxPresentationProps;
export type CheckboxControlProps = Omit<
  CheckboxProps,
  "children" | "asChild" | "render" | "id"
> & { children?: never };
export type CheckboxLabelProps = FieldLabelProps;
export type CheckboxDescriptionProps = FieldDescriptionProps;
export type CheckboxErrorProps = FieldErrorProps;
const classes = (base: string, extra?: string) =>
  extra ? `${base} ${extra}` : base;

export const CheckboxRoot = forwardRef<HTMLDivElement, CheckboxRootProps>(
  function CheckboxRoot(
    {
      size,
      variant,
      tone,
      radius,
      density,
      labelPlacement,
      style,
      className,
      children,
      "data-slot": slot = "checkbox-root",
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
      <CheckboxPresentationContext.Provider value={presentation}>
        <AtomField.Root
          {...props}
          ref={ref}
          className={classes("brick-checkbox-root", className)}
          {...checkboxPresentationAttributes(presentation, style)}
          data-slot={slot}
        >
          {children}
        </AtomField.Root>
      </CheckboxPresentationContext.Provider>
    );
  },
);

export const CheckboxControl = forwardRef<
  HTMLButtonElement,
  CheckboxControlProps
>(function CheckboxControl(
  { className, children, "data-slot": slot = "checkbox-control", ...props },
  ref,
) {
  if (children != null)
    throw new Error(
      "Checkbox.Control does not accept children. Put text and links in Checkbox.Label.",
    );
  return (
    <StandaloneCheckbox
      {...props}
      ref={ref}
      data-slot={slot}
      className={classes("brick-checkbox-compound-control", className)}
    />
  );
});

export const CheckboxLabel = forwardRef<HTMLLabelElement, CheckboxLabelProps>(
  function CheckboxLabel(
    { className, "data-slot": slot = "checkbox-label", ...props },
    ref,
  ) {
    return (
      <AtomField.Label
        {...props}
        ref={ref}
        data-slot={slot}
        className={classes("brick-checkbox-label", className)}
      />
    );
  },
);

export const CheckboxDescription = forwardRef<
  HTMLParagraphElement,
  CheckboxDescriptionProps
>(function CheckboxDescription(
  { className, "data-slot": slot = "checkbox-description", ...props },
  ref,
) {
  return (
    <AtomField.Description
      {...props}
      ref={ref}
      data-slot={slot}
      className={classes("brick-checkbox-description", className)}
    />
  );
});

export const CheckboxError = forwardRef<
  HTMLParagraphElement,
  CheckboxErrorProps
>(function CheckboxError(
  { className, "data-slot": slot = "checkbox-error", ...props },
  ref,
) {
  return (
    <AtomField.Error
      {...props}
      ref={ref}
      data-slot={slot}
      className={classes("brick-checkbox-error", className)}
    />
  );
});

markFieldPart(CheckboxDescription, "description");
markFieldPart(CheckboxError, "error");
CheckboxRoot.displayName = "Checkbox.Root";
CheckboxControl.displayName = "Checkbox.Control";
CheckboxLabel.displayName = "Checkbox.Label";
CheckboxDescription.displayName = "Checkbox.Description";
CheckboxError.displayName = "Checkbox.Error";

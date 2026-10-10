"use client";

import {
  forwardRef,
  createContext,
  useContext,
  type ComponentPropsWithoutRef,
  type ForwardRefExoticComponent,
  type RefAttributes,
} from "react";
import {
  Editable as AtomEditable,
  type EditableRootProps as AtomRootProps,
  type EditableRootProviderProps as AtomProviderProps,
  type EditableTriggerProps as AtomTriggerProps,
} from "@flowstack-ui/atom/editable";
import {
  responsiveDataAttributes,
  type ResponsiveValue,
} from "../_responsive-value/ResponsiveValue.js";
import type {
  TextVariant,
  TextWeight,
  TextTone,
  TextAlign,
} from "../text/Text.js";
import { radiusStyle, type Radius } from "../_radius/Radius.js";

export { useEditable, useEditableContext } from "@flowstack-ui/atom/editable";
export type {
  EditableActivationMode,
  EditableSubmitMode,
  EditableController,
  EditableOptions,
  EditableValueChangeDetails,
  EditableEditChangeDetails,
  EditableOutsideEvent,
} from "@flowstack-ui/atom/editable";
export type EditableSize = "sm" | "md" | "lg";
export interface EditableVisualProps {
  size?: EditableSize;
  textStyle?: ResponsiveValue<TextVariant> | "inherit";
  weight?: TextWeight;
  tone?: TextTone;
  align?: ResponsiveValue<TextAlign>;
  radius?: Radius;
  unstyled?: boolean;
}
export type EditableRootProps = AtomRootProps & EditableVisualProps;
export type EditableRootProviderProps = AtomProviderProps & EditableVisualProps;
export type EditableAreaProps = ComponentPropsWithoutRef<
  typeof AtomEditable.Area
>;
export type EditableLabelProps = ComponentPropsWithoutRef<
  typeof AtomEditable.Label
>;
export type EditablePreviewProps = ComponentPropsWithoutRef<
  typeof AtomEditable.Preview
> & { highlight?: "hover" | "none" };
export type EditableInputProps = ComponentPropsWithoutRef<
  typeof AtomEditable.Input
>;
export type EditableTextareaProps = ComponentPropsWithoutRef<
  typeof AtomEditable.Textarea
>;
export type EditableControlProps = ComponentPropsWithoutRef<
  typeof AtomEditable.Control
>;
export type EditableTriggerProps = AtomTriggerProps & { unstyled?: boolean };
const VisualContext = createContext(false);
function usePartClass(base: string, extra?: string, unstyled = false) {
  const inherited = useContext(VisualContext);
  return inherited || unstyled ? extra : cn(base, extra);
}
const cn = (base: string, extra?: string) =>
  extra ? `${base} ${extra}` : base;
export const EditableRoot = forwardRef<HTMLDivElement, EditableRootProps>(
  function EditableRoot(
    {
      size = "md",
      textStyle,
      weight,
      tone,
      align,
      radius,
      unstyled = false,
      style,
      className,
      ...props
    },
    ref,
  ) {
    return (
      <VisualContext.Provider value={unstyled}>
        <AtomEditable.Root
          {...props}
          ref={ref}
          data-size={size}
          {...responsiveDataAttributes(
            "data-variant",
            textStyle === "inherit"
              ? size === "lg"
                ? "body-md"
                : "body-sm"
              : (textStyle ?? (size === "lg" ? "body-md" : "body-sm")),
            {
              defaultValue: size === "lg" ? "body-md" : "body-sm",
              alwaysInitial: true,
            },
          )}
          {...responsiveDataAttributes("data-align", align, {
            defaultValue: align === undefined ? undefined : "start",
            alwaysInitial: true,
          })}
          data-text-style={textStyle === "inherit" ? "inherit" : undefined}
          data-weight={weight}
          data-tone={tone}
          style={radiusStyle(radius, "--brick-editable-radius", style)}
          className={
            unstyled ? className : cn("brick-editable brick-text", className)
          }
        />
      </VisualContext.Provider>
    );
  },
);
export const EditableRootProvider = forwardRef<
  HTMLDivElement,
  EditableRootProviderProps
>(function EditableRootProvider(
  {
    size = "md",
    textStyle,
    weight,
    tone,
    align,
    radius,
    unstyled = false,
    style,
    className,
    ...props
  },
  ref,
) {
  return (
    <VisualContext.Provider value={unstyled}>
      <AtomEditable.RootProvider
        {...props}
        ref={ref}
        data-size={size}
        {...responsiveDataAttributes(
          "data-variant",
          textStyle === "inherit"
            ? size === "lg"
              ? "body-md"
              : "body-sm"
            : (textStyle ?? (size === "lg" ? "body-md" : "body-sm")),
          {
            defaultValue: size === "lg" ? "body-md" : "body-sm",
            alwaysInitial: true,
          },
        )}
        {...responsiveDataAttributes("data-align", align, {
          defaultValue: align === undefined ? undefined : "start",
          alwaysInitial: true,
        })}
        data-text-style={textStyle === "inherit" ? "inherit" : undefined}
        data-weight={weight}
        data-tone={tone}
        style={radiusStyle(radius, "--brick-editable-radius", style)}
        className={
          unstyled ? className : cn("brick-editable brick-text", className)
        }
      />
    </VisualContext.Provider>
  );
});
export const EditableArea = forwardRef<HTMLDivElement, EditableAreaProps>(
  function EditableArea({ className, ...props }, ref) {
    return (
      <AtomEditable.Area
        {...props}
        ref={ref}
        className={usePartClass("brick-editable-area", className)}
      />
    );
  },
);
export const EditableLabel = forwardRef<HTMLLabelElement, EditableLabelProps>(
  function EditableLabel({ className, ...props }, ref) {
    return (
      <AtomEditable.Label
        {...props}
        ref={ref}
        className={usePartClass("brick-editable-label", className)}
      />
    );
  },
);
export const EditablePreview = forwardRef<
  HTMLSpanElement,
  EditablePreviewProps
>(function EditablePreview({ className, highlight = "hover", ...props }, ref) {
  return (
    <AtomEditable.Preview
      {...props}
      ref={ref}
      data-highlight={highlight}
      className={usePartClass("brick-editable-preview", className)}
    />
  );
});
export const EditableInput = forwardRef<HTMLInputElement, EditableInputProps>(
  function EditableInput({ className, ...props }, ref) {
    return (
      <AtomEditable.Input
        {...props}
        ref={ref}
        className={usePartClass("brick-editable-input", className)}
      />
    );
  },
);
export const EditableTextarea = forwardRef<
  HTMLTextAreaElement,
  EditableTextareaProps
>(function EditableTextarea({ className, ...props }, ref) {
  return (
    <AtomEditable.Textarea
      {...props}
      ref={ref}
      className={usePartClass("brick-editable-textarea", className)}
    />
  );
});
export const EditableControl = forwardRef<HTMLDivElement, EditableControlProps>(
  function EditableControl({ className, ...props }, ref) {
    return (
      <AtomEditable.Control
        {...props}
        ref={ref}
        className={usePartClass("brick-editable-control", className)}
      />
    );
  },
);
export const EditableEditTrigger: ForwardRefExoticComponent<
  EditableTriggerProps & RefAttributes<HTMLButtonElement>
> = forwardRef<HTMLButtonElement, EditableTriggerProps>(
  function EditableEditTrigger({ className, unstyled, ...props }, ref) {
    const inheritedUnstyled = useContext(VisualContext);
    return (
      <AtomEditable.EditTrigger
        {...props}
        ref={ref}
        data-unstyled={unstyled || inheritedUnstyled ? "" : undefined}
        className={cn("brick-editable-trigger", className)}
      />
    );
  },
);
export const EditableSubmitTrigger: ForwardRefExoticComponent<
  EditableTriggerProps & RefAttributes<HTMLButtonElement>
> = forwardRef<HTMLButtonElement, EditableTriggerProps>(
  function EditableSubmitTrigger({ className, unstyled, ...props }, ref) {
    const inheritedUnstyled = useContext(VisualContext);
    return (
      <AtomEditable.SubmitTrigger
        {...props}
        ref={ref}
        data-unstyled={unstyled || inheritedUnstyled ? "" : undefined}
        className={cn("brick-editable-trigger", className)}
      />
    );
  },
);
export const EditableCancelTrigger: ForwardRefExoticComponent<
  EditableTriggerProps & RefAttributes<HTMLButtonElement>
> = forwardRef<HTMLButtonElement, EditableTriggerProps>(
  function EditableCancelTrigger({ className, unstyled, ...props }, ref) {
    const inheritedUnstyled = useContext(VisualContext);
    return (
      <AtomEditable.CancelTrigger
        {...props}
        ref={ref}
        data-unstyled={unstyled || inheritedUnstyled ? "" : undefined}
        className={cn("brick-editable-trigger", className)}
      />
    );
  },
);
export const EditableContext = AtomEditable.Context;
export const Editable: {
  Root: typeof EditableRoot;
  RootProvider: typeof EditableRootProvider;
  Context: typeof EditableContext;
  Area: typeof EditableArea;
  Label: typeof EditableLabel;
  Preview: typeof EditablePreview;
  Input: typeof EditableInput;
  Textarea: typeof EditableTextarea;
  Control: typeof EditableControl;
  EditTrigger: typeof EditableEditTrigger;
  SubmitTrigger: typeof EditableSubmitTrigger;
  CancelTrigger: typeof EditableCancelTrigger;
} = {
  Root: EditableRoot,
  RootProvider: EditableRootProvider,
  Context: EditableContext,
  Area: EditableArea,
  Label: EditableLabel,
  Preview: EditablePreview,
  Input: EditableInput,
  Textarea: EditableTextarea,
  Control: EditableControl,
  EditTrigger: EditableEditTrigger,
  SubmitTrigger: EditableSubmitTrigger,
  CancelTrigger: EditableCancelTrigger,
};

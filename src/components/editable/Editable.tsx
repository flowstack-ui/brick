"use client";

import {
  forwardRef,
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
export type EditableRootProps = AtomRootProps & { size?: EditableSize };
export type EditableRootProviderProps = AtomProviderProps & {
  size?: EditableSize;
};
export type EditableAreaProps = ComponentPropsWithoutRef<
  typeof AtomEditable.Area
>;
export type EditableLabelProps = ComponentPropsWithoutRef<
  typeof AtomEditable.Label
>;
export type EditablePreviewProps = ComponentPropsWithoutRef<
  typeof AtomEditable.Preview
>;
export type EditableInputProps = ComponentPropsWithoutRef<
  typeof AtomEditable.Input
>;
export type EditableTextareaProps = ComponentPropsWithoutRef<
  typeof AtomEditable.Textarea
>;
export type EditableControlProps = ComponentPropsWithoutRef<
  typeof AtomEditable.Control
>;
export type EditableTriggerProps = AtomTriggerProps;
const cn = (base: string, extra?: string) =>
  extra ? `${base} ${extra}` : base;
export const EditableRoot = forwardRef<HTMLDivElement, EditableRootProps>(
  function EditableRoot({ size = "md", className, ...props }, ref) {
    return (
      <AtomEditable.Root
        {...props}
        ref={ref}
        data-size={size}
        className={cn("brick-editable", className)}
      />
    );
  },
);
export const EditableRootProvider = forwardRef<
  HTMLDivElement,
  EditableRootProviderProps
>(function EditableRootProvider({ size = "md", className, ...props }, ref) {
  return (
    <AtomEditable.RootProvider
      {...props}
      ref={ref}
      data-size={size}
      className={cn("brick-editable", className)}
    />
  );
});
export const EditableArea = forwardRef<HTMLDivElement, EditableAreaProps>(
  function EditableArea({ className, ...props }, ref) {
    return (
      <AtomEditable.Area
        {...props}
        ref={ref}
        className={cn("brick-editable-area", className)}
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
        className={cn("brick-editable-label", className)}
      />
    );
  },
);
export const EditablePreview = forwardRef<
  HTMLSpanElement,
  EditablePreviewProps
>(function EditablePreview({ className, ...props }, ref) {
  return (
    <AtomEditable.Preview
      {...props}
      ref={ref}
      className={cn("brick-editable-preview", className)}
    />
  );
});
export const EditableInput = forwardRef<HTMLInputElement, EditableInputProps>(
  function EditableInput({ className, ...props }, ref) {
    return (
      <AtomEditable.Input
        {...props}
        ref={ref}
        className={cn("brick-editable-input", className)}
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
      className={cn("brick-editable-textarea", className)}
    />
  );
});
export const EditableControl = forwardRef<HTMLDivElement, EditableControlProps>(
  function EditableControl({ className, ...props }, ref) {
    return (
      <AtomEditable.Control
        {...props}
        ref={ref}
        className={cn("brick-editable-control", className)}
      />
    );
  },
);
export const EditableEditTrigger: ForwardRefExoticComponent<
  EditableTriggerProps & RefAttributes<HTMLButtonElement>
> = forwardRef<HTMLButtonElement, EditableTriggerProps>(
  function EditableEditTrigger({ className, ...props }, ref) {
    return (
      <AtomEditable.EditTrigger
        {...props}
        ref={ref}
        className={cn("brick-editable-trigger", className)}
      />
    );
  },
);
export const EditableSubmitTrigger: ForwardRefExoticComponent<
  EditableTriggerProps & RefAttributes<HTMLButtonElement>
> = forwardRef<HTMLButtonElement, EditableTriggerProps>(
  function EditableSubmitTrigger({ className, ...props }, ref) {
    return (
      <AtomEditable.SubmitTrigger
        {...props}
        ref={ref}
        className={cn("brick-editable-trigger", className)}
      />
    );
  },
);
export const EditableCancelTrigger: ForwardRefExoticComponent<
  EditableTriggerProps & RefAttributes<HTMLButtonElement>
> = forwardRef<HTMLButtonElement, EditableTriggerProps>(
  function EditableCancelTrigger({ className, ...props }, ref) {
    return (
      <AtomEditable.CancelTrigger
        {...props}
        ref={ref}
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

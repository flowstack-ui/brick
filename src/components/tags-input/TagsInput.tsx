"use client";
import { radiusStyle, type RadiusShapeProps } from "../_radius/Radius.js";
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ForwardRefExoticComponent,
  type RefAttributes,
  type ReactNode,
} from "react";
import {
  TagsInput as AtomTagsInput,
  type TagsInputRootProps as AtomRootProps,
  type TagsInputRootProviderProps as AtomProviderProps,
  type TagsInputTriggerProps as AtomTriggerProps,
} from "@flowstack-ui/atom/tags-input";
import {
  controlSizeDataAttributes,
  type ControlSize,
  type ResponsiveControlSize,
} from "../_control-size/ControlSize.js";
import { For } from "../for/For.js";
import type { ChipTone } from "../chip/Chip.js";
export {
  useTagsInput,
  useTagsInputContext,
  useTagsInputCombobox,
} from "@flowstack-ui/atom/tags-input";
export type {
  TagsInputOptions,
  TagsInputController,
  TagsInputTranslations,
  TagsInputInvalidReason,
  TagsInputInvalidDetails,
  TagsInputItemState,
  TagsInputOutsideEvent,
  TagsInputValueChangeDetails,
  TagsInputInputValueChangeDetails,
} from "@flowstack-ui/atom/tags-input";
export type TagsInputSize = ControlSize;
export type TagsInputVariant = "outline" | "soft" | "underline";
export type TagsInputShape = "sharp" | "rounded" | "pill";
export type TagsInputItemTone = ChipTone;
type VisualProps = { size?: ResponsiveControlSize; fullWidth?: boolean } & (
  | ({ variant?: "outline" | "soft" } & RadiusShapeProps<TagsInputShape>)
  | { variant: "underline"; shape?: never; radius?: never }
);
export type TagsInputRootProps = AtomRootProps & VisualProps;
export type TagsInputRootProviderProps = AtomProviderProps & VisualProps;
const cn = (base: string, extra?: string) =>
  extra ? `${base} ${extra}` : base;
export const TagsInputRoot = forwardRef<HTMLDivElement, TagsInputRootProps>(
  function TagsInputRoot(
    {
      size = "lg",
      variant = "outline",
      shape = "rounded",
      radius,
      style,
      fullWidth = true,
      className,
      ...props
    },
    ref,
  ) {
    return (
      <AtomTagsInput.Root
        {...props}
        ref={ref}
        className={cn("brick-tags-input brick-control-size", className)}
        {...controlSizeDataAttributes(size)}
        data-variant={variant}
        data-shape={variant === "underline" ? undefined : radius === undefined ? shape : "rounded"}
        style={radiusStyle(variant === "underline" ? undefined : radius, "--brick-tags-input-radius", style)}
        data-full-width={fullWidth ? "" : undefined}
      />
    );
  },
);
export const TagsInputRootProvider = forwardRef<
  HTMLDivElement,
  TagsInputRootProviderProps
>(function TagsInputRootProvider(
  {
    size = "lg",
    variant = "outline",
    shape = "rounded",
    radius,
    style,
    fullWidth = true,
    className,
    ...props
  },
  ref,
) {
  return (
    <AtomTagsInput.RootProvider
      {...props}
      ref={ref}
      className={cn("brick-tags-input brick-control-size", className)}
      {...controlSizeDataAttributes(size)}
      data-variant={variant}
      data-shape={variant === "underline" ? undefined : radius === undefined ? shape : "rounded"}
      style={radiusStyle(variant === "underline" ? undefined : radius, "--brick-tags-input-radius", style)}
      data-full-width={fullWidth ? "" : undefined}
    />
  );
});
export type TagsInputLabelProps = ComponentPropsWithoutRef<
  typeof AtomTagsInput.Label
>;
export const TagsInputLabel = forwardRef<HTMLLabelElement, TagsInputLabelProps>(
  function TagsInputLabel({ className, ...props }, ref) {
    return (
      <AtomTagsInput.Label
        {...props}
        ref={ref}
        className={cn("brick-tags-input-label", className)}
      />
    );
  },
);
export type TagsInputControlProps = ComponentPropsWithoutRef<
  typeof AtomTagsInput.Control
>;
export const TagsInputControl = forwardRef<
  HTMLDivElement,
  TagsInputControlProps
>(function TagsInputControl({ className, ...props }, ref) {
  return (
    <AtomTagsInput.Control
      {...props}
      ref={ref}
      className={cn("brick-tags-input-control", className)}
    />
  );
});
export type TagsInputInputProps = ComponentPropsWithoutRef<
  typeof AtomTagsInput.Input
>;
export const TagsInputInput = forwardRef<HTMLInputElement, TagsInputInputProps>(
  function TagsInputInput({ className, ...props }, ref) {
    return (
      <AtomTagsInput.Input
        {...props}
        ref={ref}
        className={cn("brick-tags-input-input", className)}
      />
    );
  },
);
export type TagsInputItemPreviewProps = ComponentPropsWithoutRef<
  typeof AtomTagsInput.ItemPreview
>;
export const TagsInputItemPreview = forwardRef<
  HTMLSpanElement,
  TagsInputItemPreviewProps
>(function TagsInputItemPreview({ className, ...props }, ref) {
  return (
    <AtomTagsInput.ItemPreview
      {...props}
      ref={ref}
      className={cn("brick-tags-input-item-preview", className)}
    />
  );
});
export type TagsInputItemTextProps = ComponentPropsWithoutRef<
  typeof AtomTagsInput.ItemText
>;
export const TagsInputItemText = forwardRef<
  HTMLSpanElement,
  TagsInputItemTextProps
>(function TagsInputItemText({ className, ...props }, ref) {
  return (
    <AtomTagsInput.ItemText
      {...props}
      ref={ref}
      className={cn("brick-tags-input-item-text", className)}
    />
  );
});
export type TagsInputItemInputProps = ComponentPropsWithoutRef<
  typeof AtomTagsInput.ItemInput
>;
export const TagsInputItemInput = forwardRef<
  HTMLInputElement,
  TagsInputItemInputProps
>(function TagsInputItemInput({ className, ...props }, ref) {
  return (
    <AtomTagsInput.ItemInput
      {...props}
      ref={ref}
      className={cn("brick-tags-input-item-input", className)}
    />
  );
});
export type TagsInputItemProps = ComponentPropsWithoutRef<
  typeof AtomTagsInput.Item
> & { tone?: TagsInputItemTone };
export const TagsInputItem = forwardRef<HTMLDivElement, TagsInputItemProps>(
  function TagsInputItem({ tone = "neutral", className, ...props }, ref) {
    return (
      <AtomTagsInput.Item
        {...props}
        ref={ref}
        className={cn("brick-tags-input-item", className)}
        data-tone={tone}
      />
    );
  },
);
export type TagsInputTriggerProps = AtomTriggerProps;
function CloseArtwork() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" fill="none">
      <path d="m4 4 8 8M12 4l-8 8" />
    </svg>
  );
}
export const TagsInputItemDeleteTrigger: ForwardRefExoticComponent<
  TagsInputTriggerProps & RefAttributes<HTMLButtonElement>
> = forwardRef<HTMLButtonElement, TagsInputTriggerProps>(
  function TagsInputItemDeleteTrigger({ children, className, ...props }, ref) {
    return (
      <AtomTagsInput.ItemDeleteTrigger
        {...props}
        ref={ref}
        className={cn("brick-tags-input-delete", className)}
      >
        {children ?? <CloseArtwork />}
      </AtomTagsInput.ItemDeleteTrigger>
    );
  },
);
export const TagsInputClearTrigger: ForwardRefExoticComponent<
  TagsInputTriggerProps & RefAttributes<HTMLButtonElement>
> = forwardRef<HTMLButtonElement, TagsInputTriggerProps>(
  function TagsInputClearTrigger({ children, className, ...props }, ref) {
    return (
      <AtomTagsInput.ClearTrigger
        {...props}
        ref={ref}
        className={cn("brick-tags-input-clear", className)}
      >
        {children ?? <CloseArtwork />}
      </AtomTagsInput.ClearTrigger>
    );
  },
);
export type TagsInputItemsProps = {
  tone?: TagsInputItemTone;
  disabled?: (value: string, index: number) => boolean;
  children?: (value: string, index: number) => ReactNode;
};
export function TagsInputItems({
  tone,
  disabled,
  children,
}: TagsInputItemsProps) {
  return (
    <AtomTagsInput.Context>
      {(api) => (
        <For each={api.value}>
          {(value, index) => (
            <TagsInputItem
              key={index}
              value={value}
              index={index}
              tone={tone}
              disabled={disabled?.(value, index)}
            >
              <TagsInputItemPreview>
                <TagsInputItemText>
                  {children?.(value, index)}
                </TagsInputItemText>
                <TagsInputItemDeleteTrigger />
              </TagsInputItemPreview>
              <TagsInputItemInput />
            </TagsInputItem>
          )}
        </For>
      )}
    </AtomTagsInput.Context>
  );
}
export const TagsInputHiddenInput = AtomTagsInput.HiddenInput;
export type TagsInputHiddenInputProps = ComponentPropsWithoutRef<
  typeof TagsInputHiddenInput
>;
export const TagsInputContext = AtomTagsInput.Context;
export const TagsInput: {
  Root: typeof TagsInputRoot;
  RootProvider: typeof TagsInputRootProvider;
  Context: typeof TagsInputContext;
  Label: typeof TagsInputLabel;
  Control: typeof TagsInputControl;
  Input: typeof TagsInputInput;
  Item: typeof TagsInputItem;
  Items: typeof TagsInputItems;
  ItemPreview: typeof TagsInputItemPreview;
  ItemText: typeof TagsInputItemText;
  ItemInput: typeof TagsInputItemInput;
  ItemDeleteTrigger: typeof TagsInputItemDeleteTrigger;
  ClearTrigger: typeof TagsInputClearTrigger;
  HiddenInput: typeof TagsInputHiddenInput;
} = {
  Root: TagsInputRoot,
  RootProvider: TagsInputRootProvider,
  Context: TagsInputContext,
  Label: TagsInputLabel,
  Control: TagsInputControl,
  Input: TagsInputInput,
  Item: TagsInputItem,
  Items: TagsInputItems,
  ItemPreview: TagsInputItemPreview,
  ItemText: TagsInputItemText,
  ItemInput: TagsInputItemInput,
  ItemDeleteTrigger: TagsInputItemDeleteTrigger,
  ClearTrigger: TagsInputClearTrigger,
  HiddenInput: TagsInputHiddenInput,
};

"use client";

import {
  forwardRef,
  type ReactNode,
  type ComponentPropsWithoutRef,
} from "react";
import {
  FileUpload as AtomFileUpload,
  type FileUploadDropzoneProps as AtomFileUploadDropzoneProps,
  type FileUploadHiddenInputProps as AtomFileUploadHiddenInputProps,
  type FileUploadItemDeleteTriggerProps as AtomFileUploadItemDeleteTriggerProps,
  type FileUploadItemGroupProps as AtomFileUploadItemGroupProps,
  type FileUploadItemNameProps as AtomFileUploadItemNameProps,
  type FileUploadItemProps as AtomFileUploadItemProps,
  type FileUploadItemSizeProps as AtomFileUploadItemSizeProps,
  type FileUploadRootProps as AtomFileUploadRootProps,
} from "@flowstack-ui/atom/file-upload";
import type { FileUploadTriggerProps as AtomFileUploadTriggerProps } from "@flowstack-ui/atom";
import {
  useFileUploadContext,
  type FileUploadRootProviderProps as AtomFileUploadRootProviderProps,
} from "@flowstack-ui/atom/file-upload";
import { Button, type ButtonProps } from "../button/Button.js";
import {
  CloseButton,
  type CloseButtonProps,
} from "../close-button/CloseButton.js";
import { useLocaleContext } from "../locale-provider/LocaleProvider.js";
export {
  useFileUpload,
  useFileUploadContext,
  useFileUploadItemContext,
} from "@flowstack-ui/atom/file-upload";
export type {
  FileUploadController,
  FileUploadContextValue,
  FileUploadRejectedFile,
  FileUploadAccept,
  FileUploadError,
} from "@flowstack-ui/atom/file-upload";

export type FileUploadSize = "sm" | "md" | "lg";
import {
  radiusStyle,
  type RadiusShapeProps,
  type DistributiveOmit,
} from "../_radius/Radius.js";
export type FileUploadVariant = "outline" | "surface" | "soft";
export type FileUploadShape = "sharp" | "rounded";

export type FileUploadRootProps = AtomFileUploadRootProps &
  RadiusShapeProps<FileUploadShape> & {
    /** Whether the component fills its available inline size. @default true */
    fullWidth?: boolean;
    /** Corner treatment for the dropzone and items; actions own their radius. @default "rounded" */
    /** Density and control geometry. @default "md" */
    size?: FileUploadSize;
    /** Dropzone and item surface recipe. @default "outline" */
    variant?: FileUploadVariant;
  };

export type FileUploadHiddenInputProps = AtomFileUploadHiddenInputProps;
export type FileUploadTriggerProps = DistributiveOmit<
  ButtonProps,
  "asChild" | "render" | "href" | "target" | "rel" | "type"
> &
  Pick<AtomFileUploadTriggerProps, "asChild" | "render">;
export type FileUploadDropzoneProps = AtomFileUploadDropzoneProps;
export type FileUploadItemGroupProps = AtomFileUploadItemGroupProps;
export type FileUploadItemProps = AtomFileUploadItemProps;
export type FileUploadItemNameProps = AtomFileUploadItemNameProps;
export type FileUploadItemSizeProps = AtomFileUploadItemSizeProps;
export type FileUploadItemDeleteTriggerProps = CloseButtonProps &
  Pick<AtomFileUploadItemDeleteTriggerProps, "asChild" | "render">;

function cn(base: string, className?: string) {
  return className ? `${base} ${className}` : base;
}

export const FileUploadRoot = forwardRef<HTMLDivElement, FileUploadRootProps>(
  function FileUploadRoot(
    {
      className,
      fullWidth = true,
      shape = "rounded",
      radius,
      style,
      size = "md",
      variant = "outline",
      "data-slot": dataSlot,
      ...props
    },
    ref,
  ) {
    return (
      <AtomFileUpload.Root
        {...props}
        className={cn("brick-file-upload", className)}
        data-full-width={fullWidth ? "" : undefined}
        data-shape={radius === undefined ? shape : "rounded"}
        style={radiusStyle(radius, "--brick-file-upload-radius", style)}
        data-size={size}
        data-slot={dataSlot ?? "file-upload"}
        data-variant={variant}
        ref={ref}
      />
    );
  },
);

export const FileUploadHiddenInput = forwardRef<
  HTMLInputElement,
  FileUploadHiddenInputProps
>(function FileUploadHiddenInput({ "data-slot": dataSlot, ...props }, ref) {
  return (
    <AtomFileUpload.HiddenInput
      {...props}
      data-slot={dataSlot ?? "file-upload-hidden-input"}
      ref={ref}
    />
  );
});

export const FileUploadTrigger = forwardRef<
  HTMLElement,
  FileUploadTriggerProps
>(function FileUploadTrigger(
  { children, className, asChild, render, "data-slot": dataSlot, ...props },
  ref,
) {
  const ctx = useFileUploadContext();
  if (asChild || render !== undefined)
    return (
      <AtomFileUpload.Trigger
        {...props}
        asChild={asChild}
        render={render}
        className={className}
        ref={ref}
      >
        {children}
      </AtomFileUpload.Trigger>
    );
  return (
    <AtomFileUpload.Trigger
      asChild
      ref={ref}
      data-slot={dataSlot ?? "file-upload-trigger"}
    >
      <Button
        variant="outline"
        tone="neutral"
        {...props}
        className={className}
        disabled={props.disabled || ctx.disabled || ctx.readOnly}
      >
        {children ?? "Choose files"}
      </Button>
    </AtomFileUpload.Trigger>
  );
});

export const FileUploadDropzone = forwardRef<
  HTMLDivElement,
  FileUploadDropzoneProps
>(function FileUploadDropzone(
  { className, "data-slot": dataSlot, ...props },
  ref,
) {
  return (
    <AtomFileUpload.Dropzone
      {...props}
      className={cn("brick-file-upload__dropzone", className)}
      data-click-disabled={props.disableClick ? "" : undefined}
      data-slot={dataSlot ?? "file-upload-dropzone"}
      ref={ref}
    />
  );
});

export const FileUploadItemGroup = forwardRef<
  HTMLUListElement,
  FileUploadItemGroupProps
>(function FileUploadItemGroup(
  { className, "data-slot": dataSlot, ...props },
  ref,
) {
  return (
    <AtomFileUpload.ItemGroup
      {...props}
      className={cn("brick-file-upload__items", className)}
      data-slot={dataSlot ?? "file-upload-item-group"}
      ref={ref}
    />
  );
});

export const FileUploadItem = forwardRef<HTMLLIElement, FileUploadItemProps>(
  function FileUploadItem({ className, "data-slot": dataSlot, ...props }, ref) {
    return (
      <AtomFileUpload.Item
        {...props}
        className={cn("brick-file-upload__item", className)}
        data-slot={dataSlot ?? "file-upload-item"}
        ref={ref}
      />
    );
  },
);

export const FileUploadItemName = forwardRef<
  HTMLSpanElement,
  FileUploadItemNameProps
>(function FileUploadItemName(
  { className, "data-slot": dataSlot, ...props },
  ref,
) {
  return (
    <AtomFileUpload.ItemName
      {...props}
      className={cn("brick-file-upload__item-name", className)}
      data-slot={dataSlot ?? "file-upload-item-name"}
      ref={ref}
    />
  );
});

export const FileUploadItemSize = forwardRef<
  HTMLSpanElement,
  FileUploadItemSizeProps
>(function FileUploadItemSize(
  { className, "data-slot": dataSlot, ...props },
  ref,
) {
  const { locale } = useLocaleContext();
  return (
    <AtomFileUpload.ItemSize
      locale={locale}
      {...props}
      className={cn("brick-file-upload__item-size", className)}
      data-slot={dataSlot ?? "file-upload-item-size"}
      ref={ref}
    />
  );
});

export const FileUploadItemDeleteTrigger = forwardRef<
  HTMLButtonElement,
  FileUploadItemDeleteTriggerProps
>(function FileUploadItemDeleteTrigger(
  { children, className, asChild, render, "data-slot": dataSlot, ...props },
  ref,
) {
  const ctx = useFileUploadContext();
  if (asChild || render !== undefined)
    return (
      <AtomFileUpload.ItemDeleteTrigger
        {...props}
        asChild={asChild}
        render={render}
        className={className}
        ref={ref}
      >
        {children}
      </AtomFileUpload.ItemDeleteTrigger>
    );
  return (
    <AtomFileUpload.ItemDeleteTrigger
      asChild
      data-slot={dataSlot ?? "file-upload-item-delete-trigger"}
      ref={ref}
    >
      <CloseButton
        {...props}
        className={className}
        disabled={props.disabled || ctx.disabled || ctx.readOnly}
      >
        {children}
      </CloseButton>
    </AtomFileUpload.ItemDeleteTrigger>
  );
});

export type FileUploadRootProviderProps = AtomFileUploadRootProviderProps &
  RadiusShapeProps<FileUploadShape> &
  Pick<FileUploadRootProps, "size" | "variant" | "fullWidth">;
export const FileUploadRootProvider = forwardRef<
  HTMLDivElement,
  FileUploadRootProviderProps
>(function FileUploadRootProvider(
  {
    size = "md",
    variant = "outline",
    fullWidth = true,
    shape = "rounded",
    radius,
    style,
    className,
    ...props
  },
  ref,
) {
  return (
    <AtomFileUpload.RootProvider
      {...props}
      ref={ref}
      className={cn("brick-file-upload", className)}
      data-size={size}
      data-variant={variant}
      data-full-width={fullWidth ? "" : undefined}
      data-shape={radius === undefined ? shape : "rounded"}
      style={radiusStyle(radius, "--brick-file-upload-radius", style)}
    />
  );
});
export type FileUploadClearTriggerProps = DistributiveOmit<
  FileUploadTriggerProps,
  "render" | "asChild"
> &
  Pick<
    ComponentPropsWithoutRef<typeof AtomFileUpload.ClearTrigger>,
    "asChild" | "render"
  >;
export const FileUploadClearTrigger = forwardRef<
  HTMLButtonElement,
  FileUploadClearTriggerProps
>(function FileUploadClearTrigger(
  { asChild, render, children, ...props },
  ref,
) {
  const ctx = useFileUploadContext();
  if (asChild || render !== undefined)
    return (
      <AtomFileUpload.ClearTrigger
        {...props}
        asChild={asChild}
        render={render}
        ref={ref}
      >
        {children}
      </AtomFileUpload.ClearTrigger>
    );
  return (
    <AtomFileUpload.ClearTrigger asChild ref={ref}>
      <Button
        variant="ghost"
        tone="neutral"
        {...props}
        disabled={props.disabled || ctx.disabled || ctx.readOnly}
      >
        {children ?? "Clear files"}
      </Button>
    </AtomFileUpload.ClearTrigger>
  );
});
export const FileUploadContext = AtomFileUpload.Context;
export const FileUploadLabel = AtomFileUpload.Label;
export const FileUploadFileText = AtomFileUpload.FileText;
export const FileUploadItemPreview = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof AtomFileUpload.ItemPreview>
>(function FileUploadItemPreview({ className, ...props }, ref) {
  return (
    <AtomFileUpload.ItemPreview
      {...props}
      ref={ref}
      className={cn("brick-file-upload__preview", className)}
    />
  );
});
export const FileUploadItemPreviewImage = forwardRef<
  HTMLImageElement,
  ComponentPropsWithoutRef<typeof AtomFileUpload.ItemPreviewImage>
>(function FileUploadItemPreviewImage({ className, ...props }, ref) {
  return (
    <AtomFileUpload.ItemPreviewImage
      {...props}
      ref={ref}
      className={cn("brick-file-upload__preview-image", className)}
    />
  );
});
export const FileUploadItemContent = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div">
>(function FileUploadItemContent({ className, ...props }, ref) {
  return (
    <div
      {...props}
      ref={ref}
      data-slot="file-upload-item-content"
      className={cn("brick-file-upload__item-content", className)}
    />
  );
});
export const FileUploadDropzoneContent = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div">
>(function FileUploadDropzoneContent({ className, ...props }, ref) {
  return (
    <div
      {...props}
      ref={ref}
      data-slot="file-upload-dropzone-content"
      className={cn("brick-file-upload__dropzone-content", className)}
    />
  );
});
export function FileUploadItems({
  showSize = true,
  clearable = true,
}: {
  showSize?: boolean;
  clearable?: boolean;
}) {
  const { files } = useFileUploadContext();
  return (
    <>
      {files.map((file, index) => (
        <FileUploadItem
          file={file}
          key={`${file.name}-${file.lastModified}-${index}`}
        >
          <FileUploadItemPreview
            type="image/*"
            fallback={
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path d="M6 3h8l4 4v14H6zM14 3v5h4" />
              </svg>
            }
          >
            <FileUploadItemPreviewImage />
          </FileUploadItemPreview>
          <FileUploadItemContent>
            <FileUploadItemName />
            {showSize && <FileUploadItemSize />}
          </FileUploadItemContent>
          {clearable && <FileUploadItemDeleteTrigger size="xs" />}
        </FileUploadItem>
      ))}
    </>
  );
}
export const FileUploadList = forwardRef<
  HTMLUListElement,
  Omit<FileUploadItemGroupProps, "children" | "type"> & {
    showSize?: boolean;
    clearable?: boolean;
  }
>(function FileUploadList({ showSize, clearable, ...props }, ref) {
  return (
    <FileUploadItemGroup {...props} ref={ref}>
      <FileUploadItems showSize={showSize} clearable={clearable} />
    </FileUploadItemGroup>
  );
});

FileUploadRoot.displayName = "FileUpload.Root";
export type FileUploadLabelProps = ComponentPropsWithoutRef<
  typeof FileUploadLabel
>;
export type FileUploadFileTextProps = ComponentPropsWithoutRef<
  typeof FileUploadFileText
>;
export type FileUploadItemPreviewProps = ComponentPropsWithoutRef<
  typeof FileUploadItemPreview
>;
export type FileUploadItemPreviewImageProps = ComponentPropsWithoutRef<
  typeof FileUploadItemPreviewImage
>;
export type FileUploadItemContentProps = ComponentPropsWithoutRef<
  typeof FileUploadItemContent
>;
export type FileUploadDropzoneContentProps = ComponentPropsWithoutRef<
  typeof FileUploadDropzoneContent
>;
export type FileUploadItemsProps = ComponentPropsWithoutRef<
  typeof FileUploadItems
>;
export type FileUploadListProps = ComponentPropsWithoutRef<
  typeof FileUploadList
>;
FileUploadHiddenInput.displayName = "FileUpload.HiddenInput";
FileUploadTrigger.displayName = "FileUpload.Trigger";
FileUploadDropzone.displayName = "FileUpload.Dropzone";
FileUploadItemGroup.displayName = "FileUpload.ItemGroup";
FileUploadItem.displayName = "FileUpload.Item";
FileUploadItemName.displayName = "FileUpload.ItemName";
FileUploadItemSize.displayName = "FileUpload.ItemSize";
FileUploadItemDeleteTrigger.displayName = "FileUpload.ItemDeleteTrigger";

export const FileUpload = Object.freeze({
  Root: FileUploadRoot,
  RootProvider: FileUploadRootProvider,
  Context: FileUploadContext,
  ClearTrigger: FileUploadClearTrigger,
  Label: FileUploadLabel,
  FileText: FileUploadFileText,
  ItemPreview: FileUploadItemPreview,
  ItemPreviewImage: FileUploadItemPreviewImage,
  ItemContent: FileUploadItemContent,
  DropzoneContent: FileUploadDropzoneContent,
  Items: FileUploadItems,
  List: FileUploadList,
  HiddenInput: FileUploadHiddenInput,
  Trigger: FileUploadTrigger,
  Dropzone: FileUploadDropzone,
  ItemGroup: FileUploadItemGroup,
  Item: FileUploadItem,
  ItemName: FileUploadItemName,
  ItemSize: FileUploadItemSize,
  ItemDeleteTrigger: FileUploadItemDeleteTrigger,
});

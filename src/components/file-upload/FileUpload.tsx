"use client";

import { forwardRef, type ReactNode } from "react";
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

export type FileUploadSize = "sm" | "md" | "lg";
export type FileUploadVariant = "outline" | "soft";
export type FileUploadShape = "sharp" | "rounded";

export interface FileUploadRootProps extends AtomFileUploadRootProps {
  /** Whether the component fills its available inline size. @default true */
  fullWidth?: boolean;
  /** Corner treatment shared by the dropzone, items, and actions. @default "rounded" */
  shape?: FileUploadShape;
  /** Density and control geometry. @default "md" */
  size?: FileUploadSize;
  /** Dropzone and item surface recipe. @default "outline" */
  variant?: FileUploadVariant;
}

export type FileUploadHiddenInputProps = AtomFileUploadHiddenInputProps;
export interface FileUploadTriggerProps extends Omit<AtomFileUploadTriggerProps, "children"> {
  children?: ReactNode;
}
export type FileUploadDropzoneProps = AtomFileUploadDropzoneProps;
export type FileUploadItemGroupProps = AtomFileUploadItemGroupProps;
export type FileUploadItemProps = AtomFileUploadItemProps;
export type FileUploadItemNameProps = AtomFileUploadItemNameProps;
export type FileUploadItemSizeProps = AtomFileUploadItemSizeProps;
export interface FileUploadItemDeleteTriggerProps extends Omit<AtomFileUploadItemDeleteTriggerProps, "children"> {
  children?: ReactNode;
}

function cn(base: string, className?: string) {
  return className ? `${base} ${className}` : base;
}

function DeleteArtwork() {
  return (
    <svg aria-hidden="true" className="brick-file-upload__delete-artwork" fill="none" viewBox="0 0 16 16">
      <path d="m4.5 4.5 7 7m0-7-7 7" />
    </svg>
  );
}

export const FileUploadRoot = forwardRef<HTMLDivElement, FileUploadRootProps>(
  function FileUploadRoot(
    {
      className,
      fullWidth = true,
      shape = "rounded",
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
        data-shape={shape}
        data-size={size}
        data-slot={dataSlot ?? "file-upload"}
        data-variant={variant}
        ref={ref}
      />
    );
  },
);

export const FileUploadHiddenInput = forwardRef<HTMLInputElement, FileUploadHiddenInputProps>(
  function FileUploadHiddenInput({ "data-slot": dataSlot, ...props }, ref) {
    return <AtomFileUpload.HiddenInput {...props} data-slot={dataSlot ?? "file-upload-hidden-input"} ref={ref} />;
  },
);

export const FileUploadTrigger = forwardRef<HTMLElement, FileUploadTriggerProps>(
  function FileUploadTrigger({ children, className, "data-slot": dataSlot, ...props }, ref) {
    return (
      <AtomFileUpload.Trigger
        {...props}
        className={cn("brick-file-upload__trigger", className)}
        data-slot={dataSlot ?? "file-upload-trigger"}
        ref={ref}
      >
        {children ?? "Choose files"}
      </AtomFileUpload.Trigger>
    );
  },
);

export const FileUploadDropzone = forwardRef<HTMLDivElement, FileUploadDropzoneProps>(
  function FileUploadDropzone({ className, "data-slot": dataSlot, ...props }, ref) {
    return <AtomFileUpload.Dropzone {...props} className={cn("brick-file-upload__dropzone", className)} data-slot={dataSlot ?? "file-upload-dropzone"} ref={ref} />;
  },
);

export const FileUploadItemGroup = forwardRef<HTMLUListElement, FileUploadItemGroupProps>(
  function FileUploadItemGroup({ className, "data-slot": dataSlot, ...props }, ref) {
    return <AtomFileUpload.ItemGroup {...props} className={cn("brick-file-upload__items", className)} data-slot={dataSlot ?? "file-upload-item-group"} ref={ref} />;
  },
);

export const FileUploadItem = forwardRef<HTMLLIElement, FileUploadItemProps>(
  function FileUploadItem({ className, "data-slot": dataSlot, ...props }, ref) {
    return <AtomFileUpload.Item {...props} className={cn("brick-file-upload__item", className)} data-slot={dataSlot ?? "file-upload-item"} ref={ref} />;
  },
);

export const FileUploadItemName = forwardRef<HTMLSpanElement, FileUploadItemNameProps>(
  function FileUploadItemName({ className, "data-slot": dataSlot, ...props }, ref) {
    return <AtomFileUpload.ItemName {...props} className={cn("brick-file-upload__item-name", className)} data-slot={dataSlot ?? "file-upload-item-name"} ref={ref} />;
  },
);

export const FileUploadItemSize = forwardRef<HTMLSpanElement, FileUploadItemSizeProps>(
  function FileUploadItemSize({ className, "data-slot": dataSlot, ...props }, ref) {
    return <AtomFileUpload.ItemSize {...props} className={cn("brick-file-upload__item-size", className)} data-slot={dataSlot ?? "file-upload-item-size"} ref={ref} />;
  },
);

export const FileUploadItemDeleteTrigger = forwardRef<HTMLButtonElement, FileUploadItemDeleteTriggerProps>(
  function FileUploadItemDeleteTrigger({ children, className, "data-slot": dataSlot, ...props }, ref) {
    return (
      <AtomFileUpload.ItemDeleteTrigger
        {...props}
        className={cn("brick-file-upload__delete", className)}
        data-slot={dataSlot ?? "file-upload-item-delete-trigger"}
        ref={ref}
      >
        {children ?? <DeleteArtwork />}
      </AtomFileUpload.ItemDeleteTrigger>
    );
  },
);

FileUploadRoot.displayName = "FileUpload.Root";
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
  HiddenInput: FileUploadHiddenInput,
  Trigger: FileUploadTrigger,
  Dropzone: FileUploadDropzone,
  ItemGroup: FileUploadItemGroup,
  Item: FileUploadItem,
  ItemName: FileUploadItemName,
  ItemSize: FileUploadItemSize,
  ItemDeleteTrigger: FileUploadItemDeleteTrigger,
});

import { createElement, createRef } from "react";
import {
  FileUpload,
  type FileUploadRootProps,
  type FileUploadShape,
  type FileUploadSize,
  type FileUploadVariant,
} from "../../../src/file-upload.js";
import { FileUpload as RootExport } from "../../../src/index.js";

const rootRef = createRef<HTMLDivElement>();
const inputRef = createRef<HTMLInputElement>();
const triggerRef = createRef<HTMLElement>();
const itemRef = createRef<HTMLLIElement>();
const props: FileUploadRootProps = {
  accept: "image/*,.pdf",
  appendFiles: true,
  fullWidth: false,
  maxFiles: 3,
  maxSize: 5_000_000,
  multiple: true,
  name: "attachments",
  shape: "sharp",
  size: "lg",
  variant: "soft",
};

createElement(FileUpload.Root, { ...props, ref: rootRef },
  createElement(FileUpload.HiddenInput, { ref: inputRef }),
  createElement(FileUpload.Dropzone, null, createElement(FileUpload.Trigger, { ref: triggerRef })),
  createElement(FileUpload.ItemGroup, { children: (file: File, index: number) =>
    createElement(FileUpload.Item, { file, index, key: file.name, ref: itemRef },
      createElement(FileUpload.ItemName),
      createElement(FileUpload.ItemSize),
      createElement(FileUpload.ItemDeleteTrigger),
    ) }),
);

const variants: FileUploadVariant[] = ["outline", "soft"];
const sizes: FileUploadSize[] = ["sm", "md", "lg"];
const shapes: FileUploadShape[] = ["sharp", "rounded"];
void RootExport;
void variants;
void sizes;
void shapes;
// @ts-expect-error unsupported visual variant
createElement(FileUpload.Root, { variant: "solid" });

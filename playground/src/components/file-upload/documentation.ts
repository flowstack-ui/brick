import {
  ownerSections,
  type OwnerExample,
  type OwnerPart,
} from "../../shared/OwnerDocumentation.js";
import { FileUploadActions } from "./examples/FileUploadActions.js";
import actions from "./examples/FileUploadActions.tsx?raw";
import { FileUploadDropzone } from "./examples/FileUploadDropzone.js";
import dropzone from "./examples/FileUploadDropzone.tsx?raw";
import { FileUploadValidation } from "./examples/FileUploadValidation.js";
import validation from "./examples/FileUploadValidation.tsx?raw";
import { FileUploadCapacity } from "./examples/FileUploadCapacity.js";
import capacity from "./examples/FileUploadCapacity.tsx?raw";
import { FileUploadDirectory } from "./examples/FileUploadDirectory.js";
import directory from "./examples/FileUploadDirectory.tsx?raw";
import { FileUploadCapture } from "./examples/FileUploadCapture.js";
import capture from "./examples/FileUploadCapture.tsx?raw";
import { FileUploadFileText } from "./examples/FileUploadFileText.js";
import fileText from "./examples/FileUploadFileText.tsx?raw";
import { FileUploadPaste } from "./examples/FileUploadPaste.js";
import paste from "./examples/FileUploadPaste.tsx?raw";
import { FileUploadTransform } from "./examples/FileUploadTransform.js";
import transform from "./examples/FileUploadTransform.tsx?raw";
import { FileUploadForm } from "./examples/FileUploadForm.js";
import form from "./examples/FileUploadForm.tsx?raw";
import { FileUploadPreview } from "./examples/FileUploadPreview.js";
import preview from "./examples/FileUploadPreview.tsx?raw";
import { FileUploadRecipes } from "./examples/FileUploadRecipes.js";
import recipes from "./examples/FileUploadRecipes.tsx?raw";
import { FileUploadStates } from "./examples/FileUploadStates.js";
import states from "./examples/FileUploadStates.tsx?raw";

export const examples: OwnerExample[] = [
  {
    id: "actions",
    title: "Button and icon actions",
    description:
      "Use Button recipes directly or compose IconButton with asChild on the same host.",
    Demo: FileUploadActions,
    source: actions,
  },
  {
    id: "dropzone",
    title: "Dropzone",
    description:
      "Drop files or browse for multiple attachments. Nested controls keep their own actions.",
    Demo: FileUploadDropzone,
    source: dropzone,
  },
  {
    id: "validation",
    title: "Accepted files and limits",
    description:
      "Validate types, count and byte limits; display rejected files without treating client checks as security.",
    Demo: FileUploadValidation,
    source: validation,
  },
  {
    id: "capacity",
    title: "Multiple files and capacity",
    description:
      "Use remaining capacity to disable adding and allow users to remove or clear the selection.",
    Demo: FileUploadCapacity,
    source: capacity,
  },
  {
    id: "preview",
    title: "Image preview",
    description:
      "Compose previews with metadata and removal. Object URLs are cleaned up automatically.",
    Demo: FileUploadPreview,
    source: preview,
  },
  {
    id: "file-text",
    title: "Input appearance",
    description:
      "An input-styled button displays selected filenames; it is not an editable file path.",
    Demo: FileUploadFileText,
    source: fileText,
  },
  {
    id: "directory",
    title: "Directory",
    description:
      "Choose a folder and preserve relative paths where the browser supports directory selection.",
    Demo: FileUploadDirectory,
    source: directory,
  },
  {
    id: "capture",
    title: "Camera capture",
    description:
      "Request the environment camera on supported devices. Desktop browsers may show the normal picker.",
    Demo: FileUploadCapture,
    source: capture,
  },
  {
    id: "paste",
    title: "Paste and controller",
    description:
      "Use an external controller to accept clipboard images and share selection state.",
    Demo: FileUploadPaste,
    source: paste,
  },
  {
    id: "transform",
    title: "Transform files",
    description:
      "Prepare file content asynchronously before accepting it. New selection and clear invalidate pending results.",
    Demo: FileUploadTransform,
    source: transform,
  },
  {
    id: "recipes",
    title: "Dropzone recipes",
    description:
      "Uploader density and surfaces are independent from the trigger's Button size and variant.",
    Demo: FileUploadRecipes,
    source: recipes,
  },
  {
    id: "states",
    title: "Disabled and read only",
    description:
      "Both prevent changes; read-only selection remains available for inspection.",
    Demo: FileUploadStates,
    source: states,
  },
  {
    id: "form",
    title: "Field and form",
    description:
      "Connect required validation, native multipart form values and reset through HiddenInput.",
    Demo: FileUploadForm,
    source: form,
  },
];

const row = (
  name: string,
  typeLabel: string,
  defaultLabel: string,
  description: string,
) => ({ name, typeLabel, defaultLabel, description });
export const parts: OwnerPart[] = [
  {
    id: "props-root",
    title: "Root",
    description:
      "Selection behavior and uploader presentation. RootProvider accepts the same visual recipes and a controller value.",
    rows: [
      row(
        "files / defaultFiles",
        "File[]",
        "[]",
        "Controlled or initial selected files. Use onFilesChange with controlled files.",
      ),
      row(
        "onFilesChange",
        "(files: File[]) => void",
        "—",
        "Selected-file state callback.",
      ),
      row(
        "accept",
        "string | string[] | Record<string, string[]>",
        "—",
        "Native accept rules and client-side type validation.",
      ),
      row(
        "multiple / appendFiles",
        "boolean",
        "false / true in multiple mode",
        "Allow multiple files and append or replace selections. maxFiles greater than one also enables multiple unless explicitly disabled.",
      ),
      row(
        "maxFiles / minSize / maxSize",
        "number",
        "—",
        "Capacity and file-size limits in bytes.",
      ),
      row(
        "validateFile",
        "(file, context) => string | FileUploadError[] | null",
        "—",
        "Custom rejection rules with current candidates and accepted files.",
      ),
      row(
        "onFileAccept / onFileReject / onFileChange",
        "(details) => void",
        "—",
        "Validation result callbacks; onRejectedFilesChange is also available.",
      ),
      row(
        "transformFiles",
        "(files: File[]) => File[] | Promise<File[]>",
        "—",
        "Preprocess files; obsolete asynchronous results are discarded.",
      ),
      row(
        "onTransformError",
        "(error: unknown) => void",
        "—",
        "Observe preparation failures; context also exposes transformError.",
      ),
      row(
        "directory / capture",
        "boolean / boolean | 'user' | 'environment'",
        "false / —",
        "Native folder selection and camera hint.",
      ),
      row(
        "allowDrop / preventDocumentDrop",
        "boolean",
        "true",
        "Allow component drop intake and prevent accidental document navigation by dropped files.",
      ),
      row(
        "disabled / readOnly / required / invalid",
        "boolean",
        "false",
        "Field-aware control state.",
      ),
      row(
        "name / form",
        "string",
        "—",
        "Native form participation through HiddenInput.",
      ),
      row(
        "translations",
        "FileUpload translations",
        "English",
        "Clear label, remove filename label and selected-file count.",
      ),
      row(
        "size",
        "'sm' | 'md' | 'lg'",
        "'md'",
        "Uploader density, independent of action size.",
      ),
      row(
        "variant",
        "'outline' | 'surface' | 'soft'",
        "'outline'",
        "Dropzone and item surface recipe.",
      ),
      row(
        "radius",
        "Radius",
        "control",
        "System radius token; mutually exclusive with shape.",
      ),
      row(
        "fullWidth",
        "boolean",
        "true",
        "Fill the available inline space without stretching actions.",
      ),
    ],
  },
  {
    id: "props-actions",
    title: "Trigger and ClearTrigger",
    description:
      "Shared Button presentation by default. asChild/render delegates presentation to the supplied host.",
    rows: [
      row(
        "variant / tone",
        "ButtonVariant / ButtonTone",
        "outline / neutral (Trigger)",
        "The same visual recipes as Button; ClearTrigger defaults to ghost/neutral.",
      ),
      row(
        "size",
        "ResponsiveValue<ButtonSize>",
        "'lg'",
        "All seven Button sizes, including responsive values.",
      ),
      row(
        "radius / shape / fullWidth / focusRing",
        "Button visual props",
        "Button defaults",
        "Shared geometry and focus presentation.",
      ),
      row(
        "startIcon / endIcon / loading / loadingText / spinner",
        "Button props",
        "—",
        "Shared artwork and pending-state composition.",
      ),
      row(
        "asChild / render",
        "boolean / RenderProp",
        "false / —",
        "Compose one Button or IconButton; never nest buttons.",
      ),
    ],
  },
  {
    id: "props-dropzone",
    title: "Dropzone",
    description:
      "Optional pointer, keyboard and drag intake. DropzoneContent groups descriptive content.",
    rows: [
      row(
        "disableClick",
        "boolean",
        "false",
        "Disable background click and keyboard picker activation; nested triggers remain usable.",
      ),
      row(
        "onDirectoryError",
        "(error: unknown) => void",
        "—",
        "Observe directory traversal errors, also exposed as transformError.",
      ),
    ],
  },
  {
    id: "props-items",
    title: "Items and previews",
    description:
      "ItemGroup renders accepted/rejected files. List is the ready-made accepted-file list; Items supplies its rows.",
    rows: [
      row(
        "ItemGroup.type",
        "'accepted' | 'rejected'",
        "'accepted'",
        "Which files function children receive.",
      ),
      row(
        "Item.file / index",
        "File / number",
        "— / 0",
        "Select a file for metadata, preview and removal parts.",
      ),
      row(
        "ItemPreview.type / fallback",
        "string / ReactNode",
        "'*' / —",
        "Filter previews by MIME type or wildcard and supply alternative artwork.",
      ),
      row(
        "ItemPreviewImage.alt",
        "string",
        "''",
        "Image description; filename metadata often already provides the accessible name.",
      ),
      row(
        "ItemSize.locale",
        "string",
        "LocaleProvider locale",
        "Localize file-size number formatting.",
      ),
      row(
        "ItemDeleteTrigger",
        "CloseButton props",
        "CloseButton defaults",
        "Shared IconButton size, tone, variant and loading; removes the current file.",
      ),
      row(
        "List.showSize / clearable",
        "boolean",
        "true",
        "Include formatted file size and remove actions.",
      ),
      row(
        "FileText.fallback",
        "ReactNode",
        "'No file selected'",
        "Text for the empty selection.",
      ),
    ],
  },
  {
    id: "props-controller",
    title: "RootProvider and Context",
    description:
      "Coordinate upload selection outside the Root without reimplementing behavior.",
    rows: [
      row(
        "RootProvider.value",
        "FileUploadController",
        "required",
        "Controller returned by useFileUpload(options).",
      ),
      row(
        "Context.children",
        "(context) => ReactNode",
        "—",
        "Read selected/rejected files, capacity, transforming/error state and selection actions.",
      ),
    ],
  },
];
export const sections = ownerSections(examples, parts);

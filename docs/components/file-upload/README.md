# File Upload

File Upload is Brick's styled file picker, drop target, and removable selected-file list, backed directly by Atom. It works alone or as the sole control in one `Field`; file transfer, upload progress, persistence, and server policy remain application concerns.

## When and where to use

Use File Upload when people need to select one or more local files, see the accepted selection, remove files before submission, or use drag and drop as an alternative to the native picker.

## When not to use

Use Input for textual paths or URLs and Button for an action that does not own a file input. Do not use File Upload as a network uploader: it does not provide previews, transfer progress, retry, persistence, capture or directory modes, paste handling, transforms, or duplicate policy.

## Installation and imports

```tsx
import { FileUpload } from "@flowstack-ui/brick/file-upload";
import { Field } from "@flowstack-ui/brick/field";
import "@flowstack-ui/brick/styles.css";
```

The same exports are available from `@flowstack-ui/brick`.

## Quick start

```tsx
<Field.Root id="attachments">
  <Field.Label>Attachments</Field.Label>
  <FileUpload.Root accept="image/*,.pdf" maxSize={5_000_000} multiple name="attachments">
    <FileUpload.HiddenInput />
    <FileUpload.Dropzone>
      <span>Drop files here</span>
      <FileUpload.Trigger />
    </FileUpload.Dropzone>
    <FileUpload.ItemGroup>
      {(file, index) => (
        <FileUpload.Item file={file} index={index} key={`${file.name}-${index}`}>
          <FileUpload.ItemName />
          <FileUpload.ItemSize />
          <FileUpload.ItemDeleteTrigger />
        </FileUpload.Item>
      )}
    </FileUpload.ItemGroup>
  </FileUpload.Root>
  <Field.Description>PDF or image, up to 5 MB.</Field.Description>
  <Field.Error>Add at least one attachment.</Field.Error>
</Field.Root>
```

## Anatomy and DOM ownership

| Part | Default element and ref | Purpose |
| --- | --- | --- |
| `Root` | `div`, `HTMLDivElement` | Owns files, validation, form state, and visual recipe attributes. |
| `HiddenInput` | `input[type=file]`, `HTMLInputElement` | Native picker, form owner, and validation proxy; it remains visually hidden. |
| `Trigger` | `button`, `HTMLElement` | Opens the picker; defaults to `Choose files`. |
| `Dropzone` | `div`, `HTMLDivElement` | Receives file drags and exposes accept or reject state. |
| `ItemGroup` | `ul`, `HTMLUListElement` | Renders selected files, including function children. |
| `Item` | `li`, `HTMLLIElement` | Provides one file to its item parts. |
| `ItemName` | `span`, `HTMLSpanElement` | Defaults to the file name. |
| `ItemSize` | `span`, `HTMLSpanElement` | Defaults to Atom's formatted byte size. |
| `ItemDeleteTrigger` | `button`, `HTMLButtonElement` | Removes its file; Brick supplies a private decorative delete icon when children are omitted. |

Brick adds no required wrapper inside these public parts.

## API

Root adds four visual props:

| Prop | Values | Default |
| --- | --- | --- |
| `variant` | `outline`, `soft` | `outline` |
| `size` | `sm`, `md`, `lg` | `md` |
| `shape` | `sharp`, `rounded` | `rounded` |
| `fullWidth` | boolean | `true` |

Root otherwise forwards Atom's `files`, `defaultFiles`, `onFilesChange`, `onRejectedFilesChange`, `accept`, `multiple`, `appendFiles`, `maxFiles`, `maxSize`, `validateFile`, `preventDocumentDrop`, `name`, `form`, `disabled`, `required`, `readOnly`, `invalid`, and `validationBehavior` contract plus supported native composition props. `Trigger` and `ItemDeleteTrigger` accept authored children; their accessible defaults remain available when children are omitted. Every part and prop type is also available as a named export.

Named exports are `FileUpload`, `FileUploadRoot`, `FileUploadHiddenInput`, `FileUploadTrigger`, `FileUploadDropzone`, `FileUploadItemGroup`, `FileUploadItem`, `FileUploadItemName`, `FileUploadItemSize`, and `FileUploadItemDeleteTrigger`. Types are `FileUploadRootProps`, `FileUploadHiddenInputProps`, `FileUploadTriggerProps`, `FileUploadDropzoneProps`, `FileUploadItemGroupProps`, `FileUploadItemProps`, `FileUploadItemNameProps`, `FileUploadItemSizeProps`, `FileUploadItemDeleteTriggerProps`, `FileUploadVariant`, `FileUploadSize`, and `FileUploadShape`.

Rejected-file feedback does not automatically mark the Field invalid. Use `onRejectedFilesChange` for selection-policy feedback and use `invalid` or form validation for the Field's validity state.

## Visual recipes and states

`outline` uses a dashed raised dropzone; `soft` uses a quiet filled surface and solid border. Size changes the complete dropzone density and type scale. Shape changes the dropzone, items, and actions together. Atom state attributes drive empty, filled, dragging, accepted, rejected, disabled, read-only, required, and invalid presentation without changing the public anatomy.

## Tokens and CSS hooks

Stable classes are `.brick-file-upload`, `.brick-file-upload__dropzone`, `__trigger`, `__items`, `__item`, `__item-name`, `__item-size`, and `__delete`. The `data-slot` defaults use `file-upload`, `file-upload-hidden-input`, `file-upload-trigger`, `file-upload-dropzone`, `file-upload-item-group`, `file-upload-item`, `file-upload-item-name`, `file-upload-item-size`, and `file-upload-item-delete-trigger`.

Public variables are `--brick-file-upload-gap`, `--brick-file-upload-dropzone-min-block-size`, `--brick-file-upload-dropzone-padding`, `--brick-file-upload-radius`, `--brick-file-upload-background`, `--brick-file-upload-border`, `--brick-file-upload-foreground`, `--brick-file-upload-muted-foreground`, `--brick-file-upload-hover-background`, `--brick-file-upload-accept-border`, `--brick-file-upload-reject-border`, `--brick-file-upload-trigger-background`, `--brick-file-upload-trigger-foreground`, `--brick-file-upload-item-background`, `--brick-file-upload-item-border`, and `--brick-file-upload-delete-foreground`.

Root exposes `data-size`, `data-shape`, `data-variant`, and `data-full-width`; Atom also exposes relevant `data-state`, `data-drag`, `data-filled`, `data-rejected`, `data-disabled`, `data-readonly`, `data-required`, and `data-invalid` attributes.

## Customization

Prefer visual props, then semantic tokens, then the File Upload variables. Compose the public parts for content changes and use `className` or `style` for a deliberately scoped escape hatch.

```tsx
<FileUpload.Root style={{ "--brick-file-upload-border": "#7c3aed" } as React.CSSProperties}>
  {/* public parts */}
</FileUpload.Root>
```

## Responsive behavior

Root is full width by default and can opt into intrinsic width with `fullWidth={false}`. File names truncate rather than forcing page overflow; item metadata and the 44px remove action remain contained. Parts use logical geometry, so the item action visibly mirrors in RTL. Applications decide surrounding columns and preview layouts.

## Accessibility

Atom owns picker activation, drag filtering, accept and reject validation, disabled and read-only behavior, native form participation, reset, focus delegation, document file-drop protection, generated IDs, and Field relationships. Inside `Field`, the visible Trigger combines the Field label with its action text and receives description, error, required, and invalid relationships; do not add a second label. Standalone Trigger content or `aria-label` must name the action. The hidden input remains the actual native form control. Removal is named `Remove <file name>` by default. Drag and drop is supplementary; the picker is always the keyboard and assistive-technology path.

## Composition, native props, and refs

Atom-backed parts retain their supported native props, events, `className`, `style`, data attributes, `render`, and `asChild` behavior. `HiddenInput` deliberately exposes only the native file-input props Atom can safely own. A named Root submits through the hidden input and resets with its owning form. Use one `Field` for one File Upload; use `Fieldset` only when the application groups File Upload with other related controls.

## Examples

Controlled files and selection-policy feedback remain separate:

```tsx
const [files, setFiles] = useState<File[]>([]);
const [rejected, setRejected] = useState("");

<FileUpload.Root
  accept="image/*"
  files={files}
  onFilesChange={setFiles}
  onRejectedFilesChange={(items) => setRejected(items[0]?.errors.join(", ") ?? "")}
>
  <FileUpload.HiddenInput />
  <FileUpload.Dropzone><FileUpload.Trigger>Select image</FileUpload.Trigger></FileUpload.Dropzone>
  <FileUpload.ItemGroup>{/* item anatomy */}</FileUpload.ItemGroup>
  <output aria-live="polite">{rejected}</output>
</FileUpload.Root>
```

## Evidence

- [Playground source](../../../playground/src/components/file-upload/)
- [Unit tests](../../../test/components/file-upload/)
- [Type tests](../../../test/types/components/file-upload.test.ts)
- [Browser behavior](../../../playground/tests/components/file-upload/behavior.spec.ts)
- [Visual owner](../../../playground/tests/components/file-upload/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/file-upload.md)

## Changelog

See [`CHANGELOG.md`](CHANGELOG.md).

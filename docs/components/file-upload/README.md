# File Upload


## When and where to use

Use File Upload when people need to select one or more local files, see the accepted selection, remove files before submission, or use drag and drop as an alternative to the native picker.

## When not to use

Use Input for textual paths or URLs and Button for unrelated actions. File Upload supports previews, capture, directories, clipboard intake and transforms, but network transfer, retry, persistence, duplicate policy and server security remain application-owned.

## Installation and imports

```tsx
import { FileUpload } from "@flowstack-ui/brick/file-upload";
import { Field } from "@flowstack-ui/brick/field";
import "@flowstack-ui/brick/styles.css";
```

The complete stylesheet above is the recommended default. For a measured
route-aware build, replace it with the shared foundation and this component's
stylesheet:

```tsx
import "@flowstack-ui/brick/styles/core.css"; // once at the application root
import "@flowstack-ui/brick/styles/file-upload.css";
```

Add the modular stylesheet for every other Brick component the route renders.
Do not combine modular styles with `styles.css` or `tokens.css`.


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
| `ItemDeleteTrigger` | `button`, `HTMLButtonElement` | Removes its file using shared CloseButton presentation. |
| `RootProvider`, `Context` | `div` / render function | Connect an external useFileUpload controller and read selection state. |
| `ClearTrigger`, `FileText`, `Label` | `button`, `span`, `label` | Clear selection and compose readable file controls. |
| `DropzoneContent`, `ItemContent` | `div` | Group dropzone copy or file metadata. |
| `ItemPreview`, `ItemPreviewImage` | `div`, `img` | MIME-filtered preview with automatic object-URL cleanup. |
| `Items`, `List` | rows / `ul` | Ready-made accepted-file rows or complete list. |

Actions use Button/IconButton internal artwork and loading wrappers without adding another interactive element.

## API

Root adds uploader visual props; action presentation is independent:

| Prop | Values | Default |
| --- | --- | --- |
| `variant` | `outline`, `surface`, `soft` | `outline` |
| `size` | `sm`, `md`, `lg` | `md` |
| `shape` | `sharp`, `rounded` | `rounded` |
| `fullWidth` | boolean | `true` |

Root otherwise forwards Atom's `files`, `defaultFiles`, `onFilesChange`, `onRejectedFilesChange`, `accept`, `multiple`, `appendFiles`, `maxFiles`, `maxSize`, `validateFile`, `preventDocumentDrop`, `name`, `form`, `disabled`, `required`, `readOnly`, `invalid`, and `validationBehavior` contract plus supported native composition props. `Trigger` and `ItemDeleteTrigger` accept authored children; their accessible defaults remain available when children are omitted. Every part and prop type is also available as a named export.

Named exports are `FileUpload`, `FileUploadRoot`, `FileUploadHiddenInput`, `FileUploadTrigger`, `FileUploadDropzone`, `FileUploadItemGroup`, `FileUploadItem`, `FileUploadItemName`, `FileUploadItemSize`, and `FileUploadItemDeleteTrigger`. Types are `FileUploadRootProps`, `FileUploadHiddenInputProps`, `FileUploadTriggerProps`, `FileUploadDropzoneProps`, `FileUploadItemGroupProps`, `FileUploadItemProps`, `FileUploadItemNameProps`, `FileUploadItemSizeProps`, `FileUploadItemDeleteTriggerProps`, `FileUploadVariant`, `FileUploadSize`, and `FileUploadShape`.

Additional named parts are `FileUploadRootProvider`, `FileUploadContext`, `FileUploadClearTrigger`, `FileUploadFileText`, `FileUploadLabel`, `FileUploadDropzoneContent`, `FileUploadItemContent`, `FileUploadItemPreview`, `FileUploadItemPreviewImage`, `FileUploadItems`, and `FileUploadList`. Hooks are `useFileUpload`, `useFileUploadContext`, and `useFileUploadItemContext`.

Root also accepts `minSize`, structured `accept` (string, array or MIME-to-extension map), contextual `validateFile`, `onFileAccept`, `onFileReject`, `onFileChange`, `transformFiles`, `onTransformError`, `directory`, `capture`, `allowDrop`, and `translations`. Async intake is invalidated by newer selection, clear, removal, reset, disabled/readOnly or unmount. Context exposes `remainingFiles`, `maxFilesReached`, `transforming`, `transformError`, `setFilesFromList`, `setClipboardFiles`, `clearFiles`, and `clearRejectedFiles`.

Trigger and ClearTrigger support all Button sizes (including responsive values), variants, tones, icons, focus geometry and loading options. Trigger defaults to outline/neutral/lg; ClearTrigger to ghost/neutral/lg. ItemDeleteTrigger accepts CloseButton props. Compose custom Button or IconButton with `asChild` on one host; never nest buttons. Custom hosts own their presentation. Root density does not set action size.

Dropzone `disableClick` opts out of background picker activation. ItemGroup `type="rejected"` renders rejected candidates. ItemPreview `type` filters MIME types and `fallback` supplies artwork. ItemPreviewImage owns URL cleanup. ItemSize inherits LocaleProvider (or explicit `locale`). FileText `fallback` replaces empty text. List/Items `showSize` and `clearable` default true.

Rejected-file feedback does not automatically mark the Field invalid. Use `onRejectedFilesChange` for selection-policy feedback and use `invalid` or form validation for the Field's validity state.

### Shared radius selection

The parts listed for this component in the [Radius guide](../../guides/radius.md)
accept the shared token-only `Radius` contract. Omission preserves the owner’s
normal corners. Core sizes and semantic roles are distinct; arbitrary lengths
and responsive objects are not accepted. Where a legacy corner `shape` exists,
choose either it or `radius`, not both. This does not change behavior, sizing,
or the independently owned corners of other parts.

## Visual recipes and states

Disabled presentation preserves the selected recipe and fades once to 50%, with a not-allowed cursor on the disabled hit target. Keep read-only separate; do not add an opacity wrapper around an already disabled control. Forced colors uses system disabled colors.

Use outline for a transparent resting dropzone, surface for a neutral raised fill, and soft for a subdued surface. Dropzones show hover/drop feedback. Actions independently use shared Button and CloseButton recipes.


File Upload is Brick's styled file picker, drop target, and removable selected-file list, backed directly by Atom. It works alone or as the sole control in one `Field`; file transfer, upload progress, persistence, and server policy remain application concerns.

`outline` uses a dashed transparent dropzone; `soft` uses a quiet filled surface and solid border. Size changes uploader density and type scale. Shape/radius changes dropzone and items; action geometry is independent. Atom state attributes drive empty, filled, dragging, accepted, rejected, disabled, read-only, required, invalid and transforming states.

## Tokens and CSS hooks

Stable classes are `.brick-file-upload`, `.brick-file-upload__dropzone`, `__items`, `__item`, `__item-name`, `__item-size`, `__item-content`, `__dropzone-content`, `__preview`, and `__preview-image`. Actions use shared Button/CloseButton classes; existing file-upload data slots remain available.

Public variables are `--brick-file-upload-gap`, `--brick-file-upload-dropzone-min-block-size`, `--brick-file-upload-dropzone-padding`, `--brick-file-upload-radius`, `--brick-file-upload-background`, `--brick-file-upload-border`, `--brick-file-upload-foreground`, `--brick-file-upload-muted-foreground`, `--brick-file-upload-hover-background`, `--brick-file-upload-accept-border`, `--brick-file-upload-reject-border`, `--brick-file-upload-item-background`, and `--brick-file-upload-item-border`. Former uploader-specific trigger/delete paint variables are replaced by Button props and tokens.

Root exposes `data-slot`, `data-size`, `data-shape`, `data-variant`, and `data-full-width`; Atom also exposes relevant `data-state`, `data-drag`, `data-filled`, `data-rejected`, `data-disabled`, `data-readonly`, `data-required`, and `data-invalid` attributes.

## Customization

Prefer visual props, then semantic tokens, then the File Upload variables. Compose the public parts for content changes and use `className` or `style` for a deliberately scoped escape hatch.

```tsx
<FileUpload.Root style={{ "--brick-file-upload-border": "#7c3aed" } as React.CSSProperties}>
  {/* public parts */}
</FileUpload.Root>
```

## Responsive behavior

For a filename control beside Clear, use `Stack.Item flex={1}` around the
full-width trigger and `Stack.Item flex="fixed"` around Clear. Stretch the row
within Root so the filename consumes remaining space without squeezing Clear.
`Dropzone disableClick` removes background picker activation and clickable hover
paint; file-drag feedback and the nested Trigger remain available.

Root is full width by default and can opt into intrinsic width with `fullWidth={false}`. Actions remain intrinsic unless explicitly full width. File names truncate rather than forcing page overflow; action sizes follow Button/CloseButton. Parts use logical geometry and mirror in RTL. Applications decide surrounding columns and preview layouts.

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

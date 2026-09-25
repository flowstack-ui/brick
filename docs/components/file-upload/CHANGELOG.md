# File Upload changelog


## Unreleased

Disabled presentation preserves the selected recipe and fades once to 50%, with a not-allowed cursor on the disabled hit target. Keep read-only separate; do not add an opacity wrapper around an already disabled control. Forced colors uses system disabled colors.


File Upload follows the package version of `@flowstack-ui/brick`.

- Suppress clickable hover paint when Dropzone has disableClick; retain file-drag feedback and independent browse actions. Keep the file-text example's Clear action at intrinsic width.

- Use shared Button and CloseButton presentation for upload actions, including responsive sizes, tones, variants, icons and loading; custom hosts compose without competing uploader paint.
- Add controller/provider, clear action, file text, label, previews, metadata groups and ready-made file lists.
- Support minimum size, structured acceptance/validation, async transforms, directories, capture, clipboard intake, capacity feedback and localized file-size formatting through Atom.
- Replace uploader-specific action paint variables with Button customization. Root density and radius no longer override action geometry.

- Add surface as a neutral filled-and-bordered alternative with unchanged geometry; preserve outline defaults.
- Keep outline transparent at rest, independently of popup paint.

- Add shared token-only radius selection to the boundary parts documented in the Radius guide; preserve omitted defaults and independent internal geometry.

## 0.1.10

### Added

- Added public FileUpload Agent Knowledge covering local-selection boundaries,
  accessible picker and drop composition, client/server validation ownership,
  file state and form behavior, item semantics, responsive paint, and testing.
- Added the nine-part Atom-backed File Upload with picker and dropzone input, accepted-file items, removal, native form and Field integration, two variants, three sizes, two shapes, responsive RTL layout, forced-colors support, and public CSS customization hooks.

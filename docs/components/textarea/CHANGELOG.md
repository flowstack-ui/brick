# Textarea changelog


## Unreleased

Disabled presentation preserves the selected recipe and fades once to 50%, with a not-allowed cursor on the disabled hit target. Keep read-only separate; do not add an opacity wrapper around an already disabled control. Forced colors uses system disabled colors.


Textarea follows the package version of `@flowstack-ui/brick`.

### Added

- Clarified ref, radius, required Field, helper-text and error-text composition, value ownership and resize guidance.
- Added subtle, ghost, and plain recipes plus responsive variant selection across the shared field breakpoints.
- Added current documentation examples for manual and bounded auto-resize, native forms, and optional React Hook Form registration.

### Changed

- Manual resize now changes the complete visual boundary so Count and editable content remain attached.
- Underline now uses zero horizontal inset and bottom-only focus, with complete geometry restoration when responsive variants change.
- Hover, focus, invalid, disabled, and read-only precedence now matches the current shared field family.

### Fixed

- Place the browser-native resize handle at the outer field corner instead of inside its padding and above Count. The editor grows while the counter footer retains its height and handle clearance.
- Apply local direction to the wrapper and preserve disabled/read-only resize treatment.

- Consume Atom's corrected constraint-preserving auto-resize lifecycle without a Brick measurement workaround.

- Add surface as a neutral filled-and-bordered alternative with unchanged geometry; preserve outline defaults.
- Keep outline transparent at rest and on hover, independently of popup paint.

- Add shared token-only radius selection to the boundary parts documented in the Radius guide; preserve omitted defaults and independent internal geometry.

### Changed

- Expanded Textarea to the responsive shared 2xs–2xl control-size scale and
  made `lg` the default while preserving multiline intrinsic height.

### Fixed

- Aligned the outline recipe with Input by using a transparent rest and hover
  surface while retaining the complete border and state treatments.

### Added

- Initial Atom-backed `Textarea.Root` and `Textarea.Count` compound component.
- Outline, soft, and underline variants; small, medium, and large sizes; sharp
  and rounded shapes; full-width behavior; manual resize directions; and
  bounded Atom-powered auto-resize.
- Native textarea, Field, validation, reset, external-form, controlled value,
  character-count, RTL, forced-color, reduced-motion, and customization
  contracts.

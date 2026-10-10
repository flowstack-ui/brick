# Bottom Navigation changelog

Bottom Navigation follows the package version of `@flowstack-ui/brick`.

## Unreleased

### Fixed

- Keep floating absolute and fixed bars centered in both LTR and RTL layouts.
- Kept authored blur CSS standards-first and moved the required WebKit prefix
  to the package's target-driven CSS build without changing the fallback.
- Fixed every size to a stable base height across viewport widths, destination counts, label-visibility policies, and mobile browser-chrome changes. Positioned recipes now use only stable maximum safe-area insets, small bars no longer clip labels, and Notification Badge anchors to the glyph without shifting the Icon/Label column.

### Added

- Add responsive size/arrangement, root and selection radius, named elevation,
  independent selection styles and an opaque `surface` variant.

### Changed

- Make `outline` transparent; use `surface` for the previous opaque appearance.
- Share elevation/focus roles and keep blur's reduced-transparency fallback opaque.
- Preserve native landmark names and composed native button/link semantics.
- Keep current-document selection unchanged for modified, download and new-tab links.

- Added public Agent Knowledge for component selection, composition,
  CSS-delivery, recurring mistakes, and validation.

- Added the complete four-part Bottom Navigation family with native destination and controlled-view models; four surface variants; accent and neutral tones; full and floating layouts; equal and centered arrangements; three sizes; four position intents; indicator and item selection shapes; three accessible label policies; safe-area handling; elevation; blur; and composition.

## Unreleased — surface effects

- Add independent treatment, background alpha, named/exact backdrop blur, saturation and structural border controls on the painted root.
- Preserve ordinary defaults and existing blurred usage; add scoped input isolation and filter/preference fallbacks.

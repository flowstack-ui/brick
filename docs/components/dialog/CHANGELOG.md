# Dialog changelog

Dialog follows the package version of `@flowstack-ui/brick`.

## Unreleased

### Added

- Added `Dialog.Close placement="corner"` for a reusable, logical top-end
  dismiss-control inset while preserving inline Close actions by default.

## 0.1.10

### Fixed

- Inherited Atom's document-only scroll lock so sticky application chrome
  remains anchored while Dialog is open at a nonzero page offset.

- Title typography now uses the shared overlay-title recipe and its normalized
  tracking.

### Added

- Added public Agent Knowledge for selecting, composing, styling, and
  validating Dialog, including exact installed Atom Dialog and Modal
  behavioral references.
- Added logical Footer `justify` values for start, center, end, and
  space-between action distribution; end remains the default.
- Initial modal-only twelve-part `Dialog` compound namespace with Root, Trigger, Portal,
  Overlay, Content, Header, Title, Description, Body, Footer, Close, and Branch.
- Small, medium, and large centered surfaces with safe-area-aware dynamic
  viewport bounds and a dedicated scrollable Body.
- Public classes, slots, five component tokens, reduced-motion and
  forced-colors treatment, scoped-portal guidance, and direct subpath exports.
- Disabled triggers, configurable overlay dismissal, render composition,
  custom portal containers, heading-level forwarding, nested modal ownership,
  and Branch support.

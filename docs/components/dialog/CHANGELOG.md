# Dialog changelog

Dialog follows the package version of `@flowstack-ui/brick`.

## Unreleased

### Fixed

- Inherited Atom's document-only scroll lock so sticky application chrome
  remains anchored while Dialog is open at a nonzero page offset.

- Title typography now uses the shared overlay-title recipe and its normalized
  tracking.

### Added

- Initial modal-only twelve-part `Dialog` compound namespace with Root, Trigger, Portal,
  Overlay, Content, Header, Title, Description, Body, Footer, Close, and Branch.
- Small, medium, and large centered surfaces with safe-area-aware dynamic
  viewport bounds and a dedicated scrollable Body.
- Public classes, slots, five component tokens, reduced-motion and
  forced-colors treatment, scoped-portal guidance, and direct subpath exports.
- Disabled triggers, configurable overlay dismissal, render composition,
  custom portal containers, heading-level forwarding, nested modal ownership,
  and Branch support.

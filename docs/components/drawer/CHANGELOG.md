# Drawer changelog

Drawer follows the package version of `@flowstack-ui/brick`.

## Unreleased

### Fixed

- Top and bottom Drawers now grow naturally with their content until the
  selected size cap; Body scroll begins only after that cap is reached.
- Drawer Content now accepts an inherited `--brick-drawer-background` theme
  value while retaining `--brick-color-surface-overlay` as its default.
- Drawer radius now accepts an inherited `--brick-drawer-radius` theme value
  instead of redeclaring and shadowing it on every Content instance; the
  default still falls back to `--brick-radius-overlay`.
- Inherited Atom's document-only scroll lock so sticky application chrome
  remains anchored while Drawer is open at a nonzero page offset.

### Added

- Added logical Footer `justify` values for start, center, end, and
  space-between action distribution; end remains the default.
- Added the `xl` size: an almost-full side width and a content-responsive
  top/bottom cap that may reach the viewport without forcing short content to
  fill it.
- Added short named part exports on the `drawer` subpath so
  `import * as Drawer` preserves compound syntax from a React Server Component
  without promoting the containing page to a Client Component.

- Added public Agent Knowledge for component selection, composition,
  CSS-delivery, recurring mistakes, and validation.

- Initial modal-only twelve-part Drawer namespace with Root, Trigger, Portal,
  Overlay, Content, Header, Title, Description, Body, Footer, Close, and Branch.
- Logical start/end/top/bottom placement and small, medium, large, and full
  sizes with distinct mobile viewport caps.
- Safe-area-aware edge surfaces, bounded Body scrolling, reduced-motion and
  forced-colors treatment, direct subpath exports, and public CSS hooks.
- Nested and Branch ownership, scoped portals, heading-level forwarding,
  configurable dismissal, and logical RTL placement.

### Fixed

- Title typography now uses the shared overlay-title recipe and its normalized
  tracking.
- Modal scroll locking no longer repositions the page or restores an obsolete
  scroll position during mobile browser toolbar changes.

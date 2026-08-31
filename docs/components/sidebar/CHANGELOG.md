# Sidebar changelog

Sidebar follows the package version of `@flowstack-ui/brick`.

## Unreleased

### Fixed

- Kept the physical left/right panel track and its inner divider on the
  requested side when the containing document uses RTL direction.

### Changed

- Documented that Sidebar.Content is a flexible region rather than an
  automatic scroll owner, with Scroll Area composition for bounded long panel
  content.

### Added

- Added `surface="transparent|base|raised"` so panel paint is independent from
  docked/floating geometry and can intentionally inherit an ancestor Surface.

- Added public Agent Knowledge for component selection, composition,
  CSS-delivery, recurring mistakes, and validation.

- Added the Atom-backed seven-part Sidebar with expanded, rail, and offcanvas
  states, docked/floating surfaces, closed sizes, static/sticky positioning,
  logical sides, public CSS variables, and explicit Drawer/Nav List boundaries.

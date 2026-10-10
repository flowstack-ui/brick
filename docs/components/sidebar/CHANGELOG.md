# Sidebar changelog

## Unreleased

- Prevent reopening height flicker by settling panel geometry before fading in.
- Let composed action recipes override the minimal trigger presentation.

- Fix direct-trigger layout and floating offcanvas gap; add border control and expose rail context; preserve region child handlers and ref cleanup.
- Add modular documentation examples and part-scoped props while retaining qualification scenarios.

Sidebar follows the package version of `@flowstack-ui/brick`.

## Unreleased

- Add default/none inset to Header, Content and Footer without changing defaults.
- Preserve the supplied region host's children with asChild rather than nesting
  a duplicate host.

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

# App Bar changelog

App Bar follows the package version of `@flowstack-ui/brick`.

## Unreleased

### Fixed

- Kept authored blur CSS standards-first and moved the required WebKit prefix
  to the package's target-driven CSS build without changing the fallback.

### Changed

- Clarified that Root defaults to a semantic `header`, that non-banner chrome
  should deliberately compose another host, and that Container belongs between
  a full-bleed Root and bounded Toolbar content.

### Added

- Added public comfortable and compact Toolbar minimum block-size recipe
  tokens for application-owned viewport and shell calculations without
  duplicating Brick's density values.
- Added public Agent Knowledge for component selection, composition,
  CSS-delivery, recurring mistakes, and validation.

- Initial `Root`, `Toolbar`, `Start`, `Center`, and `End` compound API.
- Static, absolute, sticky, and fixed positioning with compact and comfortable
  toolbar densities.
- Solid, surface, and transparent variants with neutral and accent tones,
  optional border, elevation, and blur.
- Logical RTL layout, geometric center alignment, public customization tokens,
  forced-colors support, and server-safe rendering.

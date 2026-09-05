# Card changelog

Card follows the package version of `@flowstack-ui/brick`.

## Unreleased

### Changed

- Assigned border ownership to Card variants: outline remains bordered while
  elevated and subtle are borderless by default. Elevated now uses the raised
  panel surface and a layered medium elevation token.
- Clarified that `Card.Action` reserves the trailing Header column across title
  and description rows, and documented `HStack` composition for title-only
  metadata that must not narrow the description.

### Added

- Added optional `bordered={false}` so edge-to-edge media can retain Card's
  selected background, elevation, radius, and clipping without a border seam.
- Initial `Card.Root`, `Card.Header`, `Card.Title`, `Card.Description`,
  `Card.Action`, `Card.Content`, and `Card.Footer` compound API.
- Outline, elevated, and subtle variants with small, medium, and large sizes.
- Restricted semantic Root elements and `h1` through `h6` Title levels.
- Static server-compatible output with native props, refs, classes, styles,
  and overridable slots on every public part.
- Public Card spacing, radius, and shadow tokens plus mobile-first, RTL,
  forced-colors, media-composition, and long-content styling.

### Fixed

- Aligned the default outline recipe with its adopted base-surface contract so
  outlined Cards remain visibly grouped from the ambient canvas in light and
  dark appearances without elevation.
- Title typography now uses the shared surface-title recipes and their
  normalized tracking.

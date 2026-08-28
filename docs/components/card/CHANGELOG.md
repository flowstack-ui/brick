# Card changelog

Card follows the package version of `@flowstack-ui/brick`.

## Unreleased

### Changed

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

- Title typography now uses the shared surface-title recipes and their
  normalized tracking.
- Elevated Cards use a subtle raised-surface difference so their hierarchy
  remains visible in dark appearance without depending on shadow alone.

# Card changelog

Card follows the package version of `@flowstack-ui/brick`.

## Unreleased

### Added

- Initial `Card.Root`, `Card.Header`, `Card.Title`, `Card.Description`,
  `Card.Action`, `Card.Content`, and `Card.Footer` compound API.
- Outline, elevated, and subtle variants with small, medium, and large sizes.
- Restricted semantic Root elements and `h1` through `h6` Title levels.
- Static server-compatible output with native props, refs, classes, styles,
  and overridable slots on every public part.
- Public Card spacing, radius, and shadow tokens plus mobile-first, RTL,
  forced-colors, media-composition, and long-content styling.

### Fixed

- Elevated Cards use a subtle raised-surface difference so their hierarchy
  remains visible in dark appearance without depending on shadow alone.

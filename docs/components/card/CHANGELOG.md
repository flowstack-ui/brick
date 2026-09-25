# Card changelog

## Unreleased

- Use the supported `Title as="h2"` in the basic documentation example to preserve the page's heading hierarchy.

- Add responsive size/variant recipes, part composition, region gap and Footer justification.
- Correct explicit borders on subtle cards and primary text inheritance.
- Refine Header spacing and Content column layout; document paired paint and title hooks.
- Expand focused documentation examples and qualification for recipe resets and composition.

Card follows the package version of `@flowstack-ui/brick`.

## Unreleased

- Add Root asChild and overflow, complete Content padding and growth, and coordinated size progression.

- Add presentation-only selected state and semantic actionable hover for record
  composition with public useSelection and ActionDelegate; preserve native
  semantics, independent controls and existing static defaults.

- Add shared token-only radius selection to the boundary parts documented in the Radius guide; preserve omitted defaults and independent internal geometry.

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

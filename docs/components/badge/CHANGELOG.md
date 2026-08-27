# Badge changelog

Badge follows the package version of `@flowstack-ui/brick`.

## Unreleased

### Added

- Added `size="xl"` for deliberate passive icon wells used by empty states and
  similar noninteractive illustrations.

- Added `shape="circle"` for exact-square passive icon or single-character
  markers with nearby context.

- Added public Agent Knowledge covering passive selection, inherited Text
  foreground, composed child spacing, CSS delivery, and validation.

- Initial direct Badge component built on the public server-safe Atom Badge
  subpath.
- Three Badge variants, six tones, three sizes, rounded/pill shapes, passive
  tag routing, and native Atom composition.
- Root and subpath exports, static CSS, server-safe rendering, native props and
  refs, and public visual state hooks.

### Fixed

- Kept short status and category labels on one line so compact Badge content
  remains atomic in tables, cards, and metadata rows.
- Neutral solid Badges now use a strong theme-derived neutral surface and
  normal foreground instead of the inverse black/white pair.
- Added a themeable default gap between composed Badge children such as an
  icon and visible label.
- Solid danger Badges now retain WCAG AA foreground contrast in light and dark
  appearances.

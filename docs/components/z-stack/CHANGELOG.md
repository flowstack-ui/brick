# ZStack changelog

ZStack follows the package version of `@flowstack-ui/brick`.

## Unreleased

### Fixed

- Preserve authored paint order when an earlier layer, such as a ratio-based
  Image, establishes positioned painting before a later overlay.

### Added

- Added responsive Root and Item logical alignment through Brick's canonical
  responsive-value grammar without adding coordinates or visual ordering.
- Added ZStack.Root and ZStack.Item with CSS Grid overlap, natural sizing, nine-position alignment, semantic hosts, and optional asChild composition.

# Tabs changelog

Tabs follows the package version of `@flowstack-ui/brick`.

## Unreleased

### Changed

- Limited the measured Indicator to the line variant. Solid, soft, and
  enclosed now rely on their server-stable active Trigger paint even when an
  Indicator is present, preventing a late underline during hydration.

### Added

- Added the complete five-part Tabs API with four variants, three sizes,
  full-width and orientation-aware layout, and Atom-owned interaction.

# Tabs changelog

Tabs follows the package version of `@flowstack-ui/brick`.

## Unreleased

### Fixed

- Kept line-tab labels and icons on primary text in the selected state so the
  accent remains reserved for the indicator and authored metadata such as a
  Badge.
- Applied `Tabs.List triggerRadius="none"` consistently to line and enclosed
  Triggers as well as solid and soft recipes.
- Reserved the complete focus-ring reach inside solid and soft Lists so edge
  Triggers remain fully visible inside clipped Cards and Surfaces.

### Changed

- Limited the measured Indicator to the line variant. Solid, soft, and
  enclosed now rely on their server-stable active Trigger paint even when an
  Indicator is present, preventing a late underline during hydration.

### Added

- Added an independent `Tabs.List triggerRadius="default|none"` override so a
  square nested List can retain rounded Trigger surfaces without CSS.
- Added `Tabs.List radius="default|none"` so nested solid and soft selectors
  can remove inner List and Trigger corners without CSS overrides.
- Added responsive `Tabs.List columns={1|2|3|4}` for equal visual selector
  tracks without changing Atom orientation, order, keyboard behavior, or ARIA.
- Added `Tabs.Content inset="none|sm|md|lg"` so edge-to-edge panels can use a
  supported recipe while omission preserves the existing size-derived inset.
- Added responsive `layout="auto|stacked|side"` so vertical semantics can
  retain their keyboard contract while List and Content adapt visually.

- Added public Agent Knowledge for component selection, composition,
  CSS-delivery, recurring mistakes, and validation.

- Added the complete five-part Tabs API with four variants, three sizes,
  full-width and orientation-aware layout, and Atom-owned interaction.

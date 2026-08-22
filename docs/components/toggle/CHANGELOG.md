# Toggle changelog

Toggle follows the package version of `@flowstack-ui/brick`.

## Unreleased

### Added

- Added `accent` and `neutral` selected-state tones without introducing
  semantic status tones.
- Initial direct Toggle API with solid, soft, outline, and ghost variants.
- Small, medium, and large sizes; rounded and pill shapes; icon-only geometry;
  and selected, disabled, forced-colors, and reduced-motion presentation.

### Fixed

- Disabled Toggles now use a more faded foreground and quiet selected surface
  without retaining enabled outline or inset emphasis.
- Neutral solid Toggle selection now uses a strong theme-derived neutral
  surface and normal foreground instead of the inverse black/white pair.
- Selected solid, soft, outline, and ghost recipes now remain visually
  distinguishable.

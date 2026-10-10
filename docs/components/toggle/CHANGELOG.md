# Toggle changelog

## Unreleased

- Restore the shared single 50% disabled fade without changing geometry or
  selected-state semantics; retain opaque system colors in forced-colors mode.

Normalize wrapped Icon artwork to the owning slot, matching raw SVG geometry
without compensating Icon size props. Add an owner browser regression.

- Share Button sizing, including seven responsive sizes, contrast tone, subtle/surface/plain variants and inside focus rings.

Toggle follows the package version of `@flowstack-ui/brick`.


- Change defaults to neutral ghost for quiet toolbar commands. Remove the soft
  selected bottom shadow; strengthen neutral interaction states consistently in
  both appearances and preserve active/disabled/forced-color precedence.
- Add shared token-only radius selection to the boundary parts documented in the Radius guide; preserve omitted defaults and independent internal geometry.

## 0.1.10

### Added

- Expanded public Agent Knowledge for persistent-command selection, stable
  naming, controlled pressed state, composition, and the exact installed Atom
  Toggle reference.
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

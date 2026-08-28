# Toggle Group changelog

Toggle Group follows the package version of `@flowstack-ui/brick`.

## Unreleased

### Added

- Added shared `accent` and `neutral` selected-state tones on Root.
- Initial single- and multiple-selection `Root` and `Item` compound API.
- Separated, wrapping, attached, full-width, horizontal, and vertical layouts
  with shared Toggle recipes and logical RTL geometry.

### Fixed

- Outline selection now uses the true accent border while keeping its label on
  the normal primary foreground instead of tinting the text.

- Disabled Items now use a more faded foreground and quiet selected surface
  without retaining enabled outline or inset emphasis.
- Neutral solid selected Items now use a strong theme-derived neutral surface
  and normal foreground instead of the inverse black/white pair.
- Root variants now cascade consistently so selected solid Items use solid
  accent paint and soft, outline, and ghost Items retain distinct recipes.

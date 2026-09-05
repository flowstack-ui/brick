# Segment Group changelog

Segment Group follows the package version of `@flowstack-ui/brick`.

## Unreleased

### Fixed

- Matched compact segmented-control rhythm with regular-weight labels,
  component-owned inline padding and gaps, a borderless dark-semantic
  indicator shadow, and dividers that disappear beside the selected item.
- Balanced the selected indicator elevation with a lighter downward shadow
  and a fine neutral perimeter shadow instead of a bottom-heavy shadow plus
  inset light edge.
- Restored the unselected rail to the subtle surface, promoted the selected
  segment to the base surface in light appearance and the raised surface in
  dark appearance, and kept short inset default-boundary separator rules
  between adjacent options without boxing their complete edges.
- Full-width icon-only groups now keep the Root's selected control height
  instead of making every flexible item square.

### Added

- Added the `2xs` 28px compact recipe so dense Segment Groups continue to
  align with the normalized shared control-size ladder.
- Added the `xs` compact application-control size for dense property and
  editor panels without changing the default medium recipe.

## 0.2.1 - 2026-08-31

### Fixed

- Kept the measured Indicator on the selected physical item in RTL instead of
  applying its left-coordinate offset from the logical end edge.

- Added the `ItemText` containment recipe for long labels so they wrap within
  their measured segment instead of overlapping adjacent choices at narrow
  widths and high zoom.
- Let the selected Indicator occupy and align to the complete segmented item
  area, including the Root border offset, and keep icon-only content visually
  centered without shifting the selected Item.
- Apply the documented Segment Group icon-size recipe to a composed Brick Icon
  as well as direct SVG and image artwork.
- Keep the Root on the exact shared control size with an inset boundary, and
  refine the selected Indicator to a quieter border and shallower elevation.

### Added

- Added the Atom Radio Group-backed Root, Item, ItemText, and moving Indicator
  with three shared sizes, full-width distribution, icon-only geometry,
  light/dark and forced-color paint, reduced motion, and stable hooks.

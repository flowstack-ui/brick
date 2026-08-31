# Segment Group changelog

Segment Group follows the package version of `@flowstack-ui/brick`.

## Unreleased

### Fixed

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

# Stack changelog

Stack follows the package version of `@flowstack-ui/brick`.

## Unreleased

### Changed

- Expanded gap and logical edge spacing to accept numeric base-unit factors,
  explicit CSS values, and responsive mixtures while preserving existing
  string-token geometry.
- Preserved the public zero-through-six string scale as compatibility aliases
  while removing the silent no-recipe failure for larger numeric values.

### Fixed

- Normalized native margin and markers for supported `ul` and `ol` Stack
  hosts so semantic one-dimensional lists retain Stack alignment without
  consumer reset CSS.

### Added

- Added responsive direction, gap, alignment, distribution, wrapping, and
  logical edge spacing at the canonical Brick breakpoints.
- Added Stack.Item with content, fixed, auto, and proportional flex recipes,
  self-alignment, semantic hosts, and optional asChild composition.

- Initial Stack, HStack, and VStack API from one shared implementation.
- Column and row directions, tokenized gaps zero through six, cross-axis
  alignment, main-axis distribution, and opt-in wrapping.
- Controlled semantic hosts, native attributes, an `HTMLElement` ref, stable
  class/slot/recipe metadata, a public gap variable, RTL, forced-colors,
  localization, and narrow-layout support.

# Group changelog

## Unreleased

- Add responsive grouping layout, alignment, wrapping, stacking, skipped children and asChild composition; preserve child-owned paint and focus visibility.

Group follows the package version of `@flowstack-ui/brick`.

### Changed

- Clarified that Group is not a generic wrapper for tags, skills, social
  destinations, profile facts, or responsive actions.
- Clarified that Group's `slot` prop overrides the public `data-slot` hook and
  does not claim to forward the native HTML slot attribute.

### Added

- Added a generic inline layout Group with horizontal and vertical
  orientation, tokenized gaps, optional equal growth, attached logical
  corners, border overlap, local hover/focus stacking, RTL-safe geometry, and
  no implicit semantics or keyboard behavior.
- Added public Agent Knowledge and usage guidance for selecting Group against
  Stack, Toolbar, ToggleGroup, and native semantic grouping.

# Fieldset changelog

Fieldset follows the package version of `@flowstack-ui/brick`.

## Unreleased

### Fixed

- Legend now matches Field Label's default family, size, weight, line height,
  and initial content gap while preserving Fieldset's larger internal group
  spacing.
- Error separation now remains intact when a consumer reset removes paragraph
  margins; the logical error rule begins beside the message rather than inside
  the reserved gap.

### Added

- Initial complete `Fieldset.Root`, `Legend`, `Description`, and `Error`
  namespace and direct exports.
- Native group and disabled semantics, generated server/hydration naming and
  descriptions, invalid/required state, conditional errors, native props and
  refs, and strict `asChild` or `render` composition.
- Finished group rhythm plus RTL, constrained-width, zoom, appearance, and
  forced-color support.
- Stable classes, slots, state attributes, and anatomy token contract.
- Checkbox Group validation propagates through Fieldset without treating focus
  movement between Items as group blur.
- Inline validation with `Fieldset.Error` aggregates group invalid state,
  focuses the first visible control, clears after correction or reset, and
  permits an explicit native-validation override.

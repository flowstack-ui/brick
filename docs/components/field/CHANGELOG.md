# Field changelog

Field follows the package version of `@flowstack-ui/brick`.

## Unreleased

### Added

- Initial complete `Field.Root`, `Label`, `Description`, `Error`, and
  `RequiredIndicator` namespace and direct exports.
- Generated server/hydration relationships, complete state inheritance,
  conditional errors/indicators, native props and refs, and strict `asChild`
  or `render` composition.
- Finished vertical and intrinsic horizontal layouts with responsive reflow,
  RTL, constrained-width, zoom, appearance, and forced-color support.
- Stable classes, slots, state attributes, and anatomy token contract.

### Fixed

- Checkbox validation now propagates through Field after interaction.
- Inline validation with `Field.Error` now aggregates native invalid state,
  focuses the visible control, clears after correction or reset, and permits
  an explicit native-validation override.

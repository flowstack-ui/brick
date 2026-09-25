# Field changelog


## Unreleased

Disabled labels and legends fade to 50%; the structural container does not fade. Descendant controls own their disabled treatment so Fieldset inheritance never compounds opacity.

Field follows the package version of `@flowstack-ui/brick`.

### Added

- Added `size="xs|sm|md"` and `tone="primary|secondary"` for coherent dense
  property-form labels without consumer CSS.

- Initial complete `Field.Root`, `Label`, `Description`, `Error`, and
  `RequiredIndicator` namespace and direct exports.
- Generated server/hydration relationships, complete state inheritance,
  conditional errors/indicators, native props and refs, and strict `asChild`
  or `render` composition.
- Finished vertical and intrinsic horizontal layouts with responsive reflow,
  RTL, constrained-width, zoom, appearance, and forced-color support.
- Stable classes, slots, state attributes, and anatomy token contract.

### Fixed

- Corrected the quick start to rely on Label's automatic required marker
  instead of rendering a duplicate standalone RequiredIndicator.
- Checkbox validation now propagates through Field after interaction.
- Inline validation with `Field.Error` now aggregates native invalid state,
  focuses the visible control, clears after correction or reset, and permits
  an explicit native-validation override.
## Unreleased

- Add compound Item targeting, explicit IDs, context access, ErrorIcon and responsive presentation; simplify state styling.

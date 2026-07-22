# Fieldset changelog

Fieldset follows the package version of `@flowstack-ui/brick`.

## Unreleased

### Added

- Adopted Atom 0.6.13 automatic inline validation presentation when
  `Fieldset.Error` is present, including group-invalid aggregation, first
  visible control focus, correction/reset clearing, and explicit native
  override.
- Initial complete `Fieldset.Root`, `Legend`, `Description`, and `Error`
  namespace and direct exports.
- Native group and disabled semantics, generated server/hydration naming and
  descriptions, invalid/required state, conditional errors, native props and
  refs, and strict `asChild` or `render` composition through Atom 0.5.3.
- Finished group rhythm plus RTL, constrained-width, zoom, appearance, and
  forced-color support.
- Stable classes, slots, state attributes, and anatomy token contract.

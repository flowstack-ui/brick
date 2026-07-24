# Form changelog

Form follows the package version of `@flowstack-ui/brick`.

## Unreleased

### Added

- Aligned the Form-provided Fieldset first-content gap with the default Field
  label-to-control rhythm.
- Initial direct `Form` API with root and component-subpath exports.
- Native URL, function-action, callback, reset, validation, external-control,
  native-prop, ref, `asChild`, and `render` support.
- Stable submitting, submitted, and invalid state hooks without an imposed
  Form-wide outline; applications own explicit inline or Toast feedback.
- Stable class, slot, state attributes, spacing tokens, appearance support,
  and constrained-layout behavior.

### Fixed

- Checkbox-family invalid state now aggregates and clears on reset.
- `validationBehavior` now inherits to compatible Fields and Fieldsets;
  authored errors select inline validation while an explicit native
  presentation remains available.

# Form changelog

Form follows the package version of `@flowstack-ui/brick`.

## Unreleased

### Added

- Aligned the Form-provided Fieldset first-content gap with the default Field
  label-to-control rhythm.
- Adopted Atom 0.6.14 touched Checkbox-family invalid aggregation and reset
  clearing.
- Adopted Atom 0.6.13 `validationBehavior` inheritance and aggregated native
  invalid state. Compatible Field and Fieldset errors select inline validation
  automatically while explicit `native` presentation remains available.
- Initial direct `Form` API with root and component-subpath exports.
- Native URL, function-action, callback, reset, validation, external-control,
  native-prop, ref, `asChild`, and `render` support through Atom 0.5.3.
- Stable submitting, submitted, and invalid state hooks without an imposed
  Form-wide outline; applications own explicit inline or Toast feedback.
- Stable class, slot, state attributes, spacing tokens, appearance support,
  constrained-layout coverage, and independent Consumer proof.

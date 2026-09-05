# Input changelog

Input follows the package version of `@flowstack-ui/brick`.

## Unreleased

### Changed

- Clear actions now inherit their generic accessible label from
  `LocaleProvider` when `clearLabel` is omitted.
- Expanded Input to the responsive shared 2xs–2xl control-size scale and made
  the 44px `lg` recipe the default.

### Fixed

- Use an explicit system-color outline for focused controls in forced-colors
  mode so Input and Textarea expose the same unclipped focus affordance.

### Added

- Initial Input API with outline, soft, and underline recipes; small, medium,
  and large sizes; sharp, rounded, and pill geometry; and full-width or
  intrinsic layout.
- Logical start/end adornments and an optional localized Atom-powered clear
  action.
- Native text-like types, controlled and uncontrolled values, Field
  relationships, validation, reset, external form ownership, native props,
  and an `HTMLInputElement` ref.
- Stable wrapper/control/adornment/Clear classes and slots, public Input
  variables, dark appearance, forced colors, reduced motion, RTL, and narrow
  layout support.
- Public font-weight and letter-spacing variables backed by the shared
  field-value typography recipes.

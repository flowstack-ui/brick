# Input changelog


## Unreleased

- Prevent legacy scalar size rules from overriding shared responsive sizing when composing Input with InputAddon.

Normalize wrapped Icon artwork to the owning slot, matching raw SVG geometry
without compensating Icon size props. Add an owner browser regression.


Input follows the package version of `@flowstack-ui/brick`.

Disabled presentation preserves the selected recipe and fades once to 50%, with a not-allowed cursor on the disabled hit target. Keep read-only separate; do not add an opacity wrapper around an already disabled control. Forced colors uses system disabled colors.

- Add surface as a neutral filled-and-bordered alternative with unchanged geometry; preserve outline defaults.
- Keep outline transparent at rest and on hover, independently of popup paint.

- Add shared token-only radius selection to the boundary parts documented in the Radius guide; preserve omitted defaults and independent internal geometry.

### Changed

- Clear actions now inherit their generic accessible label from
  `LocaleProvider` when `clearLabel` is omitted.
- Expanded Input to the responsive shared 2xs–2xl control-size scale and made
  the 44px `lg` recipe the default.

### Fixed

- Scope the input boundary focus treatment to its native text control, so an
  independently focused select or button adornment does not display two rings.

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

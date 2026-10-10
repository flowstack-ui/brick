# Number Input changelog


## Unreleased

- Keep forced-colors focus visible for underline fields at the widest responsive breakpoint; match the other breakpoint selectors instead of overriding the system outline.

Disabled presentation preserves the selected recipe and fades once to 50%, with a not-allowed cursor on the disabled hit target. Keep read-only separate; do not add an opacity wrapper around an already disabled control. Forced colors uses system disabled colors.



Number Input follows the package version of `@flowstack-ui/brick`.

- Preserve the scrubber resize cursor beyond the icon for the complete drag session and restore normal cursor/selection styles afterward.

- Add Group and Element for labelled fields and compact leading/trailing content without application CSS.
- Hide the complete hover-control boundary with its buttons and preserve unit/control alignment.
- Constrain documentation examples and show the scrubber as a leading icon.

- Complete locale-aware API guidance and modern source-paired documentation examples.
- Expose localized string editing and controller parts; refine step geometry and unavailable-action paint.

- Add surface as a neutral filled-and-bordered alternative with unchanged geometry; preserve outline defaults.
- Keep outline transparent at rest and on hover, independently of popup paint.

- Forced colors preserves a real system-color focus outline; shadows are not the sole focus cue.

- Add shared token-only radius selection to the boundary parts documented in the Radius guide; preserve omitted defaults and independent internal geometry.

- Generated step actions now inherit their generic accessible labels from
  `LocaleProvider` when Control labels are omitted.
- Refined split steppers with layout-aware minus/plus artwork and an 18px
  regular numeric reading scale while preserving the editable spinbutton.

- Expanded NumberInput to the responsive shared 2xs–2xl control-size scale,
  made the 44px `lg` recipe the default, and kept step controls square at every
  size.

### Added

- Added `NumberInput.Control` as reusable stacked-stepper shorthand and
  `layout="stepper"` for equal square actions around a centered value.

- Added the `xs` density and `NumberInput.Unit` suffix part for compact
  property rows.

- Added opt-in `stepperVisibility="hover"` for dense property panels while
  preserving persistent step actions for touch/coarse-pointer users.

### Changed

- Compact inputs now reclaim the complete value column when Increment and
  Decrement are intentionally omitted, and `xs` uses density-matched input
  padding so short values remain fully visible.
- Outline Number Input now uses a transparent surface so it blends with its
  owning panel while retaining the complete strong boundary.

## 0.1.10

### Fixed

- Preserve at least 24 CSS px for each stacked Number Input step action on coarse-pointer devices instead of dividing compact controls into undersized touch targets.

### Added

- Added public NumberInput Agent Knowledge covering exact numeric selection,
  one-input composition, parsing and formatting, spinbutton and form behavior,
  responsive touch geometry, application boundaries, and validation.
- Initial four-part Atom-backed Number Input with three variants, sizes, and applicable shapes; bounded stepping; Field, Fieldset, and Form composition; logical RTL; forced colors; and public CSS hooks.

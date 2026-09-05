# Number Input changelog

Number Input follows the package version of `@flowstack-ui/brick`.

## Unreleased

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

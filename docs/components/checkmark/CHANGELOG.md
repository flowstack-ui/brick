# Checkmark changelog

Checkmark follows the package version of `@flowstack-ui/brick`.

## Unreleased

- Share responsive square geometry with Checkbox, add shared radius, contrast
  tone and selected-only subtle paint while retaining existing variants.

### Added

- Added `filled` and `inverted` presentation; unchecked marks are transparent
  by default and boxed md/lg glyphs have an inset for balanced proportions.

- Added a passive, theme-aware checked and indeterminate mark with standard sizes, tones, recipes, and forced-colors treatment.

## September 18, 2026

- Use responsive sizes and variants. Subtle and soft paint a muted box in every state; plain is unboxed, inverted is transparent unless filled, and boxed md/lg use 2px inset. invalid is visual only; disabled adds one fade and a disabled cursor.

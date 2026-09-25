# Radiomark changelog

Radiomark follows the package version of `@flowstack-ui/brick`.

## Unreleased

- Keep replacement artwork centered and contained without inheriting the label's line height.

- Added responsive size and variant, contrast tone, subtle alias and decorative
  checked-artwork replacement while preserving passive semantics.

### Fixed

- A disabled unchecked mark remains empty in forced colors, instead of gaining
  a visible dot from the system disabled foreground.

### Added

- Added `filled` and `inverted` presentation with transparent unchecked marks
  by default and theme-owned selected foregrounds.

- Added a passive, theme-aware selected-state mark with standard sizes, tones, recipes, and forced-colors treatment.

## September 18, 2026

- Use responsive sizes and variants. Outline uses a 0.6 dot; other recipes use 0.4. Inverted uses solid palette foreground. invalid is visual only; disabled adds one fade and a disabled cursor. Preserve passive custom artwork.

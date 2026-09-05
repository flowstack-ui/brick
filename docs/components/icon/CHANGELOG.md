# Icon changelog

Icon follows the package version of `@flowstack-ui/brick`.

## Unreleased

### Added

- Added orthogonal `emphasis="text" | "solid"` paint selection so semantic
  tones do not multiply into compound values.
- Expanded the closed Icon scale with `inherit`, a 28px `lg`, and `2xl` for
  deliberate 40px display glyphs while retaining `md` as the default.

### Fixed

- Kept an SVG used through `asChild` at the selected Icon size instead of
  allowing the composed root to expand to its layout container.

### Added

- Added public Agent Knowledge for Icon selection, decorative/informative
  semantics, control naming, currentColor, directional RTL, and composition.
- Initial SVG-only `Icon` API with decorative and informative modes, six
  sizes, semantic currentColor tones, opt-in RTL mirroring, direct SVG
  composition, and public customization variables.

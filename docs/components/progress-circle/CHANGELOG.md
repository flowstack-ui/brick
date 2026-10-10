# Progress Circle changelog

Progress Circle follows the package version of `@flowstack-ui/brick`.

## Unreleased

- Polished paired sizes/strokes, contained thick paint, typography and changing
  indeterminate arc; suppress active paint at zero progress.
- Added responsive size, static/SVG host composition, RootProvider, Context,
  shared controller integration, explicit IDs and raw-value formatting.
- Refreshed focused documentation examples and part-specific props.

- Formatted values now inherit `LocaleProvider.locale` unless Root supplies an
  explicit locale.
## 0.1.10

### Added

- Added public Agent Knowledge for Brick-owned circular progress geometry,
  Atom-owned range semantics, accessible naming, motion, and validation.
- Added Atom-backed circular determinate and indeterminate progress with five
  sizes, three thicknesses, two caps, six tones, visible naming/value parts,
  clockwise RTL behavior, preferences, and public CSS hooks.

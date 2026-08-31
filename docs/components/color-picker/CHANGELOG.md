# Color Picker changelog

Color Picker follows the package version of `@flowstack-ui/brick`.

## Unreleased

## 0.2.2 - 2026-08-31

### Added

- Added `2xs`, `xs`, `xl`, and `2xl` to the existing `sm`, `md`, and `lg`
  size recipes and documented the full application-composition catalog.
- Added `Control layout="integrated"` plus outlined or frameless `sharp`,
  `rounded`, and `circle` swatch-frame recipes.

### Fixed

- Reduced the finished editor footprint to 16rem, removed popup chrome from
  inline content, unified format and channel
  control heights, centered labelled and unlabelled slider geometry, and made compact preset layout
  deliberate at each supported size.

## 0.2.1 - 2026-08-31

### Fixed

- Kept popup content above surrounding application content, centered channel
  thumbs on their tracks, hid unchecked swatch indicators, fitted compact
  presets without an orphan row, and replaced the placeholder EyeDropper mark
  with finished icon artwork.
- Exposed unsupported EyeDropper behavior as a disabled Atom-owned action with
  a normal editor and native chooser still available.

## 0.2.0 - 2026-08-31

### Changed

- Expanded Color Picker on exact Atom 0.26.0 with area and channel editing,
  alpha, RGBA/HSLA/HSBA views, channel inputs, selected indicators, finished
  popup positioning, ValueText/ValueSwatch, TransparencyGrid, and progressive
  native chooser and EyeDropper paths.

## 0.1.10 - 2026-08-28

### Added

- Added the finished Atom 0.24.0-backed hexadecimal Color Picker with editable and native inputs, named presets, optional floating content, form submission, three sizes, and outline/soft variants.

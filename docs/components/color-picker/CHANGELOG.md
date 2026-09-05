# Color Picker changelog

Color Picker follows the package version of `@flowstack-ui/brick`.

## Unreleased

### Fixed

- Separated the compact current-value preview from selectable preset sizing so
  integrated color fields use a polished 16px `xs` or 18px `sm` ValueSwatch
  without shrinking the popup palette.
- Kept channel-slider thumbs above their tracks across the full value range and
  kept semantic checkerboards visible beneath translucent `ValueSwatch` and
  `Swatch` colors supplied by Atom.
- Removed hard area and track borders, made channel tracks and transparency
  checks share one semantic radius, and replaced the thumb's dark outline with
  the small Theme shadow while retaining its white contrast ring.
- Made alpha-track transparency checks appearance-independent white and
  light-neutral canvases while keeping swatch checks appearance-aware, so the
  opacity ramp stays legible without turning dark-mode swatches white.
- Made the alpha thumb preview the selected color at full opacity across the
  complete range, including the zero-opacity endpoint.

## 0.2.2 - 2026-08-31

### Added

- Added `2xs`, `xs`, `xl`, and `2xl` to the existing `sm`, `md`, and `lg`
  size recipes and documented the full application-composition catalog.
- Added `Control layout="integrated"` plus outlined or frameless `sharp`,
  `rounded`, and `circle` swatch-frame recipes.

### Fixed

- Reduced the finished editor footprint to 16rem with a 15rem `2xs`/`xs`
  popup, removed popup chrome from inline content, unified format and channel
  control heights, centered labelled and unlabelled slider geometry, and made compact preset layout
  deliberate at each supported size.
- Made swatch-only triggers square, kept integrated field actions locally
  ghosted, placed a theme-aware checker beneath alpha gradients, and documented
  saved and predefined palettes as optional application composition.

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

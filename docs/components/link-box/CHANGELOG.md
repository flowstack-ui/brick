# Link Box changelog

Link Box follows the package version of `@flowstack-ui/brick`.

## Unreleased

- No unreleased changes.

## 0.1.11 - 2026-08-28

### Fixed

- Made the full-card hit-target evidence deterministic on short mobile
  viewports and verified that activating the sampled non-text point performs
  the native Link navigation.

## 0.1.10 - 2026-08-28

### Changed

- Replaced the documented ZStack inline-style exception with public
  `isolation`, `layer`, and `edgeSpacing` composition props.

### Added

- Added `LinkBox.Root`, `LinkBox.Link`, and `LinkBox.Action` for one native
  destination with a full-region pointer target, whole-region hover/focus
  treatment, and independently layered secondary controls.

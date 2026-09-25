# Splitter changelog

Splitter follows the package version of `@flowstack-ui/brick`.

## Unreleased

### Added

- Expose the Atom-backed external store, RootProvider, context hook and shared
  intersection registry. Accept em/rem/vw/vh sizes alongside percentages and pixels.
- Add Atom-backed resizable panels with theme-aware decorative separator/grip,
  orientation and independent coarse-pointer targets.

### Fixed

- Focus outlines the default grip once; line-only custom handles retain a visible
  target outline. Atom handles keyboard expansion, cascade constraints, focus
  recovery and scroll-safe pointer focus.

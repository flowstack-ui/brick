# Slider changelog

Slider follows the package version of `@flowstack-ui/brick`.

## Unreleased

### Fixed

- An unexpected pointer-capture release now finalizes the current Slider value
  instead of snapping back to its pointer-down value.
- Contain markers within Track, keep endpoint labels inside the Slider, give
  authored horizontal value labels dedicated space, and document that value
  labels are optional.
- Correct RTL range geometry and committed click/drag behavior for horizontal,
  vertical, range, RTL, and marker positions.

### Added

- Added the Atom-backed six-part Slider with single/range values, horizontal and vertical axes, RTL, markers, value labels, three sizes, two variants, Field/form integration, accessibility, responsive and preference styling, and independent automated/manual evidence.

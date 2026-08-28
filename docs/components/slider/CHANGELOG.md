# Slider changelog

Slider follows the package version of `@flowstack-ui/brick`.

## Unreleased

## 0.1.10

### Fixed

- Balanced the neutral Track in light and dark appearances, increased its
  visual thickness, and explicitly centered Marker dots on both axes.
- Reduced decorative Marker dots to a quieter four-pixel stop while preserving
  selected and unselected distinction across appearance and accent changes.
- Exposed the Track endpoint inset as a public token so spacious compositions
  can align the visual Track with adjacent content without shrinking the Thumb
  target.

- Keep complete 44px Thumb targets and their focus treatment inside horizontal
  and vertical Slider boundaries at the minimum and maximum values.
- An unexpected pointer-capture release now finalizes the current Slider value
  instead of snapping back to its pointer-down value.
- Contain markers within Track, keep endpoint labels inside the Slider, give
  authored horizontal value labels dedicated space, and document that value
  labels are optional.
- Correct RTL range geometry and committed click/drag behavior for horizontal,
  vertical, range, RTL, and marker positions.
- Inset horizontal endpoint marker dots within the rounded Track caps, including
  empty decorative markers without labels.
- Give unselected markers the primary foreground with a strong semantic border
  and selected markers the active canvas surface with a subtle derived border,
  keeping both states distinct across appearance and accent changes.

### Added

- Expanded public Agent Knowledge for approximate numeric selection, scalar and
  range anatomy, change versus commit effects, pointer cancellation, input
  direction, and the exact installed Atom Slider reference.
- Added the Atom-backed six-part Slider with single/range values, horizontal and vertical axes, RTL, markers, value labels, three sizes, two variants, Field/form integration, accessibility, responsive and preference styling, and independent automated/manual evidence.

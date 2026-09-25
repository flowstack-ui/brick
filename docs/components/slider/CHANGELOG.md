# Slider changelog

Slider follows the package version of `@flowstack-ui/brick`.

## Unreleased

Disabled controls preserve their recipe and use one 50% fade with a not-allowed cursor. Forced colors restores full opacity and uses system disabled colors.

### Added

- Added the shared Atom controller, `useSlider`, RootProvider and Context; Control, Label, ValueText, MarkerGroup, MarkerIndicator, MarkerLabel, DraggingIndicator and HiddenInput parts; and Brick Thumbs and Marks shortcuts.
- Added start/center/end scalar origins, contain/center thumb alignment, explicit thumb dimensions, none/push/swap pointer collisions and Shift+Arrow large steps.

### Changed

- Made size and outline/solid/soft variants responsive, added neutral/accent/contrast tones, corrected local RTL/vertical geometry and changed the default variant metadata to `outline`.
- `variant="solid"` now renders a truly filled thumb. Existing consumers that want the former outlined appearance should use `variant="outline"`.
- Replaced the CSS track-inset workaround with Atom-owned target containment while retaining legacy Track-with-Thumb and Marker-text composition.

### Fixed

- Resolve label, output and marker typography through shared semantic tokens;
  preserve compact value-bubble leading and existing text measurements.

- Corrected visible-thumb containment and scalar rail-end fill while preserving expanded 44px hit targets.
- Centered vertical RTL tracks and thumb artwork; removed disabled/read-only drag feedback and restored cross-axis scrolling.
- Resolved soft paint through the selected tone, restored component CSS layering and shared focus tokens.
- Adopted primary-pointer filtering, scroll-safe track focus, grab offsets and stale-session cleanup from Atom.

- Added automatic/explicit hidden-input ownership, per-thumb naming precedence, external value output and drag-only value presentation.

## Unreleased

### Added

- Added supported decorative content inside `Slider.Thumb`, including a
  public foreground hook and size-aware containment that does not affect
  `Slider.ValueLabel`.

- Added the opt-in `frame="outline"` control shell for form-aligned slider
  compositions.

### Changed

- Completed the `sm`/`md`/`lg` Thumb and Track progression at 16/6px, 20/8px,
  and 24/10px; Thumb artwork can now use `Icon size="inherit"` for the owned
  14px content scale.
- Refined the default neutral Track and outlined Thumb to use translucent
  emphasized paint, a canvas Thumb surface, and no incidental elevation.

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

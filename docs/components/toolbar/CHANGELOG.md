# Toolbar changelog

Toolbar follows the package version of `@flowstack-ui/brick`.

## Unreleased

- Add Group/Input, root disabled, discoverable disabled commands, seven responsive sizes and shared Button/Toggle presentation with per-item overrides.
- Add surface; make outline transparent. Replace legacy toolbar-item variables with shared control props and variables.
- Preserve focused documentation examples and separate exhaustive qualification.

- Use canonical focus-width tokens while preserving existing focus ownership and compact placement.

- Default ToggleGroup to neutral ghost and share Toggle/ToggleGroup paint,
  including flat selected states and hover/active/disabled/forced-color styling.
  Preserve Toolbar's compact geometry, inset focus and Atom roving navigation.
- Apply the medium control typography tokens to medium Toolbar items.
- Add shared token-only radius selection to the boundary parts documented in the Radius guide; preserve omitted defaults and independent internal geometry.

### Fixed

- Neutral solid ToggleItems use the shared neutral surface recipe, with
  distinct hover and pressed states.
- Disabled commands use a faded disabled foreground. ToggleItems share the
  quiet disabled surface and border of Toggle and ToggleGroup.
- Kept command, link, and toggle focus rings fully visible inside horizontal
  and vertical Toolbar scrolling boundaries, including edge controls and the
  zero-padding plain variant.

### Added

- Added shared ToggleGroup `solid`, `soft`, `outline`, and `ghost` variants
  plus `accent` and `neutral` tones while retaining Atom Toolbar behavior.
- Added public Agent Knowledge for component selection, composition,
  CSS-delivery, recurring mistakes, and validation.

- Added the compound `Toolbar` family with three surfaces, three sizes, horizontal and vertical layouts, coordinated command/link/toggle controls, separators, RTL keyboard behavior, and no-wrap overflow containment.

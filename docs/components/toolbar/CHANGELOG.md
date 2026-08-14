# Toolbar changelog

Toolbar follows the package version of `@flowstack-ui/brick`.

## Unreleased

### Fixed

- Neutral solid ToggleItems now use a Toolbar-specific layered surface: raised
  and white-ish in light appearance, stronger raised neutral in dark, with
  hover and pressed states that remain distinct from the Toolbar container.
- Disabled commands and ToggleItems now use a faded disabled foreground and
  remove enabled selected/outlined emphasis.
- Kept command, link, and toggle focus rings fully visible inside horizontal
  and vertical Toolbar scrolling boundaries, including edge controls and the
  zero-padding plain variant.

### Added

- Added shared ToggleGroup `solid`, `soft`, `outline`, and `ghost` variants
  plus `accent` and `neutral` tones while retaining Atom Toolbar behavior.
- Added public Agent Knowledge for component selection, composition,
  CSS-delivery, recurring mistakes, and validation.

- Added the compound `Toolbar` family with three surfaces, three sizes, horizontal and vertical layouts, coordinated command/link/toggle controls, separators, RTL keyboard behavior, and no-wrap overflow containment.

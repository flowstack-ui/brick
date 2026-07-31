# Context Menu changelog

Context Menu follows the package version of `@flowstack-ui/brick`.

## Unreleased

### Fixed

- Inherited Atom's document-only scroll lock so sticky application chrome
  remains anchored while a modal Context Menu is open.
- Inherited Atom `0.20.6` portal direction, submenu collision handling, and
  movement-gated hover intent so opening a parent menu does not also open a
  submenu beneath a stationary pointer. RTL content remains logical and
  constrained submenus stay in the viewport. The Brick submenu chevron now
  points left in RTL, and single-axis popup entry motion follows the actual
  collision-resolved side without scaling diagonally.

### Added

- Added the complete styled Context Menu family with a paintless trigger region, three popup sizes, structured rows, choices, nested menus, and touch-context support through Atom.

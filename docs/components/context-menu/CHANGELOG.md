# Context Menu changelog

Context Menu follows the package version of `@flowstack-ui/brick`.

## Unreleased

### Fixed

- Use the standard overlay boundary token so popup and submenu edges remain
  visible against raised application surfaces.

## 0.1.10

### Fixed

- Default `md` command rows now use Brick's shared 44px comfortable target;
  explicit `sm` and `lg` densities remain 32px and 48px.
- Inherited Atom's document-only scroll lock so sticky application chrome
  remains anchored while a modal Context Menu is open.
- Inherited Atom `0.20.6` portal direction, submenu collision handling, and
  movement-gated hover intent so opening a parent menu does not also open a
  submenu beneath a stationary pointer. RTL content remains logical and
  constrained submenus stay in the viewport. The Brick submenu chevron now
  points left in RTL, and single-axis popup entry motion follows the actual
  collision-resolved side without scaling diagonally.
- Upgraded to Atom `0.20.7` so repeated and cross-target secondary clicks keep
  the custom Context Menu active at the latest point, and one activation
  outside an open root/submenu tree dismisses the complete tree.

### Added

- Added public Agent Knowledge for supplemental command discovery, paintless
  target composition, contextual input, accessible naming, shared menu
  behavior, and exact installed Atom ContextMenu and Menu references.
- Added the complete styled Context Menu family with a paintless trigger region, three popup sizes, structured rows, choices, nested menus, and touch-context support through Atom.

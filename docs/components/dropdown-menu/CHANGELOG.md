# Dropdown Menu changelog

Dropdown Menu follows the package version of `@flowstack-ui/brick`.

## Unreleased

### Fixed

- Use the standard overlay boundary token so popup and submenu edges remain
  visible against raised application surfaces.

## 0.1.10

### Fixed

- Normalized direct Brick Icon, SVG, and image artwork to the density-aware
  Leading slot so menu icons remain centered with their labels.

- Default `md` command rows now use Brick's shared 44px comfortable target;
  explicit `sm` and `lg` densities remain 32px and 48px.
- Inherited Atom's document-only scroll lock so sticky application chrome
  remains anchored while a modal Dropdown Menu is open.
- Inherited Atom `0.20.6` portal direction, submenu collision handling, and
  movement-gated hover intent so opening a parent menu does not also open a
  submenu beneath a stationary pointer. RTL content remains logical and
  constrained submenus stay in the viewport. The Brick submenu chevron now
  points left in RTL, and single-axis popup entry motion follows the actual
  collision-resolved side without scaling diagonally.

### Added

- Expanded public Agent Knowledge for visible-trigger selection, command and
  settings composition, item roles, close policy, submenus, destination links,
  responsive validation, and exact installed Atom DropdownMenu and Menu references.
- Added the complete styled Dropdown Menu family with three sizes, structured rows, choices, danger emphasis, nested menus, composition, and Atom-owned behavior.

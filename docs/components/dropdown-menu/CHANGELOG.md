# Dropdown Menu changelog

Dropdown Menu follows the package version of `@flowstack-ui/brick`.

## Unreleased

- Match rotated-square arrow proportions (approximately 16.97px base and 8.49px
  height), with an open edge stroke and seamless popup-border join.

- Preserve popup-arrow paint above the content shadow and document arrow clearance
  and plain destination-link composition.

- Support unpadded native triggers for avatars without extra Button chrome.
- Correct pointer-leave highlighting and nested dialog menu ordering through Atom.

- Expose the public controller, RootProvider, Context and state types, preserving
  one Atom behavior owner and the same Brick visual settings.
- Add an explicitly composed TriggerIndicator with replaceable decorative artwork.

- Add shared subtle/solid/plain popup variants, semantic tones, compact complete
  size recipes, panel and inline item inset, optional leading reservation and
  centered item layout. Neutral subtle is the new default highlight.
- Fix plain-label layout, local token precedence across sizes and composed Link
  state colors. Support replaceable or suppressed submenu chevrons and owned
  selection artwork without duplicate indicators.


- Add shared token-only radius selection to the boundary parts documented in the Radius guide; preserve omitted defaults and independent internal geometry.

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

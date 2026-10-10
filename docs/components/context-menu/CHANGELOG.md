# Context Menu changelog

Context Menu follows the package version of `@flowstack-ui/brick`.

## Unreleased

- Correct documentation Link decoration and inherited leading-icon sizing.
  Separate contextual examples by capability, add placement and optional arrow
  examples, and replace the generic guide with focused composition guidance.

- Match rotated-square arrow proportions (approximately 16.97px base and 8.49px
  height), with an open edge stroke and seamless popup-border join.

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

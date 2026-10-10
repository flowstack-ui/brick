# Menubar changelog

Menubar follows the package version of `@flowstack-ui/brick`.

## Unreleased

- Correct documented Link and Icon composition, mixed-command measure, and
  focused strip/popup guidance. Add separate radio, placement and arrow examples.

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
- Separate plain/surface strip paint and subtle/plain trigger treatment from
  popup recipes; add independent menuSize and rail/trigger radius selection.


- Add shared token-only radius selection to the boundary parts documented in the Radius guide; preserve omitted defaults and independent internal geometry.

### Fixed

- Use the standard overlay boundary token for popup and submenu surfaces so
  their edges remain visible against raised application surfaces.

## 0.1.10

### Fixed

- Switching between open top-level menus now hides the previous popup
  immediately instead of retaining it for the generic popup exit transition.
- Default `md` bar triggers and popup rows now use Brick's shared 44px
  comfortable target; explicit `sm` and `lg` densities remain 32px and 48px.
- Inherited Atom `0.20.6` portal direction, submenu collision handling, and
  movement-gated hover intent so opening a parent menu does not also open a
  submenu beneath a stationary pointer. RTL content remains logical and
  constrained submenus stay in the viewport. The Brick submenu chevron now
  points left in RTL, and single-axis popup entry motion follows the actual
  collision-resolved side without scaling diagonally.

### Added

- Added public Agent Knowledge for persistent application-command selection,
  named and uniquely valued menu composition, orientation, responsive
  ownership, and exact installed Atom Menubar and Menu references.
- Added the complete styled Menubar family with a persistent command rail, three sizes, adjacent-menu keyboard behavior, complete popup anatomy, and composition.

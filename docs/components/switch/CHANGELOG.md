# Switch changelog


## Unreleased

- Improve navigation between usage examples and individual props documentation.

Disabled presentation preserves the selected recipe and fades once to 50%, with a not-allowed cursor on the disabled hit target. Keep read-only separate; do not add an opacity wrapper around an already disabled control. Forced colors uses system disabled colors.

Switch follows the package version of `@flowstack-ui/brick`.

- Compound Switch supports owner `ids` for server-rendered custom associations;
  local Control and Label ID changes remain associated after mounting.

- Preserve one track-owned focus ring when the optional reset fallback is loaded.

### Added

- Added compound Field, Control, Label, HiddenInput, Indicator,
  ThumbIndicator and RootProvider parts, plus `useSwitch` and
  `useSwitchContext`, while preserving standalone Root.
- Added responsive size/variant recipes, seven checked-state tones, logical
  label placement and a default compound thumb.

### Fixed

- Keep custom checked colors through hover and press, resolve effective nested
  RTL direction, separate the raised checked rail from its thumb, and retain
  clear read-only state identity.
- Center track indicators in the unoccupied track half and contain thumb
  indicators inside the thumb instead of allowing SVG line boxes to escape.

### Added

- Added the compact `xs` size and `solid` / `raised` variants while retaining
  a minimum 44px interaction target.

### Changed

- Refined Switch to 2:1 track geometry. The default solid recipe is borderless
  with a restrained layered thumb shadow; raised separates the rail and thumb.
- Changed the unchecked track from surface paint to adaptive neutral boundary
  roles so rest, hover, and pressed states stay visible in light and dark
  appearances. Checked active paint now uses the accent pressed role.

## 0.1.10

### Added

- Added public Agent Knowledge for immediate-setting selection, accessible
  naming, controlled and read-only state, form behavior, responsive validation,
  and the exact installed Atom Switch reference.
- Initial Atom-backed Root and Thumb component with three sizes, canonical
  neutral-off/accent-on paint, complete state styling, native form and Field
  behavior, RTL, reduced-motion and forced-color support, composition, and
  stable CSS hooks.

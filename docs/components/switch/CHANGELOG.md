# Switch changelog

Switch follows the package version of `@flowstack-ui/brick`.

## Unreleased

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

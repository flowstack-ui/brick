# Nav List changelog

Nav List follows the package version of `@flowstack-ui/brick`.

## Unreleased

- Add plain navigation, shared radius, accessible trailing content and replaceable disclosure indicators; preserve hidden horizontal sections and settled-open focus rings.

- Add independent scalar `gap` props to Root and Section using shared Brick
  spacing values; preserve default theme gaps and item density.

- Add independent horizontal row inset and section indentation controls,
  preserving defaults and allowing aligned static group titles and items.

- Add independent comfortable/compact density, preserving text and icon sizes.
- Use primary section-label text through a documented foreground token.

### Changed

- Changed neutral soft current rows to an opaque appearance-aware layered
  surface with a distinct current-hover state, preventing equivalent adjacent
  surfaces in both light and dark appearances.

- Documented that repeated Dividers follow complete Items or collapsible
  Sections under one layout owner and never split a trigger from its content.

### Added

- Added logical `--brick-nav-list-row-padding-inline-start` and
  `--brick-nav-list-row-padding-inline-end` tokens for aligning row content
  with surrounding shells while preserving the existing symmetric default.
- Added public Agent Knowledge for component selection, composition,
  CSS-delivery, recurring mistakes, and validation.

- Added the complete Atom-backed navigation-list family with current,
  disabled, grouped, collapsible, composed, and responsive visual recipes.

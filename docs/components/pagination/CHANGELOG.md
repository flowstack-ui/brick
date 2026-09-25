# Pagination changelog

Pagination follows the package version of `@flowstack-ui/brick`.

## Unreleased

### Added

- Added count/page-size state, usePagination, RootProvider, Context, First,
  Last, custom generated hosts, distinct ID maps, and localized PageText formats.
- Added Button visual variants, selectedVariant, tone, radius and responsive sizes.
- Added native URL destinations, localized labels, stable generated ranges,
  and the legacy boundaryVariant outline shortcut.
- Added public Agent Knowledge for selection, composition and CSS delivery.

### Changed

- Controls share Button presentation, defaulting to neutral ghost with outline
  selected state. Container paint composes through Surface; legacy root, control,
  current-page and typography CSS variables are retired. List gap remains supported.
- List wrappers are optional, enabling direct attached ButtonGroup composition.

### Fixed

- Inside focus remains visible within the owned inline scroll container.
- Sparse responsive sizes inherit Pagination's md default.
- Attached controls retain their named Button-sized minimum targets.

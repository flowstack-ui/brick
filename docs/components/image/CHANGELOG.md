# Image changelog

Image follows the package version of `@flowstack-ui/brick`.

## Unreleased

### Changed

- Expanded delivery guidance for responsive source selection, intrinsic
  geometry, likely-LCP priority, deferred images, and cold/warm/constrained
  qualification without changing the Image runtime API.

- Clarified that Image is appropriate for larger editorial/profile portraits
  while Avatar owns compact fixed-square identity tokens, and documented
  contextual portrait alternative-text decisions.

### Fixed

- Made `frame="none"` reserve zero border width so embedded media reaches the
  Root edge without a transparent one-pixel seam; `frame="subtle"` retains the
  established semantic border.

### Added

- Added explicit `fill` geometry so Image Root, Content, and Fallback can
  consume a parent-established block size, including `Surface.Media`, while
  retaining independent fit and focal-position recipes.

- Added direct `ImageRoot`, `ImageContent`, and `ImageFallback` exports so
  React Server Components can reference the client parts without serializing a
  compound namespace.

- Added public Agent Knowledge for component selection, composition,
  CSS-delivery, recurring mistakes, and validation.

- Initial Atom-backed `Image.Root`, `Image.Content`, and `Image.Fallback` API
  with authored alternative text, native responsive attributes, fit, logical
  position, radius, frame, aspect ratio, source states, and customization hooks.

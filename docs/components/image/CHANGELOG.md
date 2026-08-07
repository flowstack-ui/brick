# Image changelog

Image follows the package version of `@flowstack-ui/brick`.

## Unreleased

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

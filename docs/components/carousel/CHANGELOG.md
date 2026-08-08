# Carousel changelog

Carousel follows the package version of `@flowstack-ui/brick`.

## Unreleased

### Added

- Added an opt-in parent-fill recipe that propagates an explicitly owned block
  size through Root, Viewport, Track, and Slide, including flex-grown parents,
  without making ordinary Carousels viewport-sized.
- Added public navigation and controls inset variables for responsive product
  composition without overriding Carousel part selectors.

### Fixed

- Updated the Atom behavior dependency so pointer activation of
  RotationControl no longer races focus handling in Firefox or WebKit.

### Added

- Added the Atom-backed Carousel family with one-slide native scrolling, optional overlay or outside controls, optional picker dots, user-controlled automatic rotation, three sizes, public styling variables, and Agent Knowledge.

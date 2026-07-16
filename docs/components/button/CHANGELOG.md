# Button changelog

Button follows the package version of `@flowstack-ui/brick`.

## Unreleased

### Added

- Initial direct `Button` API and root/component-subpath exports.
- Four variants, six semantic tones, five sizes, and three shapes.
- Explicit full-width layout, start/end icons, and stable loading presentation.
- Native props, `HTMLElement` ref, `asChild`, and `render` forwarding from Atom
  0.2.1.
- Public Button tokens, stable class, visual attributes, and appearance support.

### Fixed

- Full-width and intrinsically sized Buttons now use border-box sizing and can
  shrink and wrap without clipping at extreme zoom or constrained widths.

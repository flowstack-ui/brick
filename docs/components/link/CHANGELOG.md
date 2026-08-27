# Link changelog

Link follows the package version of `@flowstack-ui/brick`.

## Unreleased

### Changed

- Changed neutral Link interaction paint from muted text to the semantic
  accent hover and pressed roles, so plain navigation gains emphasis instead
  of becoming less prominent when people interact with it.
- Made the explicit `plain` recipe remain decoration-free and use regular
  navigation weight through hover, focus-visible, and active states for
  unmistakable navigation contexts. Native current state still receives
  medium emphasis, while the theme recipe continues to own interaction
  underlines and theme Link weight.
- Corrected Agent Knowledge to use Link for ordinary navigation while retaining
  Button `href` mode for destinations that intentionally need an action-control
  treatment, and clarified that Link's inherited size and theme variant are
  defaults that should not be restated.

### Added

- Initial Link API built on Atom Link with required native destinations,
  native anchor props, an `HTMLAnchorElement` ref, and router `render` and
  `asChild` composition.
- Underline and plain recipes; accent, neutral, and inherited tones; inherited,
  small, medium, and large typography; optional decorative start/end icons;
  native current-state styling; appearance, forced-colors, RTL, wrapping, and
  public CSS customization hooks.
- Theme-following Link decoration with an underlined Brick fallback, explicit
  local `underline`/`plain` overrides, and a closed inherited theme input.

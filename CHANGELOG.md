# Changelog

All notable public changes to `@flowstack-ui/brick` are recorded here.

## Unreleased

### Added

- Standardized strict development and browser-test ports for the Brick
  playground, added a matching LAN command, and added watch/comprehensive test
  command aliases.
- Static CSS, token, and optional reset entrypoints.
- Package test, playground, documentation, and release-verification foundation.
- Reviewed Chromium visual baselines and a desktop/mobile Playwright release
  matrix covering Chromium, Firefox, WebKit, Pixel, and iPhone profiles.
- Button with four variants, six semantic tones, five sizes, three shapes,
  loading presentation, icons, native links, and Atom composition support.
- Card with seven compound parts, three neutral surface variants, three sizes,
  controlled semantic container and heading choices, and static server output.
- Dialog with twelve public parts, three bounded responsive sizes, scrollable
  Body, scoped portal and Branch composition, and direct Atom modal behavior.
- Four reviewed Dialog visual baselines covering light, dark, mobile RTL, and
  forced colors.
- AlertDialog with twelve public parts, two bounded responsive sizes, required
  alert-message guidance, Cancel-safe autofocus, explicit outcomes, and
  permanently blocked backdrop dismissal.
- Four AlertDialog Chromium baselines covering light, dark, mobile RTL, and
  forced colors, plus desktop/mobile interaction, nesting, and axe evidence.
- Drawer with twelve public parts, four logical edge placements, four distinct
  mobile-aware sizes including full, bounded Body scrolling, Branch
  composition, and public CSS hooks.
- A named post-Drawer Gesture Drawer / Bottom Sheet capability audit so future
  swipe, drag, and snap behavior is decided at the Atom boundary rather than
  added as an untracked Brick workaround.
- A 218-pass, 82-intentional-skip desktop/mobile release matrix and clean
  packed-package verification on React 18 and React 19 after Drawer coverage.

### Fixed

- Upgraded the exact Atom dependency to 0.3.2 so nested Dialog cleanup restores
  the application root after animated child and parent exits.
- Preserved explicit RTL direction across body portals and kept RTL Dialogs
  physically centered within the viewport.
- Button full-width sizing and intrinsic reflow without requiring the optional
  reset stylesheet.
- Clarified direct `href` as the normal Button navigation path and reserved
  `asChild` for custom permissive adapters.
- Strengthened dark elevated Card hierarchy without adding a theme runtime or
  new public token.

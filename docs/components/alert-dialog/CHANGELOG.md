# Alert Dialog changelog

Alert Dialog follows the package version of `@flowstack-ui/brick`.

## Unreleased

### Fixed

- Title typography now uses the shared overlay-title recipe and its normalized
  tracking.
- Increased the default medium surface from `28rem` to `30rem` so valid paired
  decision labels remain on one row when the viewport has sufficient space.
- Added an extreme-reflow Content scrolling fallback so wrapped responses stay
  reachable at high zoom and unusually narrow or short effective viewports.

### Added

- Initial twelve-part `AlertDialog` compound namespace with Root, Trigger,
  Portal, Overlay, Content, Header, Title, Description, Body, Footer, Cancel,
  and Action.
- Small and medium centered surfaces with safe-area-aware bounds, a bounded
  optional Body, Cancel-safe initial focus, and permanently blocked backdrop
  dismissal.
- Public classes, slots, five component tokens, reduced-motion and
  forced-colors treatment, and direct root/subpath exports.

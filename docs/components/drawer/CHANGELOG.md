# Drawer changelog

Drawer follows the package version of `@flowstack-ui/brick`.

## Unreleased

### Added

- Upgraded to Atom 0.6.7 so Drawer uses root/body overflow locking without
  fixed-body repositioning or unlock-time scroll restoration on iOS Safari.
- Initial modal-only twelve-part Drawer namespace with Root, Trigger, Portal,
  Overlay, Content, Header, Title, Description, Body, Footer, Close, and Branch.
- Logical start/end/top/bottom placement and small, medium, large, and full
  sizes with distinct mobile viewport caps.
- Safe-area-aware edge surfaces, bounded Body scrolling, reduced-motion and
  forced-colors treatment, direct subpath exports, and public CSS hooks.
- Component, type, package, desktop/mobile browser, nesting, Branch, RTL,
  responsive geometry, axe, visual, playground, and Consumer evidence.
- Explicit tracking for a later Gesture Drawer / Bottom Sheet product and Atom
  capability audit; gestures are not part of this release.

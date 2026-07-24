# Drawer changelog

Drawer follows the package version of `@flowstack-ui/brick`.

## Unreleased

### Added

- Initial modal-only twelve-part Drawer namespace with Root, Trigger, Portal,
  Overlay, Content, Header, Title, Description, Body, Footer, Close, and Branch.
- Logical start/end/top/bottom placement and small, medium, large, and full
  sizes with distinct mobile viewport caps.
- Safe-area-aware edge surfaces, bounded Body scrolling, reduced-motion and
  forced-colors treatment, direct subpath exports, and public CSS hooks.
- Nested and Branch ownership, scoped portals, heading-level forwarding,
  configurable dismissal, and logical RTL placement.

### Fixed

- Modal scroll locking no longer repositions the page or restores an obsolete
  scroll position during mobile browser toolbar changes.

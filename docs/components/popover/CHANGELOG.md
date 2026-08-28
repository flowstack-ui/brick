# Popover changelog

Popover follows the package version of `@flowstack-ui/brick`.

## Unreleased

### Added

- Added `density="compact"` for concise utility panels while preserving the
  comfortable default.

### Fixed

- Normalized nested Title and Description margins so native heading and
  paragraph defaults cannot enlarge composed headers.
- Popover now uses a visible structural border, with the Arrow inheriting the
  same border and surface paint so both parts read as one overlay.
- Modal Popover now inherits Atom's document-only scroll lock so sticky
  application chrome remains anchored at nonzero page offsets.

### Added

- Initial twelve-part Popover compound API with Trigger, Anchor, Portal,
  Overlay, Content, Viewport, Arrow, Title, Description, and Close parts.
- Click, press, and keyboard activation with modal and non-modal focus
  behavior, controlled focus targets, and native dialog relationships.
- Small, medium, and large bounded elevated surfaces, collision-aware
  placement, nested ownership, scoped portals, and public customization hooks.

### Fixed

- Title typography now uses the shared compact-title recipe and its normalized
  tracking.
- Touch and pen scrolling no longer dismisses an open Popover, while genuine
  outside taps still close it.
- Portalled content now preserves the trigger's logical text direction.
- Constrained surface scrolling now keeps actions reachable without clipping
  the Arrow.
- Modal scroll locking no longer repositions the page during mobile browser
  toolbar changes.

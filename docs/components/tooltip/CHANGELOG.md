# Tooltip changelog

Tooltip follows the package version of `@flowstack-ui/brick`.

## Unreleased

- Added controller, shared-trigger, positioning and lifecycle APIs, plus Content
  composition and alternative labels. Preserved existing description IDs.
- Refined the compact inverted recipe with smaller insets, shared floating
  elevation, scale/fade motion and no normal-mode border.
- Added documentation examples and multipart prop reference.

- Add shared token-only radius selection to the boundary parts documented in the Radius guide; preserve omitted defaults and independent internal geometry.

## 0.1.10

### Added

- Expanded public Agent Knowledge for independently named triggers, brief plain
  and rich descriptions, touch and provider behavior, portalled appearance,
  and the exact installed Atom Tooltip reference.
- Initial eight-part Tooltip compound API with plain and rich neutral recipes,
  rounded and pill shapes, optional Arrow, scoped portals, and controlled or
  uncontrolled open state.
- Hover, focus, keyboard, and touch-hold activation with configurable timing,
  collision-aware placement, and logical direction inheritance.

### Fixed

- First-open positioning no longer animates from an unresolved location.
- Plain Tooltip content remains open while hovered.
- Arrow borders now follow the resolved placement side.

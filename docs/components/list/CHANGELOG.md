# List changelog

List follows the package version of `@flowstack-ui/brick`.

## Unreleased

- Add size=inherit, Root/Item markerTone and responsive nestedInset on nested
  Roots. Add asChild to Leading, Content, Title, Description and Trailing.
- Center leading visuals within the first text line. Respect native ol type
  and composed ordered hosts; an explicit marker still takes precedence.

- Add responsive peer gap and zero-padding density; preserve typography on composed li hosts.

- Add presentation-only selected state and semantic actionable hover for record
  composition with public useSelection and ActionDelegate; preserve native
  semantics, independent controls and existing static defaults.

- Add shared token-only radius selection to the boundary parts documented in the Radius guide; preserve omitted defaults and independent internal geometry.

### Fixed

- Kept native markers beside the first content line in bordered simple and
  structured rows instead of allowing the private block row to push content
  below the marker.

### Added

- Added `inset="default | none"` so ordinary List rows can retain their
  size-owned inline padding or align flush with adjacent content without
  consumer CSS.
- Added `align="start | center | end"` so structured Leading, Content, and
  Trailing parts can share a deliberate cross-axis relationship without
  consumer CSS.
- Added public Agent Knowledge for native list meaning, structured row anatomy,
  compact trailing content, narrow-screen reading, CSS delivery, and choosing
  navigation, interaction, or data owners instead.
- Added the Atom-backed seven-part `List` family with native ordered and
  unordered semantics, structured rows, marker, variant, size, density,
  disabled presentation, nesting, composition, and public CSS properties.

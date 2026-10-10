# FloatingPanel changelog

FloatingPanel follows the package version of `@flowstack-ui/brick`.

## Unreleased

- Use semantic strong-label weight for the compact title.

- Align grip/title content and preserve title shrinkage beside compact controls.
- Forward shared ResizeTriggers props and adopt staged restore-only controls.
- Keep Content keyboard-reachable without adding eight pointer-handle tab stops.
- Preserve geometry-stable fade motion during interrupted opening and closing.

- Add shared token-only radius selection to the boundary parts documented in the Radius guide; preserve omitted defaults and independent internal geometry.

### Added

- Styled movable/resizable nonmodal panels with compact header/control anatomy,
  semantic surfaces, borders, radius, shadow and public local visual variables.
- Public controller/provider, geometry and lifecycle options backed by Atom.

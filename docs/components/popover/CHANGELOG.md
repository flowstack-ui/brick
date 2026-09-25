# Popover changelog

Popover follows the package version of `@flowstack-ui/brick`.

## Unreleased

- Align the indicator example through Button's end icon slot and keep full-radius
  examples readable with compact centered content.

- Add external controller, shared triggers, state/indicator and expanded Atom
  positioning, lifecycle, events and Content composition.
- Add independent four-step inset recipes, body typography and initial motion control.
- Preserve composed structural handlers and callback-ref cleanup.
- Add documentation-style examples and multipart props navigation.

- Document the padded Header/Body/Footer structure, built-in bounded Body scrolling,
  and the missing-padding/scrolling failure caused by whole-panel layout wrappers.
- Add an explicit Agent Knowledge rule and a settings-popover inset regression.

- Constrain the scroll viewport to Atom's available placement height, keeping
  tall anchored panels reachable on short screens without application CSS.

- Add shared token-only radius selection to the boundary parts documented in the Radius guide; preserve omitted defaults and independent internal geometry.

- Place anchored popovers above the modal content layer so nested date and
  editing controls remain visible and pointer-operable.

## 0.1.10

### Added

- Expanded public Agent Knowledge for component selection, modal and non-modal
  composition, accessible naming, dismissal, portal appearance, responsive
  validation, and the exact installed Atom Popover behavioral reference.
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

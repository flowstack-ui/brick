# Chip changelog

## Unreleased

- Clarify theme-controlled corners through `radius="control"` while preserving the default pill recipe.

Added subtle and contrast, sparse responsive size/variant/density, public Atom-backed static-part projection and unstyled delegation. Corrected palette borders, close foregrounds, compact geometry and unavailable-action fading. Defaults are unchanged. Added 18 focused source-paired examples and expanded regression coverage.


Chip follows the package version of `@flowstack-ui/brick`.

- Add shared token-only radius selection to the boundary parts documented in the Radius guide; preserve omitted defaults and independent internal geometry.

### Fixed

- Chip Root and Remove Trigger now compose Atom's direct Badge and Button root
  exports so the normal Chip composition can render directly from a Next.js
  server page without an application client wrapper.

### Added

- Added surface/solid variants, semantic tones, opt-in compact density, xl size,
  coordinated StartElement/EndElement slots and an independent ActionTrigger.
  Existing defaults and comfortable sm/md/lg geometry remain unchanged.

- Added compound Root, Label, and optional RemoveTrigger value-token anatomy
  with two variants, two tones, three sizes, two shapes, authored leading
  content, explicit removal naming, responsive containment, and public CSS
  customization hooks.

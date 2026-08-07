# Chip changelog

Chip follows the package version of `@flowstack-ui/brick`.

## Unreleased

### Fixed

- Chip Root and Remove Trigger now compose Atom's direct Badge and Button root
  exports so the normal Chip composition can render directly from a Next.js
  server page without an application client wrapper.

### Added

- Added compound Root, Label, and optional RemoveTrigger value-token anatomy
  with two variants, two tones, three sizes, two shapes, authored leading
  content, explicit removal naming, responsive containment, and public CSS
  customization hooks.

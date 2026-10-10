# Skeleton changelog

Skeleton follows the package version of `@flowstack-ui/brick`.

## Unreleased

### Changed

- Fixed loaded multiline paint and compounded pulse opacity; polished wave
  motion and added a reduced-motion-aware content reveal.
- Removed the private content wrapper; loading hosts now use native inert.
- Normalized standalone text counts to 1–100 and made the final line 80% wide.

### Added

- Added asChild composition, shared radius, equal size, gap and lastLineWidth
  controls, plus duration and fade-duration customization hooks.

- Strengthened opaque semantic placeholder and highlight mixes so loading
  geometry stays visible on base, raised, and overlay surfaces in both
  appearances.
- Made default and highlight paint contextual primary-text tints so Skeleton
  remains visible when a containing dark overlay shares the old subtle-surface
  value.

### Added

- Added public human- and machine-readable Agent Knowledge for stable loading
  geometry, owning-region busy state, hidden placeholders, and motion-safe
  validation.
- Added four loading shapes, three motion-safe presentations, explicit and
  content-derived sizing, multi-line text, and stable loading transitions.

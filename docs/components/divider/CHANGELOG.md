# Divider changelog

Divider follows the package version of `@flowstack-ui/brick`.

## Unreleased

### Changed

- Changed the default line paint from the quiet subtle border role to the
  ordinary structural border role so section boundaries remain perceptible on
  canvas and panel surfaces in light and dark appearances.
- Consumed Atom's direct server-safe Divider root so Next.js Server Component
  static prerendering no longer serializes a namespace member as undefined.
- Documented complete-group and consistent-owner placement for repeated
  boundaries, including disclosure content.
- Corrected Agent Knowledge to teach Brick's direct `Divider` export rather
  than a nonexistent `Divider.Root` compound part.

### Added

- Added package and application regression coverage for direct Divider
  rendering across the React Server Component boundary.
- Added public Agent Knowledge for component selection, composition,
  CSS-delivery, recurring mistakes, and validation.

- Initial Atom-backed `Divider` with horizontal and vertical orientation,
  decorative and semantic output, solid/dashed/dotted lines, three
  thicknesses, logical inset, horizontal labels, vertical stretch,
  composition, forced-color visibility, and public CSS variables.

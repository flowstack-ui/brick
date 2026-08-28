# Icon Button changelog

Icon Button follows the package version of `@flowstack-ui/brick`.

## Unreleased

### Added

- Added public Agent Knowledge for component selection, composition,
  CSS-delivery, recurring mistakes, and validation.

- Added the Atom-backed Icon Button action and genuine link paths.
- Added four variants, six tones, five square sizes, rounded/circle geometry,
  loading, disabled, forced-colors, dark, and reduced-motion presentation.

### Fixed

- Disabled Icon Buttons now use the disabled foreground and stronger fading so
  they do not resemble enabled neutral outline actions.
- Icon Buttons composed as disclosure triggers now retain their pressed recipe
  while `aria-expanded="true"`.
- Neutral solid Icon Buttons now use a strong theme-derived neutral surface
  and normal foreground instead of the inverse black/white pair.
- Icon Button now composes Atom's direct Button root export so it can render
  directly from a Next.js server page without an application client wrapper.
- Danger solid Icon Buttons now retain WCAG AA icon contrast in both
  appearances and throughout hover and pressed interaction states.
- Centered the loading spinner when IconButton inherits right-to-left
  direction.
- Kept direct SVG and image children at the configured icon size when
  `asChild` composition removes the decorative wrapper.
- Loading presentation now uses the shared private action-spinner recipe and
  retains a visible system-color spinner in forced-color environments.

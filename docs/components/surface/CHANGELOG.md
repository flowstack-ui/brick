# Surface changelog

Surface follows the package version of `@flowstack-ui/brick`.

## Unreleased

### Changed

- Strengthened the neutral `bordered` recipe to the shared default structural
  boundary used by Card, Divider, and preview canvases, without changing the
  closed boolean API or accent-border behavior.
- Added a paired accent-subtle plane through
  `tone="accent" level="subtle"`, while preserving accent-solid as the default
  accent/base result.
- Expanded `inset` with page-panel `xl` and `2xl` recipes and Brick's shared
  responsive value grammar while keeping paint, radius, border, and elevation
  nonresponsive.
- Clarified in public and Agent Knowledge guidance that the Surface root's
  `inset` recipe owns four-sided content spacing, while `Surface.Content` owns
  foreground layering and Stack edge spacing remains axis-specific.
- Made `soft`, `medium`, and `strong` Scrim recipes perceptually distinct by
  widening both paint intensity and directional gradient reach while keeping
  theme ownership limited to the semantic scrim color.

### Added

- Added wrapper-free `asChild` composition for applying Surface paint to one
  existing semantic or layout host, including class/style/event/ref merging
  and explicit Section composition guidance.

- Added optional `Surface.Media`, `Surface.Scrim`, and `Surface.Content`
  layered composition with direct RSC-safe part exports, decorative media
  semantics, logical scrim gradients, public scrim tokens, and unchanged
  ordinary Surface output.

- Initial one-root `Surface` API with four semantic levels, independent border,
  elevation, radius, and inset recipes, controlled semantic hosts, native
  prop/ref forwarding, forced-colors boundaries, and public CSS variables.

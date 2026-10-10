# Container changelog

Container follows the package version of `@flowstack-ui/brick`.

## Unreleased

### Added

- Add opt-in `asChild` host composition, merging props, classes, styles,
  handlers and refs with one forwarding child. Native defaults are unchanged.
- Preserve Container-owned measure and gutters on shared painted hosts,
  independent of base stylesheet order.

- Clarified composition and API boundaries in public and Agent Knowledge guides.

- Expanded Agent Knowledge for aligning separate shell regions through shared
  Container measure and gutter recipes.

- Added public Agent Knowledge for component selection, composition,
  CSS-delivery, recurring mistakes, and validation.

- Initial one-root `Container` API with five closed measures, four logical
  gutters, controlled semantic hosts, native prop/ref forwarding, stable
  recipe metadata, and public geometry variables.

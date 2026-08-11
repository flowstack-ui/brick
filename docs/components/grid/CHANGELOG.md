# Grid changelog

Grid follows the package version of `@flowstack-ui/brick`.

## Unreleased

### Added

- Added focused responsive values for explicit Root columns, gaps, alignment,
  and unanchored Item spans/alignment while preserving intrinsic reflow,
  source order, and static explicit line placement.
- Added `Grid.Item asChild` so one authored link, Surface, or component can
  receive Grid placement and self-alignment without an extra wrapper.
- Initial compound `Grid.Root` and optional `Grid.Item` API.
- Exact equal columns, intrinsic auto-fit columns, tokenized uniform and axis
  gaps, Root item alignment, Item spans, line placement, full-column
  placement, and self-alignment.
- Controlled semantic hosts, ordinary auto-placed children, native attributes,
  `HTMLElement` refs, stable class/slot/recipe metadata, public customization
  variables, RTL, localization, forced-colors, and narrow-layout support.

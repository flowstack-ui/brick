# Navigation Menu changelog

Navigation Menu follows the package version of `@flowstack-ui/brick`.

## Unreleased

- Coordinate moving-arrow and panel fade durations through Atom presence.

- Anchor non-viewport top-level panels to their own item, keep horizontal
  chevrons vertical in RTL, and contain indicator artwork inside shared panels.
- Demonstrate asChild with an unstyled anchor so navigation recipes have one owner.

- Add coordinated raised List surface, retaining transparent header integration.
- Default Content links to compact destination rows; preserve explicit control
  and custom panel presentations and reset nested navigation context.
- Default Content inset to sm; rich grids can retain md explicitly.
- Separate destination corners from control radius and soften contrast hover.

- Keep non-viewport panels out of the navigation row's flow; omit the shared
  indicator in that composition.
- Replace status palettes with neutral/accent/contrast navigation tones.
- Differentiate small typography from medium; retain 36/40/44px control heights.
- Apply interaction foreground alongside background to inner links and triggers.

- Coordinate shared viewport positioning and resizing with layered directional
  panel exchanges; use a more compact default viewport radius.
- Support explicit navigation-root viewport anchoring alongside the default
  trigger anchor, and demonstrate structured navigation destinations.

- Add subtle/plain control recipes, navigation tones, shared radius and
  Content inset. Match Button control geometry and preserve inherited hooks.
- Expose independent pointer/delay policies, retained/inline panels, real
  Content refs, viewport alignment and cancelable selection/dismissal events.
- Add controller, RootProvider, Context and replaceable ItemIndicator artwork.

### Changed

- Replaced the thick open-trigger Indicator bar with a small surface-matched
  arrow that connects the measured trigger to the Viewport, reduced automatic
  chevron size and stroke, and made current-link underlines explicitly one
  pixel thick. The Viewport now defaults to the restrained control radius
  instead of the larger overlay radius.

### Added

- Added the `panel` Link variant for one full-width, wrapping rich destination
  frame inside Navigation Menu Content. A direct Surface child owns its inset,
  radius, border, elevation, and paint without shrinking the anchor hit area.

- Added short named part exports on the `navigation-menu` subpath so
  `import * as NavigationMenu` preserves compound syntax when composed from a
  React Server Component without making the containing page client-rendered.

- Added public Agent Knowledge for component selection, composition,
  CSS-delivery, recurring mistakes, and validation.

- Added the decorative `NavigationMenu.IndicatorArrow` part. Indicator renders
  it by default when no custom Indicator children are supplied.

### Fixed

- Panel Links now retain the normal Link focus ring when their direct child is
  not a Surface; the ring transfers to the Surface boundary only when that
  documented composition is present.

- Upgraded to Atom 0.21.0 and now positions the horizontal Viewport from its
  collision-aware active-trigger geometry instead of centering it on the
  complete Navigation Menu root. The Indicator follows the same physical
  coordinates so its arrow remains aligned in LTR and RTL.

- Vertical Viewports now follow the Root-relative active-trigger geometry
  carried by exact Atom `0.20.11`, so the Indicator arrow remains connected
  when switching from the first trigger to a later trigger with shorter
  content. Pointer movement followed by a click on that destination trigger
  also leaves it open instead of racing the preceding hover-open transition.

- Default `md` links and triggers now use Brick's shared 44px comfortable
  target; explicit `sm` and `lg` densities remain 32px and 48px.

### Added

- Added the complete styled Navigation Menu family with native destination semantics, three sizes, rich measured panels, active indicators, orientation, and RTL support.

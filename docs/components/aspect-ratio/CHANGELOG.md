# Aspect Ratio changelog

Aspect Ratio follows the package version of `@flowstack-ui/brick`.

## Unreleased

- Add the documentation Props table with source-checked defaults, component
  recipes and supported composition options; preserve native table semantics
  and horizontal scrolling on narrow screens.

- Keep outline backgrounds transparent, including forced colors; retain the
  theme border and forced-colors system border.

- Migrate radius to shared core/semantic Radius; omission remains none. Use
  subtle/control/surface to preserve legacy sm/md/lg intent.
- Add generated numeric aspectRatios and matching CSS foundation tokens; numeric ratio remains authoritative.
- Separate documentation examples from exhaustive qualification; show variants,
  radius, overflow and contentLayout through executable paired previews.



- Add responsive numeric ratios with sparse defaults and all four breakpoints.
- Fill immediate element children by default; `contentLayout="flow"` preserves
  previous natural-flow behavior. Native images/videos cover the frame.

## 0.1.10

### Added

- Added public Agent Knowledge for choosing stable media geometry, preserving
  the one-child composition and validating crop, overflow, and responsive use.
- Added the one-part `AspectRatio` component with numeric ratio geometry,
  plain/subtle/outline variants, five radii, visible/hidden overflow, native
  composition, and public CSS customization hooks.

# Hover Card changelog

Hover Card follows the package version of `@flowstack-ui/brick`.

## Unreleased

### Added

- Initial frozen `Root`, `Trigger`, `Portal`, `Content`, and `Arrow` compound
  API for non-interactive genuine-link previews.
- Small, medium, and large bounded elevated surfaces with optional Arrow,
  collision-aware placement, hover/focus timing, and portalled rendering.
- Internal constrained scrolling, logical direction inheritance, and public
  surface customization hooks.

### Fixed

- Touch and compatibility-pointer handling no longer opens previews
  accidentally, while the safe pointer corridor remains usable.
- Exiting content no longer intercepts pointer input.
- Arrow seams follow the resolved placement side.

# Toast changelog

Toast follows the package version of `@flowstack-ui/brick`.

## Unreleased

- Toaster region and close-action defaults now inherit generic accessible text
  from `LocaleProvider` when explicit labels are omitted.
## 0.1.10

### Added

- Added public Toast Agent Knowledge covering transient-feedback selection,
  the single announcement path, timing and focus, Brick's one-action boundary,
  equivalent dismissal, viewport placement, appearance, and validation.
- Added imperative `toast` helpers, `Toaster`, and styled `Toast.*` compound parts.
- Added six types, six logical positions, responsive/compact/full widths, separated/overlap stacking, optional directional swipe, queue and promise workflows.
- Added exactly-once Atom announcements, F8 region access, focus-safe timers, focused Escape dismissal, responsive safe-area layout, forced colors, and reduced motion support.

### Fixed

- Centered short content and icons, removed the empty default icon gutter, kept close controls inside logical edges, mirrored portalled positions in RTL, and replaced unstable percentage-based overlap spacing with a compact non-clipping stack.

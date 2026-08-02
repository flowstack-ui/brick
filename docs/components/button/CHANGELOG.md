# Button changelog

Button follows the package version of `@flowstack-ui/brick`.

## Unreleased

### Added

- Initial direct `Button` API and root/component-subpath exports.
- Four variants, six semantic tones, five sizes, and three shapes.
- Explicit full-width layout, start/end icons, and stable loading presentation.
- Native action and link semantics, form behavior, loading and disabled states,
  `HTMLElement` ref, and mutually exclusive `asChild`/`render` composition.
- Public Button tokens, stable root and content/icon classes, visual
  attributes, logical icon placement, and appearance/preference support.
- Public family, weight, line-height, and letter-spacing variables backed by
  the shared control typography recipes.

### Fixed

- Danger solid Buttons now retain WCAG AA text contrast in both appearances
  and throughout hover and pressed interaction states.
- Full-width and intrinsically sized Buttons now use border-box sizing and can
  shrink and wrap without clipping at extreme zoom or constrained widths.
- Loading presentation now uses the shared private action-spinner recipe while
  preserving Button-specific sizing, colors, disabled treatment, and RTL and
  preference behavior.

# Button changelog

Button follows the package version of `@flowstack-ui/brick`.

## Unreleased

- Expanded Button to the seven-step `2xs`–`2xl` action scale, including the
  refined 40px `md` recipe, while preserving the visible 44px default as `lg`.
- Responsive size objects may now omit `initial`; sparse values inherit the
  normal component default until their first supplied breakpoint.

- Added the `contrast` tone for high-emphasis neutral actions while preserving
  the quieter existing `neutral` recipe.
- Refined the default 44px action recipe to 16/24 text, 20px icons, and 20px
  logical padding.
- Added mobile-first responsive `size` values so one Button can change its
  complete recipe at shared Brick breakpoints.
- Added the `2xl` recipe as a 64px target with semantic `control-xl`
  typography and 28px logical padding for prominent marketing and onboarding
  actions.

### Added

- Initial direct `Button` API and root/component-subpath exports.
- Four variants, seven semantic tones, seven sizes, and three shapes.
- Explicit full-width layout, start/end icons, and stable loading presentation.
- Native action and link semantics, form behavior, loading and disabled states,
  `HTMLElement` ref, and mutually exclusive `asChild`/`render` composition.
- Public Button tokens, stable root and content/icon classes, visual
  attributes, logical icon placement, and appearance/preference support.
- Public family, weight, line-height, and letter-spacing variables backed by
  the shared control typography recipes.

### Fixed

- Disabled ghost and outline Buttons now remain transparent instead of gaining
  a filled disabled surface.

- Disabled Buttons now use a faded disabled foreground, subtle boundary, and
  quiet surface instead of resembling enabled neutral outlines.
- Neutral solid Buttons now use a strong theme-derived neutral surface and
  normal foreground instead of the inverse black/white pair.
- Danger solid Buttons now retain WCAG AA text contrast in both appearances
  and throughout hover and pressed interaction states.
- Full-width and intrinsically sized Buttons now use border-box sizing and can
  shrink and wrap without clipping at extreme zoom or constrained widths.
- Loading presentation now uses the shared private action-spinner recipe while
  preserving Button-specific sizing, colors, disabled treatment, and RTL and
  preference behavior.

# Rating changelog


## Unreleased

- Added generated controls, controller/provider composition, Label, Control,
  ItemIndicator, Items, HiddenInput and root/item context access.
- Added responsive xs–lg artwork sizes, target density, spacing and variants,
  plus local fill/empty colors and inherited presentation defaults.
- Corrected Item asChild composition, local RTL clipping and disabled cursor
  precedence; removed hover lift and scoped compound focus paint to Control.
- Added independent hover preview and preserved passive Display/Summary with
  custom artwork. Rebuilt documentation examples with forms and integration.

Disabled presentation preserves the selected recipe and fades once to 50%, with a not-allowed cursor on the disabled hit target. Keep read-only separate; do not add an opacity wrapper around an already disabled control. Forced colors uses system disabled colors.

Rating follows the package version of `@flowstack-ui/brick`.

## 0.1.10

### Fixed

- Stabilized repeated selection, fractional pointer input, capture loss, and
  dragging across every item through the published Atom behavior.

### Added

- Expanded public Agent Knowledge for input versus aggregate display selection,
  one-control slider semantics, clearing, pointer and keyboard behavior, form
  state, and the exact installed Atom Rating reference.
- Added `Rating.Summary` for a compact one-star numeric aggregate with one
  localized accessible label.
- Added `Rating.Display` for compact, localized, noninteractive aggregate scores without a focusable slider.
- Added opt-in `allowClear` behavior while preserving stable selection by
  default.
- Added the Atom-backed two-part Rating with one-slider semantics, fractional fill, default/custom artwork, three sizes, two tones, two variants, Field/form integration, accessibility, responsive and preference styling, and independent automated/manual evidence.

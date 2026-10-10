# MultiSelect changelog


## Unreleased

Disabled presentation preserves the selected recipe and fades once to 50%, with a not-allowed cursor on the disabled hit target. Keep read-only separate; do not add an opacity wrapper around an already disabled control. Forced colors uses system disabled colors.


MultiSelect follows the package version of `@flowstack-ui/brick`.

- Correct the dialog example's popup portal and document nested-modal clipping.

- Added focused documentation examples and per-part API tables.
- Unified sizing with the shared responsive control recipe.
- Added controller/provider/state composition and independent clear actions.
- Added neutral subtle appearance and compact popup rows without duplicate size rules.

- Add subtle presentation and a separately composable ClearTrigger.
- Allow Trigger presentation delegation with unstyled.
- Use compact neutral popup options and responsive family geometry.

- Add surface as a neutral filled-and-bordered alternative with unchanged geometry; preserve outline defaults.
- Keep outline transparent at rest and on hover, independently of popup paint.

- Add shared token-only radius selection to the boundary parts documented in the Radius guide; preserve omitted defaults and independent internal geometry.

- Expanded MultiSelect triggers and portalled options to the responsive shared
  2xs–2xl control-size scale and made the 44px `lg` recipe the default.

## 0.1.10

### Fixed

- Aligned MultiSelect Trigger typography with Button, Toggle, ToggleGroup, and
  other button-like controls at matching `sm`, `md`, and `lg` sizes. The
  trigger is not editable, so the 16px mobile-entry exception does not apply.
- Popup options now inherit Root size and match the trigger's 36/44/52px
  `sm`/`md`/`lg` minimum target instead of using a fixed 40px row.

### Added

- Added public MultiSelect Agent Knowledge covering select-only multiple
  choice, required compound anatomy, shared control-size alignment, form and
  application boundaries, common mistakes, and validation.
- Expanded MultiSelect Agent Knowledge with deduplicated array state, the
  button-owned popup listbox model, persistent toggling, repeated-value native
  submission, responsive checks, and unsupported specialized-control routing.
- Initial compound MultiSelect API built on Atom MultiSelect 0.10.1 with complete styled
  anatomy, repeated-value native forms, Field relationships, controlled/uncontrolled value arrays
  and open state, groups, disabled options, scrolling, portal positioning, and
  collision-aware Arrow.
- Input-aligned outline, soft, and underline variants; small, medium, and large
  sizes; sharp, rounded, and pill shapes; and full/intrinsic width.
- Replaceable default Icon, indicator, scroll, and Arrow artwork; stable
  classes, slots, public variables, dark appearance, forced colors, reduced
  motion, RTL, narrow layout, and zoom support.

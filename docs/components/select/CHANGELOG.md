# Select changelog


## Unreleased

Disabled presentation preserves the selected recipe and fades once to 50%, with a not-allowed cursor on the disabled hit target. Keep read-only separate; do not add an opacity wrapper around an already disabled control. Forced colors uses system disabled colors.


Select follows the package version of `@flowstack-ui/brick`.

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

### Added

- Added the borderless `ghost` trigger recipe.

### Changed

- Expanded Select and its portalled options to the responsive shared 2xs–2xl
  control-size scale and made the 44px `lg` recipe the default.
- Outline Select triggers now use a transparent surface so they blend with
  their owning panel while retaining the strong complete boundary.
- Select popups now use the standard overlay boundary token shared with other
  floating surfaces.

## 0.1.10

### Fixed

- Aligned Select Trigger typography with Button, Toggle, ToggleGroup, and other
  button-like controls at matching `sm`, `md`, and `lg` sizes. Select is not an
  editable field, so the 16px mobile-entry exception does not apply.
- Popup options now inherit Root size and match the trigger's 36/44/52px
  `sm`/`md`/`lg` minimum target instead of using a fixed 40px row.

- Inherited Atom 0.20.4 direction resolution so portalled option content and
  logical `start` placement follow an RTL trigger.

### Added

- Added `size="xs"`; popup items now inherit the Root density so open and
  closed Select presentation remains aligned.

- Added public Select Agent Knowledge covering component selection, required
  compound anatomy, accessible naming, controlled application effects, common
  mistakes, and validation.
- Expanded Select Agent Knowledge with the Atom-owned value/open model,
  trigger/listbox and native-form contracts, popup overflow anatomy, responsive
  appearance checks, and the Brick gap boundary for persistent collections.
- Initial compound Select API built on Atom Select 0.9.3 with complete styled
  anatomy, native forms, Field relationships, controlled/uncontrolled value
  and open state, groups, disabled options, scrolling, portal positioning, and
  collision-aware Arrow.
- Input-aligned outline, soft, and underline variants; small, medium, and large
  sizes; sharp, rounded, and pill shapes; and full/intrinsic width.
- Replaceable default Icon, indicator, scroll, and Arrow artwork; stable
  classes, slots, public variables, dark appearance, forced colors, reduced
  motion, RTL, narrow layout, and zoom support.

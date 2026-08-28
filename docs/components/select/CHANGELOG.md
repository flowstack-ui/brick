# Select changelog

Select follows the package version of `@flowstack-ui/brick`.

## Unreleased

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

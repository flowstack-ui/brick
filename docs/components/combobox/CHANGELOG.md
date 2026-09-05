# Combobox changelog

Combobox follows the package version of `@flowstack-ui/brick`.

## Unreleased

- Trigger artwork now inherits its generic accessible label from
  `LocaleProvider` when `aria-label` is omitted.
- Expanded Combobox controls and portalled options to the responsive shared
  2xs–2xl control-size scale and made the 44px `lg` recipe the default.

## 0.1.10

### Added

- Added expanded public Combobox Agent Knowledge for its independent committed
  value, input text, and open state; semantic popup owners; filtering and form
  validity; application effects; appearance; and validation.
- Added Atom-backed Control and Trigger parts so the chevron opens the popup,
  popup width follows the full visible control, and inherited Field state paints
  the complete control.
- Initial Atom-backed compound Combobox with searchable single selection, optional free text, groups, empty/loading states, controlled and uncontrolled behavior, portal positioning, keyboard navigation, and touch-safe dismissal.
- Outline, soft, and underline variants; small, medium, and large sizes; sharp, rounded, and pill shapes; replaceable artwork; stable CSS hooks; light/dark appearance; RTL; forced colors; and reduced motion.

### Fixed

- Popup options now inherit Root size and match the control's 36/44/52px
  `sm`/`md`/`lg` minimum target instead of using a fixed 40px row.
- Opening the option list from Trigger now allows mobile browsers to scroll the
  focused input into view above the virtual keyboard.
- Authored options now visibly filter while typing and `defaultValue` displays
  its option label without a separate `defaultInputValue`.

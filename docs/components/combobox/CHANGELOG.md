# Combobox changelog

Combobox follows the package version of `@flowstack-ui/brick`.

## Unreleased

### Added

- Added Atom-backed Control and Trigger parts so the chevron opens the popup,
  popup width follows the full visible control, and inherited Field state paints
  the complete control.
- Initial Atom-backed compound Combobox with searchable single selection, optional free text, groups, empty/loading states, controlled and uncontrolled behavior, portal positioning, keyboard navigation, and touch-safe dismissal.
- Outline, soft, and underline variants; small, medium, and large sizes; sharp, rounded, and pill shapes; replaceable artwork; stable CSS hooks; light/dark appearance; RTL; forced colors; and reduced motion.

### Fixed

- Opening the option list from Trigger now allows mobile browsers to scroll the
  focused input into view above the virtual keyboard.
- Authored options now visibly filter while typing and `defaultValue` displays
  its option label without a separate `defaultInputValue`.

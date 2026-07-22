# CheckboxGroup changelog

## Unreleased

### Fixed

- Upgraded to exact Atom 0.6.17 so explicit browser scrolling remains safe in
  non-browser DOM implementations used by tests and server tooling.
- Upgraded to exact Atom 0.6.16 so inline validation explicitly scrolls its
  first enabled Item focus target into view on real mobile Safari.
- Upgraded to exact Atom 0.6.15 and render the standard focus ring when inline
  validation directs focus to the first enabled Item after pointer submission.
- Shared invalid presentation now marks CheckboxGroup once without coloring
  every option as wrong; option controls and copy remain neutral, while a
  separately invalid Item retains its individual control-and-row cue. The
  group cue uses the same rounded terminal treatment as an invalid Checkbox.
- Upgraded to exact Atom 0.6.14 so an untouched required group stays neutral,
  then reveals one invalid state after leaving the empty group or removing its
  final selection and clears on correction/reset.
- Upgraded to exact Atom 0.6.13 so required one-or-more failures can present
  through Fieldset invalid styling and `Fieldset.Error`, clear after
  correction/reset, and focus the first enabled visible Item in inline mode.
- Upgraded to exact Atom 0.6.12 so required native validation messages anchor
  to the first enabled Item and validation focus returns to that Item.
- Upgraded to exact Atom 0.6.11 so the required one-or-more validation proxy
  remains eligible for native browser constraint validation.

### Added

- Complete five-part CheckboxGroup with plain or structured Items, stable SSR
  relationships, controlled/uncontrolled values, deterministic Parent,
  vertical/horizontal layout, native forms, Fieldset composition, and exact
  Atom behavior.

# Checkbox changelog

## Unreleased

### Fixed

- Upgraded to exact Atom 0.6.17 so explicit browser scrolling remains safe in
  non-browser DOM implementations used by tests and server tooling.
- Upgraded to exact Atom 0.6.16 so inline validation explicitly scrolls its
  visible Checkbox focus target into view on real mobile Safari.
- Upgraded to exact Atom 0.6.15 and render the standard focus ring when inline
  validation directs focus to the visible Checkbox after pointer submission.
- Invalid Checkbox presentation now keeps choice text neutral while applying
  the danger border to the visible control and logical row-start cue.
- Upgraded to exact Atom 0.6.14 so an untouched required Checkbox stays
  neutral, then reveals invalid state after blur or becoming unchecked after
  interaction and clears on correction/reset.
- Upgraded to exact Atom 0.6.13 so native required failures can present through
  Field invalid styling and `Field.Error`, clear after correction/reset, and
  focus the visible Checkbox without a browser bubble in inline mode.
- Upgraded to exact Atom 0.6.12 so required native validation messages anchor
  to the visible Checkbox and validation focus returns to that control.
- Upgraded to exact Atom 0.6.11 so required Checkbox hidden inputs remain
  eligible for native browser constraint validation.

### Added

- Complete direct Checkbox with three sizes, built-in checked/mixed artwork,
  full-row 44 CSS-pixel targets, native form behavior, Field composition,
  render/asChild adapters, public tokens, and exact Atom behavior.

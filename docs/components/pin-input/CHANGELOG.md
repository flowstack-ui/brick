# Pin Input changelog


## Unreleased

Disabled presentation preserves the selected recipe and fades once to 50%, with a not-allowed cursor on the disabled hit target. Keep read-only separate; do not add an opacity wrapper around an already disabled control. Forced colors uses system disabled colors.


Pin Input follows the package version of `@flowstack-ui/brick`.

- Add surface as a neutral filled-and-bordered alternative with unchanged geometry; preserve outline defaults.
- Keep outline transparent at rest and on hover, independently of popup paint.

- Add shared token-only radius selection to the boundary parts documented in the Radius guide; preserve omitted defaults and independent internal geometry.

- Replace OTPField exports, CSS route and owner with PinInput, without aliases.
- Adopt Atom array values, opt-in OTP, controller and advanced entry options.
- Add RootProvider/Context/Label/Control, transparent outline, theme-native
  focus/invalid/disabled states, square seven-size controls and joined seams.

- Expanded OTPField to the responsive shared 2xs–2xl control-size scale and
  made the 44px `lg` recipe the default.

## 0.1.10

### Added
- Added public Agent Knowledge for correct selection, Field or standalone
  accessible naming, one-value composition, paste/autofill preservation,
  application policy boundaries, and deliberate focus and submission.
- Expanded OTPField Agent Knowledge with cell-count and filter invariants,
  localized generated labels, roving keyboard behavior, first-cell validity,
  combined submission, responsive logical order, and appearance validation.
- Initial four-part Atom-backed OTP Field with three variants and sizes, two shapes and layouts, localized cell labels, paste/mask/completion behavior, single-value form participation, responsive RTL, forced colors, and public CSS hooks.
# September 18, 2026 — local parity update

- Added seven responsive field recipes and neutral/accent interaction tones.
- Corrected invalid focus color and bottom-only underline focus.
- Added focused source-paired examples including React Hook Form; retained
  exhaustive qualification scenarios separately.
- Preserved Atom behavior, automatic hidden submission and lg default sizing.

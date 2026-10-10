# Password Toggle Field changelog


## Unreleased

Disabled presentation preserves the selected recipe and fades once to 50%, with a not-allowed cursor on the disabled hit target. Keep read-only separate; do not add an opacity wrapper around an already disabled control. Forced colors uses system disabled colors.

Password Toggle Field follows the package version of `@flowstack-ui/brick`.

- Add all seven shared field variants, responsive recipes, and corrected
  independent Input/Toggle focus presentation while retaining Atom-owned
  visibility, value, reset, submit, and pointer-focus behavior.
- Inherit `showPassword` and `hidePassword` from LocaleProvider; explicit Root
  labels take precedence.
- Replace legacy exhaustive public examples with concise, source-paired
  documentation examples while retaining exhaustive qualification evidence.
- Document and qualify React Hook Form, local password-strength, native form,
  custom action, responsive/RTL, privacy-safe feedback, and autocomplete usage.
- Center text-based custom Icon artwork by normalizing its line box, restore
  responsive size resolution at active breakpoints, and top-align unequal state
  examples so their label-to-control spacing remains consistent.

- Forced colors preserves a real system-color focus outline; shadows are not the sole focus cue.

- Add shared token-only radius selection to the boundary parts documented in the Radius guide; preserve omitted defaults and independent internal geometry.

- Expanded PasswordToggleField to the responsive shared 2xs–2xl control-size
  scale and made the 44px `lg` recipe the default.

## 0.1.10

### Added

- Added public PasswordToggleField Agent Knowledge covering reveal-policy
  selection, native input ownership, localized next-action labels, focus,
  reset and submission safety, application boundaries, and appearance checks.
- Initial four-part Atom-backed Password Toggle Field with three variants, sizes, and applicable shapes; localized state-aware visibility actions; Field, Fieldset, and Form composition; reset and submission safety; responsive RTL; forced colors; and public CSS hooks.

### Fixed

- Removed inline-baseline drift from the default eye artwork so it remains
  optically centered inside the square visibility action.
- Added the missing Input-family field hover feedback and replaced the
  Toggle's browser-colored focus outline with a compact inset ring that uses
  the same semantic focus color as the complete field frame.

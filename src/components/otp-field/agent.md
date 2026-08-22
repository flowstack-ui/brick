# OTPField agent guide

## Purpose

Present one short verification, recovery, or pairing code as accessible segmented entry while Atom owns filtering, focus, paste, completion, validation, reset, and one-value form participation.

## Use when

- A person enters a short fixed-length code supplied through another channel.

## Choose something else when

- The value is a password, permanent PIN, arbitrary identifier, or variable-length text. Use PasswordToggleField or Input according to the credential and text-entry job.

## Required composition

- Compose Field.Root > Field.Label plus OTPField.Root > one or more ordered Groups containing Inputs; add decorative Separators only between deliberate groups, then use Field.Description and Field.Error through the ordinary Field contract.
- Give Root one name and the intended length and character type; keep every Input in logical source order and localize its position-aware accessible name with getInputLabel when the application language is not English.

## Rules

- **MUST:** Place OTPField inside one visibly labelled Field unless a standalone composition supplies an equivalent accessible group name.
- **MUST:** Treat the cells as one logical code, provide one Root name for form submission, and do not create independent application state or validation for each cell.
- **MUST:** Preserve typing, deletion, arrow navigation, complete-code paste, and one-time-code autofill behavior; do not block paste or replace the system keyboard.
- **MUST:** Keep cell and group source order equal to logical code order in every layout and writing direction.
- **SHOULD:** Keep autoSubmit off unless the product explicitly owns and verifies completion-driven submission, pending behavior, errors, and focus recovery.
- **SHOULD:** Keep autoFocus off unless the product deliberately moves focus into an already-explained code challenge and verifies keyboard, screen-reader, error, and recovery behavior.
- **MUST:** Keep code generation, delivery, verification, expiry, resend, attempt limits, rate limiting, result state, and security policy in the application or service.
- **MUST:** Load styles.css or core.css plus otp-field.css.

## Common mistakes

- **Avoid:** Building unrelated single-character inputs, blocking paste, reversing cells in RTL, auto-submitting by habit, or adding delivery and retry policy to the component. **Instead:** Use the complete OTPField anatomy as one named value, preserve Atom entry behavior and logical order, and connect workflow policy at the application boundary.

## Validation checklist

- Check the visible Field label or equivalent standalone accessible group name, localized cell names, one submitted value, required and invalid relationships, reset, typing, filtering, deletion, arrow navigation, complete-code paste, and user-agent autofill.
- Check deliberate group wrapping, 320 CSS pixels, 400% zoom, RTL, long localized labels, forced colors, focus visibility, and every supported appearance.

## Related guidance

- `@flowstack-ui/atom/agents/otp-field`
- `field`
- `form`
- `input`
- `button`

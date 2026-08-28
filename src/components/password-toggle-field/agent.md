# PasswordToggleField agent guide

## Purpose

Provide native password entry with a named visibility action while Atom owns visibility, Field and Form relationships, reset, and submission safety.

## Use when

- Revealing a typed password helps a person verify a long or complex credential.

## Choose something else when

- The password must remain concealed without a reveal action, or the input is an OTP or another credential type. Use Input with type=password, or the dedicated credential component.

## Required composition

- Compose Field.Root > Field.Label plus PasswordToggleField.Root > Input and Toggle; include Field.Description and Field.Error through the ordinary Field contract.
- Let Toggle render the default Icon unless product artwork is intentionally supplied; preserve showLabel and hideLabel as descriptions of the next action.

## Rules

- **MUST:** Keep Input and Toggle inside one PasswordToggleField.Root and place that control inside a visibly labelled Field.
- **MUST:** Provide localized showLabel and hideLabel values that describe the next action, not the current visibility state.
- **MUST:** Set the native autocomplete purpose deliberately, such as current-password for sign-in or new-password for account creation.
- **MUST:** Keep password strength, generation, validation policy, storage, and authentication behavior in the application.
- **MUST:** Load styles.css or core.css plus password-toggle-field.css.

## Common mistakes

- **Avoid:** Using an unlabeled eye button, writing a second visibility state, replacing Field relationships, or implying that revealed text remains private. **Instead:** Use the complete public anatomy, keep action labels explicit, and let Atom own visibility and native password behavior.

## Validation checklist

- Check visible Field naming, show and hide action names, keyboard focus, native input type, controlled and uncontrolled state, reset, and safe native submission.
- Check hover and focus treatment across Input and Toggle, invalid, disabled, read-only, RTL, long localized labels, and every supported appearance.

## Related guidance

- `field`
- `input`
- `form`
- `button`
